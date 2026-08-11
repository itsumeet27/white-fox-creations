/**
 * Gallery page animations — loader, reveals, Intersection Observer
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finishLoader() {
    const loader = document.querySelector(".page-loader");
    const header = document.querySelector(".site-header");
    if (loader) loader.classList.add("is-done");
    if (header) header.classList.add("is-ready");
    document.querySelectorAll(".reveal-load").forEach((el) => el.classList.add("is-in"));
  }

  function observeCards() {
    const cards = document.querySelectorAll(".artwork-card");
    if (reduce || !("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${(i % 6) * 0.06}s`;
      io.observe(card);
    });
  }

  window.GalleryAnimations = {
    start() {
      if (reduce) {
        finishLoader();
        observeCards();
        return;
      }
      window.setTimeout(finishLoader, 900);
      observeCards();
    },
    refreshCards: observeCards
  };
})();
