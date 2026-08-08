/* =========================================================================
   admin.js — custom content-management app for Ashihara Karate Türkiye.
   Talks to GitHub directly (via gh-client.js) — no local backend, no build
   step, no framework. Every save is a real commit on the "master" branch.
   ========================================================================= */
(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // Static config — mirrors what used to live in admin/config.yml
  // ---------------------------------------------------------------------
  const TEXT_GROUPS = [
    {
      key: "global",
      path: "assets/i18n/sections/global.json",
      page: "../index.html",
      label: { tr: "Genel (Menü, Üst Bilgi, Alt Bilgi)", en: "Global (Menu, Header, Footer)" },
      desc: {
        tr: "Menüde, sayfa üstündeki logoda ve tüm sayfaların alt bilgisinde (footer) görünen, her sayfada ortak olan metinler.",
        en: "Text shared by every page — the menu, the header logo, and the footer.",
      },
    },
    {
      key: "home",
      path: "assets/i18n/sections/home.json",
      page: "../index.html",
      label: { tr: "Ana Sayfa", en: "Home" },
      desc: { tr: "Sadece Ana Sayfa'da görünen başlık, buton ve bölüm metinleri.", en: "Titles, buttons, and section text shown only on the Home page." },
    },
    {
      key: "about",
      path: "assets/i18n/sections/about.json",
      page: "../about.html",
      label: { tr: "Ashihara Hakkında", en: "About Ashihara" },
      desc: { tr: "Ashihara Hakkında sayfasındaki tüm metinler.", en: "All text on the About Ashihara page." },
    },
    {
      key: "gallery_page",
      path: "assets/i18n/sections/gallery.json",
      page: "../gallery.html",
      label: { tr: "Galeri Sayfası Metinleri", en: "Gallery Page Text" },
      desc: {
        tr: "Galeri & Video sayfasındaki başlık ve filtre metinleri. Fotoğrafların kendisini eklemek için soldaki \"Galeri Fotoğrafları\" bölümünü kullanın.",
        en: "Titles and filter labels on the Gallery & Video page. To add photos themselves, use \"Gallery Photos\" instead.",
      },
    },
    {
      key: "dojos",
      path: "assets/i18n/sections/dojos.json",
      page: "../dojos.html",
      label: { tr: "Dojolar & İletişim", en: "Dojos & Contact" },
      desc: { tr: "Dojolar & İletişim sayfasındaki adres, program ve iletişim formu metinleri.", en: "Address, schedule, and contact-form text on the Dojos & Contact page." },
    },
    {
      key: "world_history",
      path: "assets/i18n/sections/world-history.json",
      page: "../dunya-tarihcesi.html",
      label: { tr: "Dünya Tarihçesi", en: "World History" },
      desc: { tr: "Dünya Tarihçesi sayfasındaki tüm metinler.", en: "All text on the World History page." },
    },
    {
      key: "turkey_history",
      path: "assets/i18n/sections/turkey-history.json",
      page: "../turkiye-tarihcesi.html",
      label: { tr: "Türkiye Tarihçesi", en: "Turkey History" },
      desc: { tr: "Türkiye Tarihçesi sayfasındaki tüm metinler.", en: "All text on the Turkey History page." },
    },
  ];

  const PHOTO_SLOTS_META = [
    { key: "home.teaser", label: { tr: "Ana Sayfa — Ashihara Kaikan Tanıtımı", en: "Home — Ashihara Kaikan Teaser" } },
    { key: "about.origin", label: { tr: "Hakkında — Sabaki Felsefesi", en: "About — Sabaki Philosophy" } },
    { key: "dojo.card", label: { tr: "Dojolar — Ümraniye Dojo Kartı", en: "Dojos — Ümraniye Dojo Card" } },
    { key: "whist.origin", label: { tr: "Dünya Tarihçesi — Kökler", en: "World History — Origin" } },
    { key: "whist.founding", label: { tr: "Dünya Tarihçesi — Kuruluş", en: "World History — Founding" } },
    { key: "whist.spread", label: { tr: "Dünya Tarihçesi — Yayılma", en: "World History — Spread" } },
    { key: "whist.succession", label: { tr: "Dünya Tarihçesi — Miras", en: "World History — Succession" } },
    { key: "thist.sensei", label: { tr: "Türkiye Tarihçesi — Baş Antrenör", en: "Turkey History — Head Instructor" } },
    { key: "thist.founding", label: { tr: "Türkiye Tarihçesi — Kuruluş", en: "Turkey History — Founding" } },
  ];

  const CATEGORY_LABELS = {
    training: { tr: "Antrenman", en: "Training" },
    grading: { tr: "Kuşak Sınavı", en: "Grading" },
    event: { tr: "Etkinlik", en: "Event" },
  };

  const STR = {
    heroEyebrow: { tr: "Sabaki · İçerik Yönetimi", en: "Sabaki · Content Management" },
    heroTitle: { tr: "Kuvveti Yönlendir. İçeriği Yönet.", en: "Redirect the Force. Manage the Content." },
    loginEyebrow: { tr: "İçerik Yönetimi", en: "Content Management" },
    loginTitle: { tr: "Giriş Yap", en: "Sign In" },
    loginSub: { tr: "Bu panele erişim için bu deponun collaborator'ı olmanız gerekir.", en: "You must be a collaborator on this repository to access this panel." },
    loginBtn: { tr: "GitHub ile Giriş Yap", en: "Sign in with GitHub" },
    loginNote: { tr: "GitHub hesabınızla devam edin.", en: "Continue with your GitHub account." },
    loggedInLabel: { tr: "GitHub Kullanıcısı", en: "GitHub Collaborator" },
    navOverview: { tr: "Genel Bakış", en: "Overview" },
    navText: { tr: "Site Metinleri", en: "Site Text" },
    navGallery: { tr: "Galeri Fotoğrafları", en: "Gallery Photos" },
    navPhotos: { tr: "Sayfa Görselleri", en: "Page Photos" },
    navStats: { tr: "İstatistikler", en: "Stats" },
    viewSite: { tr: "Siteyi Görüntüle", en: "View Site" },
    logoutLabel: { tr: "Çıkış Yap", en: "Log Out" },
    overviewTitle: { tr: "Genel Bakış", en: "Overview" },
    overviewSub: { tr: "Sitenin içerik durumuna hızlı bir bakış.", en: "A quick look at the site's content status." },
    statPhotosLabel: { tr: "Galeri Fotoğrafı", en: "Gallery Photos" },
    statGroupsLabel: { tr: "Metin Grubu", en: "Text Groups" },
    statSlotsLabel: { tr: "Sayfa Görseli", en: "Page Photos" },
    actTextTitle: { tr: "Site Metinlerini Düzenle", en: "Edit Site Text" },
    actTextDesc: { tr: "Menü, ana sayfa, tarihçe ve daha fazlası.", en: "Menu, homepage, history pages, and more." },
    actGalleryTitle: { tr: "Fotoğraf Ekle", en: "Add a Photo" },
    actGalleryDesc: { tr: "Galeriye yeni fotoğraf yükle veya düzenle.", en: "Upload or edit a gallery photo." },
    actPhotosTitle: { tr: "Sayfa Görsellerini Değiştir", en: "Replace Page Photos" },
    actPhotosDesc: { tr: "Ana sayfa, hakkında ve tarihçe sayfalarındaki sabit fotoğraflar.", en: "The fixed hero/section photos on Home, About, and History pages." },
    actStatsTitle: { tr: "Ziyaret İstatistikleri", en: "Visit Statistics" },
    actStatsDesc: { tr: "Cloudflare Web Analytics panelini aç.", en: "Open the Cloudflare Web Analytics dashboard." },
    repoTitle: { tr: "Depo", en: "Repository" },
    repoDesc: { tr: "Bütün değişiklikler doğrudan GitHub deposuna kaydedilir. Geçmiş commit'leri ve dosyaları burada görebilirsiniz.", en: "Every change is committed straight to the GitHub repository. Browse past commits and files here." },
    repoLink: { tr: "GitHub'da Aç ↗", en: "Open on GitHub ↗" },
    teamTitle: { tr: "Ekip Erişimi", en: "Team Access" },
    teamOwnerLabel: { tr: "Yönetici", en: "Owner" },
    teamNote: {
      tr: "Ziya Özkan (Yönetici) collaborator ekleyip rol atayabilir. Bir antrenörü \"Write\" rolüyle davet edin — içerik düzenleyebilir ama başka collaborator ekleyemez veya ayarları değiştiremez.",
      en: "Ziya Özkan (Owner) can add collaborators and assign roles. Invite an instructor with the \"Write\" role — they can edit content but can't add collaborators or change settings.",
    },
    rowsNote: { tr: "Satır eklenemez veya silinemez — sadece mevcut metinleri düzenleyebilirsiniz.", en: "Rows can't be added or removed — you can only edit the existing text." },
    previewHint: { tr: "Metne tıklayıp doğrudan sayfa üzerinde düzenleyin.", en: "Click any text to edit it right on the page." },
    modePreviewLabel: { tr: "Önizleme", en: "Preview" },
    modeListLabel: { tr: "Liste", en: "List" },
    saveLabel: { tr: "Kaydet", en: "Save" },
    savingLabel: { tr: "Kaydediliyor…", en: "Saving…" },
    savedToast: { tr: "Kaydedildi ✓", en: "Saved ✓" },
    colKey: { tr: "Anahtar", en: "Key" },
    colTr: { tr: "Türkçe", en: "Turkish" },
    colEn: { tr: "İngilizce", en: "English" },
    addPhotoLabel: { tr: "+ Fotoğraf Ekle", en: "+ Add Photo" },
    galleryDesc: { tr: "Kategori ve başlıkları düzenleyin, yeni fotoğraf ekleyin.", en: "Edit categories and captions, or add a new photo." },
    noPhotoLabel: { tr: "Fotoğraf yok", en: "No photo" },
    photosTitle: { tr: "Sayfa Görselleri", en: "Page Photos" },
    photosSub: {
      tr: "Sitedeki sayfalarda sabit olarak görünen fotoğraflar. Değiştirmek istediğiniz görselin altındaki düğmeye tıklayın.",
      en: "The photos that appear fixed in place on the site's pages. Click the button under a photo to replace it.",
    },
    replacePhotoLabel: { tr: "Fotoğrafı Değiştir", en: "Replace Photo" },
    statsSub: { tr: "Ziyaretçi istatistikleri site dışında, Cloudflare panelinde tutulur.", en: "Visitor stats are kept off-site, in the Cloudflare dashboard." },
    statsCardDesc: { tr: "Sadece toplu ziyaret ve sayfa görüntüleme sayıları — hiçbir ziyaretçi kişisel olarak izlenmez.", en: "Aggregate visit and pageview counts only — no individual visitor is ever tracked." },
    statsBtn: { tr: "Panele Git ↗", en: "Open Dashboard ↗" },
    waLabel: { tr: "WhatsApp Bağlantısı — sayfada görünmez, düğmelerin arkasındaki adrestir", en: "WhatsApp Link — invisible on the page, it's the address behind the buttons" },
    waTr: { tr: "Türkçe", en: "Turkish" },
    waEn: { tr: "İngilizce", en: "English" },
    loading: { tr: "Yükleniyor…", en: "Loading…" },
    loadError: { tr: "Yüklenirken bir hata oluştu.", en: "Something went wrong while loading." },
    guardWaOk: { tr: "✓ Bağlantı geçerli görünüyor", en: "✓ Link looks valid" },
    guardWaBad: { tr: "⚠️ https://wa.me/ ile başlamalı", en: "⚠️ Must start with https://wa.me/" },
    guardHtmlOk: { tr: "✓ <code> vurgusu korunmuş", en: "✓ <code> highlight preserved" },
    guardHtmlBad: { tr: "⚠️ <code>photos/</code> vurgusu eksik veya bozuk", en: "⚠️ <code>photos/</code> highlight missing or broken" },
    confirmSaveAnyway: { tr: "Yine de kaydetmek istiyor musunuz?", en: "Save anyway?" },
    iframeError: { tr: "Sayfa önizlemesi yüklenemedi.", en: "Couldn't load the page preview." },
  };

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------
  const state = {
    screen: "login",
    loginError: null,
    lang: "tr",
    section: "overview",
    activeText: "global",
    viewMode: "preview",
    textExpanded: true,
    user: null,
    text: {}, // key -> { items, sha, loaded, loading }
    gallery: { items: null, sha: null, loaded: false, loading: false },
    photos: { items: null, sha: null, loaded: false, loading: false },
    toast: null,
  };

  let toastTimer = null;
  let previewCtx = null; // { doc, groupKey }

  function L(dict) { return dict[state.lang] || dict.tr; }

  function setToast(msg) {
    state.toast = msg;
    renderToast();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { state.toast = null; renderToast(); }, 2400);
  }

  function renderToast() {
    let el = document.getElementById("toast");
    if (state.toast) {
      if (!el) {
        el = document.createElement("div");
        el.id = "toast";
        el.className = "toast";
        document.body.appendChild(el);
      }
      el.textContent = state.toast;
    } else if (el) {
      el.remove();
    }
  }

  // ---------------------------------------------------------------------
  // Content guardrails — ported from the previous Decap-based admin
  // ---------------------------------------------------------------------
  function guardFor(item) {
    if (item.key === "whatsapp.href") {
      const ok = /^https:\/\/wa\.me\//.test(item.tr || "") && /^https:\/\/wa\.me\//.test(item.en || "");
      return { show: true, ok, msg: L(ok ? STR.guardWaOk : STR.guardWaBad) };
    }
    if (item.key === "gal.empty.body") {
      const ok = /<code>[^<]*<\/code>/.test(item.tr || "") && /<code>[^<]*<\/code>/.test(item.en || "");
      return { show: true, ok, msg: L(ok ? STR.guardHtmlOk : STR.guardHtmlBad) };
    }
    return { show: false, ok: true, msg: "" };
  }

  function collectProblems(items) {
    const problems = [];
    items.forEach((item) => {
      const g = guardFor(item);
      if (g.show && !g.ok) problems.push(`${item.key}: ${g.msg}`);
    });
    return problems;
  }

  // ---------------------------------------------------------------------
  // Auth
  // ---------------------------------------------------------------------
  async function boot() {
    if (window.AK_GH.hasToken()) {
      state.screen = "app";
      render();
      loadUser();
    } else {
      render();
    }
  }

  async function doLogin() {
    state.loginError = null;
    try {
      await window.AK_GH.authenticate();
      state.screen = "app";
      render();
      loadUser();
    } catch (e) {
      state.loginError = e.message || String(e);
      render();
    }
  }

  function doLogout() {
    window.AK_GH.logout();
    state.screen = "login";
    state.user = null;
    render();
  }

  async function loadUser() {
    try {
      state.user = await window.AK_GH.getUser();
      render();
    } catch (e) { /* non-fatal — sidebar just keeps the generic label */ }
  }

  // ---------------------------------------------------------------------
  // Data loading (lazy, cached in state)
  // ---------------------------------------------------------------------
  async function ensureTextGroupLoaded(key) {
    if (state.text[key] && (state.text[key].loaded || state.text[key].loading)) return;
    const group = TEXT_GROUPS.find((g) => g.key === key);
    state.text[key] = { items: [], sha: null, loaded: false, loading: true };
    try {
      const { data, sha } = await window.AK_GH.getJson(group.path);
      state.text[key] = { items: (data && data.strings) || [], sha, loaded: true, loading: false };
    } catch (e) {
      state.text[key] = { items: [], sha: null, loaded: true, loading: false, error: e.message };
    }
    // avoid tearing down an unrelated, already-mounted preview iframe if the
    // admin switched away from this group while the fetch was in flight
    if (state.section === "text" && state.activeText === key) render();
  }

  async function ensureGalleryLoaded() {
    if (state.gallery.loaded || state.gallery.loading) return;
    state.gallery.loading = true;
    try {
      const { data, sha } = await window.AK_GH.getJson("photos/manifest.json");
      state.gallery = { items: (data && data.photos) || [], sha, loaded: true, loading: false };
    } catch (e) {
      state.gallery = { items: [], sha: null, loaded: true, loading: false, error: e.message };
    }
    if (state.section === "overview" || state.section === "gallery") render();
  }

  async function ensurePhotosLoaded() {
    if (state.photos.loaded || state.photos.loading) return;
    state.photos.loading = true;
    try {
      const { data, sha } = await window.AK_GH.getJson("assets/photo-slots.json");
      state.photos = { items: (data && data.slots) || [], sha, loaded: true, loading: false };
    } catch (e) {
      state.photos = { items: [], sha: null, loaded: true, loading: false, error: e.message };
    }
    if (state.section === "overview" || state.section === "photos") render();
  }

  // ---------------------------------------------------------------------
  // Save actions
  // ---------------------------------------------------------------------
  async function saveTextGroup(key) {
    const group = TEXT_GROUPS.find((g) => g.key === key);
    const entry = state.text[key];
    const problems = collectProblems(entry.items);
    if (problems.length) {
      const ok = window.confirm(
        (state.lang === "tr" ? "Dikkat, bu değişiklik bir şeyi bozabilir:\n\n- " : "Careful — this may break something:\n\n- ") +
          problems.join("\n- ") + "\n\n" + L(STR.confirmSaveAnyway)
      );
      if (!ok) return;
    }
    try {
      const res = await window.AK_GH.putJson(
        group.path,
        { strings: entry.items },
        entry.sha,
        `Site metni güncellendi: ${group.label.tr}`
      );
      entry.sha = res.content.sha;
      setToast(L(STR.savedToast));
    } catch (e) {
      window.alert(e.message);
    }
  }

  async function saveGallery() {
    try {
      const res = await window.AK_GH.putJson(
        "photos/manifest.json",
        { photos: state.gallery.items },
        state.gallery.sha,
        "Galeri fotoğrafları güncellendi"
      );
      state.gallery.sha = res.content.sha;
      setToast(L(STR.savedToast));
      render();
    } catch (e) {
      window.alert(e.message);
    }
  }

  async function uploadGalleryPhoto(file) {
    try {
      const path = "photos/" + file.name;
      const existing = await window.AK_GH.getFile(path);
      const b64 = await window.AK_GH.fileToBase64(file);
      await window.AK_GH.putImageFile(path, b64, existing && existing.sha, `Fotoğraf yüklendi: ${file.name}`);
      state.gallery.items.push({ file: file.name, category: "training", tr: "", en: "" });
      render();
    } catch (e) {
      window.alert(e.message);
    }
  }

  async function uploadHeroPhoto(slotKey, file) {
    try {
      const path = "photos/" + file.name;
      const existing = await window.AK_GH.getFile(path);
      const b64 = await window.AK_GH.fileToBase64(file);
      await window.AK_GH.putImageFile(path, b64, existing && existing.sha, `Sayfa görseli yüklendi: ${file.name}`);
      const slot = state.photos.items.find((s) => s.key === slotKey);
      if (slot) slot.file = file.name;
      const res = await window.AK_GH.putJson(
        "assets/photo-slots.json",
        { slots: state.photos.items },
        state.photos.sha,
        `Sayfa görseli değiştirildi: ${slotKey} → ${file.name}`
      );
      state.photos.sha = res.content.sha;
      setToast(L(STR.savedToast));
      render();
    } catch (e) {
      window.alert(e.message);
    }
  }

  // ---------------------------------------------------------------------
  // Preview iframe editor — click text on the real page, type directly.
  // Mechanics ported from the previous admin's PageTextEditor widget.
  // ---------------------------------------------------------------------
  const PAGE_EDITOR_STYLE =
    "[data-ak-key]{outline:none;border-radius:3px;transition:background .1s ease;}" +
    "[data-ak-key]:hover{background:rgba(201,162,75,.16);cursor:text;}" +
    "[data-ak-key]:focus{background:rgba(201,162,75,.22);box-shadow:0 0 0 2px #C9A24B inset;}" +
    "[data-ak-key]:empty:before{content:\"(boş — tıklayıp yazın)\";opacity:.45;font-style:italic;}";

  function setupPreviewIframe(iframe, groupKey) {
    iframe.addEventListener("load", () => {
      let doc;
      try {
        doc = iframe.contentDocument;
      } catch (e) {
        showIframeError(iframe);
        return;
      }
      if (!doc) { showIframeError(iframe); return; }

      function whenRevealed(attemptsLeft) {
        if (!doc.documentElement.classList.contains("i18n-hide") || attemptsLeft <= 0) {
          setupPage(doc, groupKey);
        } else {
          setTimeout(() => whenRevealed(attemptsLeft - 1), 50);
        }
      }
      whenRevealed(60);
    });
  }

  function showIframeError(iframe) {
    const note = document.createElement("p");
    note.className = "spinner-line";
    note.textContent = L(STR.iframeError);
    iframe.replaceWith(note);
  }

  function setupPage(doc, groupKey) {
    const style = doc.createElement("style");
    style.textContent = PAGE_EDITOR_STYLE;
    doc.head.appendChild(style);

    previewCtx = { doc, groupKey };
    bindEditableElements(doc, groupKey);
    applyDraftToPage(doc, groupKey, state.lang);

    doc.addEventListener("langchange", (e) => {
      if (state.lang !== e.detail.lang) {
        state.lang = e.detail.lang;
        render();
      }
    });
  }

  function bindEditableElements(doc, groupKey) {
    const items = state.text[groupKey].items;
    const owned = new Set(items.map((i) => i.key));
    doc.querySelectorAll("[data-i18n],[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
      if (!owned.has(key) || el.hasAttribute("data-ak-bound")) return;
      el.setAttribute("data-ak-bound", "1");
      el.setAttribute("data-ak-key", key);
      el.contentEditable = "true";
      el.addEventListener("keydown", (ev) => { if (ev.key === "Enter") ev.preventDefault(); });
      el.addEventListener("paste", (ev) => {
        ev.preventDefault();
        const text = (ev.clipboardData || doc.defaultView.clipboardData).getData("text/plain");
        doc.execCommand("insertText", false, text);
      });
      el.addEventListener("input", () => {
        const isHtml = el.hasAttribute("data-i18n-html");
        commitPreviewValue(groupKey, key, isHtml ? el.innerHTML : el.textContent, doc);
      });
    });
  }

  function commitPreviewValue(groupKey, key, newText, doc) {
    const items = state.text[groupKey].items;
    const it = items.find((i) => i.key === key);
    if (!it) return;
    it[state.lang] = newText;
    doc.querySelectorAll('[data-ak-key="' + key + '"]').forEach((el) => {
      if (doc.activeElement === el) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = newText;
      else el.textContent = newText;
    });
  }

  function applyDraftToPage(doc, groupKey, lang) {
    const items = state.text[groupKey].items;
    const byKey = {};
    items.forEach((it) => (byKey[it.key] = it));
    doc.querySelectorAll("[data-ak-key]").forEach((el) => {
      if (doc.activeElement === el) return;
      const item = byKey[el.getAttribute("data-ak-key")];
      if (!item) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = item[lang] || "";
      else el.textContent = item[lang] || "";
    });
    const wa = byKey["whatsapp.href"];
    if (wa) {
      doc.querySelectorAll('[data-i18n-attr*="whatsapp.href"]').forEach((el) => {
        el.setAttribute("href", wa[lang] || wa.tr || "");
      });
    }
  }

  function renderWhatsappBox(container, groupKey) {
    const items = state.text[groupKey].items;
    const wa = items.find((i) => i.key === "whatsapp.href");
    if (!wa) return;

    const box = document.createElement("div");
    box.className = "wa-box";

    const label = document.createElement("div");
    label.className = "wa-box__label";
    label.textContent = "💬 " + L(STR.waLabel);
    box.appendChild(label);

    function makeRow(langKey, labelDict) {
      const row = document.createElement("label");
      row.className = "wa-row";
      const span = document.createElement("span");
      span.textContent = L(labelDict);
      const input = document.createElement("input");
      input.type = "text";
      input.value = wa[langKey] || "";
      row.append(span, input);
      box.appendChild(row);
      return input;
    }
    const trInput = makeRow("tr", STR.waTr);
    const enInput = makeRow("en", STR.waEn);

    const guardEl = document.createElement("div");
    box.appendChild(guardEl);

    function updateGuard() {
      const g = guardFor(wa);
      guardEl.textContent = g.msg;
      guardEl.className = g.ok ? "wa-ok" : "wa-warn";
    }
    function onInput(which, input) {
      wa[which] = input.value;
      updateGuard();
      if (previewCtx && previewCtx.groupKey === groupKey) {
        const shown = state.lang === which ? input.value : wa[state.lang];
        previewCtx.doc.querySelectorAll('[data-i18n-attr*="whatsapp.href"]').forEach((a) => a.setAttribute("href", shown || ""));
      }
    }
    trInput.addEventListener("input", () => onInput("tr", trInput));
    enInput.addEventListener("input", () => onInput("en", enInput));
    updateGuard();

    container.appendChild(box);
  }

  // ---------------------------------------------------------------------
  // Renderers
  // ---------------------------------------------------------------------
  function render() {
    const root = document.getElementById("app");
    root.innerHTML = "";
    if (state.screen === "login") {
      root.appendChild(renderLogin());
    } else {
      root.appendChild(renderAppShell());
    }
  }

  function svgGithub() {
    const span = document.createElement("span");
    span.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>';
    return span.firstChild;
  }

  function langPillWrap(onChange) {
    const wrap = document.createElement("div");
    wrap.className = "pill-wrap";
    ["tr", "en"].forEach((code) => {
      const btn = document.createElement("button");
      btn.className = "pill" + (state.lang === code ? " is-on" : "");
      btn.textContent = code.toUpperCase();
      btn.onclick = () => { state.lang = code; onChange ? onChange() : render(); };
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function renderLogin() {
    const wrap = document.createElement("div");
    wrap.className = "login-screen";

    const hero = document.createElement("div");
    hero.className = "login-hero";
    hero.innerHTML =
      '<div class="login-hero__kanji">芦原</div>' +
      '<div class="login-hero__brand"><img src="../assets/img/logo.png" alt=""><div class="login-hero__brandtext"><b>Ashihara Karate</b><span>Türkiye</span></div></div>' +
      '<div class="login-hero__title"><span class="eyebrow"></span><h1></h1></div>' +
      '<div class="login-hero__addr">ashiharakarate.com.tr · İnkılap Mah., Küçüksu Cad. No:67, Ümraniye/İstanbul</div>';
    hero.querySelector(".eyebrow").textContent = L(STR.heroEyebrow);
    hero.querySelector("h1").textContent = L(STR.heroTitle);

    const panelWrap = document.createElement("div");
    panelWrap.className = "login-panel-wrap";
    panelWrap.appendChild(langPillWrap());

    const panel = document.createElement("div");
    panel.className = "login-panel";
    const eyebrow = document.createElement("span");
    eyebrow.className = "eyebrow";
    eyebrow.textContent = L(STR.loginEyebrow);
    const h2 = document.createElement("h2");
    h2.textContent = L(STR.loginTitle);
    const p = document.createElement("p");
    p.textContent = L(STR.loginSub);
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.appendChild(svgGithub());
    const btnLabel = document.createElement("span");
    btnLabel.textContent = L(STR.loginBtn);
    btn.appendChild(btnLabel);
    btn.onclick = doLogin;
    const note = document.createElement("p");
    note.className = "login-note";
    note.textContent = L(STR.loginNote);
    panel.append(eyebrow, h2, p, btn, note);

    if (state.loginError) {
      const err = document.createElement("p");
      err.className = "login-error";
      err.textContent = state.loginError;
      panel.appendChild(err);
    }

    panelWrap.appendChild(panel);
    wrap.append(hero, panelWrap);
    return wrap;
  }

  function renderAppShell() {
    const wrap = document.createElement("div");
    wrap.className = "app-shell";
    wrap.appendChild(renderSidebar());
    const main = document.createElement("div");
    main.className = "main";
    main.appendChild(renderTopbar());
    const content = document.createElement("div");
    content.className = "content";
    content.id = "content";
    main.appendChild(content);
    wrap.appendChild(main);
    renderContent(content);
    return wrap;
  }

  function renderSidebar() {
    const sb = document.createElement("div");
    sb.className = "sidebar";

    const brand = document.createElement("div");
    brand.className = "sidebar__brand";
    brand.innerHTML =
      '<img src="../assets/img/logo.png" alt="">' +
      '<div class="sidebar__brandtext"><b>Ashihara Karate</b><span>Türkiye</span></div>';
    sb.appendChild(brand);

    const nav = document.createElement("div");
    nav.className = "sidebar__nav";

    function navItem(section, label) {
      const item = document.createElement("div");
      item.className = "nav-item" + (state.section === section ? " is-on" : "");
      item.textContent = label;
      item.onclick = () => { state.section = section; render(); };
      return item;
    }

    nav.appendChild(navItem("overview", L(STR.navOverview)));

    const textItem = document.createElement("div");
    textItem.className = "nav-item" + (state.section === "text" ? " is-on" : "");
    const textLabel = document.createElement("span");
    textLabel.textContent = L(STR.navText);
    const chevron = document.createElement("span");
    chevron.className = "nav-item__chevron";
    chevron.textContent = state.textExpanded ? "▾" : "▸";
    textItem.append(textLabel, chevron);
    textItem.onclick = () => {
      state.section = "text";
      state.textExpanded = !state.textExpanded;
      render();
    };
    nav.appendChild(textItem);

    if (state.textExpanded) {
      TEXT_GROUPS.forEach((g) => {
        const sub = document.createElement("div");
        sub.className = "nav-sub" + (state.section === "text" && state.activeText === g.key ? " is-on" : "");
        const labelEl = document.createElement("span");
        labelEl.className = "nav-sub__label";
        labelEl.textContent = L(g.label);
        sub.appendChild(labelEl);
        const entry = state.text[g.key];
        if (entry && entry.loaded) {
          const count = document.createElement("span");
          count.className = "nav-sub__count";
          count.textContent = String(entry.items.length);
          sub.appendChild(count);
        }
        sub.onclick = () => { state.section = "text"; state.activeText = g.key; render(); };
        nav.appendChild(sub);
      });
    }

    nav.appendChild(navItem("gallery", L(STR.navGallery)));
    nav.appendChild(navItem("photos", L(STR.navPhotos)));
    nav.appendChild(navItem("stats", L(STR.navStats)));

    sb.appendChild(nav);

    const foot = document.createElement("div");
    foot.className = "sidebar__foot";
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    if (state.user && state.user.avatar_url) {
      const img = document.createElement("img");
      img.src = state.user.avatar_url;
      avatar.appendChild(img);
    } else {
      avatar.appendChild(svgGithub());
    }
    const userInfo = document.createElement("div");
    userInfo.className = "sidebar__user";
    const nameSpan = document.createElement("span");
    nameSpan.textContent = (state.user && state.user.login) || L(STR.loggedInLabel);
    const logoutSpan = document.createElement("span");
    logoutSpan.className = "logout";
    logoutSpan.textContent = L(STR.logoutLabel);
    logoutSpan.onclick = doLogout;
    userInfo.append(nameSpan, logoutSpan);
    foot.append(avatar, userInfo);
    sb.appendChild(foot);

    return sb;
  }

  function renderTopbar() {
    const bar = document.createElement("div");
    bar.className = "topbar";
    const crumbMap = { overview: STR.navOverview, text: STR.navText, gallery: STR.navGallery, photos: STR.navPhotos, stats: STR.navStats };
    const crumb = document.createElement("span");
    crumb.className = "topbar__crumb";
    crumb.textContent = L(crumbMap[state.section] || STR.navOverview);

    const actions = document.createElement("div");
    actions.className = "topbar__actions";
    actions.appendChild(langPillWrap());
    const viewLink = document.createElement("a");
    viewLink.href = "../index.html";
    viewLink.target = "_blank";
    viewLink.rel = "noopener";
    viewLink.className = "btn btn--ghost";
    viewLink.textContent = L(STR.viewSite) + " ↗";
    actions.appendChild(viewLink);

    bar.append(crumb, actions);
    return bar;
  }

  function renderContent(el) {
    switch (state.section) {
      case "overview": renderOverview(el); break;
      case "text": renderText(el); break;
      case "gallery": renderGallery(el); break;
      case "photos": renderPhotos(el); break;
      case "stats": renderStats(el); break;
      default: renderOverview(el);
    }
  }

  function statCard(value, labelDict) {
    const card = document.createElement("div");
    card.className = "stat-card";
    const v = document.createElement("div");
    v.className = "stat-card__value";
    v.textContent = value;
    const lab = document.createElement("div");
    lab.className = "stat-card__label";
    lab.textContent = L(labelDict);
    card.append(v, lab);
    return card;
  }

  function actCard(num, titleDict, descDict, onClick) {
    const card = document.createElement("div");
    card.className = "act-card";
    card.onclick = onClick;
    const numEl = document.createElement("div");
    numEl.className = "act-card__num";
    numEl.textContent = num;
    const h3 = document.createElement("h3");
    h3.textContent = L(titleDict);
    const p = document.createElement("p");
    p.textContent = L(descDict);
    card.append(numEl, h3, p);
    return card;
  }

  function renderOverview(el) {
    ensureGalleryLoaded();
    ensurePhotosLoaded();

    const h1 = document.createElement("h1");
    h1.className = "h1";
    h1.textContent = L(STR.overviewTitle);
    const sub = document.createElement("p");
    sub.className = "sub";
    sub.style.marginBottom = "32px";
    sub.textContent = L(STR.overviewSub);
    el.append(h1, sub);

    const stats = document.createElement("div");
    stats.className = "stat-grid";
    stats.appendChild(statCard(state.gallery.loaded ? String(state.gallery.items.length) : "—", STR.statPhotosLabel));
    stats.appendChild(statCard(String(TEXT_GROUPS.length), STR.statGroupsLabel));
    stats.appendChild(statCard(state.photos.loaded ? String(state.photos.items.length) : "—", STR.statSlotsLabel));
    el.appendChild(stats);

    const acts = document.createElement("div");
    acts.className = "act-grid";
    acts.appendChild(actCard("01", STR.actTextTitle, STR.actTextDesc, () => { state.section = "text"; render(); }));
    acts.appendChild(actCard("02", STR.actGalleryTitle, STR.actGalleryDesc, () => { state.section = "gallery"; render(); }));
    acts.appendChild(actCard("03", STR.actPhotosTitle, STR.actPhotosDesc, () => { state.section = "photos"; render(); }));
    acts.appendChild(actCard("04", STR.actStatsTitle, STR.actStatsDesc, () => { state.section = "stats"; render(); }));
    el.appendChild(acts);

    const info = document.createElement("div");
    info.className = "info-grid";

    const repoCard = document.createElement("div");
    repoCard.className = "info-card";
    const repoTitle = document.createElement("h3");
    repoTitle.textContent = L(STR.repoTitle);
    const repoDesc = document.createElement("p");
    repoDesc.style.color = "var(--bone-dim)";
    repoDesc.style.fontSize = "13px";
    repoDesc.style.lineHeight = "1.6";
    repoDesc.textContent = L(STR.repoDesc);
    const repoLink = document.createElement("a");
    repoLink.className = "btn btn--ghost";
    repoLink.href = "https://github.com/Kivanc-Incedemir/ashihara-karate-turkiye/commits/master/";
    repoLink.target = "_blank";
    repoLink.rel = "noopener";
    repoLink.textContent = L(STR.repoLink);
    repoCard.append(repoTitle, repoDesc, repoLink);

    const teamCard = document.createElement("div");
    teamCard.className = "info-card";
    const teamTitle = document.createElement("h3");
    teamTitle.textContent = L(STR.teamTitle);
    const ownerRow = document.createElement("div");
    ownerRow.style.display = "flex";
    ownerRow.style.alignItems = "center";
    ownerRow.style.gap = "10px";
    ownerRow.style.marginBottom = "14px";
    ownerRow.innerHTML =
      '<div style="width:30px;height:30px;border-radius:50%;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--ff-display);font-size:11px;font-weight:600;flex:none;">ZÖ</div>' +
      '<div style="display:flex;flex-direction:column;line-height:1.25;"><span style="font-size:13px;">Ziya Özkan</span><span style="font-size:11px;color:var(--stone);" class="owner-label"></span></div>';
    ownerRow.querySelector(".owner-label").textContent = L(STR.teamOwnerLabel);
    const teamNote = document.createElement("p");
    teamNote.style.color = "var(--stone)";
    teamNote.style.fontSize = "12px";
    teamNote.style.lineHeight = "1.6";
    teamNote.textContent = L(STR.teamNote);
    teamCard.append(teamTitle, ownerRow, teamNote);

    info.append(repoCard, teamCard);
    el.appendChild(info);
  }

  function renderText(el) {
    const groupKey = state.activeText;
    const group = TEXT_GROUPS.find((g) => g.key === groupKey);
    const entry = state.text[groupKey];

    if (!entry || !entry.loaded) {
      const p = document.createElement("p");
      p.className = "spinner-line";
      p.textContent = L(STR.loading);
      el.appendChild(p);
      ensureTextGroupLoaded(groupKey);
      return;
    }

    const head = document.createElement("div");
    head.className = "group-head";
    const left = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.className = "h1";
    h1.style.fontSize = "26px";
    h1.textContent = L(group.label);
    const desc = document.createElement("p");
    desc.className = "sub";
    desc.style.maxWidth = "64ch";
    desc.textContent = L(group.desc);
    left.append(h1, desc);

    const actions = document.createElement("div");
    actions.className = "group-head__actions";
    const pillWrap = document.createElement("div");
    pillWrap.className = "pill-wrap";
    const previewBtn = document.createElement("button");
    previewBtn.className = "pill" + (state.viewMode === "preview" ? " is-on" : "");
    previewBtn.textContent = L(STR.modePreviewLabel);
    previewBtn.onclick = () => { state.viewMode = "preview"; render(); };
    const listBtn = document.createElement("button");
    listBtn.className = "pill" + (state.viewMode === "list" ? " is-on" : "");
    listBtn.textContent = L(STR.modeListLabel);
    listBtn.onclick = () => { state.viewMode = "list"; render(); };
    pillWrap.append(previewBtn, listBtn);
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn";
    saveBtn.textContent = L(STR.saveLabel);
    saveBtn.onclick = async () => {
      saveBtn.disabled = true;
      saveBtn.textContent = L(STR.savingLabel);
      await saveTextGroup(groupKey);
      saveBtn.disabled = false;
      saveBtn.textContent = L(STR.saveLabel);
    };
    actions.append(pillWrap, saveBtn);
    head.append(left, actions);
    el.appendChild(head);

    if (state.viewMode === "preview") {
      const hint = document.createElement("p");
      hint.className = "preview-hint";
      hint.textContent = L(STR.previewHint);
      el.appendChild(hint);

      renderWhatsappBox(el, groupKey);

      const iframe = document.createElement("iframe");
      iframe.className = "pte-iframe";
      iframe.src = group.page;
      el.appendChild(iframe);
      setupPreviewIframe(iframe, groupKey);
    } else {
      renderTextList(el, groupKey);
    }
  }

  function renderTextList(el, groupKey) {
    const items = state.text[groupKey].items;
    const note = document.createElement("p");
    note.className = "list-note";
    note.textContent = L(STR.rowsNote);
    el.appendChild(note);

    const table = document.createElement("div");
    table.className = "list-table";
    const head = document.createElement("div");
    head.className = "list-table__head";
    ["colKey", "colTr", "colEn"].forEach((k) => {
      const span = document.createElement("span");
      span.textContent = L(STR[k]);
      head.appendChild(span);
    });
    table.appendChild(head);

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "list-row";
      const grid = document.createElement("div");
      grid.className = "list-row__grid";
      const keyEl = document.createElement("div");
      keyEl.className = "list-row__key";
      keyEl.textContent = item.key;
      const trArea = document.createElement("textarea");
      trArea.rows = 2;
      trArea.value = item.tr || "";
      const enArea = document.createElement("textarea");
      enArea.rows = 2;
      enArea.value = item.en || "";
      grid.append(keyEl, trArea, enArea);
      row.appendChild(grid);
      const guardEl = document.createElement("div");
      guardEl.className = "list-row__guard";
      row.appendChild(guardEl);

      function updateGuard() {
        const g = guardFor(item);
        guardEl.textContent = g.show ? g.msg : "";
        guardEl.style.color = g.ok ? "#7FBF7F" : "var(--red)";
        guardEl.style.fontWeight = g.ok ? "normal" : "600";
      }
      trArea.addEventListener("input", () => { item.tr = trArea.value; updateGuard(); });
      enArea.addEventListener("input", () => { item.en = enArea.value; updateGuard(); });
      updateGuard();
      table.appendChild(row);
    });
    el.appendChild(table);
  }

  function renderGallery(el) {
    if (!state.gallery.loaded) {
      const p = document.createElement("p");
      p.className = "spinner-line";
      p.textContent = L(STR.loading);
      el.appendChild(p);
      ensureGalleryLoaded();
      return;
    }

    const head = document.createElement("div");
    head.className = "gallery-head";
    const left = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.className = "h1";
    h1.style.fontSize = "26px";
    h1.textContent = L(STR.navGallery);
    const desc = document.createElement("p");
    desc.className = "sub";
    desc.textContent = L(STR.galleryDesc);
    left.append(h1, desc);

    const rightActions = document.createElement("div");
    rightActions.style.display = "flex";
    rightActions.style.gap = "10px";
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn--ghost";
    saveBtn.textContent = L(STR.saveLabel);
    saveBtn.onclick = saveGallery;
    const addBtn = document.createElement("button");
    addBtn.className = "btn";
    addBtn.textContent = L(STR.addPhotoLabel);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    fileInput.onchange = () => {
      if (fileInput.files[0]) uploadGalleryPhoto(fileInput.files[0]);
      fileInput.value = "";
    };
    addBtn.onclick = () => fileInput.click();
    rightActions.append(saveBtn, addBtn, fileInput);

    head.append(left, rightActions);
    el.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "gallery-grid";
    state.gallery.items.forEach((p, i) => {
      grid.appendChild(renderGalleryCard(p, i));
    });
    el.appendChild(grid);
  }

  function renderGalleryCard(photo, index) {
    const card = document.createElement("div");
    card.className = "gallery-card";

    const media = document.createElement("div");
    media.className = "gallery-card__media";
    if (photo.file) {
      const img = document.createElement("img");
      img.src = "../photos/" + photo.file;
      media.appendChild(img);
    } else {
      const noFile = document.createElement("div");
      noFile.className = "gallery-card__nofile";
      noFile.textContent = L(STR.noPhotoLabel);
      media.appendChild(noFile);
    }
    const badge = document.createElement("span");
    badge.className = "gallery-card__badge";
    badge.textContent = L(CATEGORY_LABELS[photo.category] || { tr: photo.category, en: photo.category });
    const removeBtn = document.createElement("button");
    removeBtn.className = "gallery-card__remove";
    removeBtn.textContent = "×";
    removeBtn.onclick = () => {
      state.gallery.items.splice(index, 1);
      render();
    };
    media.append(badge, removeBtn);
    card.appendChild(media);

    const body = document.createElement("div");
    body.className = "gallery-card__body";
    const select = document.createElement("select");
    Object.keys(CATEGORY_LABELS).forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = CATEGORY_LABELS[cat].tr + " / " + CATEGORY_LABELS[cat].en;
      if (cat === photo.category) opt.selected = true;
      select.appendChild(opt);
    });
    select.onchange = () => {
      photo.category = select.value;
      const badgeEl = card.querySelector(".gallery-card__badge");
      badgeEl.textContent = L(CATEGORY_LABELS[photo.category]);
    };
    const trInput = document.createElement("input");
    trInput.value = photo.tr || "";
    trInput.placeholder = "Başlık (TR)";
    trInput.oninput = () => { photo.tr = trInput.value; };
    const enInput = document.createElement("input");
    enInput.value = photo.en || "";
    enInput.placeholder = "Caption (EN)";
    enInput.oninput = () => { photo.en = enInput.value; };
    body.append(select, trInput, enInput);
    card.appendChild(body);

    return card;
  }

  function renderPhotos(el) {
    if (!state.photos.loaded) {
      const p = document.createElement("p");
      p.className = "spinner-line";
      p.textContent = L(STR.loading);
      el.appendChild(p);
      ensurePhotosLoaded();
      return;
    }

    const h1 = document.createElement("h1");
    h1.className = "h1";
    h1.style.fontSize = "26px";
    h1.textContent = L(STR.photosTitle);
    const sub = document.createElement("p");
    sub.className = "sub";
    sub.style.marginBottom = "24px";
    sub.textContent = L(STR.photosSub);
    el.append(h1, sub);

    const grid = document.createElement("div");
    grid.className = "photo-slot-grid";
    PHOTO_SLOTS_META.forEach((meta) => {
      const slot = state.photos.items.find((s) => s.key === meta.key) || { key: meta.key, file: "" };
      grid.appendChild(renderPhotoSlotCard(meta, slot));
    });
    el.appendChild(grid);
  }

  function renderPhotoSlotCard(meta, slot) {
    const card = document.createElement("div");
    card.className = "photo-slot-card";

    const media = document.createElement("div");
    media.className = "photo-slot-card__media";
    if (slot.file) {
      const img = document.createElement("img");
      img.src = "../photos/" + slot.file;
      media.appendChild(img);
    }
    card.appendChild(media);

    const body = document.createElement("div");
    body.className = "photo-slot-card__body";
    const label = document.createElement("p");
    label.className = "photo-slot-card__label";
    label.textContent = L(meta.label);
    const fileLabel = document.createElement("p");
    fileLabel.className = "photo-slot-card__file";
    fileLabel.textContent = slot.file || "—";
    const uploadBtn = document.createElement("button");
    uploadBtn.className = "photo-slot-card__upload";
    uploadBtn.textContent = L(STR.replacePhotoLabel);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    fileInput.onchange = () => {
      if (fileInput.files[0]) {
        uploadBtn.disabled = true;
        uploadBtn.textContent = L(STR.savingLabel);
        uploadHeroPhoto(meta.key, fileInput.files[0]);
      }
      fileInput.value = "";
    };
    uploadBtn.onclick = () => fileInput.click();
    body.append(label, fileLabel, uploadBtn, fileInput);
    card.appendChild(body);

    return card;
  }

  function renderStats(el) {
    const h1 = document.createElement("h1");
    h1.className = "h1";
    h1.style.fontSize = "26px";
    h1.textContent = L(STR.navStats);
    const sub = document.createElement("p");
    sub.className = "sub";
    sub.style.marginBottom = "24px";
    sub.textContent = L(STR.statsSub);
    el.append(h1, sub);

    const card = document.createElement("div");
    card.className = "stats-card";
    const h3 = document.createElement("h3");
    h3.textContent = "📊 Cloudflare Web Analytics";
    const p = document.createElement("p");
    p.textContent = L(STR.statsCardDesc);
    const link = document.createElement("a");
    link.className = "btn";
    link.href = "https://dash.cloudflare.com/?to=/b608ddaa93d9790707db391210641a6a/web-analytics";
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = L(STR.statsBtn);
    card.append(h3, p, link);
    el.appendChild(card);
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
