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

  document.addEventListener("DOMContentLoaded", () => {
    const total = (window.GALLERY_ARTWORKS || []).length;
    if (counterHero) counterHero.textContent = String(total).padStart(2, "0");

    if (window.GalleryFilters) {
      window.GalleryFilters.bind();
      window.GalleryFilters.apply("all", "latest");
    } else {
      renderGrid(window.GALLERY_ARTWORKS || []);
    }

    initReel();
    if (window.GalleryAnimations) window.GalleryAnimations.start();
  });
})();
