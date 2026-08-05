/* =========================================================================
   i18n — Turkish (default) / English toggle.
   Usage in HTML:
     <span data-i18n="key">fallback</span>            -> textContent
     <input data-i18n-attr="placeholder:key">          -> attribute
     <div data-i18n-html="key">                         -> innerHTML (allows markup)
   Preference persists in localStorage("ak-lang").
   Dictionaries live in assets/i18n/sections/*.json (one file per page, each
   holding both tr/en text side by side) so they can be edited through the
   CMS (admin/) without touching code.
   ========================================================================= */

const DICTS = { tr: {}, en: {} };

const I18N_SECTIONS = [
  "global",
  "home",
  "about",
  "gallery",
  "dojos",
  "world-history",
  "turkey-history",
];

function applyLang(lang) {
  const dict = DICTS[lang] || DICTS.tr;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-html")];
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.getAttribute("data-i18n-attr").split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      const v = dict[key];
      if (v != null) el.setAttribute(attr, v);
    });
  });

  const titleKey = document.body.getAttribute("data-title-key");
  if (titleKey && dict[titleKey]) {
    document.title = dict[titleKey] + " · Ashihara Karate Türkiye";
  }

  document.querySelectorAll(".lang-toggle button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  });

  // let other scripts (e.g. gallery captions) react
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

function readLang() {
  try {
    const l = localStorage.getItem("ak-lang");
    if (l === "tr" || l === "en") return l;
  } catch (e) { /* storage blocked (e.g. file://, private mode) */ }
  return "tr";
}

function reveal() {
  // undo the pre-paint hide guard set in the <head> inline script
  document.documentElement.classList.remove("i18n-hide");
}

// each section file shape: { "strings": [{ "key": "nav.home", "tr": "...", "en": "..." }, ...] }
// (a list, not a plain object, so it's editable with Decap CMS's built-in "list" widget)
async function loadDicts() {
  const sections = await Promise.all(
    I18N_SECTIONS.map((name) =>
      fetch(`assets/i18n/sections/${name}.json`, { cache: "no-store" }).then((r) =>
        r.ok ? r.json() : { strings: [] },
      ),
    ),
  );
  const all = sections.flatMap((s) => s.strings || []);
  DICTS.tr = Object.fromEntries(all.map((e) => [e.key, e.tr]));
  DICTS.en = Object.fromEntries(all.map((e) => [e.key, e.en]));
}

async function initI18n() {
  try {
    await loadDicts();
  } catch (e) { /* fall back to the static TR markup already in the page */ }

  applyLang(readLang());
  reveal();

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.lang;
      applyLang(next); // apply first — visible switch never depends on storage
      try { localStorage.setItem("ak-lang", next); } catch (e) { /* ignore */ }
    });
  });
}

// safety net: never leave content hidden if something goes wrong
window.addEventListener("load", reveal);
setTimeout(reveal, 600);

window.AK_I18N = { applyLang, get lang() { return document.documentElement.lang || "tr"; } };

if (document.readyState !== "loading") initI18n();
else document.addEventListener("DOMContentLoaded", initI18n);
