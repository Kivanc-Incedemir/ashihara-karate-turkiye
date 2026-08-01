# Ashihara Karate Türkiye

Statik, iki dilli (Türkçe / İngilizce) tanıtım ve galeri web sitesi.
Sunucu veya veritabanı gerektirmez — herhangi bir statik hosting'de yayınlanır.

*A static, bilingual (Turkish / English) showcase & gallery website. No server or database required.*

---

## 📁 Klasör yapısı / Structure

```
ashihara-karate-turkiye/
├── index.html            Ana sayfa / Home
├── about.html            Ashihara hakkında / About
├── gallery.html          Fotoğraf galerisi / Gallery
├── dojos.html            Dojolar & iletişim / Dojos & contact
├── photos/               ← FOTOĞRAFLARINIZI BURAYA KOYUN / put photos here
│   └── manifest.json     Galeri listesi (otomatik üretilir)
├── scripts/
│   └── build-gallery.mjs Galeri listesini yeniden oluşturur
├── build-gallery.bat     Çift tıkla → galeriyi güncelle (Windows)
└── assets/               CSS · JS · logo
```

---

## 🖼️ Fotoğraf ekleme / Adding photos

1. Fotoğraf dosyalarını (`.jpg`, `.png`, `.webp`) **`photos/`** klasörüne kopyalayın.
2. **`build-gallery.bat`** dosyasına çift tıklayın *(veya terminalde `node scripts/build-gallery.mjs` çalıştırın)*.
3. Bu, `photos/manifest.json` dosyasını günceller. Site otomatik olarak yeni fotoğrafları gösterir.

### Başlık ve kategori düzenleme / Captions & categories

`photos/manifest.json` dosyasını bir metin editörüyle açıp her fotoğraf için düzenleyin:

```json
{
  "file": "sinav-2026.jpg",
  "category": "grading",          // training | grading | event
  "tr": "2026 Kuşak Sınavı",
  "en": "2026 Belt Grading"
}
```

> Elle yazdığınız başlıklar korunur — `build-gallery` yeniden çalıştırıldığında **üzerine yazılmaz**.
> Dosya adında `sinav`, `turnuva`, `seminer` gibi kelimeler geçerse kategori otomatik tahmin edilir.

`photos/` klasöründe Ümraniye dojosundan gerçek fotoğraflar bulunur. Yeni fotoğraf eklemek için dosyayı klasöre koyup `build-gallery`'yi tekrar çalıştırmanız yeterli.

---

## 👀 Yerelde görüntüleme / View locally

Node.js kuruluysa proje klasöründe:

```bash
npx serve .
# veya / or
python -m http.server 8000
```

Ardından tarayıcıda `http://localhost:8000` adresini açın.

> Not: Galeri `fetch` kullandığı için `.html` dosyasına çift tıklamak yerine küçük bir yerel sunucu kullanın.

---

## 🚀 Yayınlama / Deploy (ücretsiz / free)

Site tamamen statik olduğu için şu servislerin herhangi birinde ücretsiz yayınlanır:

- **GitHub Pages** — repoyu push edin → Settings → Pages → kaynağı `main` seçin.
- **Netlify / Vercel / Cloudflare Pages** — klasörü sürükleyip bırakın.

Dil tercihi, ziyaretçinin tarayıcısında (`localStorage`) saklanır; varsayılan Türkçe'dir.

---

## 🎨 Özelleştirme / Customisation

| Ne / What | Nerede / Where |
|-----------|----------------|
| Renkler, yazı tipleri | `assets/css/styles.css` (`:root` değişkenleri) |
| Metinler (TR/EN) | `assets/js/i18n.js` |
| Dojo listesi | `dojos.html` |
| İletişim bilgileri | Tüm sayfaların altbilgisi (footer) |
| **Logo** | `assets/img/logo.png` (resmi Ashihara Kaikan amblemi) |
| Favicon | `assets/img/favicon.png` (resmi amblemin küçük hali) |
| Videolar | `gallery.html` içindeki `<iframe>` `src`'leri |

---

## 🥋 Resmi logo / Official logo

Site, resmi Ashihara Kaikan amblemini kullanıyor: **`assets/img/logo.png`** (üst menü + footer,
her sayfada 2 yer) ve **`assets/img/favicon.png`** (tarayıcı sekmesi ikonu, tüm sayfalarda).

Logoyu güncellemek isterseniz dosyayı aynı isimle (`logo.png` / `favicon.png`) üzerine yazmanız
yeterli — hiçbir kod değişikliği gerekmez.

---

## 🎥 Video & 📸 Fotoğraflar hakkında

- **Videolar** Sensei Ziya Özkan'ın YouTube kanalından gömülüdür (`gallery.html`). Başka video eklemek için
  YouTube video ID'sini alıp yeni bir `<iframe>` bloğu kopyalayın.
- **Fotoğraflar** Instagram/Facebook'tan otomatik çekilemez — bu platformlar giriş (login) duvarı ardındadır
  ve başkasının fotoğraflarını otomatik yayınlamak telif açısından uygun değildir. Kendi fotoğraflarınızı
  indirip yukarıdaki adımlarla `photos/` klasörüne ekleyin.
