const http = require("http");
const https = require("https");
const net = require("net");
const tls = require("tls");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const { URL } = require("url");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const CACHE_DIR = path.join(DATA_DIR, "cache");
const ARTICLE_CACHE = path.join(CACHE_DIR, "articles.json");
const STATIC_DATA_DIR = path.join(ROOT, "assets", "data");
const DIST_DIR = path.join(ROOT, "dist");

function loadDotEnv(filePath = path.join(ROOT, ".env")) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    value = value.replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv();

const JOURNALS = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "journals.json"), "utf8"));

const PORT = Number(process.env.PORT || 8051);
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 6 * 60 * 60 * 1000);
const PER_JOURNAL = Number(process.env.PER_JOURNAL || 10);
const FETCH_TIMEOUT_MS = Number(process.env.FETCH_TIMEOUT_MS || 18000);
const FETCH_CONCURRENCY = Number(process.env.FETCH_CONCURRENCY || 3);
const JOURNAL_TIMEOUT_MS = Number(process.env.JOURNAL_TIMEOUT_MS || 24000);
const REQUEST_STAGGER_MS = Number(process.env.REQUEST_STAGGER_MS || 350);
const STATIC_WINDOW_MONTHS = Number(process.env.STATIC_WINDOW_MONTHS || 12);
const USE_CROSSREF = process.env.USE_CROSSREF !== "0";
const USE_OPENALEX = process.env.USE_OPENALEX !== "0";
const OPENALEX_BATCH_SIZE = Math.max(1, Math.min(20, Number(process.env.OPENALEX_BATCH_SIZE || 6)));
const MAX_SOURCE_RETRIES = Math.max(1, Math.min(5, Number(process.env.MAX_SOURCE_RETRIES || 3)));

const THEME_DEFS = [
  { id: "climate", zh: "气候变化", en: "Climate Change", color: "#0f766e" },
  { id: "hydrology", zh: "水文水资源", en: "Hydrology & Water", color: "#2563eb" },
  { id: "modeling", zh: "地球系统模型", en: "Earth System Modeling", color: "#7c3aed" },
  { id: "remote", zh: "遥感与GeoAI", en: "Remote Sensing & GeoAI", color: "#16a34a" },
  { id: "carbon", zh: "生态与碳循环", en: "Ecology & Carbon", color: "#b45309" },
  { id: "hazard", zh: "灾害风险", en: "Hazards & Risk", color: "#dc2626" },
  { id: "general", zh: "综合顶刊", en: "Flagship Journals", color: "#475569" }
];

const THEME_BY_ZH = Object.fromEntries(THEME_DEFS.map((theme) => [theme.zh, theme]));
const THEME_BY_ID = Object.fromEntries(THEME_DEFS.map((theme) => [theme.id, theme]));

const KEYWORD_RULES = [
  ["climate change", "气候变化", "climate"],
  ["global warming", "全球变暖", "climate"],
  ["warming", "增暖", "climate"],
  ["precipitation", "降水", "climate"],
  ["temperature", "温度", "climate"],
  ["adaptation", "适应", "climate"],
  ["mitigation", "减缓", "climate"],
  ["emission", "排放", "climate"],
  ["carbon", "碳循环", "carbon"],
  ["co2", "二氧化碳", "carbon"],
  ["methane", "甲烷", "carbon"],
  ["ecosystem", "生态系统", "carbon"],
  ["biodiversity", "生物多样性", "carbon"],
  ["forest", "森林", "carbon"],
  ["vegetation", "植被", "carbon"],
  ["photosynthesis", "光合作用", "carbon"],
  ["hydrology", "水文学", "hydrology"],
  ["groundwater", "地下水", "hydrology"],
  ["runoff", "径流", "hydrology"],
  ["streamflow", "河川径流", "hydrology"],
  ["soil moisture", "土壤湿度", "hydrology"],
  ["evapotranspiration", "蒸散发", "hydrology"],
  ["flood", "洪涝", "hazard"],
  ["drought", "干旱", "hazard"],
  ["landslide", "滑坡", "hazard"],
  ["hazard", "灾害", "hazard"],
  ["risk", "风险", "hazard"],
  ["exposure", "暴露度", "hazard"],
  ["vulnerability", "脆弱性", "hazard"],
  ["remote sensing", "遥感", "remote"],
  ["satellite", "卫星观测", "remote"],
  ["sar", "SAR", "remote"],
  ["insar", "InSAR", "remote"],
  ["lidar", "LiDAR", "remote"],
  ["machine learning", "机器学习", "remote"],
  ["deep learning", "深度学习", "remote"],
  ["foundation model", "基础模型", "remote"],
  ["artificial intelligence", "人工智能", "remote"],
  ["neural network", "神经网络", "remote"],
  ["earth system model", "地球系统模型", "modeling"],
  ["climate model", "气候模式", "modeling"],
  ["model development", "模型发展", "modeling"],
  ["parameterization", "参数化", "modeling"],
  ["data assimilation", "数据同化", "modeling"],
  ["uncertainty", "不确定性", "modeling"],
  ["cmip", "CMIP", "modeling"],
  ["simulation", "模拟", "modeling"]
];

function themeFromLabel(label) {
  return THEME_BY_ZH[label] || THEME_BY_ID[label] || THEME_BY_ID.general;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function dateMonthsAgo(months) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function dateFromParts(container) {
  const parts = container && container["date-parts"] && container["date-parts"][0];
  if (!parts || !parts[0]) return "";
  return `${parts[0]}-${pad2(parts[1] || 1)}-${pad2(parts[2] || 1)}`;
}

function bestDate(item) {
  return (
    dateFromParts(item["published-online"]) ||
    dateFromParts(item.published) ||
    dateFromParts(item["published-print"]) ||
    dateFromParts(item.issued) ||
    dateFromParts(item.created) ||
    ""
  );
}

function htmlDecode(text = "") {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function cleanText(text = "") {
  return htmlDecode(String(text))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^Abstract\s+/i, "");
}

function stripDoi(doi = "") {
  return doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim();
}

function normalizeDoi(doi = "") {
  return stripDoi(doi).toLowerCase();
}

function compactAuthors(authors = []) {
  const names = authors
    .map((author) => [author.given, author.family].filter(Boolean).join(" ").trim())
    .filter(Boolean);
  return names.length <= 5 ? names : [...names.slice(0, 5), "et al."];
}

function scoreThemes(text, defaultThemeId) {
  const haystack = ` ${String(text || "").toLowerCase()} `;
  const scores = Object.fromEntries(THEME_DEFS.map((theme) => [theme.id, theme.id === defaultThemeId ? 1 : 0]));
  for (const [term, , themeId] of KEYWORD_RULES) {
    if (haystack.includes(term)) scores[themeId] = (scores[themeId] || 0) + 2;
  }
  return scores;
}

function inferTheme(journal, title, abstract, subjects = []) {
  const defaultTheme = themeFromLabel(journal.category);
  const scores = scoreThemes(`${title} ${abstract} ${subjects.join(" ")}`, defaultTheme.id);
  const [themeId] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0] || ["general"];
  return THEME_BY_ID[themeId] || THEME_BY_ID.general;
}

function describeError(error) {
  if (!error) return "unknown error";
  const parts = [error.message, error.code, error.name, error.cause && error.cause.message, String(error)]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter((part, index, arr) => part && arr.indexOf(part) === index);
  return parts.join(" | ") || "unknown error";
}

function hasResearchSignal(article) {
  const haystack = `${article.title} ${article.abstract} ${(article.subjects || []).join(" ")}`.toLowerCase();
  return KEYWORD_RULES.some(([term]) => haystack.includes(term));
}

function isUsefulArticle(article) {
  if (!article || !article.published || !article.title) return false;
  const title = article.title.toLowerCase();
  const badTitle = /\b(editorial board|correction|corrigendum|erratum|retraction|issue information|front matter|back matter|cover image|table of contents)\b/i;
  if (badTitle.test(title)) return false;
  if (/^10\.1038\/d41586-/i.test(article.doi || "")) return false;
  if (article.categoryId === "general" && article.themeId === "general" && !hasResearchSignal(article)) return false;
  return true;
}

function attachDerivedFields(article, previous = {}) {
  article.abstract = cleanText(article.abstract || "");
  article.abstractEn = cleanText(article.abstractEn || article.abstract || "");
  const theme = article.themeId ? THEME_BY_ID[article.themeId] || themeFromLabel(article.theme) : themeFromLabel(article.theme || article.category);
  const category = article.categoryId ? THEME_BY_ID[article.categoryId] || themeFromLabel(article.category) : themeFromLabel(article.category);
  article.titleEn = article.titleEn || article.title;
  article.themeId = theme.id;
  article.themeZh = theme.zh;
  article.themeEn = theme.en;
  article.themeColor = theme.color;
  article.theme = theme.zh;
  article.categoryId = category.id;
  article.categoryZh = category.zh;
  article.categoryEn = category.en;
  article.hasAbstract = Boolean(article.abstract && article.abstract.trim().length >= 40);
  article.abstractStatus = article.hasAbstract ? "available" : "missing";
  delete article.zhKeywords;
  delete article.zh;
  delete article.localDigest;
  return article;
}

function normalizeCrossrefItem(item, journal) {
  const title = cleanText((item.title && item.title[0]) || "");
  if (!title) return null;

  const doi = normalizeDoi(item.DOI || "");
  const abstract = cleanText(item.abstract || "");
  const subjects = Array.isArray(item.subject) ? item.subject.map(cleanText) : [];
  const theme = inferTheme(journal, title, abstract, subjects);
  const category = themeFromLabel(journal.category);
  const article = {
    id: doi || `${journal.id}-${Buffer.from(title).toString("base64url").slice(0, 18)}`,
    doi,
    title,
    titleEn: title,
    authors: compactAuthors(item.author || []),
    journalId: journal.id,
    journal: journal.name,
    journalAbbr: journal.abbr,
    publisher: journal.publisher,
    categoryId: category.id,
    category: category.zh,
    categoryZh: category.zh,
    categoryEn: category.en,
    themeId: theme.id,
    theme: theme.zh,
    themeZh: theme.zh,
    themeEn: theme.en,
    published: bestDate(item),
    url: item.URL || (doi ? `https://doi.org/${doi}` : journal.officialUrl),
    officialJournalUrl: journal.officialUrl,
    abstract,
    abstractEn: abstract,
    subjects,
    keywordsEn: subjects,
    citedBy: item["is-referenced-by-count"] || 0,
    openAccess: Boolean(item.license && item.license.length),
    sources: ["Crossref DOI metadata"]
  };
  return attachDerivedFields(article);
}

function abstractFromInvertedIndex(index) {
  if (!index || typeof index !== "object") return "";
  const words = [];
  for (const [word, positions] of Object.entries(index)) {
    if (!Array.isArray(positions)) continue;
    positions.forEach((position) => {
      words[position] = word;
    });
  }
  return cleanText(words.filter(Boolean).join(" "));
}

function normalizeOpenAlexItem(item, journal) {
  const title = cleanText(item.display_name || item.title || "");
  if (!title) return null;

  const doi = normalizeDoi(item.doi || "");
  const abstract = abstractFromInvertedIndex(item.abstract_inverted_index);
  const authors = (item.authorships || [])
    .map((entry) => entry.author && entry.author.display_name)
    .filter(Boolean);
  const compactedAuthors = authors.length <= 5 ? authors : [...authors.slice(0, 5), "et al."];
  const concepts = (item.concepts || []).map((concept) => cleanText(concept.display_name || "")).filter(Boolean);
  const keywords = (item.keywords || []).map((keyword) => cleanText(keyword.display_name || keyword.keyword || "")).filter(Boolean);
  const subjects = [...concepts.slice(0, 8), ...keywords.slice(0, 8)];
  const theme = inferTheme(journal, title, abstract, subjects);
  const category = themeFromLabel(journal.category);
  const primaryLocation = item.primary_location || {};
  const bestOaLocation = item.best_oa_location || {};
  const oaLocation = bestOaLocation.url ? bestOaLocation : primaryLocation;
  const article = {
    id: doi || item.id || `${journal.id}-${Buffer.from(title).toString("base64url").slice(0, 18)}`,
    doi,
    title,
    titleEn: title,
    authors: compactedAuthors,
    journalId: journal.id,
    journal: journal.name,
    journalAbbr: journal.abbr,
    publisher: journal.publisher,
    categoryId: category.id,
    category: category.zh,
    categoryZh: category.zh,
    categoryEn: category.en,
    themeId: theme.id,
    theme: theme.zh,
    themeZh: theme.zh,
    themeEn: theme.en,
    published: item.publication_date || "",
    url:
      primaryLocation.landing_page_url ||
      item.doi ||
      item.id ||
      (doi ? `https://doi.org/${doi}` : journal.officialUrl),
    officialJournalUrl: journal.officialUrl,
    abstract,
    abstractEn: abstract,
    subjects,
    keywordsEn: subjects,
    citedBy: item.cited_by_count || 0,
    openAccess: Boolean(item.open_access && item.open_access.is_oa),
    openAccessUrl: item.open_access?.oa_url || oaLocation.landing_page_url || oaLocation.url || "",
    pdfUrl: oaLocation.pdf_url || "",
    license: oaLocation.license || "",
    sources: ["OpenAlex DOI metadata"]
  };
  return attachDerivedFields(article);
}

function normalizeFeedItem(item, journal) {
  const title = cleanText(item.title);
  if (!title) return null;

  const doi = normalizeDoi(item.doi || (item.link && item.link.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i)?.[0]) || "");
  const abstract = cleanText(item.description || "");
  const theme = inferTheme(journal, title, abstract, []);
  const category = themeFromLabel(journal.category);
  const article = {
    id: doi || `${journal.id}-${Buffer.from(title).toString("base64url").slice(0, 18)}`,
    doi,
    title,
    titleEn: title,
    authors: [],
    journalId: journal.id,
    journal: journal.name,
    journalAbbr: journal.abbr,
    publisher: journal.publisher,
    categoryId: category.id,
    category: category.zh,
    categoryZh: category.zh,
    categoryEn: category.en,
    themeId: theme.id,
    theme: theme.zh,
    themeZh: theme.zh,
    themeEn: theme.en,
    published: item.pubDate ? isoDate(new Date(item.pubDate)) : "",
    url: item.link || (doi ? `https://doi.org/${doi}` : journal.officialUrl),
    officialJournalUrl: journal.officialUrl,
    abstract,
    abstractEn: abstract,
    subjects: [],
    keywordsEn: [],
    citedBy: 0,
    openAccess: false,
    sources: ["Official RSS"]
  };
  return attachDerivedFields(article);
}

function getProxy({ force = false } = {}) {
  if (!force && process.env.USE_ENV_PROXY !== "1") return null;
  const raw =
    process.env.OPENAI_PROXY ||
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    process.env.ALL_PROXY ||
    process.env.all_proxy;
  if (!raw) return null;
  try {
    const proxy = new URL(raw);
    return {
      hostname: proxy.hostname,
      port: Number(proxy.port || 8080),
      auth: proxy.username ? `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}` : ""
    };
  } catch {
    return null;
  }
}

function createHttpsProxyAgent(proxy) {
  return new https.Agent({
    keepAlive: false,
    createConnection(options, callback) {
      const targetHost = options.hostname || options.host;
      const targetPort = options.port || 443;
      const socket = net.connect(proxy.port, proxy.hostname);
      socket.setTimeout(FETCH_TIMEOUT_MS);
      socket.once("connect", () => {
        const headers = [`CONNECT ${targetHost}:${targetPort} HTTP/1.1`, `Host: ${targetHost}:${targetPort}`, "Connection: close"];
        if (proxy.auth) headers.push(`Proxy-Authorization: Basic ${Buffer.from(proxy.auth).toString("base64")}`);
        socket.write(`${headers.join("\r\n")}\r\n\r\n`);
      });
      let response = "";
      const onData = (chunk) => {
        response += chunk.toString("latin1");
        if (!response.includes("\r\n\r\n")) return;
        socket.removeListener("data", onData);
        const statusLine = response.split("\r\n")[0] || "";
        if (!/^HTTP\/1\.[01] 2\d\d/.test(statusLine)) {
          callback(new Error(`Proxy CONNECT failed: ${statusLine}`));
          socket.destroy();
          return;
        }
        const secureSocket = tls.connect({ socket, servername: targetHost });
        secureSocket.once("secureConnect", () => callback(null, secureSocket));
        secureSocket.once("error", callback);
      };
      socket.on("data", onData);
      socket.once("error", callback);
      socket.once("timeout", () => {
        callback(new Error("Proxy CONNECT timed out"));
        socket.destroy();
      });
    }
  });
}

function decodeChunked(buffer) {
  let offset = 0;
  const chunks = [];
  while (offset < buffer.length) {
    const lineEnd = buffer.indexOf("\r\n", offset, "latin1");
    if (lineEnd === -1) break;
    const sizeLine = buffer.slice(offset, lineEnd).toString("latin1").split(";")[0].trim();
    const size = parseInt(sizeLine, 16);
    if (!Number.isFinite(size) || size < 0) break;
    offset = lineEnd + 2;
    if (size === 0) break;
    chunks.push(buffer.slice(offset, offset + size));
    offset += size + 2;
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function requestTextViaProxy(targetUrl, options, proxy) {
  const url = new URL(targetUrl);
  if (url.protocol !== "https:") throw new Error("Proxy fallback currently supports HTTPS only.");
  const bodyBuffer = options.body ? Buffer.from(options.body) : Buffer.alloc(0);
  const method = options.method || "GET";
  const timeout = options.timeout || FETCH_TIMEOUT_MS;
  const pathAndQuery = `${url.pathname}${url.search}`;
  const headers = {
    Host: url.hostname,
    Connection: "close",
    ...options.headers
  };
  if (bodyBuffer.length) headers["Content-Length"] = String(bodyBuffer.length);

  return new Promise((resolve, reject) => {
    const socket = net.connect(proxy.port, proxy.hostname);
    let settled = false;
    const fail = (error) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(error);
    };
    socket.setTimeout(timeout);
    socket.once("connect", () => {
      const connectHeaders = [`CONNECT ${url.hostname}:443 HTTP/1.1`, `Host: ${url.hostname}:443`, "Connection: close"];
      if (proxy.auth) connectHeaders.push(`Proxy-Authorization: Basic ${Buffer.from(proxy.auth).toString("base64")}`);
      socket.write(`${connectHeaders.join("\r\n")}\r\n\r\n`);
    });

    let connectResponse = Buffer.alloc(0);
    const onConnectData = (chunk) => {
      connectResponse = Buffer.concat([connectResponse, chunk]);
      const marker = connectResponse.indexOf("\r\n\r\n", 0, "latin1");
      if (marker === -1) return;
      socket.removeListener("data", onConnectData);
      const head = connectResponse.slice(0, marker).toString("latin1");
      if (!/^HTTP\/1\.[01] 2\d\d/i.test(head)) {
        fail(new Error(`Proxy CONNECT failed: ${head.split("\r\n")[0] || "unknown"}`));
        return;
      }

      const secure = tls.connect({ socket, servername: url.hostname });
      secure.setTimeout(timeout);
      secure.once("secureConnect", () => {
        const headerText = Object.entries(headers)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\r\n");
        secure.write(`${method} ${pathAndQuery} HTTP/1.1\r\n${headerText}\r\n\r\n`);
        if (bodyBuffer.length) secure.write(bodyBuffer);
      });

      const responseChunks = [];
      secure.on("data", (data) => responseChunks.push(data));
      secure.once("end", () => {
        if (settled) return;
        settled = true;
        const response = Buffer.concat(responseChunks);
        const split = response.indexOf("\r\n\r\n", 0, "latin1");
        if (split === -1) {
          reject(new Error("Proxied response did not include headers."));
          return;
        }
        const rawHead = response.slice(0, split).toString("latin1");
        const rawBody = response.slice(split + 4);
        const lines = rawHead.split("\r\n");
        const status = Number((lines[0].match(/\s(\d{3})\s/) || [])[1]);
        const headerMap = {};
        for (const line of lines.slice(1)) {
          const index = line.indexOf(":");
          if (index !== -1) headerMap[line.slice(0, index).trim().toLowerCase()] = line.slice(index + 1).trim();
        }
        const text = /chunked/i.test(headerMap["transfer-encoding"] || "") ? decodeChunked(rawBody) : rawBody.toString("utf8");
        if (status < 200 || status >= 300) {
          reject(new Error(`HTTP ${status} for ${targetUrl}: ${text.slice(0, 500)}`));
          return;
        }
        resolve(text);
      });
      secure.once("timeout", () => fail(new Error(`Proxied request timed out after ${timeout}ms`)));
      secure.once("error", fail);
    };
    socket.on("data", onConnectData);
    socket.once("timeout", () => fail(new Error(`Proxy socket timed out after ${timeout}ms`)));
    socket.once("error", fail);
  });
}

async function requestText(targetUrl, options = {}, redirectCount = 0) {
  if (redirectCount > 5) throw new Error(`Too many redirects: ${targetUrl}`);
  const url = new URL(targetUrl);
  const isHttps = url.protocol === "https:";
  const proxy = getProxy({ force: Boolean(options.forceProxy) });
  const headers = {
    "User-Agent": "GeoLiteratureRadar/0.2 (research dashboard)",
    Accept: "application/json, application/xml, text/xml, text/html;q=0.8, */*;q=0.5",
    "Accept-Encoding": "identity",
    ...options.headers
  };
  const timeout = options.timeout || FETCH_TIMEOUT_MS;

  if (!proxy) {
    const response = await fetch(targetUrl, {
      method: options.method || "GET",
      headers,
      body: options.body,
      redirect: "follow",
      signal: AbortSignal.timeout(timeout)
    });
    const body = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${targetUrl}: ${body.slice(0, 200)}`);
    return body;
  }

  if (options.forceProxy) {
    return requestTextViaProxy(targetUrl, { ...options, headers }, proxy);
  }

  const module = isHttps ? https : http;
  const requestOptions = {
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port || (isHttps ? 443 : 80),
    path: `${url.pathname}${url.search}`,
    method: options.method || "GET",
    headers,
    timeout
  };
  if (isHttps && proxy) requestOptions.agent = createHttpsProxyAgent(proxy);

  return new Promise((resolve, reject) => {
    const req = module.request(requestOptions, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", async () => {
        const body = Buffer.concat(chunks).toString("utf8");
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          try {
            resolve(await requestText(new URL(res.headers.location, url).toString(), options, redirectCount + 1));
          } catch (error) {
            reject(error);
          }
          return;
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`HTTP ${res.statusCode} for ${targetUrl}: ${body.slice(0, 200)}`));
          return;
        }
        resolve(body);
      });
    });
    req.on("timeout", () => req.destroy(new Error(`Request timed out: ${targetUrl}`)));
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function requestJson(targetUrl, options = {}) {
  const text = await requestText(targetUrl, {
    ...options,
    headers: { Accept: "application/json", ...(options.headers || {}) }
  });
  return JSON.parse(text);
}

async function requestJsonWithRetry(targetUrl, options = {}) {
  let lastError;
  const attempts = options.attempts || MAX_SOURCE_RETRIES;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      if (attempt > 0) await sleep(Math.min(8000, REQUEST_STAGGER_MS * 2 ** attempt));
      return await requestJson(targetUrl, options);
    } catch (error) {
      lastError = error;
      if (!/429|5\d\d|timeout|timed out|aborted|fetch failed|ECONNRESET/i.test(describeError(error))) break;
    }
  }
  throw lastError;
}

function parseRssItems(xml) {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return blocks.map((block) => {
    const pick = (tag) => {
      const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
      return match ? cleanText(match[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "")) : "";
    };
    const linkMatch = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*>/i) || block.match(/<link(?:\s[^>]*)?>([\s\S]*?)<\/link>/i);
    const doiMatch = block.match(/<prism:doi(?:\s[^>]*)?>([\s\S]*?)<\/prism:doi>/i) || block.match(/<dc:identifier(?:\s[^>]*)?>([\s\S]*?)<\/dc:identifier>/i);
    return {
      title: pick("title"),
      description: pick("description") || pick("summary"),
      pubDate: pick("pubDate") || pick("published") || pick("updated"),
      link: linkMatch ? cleanText(linkMatch[1]) : "",
      doi: doiMatch ? cleanText(doiMatch[1]) : ""
    };
  });
}

async function fetchFeedArticles(journal) {
  if (!journal.feedUrl) return [];
  const xml = await requestText(journal.feedUrl, {
    headers: { Accept: "application/rss+xml, application/atom+xml, text/xml" },
    timeout: Math.min(FETCH_TIMEOUT_MS, 10000)
  });
  return parseRssItems(xml)
    .map((item) => normalizeFeedItem(item, journal))
    .filter(Boolean);
}

async function fetchOpenAlexForIssn(journal, issn, fromDate, untilDate) {
  const params = new URLSearchParams({
    filter: `primary_location.source.issn:${issn},from_publication_date:${fromDate},to_publication_date:${untilDate},type:article`,
    sort: "publication_date:desc",
    "per-page": String(PER_JOURNAL)
  });
  if (process.env.OPENALEX_MAILTO) params.set("mailto", process.env.OPENALEX_MAILTO);
  if (process.env.OPENALEX_API_KEY) params.set("api_key", process.env.OPENALEX_API_KEY);
  const url = `https://api.openalex.org/works?${params.toString()}`;
  const data = await requestJsonWithRetry(url, { timeout: Math.min(FETCH_TIMEOUT_MS, 16000) });
  return (data.results || []).map((item) => normalizeOpenAlexItem(item, journal)).filter(Boolean);
}

function normalizedIssn(value = "") {
  return String(value).replace(/[^0-9X]/gi, "").toUpperCase();
}

function openAlexJournalForItem(item, byIssn) {
  const sources = [
    item.primary_location?.source,
    item.best_oa_location?.source,
    ...(item.locations || []).map((location) => location?.source)
  ].filter(Boolean);
  for (const source of sources) {
    const candidates = [source.issn_l, ...(source.issn || [])].map(normalizedIssn).filter(Boolean);
    for (const issn of candidates) {
      if (byIssn.has(issn)) return byIssn.get(issn);
    }
  }
  return null;
}

async function fetchOpenAlexBatches(fromDate, untilDate) {
  if (!USE_OPENALEX) return { articles: [], errors: [], requests: 0 };
  const byIssn = new Map();
  for (const journal of JOURNALS) {
    for (const issn of journal.issn || []) byIssn.set(normalizedIssn(issn), journal);
    if (journal.crossrefIssn) byIssn.set(normalizedIssn(journal.crossrefIssn), journal);
  }
  const groups = [];
  for (let index = 0; index < JOURNALS.length; index += OPENALEX_BATCH_SIZE) {
    groups.push(JOURNALS.slice(index, index + OPENALEX_BATCH_SIZE));
  }
  const articles = [];
  const errors = [];
  for (let index = 0; index < groups.length; index += 1) {
    const group = groups[index];
    const issns = [...new Set(group.flatMap((journal) => journal.issn || []).map(normalizedIssn).filter(Boolean))];
    const params = new URLSearchParams({
      filter: `primary_location.source.issn:${issns.join("|")},from_publication_date:${fromDate},to_publication_date:${untilDate},type:article`,
      sort: "publication_date:desc",
      "per-page": "100"
    });
    if (process.env.OPENALEX_MAILTO) params.set("mailto", process.env.OPENALEX_MAILTO);
    if (process.env.OPENALEX_API_KEY) params.set("api_key", process.env.OPENALEX_API_KEY);
    const url = `https://api.openalex.org/works?${params.toString()}`;
    try {
      await sleep(REQUEST_STAGGER_MS * (index + 1));
      const data = await requestJsonWithRetry(url, { timeout: Math.min(FETCH_TIMEOUT_MS, 18000) });
      for (const item of data.results || []) {
        const journal = openAlexJournalForItem(item, byIssn);
        if (!journal) continue;
        const article = normalizeOpenAlexItem(item, journal);
        if (article) articles.push(article);
      }
    } catch (error) {
      errors.push(`OpenAlex batch ${index + 1}/${groups.length} failed: ${describeError(error)}`);
    }
  }
  return { articles, errors, requests: groups.length };
}

async function fetchCrossrefForIssn(journal, issn, fromDate, untilDate) {
  const candidateRows = journal.quality === "flagship" ? Math.max(PER_JOURNAL * 12, 120) : Math.max(PER_JOURNAL * 3, 30);
  const params = new URLSearchParams({
    filter: `from-pub-date:${fromDate},until-pub-date:${untilDate},type:journal-article`,
    sort: "published",
    order: "desc",
    rows: String(candidateRows)
  });
  if (process.env.CROSSREF_MAILTO) params.set("mailto", process.env.CROSSREF_MAILTO);
  const url = `https://api.crossref.org/journals/${encodeURIComponent(issn)}/works?${params.toString()}`;
  await sleep(REQUEST_STAGGER_MS);
  const data = await requestJsonWithRetry(url, { timeout: FETCH_TIMEOUT_MS });
  return (data.message.items || []).map((item) => normalizeCrossrefItem(item, journal)).filter(Boolean);
}

async function fetchJournalArticles(journal, fromDate, untilDate) {
  const collected = [];
  const errors = [];
  try {
    collected.push(...(await fetchFeedArticles(journal)));
  } catch (error) {
    errors.push(`${journal.abbr} official RSS failed: ${error.message}`);
  }

  const issns = Array.from(new Set([journal.crossrefIssn || journal.issn[0]].filter(Boolean)));
  for (const issn of issns) {
    if (USE_CROSSREF) {
      try {
        collected.push(...(await fetchCrossrefForIssn(journal, issn, fromDate, untilDate)));
      } catch (error) {
        errors.push(`${journal.abbr} Crossref ${issn} failed: ${error.message}`);
      }
    }
  }
  return { articles: collected, errors };
}

async function mapLimit(items, limit, iterator) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await iterator(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function mergeArticles(articles, previousByKey = new Map()) {
  const map = new Map();
  for (const raw of articles) {
    if (!raw) continue;
    const prevKey = raw.doi ? `doi:${raw.doi}` : `title:${raw.journalId}:${raw.title.toLowerCase()}`;
    const article = attachDerivedFields(raw, previousByKey.get(prevKey) || {});
    const key = article.doi ? `doi:${article.doi}` : `title:${article.journalId}:${article.title.toLowerCase()}`;
    if (!map.has(key)) {
      map.set(key, article);
      continue;
    }
    const existing = map.get(key);
    existing.sources = Array.from(new Set([...(existing.sources || []), ...(article.sources || [])]));
    if (!existing.abstract && article.abstract) existing.abstract = article.abstract;
    if (!existing.published && article.published) existing.published = article.published;
    if (!existing.url && article.url) existing.url = article.url;
    if (!existing.authors.length && article.authors.length) existing.authors = article.authors;
    if (!existing.openAccess && article.openAccess) existing.openAccess = true;
    if (article.citedBy > existing.citedBy) existing.citedBy = article.citedBy;
    attachDerivedFields(existing, previousByKey.get(key) || {});
  }
  return [...map.values()]
    .map((article) => attachDerivedFields(article, previousByKey.get(article.doi ? `doi:${article.doi}` : `title:${article.journalId}:${article.title.toLowerCase()}`) || {}))
    .filter(isUsefulArticle)
    .sort((a, b) => b.published.localeCompare(a.published) || b.citedBy - a.citedBy);
}

function previousArticleMap(payload) {
  const map = new Map();
  for (const article of payload?.articles || []) {
    const key = article.doi ? `doi:${normalizeDoi(article.doi)}` : `title:${article.journalId}:${String(article.title || "").toLowerCase()}`;
    map.set(key, article);
  }
  return map;
}

function buildCoverage(articles) {
  const total = articles.length;
  const withAbstract = articles.filter((article) => article.hasAbstract).length;
  const byJournal = {};
  for (const article of articles) {
    const key = article.journalAbbr || article.journal;
    byJournal[key] ||= { total: 0, missing: 0 };
    byJournal[key].total += 1;
    if (!article.hasAbstract) byJournal[key].missing += 1;
  }
  return {
    total,
    withAbstract,
    missingAbstract: total - withAbstract,
    abstractRate: total ? Number((withAbstract / total).toFixed(3)) : 0,
    byJournal
  };
}

async function readJsonIfExists(file) {
  try {
    return JSON.parse(await fsp.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

async function writeJson(file, data) {
  await fsp.mkdir(path.dirname(file), { recursive: true });
  await fsp.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

function hydratePayload(payload) {
  const previous = previousArticleMap(payload);
  const articles = mergeArticles(payload?.articles || [], previous);
  return {
    ...payload,
    journals: JOURNALS.length,
    themes: THEME_DEFS,
    count: articles.length,
    coverage: buildCoverage(articles),
    articles
  };
}

function payloadTime(payload) {
  const value = payload?.createdAt || payload?.generatedAt || "";
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

function newestPayload(...payloads) {
  return payloads.filter(Boolean).sort((a, b) => payloadTime(b) - payloadTime(a))[0] || null;
}

function capArticlesPerJournal(articles, limit = PER_JOURNAL) {
  const counts = new Map();
  return articles.filter((article) => {
    const key = article.journalId || article.journal;
    const count = counts.get(key) || 0;
    if (count >= limit) return false;
    counts.set(key, count + 1);
    return true;
  });
}

function buildSourceHealth(articles, errors, freshArticles = []) {
  const represented = new Set(articles.map((article) => article.journalId).filter(Boolean));
  const fresh = new Set(freshArticles.map((article) => article.journalId).filter(Boolean));
  const missing = JOURNALS.filter((journal) => !represented.has(journal.id)).map((journal) => journal.abbr);
  const fallback = JOURNALS.filter((journal) => represented.has(journal.id) && !fresh.has(journal.id)).map((journal) => journal.abbr);
  const latestPublication = articles.map((article) => article.published).filter(Boolean).sort().at(-1) || "";
  const status = missing.length || fresh.size < Math.ceil(JOURNALS.length * 0.75) ? "degraded" : errors.length ? "warning" : "healthy";
  return {
    status,
    representedJournals: represented.size,
    freshJournals: fresh.size,
    totalJournals: JOURNALS.length,
    fallbackJournals: fallback,
    missingJournals: missing,
    warningCount: errors.length,
    latestPublication,
    openAlexMode: process.env.OPENALEX_API_KEY ? "authenticated" : USE_OPENALEX ? "anonymous-batched" : "disabled",
    crossrefMode: USE_CROSSREF ? (process.env.CROSSREF_MAILTO ? "polite" : "public") : "disabled"
  };
}

function validatePayload(payload) {
  const articles = payload?.articles || [];
  const represented = new Set(articles.map((article) => article.journalId).filter(Boolean));
  const latest = articles.map((article) => article.published).filter(Boolean).sort().at(-1) || "";
  const latestAge = latest ? Math.floor((Date.now() - new Date(`${latest}T00:00:00Z`).getTime()) / 86400000) : Infinity;
  const problems = [];
  if (articles.length < Math.max(40, JOURNALS.length * 2)) problems.push(`article count is too low: ${articles.length}`);
  if (represented.size < Math.ceil(JOURNALS.length * 0.65)) problems.push(`journal coverage is too low: ${represented.size}/${JOURNALS.length}`);
  if (!Number.isFinite(latestAge) || latestAge > 60) problems.push(`latest publication is stale: ${latest || "missing"}`);
  if (!payload?.createdAt || !Number.isFinite(new Date(payload.createdAt).getTime())) problems.push("createdAt is missing or invalid");
  return { ok: problems.length === 0, problems, count: articles.length, representedJournals: represented.size, latestPublication: latest };
}

async function getArticles({ refresh = false, months = 6 } = {}) {
  const now = new Date();
  const cached = await readJsonIfExists(ARTICLE_CACHE);
  const staticCached = await readJsonIfExists(path.join(STATIC_DATA_DIR, "articles.json"));
  const baseline = newestPayload(cached, staticCached);
  if (!refresh && baseline && baseline.createdAt && Date.now() - new Date(baseline.createdAt).getTime() < CACHE_TTL_MS) {
    return { ...hydratePayload(baseline), cached: true };
  }

  const fromDate = isoDate(dateMonthsAgo(months));
  const untilDate = isoDate(now);
  const collected = [];
  const errors = [];
  const previous = previousArticleMap(baseline);

  const [results, openAlex] = await Promise.all([
    mapLimit(JOURNALS, FETCH_CONCURRENCY, async (journal) => {
      try {
        return await withTimeout(fetchJournalArticles(journal, fromDate, untilDate), JOURNAL_TIMEOUT_MS, journal.abbr);
      } catch (error) {
        return { articles: [], errors: [`${journal.abbr} journal fetch failed: ${describeError(error)}`] };
      }
    }),
    fetchOpenAlexBatches(fromDate, untilDate)
  ]);

  for (const result of results) {
    if (!result) continue;
    collected.push(...result.articles);
    errors.push(...result.errors);
  }
  collected.push(...openAlex.articles);
  errors.push(...openAlex.errors);

  const baselineInWindow = (baseline?.articles || []).filter((article) => article.published >= fromDate && article.published <= untilDate);
  const articles = capArticlesPerJournal(
    mergeArticles([...collected, ...baselineInWindow], previous).filter((article) => article.published >= fromDate && article.published <= untilDate)
  );
  const sourceHealth = buildSourceHealth(articles, errors, collected);
  const payload = {
    createdAt: now.toISOString(),
    window: { from: fromDate, until: untilDate, months },
    journals: JOURNALS.length,
    themes: THEME_DEFS,
    count: articles.length,
    coverage: buildCoverage(articles),
    sourceHealth,
    validation: null,
    articles,
    errors
  };
  payload.validation = validatePayload(payload);

  if (payload.validation.ok || !baseline) {
    await writeJson(ARTICLE_CACHE, payload);
    return { ...payload, cached: false };
  }

  return {
    ...hydratePayload(baseline),
    cached: true,
    stale: true,
    sourceHealth: { ...(baseline.sourceHealth || buildSourceHealth(baseline.articles || [], baseline.errors || [])), status: "degraded" },
    validation: payload.validation,
    errors: [...(baseline.errors || []), "Refresh validation failed; returned previous static dataset.", ...errors]
  };
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function sendText(res, status, text, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(text);
}

function mimeType(file) {
  const ext = path.extname(file).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".svg": "image/svg+xml"
    }[ext] || "application/octet-stream"
  );
}

async function serveStatic(req, res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(ROOT, safePath));
  if (!filePath.startsWith(ROOT)) {
    sendText(res, 403, "Forbidden");
    return;
  }
  const relativePath = path.relative(ROOT, filePath);
  const publicFiles = new Set(["index.html", "styles.css", "app.js"]);
  const isPublicAsset = relativePath.split(path.sep)[0] === "assets";
  if (!publicFiles.has(relativePath) && !isPublicAsset) {
    sendText(res, 404, "Not found");
    return;
  }
  try {
    const data = await fsp.readFile(filePath);
    res.writeHead(200, { "Content-Type": mimeType(filePath) });
    res.end(data);
  } catch {
    sendText(res, 404, "Not found");
  }
}

function toClientArticle(article) {
  const copy = { ...article };
  return copy;
}

function toClientPayload(payload) {
  return {
    ...payload,
    articles: Array.isArray(payload.articles) ? payload.articles.map(toClientArticle) : []
  };
}

async function exportStaticData({ refresh = false, months = 6 } = {}) {
  let payload;
  if (!refresh) {
    const cached = await readJsonIfExists(ARTICLE_CACHE);
    const staticCached = await readJsonIfExists(path.join(STATIC_DATA_DIR, "articles.json"));
    const cacheTime = cached ? new Date(cached.createdAt || cached.generatedAt || 0).getTime() : 0;
    const staticTime = staticCached ? new Date(staticCached.createdAt || staticCached.generatedAt || 0).getTime() : 0;
    payload = staticCached && staticTime >= cacheTime ? staticCached : cached ? toClientPayload(hydratePayload(cached)) : null;
  }
  if (!payload) payload = toClientPayload(await getArticles({ refresh, months }));
  await fsp.mkdir(STATIC_DATA_DIR, { recursive: true });
  await writeJson(path.join(STATIC_DATA_DIR, "articles.json"), payload);
  await writeJson(path.join(STATIC_DATA_DIR, "journals.json"), { journals: JOURNALS, themes: THEME_DEFS });
  return payload;
}

async function buildPagesDist({ refresh = false, months = 6 } = {}) {
  const payload = await exportStaticData({ refresh, months });
  await fsp.rm(DIST_DIR, { recursive: true, force: true });
  await fsp.mkdir(DIST_DIR, { recursive: true });
  const index = await fsp.readFile(path.join(ROOT, "index.html"), "utf8");
  await fsp.writeFile(
    path.join(DIST_DIR, "index.html"),
    index.replace('<meta name="glr-mode" content="server" />', '<meta name="glr-mode" content="static" />'),
    "utf8"
  );
  for (const file of ["styles.css", "app.js"]) await fsp.copyFile(path.join(ROOT, file), path.join(DIST_DIR, file));
  await fsp.cp(path.join(ROOT, "assets"), path.join(DIST_DIR, "assets"), { recursive: true });
  return payload;
}

function clientArticleId(article) {
  return article.id || article.doi || article.titleEn || article.title;
}

async function findArticleById(id, months = 6) {
  const payload = await getArticles({ refresh: false, months });
  const normalizedId = normalizeDoi(id);
  return (payload.articles || []).find((article) => {
    const keys = [clientArticleId(article), article.id, article.doi, normalizeDoi(article.doi || "")].filter(Boolean);
    return keys.includes(id) || keys.includes(normalizedId);
  });
}

function absoluteUrl(base, candidate) {
  if (!candidate) return "";
  try {
    return new URL(candidate, base).toString();
  } catch {
    return "";
  }
}

function extractFiguresFromHtml(html, pageUrl) {
  const figures = [];
  const figureBlocks = html.match(/<figure[\s\S]*?<\/figure>/gi) || [];
  const blocks = figureBlocks.length ? figureBlocks : html.match(/<img\b[\s\S]*?>/gi) || [];
  for (const block of blocks) {
    const imgMatch = block.match(/<img\b[\s\S]*?(?:src|data-src|data-original)=["']([^"']+)["'][\s\S]*?>/i);
    if (!imgMatch) continue;
    const rawSrc = htmlDecode(imgMatch[1]);
    const src = absoluteUrl(pageUrl, rawSrc);
    if (!src || /^data:/i.test(src)) continue;
    const alt = htmlDecode((block.match(/\balt=["']([^"']*)["']/i) || [])[1] || "");
    const captionRaw =
      (block.match(/<figcaption[\s\S]*?>([\s\S]*?)<\/figcaption>/i) || [])[1] ||
      (block.match(/<p[^>]*class=["'][^"']*(?:caption|legend)[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) || [])[1] ||
      "";
    const caption = cleanText(captionRaw.replace(/<[^>]+>/g, " "));
    if (!figures.some((figure) => figure.src === src)) {
      figures.push({
        src,
        alt: cleanText(alt),
        caption: caption.slice(0, 240),
        pageUrl
      });
    }
    if (figures.length >= 6) break;
  }
  return figures;
}

async function fetchArticleFigures(article) {
  if (!article.openAccess && !article.openAccessUrl && !article.pdfUrl) {
    return { figures: [], note: "Article is not marked as open access in metadata." };
  }
  const targetUrl = article.openAccessUrl || article.url;
  if (!targetUrl || /\.pdf($|\?)/i.test(targetUrl)) {
    return { figures: [], note: "Only HTML publisher pages can be scanned for figure thumbnails." };
  }
  const html = await requestText(targetUrl, { timeout: Math.min(FETCH_TIMEOUT_MS, 16000) });
  return {
    sourceUrl: targetUrl,
    figures: extractFiguresFromHtml(html, targetUrl)
  };
}

async function handleApi(req, res, url) {
  try {
    if (url.pathname === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        journals: JOURNALS.length,
        node: process.version,
        proxy: Boolean(getProxy({ force: true })),
        metadataMode: "publisher-original"
      });
      return;
    }

    if (url.pathname === "/api/journals") {
      sendJson(res, 200, { journals: JOURNALS, themes: THEME_DEFS });
      return;
    }

    if (url.pathname === "/api/articles") {
      const refresh = url.searchParams.get("refresh") === "1";
      const months = Math.max(1, Math.min(12, Number(url.searchParams.get("months") || 6)));
      sendJson(res, 200, toClientPayload(await getArticles({ refresh, months })));
      return;
    }

    if (url.pathname === "/api/coverage") {
      const months = Math.max(1, Math.min(12, Number(url.searchParams.get("months") || 6)));
      const payload = await getArticles({ refresh: false, months });
      sendJson(res, 200, payload.coverage);
      return;
    }

    if (url.pathname === "/api/figures") {
      const id = url.searchParams.get("id") || "";
      const months = Math.max(1, Math.min(12, Number(url.searchParams.get("months") || 6)));
      const article = await findArticleById(id, months);
      if (!article) {
        sendJson(res, 404, { error: "Article not found." });
        return;
      }
      sendJson(res, 200, await fetchArticleFigures(article));
      return;
    }

    sendJson(res, 404, { error: "Unknown API endpoint." });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

async function createServer() {
  await fsp.mkdir(CACHE_DIR, { recursive: true });
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, decodeURIComponent(url.pathname));
  });
}

async function runSelfTest() {
  const server = await createServer();
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", async () => {
      const address = server.address();
      const base = `http://127.0.0.1:${address.port}`;
      try {
        const health = await requestJson(`${base}/api/health`);
        const articles = await requestJson(`${base}/api/articles?months=6`);
        const home = await requestText(`${base}/`);
        const sample = articles.articles?.[0] || null;
        resolve({
          base,
          health,
          articleCount: articles.count,
          cached: articles.cached,
          coverage: articles.coverage,
          sample,
          originalMetadataCheck: sample
            ? {
                hasEnglishTitle: Boolean(sample.titleEn || sample.title),
                hasEnglishAbstract: Boolean(sample.abstractEn || sample.abstract),
                hasTranslatedMetadata: Boolean(sample.zh || sample.zhKeywords || sample.localDigest)
              }
            : null,
          homeOk: home.includes("Geo Literature Radar"),
          homeLength: home.length
        });
      } catch (error) {
        reject(error);
      } finally {
        server.close();
      }
    });
  });
}

async function runCli() {
  if (process.argv.includes("--validate-static")) {
    const payload = await readJsonIfExists(path.join(STATIC_DATA_DIR, "articles.json"));
    const result = validatePayload(payload);
    console.log(JSON.stringify(result, null, 2));
    if (!result.ok) process.exitCode = 1;
    return;
  }

  if (process.argv.includes("--export-static")) {
    const payload = await exportStaticData({ refresh: process.argv.includes("--refresh"), months: STATIC_WINDOW_MONTHS });
    console.log(`Exported static data for ${payload.count} articles to ${path.relative(ROOT, STATIC_DATA_DIR)}.`);
    return;
  }

  if (process.argv.includes("--build-pages")) {
    const payload = await buildPagesDist({ refresh: process.argv.includes("--refresh"), months: STATIC_WINDOW_MONTHS });
    console.log(`Built GitHub Pages artifact at ${path.relative(ROOT, DIST_DIR)} with ${payload.count} articles.`);
    return;
  }

  if (process.argv.includes("--refresh-once")) {
    const payload = await getArticles({ refresh: true, months: STATIC_WINDOW_MONTHS });
    console.log(`Fetched ${payload.count} articles from ${payload.journals} journals.`);
    console.log(`Abstract coverage: ${payload.coverage.withAbstract}/${payload.coverage.total} (${Math.round(payload.coverage.abstractRate * 100)}%)`);
    if (payload.errors.length) {
      console.log("Warnings:");
      payload.errors.slice(0, 20).forEach((error) => console.log(`- ${error}`));
    }
    return;
  }

  if (process.argv.includes("--self-test")) {
    console.log(JSON.stringify(await runSelfTest(), null, 2));
    return;
  }

  const server = await createServer();
  server.listen(PORT, () => {
    console.log(`Geo Literature Radar running at http://localhost:${PORT}`);
  });
}

module.exports = {
  createServer,
  getArticles,
  exportStaticData,
  buildPagesDist,
  validatePayload,
  runSelfTest,
  JOURNALS,
  THEMES: THEME_DEFS
};

if (require.main === module) {
  runCli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
