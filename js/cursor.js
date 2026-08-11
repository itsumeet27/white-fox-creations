/**
 * Custom cursor — desktop only
 */
(function () {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!finePointer.matches || reduceMotion.matches) return;

  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  const ring = cursor.querySelector(".cursor__ring");
  document.body.classList.add("has-custom-cursor");

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;
  let raf = 0;

  function render() {
    rx += (x - rx) * 0.22;
    ry += (y - ry) * 0.22;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (ring) {
      ring.style.transform = `translate(calc(-50% + ${rx - x}px), calc(-50% + ${ry - y}px))`;
    }
    raf = requestAnimationFrame(render);
  }

  function onMove(e) {
    x = e.clientX;
    y = e.clientY;
    cursor.classList.add("is-active");
  }

  function clearModes() {
    cursor.classList.remove("is-project", "is-button", "is-image");
  }

  function onOver(e) {
    const target = e.target.closest("[data-cursor]");
    clearModes();
    if (!target) return;
    const mode = target.getAttribute("data-cursor");
    if (mode === "project") cursor.classList.add("is-project");
    if (mode === "button") cursor.classList.add("is-button");
    if (mode === "image") cursor.classList.add("is-image");
  }

  document.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseover", onOver);
  document.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  raf = requestAnimationFrame(render);

  finePointer.addEventListener("change", (e) => {
    if (!e.matches) {
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
    }
  });
})();
