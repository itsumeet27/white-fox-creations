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

  function initScrollReveals() {
    const reveals = document.querySelectorAll(".reveal");
    const masks = document.querySelectorAll(".project-image");

    masks.forEach((el) => el.classList.add("is-mask"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      masks.forEach((el) => el.classList.add("is-revealed"));
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    reveals.forEach((el) => io.observe(el));

    const maskIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          maskIo.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    masks.forEach((el) => maskIo.observe(el));
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
        const media = node.querySelector("img, .hero-visual__media");
        if (media && !media.classList.contains("hero-visual__media")) {
          media.style.transform = `translate3d(0, ${y}px, 0)`;
        } else if (node.classList.contains("experience__portrait") || node.querySelector(".portrait")) {
          const img = node.querySelector(".portrait > img:first-child");
          if (img) img.style.transform = `translate3d(0, ${y}px, 0) scale(1.04)`;
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
