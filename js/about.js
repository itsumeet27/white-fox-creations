/**
 * About page interactions
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Loader + header */
  function initIntro() {
    const loader = document.querySelector(".page-loader");
    const header = document.querySelector(".site-header");
    const delay = reduce ? 0 : 1000;
    window.setTimeout(() => {
      if (loader) loader.classList.add("is-done");
      if (header) header.classList.add("is-ready");
      document.querySelectorAll(".reveal-load").forEach((el) => el.classList.add("is-in"));
    }, delay);
  }

  /* Sticky header */
  function initHeader() {
    const header = document.querySelector(".site-header");
    const links = document.getElementById("nav-links");
    const toggle = document.querySelector(".nav__menu-toggle");
    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = !links.classList.contains("is-open");
        links.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.querySelector("span").textContent = open ? "Close" : "Menu";
      });
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          links.classList.remove("is-open");
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.querySelector("span").textContent = "Menu";
        })
      );
    }
  }

  /* Scroll reveals */
  function initReveals() {
    const nodes = document.querySelectorAll(".reveal, .precision");
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
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
    nodes.forEach((n) => io.observe(n));
  }

  /* Question storytelling */
  function initQuestions() {
    const questions = Array.from(document.querySelectorAll(".question"));
    if (!questions.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      questions.forEach((q, i) => {
        q.classList.toggle("is-active", i === questions.length - 1);
        q.classList.toggle("is-passed", i < questions.length - 1);
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const active = entry.target;
          questions.forEach((q) => {
            const idx = questions.indexOf(q);
            const activeIdx = questions.indexOf(active);
            q.classList.toggle("is-active", q === active);
            q.classList.toggle("is-passed", idx < activeIdx);
          });
        });
      },
      { threshold: 0.7, rootMargin: "-20% 0px -35% 0px" }
    );
    questions.forEach((q) => io.observe(q));
  }

  /* Cursor */
  function initCursor() {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || reduce) return;
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;
    const label = cursor.querySelector(".cursor__label");
    document.body.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    document.addEventListener(
      "mousemove",
      (e) => {
        x = e.clientX;
        y = e.clientY;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursor.classList.add("is-active");
      },
      { passive: true }
    );
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest("[data-cursor]");
      cursor.classList.remove("is-button", "is-view", "is-explore", "is-next");
      if (!t) return;
      const mode = t.getAttribute("data-cursor");
      cursor.classList.add(`is-${mode}`);
      if (label) {
        if (mode === "view") label.textContent = "VIEW";
        if (mode === "explore") label.textContent = "EXPLORE";
        if (mode === "next") label.textContent = "NEXT";
      }
    });
    document.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  }

  /* Back to top */
  function initTop() {
    document.querySelectorAll('a[href="#top"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        if (reduce) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    initHeader();
    initReveals();
    initQuestions();
    initCursor();
    initTop();
  });
})();
