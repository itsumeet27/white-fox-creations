/**
 * Projects page — show/hide details, category film reel, banner strip
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const categories = window.PROJECT_CATEGORIES || [];

  const els = {
    header: document.querySelector(".site-header"),
    loader: document.querySelector(".page-loader"),
    navLinks: document.getElementById("nav-links"),
    menuToggle: document.querySelector(".nav__menu-toggle"),
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
    reel: document.getElementById("film-reel"),
    banner: document.getElementById("film-banner"),
    bannerName: document.querySelector("[data-banner-name]"),
    bannerCount: document.querySelector("[data-banner-count]")
  };

  const state = {
    categoryIndex: 0,
    projectIndex: 0,
    detailsOpen: false
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

  function renderReel() {
    if (!els.reel) return;
    els.reel.innerHTML = categories
      .map((cat, i) => {
        const active = i === state.categoryIndex ? " is-active" : "";
        return `
          <button class="film-card${active}" type="button" role="listitem" data-cat="${i}" data-cursor="view" aria-pressed="${i === state.categoryIndex}">
            <img src="${cat.cover}" alt="" width="600" height="840" loading="lazy" decoding="async">
            <span class="film-card__caption">
              <h3>${cat.name}</h3>
              <p>${pad(cat.projects.length)} Projects</p>
            </span>
          </button>
        `;
      })
      .join("");

    els.reel.querySelectorAll(".film-card").forEach((card) => {
      card.addEventListener("click", () => {
        const next = Number(card.dataset.cat);
        if (next === state.categoryIndex) {
          card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
          return;
        }
        state.categoryIndex = next;
        state.projectIndex = 0;
        const reelX = els.reel.scrollLeft;
        renderReel();
        els.reel.scrollLeft = reelX;
        renderBanner();
        renderHero(currentProject());
        syncHash();
        const active = els.reel.querySelector(".film-card.is-active");
        if (active) {
          active.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
        }
      });
    });
  }

  function renderBanner() {
    const cat = currentCategory();
    if (!cat || !els.banner) return;
    els.bannerName.textContent = cat.name;
    els.bannerCount.textContent = String(cat.projects.length);

    els.banner.innerHTML = cat.projects
      .map((project, i) => {
        const active = i === state.projectIndex ? " is-active" : "";
        return `
          <button class="banner-frame${active}" type="button" role="listitem" data-index="${i}" data-cursor="view" style="animation-delay: ${i * 0.045}s" aria-pressed="${i === state.projectIndex}">
            <img src="${project.image}" alt="${project.title}" width="720" height="450" loading="lazy" decoding="async">
            <span class="banner-frame__meta">
              <span class="banner-frame__index">${pad(i + 1)}</span>
              <span class="banner-frame__title">${project.title}</span>
            </span>
          </button>
        `;
      })
      .join("");

    els.banner.querySelectorAll(".banner-frame").forEach((frame) => {
      frame.addEventListener("click", () => {
        const next = Number(frame.dataset.index);
        if (next === state.projectIndex) return;
        state.projectIndex = next;
        renderHero(currentProject());
        els.banner.querySelectorAll(".banner-frame").forEach((el) => {
          const on = Number(el.dataset.index) === next;
          el.classList.toggle("is-active", on);
          el.setAttribute("aria-pressed", String(on));
        });
        frame.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
        syncHash();
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      });
    });

    const active = els.banner.querySelector(".banner-frame.is-active");
    if (active) {
      active.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
    }
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
    const step = () => {
      const card = els.reel.querySelector(".film-card");
      return card ? card.getBoundingClientRect().width + 18 : 240;
    };
    if (prev) {
      prev.addEventListener("click", () => {
        els.reel.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" });
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        els.reel.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" });
      });
    }
  }

  function initNav() {
    function onScroll() {
      if (els.header) els.header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (els.menuToggle && els.navLinks) {
      els.menuToggle.addEventListener("click", () => {
        const open = !els.navLinks.classList.contains("is-open");
        els.navLinks.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-open", open);
        els.menuToggle.setAttribute("aria-expanded", String(open));
        els.menuToggle.querySelector("span").textContent = open ? "Close" : "Menu";
      });
      els.navLinks.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          els.navLinks.classList.remove("is-open");
          document.body.classList.remove("nav-open");
          els.menuToggle.setAttribute("aria-expanded", "false");
          els.menuToggle.querySelector("span").textContent = "Menu";
        });
      });
    }

    const dotBtn = document.querySelector(".nav__dot-btn");
    if (dotBtn) {
      dotBtn.addEventListener("click", () => dotBtn.classList.toggle("is-active"));
    }

    document.querySelectorAll('a[href="#top"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        if (reduce) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
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
      const cat = currentCategory();
      if (!cat) return;
      if (e.key === "ArrowRight") {
        state.projectIndex = (state.projectIndex + 1) % cat.projects.length;
        renderBanner();
        renderHero(currentProject());
        syncHash();
      }
      if (e.key === "ArrowLeft") {
        state.projectIndex = (state.projectIndex - 1 + cat.projects.length) % cat.projects.length;
        renderBanner();
        renderHero(currentProject());
        syncHash();
      }
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
      renderReel();
      renderBanner();
      renderHero(currentProject(), { animate: false });
      initShowMore();
      initReelNav();
      initNav();
      initCursor();
      initKeyboard();
      syncHash();
    } finally {
      initIntro();
    }
  });
})();
