/**
 * Scroll reveals, parallax, page-load sequence
 */
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initLoadSequence() {
    const header = document.querySelector(".site-header");
    requestAnimationFrame(() => {
      if (header) header.classList.add("is-ready");
      document.querySelectorAll(".reveal-load").forEach((el) => {
        el.classList.add("is-in");
      });
    });
  }

  function revealMasksIn(scope) {
    scope.querySelectorAll(".project-image").forEach((el) => {
      el.classList.add("is-revealed");
    });
  }

  function initScrollReveals() {
    const reveals = document.querySelectorAll(".reveal");
    const masks = document.querySelectorAll(".project-image");

    /* Clip the inner media — never the observed box (clip-path zeroes IO). */
    masks.forEach((el) => el.classList.add("is-mask"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      masks.forEach((el) => el.classList.add("is-revealed"));
      document.querySelectorAll(".about-journey").forEach((el) => el.classList.add("is-drawn"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealMasksIn(entry.target);
          const journey = entry.target.querySelector(".about-journey");
          if (journey) journey.classList.add("is-drawn");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    reveals.forEach((el) => io.observe(el));

    /* Standalone project images outside .reveal (if any) */
    const orphanMasks = Array.from(masks).filter((el) => !el.closest(".reveal"));
    if (orphanMasks.length) {
      const maskIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            maskIo.unobserve(entry.target);
          });
        },
        { rootMargin: "40px 0px", threshold: 0.05 }
      );
      orphanMasks.forEach((el) => maskIo.observe(el));
    }
  }

  function initParallax() {
    if (reduceMotion) return;
    const nodes = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!nodes.length) return;

    let ticking = false;

    function update() {
      const vh = window.innerHeight;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = (center - vh / 2) / vh;
        const y = Math.max(-12, Math.min(12, progress * -18));
        const portraitImg = node.querySelector(".portrait > img:first-child");
        if (portraitImg) {
          portraitImg.style.transform = `translate3d(0, ${y}px, 0) scale(1.04)`;
        }
      });
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLoadSequence();
    initScrollReveals();
    initParallax();
  });
})();
