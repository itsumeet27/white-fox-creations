/**
 * Gallery filters + sort
 */
(function () {
  function getState() {
    return window.GalleryState || { filter: "all", sort: "latest", items: [] };
  }

  function sortItems(items, mode) {
    const list = items.slice();
    switch (mode) {
      case "oldest":
        return list.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
      case "az":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      case "latest":
      default:
        return list.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    }
  }

  function filterItems(items, slug) {
    if (!slug || slug === "all") return items.slice();
    return items.filter((item) => item.slug === slug);
  }

  window.GalleryFilters = {
    apply(filter, sort) {
      const state = getState();
      state.filter = filter;
      state.sort = sort;
      const filtered = filterItems(window.GALLERY_ARTWORKS || [], filter);
      state.visible = sortItems(filtered, sort);
      if (typeof state.onChange === "function") state.onChange(state.visible);
      return state.visible;
    },
    bind() {
      const filterBar = document.querySelector(".gallery-filters");
      const sortSelect = document.querySelector("#gallery-sort");
      if (!filterBar || !sortSelect) return;

      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-filter]");
        if (!btn) return;
        filterBar.querySelectorAll("button").forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        this.apply(btn.dataset.filter, sortSelect.value);
      });

      sortSelect.addEventListener("change", () => {
        const active = filterBar.querySelector("button.is-active");
        this.apply(active ? active.dataset.filter : "all", sortSelect.value);
      });
    }
  };
})();
