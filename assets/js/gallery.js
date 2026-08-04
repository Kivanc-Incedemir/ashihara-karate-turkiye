/* =========================================================================
   gallery.js — loads photos/manifest.json, renders masonry grid,
   category filtering, and an accessible lightbox.

   manifest.json shape:
   { "photos": [
       { "file": "01.jpg", "category": "training", "tr": "Başlık", "en": "Caption" }
   ]}
   Categories: training | grading | event  (anything else -> shown under "All")
   ========================================================================= */
/* exposed on window so client-side nav (assets/js/nav.js) can re-run this
   after swapping in a freshly-fetched gallery.html <main> */
function initGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector(".lightbox__cap");

  let photos = [];
  let view = []; // currently filtered list
  let current = 0;

  const cap = (p) => (window.AK_I18N?.lang === "en" ? p.en : p.tr) || p.tr || p.en || "";
  // manifest "file" is normally a bare filename, but the CMS's image picker may
  // store it as "photos/name.jpg" or "/photos/name.jpg" — normalize either way.
  const src = (p) => "photos/" + String(p.file).replace(/^\/?(photos\/)?/, "");

  function render(list) {
    view = list;
    grid.innerHTML = "";
    list.forEach((p, i) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item";
      fig.tabIndex = 0;
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", cap(p));

      const img = document.createElement("img");
      img.src = src(p);
      img.alt = cap(p);
      img.loading = "lazy";

      const c = document.createElement("figcaption");
      c.className = "gallery-item__cap";
      c.dataset.capIndex = i;
      c.textContent = cap(p);

      fig.append(img, c);
      fig.addEventListener("click", () => open(i));
      fig.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
      grid.appendChild(fig);

      requestAnimationFrame(() => setTimeout(() => fig.classList.add("is-in"), i * 45));
    });
  }

  function filter(cat) {
    render(cat === "all" ? photos : photos.filter((p) => p.category === cat));
  }

  /* ---- lightbox ---- */
  function open(i) {
    current = i;
    show();
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function close() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function show() {
    const p = view[current];
    if (!p) return;
    lbImg.src = src(p);
    lbImg.alt = cap(p);
    lbCap.textContent = cap(p);
  }
  const step = (d) => { current = (current + d + view.length) % view.length; show(); };

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => step(-1));
  lb.querySelector(".lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  /* ---- filters ---- */
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      filter(btn.dataset.filter);
    });
  });

  /* ---- re-caption on language change ---- */
  document.addEventListener("langchange", () => {
    grid.querySelectorAll(".gallery-item__cap").forEach((c) => {
      const p = view[+c.dataset.capIndex];
      if (p) {
        c.textContent = cap(p);
        c.previousElementSibling.alt = cap(p);
      }
    });
    if (lb.classList.contains("is-open")) show();
  });

  /* ---- load ---- */
  fetch("photos/manifest.json", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : { photos: [] }))
    .then((data) => {
      photos = Array.isArray(data.photos) ? data.photos : [];
      if (!photos.length) {
        document.getElementById("gallery-empty")?.removeAttribute("hidden");
        document.querySelector(".gallery-filters")?.setAttribute("hidden", "");
        return;
      }
      filter("all");
    })
    .catch(() => {
      document.getElementById("gallery-empty")?.removeAttribute("hidden");
    });
}

window.AK_initGallery = initGallery;
initGallery();
