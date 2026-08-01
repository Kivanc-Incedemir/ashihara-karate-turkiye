/* =========================================================================
   nav.js — lightweight same-document navigation between this site's own
   pages. Swaps <main> via fetch() instead of a full page reload, so the
   language-guard (the head <style>/<script> pair that hides the page until
   the saved language is applied) never has to replay on internal nav —
   it only ever runs once, on the very first real page load per session.
   Falls back to a normal navigation for anything it can't handle cleanly.
   ========================================================================= */
(function () {
  const PAGES = ["index.html", "about.html", "gallery.html", "dojos.html", "dunya-tarihcesi.html", "turkiye-tarihcesi.html"];

  function fileName(pathname) {
    return pathname.split("/").pop() || "index.html";
  }

  function isInternalNavClick(e) {
    if (e.defaultPrevented || e.button !== 0) return null;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
    const a = e.target.closest("a");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return null;
    if (a.origin !== location.origin) return null;
    if (!PAGES.includes(fileName(a.pathname))) return null;
    return a;
  }

  async function loadPage(url, push) {
    let html;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("bad status " + res.status);
      html = await res.text();
    } catch (e) {
      location.href = url; // network hiccup or non-existent page — just navigate for real
      return;
    }

    const doc = new DOMParser().parseFromString(html, "text/html");
    const newMain = doc.querySelector("main");
    const curMain = document.querySelector("main");
    if (!newMain || !curMain) { location.href = url; return; }

    curMain.replaceWith(newMain);

    document.title = doc.title;
    const newDesc = doc.querySelector('meta[name="description"]');
    const curDesc = document.querySelector('meta[name="description"]');
    if (newDesc && curDesc) curDesc.setAttribute("content", newDesc.getAttribute("content") || "");

    document.body.setAttribute("data-title-key", doc.body.getAttribute("data-title-key") || "");

    const path = fileName(new URL(url, location.href).pathname);
    document.querySelectorAll(".nav-links a").forEach((a) => {
      if (fileName(new URL(a.getAttribute("href"), location.href).pathname) === path) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });

    if (push) history.pushState({ akNav: true }, "", url);
    window.scrollTo(0, 0);

    // re-apply the already-selected language to the freshly injected markup —
    // synchronous, in-memory, no reload, so there is nothing to flash
    if (window.AK_I18N) window.AK_I18N.applyLang(window.AK_I18N.lang);
    window.AK_MAIN && window.AK_MAIN.initReveal();
    window.AK_initGallery && window.AK_initGallery();
  }

  document.addEventListener("click", (e) => {
    const a = isInternalNavClick(e);
    if (!a) return;
    if (fileName(a.pathname) === fileName(location.pathname)) return; // already on this page
    e.preventDefault();
    loadPage(a.href, true);
  });

  window.addEventListener("popstate", () => loadPage(location.href, false));
})();
