/**
 * Fullscreen artwork lightbox
 */
(function () {
  const lightbox = document.getElementById("artwork-lightbox");
  if (!lightbox) return;

  const imageEl = lightbox.querySelector(".lightbox__image");
  const titleEl = lightbox.querySelector(".lightbox__title");
  const categoryEl = lightbox.querySelector(".lightbox__category");
  const yearEl = lightbox.querySelector(".lightbox__year");
  const descEl = lightbox.querySelector(".lightbox__desc");
  const toolsEl = lightbox.querySelector(".lightbox__tools");
  const counterEl = lightbox.querySelector(".lightbox__counter");
  const closeEls = lightbox.querySelectorAll("[data-lightbox-close]");
  const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  const nextBtn = lightbox.querySelector("[data-lightbox-next]");

  let index = 0;
  let open = false;
  let touchStartX = 0;
  let items = [];

  function currentList() {
    const state = window.GalleryState;
    return (state && state.visible && state.visible.length)
      ? state.visible
      : (window.GALLERY_ARTWORKS || []);
  }

  function render() {
    items = currentList();
    if (!items.length) return;
    index = ((index % items.length) + items.length) % items.length;
    const item = items[index];
    imageEl.src = item.image;
    imageEl.alt = item.title;
    titleEl.textContent = item.title;
    categoryEl.textContent = item.category;
    yearEl.textContent = String(item.year);
    descEl.textContent = item.description || "";
    toolsEl.textContent = item.tools || "";
    counterEl.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span> <span class="accent">/ ${String(items.length).padStart(2, "0")}</span>`;
  }

  function show(i) {
    items = currentList();
    index = typeof i === "number" ? i : 0;
    render();
    lightbox.hidden = false;
    open = true;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__close").focus();
  }

  function hide() {
    lightbox.hidden = true;
    open = false;
    document.body.style.overflow = "";
  }

  function next() { index += 1; render(); }
  function prev() { index -= 1; render(); }

  window.GalleryLightbox = {
    openById(id) {
      items = currentList();
      const i = items.findIndex((item) => item.id === id);
      show(i >= 0 ? i : 0);
    },
    openIndex: show,
    close: hide
  };

  closeEls.forEach((el) => el.addEventListener("click", hide));
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  document.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") hide();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    if (!open) return;
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else prev();
  }, { passive: true });
})();
