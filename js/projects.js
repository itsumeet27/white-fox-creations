/**
 * Projects page — show/hide details, category film reel, banner strip
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const categories = window.PROJECT_CATEGORIES || [];

  const els = {
    header: document.querySelector(".site-header"),
    loader: document.querySelector(".page-loader"),
    image: document.getElementById("project-hero-image"),
    frame: document.querySelector(".project-frame"),
    title: document.getElementById("project-title"),
    discipline: document.getElementById("project-discipline"),
    year: document.getElementById("project-year"),
    summary: document.getElementById("project-summary"),
    about: document.getElementById("project-about"),
    objective: document.getElementById("project-objective"),
    duration: document.getElementById("project-duration"),
    process: document.getElementById("project-process"),
    tools: document.getElementById("project-tools"),
    deliverables: document.getElementById("project-deliverables"),
    index: document.querySelector("[data-project-index]"),
    total: document.querySelector("[data-project-total]"),
    showMore: document.getElementById("show-more"),
    showMoreLabel: document.querySelector("[data-show-more-label]"),
    details: document.getElementById("project-details"),
    filters: document.getElementById("category-filters"),
    banner: document.getElementById("film-banner"),
    bannerName: document.querySelector("[data-banner-name]"),
    bannerCount: document.querySelector("[data-banner-count]")
  };

  const state = {
    categoryIndex: 0,
    projectIndex: 0,
    detailsOpen: false,
    bannerCategory: -1
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function currentCategory() {
    return categories[state.categoryIndex];
  }

  function currentProject() {
    const cat = currentCategory();
    return cat ? cat.projects[state.projectIndex] : null;
  }

  function listHTML(items) {
    return (items || []).map((item) => `<li>${item}</li>`).join("");
  }

  function renderDetails(project) {
    els.about.innerHTML = (project.about || [])
      .map((p) => `<p>${p}</p>`)
      .join("");
    els.objective.textContent = project.objective || "";
    els.duration.textContent = project.duration || "";
    els.process.innerHTML = listHTML(project.process);
    els.tools.innerHTML = listHTML(project.tools);
    els.deliverables.innerHTML = listHTML(project.deliverables);
  }

  function renderHero(project, { animate } = { animate: true }) {
    if (!project) return;
    const cat = currentCategory();
    const total = cat.projects.length;

    const applyCopy = () => {
      els.title.textContent = project.title;
      els.discipline.textContent = project.discipline;
      els.year.textContent = String(project.year);
      els.summary.textContent = project.summary;
      els.image.src = project.image;
      els.image.alt = `${project.title} — ${project.discipline}`;
      els.index.textContent = pad(state.projectIndex + 1);
      els.total.textContent = pad(total);
      renderDetails(project);
    };

    if (!animate || reduce) {
      applyCopy();
      if (els.frame) els.frame.classList.remove("is-swapping");
      return;
    }

    if (els.frame) els.frame.classList.add("is-swapping");
    window.setTimeout(() => {
      applyCopy();
      requestAnimationFrame(() => {
        if (els.frame) els.frame.classList.remove("is-swapping");
      });
    }, 280);
  }

  function renderFilters() {
    if (!els.filters) return;
    els.filters.innerHTML = categories
      .map((cat, i) => {
        const active = i === state.categoryIndex;
        return `
          <button type="button" class="${active ? "is-active" : ""}" role="tab" data-cat="${i}" data-cursor="button" aria-selected="${active}">
            ${cat.name} <span class="category-filters__count">(${cat.projects.length})</span>
          </button>
        `;
      })
      .join("");

    els.filters.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = Number(btn.dataset.cat);
        if (next === state.categoryIndex) return;
        state.categoryIndex = next;
        state.projectIndex = 0;
        renderFilters();
        renderBanner();
        renderHero(currentProject());
        syncHash();
      });
    });
  }

  function goToProject(index) {
    const cat = currentCategory();
    if (!cat || !cat.projects.length) return;
    const len = cat.projects.length;
    const next = ((index % len) + len) % len;
    if (next === state.projectIndex) return;
    state.projectIndex = next;
    renderHero(currentProject());
    highlightActiveFrame();
    syncHash();
  }

  function scrollBannerTo(frame, behavior) {
    if (!els.banner || !frame) return;
    const left = frame.offsetLeft - (els.banner.clientWidth - frame.offsetWidth) / 2;
    els.banner.scrollTo({
      left: Math.max(0, left),
      behavior: behavior || (reduce ? "auto" : "smooth")
    });
  }

  function highlightActiveFrame(behavior) {
    if (!els.banner) return;
    let active = null;
    els.banner.querySelectorAll(".banner-frame").forEach((el) => {
      const on = Number(el.dataset.index) === state.projectIndex;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-pressed", String(on));
      if (on) active = el;
    });
    if (active) scrollBannerTo(active, behavior);
  }

  function renderBanner() {
    const cat = currentCategory();
    if (!cat || !els.banner) return;
    els.bannerName.textContent = cat.name;
    els.bannerCount.textContent = String(cat.projects.length);

    if (state.bannerCategory === state.categoryIndex && els.banner.children.length) {
      highlightActiveFrame("auto");
      return;
    }

    state.bannerCategory = state.categoryIndex;
    els.banner.innerHTML = cat.projects
      .map((project, i) => {
        const active = i === state.projectIndex ? " is-active" : "";
        return `
          <button class="banner-frame${active}" type="button" role="listitem" data-index="${i}" data-cursor="view" aria-pressed="${i === state.projectIndex}">
            <img src="${project.image}" alt="${project.title}" width="720" height="450" loading="eager" decoding="async">
            <span class="banner-frame__meta">
              <span class="banner-frame__index">${pad(i + 1)}</span>
              <span class="banner-frame__title">${project.title}</span>
            </span>
          </button>
        `;
      })
      .join("");

    highlightActiveFrame("auto");
  }

  function scrollPageToTop() {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth"
    });
  }

  function initBannerClicks() {
    if (!els.banner) return;
    els.banner.addEventListener("click", (e) => {
      const frame = e.target.closest(".banner-frame");
      if (!frame) return;
      goToProject(Number(frame.dataset.index));
      scrollPageToTop();
    });
  }

  function setDetails(open) {
    state.detailsOpen = open;
    els.details.classList.toggle("is-open", open);
    els.showMore.setAttribute("aria-expanded", String(open));
    els.showMoreLabel.textContent = open ? "Show Less" : "Show More";
  }

  function initShowMore() {
    if (!els.showMore) return;
    els.showMore.addEventListener("click", () => {
      setDetails(!state.detailsOpen);
    });
  }

  function initReelNav() {
    const prev = document.querySelector("[data-reel-prev]");
    const next = document.querySelector("[data-reel-next]");
    if (prev) {
      prev.addEventListener("click", () => goToProject(state.projectIndex - 1));
    }
    if (next) {
      next.addEventListener("click", () => goToProject(state.projectIndex + 1));
    }
  }

  function initCursor() {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || reduce) return;
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;
    document.body.classList.add("has-custom-cursor");

    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursor.classList.add("is-active");
    }, { passive: true });

    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("[data-cursor]");
      cursor.classList.remove("is-view", "is-button");
      if (!target) return;
      const mode = target.getAttribute("data-cursor");
      if (mode === "view") cursor.classList.add("is-view");
      if (mode === "button") cursor.classList.add("is-button");
    });

    document.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  }

  function initKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (e.target && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") goToProject(state.projectIndex + 1);
      if (e.key === "ArrowLeft") goToProject(state.projectIndex - 1);
    });
  }

  function initIntro() {
    const delay = reduce ? 0 : 850;
    window.setTimeout(() => {
      if (els.loader) els.loader.classList.add("is-done");
      if (els.header) els.header.classList.add("is-ready");
      document.querySelectorAll(".reveal-load").forEach((el) => el.classList.add("is-in"));
    }, delay);
  }

  function syncHash() {
    const project = currentProject();
    if (!project || !history.replaceState) return;
    history.replaceState(null, "", `#${project.id}`);
  }

  function applyHash() {
    const hash = (window.location.hash || "").replace("#", "");
    if (!hash) return;
    const catIdx = categories.findIndex((c) => c.id === hash);
    if (catIdx >= 0) {
      state.categoryIndex = catIdx;
      state.projectIndex = 0;
      return;
    }
    categories.forEach((cat, ci) => {
      const pi = cat.projects.findIndex((p) => p.id === hash);
      if (pi >= 0) {
        state.categoryIndex = ci;
        state.projectIndex = pi;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    try {
      applyHash();
      renderFilters();
      renderBanner();
      renderHero(currentProject(), { animate: false });
      initShowMore();
      initReelNav();
      initBannerClicks();
      initCursor();
      initKeyboard();
      syncHash();
    } finally {
      initIntro();
    }
  });
})();
