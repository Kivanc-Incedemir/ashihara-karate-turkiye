/* =========================================================================
   main.js — header scroll state, mobile nav, scroll-reveal.
   ========================================================================= */
(function () {
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // scroll reveal — re-invokable so client-side nav (assets/js/nav.js) can
  // wire up freshly-injected .reveal elements after swapping in a new page
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function initReveal() {
    const items = document.querySelectorAll(".reveal:not(.is-in)");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
  }
  initReveal();

  window.AK_MAIN = { initReveal };
})();
