(function () {
  const I18N = {
    zh: {
      brandSubtitle: "地球系统文献主题雷达",
      navRadar: "主题雷达",
      navPapers: "论文列表",
      navSources: "期刊源",
      refresh: "刷新",
      loading: "加载中",
      filters: "筛选",
      search: "搜索",
      searchPlaceholder: "题名、作者、关键词、期刊",
      theme: "主题",
      journal: "期刊",
      abstractStatus: "摘要状态",
      sort: "排序",
      months: "追溯",
      dataAudit: "数据审计",
      themeRadar: "主题雷达",
      paperList: "论文列表",
      cards: "卡片",
      table: "表格",
      date: "日期",
      paper: "论文",
      link: "链接",
      journalSources: "期刊源清单",
      sourceText: "监测 18 个高质量期刊；题录来自官方源和 DOI 元数据，全文始终回链原站。",
      metricPapers: "论文",
      metricJournals: "期刊",
      metricAbstracts: "摘要覆盖",
      metricUpdated: "更新",
      heroTitle: "地球系统科学前沿追踪",
      heroDescription: "聚合近半年核心期刊论文，按主题、期刊和摘要可用性组织，保留英文原始题录、关键词、摘要与官方链接，便于课题组快速筛选。",
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
      coverage: "摘要覆盖 {withAbstract}/{total}，缺摘要 {missing} 篇。缺摘要条目只显示题名级导读。",
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
      englishKeywords: "英文关键词",
      englishAbstractExcerpt: "英文摘要缩略",
      originalEnglish: "英文原文",
      abstract: "摘要",
      noAbstractLong: "当前元数据源没有提供英文摘要。请打开官方页面核对摘要、方法和结论。",
      priorityBadge: "优先",
      empty: "没有匹配的论文。"
    },
    en: {
      brandSubtitle: "Earth System Literature Radar",
      navRadar: "Radar",
      navPapers: "Papers",
      navSources: "Sources",
      refresh: "Refresh",
      loading: "Loading",
      filters: "Filters",
      search: "Search",
      searchPlaceholder: "title, author, keyword, journal",
      theme: "Theme",
      journal: "Journal",
      abstractStatus: "Abstract status",
      sort: "Sort",
      months: "Window",
      dataAudit: "Data Audit",
      themeRadar: "Theme Radar",
      paperList: "Paper List",
      cards: "Cards",
      table: "Table",
      date: "Date",
      paper: "Paper",
      link: "Link",
      journalSources: "Journal Sources",
      sourceText: "Tracking 18 high-quality journals; metadata comes from official sources and DOI indexes, with full text linked back to publishers.",
      metricPapers: "Papers",
      metricJournals: "Journals",
      metricAbstracts: "Abstracts",
      metricUpdated: "Updated",
      heroTitle: "Earth System Science Frontiers",
      heroDescription: "A focused tracker for recent high-quality journal papers, organized by theme, source, abstract availability, and original publisher metadata.",
      allThemes: "All themes",
      allJournals: "All journals",
      newest: "Newest",
      cited: "Cited",
      priority: "Reading priority",
      journalName: "Journal name",
      threeMonths: "Past 3 months",
      sixMonths: "Past 6 months",
      twelveMonths: "Past 12 months",
      resultCount: "Showing {n} papers.",
      cachedCount: "Loaded cached data: {n} papers.",
      refreshedCount: "Updated from live sources: {n} papers.",
      coverage: "Abstract coverage {withAbstract}/{total}; {missing} papers are missing abstracts.",
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
      englishKeywords: "English keywords",
      englishAbstractExcerpt: "English abstract excerpt",
      originalEnglish: "Original English",
      abstract: "Abstract",
      noAbstractLong: "No English abstract is available in the current metadata source. Open the official page to verify the abstract, methods, and conclusions.",
      priorityBadge: "Priority",
      empty: "No matching papers."
    }
  };

  const state = {
    lang: localStorage.getItem("glr-lang") || "zh",
    journals: [],
    themes: [],
    articles: [],
    filtered: [],
    coverage: null,
    lastPayload: null,
    selectedTheme: "all",
    selectedJournal: "all",
    selectedAbstract: "all",
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
    themeFilter: document.querySelector("#theme-filter"),
    journalFilter: document.querySelector("#journal-filter"),
    abstractFilter: document.querySelector("#abstract-filter"),
    sortSelect: document.querySelector("#sort-select"),
    monthsSelect: document.querySelector("#months-select"),
    resultNote: document.querySelector("#result-note"),
    coverageNote: document.querySelector("#coverage-note"),
    windowLabel: document.querySelector("#window-label"),
    radarBoard: document.querySelector("#radar-board"),
    paperList: document.querySelector("#paper-list"),
    tableWrap: document.querySelector("#paper-table-wrap"),
    tableBody: document.querySelector("#paper-table-body"),
    journalGrid: document.querySelector("#journal-grid"),
    refreshButton: document.querySelector("#refresh-button"),
    languageToggle: document.querySelector("#language-toggle"),
    detailDialog: document.querySelector("#detail-dialog"),
    detailContent: document.querySelector("#detail-content"),
    toast: document.querySelector("#toast")
  };

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
    return state.lang === "zh" ? value.zh : value.en;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
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

  function articleTitle(article) {
    return article.titleEn || article.title;
  }

  function englishTitle(article) {
    return article.titleEn || article.title || "";
  }

  function englishKeywords(article) {
    return (article.keywordsEn || article.subjects || []).slice(0, 6);
  }

  function englishAbstractExcerpt(article, maxChars = 360) {
    const text = article.abstractEn || article.abstract || "";
    if (!text) return t("noAbstractLong");
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
    const excerpt = (sentences.slice(0, 2).join(" ") || text).trim();
    return excerpt.length > maxChars ? `${excerpt.slice(0, maxChars).trim()}...` : excerpt;
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

  function renderChrome() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.querySelector("#brand-subtitle").textContent = t("brandSubtitle");
    document.querySelector("#hero-title").textContent = t("heroTitle");
    document.querySelector("#hero-description").textContent = t("heroDescription");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    els.search.placeholder = t("searchPlaceholder");
    els.languageToggle.textContent = state.lang === "zh" ? "EN" : "中";
    populateFilters();
    updateStaticSelects();
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
      showToast(state.lang === "zh" ? `部分数据源返回较慢，已保留可用结果。` : "Some sources were slow; available results are preserved.");
    }
  }

  function applyFilters() {
    const query = state.query.trim().toLowerCase();
    let list = state.articles.filter((item) => {
      const themeMatch = state.selectedTheme === "all" || item.themeId === state.selectedTheme;
      const journalMatch = state.selectedJournal === "all" || item.journalId === state.selectedJournal;
      const abstractMatch = state.selectedAbstract === "all" || item.abstractStatus === state.selectedAbstract;
      const haystack = [
        item.title,
        item.titleEn,
        item.journal,
        item.journalAbbr,
        item.themeZh,
        item.themeEn,
        item.abstract,
        item.abstractEn,
        (item.authors || []).join(" "),
        (item.keywordsEn || []).join(" "),
        (item.subjects || []).join(" ")
      ]
        .join(" ")
        .toLowerCase();
      return themeMatch && journalMatch && abstractMatch && (!query || haystack.includes(query));
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
    renderRadar();
    renderPapers();
  }

  function groupByTheme(list) {
    const counts = new Map(state.themes.map((theme) => [theme.id, { theme, count: 0, abstracts: 0 }]));
    list.forEach((item) => {
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
      });
    });
  }

  function metaBadges(article) {
    return `
      <span>${escapeHtml(formatDate(article.published))}</span>
      <span>${escapeHtml(article.journalAbbr || article.journal)}</span>
      <span class="${article.hasAbstract ? "ok" : "warn"}">${escapeHtml(article.hasAbstract ? t("hasAbstract") : t("noAbstract"))}</span>
      ${priorityScore(article) >= 10 ? `<span class="ok">${escapeHtml(t("priorityBadge"))}</span>` : ""}
      <span>${escapeHtml(article.openAccess ? t("oa") : t("metadata"))}</span>
    `;
  }

  function paperCard(article) {
    const authors = article.authors && article.authors.length ? article.authors.join(", ") : t("authorsPending");
    const enKeywords = englishKeywords(article);
    return `
      <article class="paper-card" style="--theme-color:${escapeHtml(article.themeColor || "#2563eb")}">
        <div class="paper-meta">${metaBadges(article)}</div>
        <div class="title-stack">
          <div class="title-line">
            <span>${escapeHtml(t("englishTitle"))}</span>
            <h3>${escapeHtml(englishTitle(article))}</h3>
          </div>
        </div>
        <p class="authors">${escapeHtml(authors)}</p>
        <div class="keyword-groups">
          <div>
            <span>${escapeHtml(t("englishKeywords"))}</span>
            <div class="badge-row">${enKeywords.map((keyword) => `<span class="badge">${escapeHtml(keyword)}</span>`).join("") || `<span class="badge muted">${escapeHtml(t("metadata"))}</span>`}</div>
          </div>
        </div>
        <div class="abstract-preview">
          <span>${escapeHtml(t("englishAbstractExcerpt"))}</span>
          <p>${escapeHtml(englishAbstractExcerpt(article))}</p>
        </div>
        <div class="card-actions">
          <button class="text-button" data-detail="${escapeHtml(article.id)}" type="button">${escapeHtml(t("details"))}</button>
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
            <td>
              <strong>${escapeHtml(articleTitle(article))}</strong>
            </td>
            <td><a class="official-link" href="${escapeHtml(article.url || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))}</a></td>
          </tr>
        `
      )
      .join("");

    document.querySelectorAll("[data-detail]").forEach((button) => {
      button.addEventListener("click", () => {
        const article = state.articles.find((item) => item.id === button.dataset.detail);
        if (article) openDetail(article);
      });
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

  function openDetail(article) {
    state.activeDetailId = article.id;
    const authors = article.authors && article.authors.length ? article.authors.join(", ") : t("authorsPending");
    const doiUrl = article.doi ? `https://doi.org/${article.doi}` : "";
    const enKeywords = englishKeywords(article);
    els.detailContent.innerHTML = `
      <div class="paper-meta">${metaBadges(article)}</div>
      <h2>${escapeHtml(articleTitle(article))}</h2>
      <p class="authors">${escapeHtml(authors)}</p>

      <section class="detail-block english">
        <div class="block-title"><strong>${escapeHtml(t("originalEnglish"))}</strong><span>${escapeHtml(article.journal)}</span></div>
        <h3>${escapeHtml(article.titleEn || article.title)}</h3>
        <div class="badge-row">${enKeywords.map((keyword) => `<span class="badge">${escapeHtml(keyword)}</span>`).join("")}</div>
        <p>${escapeHtml(article.abstractEn || article.abstract || t("noAbstractLong"))}</p>
      </section>

      <div class="detail-actions">
        <a class="primary-action" href="${escapeHtml(article.url || doiUrl || article.officialJournalUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("official"))}</a>
        ${doiUrl ? `<a class="secondary-action" href="${escapeHtml(doiUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t("doi"))}</a>` : ""}
      </div>
    `;
    if (!els.detailDialog.open) {
      els.detailDialog.showModal();
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
      state.articles = payload.articles || [];
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
    els.search.addEventListener("input", () => {
      state.query = els.search.value;
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
    els.languageToggle.addEventListener("click", () => {
      state.lang = state.lang === "zh" ? "en" : "zh";
      localStorage.setItem("glr-lang", state.lang);
      renderChrome();
      renderStats(state.lastPayload || { count: state.articles.length, journals: state.journals.length, coverage: state.coverage });
      renderJournals();
      applyFilters();
      if (els.detailDialog.open && state.activeDetailId) {
        const article = state.articles.find((item) => item.id === state.activeDetailId);
        if (article) openDetail(article);
      }
    });
    document.querySelectorAll(".view-tabs button").forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.view));
    });
  }

  async function init() {
    bindEvents();
    renderChrome();
    setView("cards");
    await loadJournals();
    await loadArticles(false);
  }

  init().catch((error) => showToast(error.message));
})();
