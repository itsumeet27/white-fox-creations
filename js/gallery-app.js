/**
 * Gallery page bootstrap — render grid, nav, reel modal
 */
(function () {
  const grid = document.getElementById("artwork-grid");
  const counterHero = document.querySelector("[data-gallery-total]");

  window.GalleryState = {
    filter: "all",
    sort: "latest",
    visible: [],
    onChange: renderGrid
  };

  function cardHTML(item) {
    return `
      <article class="artwork-card ${item.layout || "span-4 ratio-wide"}" data-id="${item.id}">
        <button class="artwork-card__media" type="button" data-cursor="view" aria-label="View ${item.title}">
          <img src="${item.image}" alt="${item.title} — ${item.category}" width="1200" height="900" loading="lazy" decoding="async">
          <span class="artwork-card__overlay" aria-hidden="true"></span>
        </button>
        <div class="artwork-card__meta">
          <p class="artwork-card__category">${item.category}</p>
          <h3 class="artwork-card__title">${item.title}</h3>
          <p class="artwork-card__year">${item.year}</p>
          <span class="artwork-card__arrow" aria-hidden="true">↗</span>
        </div>
      </article>
    `;
  }

  function renderGrid(items) {
    if (!grid) return;
    grid.innerHTML = items.map(cardHTML).join("");
    grid.querySelectorAll(".artwork-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = Number(card.dataset.id);
        if (window.GalleryLightbox) window.GalleryLightbox.openById(id);
      });
    });
    if (window.GalleryAnimations) window.GalleryAnimations.refreshCards();
  }

  function initNav() {
    const header = document.querySelector(".site-header");
    const links = document.getElementById("nav-links");
    const toggle = document.querySelector(".nav__menu-toggle");

    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = !links.classList.contains("is-open");
        links.classList.toggle("is-open", open);
        toggle.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }));
    }
  }

  function initReel() {
    const modal = document.getElementById("reel-modal");
    const openBtn = document.querySelector("[data-open-reel]");
    const video = document.getElementById("gallery-reel-video");
    if (!modal || !openBtn) return;

    function open() {
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      modal.querySelector(".modal__close").focus();
    }

    function close() {
      modal.hidden = true;
      document.body.style.overflow = "";
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      openBtn.focus();
    }

    openBtn.addEventListener("click", open);
    modal.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) close();
    });
  }

  function initTop() {
    document.querySelectorAll('a[href="#top"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const total = (window.GALLERY_ARTWORKS || []).length;
    if (counterHero) counterHero.textContent = String(total).padStart(2, "0");

    if (window.GalleryFilters) {
      window.GalleryFilters.bind();
      window.GalleryFilters.apply("all", "latest");
    } else {
      renderGrid(window.GALLERY_ARTWORKS || []);
    }

    initNav();
    initReel();
    initTop();
    if (window.GalleryAnimations) window.GalleryAnimations.start();
  });
})();
