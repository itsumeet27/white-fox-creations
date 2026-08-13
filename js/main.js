/**
 * Homepage showreel modal. Header, footer, and nav live in site-chrome.js.
 */
(function () {
  const modal = document.getElementById("showreel-modal");
  const video = document.getElementById("showreel-video");
  const openBtn = document.querySelector("[data-open-showreel]");
  const closeEls = modal ? modal.querySelectorAll("[data-close-modal]") : [];

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
    const fallback = modal.querySelector(".modal__fallback");
    if (video) {
      const hideFallback = () => {
        if (fallback) fallback.hidden = true;
      };
      video.addEventListener("loadeddata", hideFallback, { once: true });
      if (window.matchMedia("(min-width: 768px)").matches) {
        video.play().then(hideFallback).catch(() => {
          /* placeholder may fail — keep note visible */
        });
      }
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    if (openBtn) openBtn.focus();
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  closeEls.forEach((el) => el.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });
})();
