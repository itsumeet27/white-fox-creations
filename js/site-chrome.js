/**
 * Shared header/footer loader and chrome behavior.
 * Edit partials/header.html and partials/footer.html — every page picks them up.
 */
(function () {
  const script = document.querySelector("script[src*='site-chrome.js']");
  const root = script ? new URL("../", script.src) : new URL("./", window.location.href);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function asset(path) {
    return new URL(path, root).href;
  }

  function initHeader(header) {
    if (!header) return;
    const links = header.querySelector("#nav-links");
    const toggle = header.querySelector(".nav__menu-toggle");
    const page = document.body.dataset.page || "";

    header.querySelectorAll("[data-nav]").forEach((a) => {
      const on = a.getAttribute("data-nav") === page;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      if (!links || !toggle) return;
      links.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    if (toggle) {
      toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
    }
    if (links) {
      links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links && links.classList.contains("is-open")) setMenu(false);
    });

    const dotBtn = header.querySelector(".nav__dot-btn");
    if (dotBtn) {
      dotBtn.addEventListener("click", () => dotBtn.classList.toggle("is-active"));
    }
  }

  function initHomeHashNav(header) {
    if (!header || document.body.dataset.page !== "home") return;
    if (!("IntersectionObserver" in window)) return;

    const homeLink = header.querySelector("[data-nav='home']");
    const watched = [
      document.getElementById("experience"),
      document.getElementById("contact")
    ].filter(Boolean);

    if (!watched.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).pop();
        if (!visible) {
          if (homeLink) {
            header.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("is-active", a === homeLink));
          }
          return;
        }
        header.querySelectorAll("[data-nav]").forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("data-nav") === visible.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    watched.forEach((el) => io.observe(el));
  }

  function initFooter(rootEl) {
    if (!rootEl) return;
    rootEl.querySelectorAll('a[href="#top"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        if (reduce) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    rootEl.querySelectorAll("textPath[href^='#']").forEach((el) => {
      const id = el.getAttribute("href");
      const abs = `${window.location.pathname}${id}`;
      el.setAttribute("href", abs);
      el.setAttribute("xlink:href", abs);
    });
    rootEl.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  async function inject() {
    const headerHost = document.querySelector("[data-site-header]");
    const footerHost = document.querySelector("[data-site-footer]");
    const jobs = [];

    if (headerHost) {
      jobs.push(
        fetch(asset("partials/header.html"))
          .then((r) => {
            if (!r.ok) throw new Error("header partial");
            return r.text();
          })
          .then((html) => {
            headerHost.innerHTML = html;
            initHeader(headerHost);
          })
      );
    }
    if (footerHost) {
      jobs.push(
        fetch(asset("partials/footer.html"))
          .then((r) => {
            if (!r.ok) throw new Error("footer partial");
            return r.text();
          })
          .then((html) => {
            footerHost.innerHTML = html;
            initFooter(footerHost);
          })
      );
    }

    await Promise.all(jobs);
    initHomeHashNav(headerHost);
    document.body.classList.add("site-chrome-ready");
    document.dispatchEvent(new CustomEvent("site-chrome-ready"));
  }

  inject().catch(() => {
    document.dispatchEvent(new CustomEvent("site-chrome-ready"));
  });
})();
