/**
 * Custom cursor for gallery page — desktop only
 */
(function () {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!fine.matches || reduce.matches) return;

  const cursor = document.querySelector(".cursor");
  if (!cursor) return;
  document.body.classList.add("has-custom-cursor");

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  function onMove(e) {
    x = e.clientX;
    y = e.clientY;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursor.classList.add("is-active");
  }

  function onOver(e) {
    const target = e.target.closest("[data-cursor]");
    cursor.classList.remove("is-view", "is-button");
    if (!target) return;
    const mode = target.getAttribute("data-cursor");
    if (mode === "view") cursor.classList.add("is-view");
    if (mode === "button") cursor.classList.add("is-button");
  }

  document.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseover", onOver);
  document.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
})();
