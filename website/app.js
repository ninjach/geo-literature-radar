(function () {
  "use strict";

  const PAGE_SIZE = 24;
  const APP_MODE = document.querySelector('meta[name="glr-mode"]')?.content || "server";

  const I18N = {
    zh: {
      brandSubtitle: "地球系统科学前沿追踪",
      navRadar: "主题雷达",
      navPapers: "论文",
      navSources: "来源",
      refresh: "检查更新",
      loading: "载入中",
      filters: "筛选",
      resetFilters: "重置",
      search: "搜索",
      searchPlaceholder: "题名、作者、DOI、关键词",
      searchMode: "搜索模式",
      fuzzySearch: "综合搜索",
      keywordSearch: "关键词匹配",
      theme: "主题",
      journal: "期刊",
      quality: "期刊层级",
      flagship: "综合旗舰",
      core: "领域核心",
      allQualities: "全部层级",
      access: "开放获取",
      openOnly: "开放获取",
      closedOnly: "非开放或未知",
      abstractStatus: "摘要状态",
      personalFilter: "个人记录",
      allPapers: "全部论文",
      favoritesOnly: "我的收藏",
      historyOnly: "浏览历史",
      sort: "排序",
      months: "时间窗口",
      dataAudit: "数据审计",
      sourceHealth: "查看来源状态",
      themeRadar: "主题雷达",
      paperList: "论文列表",
      cards: "卡片",
      table: "表格",
      date: "日期",
      paper: "论文",
      link: "链接",
      citations: "引用",
      journalSources: "期刊来源",
      sourceText: "覆盖综合旗舰与领域核心期刊；题录来自 Crossref、OpenAlex 与官方 RSS，并始终回链原站。",
      metricPapers: "论文",
      metricJournals: "期刊",
      metricAbstracts: "摘要覆盖",
      metricUpdated: "数据更新",
      heroTitle: "地球系统科学前沿追踪",
      heroDescription: "自动汇集近一年高质量期刊论文，以英文原始题录和摘要为核心，帮助课题组快速筛选、回溯与组织阅读。",
      allThemes: "全部主题",
      allJournals: "全部期刊",
      newest: "最新优先",
      cited: "引用热度",
      priority: "阅读优先级",
      journalName: "期刊名称",
      threeMonths: "近 3 个月",
      sixMonths: "近 6 个月",
      twelveMonths: "近 12 个月",
      resultCount: "符合条件 {n} 篇，已显示 {shown} 篇。",
      coverage: "摘要覆盖 {withAbstract}/{total}；当前有 {represented}/{journals} 个期刊返回可用题录。",
      noAbstract: "缺摘要",
      hasAbstract: "有摘要",
      allAbstracts: "全部",
      oa: "开放获取",
      metadata: "元数据",
      authorsPending: "作者待核对",
      details: "详情",
      official: "原文",
      doi: "DOI",
      englishTitle: "英文题名",
      englishKeywords: "英文索引词",
      keywordNote: "索引词来自 OpenAlex/Crossref 概念或主题字段，不一定等同于作者关键词。",
      englishAbstractExcerpt: "英文摘要缩略",
      originalEnglish: "英文原始信息",
      abstract: "英文摘要",
      noAbstractLong: "当前聚合元数据没有提供英文摘要。请打开 DOI 或出版社页面核对。",
      priorityBadge: "优先阅读",
      empty: "没有匹配的论文，请调整筛选条件。",
      backToAll: "返回全部主题",
      favorite: "收藏",
      favorited: "已收藏",
      profileTitle: "本地阅读档案",
      profileName: "姓名或昵称",
      createProfile: "建立本地档案",
      switchUser: "切换",
      localProfileNote: "收藏与历史只保存在当前浏览器，不会上传个人信息。",
      exportRecords: "导出记录",
      importRecords: "导入记录",
      agentTitle: "本地筛选助手",
      agentRun: "执行",
      agentTopCited: "高被引",
      agentOpen: "开放获取",
      agentPlaceholder: "例如：近 6 个月气候变化方向，开放获取，按引用排序",
      agentEmpty: "输入筛选要求后，将自动调整条件并列出候选论文。",
      agentResult: "已更新筛选，共 {n} 篇候选。",
      figureScout: "扫描开放图表",
      figureUnavailable: "公网静态站不能代抓出版社页面；请打开原文查看图表。",
      figureEmpty: "未识别到可展示图表。",
      copyCitation: "复制引用",
      copied: "已复制",
      loadMore: "加载更多",
      exportResults: "导出 CSV",
      methodTitle: "数据边界",
      methodText: "引用次数和开放获取状态会随元数据源变化；索引词不一定等同于作者关键词。摘要缺失不代表期刊页面没有摘要，请以 DOI 和出版社页面为准。",
      healthy: "数据正常",
      warning: "部分来源降级",
      degraded: "数据需关注",
      stale: "数据已过期",
      freshDetail: "更新于 {time}，最新论文日期 {latest}。",
      staleDetail: "数据已 {days} 天未更新，请检查 GitHub Actions。",
      staticRefresh: "已重新检查 GitHub Pages 数据。",
      serverRefresh: "已从外部元数据源重新抓取。",
      healthTitle: "数据来源与刷新状态",
      represented: "覆盖期刊",
      freshSources: "本轮新鲜来源",
      warnings: "来源警告",
      fallbackJournals: "沿用上次数据",
      missingJournals: "当前缺失",
      noWarnings: "本轮没有来源警告。",
      filtersActive: "{n} 项筛选生效",
      qualityFlagship: "旗舰",
      qualityCore: "核心"
    },
    en: {
      brandSubtitle: "Earth System Science Frontiers",
      navRadar: "Radar",
      navPapers: "Papers",
      navSources: "Sources",
      refresh: "Check updates",
      loading: "Loading",
      filters: "Filters",
      resetFilters: "Reset",
      search: "Search",
      searchPlaceholder: "title, author, DOI, keyword",
      searchMode: "Search mode",
      fuzzySearch: "Broad search",
      keywordSearch: "Keyword match",
      theme: "Theme",
      journal: "Journal",
      quality: "Journal tier",
      flagship: "Flagship",
      core: "Core field",
      allQualities: "All tiers",
      access: "Open access",
      openOnly: "Open access",
      closedOnly: "Closed or unknown",
      abstractStatus: "Abstract status",
      personalFilter: "Personal",
      allPapers: "All papers",
      favoritesOnly: "Favorites",
      historyOnly: "History",
      sort: "Sort",
      months: "Window",
      dataAudit: "Data audit",
      sourceHealth: "Source health",
      themeRadar: "Theme Radar",
      paperList: "Paper List",
      cards: "Cards",
      table: "Table",
      date: "Date",
      paper: "Paper",
      link: "Link",
      citations: "Citations",
      journalSources: "Journal Sources",
      sourceText: "Flagship and field-leading journals, sourced from Crossref, OpenAlex, and publisher RSS with links to the original record.",
      metricPapers: "Papers",
      metricJournals: "Journals",
      metricAbstracts: "Abstracts",
      metricUpdated: "Updated",
      heroTitle: "Earth System Science Frontiers",
      heroDescription: "An automatically refreshed research-group radar built around original English metadata and abstracts from high-quality journals.",
      allThemes: "All themes",
      allJournals: "All journals",
      newest: "Newest",
      cited: "Most cited",
      priority: "Reading priority",
      journalName: "Journal name",
      threeMonths: "Past 3 months",
      sixMonths: "Past 6 months",
      twelveMonths: "Past 12 months",
      resultCount: "{n} matches; showing {shown}.",
      coverage: "Abstract coverage {withAbstract}/{total}; {represented}/{journals} journals currently have usable records.",
      noAbstract: "No abstract",
      hasAbstract: "Abstract",
      allAbstracts: "All",
      oa: "Open access",
      metadata: "Metadata",
      authorsPending: "Authors pending",
      details: "Details",
      official: "Original",
      doi: "DOI",
      englishTitle: "English title",
      englishKeywords: "English index terms",
      keywordNote: "Index terms are OpenAlex/Crossref concepts or topics and may differ from author keywords.",
      englishAbstractExcerpt: "English abstract excerpt",
      originalEnglish: "Original English metadata",
      abstract: "English abstract",
      noAbstractLong: "No English abstract is exposed in the current aggregate metadata. Verify on the DOI or publisher page.",
      priorityBadge: "Priority",
      empty: "No matching papers. Adjust the filters and try again.",
      backToAll: "Back to all themes",
      favorite: "Favorite",
      favorited: "Favorited",
      profileTitle: "Local reading profile",
      profileName: "Name or nickname",
      createProfile: "Create local profile",
      switchUser: "Switch",
      localProfileNote: "Favorites and history stay in this browser; no personal information is uploaded.",
      exportRecords: "Export records",
      importRecords: "Import records",
      agentTitle: "Local filter assistant",
      agentRun: "Run",
      agentTopCited: "Cited",
      agentOpen: "Open access",
      agentPlaceholder: "Example: climate papers from 6 months, open access, sorted by citations",
      agentEmpty: "Describe the filter you need to update controls and receive candidates.",
      agentResult: "Filters updated; {n} candidates.",
      figureScout: "Scan OA figures",
      figureUnavailable: "Static Pages cannot proxy publisher pages. Open the original record to inspect figures.",
      figureEmpty: "No displayable figures detected.",
      copyCitation: "Copy citation",
      copied: "Copied",
      loadMore: "Load more",
      exportResults: "Export CSV",
      methodTitle: "Data boundaries",
      methodText: "Citation counts and OA status vary by source. Index terms are not necessarily author keywords, and a missing aggregate abstract does not mean the publisher page has none.",
      healthy: "Data healthy",
      warning: "Partial source warning",
      degraded: "Data needs attention",
      stale: "Data stale",
      freshDetail: "Updated {time}; latest publication {latest}.",
      staleDetail: "No dataset refresh for {days} days. Check GitHub Actions.",
      staticRefresh: "GitHub Pages data checked again.",
      serverRefresh: "External metadata sources refreshed.",
      healthTitle: "Data sources and refresh health",
      represented: "Covered journals",
      freshSources: "Fresh sources",
      warnings: "Source warnings",
      fallbackJournals: "Using prior data",
      missingJournals: "Currently missing",
      noWarnings: "No source warnings in this refresh.",
      filtersActive: "{n} active filters",
      qualityFlagship: "Flagship",
      qualityCore: "Core"
    }
  };

  const THEME_ALIASES = {
    climate: ["气候", "climate", "warming", "precipitation"],
    hydrology: ["水文", "水资源", "hydro", "water", "groundwater"],
    modeling: ["模型", "model", "simulation", "cmip"],
    remote: ["遥感", "geoai", "remote", "satellite", "machine learning"],
    carbon: ["生态", "碳", "ecology", "carbon", "vegetation"],
    hazard: ["灾害", "风险", "hazard", "risk", "drought", "flood"],
    general: ["综合", "flagship", "nature", "science"]
  };

  const state = {
    lang: localStorage.getItem("glr-lang") || "zh",
    profile: readJson("glr-profile"),
    records: { favorites: [], history: [] },
    journals: [],
    journalMap: new Map(),
    themes: [],
    articles: [],
    filtered: [],
    payload: null,
    query: "",
    searchMode: "fuzzy",
    selectedTheme: "all",
    selectedJournal: "all",
    selectedQuality: "all",
    selectedAccess: "all",
    selectedAbstract: "all",
    selectedPersonal: "all",
    sort: "date",
    months: 6,
    view: localStorage.getItem("glr-view") || "cards",
    visible: PAGE_SIZE,
    activeDetailId: null
  };

  const $ = (selector) => document.querySelector(selector);
  const els = {
    count: $("#stat-count"), journals: $("#stat-journals"), abstracts: $("#stat-abstracts"), updated: $("#stat-updated"),
    freshnessStatus: $("#freshness-status"), freshnessLabel: $("#freshness-label"), heroStatus: $("#hero-status"),
    search: $("#search"), searchMode: $("#search-mode"), themeFilter: $("#theme-filter"), journalFilter: $("#journal-filter"),
    qualityFilter: $("#quality-filter"), accessFilter: $("#access-filter"), abstractFilter: $("#abstract-filter"), personalFilter: $("#personal-filter"),
    sortSelect: $("#sort-select"), monthsSelect: $("#months-select"), activeFilters: $("#active-filters"), resetFilters: $("#reset-filters"),
    radarBoard: $("#radar-board"), clearThemeButton: $("#clear-theme-button"), paperList: $("#paper-list"), tableWrap: $("#paper-table-wrap"),
    tableBody: $("#paper-table-body"), resultNote: $("#result-note"), visibleCount: $("#visible-count"), loadMore: $("#load-more"),
    journalGrid: $("#journal-grid"), refreshButton: $("#refresh-button"), languageToggle: $("#language-toggle"), exportResults: $("#export-results"),
    coverageNote: $("#coverage-note"), auditState: $("#audit-state"), showSourceHealth: $("#show-source-health"),
    detailDialog: $("#detail-dialog"), detailContent: $("#detail-content"), healthDialog: $("#health-dialog"), healthContent: $("#health-content"),
    toast: $("#toast"), profileForm: $("#profile-form"), profileName: $("#profile-name"), profileReset: $("#profile-reset"), profileSummary: $("#profile-summary"),
    agentInput: $("#agent-input"), agentRun: $("#agent-run"), agentResult: $("#agent-result"),
    mobileFilterToggle: $("#mobile-filter-toggle"), mobileFilterCount: $("#mobile-filter-count"), filtersPanel: $("#filters-panel")
  };

  function readJson(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key) || "null") || fallback; } catch { return fallback; }
  }

  function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function t(key, params = {}) {
    let value = I18N[state.lang][key] || I18N.zh[key] || key;
    for (const [name, replacement] of Object.entries(params)) value = value.replaceAll(`{${name}}`, String(replacement));
    return value;
  }
  function label(value) { return typeof value === "string" ? value : state.lang === "zh" ? value?.zh || value?.en : value?.en || value?.zh; }
  function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
  function normalizeText(value) { return String(value || "").toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}.:/_-]+/gu, " ").replace(/\s+/g, " ").trim(); }
  function articleKey(article) { return article.id || article.doi || article.titleEn || article.title; }
  function articleTitle(article) { return article.titleEn || article.title || ""; }
  function englishKeywords(article) { return [...new Set([...(article.keywordsEn || []), ...(article.subjects || [])].map(String).map((x) => x.trim()).filter(Boolean))].slice(0, 8); }
  function showToast(message) { els.toast.textContent = message; els.toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 3000); }
  function formatDate(value) { if (!value) return "--"; const date = new Date(`${value}T00:00:00`); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(state.lang === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "2-digit", day: "2-digit" }); }
  function formatDateTime(value) { if (!value) return "--"; const date = new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }); }
  function daysSince(value) { const time = new Date(value || 0).getTime(); return Number.isFinite(time) ? Math.max(0, Math.floor((Date.now() - time) / 86400000)) : 999; }
  function storageScope() { return state.profile?.id || "guest"; }
  function loadRecords() { state.records = readJson(`glr-records-${storageScope()}`, { favorites: [], history: [] }); state.records.favorites = [...new Set(state.records.favorites || [])].slice(0, 200); state.records.history = [...new Set(state.records.history || [])].slice(0, 100); }
  function saveRecords() { writeJson(`glr-records-${storageScope()}`, state.records); }
  function isFavorite(id) { return state.records.favorites.includes(id); }

  function staticUrl(path, refresh = false) { return refresh ? `${path}${path.includes("?") ? "&" : "?"}v=${Date.now()}` : path; }
  async function fetchJson(url, options = {}) {
    const response = await fetch(url, { cache: options.refresh ? "no-store" : "default", ...options });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { throw new Error("数据响应不是有效 JSON"); }
    if (!response.ok) throw new Error(data.error || `${response.status} ${response.statusText}`);
    return data;
  }
  async function getJson(apiPath, options = {}) {
    if (APP_MODE === "static") {
      const pathname = apiPath.split("?")[0];
      if (pathname === "/api/journals") return fetchJson(staticUrl("assets/data/journals.json", options.refresh), options);
      if (pathname === "/api/articles" || pathname === "/api/coverage") return fetchJson(staticUrl("assets/data/articles.json", options.refresh), options);
      throw new Error(t("figureUnavailable"));
    }
    try { return await fetchJson(apiPath, options); }
    catch (error) {
      if ((options.method || "GET") === "GET" && apiPath.startsWith("/api/")) {
        const fallback = apiPath.startsWith("/api/journals") ? "assets/data/journals.json" : "assets/data/articles.json";
        return fetchJson(staticUrl(fallback, options.refresh), options);
      }
      throw error;
    }
  }

  function abstractExcerpt(article, max = 420) {
    const text = String(article.abstractEn || article.abstract || "").replace(/\s+/g, " ").trim();
    if (!text) return t("noAbstractLong");
    if (text.length <= max) return text;
    const clipped = text.slice(0, max);
    const boundary = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("; "));
    return `${(boundary > max * 0.55 ? clipped.slice(0, boundary + 1) : clipped).trim()}…`;
  }

  function priorityScore(article) {
    let score = article.hasAbstract ? 4 : 0;
    if (article.openAccess) score += 2;
    if ((state.journalMap.get(article.journalId)?.quality || article.quality) === "flagship") score += 3;
    score += Math.min(6, Math.log10(Number(article.citedBy || 0) + 1) * 3);
    return Number(score.toFixed(2));
  }

  function parseSearch(query) {
    const parts = [];
    const regex = /(?:([a-z]+):)?(?:"([^"]+)"|(\S+))/gi;
    let match;
    while ((match = regex.exec(query))) parts.push({ field: (match[1] || "all").toLowerCase(), value: normalizeText(match[2] || match[3]) });
    return parts.filter((part) => part.value);
  }

  function matchesSearch(article, query) {
    const parts = parseSearch(query);
    if (!parts.length) return true;
    const fields = {
      title: normalizeText(articleTitle(article)),
      author: normalizeText((article.authors || []).join(" ")),
      journal: normalizeText(`${article.journal} ${article.journalAbbr}`),
      doi: normalizeText(article.doi),
      keyword: normalizeText(englishKeywords(article).join(" ")),
      abstract: normalizeText(article.abstractEn || article.abstract),
      all: normalizeText([articleTitle(article), (article.authors || []).join(" "), article.journal, article.journalAbbr, article.doi, englishKeywords(article).join(" "), article.themeZh, article.themeEn, article.abstractEn || article.abstract].join(" "))
    };
    return parts.every((part) => {
      const field = fields[part.field] ?? fields.all;
      if (state.searchMode === "keyword") return fields.keyword.split(" ").some((token) => token === part.value || token.startsWith(part.value)) || fields.keyword.includes(part.value);
      return field.includes(part.value);
    });
  }

  function cutoffDate(months) { const date = new Date(); date.setMonth(date.getMonth() - months); return date.toISOString().slice(0, 10); }
  function journalQuality(article) { return state.journalMap.get(article.journalId)?.quality || article.quality || "core"; }
  function themeName(article) { return state.lang === "zh" ? article.themeZh || article.theme : article.themeEn || article.theme; }

  function activeFilterEntries() {
    const entries = [];
    if (state.query) entries.push(["query", state.query]);
    if (state.selectedTheme !== "all") entries.push(["theme", label(state.themes.find((x) => x.id === state.selectedTheme))]);
    if (state.selectedJournal !== "all") entries.push(["journal", state.journalMap.get(state.selectedJournal)?.abbr]);
    if (state.selectedQuality !== "all") entries.push(["quality", t(state.selectedQuality)]);
    if (state.selectedAccess !== "all") entries.push(["access", state.selectedAccess === "open" ? t("openOnly") : t("closedOnly")]);
    if (state.selectedAbstract !== "all") entries.push(["abstract", state.selectedAbstract === "available" ? t("hasAbstract") : t("noAbstract")]);
    if (state.selectedPersonal !== "all") entries.push(["personal", state.selectedPersonal === "favorites" ? t("favoritesOnly") : t("historyOnly")]);
    if (state.months !== 6) entries.push(["months", t(state.months === 3 ? "threeMonths" : "twelveMonths")]);
    return entries;
  }

  function syncUrl() {
    const params = new URLSearchParams();
    if (state.query) params.set("q", state.query);
    if (state.searchMode !== "fuzzy") params.set("mode", state.searchMode);
    if (state.selectedTheme !== "all") params.set("theme", state.selectedTheme);
    if (state.selectedJournal !== "all") params.set("journal", state.selectedJournal);
    if (state.selectedQuality !== "all") params.set("tier", state.selectedQuality);
    if (state.selectedAccess !== "all") params.set("oa", state.selectedAccess);
    if (state.selectedAbstract !== "all") params.set("abstract", state.selectedAbstract);
    if (state.sort !== "date") params.set("sort", state.sort);
    if (state.months !== 6) params.set("months", String(state.months));
    const next = `${location.pathname}${params.size ? `?${params}` : ""}${location.hash}`;
    history.replaceState(null, "", next);
  }

  function restoreUrl() {
    const params = new URLSearchParams(location.search);
    state.query = params.get("q") || "";
    state.searchMode = ["fuzzy", "keyword"].includes(params.get("mode")) ? params.get("mode") : "fuzzy";
    state.selectedTheme = params.get("theme") || "all";
    state.selectedJournal = params.get("journal") || "all";
    state.selectedQuality = params.get("tier") || "all";
    state.selectedAccess = params.get("oa") || "all";
    state.selectedAbstract = params.get("abstract") || "all";
    state.sort = ["date", "cited", "priority", "journal"].includes(params.get("sort")) ? params.get("sort") : "date";
    state.months = [3, 6, 12].includes(Number(params.get("months"))) ? Number(params.get("months")) : 6;
  }

  function renderChrome() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    $("#brand-subtitle").textContent = t("brandSubtitle");
    $("#hero-title").textContent = t("heroTitle");
    $("#hero-description").textContent = t("heroDescription");
    document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
    els.search.placeholder = t("searchPlaceholder");
    els.agentInput.placeholder = t("agentPlaceholder");
    els.languageToggle.textContent = state.lang === "zh" ? "EN" : "中";
    populateFilters();
    renderProfile();
  }

  function populateFilters() {
    els.themeFilter.innerHTML = [`<option value="all">${escapeHtml(t("allThemes"))}</option>`, ...state.themes.map((theme) => `<option value="${escapeHtml(theme.id)}">${escapeHtml(label(theme))}</option>`)].join("");
    els.journalFilter.innerHTML = [`<option value="all">${escapeHtml(t("allJournals"))}</option>`, ...state.journals.map((journal) => `<option value="${escapeHtml(journal.id)}">${escapeHtml(journal.abbr)} · ${escapeHtml(journal.name)}</option>`)].join("");
    els.qualityFilter.innerHTML = `<option value="all">${escapeHtml(t("allQualities"))}</option><option value="flagship">${escapeHtml(t("flagship"))}</option><option value="core">${escapeHtml(t("core"))}</option>`;
    els.accessFilter.innerHTML = `<option value="all">${escapeHtml(t("allPapers"))}</option><option value="open">${escapeHtml(t("openOnly"))}</option><option value="closed">${escapeHtml(t("closedOnly"))}</option>`;
    els.abstractFilter.innerHTML = `<option value="all">${escapeHtml(t("allAbstracts"))}</option><option value="available">${escapeHtml(t("hasAbstract"))}</option><option value="missing">${escapeHtml(t("noAbstract"))}</option>`;
    els.personalFilter.innerHTML = `<option value="all">${escapeHtml(t("allPapers"))}</option><option value="favorites">${escapeHtml(t("favoritesOnly"))}</option><option value="history">${escapeHtml(t("historyOnly"))}</option>`;
    const sortLabels = { date: t("newest"), cited: t("cited"), priority: t("priority"), journal: t("journalName") };
    [...els.sortSelect.options].forEach((option) => { option.textContent = sortLabels[option.value]; });
    const monthLabels = { 3: t("threeMonths"), 6: t("sixMonths"), 12: t("twelveMonths") };
    [...els.monthsSelect.options].forEach((option) => { option.textContent = monthLabels[option.value]; });
    [...els.searchMode.options].forEach((option) => { option.textContent = option.value === "keyword" ? t("keywordSearch") : t("fuzzySearch"); });
    els.search.value = state.query;
    els.searchMode.value = state.searchMode;
    els.themeFilter.value = state.themes.some((x) => x.id === state.selectedTheme) ? state.selectedTheme : "all";
    els.journalFilter.value = state.journalMap.has(state.selectedJournal) ? state.selectedJournal : "all";
    els.qualityFilter.value = state.selectedQuality;
    els.accessFilter.value = state.selectedAccess;
    els.abstractFilter.value = state.selectedAbstract;
    els.personalFilter.value = state.selectedPersonal;
    els.sortSelect.value = state.sort;
    els.monthsSelect.value = String(state.months);
  }

  function renderFreshness() {
    const payload = state.payload || {};
    const age = daysSince(payload.createdAt);
    const health = payload.sourceHealth || {};
    const status = age > 3 ? "stale" : health.status || (payload.errors?.length ? "warning" : "healthy");
    els.freshnessStatus.dataset.status = status;
    els.freshnessLabel.textContent = t(status);
    const latest = health.latestPublication || (payload.articles || []).map((x) => x.published).sort().at(-1) || "--";
    els.heroStatus.textContent = age > 3 ? t("staleDetail", { days: age }) : t("freshDetail", { time: formatDateTime(payload.createdAt), latest: formatDate(latest) });
    els.auditState.textContent = t(status);
    els.auditState.dataset.status = status;
  }

  function renderStats() {
    const payload = state.payload || {};
    const coverage = payload.coverage || {};
    const health = payload.sourceHealth || {};
    els.count.textContent = String(state.articles.length);
    els.journals.textContent = String(state.journals.length);
    els.abstracts.textContent = Number.isFinite(coverage.abstractRate) ? `${Math.round(coverage.abstractRate * 100)}%` : "--";
    els.updated.textContent = payload.createdAt ? formatDateTime(payload.createdAt) : "--";
    els.coverageNote.textContent = t("coverage", { withAbstract: coverage.withAbstract || 0, total: coverage.total || state.articles.length, represented: health.representedJournals || new Set(state.articles.map((x) => x.journalId)).size, journals: state.journals.length });
    renderFreshness();
  }

  function renderActiveFilters() {
    const entries = activeFilterEntries();
    els.activeFilters.innerHTML = entries.map(([key, value]) => `<button class="filter-chip" type="button" data-clear-filter="${escapeHtml(key)}">${escapeHtml(value)} <span aria-hidden="true">×</span></button>`).join("");
    els.mobileFilterCount.textContent = String(entries.length);
    els.mobileFilterToggle.setAttribute("aria-label", t("filtersActive", { n: entries.length }));
    els.activeFilters.querySelectorAll("[data-clear-filter]").forEach((button) => button.addEventListener("click", () => clearFilter(button.dataset.clearFilter)));
  }

  function clearFilter(key) {
    const reset = { query: "", theme: "all", journal: "all", quality: "all", access: "all", abstract: "all", personal: "all", months: 6 };
    if (key === "query") state.query = "";
    else if (key === "theme") state.selectedTheme = "all";
    else if (key === "journal") state.selectedJournal = "all";
    else if (key === "quality") state.selectedQuality = "all";
    else if (key === "access") state.selectedAccess = "all";
    else if (key === "abstract") state.selectedAbstract = "all";
    else if (key === "personal") state.selectedPersonal = "all";
    else if (key === "months") state.months = reset.months;
    populateFilters();
    applyFilters();
  }

  function resetFilters() {
    Object.assign(state, { query: "", searchMode: "fuzzy", selectedTheme: "all", selectedJournal: "all", selectedQuality: "all", selectedAccess: "all", selectedAbstract: "all", selectedPersonal: "all", sort: "date", months: 6, visible: PAGE_SIZE });
    populateFilters();
    applyFilters();
  }

  function applyFilters(options = {}) {
    const cutoff = cutoffDate(state.months);
    let list = state.articles.filter((article) => {
      const id = articleKey(article);
      return article.published >= cutoff &&
        (state.selectedTheme === "all" || article.themeId === state.selectedTheme) &&
        (state.selectedJournal === "all" || article.journalId === state.selectedJournal) &&
        (state.selectedQuality === "all" || journalQuality(article) === state.selectedQuality) &&
        (state.selectedAccess === "all" || (state.selectedAccess === "open" ? article.openAccess : !article.openAccess)) &&
        (state.selectedAbstract === "all" || article.abstractStatus === state.selectedAbstract) &&
        (state.selectedPersonal === "all" || (state.selectedPersonal === "favorites" ? state.records.favorites.includes(id) : state.records.history.includes(id))) &&
        matchesSearch(article, state.query);
    });
    if (state.sort === "cited") list.sort((a, b) => Number(b.citedBy || 0) - Number(a.citedBy || 0) || String(b.published).localeCompare(a.published));
    else if (state.sort === "priority") list.sort((a, b) => priorityScore(b) - priorityScore(a) || String(b.published).localeCompare(a.published));
    else if (state.sort === "journal") list.sort((a, b) => String(a.journal).localeCompare(String(b.journal)) || String(b.published).localeCompare(a.published));
    else list.sort((a, b) => String(b.published).localeCompare(a.published) || Number(b.citedBy || 0) - Number(a.citedBy || 0));
    state.filtered = list;
    if (!options.keepVisible) state.visible = PAGE_SIZE;
    renderActiveFilters();
    renderRadar();
    renderPapers();
    renderProfile();
    syncUrl();
  }

  function renderRadar() {
    const counts = new Map(state.themes.map((theme) => [theme.id, { theme, total: 0, abstracts: 0, oa: 0 }]));
    const base = state.articles.filter((article) => article.published >= cutoffDate(state.months) && (state.selectedJournal === "all" || article.journalId === state.selectedJournal));
    for (const article of base) {
      const row = counts.get(article.themeId);
      if (!row) continue;
      row.total += 1;
      if (article.hasAbstract) row.abstracts += 1;
      if (article.openAccess) row.oa += 1;
    }
    const rows = [...counts.values()].filter((row) => row.total).sort((a, b) => b.total - a.total);
    const max = Math.max(1, ...rows.map((row) => row.total));
    els.radarBoard.innerHTML = rows.length ? rows.map((row) => `<button class="radar-tile${state.selectedTheme === row.theme.id ? " active" : ""}" data-theme="${escapeHtml(row.theme.id)}" type="button" style="--theme-color:${escapeHtml(row.theme.color)}"><span class="tile-head"><strong>${escapeHtml(label(row.theme))}</strong><em>${row.total}</em></span><span class="tile-bar"><span style="width:${Math.round(row.total / max * 100)}%"></span></span><small>${escapeHtml(t("metricAbstracts"))} ${row.abstracts}/${row.total} · OA ${row.oa}</small></button>`).join("") : `<div class="empty-state">${escapeHtml(t("empty"))}</div>`;
    els.clearThemeButton.hidden = state.selectedTheme === "all";
    els.radarBoard.querySelectorAll("[data-theme]").forEach((button) => button.addEventListener("click", () => { state.selectedTheme = button.dataset.theme; els.themeFilter.value = state.selectedTheme; applyFilters(); }));
  }

  function metaBadges(article) {
    const quality = journalQuality(article);
    return `<span>${escapeHtml(formatDate(article.published))}</span><span>${escapeHtml(article.journalAbbr || article.journal)}</span><span title="${escapeHtml(t("citations"))}">${escapeHtml(t("citations"))}: ${Number(article.citedBy || 0).toLocaleString()}</span><span class="${article.hasAbstract ? "ok" : "warn"}">${escapeHtml(article.hasAbstract ? t("hasAbstract") : t("noAbstract"))}</span>${article.openAccess ? `<span class="ok">${escapeHtml(t("oa"))}</span>` : ""}<span>${escapeHtml(quality === "flagship" ? t("qualityFlagship") : t("qualityCore"))}</span>${priorityScore(article) >= 10 ? `<span class="priority">${escapeHtml(t("priorityBadge"))}</span>` : ""}`;
  }

  function paperCard(article) {
    const id = articleKey(article);
    const keywords = englishKeywords(article);
    const authors = article.authors?.length ? article.authors.join(", ") : t("authorsPending");
    return `<article class="paper-card" style="--theme-color:${escapeHtml(article.themeColor || "#0f766e")}"><div class="paper-meta">${metaBadges(article)}</div><button class="card-title" data-detail="${escapeHtml(id)}" type="button"><span>${escapeHtml(t("englishTitle"))}</span><strong>${escapeHtml(articleTitle(article))}</strong></button><p class="authors">${escapeHtml(authors)}</p><div class="keyword-groups"><span>${escapeHtml(t("englishKeywords"))}</span><div class="badge-row">${keywords.length ? keywords.map((keyword) => `<span class="badge">${escapeHtml(keyword)}</span>`).join("") : `<span class="badge muted">${escapeHtml(t("metadata"))}</span>`}</div></div><div class="abstract-preview"><span>${escapeHtml(t("englishAbstractExcerpt"))}</span><p>${escapeHtml(abstractExcerpt(article))}</p></div><div class="card-actions"><button class="text-button" data-detail="${escapeHtml(id)}" type="button">${escapeHtml(t("details"))}</button><button class="favorite-button${isFavorite(id) ? " active" : ""}" data-favorite="${escapeHtml(id)}" type="button">${escapeHtml(isFavorite(id) ? t("favorited") : t("favorite"))}</button><a class="official-link" href="${escapeHtml(article.url || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))} ↗</a></div></article>`;
  }

  function renderPapers() {
    const visible = state.filtered.slice(0, state.visible);
    els.visibleCount.textContent = ` ${state.filtered.length}`;
    els.resultNote.textContent = t("resultCount", { n: state.filtered.length, shown: visible.length });
    if (!visible.length) {
      els.paperList.innerHTML = `<div class="empty-state">${escapeHtml(t("empty"))}</div>`;
      els.tableBody.innerHTML = "";
    } else {
      els.paperList.innerHTML = visible.map(paperCard).join("");
      els.tableBody.innerHTML = visible.map((article) => `<tr><td>${escapeHtml(formatDate(article.published))}</td><td>${escapeHtml(article.journalAbbr || article.journal)}</td><td>${escapeHtml(themeName(article))}</td><td>${Number(article.citedBy || 0).toLocaleString()}</td><td><button class="table-title" data-detail="${escapeHtml(articleKey(article))}" type="button">${escapeHtml(articleTitle(article))}</button><small>${escapeHtml(abstractExcerpt(article, 190))}</small></td><td><a class="official-link" href="${escapeHtml(article.url || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))}</a></td></tr>`).join("");
    }
    els.loadMore.hidden = visible.length >= state.filtered.length;
    els.paperList.querySelectorAll("[data-detail], [data-favorite]").forEach(bindPaperAction);
    els.tableBody.querySelectorAll("[data-detail]").forEach(bindPaperAction);
  }

  function bindPaperAction(element) {
    if (element.dataset.detail) element.addEventListener("click", () => { const article = state.articles.find((item) => articleKey(item) === element.dataset.detail); if (article) openDetail(article); });
    if (element.dataset.favorite) element.addEventListener("click", () => toggleFavorite(element.dataset.favorite));
  }

  function renderJournals() {
    const health = state.payload?.sourceHealth || {};
    const fallback = new Set(health.fallbackJournals || []);
    const missing = new Set(health.missingJournals || []);
    const counts = new Map();
    for (const article of state.articles) counts.set(article.journalId, (counts.get(article.journalId) || 0) + 1);
    els.journalGrid.innerHTML = state.journals.map((journal) => {
      const status = missing.has(journal.abbr) ? "missing" : fallback.has(journal.abbr) ? "fallback" : "healthy";
      return `<article class="journal-card"><div class="paper-meta"><span>${escapeHtml(journal.abbr)}</span><span>${escapeHtml(journal.quality === "flagship" ? t("qualityFlagship") : t("qualityCore"))}</span><span class="source-${status}">${counts.get(journal.id) || 0}</span></div><h3>${escapeHtml(journal.name)}</h3><p>${escapeHtml(journal.publisher)} · ISSN ${escapeHtml((journal.issn || []).join(" / "))}</p><a class="official-link" href="${escapeHtml(journal.officialUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))} ↗</a></article>`;
    }).join("");
  }

  function addHistory(id) { state.records.history = [id, ...state.records.history.filter((item) => item !== id)].slice(0, 100); saveRecords(); }
  function toggleFavorite(id) { state.records.favorites = isFavorite(id) ? state.records.favorites.filter((item) => item !== id) : [id, ...state.records.favorites.filter((item) => item !== id)].slice(0, 200); saveRecords(); applyFilters({ keepVisible: true }); if (els.detailDialog.open) { const article = state.articles.find((item) => articleKey(item) === id); if (article) openDetail(article); } }

  function citationText(article) {
    const authors = article.authors?.length ? article.authors.join(", ") : "";
    const year = String(article.published || "").slice(0, 4);
    const doi = article.doi ? ` https://doi.org/${article.doi}` : "";
    return `${authors}${authors ? ". " : ""}(${year || "n.d."}). ${articleTitle(article)}. ${article.journal}.${doi}`;
  }

  function openDetail(article) {
    const id = articleKey(article);
    state.activeDetailId = id;
    addHistory(id);
    const authors = article.authors?.length ? article.authors.join(", ") : t("authorsPending");
    const keywords = englishKeywords(article);
    const doiUrl = article.doi ? `https://doi.org/${article.doi}` : "";
    els.detailContent.innerHTML = `<div class="paper-meta">${metaBadges(article)}</div><h2>${escapeHtml(articleTitle(article))}</h2><p class="authors">${escapeHtml(authors)}</p><section class="detail-block english"><div class="block-title"><strong>${escapeHtml(t("originalEnglish"))}</strong><span>${escapeHtml(article.journal)}</span></div><div class="badge-row">${keywords.map((keyword) => `<span class="badge">${escapeHtml(keyword)}</span>`).join("")}</div><small>${escapeHtml(t("keywordNote"))}</small><p>${escapeHtml(article.abstractEn || article.abstract || t("noAbstractLong"))}</p></section><section class="provenance"><strong>Metadata</strong><span>${escapeHtml((article.sources || []).join(" · ") || "Crossref / OpenAlex")}</span>${article.license ? `<span>${escapeHtml(article.license)}</span>` : ""}</section><div class="figure-result" id="figure-result"></div><div class="detail-actions"><button class="favorite-button${isFavorite(id) ? " active" : ""}" data-favorite="${escapeHtml(id)}" type="button">${escapeHtml(isFavorite(id) ? t("favorited") : t("favorite"))}</button><button class="secondary-action" data-copy-citation type="button">${escapeHtml(t("copyCitation"))}</button>${APP_MODE === "server" && article.openAccess ? `<button class="secondary-action" data-figures type="button">${escapeHtml(t("figureScout"))}</button>` : ""}<a class="primary-action" href="${escapeHtml(article.url || doiUrl || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))} ↗</a>${doiUrl ? `<a class="secondary-action" href="${escapeHtml(doiUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("doi"))}</a>` : ""}</div>`;
    els.detailContent.querySelector("[data-favorite]")?.addEventListener("click", () => toggleFavorite(id));
    els.detailContent.querySelector("[data-copy-citation]")?.addEventListener("click", async () => { await navigator.clipboard.writeText(citationText(article)); showToast(t("copied")); });
    els.detailContent.querySelector("[data-figures]")?.addEventListener("click", () => loadFigures(article));
    if (!els.detailDialog.open) els.detailDialog.showModal();
    renderPapers();
  }

  async function loadFigures(article) {
    const box = $("#figure-result");
    if (!box) return;
    box.innerHTML = `<p>${escapeHtml(t("loading"))}...</p>`;
    try {
      const payload = await getJson(`/api/figures?id=${encodeURIComponent(articleKey(article))}`);
      box.innerHTML = payload.figures?.length ? payload.figures.map((figure) => `<a class="figure-card" href="${escapeHtml(figure.pageUrl || figure.src)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(figure.src)}" alt="${escapeHtml(figure.alt || "figure")}" loading="lazy" /><span>${escapeHtml(figure.caption || figure.alt || "Figure")}</span></a>`).join("") : `<p>${escapeHtml(t("figureEmpty"))}</p>`;
    } catch { box.innerHTML = `<p>${escapeHtml(t("figureUnavailable"))}</p>`; }
  }

  function renderHealthDialog() {
    const payload = state.payload || {};
    const health = payload.sourceHealth || {};
    const warnings = payload.errors || [];
    els.healthContent.innerHTML = `<h2>${escapeHtml(t("healthTitle"))}</h2><div class="health-grid"><div><span>${escapeHtml(t("represented"))}</span><strong>${health.representedJournals || 0}/${health.totalJournals || state.journals.length}</strong></div><div><span>${escapeHtml(t("freshSources"))}</span><strong>${health.freshJournals || 0}</strong></div><div><span>${escapeHtml(t("warnings"))}</span><strong>${health.warningCount ?? warnings.length}</strong></div><div><span>OpenAlex / Crossref</span><strong>${escapeHtml(`${health.openAlexMode || "--"} / ${health.crossrefMode || "--"}`)}</strong></div></div><section class="health-list"><h3>${escapeHtml(t("fallbackJournals"))}</h3><p>${escapeHtml((health.fallbackJournals || []).join(", ") || "--")}</p><h3>${escapeHtml(t("missingJournals"))}</h3><p>${escapeHtml((health.missingJournals || []).join(", ") || "--")}</p><h3>${escapeHtml(t("warnings"))}</h3>${warnings.length ? `<ol>${warnings.slice(0, 12).map((warning) => `<li>${escapeHtml(String(warning).slice(0, 320))}</li>`).join("")}</ol>` : `<p>${escapeHtml(t("noWarnings"))}</p>`}</section>`;
    if (!els.healthDialog.open) els.healthDialog.showModal();
  }

  function renderProfile() {
    loadRecords();
    if (!state.profile) { els.profileForm.hidden = false; els.profileSummary.hidden = true; els.profileReset.hidden = true; return; }
    els.profileForm.hidden = true; els.profileSummary.hidden = false; els.profileReset.hidden = false;
    els.profileSummary.innerHTML = `<strong>${escapeHtml(state.profile.name)}</strong><span>ID ${escapeHtml(state.profile.id)}</span><small>${escapeHtml(t("localProfileNote"))}</small><div class="record-counts"><button type="button" data-personal-jump="favorites">${escapeHtml(t("favorite"))}: ${state.records.favorites.length}</button><button type="button" data-personal-jump="history">${escapeHtml(t("historyOnly"))}: ${state.records.history.length}</button></div><div class="record-tools"><button type="button" data-export-records>${escapeHtml(t("exportRecords"))}</button><button type="button" data-import-records>${escapeHtml(t("importRecords"))}</button></div>`;
    els.profileSummary.querySelectorAll("[data-personal-jump]").forEach((button) => button.addEventListener("click", () => { state.selectedPersonal = button.dataset.personalJump; els.personalFilter.value = state.selectedPersonal; applyFilters(); }));
    els.profileSummary.querySelector("[data-export-records]")?.addEventListener("click", exportRecords);
    els.profileSummary.querySelector("[data-import-records]")?.addEventListener("click", importRecords);
  }

  function createProfile(name) { const base = normalizeText(name || "researcher") || "researcher"; let hash = 2166136261; for (const char of base) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0; state.profile = { name: name || "Researcher", id: `GLR-${hash.toString(16).slice(0, 8).toUpperCase()}` }; writeJson("glr-profile", state.profile); loadRecords(); renderProfile(); }
  function exportRecords() { const blob = new Blob([JSON.stringify({ version: 1, profile: state.profile, records: state.records, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "geo-literature-reading-records.json"; link.click(); URL.revokeObjectURL(link.href); }
  function importRecords() { const input = document.createElement("input"); input.type = "file"; input.accept = "application/json"; input.addEventListener("change", async () => { try { const data = JSON.parse(await input.files[0].text()); if (!Array.isArray(data.records?.favorites) || !Array.isArray(data.records?.history)) throw new Error("Invalid records"); state.records = { favorites: data.records.favorites.slice(0, 200), history: data.records.history.slice(0, 100) }; saveRecords(); renderProfile(); applyFilters(); showToast(t("copied")); } catch (error) { showToast(error.message); } }); input.click(); }

  function inferTheme(prompt) { const normalized = normalizeText(prompt); for (const theme of state.themes) { if ([theme.zh, theme.en, ...(THEME_ALIASES[theme.id] || [])].some((term) => normalizeText(term) && normalized.includes(normalizeText(term)))) return theme.id; } return null; }
  function runAgent(preset = "") {
    const prompt = preset || els.agentInput.value.trim();
    const normalized = normalizeText(prompt);
    if (!prompt) { els.agentResult.innerHTML = `<p>${escapeHtml(t("agentEmpty"))}</p>`; return; }
    const theme = inferTheme(prompt); if (theme) state.selectedTheme = theme;
    if (/(3|三).*(月|month)/i.test(prompt)) state.months = 3; else if (/(12|一年|year)/i.test(prompt)) state.months = 12; else if (/(6|六|半年).*(月|month)?/i.test(prompt)) state.months = 6;
    if (/引用|cited|citation/i.test(prompt) || preset === "top-cited") state.sort = "cited";
    if (/开放|open access|\boa\b/i.test(prompt) || preset === "open-access") state.selectedAccess = "open";
    if (/收藏|favorite/i.test(prompt)) state.selectedPersonal = "favorites";
    if (/缺摘要|no abstract/i.test(prompt)) state.selectedAbstract = "missing";
    populateFilters(); applyFilters();
    const picks = state.filtered.slice(0, 5);
    els.agentResult.innerHTML = `<p>${escapeHtml(t("agentResult", { n: state.filtered.length }))}</p><ol>${picks.map((article) => `<li><button type="button" data-agent-detail="${escapeHtml(articleKey(article))}">${escapeHtml(articleTitle(article))}</button><small>${escapeHtml(article.journalAbbr || article.journal)} · ${Number(article.citedBy || 0)} ${escapeHtml(t("citations"))}</small></li>`).join("")}</ol>`;
    els.agentResult.querySelectorAll("[data-agent-detail]").forEach((button) => button.addEventListener("click", () => { const article = state.articles.find((item) => articleKey(item) === button.dataset.agentDetail); if (article) openDetail(article); }));
  }

  function setView(view) { state.view = view; localStorage.setItem("glr-view", view); const cards = view === "cards"; els.paperList.hidden = !cards; els.tableWrap.hidden = cards; document.querySelectorAll(".view-tabs button").forEach((button) => { button.classList.toggle("active", button.dataset.view === view); button.setAttribute("aria-selected", String(button.dataset.view === view)); }); }

  function csvCell(value) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }
  function exportResults() { const rows = [["date", "journal", "title", "authors", "doi", "citations", "open_access", "url"], ...state.filtered.map((article) => [article.published, article.journal, articleTitle(article), (article.authors || []).join("; "), article.doi, article.citedBy || 0, article.openAccess ? "yes" : "no", article.url])]; const blob = new Blob([`\ufeff${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`], { type: "text/csv;charset=utf-8" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `geo-literature-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(link.href); }

  async function loadJournals(refresh = false) { const payload = await getJson("/api/journals", { refresh }); state.journals = payload.journals || []; state.themes = payload.themes || []; state.journalMap = new Map(state.journals.map((journal) => [journal.id, journal])); populateFilters(); renderJournals(); }
  async function loadArticles(refresh = false) {
    els.refreshButton.disabled = true; els.refreshButton.classList.add("spinning");
    try {
      const payload = await getJson(`/api/articles?months=${APP_MODE === "static" ? 12 : state.months}${refresh ? "&refresh=1" : ""}`, { refresh });
      state.payload = payload;
      state.articles = (payload.articles || []).filter((article) => article && articleTitle(article) && article.published);
      renderStats(); renderJournals(); applyFilters({ keepVisible: false });
      if (refresh) showToast(APP_MODE === "static" ? t("staticRefresh") : t("serverRefresh"));
    } catch (error) { showToast(error.message); els.heroStatus.textContent = error.message; els.freshnessStatus.dataset.status = "degraded"; }
    finally { els.refreshButton.disabled = false; els.refreshButton.classList.remove("spinning"); }
  }

  function bindSelect(element, setter) { element.addEventListener("change", () => { setter(element.value); applyFilters(); }); }
  function bindEvents() {
    els.profileForm.addEventListener("submit", (event) => { event.preventDefault(); createProfile(els.profileName.value.trim()); });
    els.profileReset.addEventListener("click", () => { localStorage.removeItem("glr-profile"); state.profile = null; state.selectedPersonal = "all"; loadRecords(); applyFilters(); renderProfile(); });
    els.search.addEventListener("input", () => { state.query = els.search.value; applyFilters(); });
    bindSelect(els.searchMode, (value) => { state.searchMode = value; });
    bindSelect(els.themeFilter, (value) => { state.selectedTheme = value; });
    bindSelect(els.journalFilter, (value) => { state.selectedJournal = value; });
    bindSelect(els.qualityFilter, (value) => { state.selectedQuality = value; });
    bindSelect(els.accessFilter, (value) => { state.selectedAccess = value; });
    bindSelect(els.abstractFilter, (value) => { state.selectedAbstract = value; });
    bindSelect(els.personalFilter, (value) => { state.selectedPersonal = value; });
    bindSelect(els.sortSelect, (value) => { state.sort = value; });
    bindSelect(els.monthsSelect, (value) => { state.months = Number(value); });
    els.resetFilters.addEventListener("click", resetFilters);
    els.clearThemeButton.addEventListener("click", () => clearFilter("theme"));
    els.refreshButton.addEventListener("click", () => loadArticles(true));
    els.freshnessStatus.addEventListener("click", renderHealthDialog);
    els.showSourceHealth.addEventListener("click", renderHealthDialog);
    els.agentRun.addEventListener("click", () => runAgent());
    document.querySelectorAll("[data-agent-preset]").forEach((button) => button.addEventListener("click", () => runAgent(button.dataset.agentPreset)));
    els.languageToggle.addEventListener("click", () => { state.lang = state.lang === "zh" ? "en" : "zh"; localStorage.setItem("glr-lang", state.lang); renderChrome(); renderStats(); renderJournals(); applyFilters({ keepVisible: true }); if (els.detailDialog.open && state.activeDetailId) { const article = state.articles.find((item) => articleKey(item) === state.activeDetailId); if (article) openDetail(article); } });
    document.querySelectorAll(".view-tabs button").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
    els.loadMore.addEventListener("click", () => { state.visible += PAGE_SIZE; renderPapers(); });
    els.exportResults.addEventListener("click", exportResults);
    els.mobileFilterToggle.addEventListener("click", () => { const open = els.filtersPanel.classList.toggle("mobile-open"); els.mobileFilterToggle.setAttribute("aria-expanded", String(open)); });
    document.addEventListener("keydown", (event) => { const editing = ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName); if (!editing && event.key === "Backspace" && state.selectedTheme !== "all") { event.preventDefault(); clearFilter("theme"); } if (event.key === "/" && !editing) { event.preventDefault(); els.search.focus(); } });
  }

  async function init() {
    restoreUrl(); loadRecords(); bindEvents(); renderChrome(); setView(state.view); els.agentResult.innerHTML = `<p>${escapeHtml(t("agentEmpty"))}</p>`;
    await loadJournals();
    await loadArticles(false);
  }

  init().catch((error) => { showToast(error.message); console.error(error); });
})();
