(function () {
  const I18N = {
    zh: {
      brandSubtitle: "地球系统科学前沿追踪",
      navRadar: "主题雷达",
      navPapers: "论文列表",
      navSources: "期刊源",
      refresh: "刷新",
      loading: "加载中",
      filters: "筛选",
      search: "搜索",
      searchPlaceholder: "题名、作者、关键词、期刊",
      searchMode: "搜索模式",
      fuzzySearch: "综合模糊搜索",
      keywordSearch: "精确关键词搜索",
      theme: "主题",
      journal: "期刊",
      abstractStatus: "摘要状态",
      personalFilter: "个人记录",
      allPapers: "全部论文",
      favoritesOnly: "我的收藏",
      historyOnly: "浏览历史",
      sort: "排序",
      months: "追踪",
      dataAudit: "数据审计",
      themeRadar: "主题雷达",
      paperList: "论文列表",
      cards: "卡片",
      table: "表格",
      date: "日期",
      paper: "论文",
      link: "链接",
      citations: "引用",
      journalSources: "期刊源清单",
      sourceText: "监测 18 个高质量期刊；题录来自官方源、OpenAlex 和 DOI 元数据，全文始终回链原站。",
      metricPapers: "论文",
      metricJournals: "期刊",
      metricAbstracts: "摘要覆盖",
      metricUpdated: "更新",
      heroTitle: "地球系统科学前沿追踪",
      heroDescription: "聚合近半年核心期刊论文，按主题、期刊、引用热度、摘要可用性与个人阅读记录组织，保留英文原文题录并提供中文速览。",
      allThemes: "全部主题",
      allJournals: "全部期刊",
      newest: "最新优先",
      cited: "引用热度",
      priority: "阅读优先级",
      journalName: "期刊名称",
      threeMonths: "近 3 个月",
      sixMonths: "近 6 个月",
      twelveMonths: "近 12 个月",
      resultCount: "当前显示 {n} 篇论文。",
      cachedCount: "已加载缓存数据，共 {n} 篇。",
      refreshedCount: "已从真实数据源更新，共 {n} 篇。",
      coverage: "摘要覆盖 {withAbstract}/{total}，缺摘要 {missing} 篇。缺失通常因为 DOI/OpenAlex/Crossref 元数据未开放摘要字段；请点开官方页面核对。",
      noAbstract: "缺摘要",
      hasAbstract: "有摘要",
      allAbstracts: "全部",
      oa: "开放获取",
      metadata: "元数据",
      authorsPending: "作者待核对",
      details: "查看详情",
      official: "官方链接",
      doi: "DOI",
      englishTitle: "英文题名",
      englishKeywords: "英文索引词",
      keywordNote: "这些词来自 OpenAlex/Crossref 概念词或主题词，不一定等同于期刊页面的作者关键词。",
      englishAbstractExcerpt: "英文摘要缩略",
      chineseBrief: "中文速览",
      originalEnglish: "英文原文信息",
      abstract: "摘要",
      noAbstractLong: "当前 DOI/OpenAlex/Crossref 元数据没有提供英文摘要。部分出版社页面会显示摘要，但该字段未必开放给聚合元数据源；请打开官方页面核对摘要、方法和结论。",
      priorityBadge: "优先",
      empty: "没有匹配的论文。",
      backToAll: "返回全部主题",
      favorite: "收藏",
      favorited: "已收藏",
      history: "历史",
      profileTitle: "研究者 ID",
      profileName: "姓名",
      profileEmail: "邮箱",
      createProfile: "进入",
      switchUser: "切换",
      localProfileNote: "本地 ID 用于收藏和历史记录；公网静态站点不保存真实登录态。",
      agentTitle: "文献 Agent",
      agentRun: "执行",
      agentTopCited: "高被引",
      agentFavorites: "收藏",
      agentPlaceholder: "例如：筛选近 6 个月气候变化方向、按引用排序，并给我 5 篇候选",
      agentEmpty: "输入自然语言指令后，我会调整筛选并给出候选文献。",
      agentResult: "已根据指令更新筛选，当前候选 {n} 篇。",
      generateZh: "生成中文速览",
      refreshZh: "更新中文速览",
      localZhOnly: "当前为本地保守速览；本地服务器启用 OPENAI_SUMMARY_ENABLED=1 时可生成更准确的中文总结。",
      figureScout: "扫描开放图表",
      figureUnavailable: "公网静态站点无法代抓出版社页面；请在本地服务器运行后扫描，或直接打开官方页面查看图表。",
      figureEmpty: "未在开放页面中识别到可展示图表。",
      figureTitle: "开放图表预览",
      copied: "已更新",
      close: "关闭"
    },
    en: {
      brandSubtitle: "Earth System Science Frontiers",
      navRadar: "Radar",
      navPapers: "Papers",
      navSources: "Sources",
      refresh: "Refresh",
      loading: "Loading",
      filters: "Filters",
      search: "Search",
      searchPlaceholder: "title, author, keyword, journal",
      searchMode: "Search mode",
      fuzzySearch: "Broad fuzzy search",
      keywordSearch: "Exact keyword search",
      theme: "Theme",
      journal: "Journal",
      abstractStatus: "Abstract status",
      personalFilter: "Personal",
      allPapers: "All papers",
      favoritesOnly: "Favorites",
      historyOnly: "History",
      sort: "Sort",
      months: "Window",
      dataAudit: "Data audit",
      themeRadar: "Theme Radar",
      paperList: "Paper List",
      cards: "Cards",
      table: "Table",
      date: "Date",
      paper: "Paper",
      link: "Link",
      citations: "Citations",
      journalSources: "Journal Sources",
      sourceText: "Tracking 18 high-quality journals; metadata comes from publisher feeds, OpenAlex, and DOI indexes, with links back to original sources.",
      metricPapers: "Papers",
      metricJournals: "Journals",
      metricAbstracts: "Abstracts",
      metricUpdated: "Updated",
      heroTitle: "Earth System Science Frontiers",
      heroDescription: "A focused tracker for recent high-quality journal papers, organized by theme, source, citations, abstract availability, and personal reading records.",
      allThemes: "All themes",
      allJournals: "All journals",
      newest: "Newest",
      cited: "Most cited",
      priority: "Reading priority",
      journalName: "Journal name",
      threeMonths: "Past 3 months",
      sixMonths: "Past 6 months",
      twelveMonths: "Past 12 months",
      resultCount: "Showing {n} papers.",
      cachedCount: "Loaded cached data: {n} papers.",
      refreshedCount: "Updated from live sources: {n} papers.",
      coverage: "Abstract coverage {withAbstract}/{total}; {missing} papers are missing abstracts because the DOI/OpenAlex/Crossref metadata did not expose the abstract field.",
      noAbstract: "No abstract",
      hasAbstract: "Abstract",
      allAbstracts: "All",
      oa: "Open access",
      metadata: "Metadata",
      authorsPending: "Authors pending",
      details: "Details",
      official: "Official link",
      doi: "DOI",
      englishTitle: "English title",
      englishKeywords: "English index terms",
      keywordNote: "Terms are OpenAlex/Crossref concepts or subject tags, not necessarily publisher author keywords.",
      englishAbstractExcerpt: "English abstract excerpt",
      chineseBrief: "Chinese brief",
      originalEnglish: "Original English",
      abstract: "Abstract",
      noAbstractLong: "No English abstract is available in the current DOI/OpenAlex/Crossref metadata. The publisher page may still show one; open the official page to verify.",
      priorityBadge: "Priority",
      empty: "No matching papers.",
      backToAll: "Back to all themes",
      favorite: "Favorite",
      favorited: "Favorited",
      history: "History",
      profileTitle: "Researcher ID",
      profileName: "Name",
      profileEmail: "Email",
      createProfile: "Enter",
      switchUser: "Switch",
      localProfileNote: "Local ID stores favorites and history in this browser. Static Pages does not provide real authentication.",
      agentTitle: "Literature Agent",
      agentRun: "Run",
      agentTopCited: "Cited",
      agentFavorites: "Favorites",
      agentPlaceholder: "Example: find climate papers from the past 6 months, sort by citations, and show five candidates",
      agentEmpty: "Type a natural-language instruction to adjust filters and get candidate papers.",
      agentResult: "Filters updated from your instruction. Current candidates: {n}.",
      generateZh: "Generate Chinese brief",
      refreshZh: "Refresh Chinese brief",
      localZhOnly: "This is a conservative local brief; enable OPENAI_SUMMARY_ENABLED=1 on the local server for AI summaries.",
      figureScout: "Scan OA figures",
      figureUnavailable: "Static Pages cannot proxy publisher pages. Run the local server to scan, or open the publisher page.",
      figureEmpty: "No displayable figures were detected on the open page.",
      figureTitle: "Open figure preview",
      copied: "Updated",
      close: "Close"
    }
  };

  const KEYWORD_ZH = new Map(
    Object.entries({
      climate: "气候",
      precipitation: "降水",
      storm: "风暴",
      drought: "干旱",
      flood: "洪涝",
      hydrology: "水文",
      groundwater: "地下水",
      carbon: "碳循环",
      vegetation: "植被",
      forest: "森林",
      crop: "作物",
      remote: "遥感",
      satellite: "卫星遥感",
      urbanization: "城市化",
      model: "模型",
      uncertainty: "不确定性",
      ecosystem: "生态系统",
      biodiversity: "生物多样性",
      glacier: "冰川",
      soil: "土壤",
      ocean: "海洋",
      aerosol: "气溶胶",
      wildfire: "野火",
      evapotranspiration: "蒸散发",
      "land use": "土地利用",
      "climate change": "气候变化",
      "earth system": "地球系统",
      "remote sensing": "遥感",
      "machine learning": "机器学习"
    })
  );

  const THEME_ALIASES = {
    climate: ["气候", "climate", "precipitation", "降水", "极端"],
    hydro: ["水文", "hydro", "water", "地下水", "洪水", "flood"],
    model: ["模型", "model", "gmd", "simulation", "uncertainty"],
    remote: ["遥感", "remote", "satellite", "rse", "earth observation"],
    ecology: ["生态", "ecology", "carbon", "vegetation", "gcb"],
    hazards: ["灾害", "hazard", "risk", "drought", "wildfire"],
    general: ["综合", "nature", "science"]
  };

  const state = {
    lang: localStorage.getItem("glr-lang") || "zh",
    profile: readJson("glr-profile") || null,
    records: {},
    journals: [],
    themes: [],
    articles: [],
    filtered: [],
    coverage: null,
    lastPayload: null,
    selectedTheme: "all",
    selectedJournal: "all",
    selectedAbstract: "all",
    selectedPersonal: "all",
    searchMode: "fuzzy",
    query: "",
    sort: "date",
    months: 6,
    view: "cards",
    activeDetailId: null
  };

  const els = {
    count: document.querySelector("#stat-count"),
    journals: document.querySelector("#stat-journals"),
    abstracts: document.querySelector("#stat-abstracts"),
    updated: document.querySelector("#stat-updated"),
    search: document.querySelector("#search"),
    searchMode: document.querySelector("#search-mode"),
    themeFilter: document.querySelector("#theme-filter"),
    journalFilter: document.querySelector("#journal-filter"),
    abstractFilter: document.querySelector("#abstract-filter"),
    personalFilter: document.querySelector("#personal-filter"),
    sortSelect: document.querySelector("#sort-select"),
    monthsSelect: document.querySelector("#months-select"),
    resultNote: document.querySelector("#result-note"),
    coverageNote: document.querySelector("#coverage-note"),
    windowLabel: document.querySelector("#window-label"),
    radarBoard: document.querySelector("#radar-board"),
    clearThemeButton: document.querySelector("#clear-theme-button"),
    paperList: document.querySelector("#paper-list"),
    tableWrap: document.querySelector("#paper-table-wrap"),
    tableBody: document.querySelector("#paper-table-body"),
    journalGrid: document.querySelector("#journal-grid"),
    refreshButton: document.querySelector("#refresh-button"),
    languageToggle: document.querySelector("#language-toggle"),
    detailDialog: document.querySelector("#detail-dialog"),
    detailContent: document.querySelector("#detail-content"),
    toast: document.querySelector("#toast"),
    profileForm: document.querySelector("#profile-form"),
    profileName: document.querySelector("#profile-name"),
    profileEmail: document.querySelector("#profile-email-input"),
    profileReset: document.querySelector("#profile-reset"),
    profileSummary: document.querySelector("#profile-summary"),
    agentInput: document.querySelector("#agent-input"),
    agentRun: document.querySelector("#agent-run"),
    agentResult: document.querySelector("#agent-result")
  };

  function readJson(key, fallback = null) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") || fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function t(key, params = {}) {
    let text = I18N[state.lang][key] || I18N.zh[key] || key;
    Object.entries(params).forEach(([name, value]) => {
      text = text.replace(`{${name}}`, value);
    });
    return text;
  }

  function label(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return state.lang === "zh" ? value.zh || value.en : value.en || value.zh;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]+/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function articleKey(article) {
    return article.id || article.doi || article.titleEn || article.title;
  }

  function storageScope() {
    return state.profile?.id || "guest";
  }

  function loadRecords() {
    state.records = readJson(`glr-records-${storageScope()}`, { favorites: [], history: [] });
    state.records.favorites ||= [];
    state.records.history ||= [];
  }

  function saveRecords() {
    writeJson(`glr-records-${storageScope()}`, state.records);
  }

  function isFavorite(id) {
    return state.records.favorites.includes(id);
  }

  function formatDate(value) {
    if (!value) return "--";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return state.lang === "zh"
      ? date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  }

  function formatDateTime(value) {
    if (!value) return "--";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return state.lang === "zh"
      ? date.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
      : date.toLocaleString("en-US", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 3200);
  }

  function sameSiteUrl(url) {
    return url.startsWith("/") ? `.${url}` : url;
  }

  function preferStaticData(url, options) {
    if (!url.startsWith("/api/")) return false;
    if (options?.method && options.method !== "GET") return false;
    return location.hostname.endsWith("github.io") || location.port === "8062" || location.protocol === "file:";
  }

  async function getStaticFallback(url) {
    const pathname = url.split("?")[0];
    if (pathname === "/api/journals") {
      return getJson("assets/data/journals.json", { staticOnly: true });
    }
    if (pathname === "/api/articles") {
      const payload = await getJson("assets/data/articles.json", { staticOnly: true });
      return { ...payload, cached: true, static: true };
    }
    if (pathname === "/api/coverage") {
      const payload = await getJson("assets/data/articles.json", { staticOnly: true });
      return payload.coverage || {};
    }
    return null;
  }

  async function getJson(url, options) {
    if (!options?.staticOnly && preferStaticData(url, options)) {
      const fallback = await getStaticFallback(url);
      if (fallback) return fallback;
    }
    try {
      const response = await fetch(sameSiteUrl(url), options);
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text || "Response is not JSON");
      }
      if (!response.ok) throw new Error(data.error || response.statusText);
      return data;
    } catch (error) {
      if (!options?.staticOnly && (!options?.method || options.method === "GET") && url.startsWith("/api/")) {
        const fallback = await getStaticFallback(url);
        if (fallback) return fallback;
      }
      throw error;
    }
  }

  function translateKeyword(keyword) {
    const key = normalizeText(keyword);
    if (!key) return "";
    if (KEYWORD_ZH.has(key)) return KEYWORD_ZH.get(key);
    for (const [term, zh] of KEYWORD_ZH.entries()) {
      if (key.includes(term)) return zh;
    }
    return keyword;
  }

  function englishKeywords(article) {
    const terms = article.keywordsEn || article.subjects || [];
    return [...new Set(terms.map((term) => String(term || "").trim()).filter(Boolean))].slice(0, 8);
  }

  function chineseKeywords(article) {
    if (article.zh?.keywords?.length) return article.zh.keywords.slice(0, 8);
    if (article.localDigest?.keywords?.length) return article.localDigest.keywords.slice(0, 8);
    if (article.zhKeywords?.length) return article.zhKeywords.slice(0, 8);
    const terms = englishKeywords(article).map(translateKeyword);
    const theme = article.themeZh || article.theme;
    return [...new Set([theme, ...terms].filter(Boolean))].slice(0, 8);
  }

  function splitSentences(text = "") {
    return String(text)
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
  }

  function englishAbstractExcerpt(article, maxChars = 360) {
    const text = article.abstractEn || article.abstract || "";
    if (!text) return t("noAbstractLong");
    const excerpt = (splitSentences(text).slice(0, 2).join(" ") || text).trim();
    return excerpt.length > maxChars ? `${excerpt.slice(0, maxChars).trim()}...` : excerpt;
  }

  function localChineseBrief(article) {
    if (article.zh?.summary) return article.zh.summary;
    if (article.localDigest?.summary) return article.localDigest.summary;
    const keywords = chineseKeywords(article).slice(0, 4).join("、") || (article.themeZh || "地球系统科学");
    if (!article.hasAbstract) {
      return `当前聚合元数据缺少摘要；仅可根据题名、期刊和索引词判断，该文可能与${keywords}相关。建议打开官方页面核对摘要、方法和结论。`;
    }
    return `该文可先作为${keywords}方向的候选文献。聚合元数据已获取英文摘要，可继续核对研究对象、数据来源、方法路径、主要结论和不确定性表达；如需精确中文总结，请在详情页生成中文速览。`;
  }

  function articleTitle(article) {
    return article.titleEn || article.title || "";
  }

  function priorityScore(article) {
    let score = 0;
    if (article.hasAbstract) score += 5;
    if (article.openAccess) score += 1;
    if (article.themeId && article.themeId !== "general") score += 2;
    score += Math.min(6, Math.log10((article.citedBy || 0) + 1) * 3);
    const journalBoost = {
      "nature-climate-change": 4,
      "nature-geoscience": 4,
      "water-resources-research": 3,
      hess: 3,
      gmd: 3,
      "remote-sensing-of-environment": 3,
      "global-change-biology": 3,
      nhess: 2
    };
    score += journalBoost[article.journalId] || 0;
    return Number(score.toFixed(2));
  }

  function themeName(themeOrArticle) {
    if (!themeOrArticle) return "";
    if (themeOrArticle.zh && themeOrArticle.en) return label(themeOrArticle);
    return state.lang === "zh" ? themeOrArticle.themeZh || themeOrArticle.theme : themeOrArticle.themeEn || themeOrArticle.theme;
  }

  function enrichArticles(articles) {
    return articles.map((article) => ({
      ...article,
      zhKeywords: chineseKeywords(article),
      localDigest: article.localDigest || {
        summary: localChineseBrief(article),
        keywords: chineseKeywords(article),
        source: "local",
        note: I18N.zh.localZhOnly
      }
    }));
  }

  function renderChrome() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.querySelector("#brand-subtitle").textContent = t("brandSubtitle");
    document.querySelector("#hero-title").textContent = t("heroTitle");
    document.querySelector("#hero-description").textContent = t("heroDescription");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    els.search.placeholder = t("searchPlaceholder");
    els.agentInput.placeholder = t("agentPlaceholder");
    els.languageToggle.textContent = state.lang === "zh" ? "EN" : "中";
    populateFilters();
    updateStaticSelects();
    renderProfile();
  }

  function updateStaticSelects() {
    const sortLabels = {
      date: t("newest"),
      cited: t("cited"),
      priority: t("priority"),
      journal: t("journalName")
    };
    [...els.sortSelect.options].forEach((option) => {
      option.textContent = sortLabels[option.value] || option.textContent;
    });
    const monthLabels = {
      3: t("threeMonths"),
      6: t("sixMonths"),
      12: t("twelveMonths")
    };
    [...els.monthsSelect.options].forEach((option) => {
      option.textContent = monthLabels[option.value] || option.textContent;
    });
    const searchLabels = {
      fuzzy: t("fuzzySearch"),
      keyword: t("keywordSearch")
    };
    [...els.searchMode.options].forEach((option) => {
      option.textContent = searchLabels[option.value] || option.textContent;
    });
    const personalLabels = {
      all: t("allPapers"),
      favorites: t("favoritesOnly"),
      history: t("historyOnly")
    };
    [...els.personalFilter.options].forEach((option) => {
      option.textContent = personalLabels[option.value] || option.textContent;
    });
    els.windowLabel.textContent = monthLabels[state.months] || `${state.months}`;
  }

  function populateFilters() {
    els.themeFilter.innerHTML = [
      `<option value="all">${escapeHtml(t("allThemes"))}</option>`,
      ...state.themes.map((theme) => `<option value="${escapeHtml(theme.id)}">${escapeHtml(label(theme))}</option>`)
    ].join("");
    els.themeFilter.value = state.selectedTheme;

    els.journalFilter.innerHTML = [
      `<option value="all">${escapeHtml(t("allJournals"))}</option>`,
      ...state.journals.map((journal) => `<option value="${escapeHtml(journal.id)}">${escapeHtml(journal.abbr)} · ${escapeHtml(journal.name)}</option>`)
    ].join("");
    els.journalFilter.value = state.selectedJournal;

    els.abstractFilter.innerHTML = [
      `<option value="all">${escapeHtml(t("allAbstracts"))}</option>`,
      `<option value="available">${escapeHtml(t("hasAbstract"))}</option>`,
      `<option value="missing">${escapeHtml(t("noAbstract"))}</option>`
    ].join("");
    els.abstractFilter.value = state.selectedAbstract;
    els.searchMode.value = state.searchMode;
    els.personalFilter.value = state.selectedPersonal;
  }

  function renderStats(payload) {
    state.lastPayload = { ...(state.lastPayload || {}), ...payload };
    const coverage = payload.coverage || state.coverage;
    els.count.textContent = String(payload.count || state.articles.length || 0);
    els.journals.textContent = String(payload.journals || state.journals.length || 0);
    els.abstracts.textContent = coverage ? `${Math.round(coverage.abstractRate * 100)}%` : "--";
    els.updated.textContent = formatDateTime(payload.createdAt);
    els.resultNote.textContent = payload.cached ? t("cachedCount", { n: payload.count || 0 }) : t("refreshedCount", { n: payload.count || 0 });
    if (coverage) {
      els.coverageNote.textContent = t("coverage", {
        withAbstract: coverage.withAbstract,
        total: coverage.total,
        missing: coverage.missingAbstract
      });
    }
    if (payload.errors && payload.errors.length) {
      console.warn("Source warnings", payload.errors);
      showToast(state.lang === "zh" ? "部分数据源返回较慢，已保留可用结果。" : "Some sources were slow; available results are preserved.");
    }
  }

  function queryTokens(query) {
    return query
      .split(/[,;，；]+|\s{2,}/)
      .map(normalizeText)
      .filter(Boolean);
  }

  function keywordExactMatch(article, query) {
    const tokens = queryTokens(query);
    if (!tokens.length) return true;
    const keywords = [...englishKeywords(article), ...chineseKeywords(article)].map(normalizeText).filter(Boolean);
    return tokens.every((token) => keywords.some((keyword) => keyword === token || keyword.includes(token)));
  }

  function fuzzyMatch(article, query) {
    const haystack = [
      article.title,
      article.titleEn,
      article.journal,
      article.journalAbbr,
      article.themeZh,
      article.themeEn,
      article.abstract,
      article.abstractEn,
      localChineseBrief(article),
      (article.authors || []).join(" "),
      englishKeywords(article).join(" "),
      chineseKeywords(article).join(" "),
      (article.subjects || []).join(" ")
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  }

  function applyFilters() {
    const query = state.query.trim().toLowerCase();
    let list = state.articles.filter((item) => {
      const id = articleKey(item);
      const themeMatch = state.selectedTheme === "all" || item.themeId === state.selectedTheme;
      const journalMatch = state.selectedJournal === "all" || item.journalId === state.selectedJournal;
      const abstractMatch = state.selectedAbstract === "all" || item.abstractStatus === state.selectedAbstract;
      const personalMatch =
        state.selectedPersonal === "all" ||
        (state.selectedPersonal === "favorites" && state.records.favorites.includes(id)) ||
        (state.selectedPersonal === "history" && state.records.history.includes(id));
      const queryMatch = !query || (state.searchMode === "keyword" ? keywordExactMatch(item, query) : fuzzyMatch(item, query));
      return themeMatch && journalMatch && abstractMatch && personalMatch && queryMatch;
    });

    if (state.sort === "cited") {
      list = list.sort((a, b) => (b.citedBy || 0) - (a.citedBy || 0) || String(b.published).localeCompare(a.published));
    } else if (state.sort === "priority") {
      list = list.sort((a, b) => priorityScore(b) - priorityScore(a) || String(b.published).localeCompare(a.published));
    } else if (state.sort === "journal") {
      list = list.sort((a, b) => String(a.journal).localeCompare(String(b.journal)) || String(b.published).localeCompare(a.published));
    } else {
      list = list.sort((a, b) => String(b.published).localeCompare(a.published));
    }

    state.filtered = list;
    els.resultNote.textContent = t("resultCount", { n: list.length });
    els.clearThemeButton.hidden = state.selectedTheme === "all";
    renderRadar();
    renderPapers();
    renderProfile();
  }

  function groupByTheme(list) {
    const base = state.selectedTheme === "all" ? list : state.articles.filter((item) => state.selectedJournal === "all" || item.journalId === state.selectedJournal);
    const counts = new Map(state.themes.map((theme) => [theme.id, { theme, count: 0, abstracts: 0 }]));
    base.forEach((item) => {
      if (!counts.has(item.themeId)) return;
      const row = counts.get(item.themeId);
      row.count += 1;
      if (item.hasAbstract) row.abstracts += 1;
    });
    return [...counts.values()].sort((a, b) => b.count - a.count);
  }

  function renderRadar() {
    const rows = groupByTheme(state.filtered);
    const max = Math.max(1, ...rows.map((row) => row.count));
    const visible = rows.filter((row) => row.count > 0);
    if (!visible.length) {
      els.radarBoard.innerHTML = `<div class="empty-state">${escapeHtml(t("empty"))}</div>`;
      return;
    }
    els.radarBoard.innerHTML = visible
      .map((row) => {
        const pct = Math.max(8, Math.round((row.count / max) * 100));
        const active = state.selectedTheme === row.theme.id ? " active" : "";
        return `
          <button class="radar-tile${active}" data-theme="${escapeHtml(row.theme.id)}" type="button" style="--theme-color:${escapeHtml(row.theme.color)}">
            <span class="tile-head">
              <strong>${escapeHtml(label(row.theme))}</strong>
              <em>${row.count}</em>
            </span>
            <span class="tile-bar"><span style="width:${pct}%"></span></span>
            <small>${escapeHtml(t("metricAbstracts"))}: ${row.abstracts}/${row.count}</small>
          </button>
        `;
      })
      .join("");
    document.querySelectorAll("[data-theme]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedTheme = button.dataset.theme;
        els.themeFilter.value = state.selectedTheme;
        applyFilters();
        document.querySelector("#papers").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function metaBadges(article) {
    return `
      <span>${escapeHtml(formatDate(article.published))}</span>
      <span>${escapeHtml(article.journalAbbr || article.journal)}</span>
      <span>${escapeHtml(t("citations"))}: ${Number(article.citedBy || 0).toLocaleString()}</span>
      <span class="${article.hasAbstract ? "ok" : "warn"}">${escapeHtml(article.hasAbstract ? t("hasAbstract") : t("noAbstract"))}</span>
      ${priorityScore(article) >= 10 ? `<span class="ok">${escapeHtml(t("priorityBadge"))}</span>` : ""}
      <span>${escapeHtml(article.openAccess ? t("oa") : t("metadata"))}</span>
    `;
  }

  function paperCard(article) {
    const id = articleKey(article);
    const authors = article.authors && article.authors.length ? article.authors.join(", ") : t("authorsPending");
    const enKeywords = englishKeywords(article);
    const zhKeywords = chineseKeywords(article);
    const previewLabel = state.lang === "zh" ? t("chineseBrief") : t("englishAbstractExcerpt");
    const preview = state.lang === "zh" ? localChineseBrief(article) : englishAbstractExcerpt(article);
    const fav = isFavorite(id);
    return `
      <article class="paper-card" style="--theme-color:${escapeHtml(article.themeColor || "#2563eb")}">
        <div class="paper-meta">${metaBadges(article)}</div>
        <div class="title-stack">
          <div class="title-line">
            <span>${escapeHtml(t("englishTitle"))}</span>
            <h3>${escapeHtml(articleTitle(article))}</h3>
          </div>
        </div>
        <p class="authors">${escapeHtml(authors)}</p>
        <div class="keyword-groups">
          <div>
            <span>${escapeHtml(state.lang === "zh" ? "中文主题词" : t("englishKeywords"))}</span>
            <div class="badge-row">${(state.lang === "zh" ? zhKeywords : enKeywords).map((keyword) => `<span class="badge">${escapeHtml(keyword)}</span>`).join("") || `<span class="badge muted">${escapeHtml(t("metadata"))}</span>`}</div>
          </div>
        </div>
        <div class="abstract-preview">
          <span>${escapeHtml(previewLabel)}</span>
          <p>${escapeHtml(preview)}</p>
        </div>
        <div class="card-actions">
          <button class="text-button" data-detail="${escapeHtml(id)}" type="button">${escapeHtml(t("details"))}</button>
          <button class="favorite-button${fav ? " active" : ""}" data-favorite="${escapeHtml(id)}" type="button">${escapeHtml(fav ? t("favorited") : t("favorite"))}</button>
          <a class="official-link" href="${escapeHtml(article.url || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))}</a>
        </div>
      </article>
    `;
  }

  function renderPapers() {
    const limited = state.filtered.slice(0, 140);
    if (!limited.length) {
      els.paperList.innerHTML = `<div class="empty-state">${escapeHtml(t("empty"))}</div>`;
      els.tableBody.innerHTML = "";
      return;
    }
    els.paperList.innerHTML = limited.map(paperCard).join("");
    els.tableBody.innerHTML = limited
      .map(
        (article) => `
          <tr>
            <td>${escapeHtml(formatDate(article.published))}</td>
            <td>${escapeHtml(article.journalAbbr || article.journal)}</td>
            <td>${escapeHtml(themeName(article))}</td>
            <td>${Number(article.citedBy || 0).toLocaleString()}</td>
            <td>
              <strong>${escapeHtml(articleTitle(article))}</strong>
              <small>${escapeHtml(state.lang === "zh" ? localChineseBrief(article) : englishAbstractExcerpt(article, 180))}</small>
            </td>
            <td><a class="official-link" href="${escapeHtml(article.url || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))}</a></td>
          </tr>
        `
      )
      .join("");

    document.querySelectorAll("[data-detail]").forEach((button) => {
      button.addEventListener("click", () => {
        const article = state.articles.find((item) => articleKey(item) === button.dataset.detail);
        if (article) openDetail(article);
      });
    });
    document.querySelectorAll("[data-favorite]").forEach((button) => {
      button.addEventListener("click", () => toggleFavorite(button.dataset.favorite));
    });
  }

  function renderJournals() {
    els.journalGrid.innerHTML = state.journals
      .map((journal) => {
        const category = state.themes.find((theme) => theme.zh === journal.category) || { zh: journal.category, en: journal.category };
        return `
          <article class="journal-card">
            <div class="paper-meta">
              <span>${escapeHtml(journal.abbr)}</span>
              <span>${escapeHtml(label(category))}</span>
              <span>${journal.feedUrl ? "RSS" : "DOI"}</span>
            </div>
            <h3>${escapeHtml(journal.name)}</h3>
            <p>${escapeHtml(journal.publisher)} · ISSN ${escapeHtml((journal.issn || []).join(" / "))}</p>
            <a href="${escapeHtml(journal.officialUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))}</a>
          </article>
        `;
      })
      .join("");
  }

  function addHistory(id) {
    state.records.history = [id, ...state.records.history.filter((item) => item !== id)].slice(0, 80);
    saveRecords();
  }

  function toggleFavorite(id) {
    if (isFavorite(id)) {
      state.records.favorites = state.records.favorites.filter((item) => item !== id);
    } else {
      state.records.favorites = [id, ...state.records.favorites].slice(0, 120);
    }
    saveRecords();
    applyFilters();
  }

  function openDetail(article) {
    const id = articleKey(article);
    state.activeDetailId = id;
    addHistory(id);
    const authors = article.authors && article.authors.length ? article.authors.join(", ") : t("authorsPending");
    const doiUrl = article.doi ? `https://doi.org/${article.doi}` : "";
    const enKeywords = englishKeywords(article);
    const zhKeywords = chineseKeywords(article);
    const fav = isFavorite(id);
    els.detailContent.innerHTML = `
      <div class="paper-meta">${metaBadges(article)}</div>
      <h2>${escapeHtml(articleTitle(article))}</h2>
      <p class="authors">${escapeHtml(authors)}</p>

      <section class="detail-block zh-brief">
        <div class="block-title"><strong>${escapeHtml(t("chineseBrief"))}</strong><span>${escapeHtml(article.zh?.source === "openai" ? "AI" : "local")}</span></div>
        <p>${escapeHtml(localChineseBrief(article))}</p>
        <div class="badge-row">${zhKeywords.map((keyword) => `<span class="badge theme">${escapeHtml(keyword)}</span>`).join("")}</div>
        <small>${escapeHtml(article.zh?.note || article.localDigest?.note || t("localZhOnly"))}</small>
      </section>

      <section class="detail-block english">
        <div class="block-title"><strong>${escapeHtml(t("originalEnglish"))}</strong><span>${escapeHtml(article.journal)}</span></div>
        <h3>${escapeHtml(article.titleEn || article.title)}</h3>
        <div class="badge-row">${enKeywords.map((keyword) => `<span class="badge">${escapeHtml(keyword)}</span>`).join("")}</div>
        <small>${escapeHtml(t("keywordNote"))}</small>
        <p>${escapeHtml(article.abstractEn || article.abstract || t("noAbstractLong"))}</p>
      </section>

      <section class="detail-block figure-block">
        <div class="block-title"><strong>${escapeHtml(t("figureTitle"))}</strong><span>${escapeHtml(article.openAccess ? t("oa") : t("metadata"))}</span></div>
        <p>${escapeHtml(article.openAccess ? "开放获取论文可尝试从出版社页面识别图表预览；图注与许可仍以官方页面为准。" : t("figureUnavailable"))}</p>
        <div class="figure-result" id="figure-result"></div>
      </section>

      <div class="detail-actions">
        <button class="favorite-button${fav ? " active" : ""}" data-favorite="${escapeHtml(id)}" type="button">${escapeHtml(fav ? t("favorited") : t("favorite"))}</button>
        <button class="secondary-action" data-localize="${escapeHtml(id)}" type="button">${escapeHtml(article.zh?.source === "openai" ? t("refreshZh") : t("generateZh"))}</button>
        <button class="secondary-action" data-figures="${escapeHtml(id)}" type="button">${escapeHtml(t("figureScout"))}</button>
        <a class="primary-action" href="${escapeHtml(article.url || doiUrl || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))}</a>
        ${doiUrl ? `<a class="secondary-action" href="${escapeHtml(doiUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("doi"))}</a>` : ""}
      </div>
    `;
    els.detailContent.querySelector("[data-favorite]")?.addEventListener("click", (event) => toggleFavorite(event.currentTarget.dataset.favorite));
    els.detailContent.querySelector("[data-localize]")?.addEventListener("click", () => localizeArticle(article, true));
    els.detailContent.querySelector("[data-figures]")?.addEventListener("click", () => loadFigures(article));
    if (!els.detailDialog.open) {
      els.detailDialog.showModal();
    }
    renderPapers();
  }

  async function localizeArticle(article, force = false) {
    try {
      const payload = await getJson("/api/localize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: articleKey(article), force })
      });
      const target = state.articles.find((item) => articleKey(item) === articleKey(article));
      if (target) {
        target.zh = payload.zh;
        target.localDigest = payload.zh;
        openDetail(target);
        applyFilters();
      }
      showToast(t("copied"));
    } catch (error) {
      showToast(state.lang === "zh" ? `中文速览生成未启用：${error.message}` : `Chinese brief is unavailable: ${error.message}`);
    }
  }

  async function loadFigures(article) {
    const box = els.detailContent.querySelector("#figure-result");
    if (!box) return;
    box.innerHTML = `<p>${escapeHtml(t("loading"))}...</p>`;
    try {
      const payload = await getJson(`/api/figures?id=${encodeURIComponent(articleKey(article))}`);
      const figures = payload.figures || [];
      if (!figures.length) {
        box.innerHTML = `<p>${escapeHtml(t("figureEmpty"))}</p>`;
        return;
      }
      box.innerHTML = figures
        .map(
          (figure) => `
            <a class="figure-card" href="${escapeHtml(figure.pageUrl || figure.src)}" target="_blank" rel="noreferrer">
              <img src="${escapeHtml(figure.src)}" alt="${escapeHtml(figure.alt || "figure")}" loading="lazy" />
              <span>${escapeHtml(figure.caption || figure.alt || t("figureTitle"))}</span>
            </a>
          `
        )
        .join("");
    } catch (error) {
      box.innerHTML = `<p>${escapeHtml(t("figureUnavailable"))}</p>`;
      console.warn(error);
    }
  }

  function setView(view) {
    state.view = view;
    const cards = view === "cards";
    els.paperList.hidden = !cards;
    els.tableWrap.hidden = cards;
    document.querySelectorAll(".view-tabs button").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === view);
    });
  }

  function renderProfile() {
    loadRecords();
    if (!state.profile) {
      els.profileForm.hidden = false;
      els.profileSummary.hidden = true;
      els.profileReset.hidden = true;
      return;
    }
    els.profileForm.hidden = true;
    els.profileSummary.hidden = false;
    els.profileReset.hidden = false;
    els.profileSummary.innerHTML = `
      <strong>${escapeHtml(state.profile.name)}</strong>
      <span>ID ${escapeHtml(state.profile.id)}</span>
      <small>${escapeHtml(t("localProfileNote"))}</small>
      <div class="record-counts">
        <button type="button" data-personal-jump="favorites">${escapeHtml(t("favorite"))}: ${state.records.favorites.length}</button>
        <button type="button" data-personal-jump="history">${escapeHtml(t("history"))}: ${state.records.history.length}</button>
      </div>
    `;
    els.profileSummary.querySelectorAll("[data-personal-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedPersonal = button.dataset.personalJump;
        els.personalFilter.value = state.selectedPersonal;
        applyFilters();
      });
    });
  }

  function createProfile(name, email) {
    const base = normalizeText(`${name || "researcher"} ${email || ""}`) || "researcher";
    let hash = 0;
    for (let i = 0; i < base.length; i += 1) hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
    state.profile = {
      name: name || "Researcher",
      email: email || "",
      id: `GLR-${hash.toString(16).slice(0, 8).toUpperCase()}`
    };
    writeJson("glr-profile", state.profile);
    loadRecords();
    renderProfile();
  }

  function resetTheme() {
    state.selectedTheme = "all";
    els.themeFilter.value = "all";
    applyFilters();
  }

  function inferThemeFromPrompt(prompt) {
    const normalized = normalizeText(prompt);
    for (const theme of state.themes) {
      const aliases = THEME_ALIASES[theme.id] || [];
      if ([theme.zh, theme.en, ...aliases].some((term) => normalized.includes(normalizeText(term)))) return theme.id;
    }
    return null;
  }

  function runAgent(preset = "") {
    const prompt = preset || els.agentInput.value.trim();
    const normalized = normalizeText(prompt);
    if (!prompt) {
      els.agentResult.innerHTML = `<p>${escapeHtml(t("agentEmpty"))}</p>`;
      return;
    }
    const themeId = inferThemeFromPrompt(prompt);
    if (themeId) state.selectedTheme = themeId;
    if (/3|三/.test(prompt) && /月|month/.test(normalized)) state.months = 3;
    if (/6|六|半/.test(prompt) && /月|month/.test(normalized)) state.months = 6;
    if (/12|一年|year/.test(prompt) && /月|month|year/.test(normalized)) state.months = 12;
    if (normalized.includes("引用") || normalized.includes("cited") || preset === "top-cited") state.sort = "cited";
    if (normalized.includes("收藏") || normalized.includes("favorite") || preset === "favorites") state.selectedPersonal = "favorites";
    if (normalized.includes("历史") || normalized.includes("history")) state.selectedPersonal = "history";
    if (normalized.includes("关键词") || normalized.includes("keyword")) state.searchMode = "keyword";
    els.themeFilter.value = state.selectedTheme;
    els.monthsSelect.value = String(state.months);
    els.sortSelect.value = state.sort;
    els.personalFilter.value = state.selectedPersonal;
    els.searchMode.value = state.searchMode;
    updateStaticSelects();
    applyFilters();
    const picks = state.filtered.slice(0, 5);
    els.agentResult.innerHTML = `
      <p>${escapeHtml(t("agentResult", { n: state.filtered.length }))}</p>
      <ol>
        ${picks
          .map(
            (article) => `<li><button type="button" data-agent-detail="${escapeHtml(articleKey(article))}">${escapeHtml(articleTitle(article))}</button><small>${escapeHtml(article.journalAbbr || article.journal)} · ${Number(article.citedBy || 0)} ${escapeHtml(t("citations"))}</small></li>`
          )
          .join("")}
      </ol>
    `;
    els.agentResult.querySelectorAll("[data-agent-detail]").forEach((button) => {
      button.addEventListener("click", () => {
        const article = state.articles.find((item) => articleKey(item) === button.dataset.agentDetail);
        if (article) openDetail(article);
      });
    });
  }

  async function loadJournals() {
    const payload = await getJson("/api/journals");
    state.journals = payload.journals || [];
    state.themes = payload.themes || [];
    populateFilters();
    renderJournals();
  }

  async function loadArticles(refresh) {
    els.refreshButton.disabled = true;
    els.refreshButton.querySelector("span:last-child").textContent = t("loading");
    try {
      const payload = await getJson(`/api/articles?months=${state.months}${refresh ? "&refresh=1" : ""}`);
      state.lastPayload = payload;
      state.articles = enrichArticles(payload.articles || []);
      state.coverage = payload.coverage || null;
      renderStats(payload);
      applyFilters();
    } catch (error) {
      showToast(error.message);
    } finally {
      els.refreshButton.disabled = false;
      els.refreshButton.querySelector("span:last-child").textContent = t("refresh");
    }
  }

  function bindEvents() {
    els.profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      createProfile(els.profileName.value.trim(), els.profileEmail.value.trim());
    });
    els.profileReset.addEventListener("click", () => {
      localStorage.removeItem("glr-profile");
      state.profile = null;
      state.selectedPersonal = "all";
      loadRecords();
      applyFilters();
      renderProfile();
    });
    els.search.addEventListener("input", () => {
      state.query = els.search.value;
      applyFilters();
    });
    els.searchMode.addEventListener("change", () => {
      state.searchMode = els.searchMode.value;
      applyFilters();
    });
    els.themeFilter.addEventListener("change", () => {
      state.selectedTheme = els.themeFilter.value;
      applyFilters();
    });
    els.journalFilter.addEventListener("change", () => {
      state.selectedJournal = els.journalFilter.value;
      applyFilters();
    });
    els.abstractFilter.addEventListener("change", () => {
      state.selectedAbstract = els.abstractFilter.value;
      applyFilters();
    });
    els.personalFilter.addEventListener("change", () => {
      state.selectedPersonal = els.personalFilter.value;
      applyFilters();
    });
    els.sortSelect.addEventListener("change", () => {
      state.sort = els.sortSelect.value;
      applyFilters();
    });
    els.monthsSelect.addEventListener("change", () => {
      state.months = Number(els.monthsSelect.value);
      updateStaticSelects();
      loadArticles(false);
    });
    els.refreshButton.addEventListener("click", () => loadArticles(true));
    els.clearThemeButton.addEventListener("click", resetTheme);
    els.agentRun.addEventListener("click", () => runAgent());
    document.querySelectorAll("[data-agent-preset]").forEach((button) => {
      button.addEventListener("click", () => runAgent(button.dataset.agentPreset));
    });
    els.languageToggle.addEventListener("click", () => {
      state.lang = state.lang === "zh" ? "en" : "zh";
      localStorage.setItem("glr-lang", state.lang);
      renderChrome();
      renderStats(state.lastPayload || { count: state.articles.length, journals: state.journals.length, coverage: state.coverage });
      renderJournals();
      applyFilters();
      if (els.detailDialog.open && state.activeDetailId) {
        const article = state.articles.find((item) => articleKey(item) === state.activeDetailId);
        if (article) openDetail(article);
      }
    });
    document.querySelectorAll(".view-tabs button").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.view));
    });
    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const editing = ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName);
      if (!editing && event.key === "Backspace" && state.selectedTheme !== "all") {
        event.preventDefault();
        resetTheme();
      }
    });
  }

  async function init() {
    loadRecords();
    bindEvents();
    renderChrome();
    setView("cards");
    els.agentResult.innerHTML = `<p>${escapeHtml(t("agentEmpty"))}</p>`;
    await loadJournals();
    await loadArticles(false);
  }

  init().catch((error) => showToast(error.message));
})();
