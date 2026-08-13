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

  /* Approach question cards — highlight on hover / focus / scroll */
  function initQuestions() {
    const questions = Array.from(document.querySelectorAll(".question"));
    if (!questions.length) return;

    const setActive = (active) => {
      const activeIdx = questions.indexOf(active);
      questions.forEach((q, idx) => {
        q.classList.toggle("is-active", q === active);
        q.classList.toggle("is-passed", idx < activeIdx);
      });
    };

    questions.forEach((q) => {
      q.addEventListener("mouseenter", () => setActive(q));
      q.addEventListener("focus", () => setActive(q));
      q.addEventListener("click", () => setActive(q));
    });

    if (reduce || !("IntersectionObserver" in window)) {
      setActive(questions[0]);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        setActive(visible[0].target);
      },
      { threshold: [0.4, 0.65], rootMargin: "-18% 0px -28% 0px" }
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

  document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    initReveals();
    initQuestions();
    initCursor();
  });
})();
