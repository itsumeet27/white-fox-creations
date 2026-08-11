/**
 * Gallery lightbox — keyboard + swipe support
 */
(function () {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const items = Array.from(document.querySelectorAll("[data-gallery-index]"));
  const imageEl = lightbox.querySelector(".lightbox__image");
  const titleEl = lightbox.querySelector(".lightbox__title");
  const metaEl = lightbox.querySelector(".lightbox__meta");
  const closeEls = lightbox.querySelectorAll("[data-lightbox-close]");
  const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  const nextBtn = lightbox.querySelector("[data-lightbox-next]");

  let index = 0;
  let open = false;
  let touchStartX = 0;

  function getData(i) {
    const el = items[i];
    const img = el.querySelector("img");
    return {
      src: img.currentSrc || img.src,
      alt: img.alt || "",
      title: el.dataset.title || "",
      category: el.dataset.category || "",
      year: el.dataset.year || "",
    };
  }

  function render() {
    const data = getData(index);
    imageEl.src = data.src;
    imageEl.alt = data.alt;
    titleEl.textContent = data.title;
    metaEl.textContent = [data.category, data.year].filter(Boolean).join(" · ");
  }

  function show(i) {
    index = (i + items.length) % items.length;
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

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  items.forEach((item, i) => {
    item.addEventListener("click", () => show(i));
  });

  closeEls.forEach((el) => el.addEventListener("click", hide));
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  document.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") hide();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      if (!open) return;
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) next();
      else prev();
    },
    { passive: true }
  );
})();
