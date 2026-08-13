/**
 * Main interactions — nav, showreel modal, active sections
 */
(function () {
  const header = document.querySelector(".site-header");
  const navLinks = document.getElementById("nav-links");
  const menuToggle = document.querySelector(".nav__menu-toggle");
  const sectionIds = ["work", "about", "gallery", "experience", "contact"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  /* Sticky header backdrop */
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* Mobile menu */
  function setMenu(open) {
    if (!navLinks || !menuToggle) return;
    navLinks.classList.toggle("is-open", open);
    menuToggle.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      setMenu(!navLinks.classList.contains("is-open"));
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  /* Active nav indicator via IntersectionObserver */
  if ("IntersectionObserver" in window && sections.length) {
    const linkMap = new Map();
    document.querySelectorAll(".nav__links a[data-section]").forEach((a) => {
      linkMap.set(a.dataset.section, a);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          linkMap.forEach((link, key) => {
            link.classList.toggle("is-active", key === id || (id === "gallery" && key === "gallery"));
          });
          // About and gallery share proximity — prefer exact match
          if (id === "about") {
            linkMap.forEach((link, key) => link.classList.toggle("is-active", key === "about"));
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
  }

  /* Showreel modal */
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

  /* Dot button micro-interaction */
  const dotBtn = document.querySelector(".nav__dot-btn");
  if (dotBtn) {
    dotBtn.addEventListener("click", () => {
      dotBtn.classList.toggle("is-active");
    });
  }

  /* Smooth back-to-top already via CSS; ensure focus return */
  document.querySelectorAll('a[href="#top"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
