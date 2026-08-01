/* =========================================================================
   i18n — Turkish (default) / English toggle.
   Usage in HTML:
     <span data-i18n="key">fallback</span>            -> textContent
     <input data-i18n-attr="placeholder:key">          -> attribute
     <div data-i18n-html="key">                         -> innerHTML (allows markup)
   Preference persists in localStorage("ak-lang").
   ========================================================================= */

const TR = {
  /* nav */
  "nav.home": "Ana Sayfa",
  "nav.about": "Ashihara Hakkında",
  "nav.gallery": "Galeri & Video",
  "nav.dojos": "Dojolar & İletişim",
  "nav.worldhistory": "Dünya Tarihçesi",
  "nav.turkeyhistory": "Türkiye Tarihçesi",
  "brand.sub": "Türkiye",
  "cta.join": "İlk Ders Ücretsiz",
  "cta.gallery": "Galeriyi Gör",
  "whatsapp.href": "https://wa.me/905337779022?text=Merhaba%2C%20Ashihara%20Karate%20dersleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
  "dojo.info.whatsapp": "WhatsApp",
  "dojo.freelesson": "İlk ders ücretsizdir.",

  /* home hero */
  "home.eyebrow": "Sabaki · Gerçek Dövüş Karatesi",
  "home.title": "Kuvveti Yönlendir. Rakibi Alt Et.",
  "home.sub": "Ashihara Karate, dairesel hareket (sabaki) ile rakibin gücünü kendi lehine çeviren tam temaslı bir dövüş sanatıdır. Türkiye çatısı altında disiplin, cesaret ve saygıyı bir araya getiriyoruz.",
  "home.scroll": "Aşağı Kaydır",

  /* stats */

  /* sabaki principles */
  "prin.eyebrow": "Temel İlkeler",
  "prin.title": "Sabaki'nin Üç Direği",
  "prin.1.t": "Kaçınma",
  "prin.1.d": "Rakibin saldırı hattından dairesel adımlarla çıkmak. Kuvvete kuvvetle değil, açıyla cevap vermek.",
  "prin.2.t": "Konumlanma",
  "prin.2.d": "Rakibin kör noktasına geçerek dengeyi ele almak. Doğru pozisyon, yarı kazanılmış mücadeledir.",
  "prin.3.t": "Karşı Saldırı",
  "prin.3.d": "Kontrolü aldığın anda kesin ve ekonomik teknikle bitirmek. Ashihara'nın imzası budur.",

  /* home about teaser */
  "hteaser.eyebrow": "Ashihara Kaikan",
  "hteaser.title": "Sokak Gerçekliğinden Doğan Bir Ekol",
  "hteaser.p1": "Kanchō Hideyuki Ashihara, Kyokushin geleneğinden yola çıkarak gerçek dövüş koşullarına uygun, sade ve etkili bir sistem geliştirdi. Gösterişten çok işlevi önceler.",
  "hteaser.p2": "Türkiye'de bu mirası; çocuklar, gençler ve yetişkinler için güvenli, disiplinli ve destekleyici bir ortamda sürdürüyoruz.",
  "hteaser.link": "Hikâyenin tamamını oku",

  /* about page */
  "about.eyebrow": "Ashihara Hakkında",
  "about.title": "Disiplin, Hareket, Onur",
  "about.sub": "Sabaki felsefesi, mesafe kontrolü ve dojo değerlerimiz.",
  "about.origin.eyebrow": "Köken",
  "about.origin.title": "Sabaki Felsefesi",
  "about.origin.p1": "Ashihara Karate (Ashihara Kaikan), 1980 yılında Kanchō Hideyuki Ashihara tarafından kuruldu. Ashihara, Kyokushin karatede yıllarca eğitim aldıktan sonra, gerçek bir çatışmada işe yarayan tekniklere odaklanan kendi ekolünü oluşturdu.",
  "about.origin.p2": "Sistemin merkezinde 'sabaki' yer alır: rakibin saldırısından dairesel bir hareketle kaçınmak, onun kör noktasına geçmek ve dengesini bozulduğu anda karşı saldırıya geçmek. Bu yaklaşım, küçük yapılı sporcuların bile daha güçlü rakiplere karşı üstünlük kurmasını sağlar.",
  "about.origin.p3": "Ashihara'nın öğretisi kata'yı soyut hareketlerden çıkarıp doğrudan uygulanabilir dövüş senaryolarına dönüştürmesiyle bilinir.",

  "about.maai.eyebrow": "Mesafe Kontrolü",
  "about.maai.title": "Sabaki'de Üç Mesafe (Maai)",
  "about.maai.1.t": "Shoto no Maai — Yakın Mesafe",
  "about.maai.1.d": "Rakibe en yakın mesafe; dairesel bir adımla anında karşı tekniğe geçilebilecek konum.",
  "about.maai.2.t": "Midoru no Maai — Orta Mesafe",
  "about.maai.2.d": "Ne çok yakın ne çok uzak; sabaki hareketinin en sık uygulandığı ara mesafe.",
  "about.maai.3.t": "Rongu no Maai — Uzak Mesafe",
  "about.maai.3.d": "Rakibin darbe menzili dışında kalınan, zamanlama ve pozisyon üstünlüğü sağlayan mesafe.",

  "about.history.eyebrow": "Tarihçe",
  "about.history.title": "İki Tarihi Yolculuk",
  "about.history.sub": "Ashihara Karate'nin dünya çapındaki hikayesini ve Türkiye'deki yolculuğunu keşfedin.",
  "about.history.world.t": "Dünya Tarihçesi",
  "about.history.world.d": "Kanchō Hideyuki Ashihara'nın Japonya'da kurduğu ekolün doğuşu ve dünyaya yayılışı.",
  "about.history.world.link": "Devamını Oku",
  "about.history.tr.t": "Türkiye Tarihçesi",
  "about.history.tr.d": "Sensei Ziya Özkan'ın 1983'ten bugüne Ümraniye'deki yolculuğu.",
  "about.history.tr.link": "Devamını Oku",

  "about.values.eyebrow": "Dojo Kun",
  "about.values.title": "Değerlerimiz",
  "about.v1.t": "Saygı (Rei)",
  "about.v1.d": "Her antrenman selamla başlar ve biter. Rakibe, hocaya ve kendine saygı esastır.",
  "about.v2.t": "Sabır",
  "about.v2.d": "İlerleme tekrarla gelir. Kuşak bir varış değil, bir yolculuktur.",
  "about.v3.t": "Cesaret",
  "about.v3.d": "Konfor alanının dışına çıkmak, hem tatamide hem hayatta güç kazandırır.",

  /* global (world) history page */
  "whist.eyebrow": "Dünya Tarihçesi",
  "whist.title": "Kyokushin'den Sabaki'ye",
  "whist.sub": "Hideyuki Ashihara'nın Japonya'da kurduğu ekolün doğuşu ve dünyaya yayılışı.",

  "whist.origin.eyebrow": "Kökler",
  "whist.origin.title": "Bir Kyokushin Öğrencisi",
  "whist.origin.p1": "Hideyuki Ashihara, 5 Aralık 1944'te Hiroşima'da doğdu. Eylül 1961'de, henüz 16 yaşındayken Kyokushinkai'nin kurucusu Mas Oyama'nın dojosuna katıldı.",
  "whist.origin.p2": "26 Mart 1964'te, 19 yaşında siyah kuşak (Shodan) derecesini aldı; kısa süre sonra eğitmen oldu ve Kyokushinkai'yi Japonya'nın batısında genişletti.",

  "whist.founding.eyebrow": "Kuruluş",
  "whist.founding.title": "Ashihara Kaikan'ın Doğuşu",
  "whist.founding.p1": "Eylül 1980'de Hideyuki Ashihara, Matsuyama'daki kendi dojosunda Yeni Uluslararası Karate Organizasyonu'nu (NIKO) — Ashihara Kaikan'ı kurdu ve 'Kanchō' (Büyük Usta) unvanını aldı.",
  "whist.founding.p2": "Yeni ekolün merkezinde 'sabaki' yer alıyordu: hazırlık, mesafe ve zamanlama değerlendirmesi ile duruşun korunmasına dayanan, rakibin saldırısından dairesel biçimde kaçıp karşı saldırıya geçen bir sistem.",

  "whist.spread.eyebrow": "Yayılma",
  "whist.spread.title": "Japonya'dan Dünyaya",
  "whist.spread.p1": "Ekol hızla büyüdü ve önemli isimler yetiştirdi: öğrencilerinden Kazuyoshi Ishii, K-1 kickboks organizasyonunun yaratıcılarından biri oldu.",
  "whist.spread.p2": "Bugün NIKO, Japonya'da yaklaşık 180, yurt dışında ise 220'den fazla şube ile Avrupa, Amerika, Ortadoğu ve Afrika'da varlığını sürdürüyor; her yıl uluslararası şampiyonalar ve yıldönümü etkinlikleri düzenleniyor.",

  "whist.succession.eyebrow": "Miras",
  "whist.succession.title": "Yeni Nesil Liderlik",
  "whist.succession.p1": "1987'de ALS (amyotrofik lateral skleroz) teşhisi konan Kanchō Ashihara, 1992'de kıdemli öğrencisi Hiroshi Harada'yı NIKO'nun tüm işlerini yürütmekle görevlendirdi.",
  "whist.succession.p2": "24 Nisan 1995'te, 50 yaşında vefat etti; cenazesine 1000'den fazla kişi katıldı. Oğlu Hidenori Ashihara, 18 yaşında NIKO'nun ikinci Kanchō'su oldu ve organizasyonu bugün de yönetiyor.",
  "whist.succession.p3": "Kanchō'nun vefatının ardından bazı kıdemli öğrenciler kendi organizasyonlarını kurdu, ancak hepsi aynı sabaki temelini paylaşmaya devam ediyor.",

  "whist.tl.eyebrow": "Zaman Çizgisi",
  "whist.tl.title": "Kökten Bugüne",
  "whist.tl.1.t": "Oyama Dojosu'na Katılım",
  "whist.tl.1.d": "Genç Hideyuki Ashihara, Mas Oyama'nın Kyokushinkai dojosunda eğitime başlar.",
  "whist.tl.2.t": "Siyah Kuşak",
  "whist.tl.2.d": "19 yaşındaki Ashihara Shodan derecesini alır ve kısa sürede eğitmen olur.",
  "whist.tl.3.t": "Ashihara Kaikan'ın Kuruluşu",
  "whist.tl.3.d": "Eylül 1980'de NIKO — Ashihara Kaikan resmen kurulur; Kanchō unvanı bu dönemde alınır.",
  "whist.tl.4.t": "Kanchō'nun Vefatı",
  "whist.tl.4.d": "Hideyuki Ashihara 24 Nisan 1995'te vefat eder; oğlu Hidenori Ashihara ikinci Kanchō olur.",
  "whist.tl.5.year": "Bugün",
  "whist.tl.5.t": "Küresel Ağ",
  "whist.tl.5.d": "NIKO bugün Japonya'da 180, yurt dışında 220'den fazla dojo ile faaliyet gösteriyor.",

  /* turkey history page */
  "thist.eyebrow": "Türkiye Tarihçesi",
  "thist.title": "Ümraniye'den Bugüne",
  "thist.sub": "Sensei Ziya Özkan'ın 1983'ten bugüne uzanan yolculuğu ve Ashihara Karate'nin Türkiye'deki hikayesi.",

  "thist.sensei.eyebrow": "Baş Antrenör",
  "thist.sensei.title": "Sensei Ziya Özkan",
  "thist.sensei.p1": "Ziya Özkan, 1969 doğumlu, evli ve iki çocuk babasıdır. Dövüş sporlarına 1983 yılında tam temaslı Kyokushin Karate ile başladı; 1983-1992 yılları arasında korumasız çok sayıda tam temas maçında mücadele etti ve ilk siyah kuşağını 1988'de aldı.",
  "thist.sensei.p2": "1991 yılında Ümraniye'de (Çakmak Mah.) ilk profesyonel Ashihara Karate salonunu açtı ve o günden beri aralıksız Ümraniye'de antrenörlük yapıyor.",
  "thist.sensei.p3": "NIKO Japonya'dan 3. Dan, Türkiye Karate Federasyonu'ndan 7. Dan ve 3. Kademe Antrenör derecesine sahiptir; Ashihara Fight Karate çatısı altında öz savunma ve dövüş eğitimi veriyor.",
  "thist.sensei.quote": "\"Savaşta silahın süslüsü değil, işe yarayanı makbuldür.\"",

  "thist.founding.eyebrow": "Kuruluş",
  "thist.founding.title": "İlk Ashihara Salonu",
  "thist.founding.p1": "1991 yılında Ziya Özkan, Ümraniye'nin Çakmak Mahallesi'nde Türkiye'nin ilk profesyonel Ashihara Karate salonunu açtı. O günden bu yana antrenörlüğünü aralıksız Ümraniye'de sürdürüyor.",
  "thist.founding.p2": "Bugün dersler İnkılap Mahallesi'ndeki Halide Edip Mesleki ve Teknik Anadolu Lisesi spor salonunda, haftada iki gün, özel eğitim seviyesinde küçük gruplar halinde yürütülüyor.",

  "thist.recog.eyebrow": "Tanınma",
  "thist.recog.title": "Otuz Yılı Aşan Emek",
  "thist.recog.p1": "Ziya Özkan, NIKO Japonya'dan 3. Dan ve Türkiye Karate Federasyonu'ndan 7. Dan ile 3. Kademe Antrenörlük derecesine sahiptir; Ashihara Fight Karate çatısı altında öz savunma ve dövüş eğitimi de veriyor.",
  "thist.recog.p2": "Okulun 40. yıl kutlamalarına katılımı, Türkiye temsilciliğinin uluslararası Ashihara camiasıyla kurduğu bağın bir göstergesi oldu.",

  "thist.tl.eyebrow": "Zaman Çizgisi",
  "thist.tl.title": "Ümraniye Yolculuğu",
  "thist.tl.1.t": "Kyokushin'e İlk Adım",
  "thist.tl.1.d": "Ziya Özkan, tam temaslı Kyokushin Karate ile dövüş sporlarına başlar.",
  "thist.tl.2.t": "İlk Siyah Kuşak",
  "thist.tl.2.d": "Yıllar süren tam temas maçlarının ardından ilk siyah kuşağını alır.",
  "thist.tl.3.t": "Ümraniye'de İlk Dojo",
  "thist.tl.3.d": "Çakmak Mahallesi'nde Türkiye'nin ilk profesyonel Ashihara Karate salonu açılır.",
  "thist.tl.4.year": "2000 →",
  "thist.tl.4.t": "Sürekli Büyüme",
  "thist.tl.4.d": "Dojo, çocuk, genç ve yetişkin sporculara sabaki disiplinini kazandırmaya devam eder.",
  "thist.tl.5.year": "Bugün",
  "thist.tl.5.t": "Ashihara Karate Türkiye",
  "thist.tl.5.d": "Ümraniye Ashihara Karate Okulu, Türkiye'deki Ashihara mirasını sürdürüyor.",

  /* gallery page */
  "gal.eyebrow": "Galeri",
  "gal.title": "Tatamiden Kareler",
  "gal.sub": "Antrenmanlar, sınavlar, seminerler ve turnuvalardan anlar.",
  "gal.filter.all": "Tümü",
  "gal.filter.training": "Antrenman",
  "gal.filter.grading": "Kuşak Sınavı",
  "gal.filter.event": "Etkinlik",
  "gal.empty.title": "Henüz fotoğraf eklenmedi",
  "gal.empty.body": "Fotoğrafları <code>photos/</code> klasörüne ekleyin, ardından listeyi güncellemek için galeri oluşturucuyu çalıştırın.",

  /* videos */
  "vid.eyebrow": "İzle",
  "vid.title": "Video Arşivi",
  "vid.sub": "Sensei Ziya Özkan'ın YouTube kanalından teknikler, kata ve gösteriler.",
  "vid.more": "Kanalın Tamamını YouTube'da İzle",

  /* dojos page */
  "dojo.eyebrow": "Dojolar & İletişim",
  "dojo.title": "Bize Katıl",
  "dojo.sub": "Dojomuzu ziyaret et veya doğrudan iletişime geç. İlk ders herkes için açıktır.",
  "dojo.list.eyebrow": "Antrenman Yeri",
  "dojo.list.title": "Ümraniye Ashihara Karate Okulu",
  "dojo.addr.p1": "İnkılap Mah., Küçüksu Cad. No:67, 34768 Ümraniye/İstanbul — İstanbul Halide Edip Mesleki ve Teknik Anadolu Lisesi bünyesindeki spor salonu.",
  "dojo.addr.p2": "Özel eğitim alanında, özel ders seviyesinde, 10 kişilik gruplarla çalışılır.",
  "dojo.schedule": "Antrenman Saati",
  "dojo.days": "Pazartesi · Perşembe",
  "dojo.viewmap": "Haritada Gör",
  "dojo.contact.eyebrow": "İletişim",
  "dojo.contact.title": "Bize Ulaş",
  "dojo.form.name": "Ad Soyad",
  "dojo.form.email": "E-posta",
  "dojo.form.msg": "Mesajın",
  "dojo.form.send": "Mesajı Gönder",
  "dojo.form.note": "Bu form gösterim amaçlıdır. Gerçek gönderim için e-postayı kullanın.",
  "dojo.info.mail": "E-posta",
  "dojo.info.phone": "Antrenman Saati",
  "dojo.info.hq": "Adres",

  /* footer */
  "foot.about": "Ashihara Karate Türkiye — sabaki temelli tam temaslı karate ekolünün Türkiye topluluğu.",
  "foot.nav": "Sayfalar",
  "foot.hq": "Ashihara Genel Merkezi",
  "foot.contact": "İletişim",
  "foot.rights": "Tüm hakları saklıdır.",
  "foot.disclaimer": "Resmi olmayan tanıtım sitesi.",
};

const EN = {
  "nav.home": "Home",
  "nav.about": "About Ashihara",
  "nav.gallery": "Gallery & Video",
  "nav.dojos": "Dojos & Contact",
  "nav.worldhistory": "Global History",
  "nav.turkeyhistory": "Turkey History",
  "brand.sub": "Türkiye",
  "cta.join": "First Lesson Free",
  "cta.gallery": "View Gallery",
  "whatsapp.href": "https://wa.me/905337779022?text=Hello%2C%20I%20would%20like%20information%20about%20Ashihara%20Karate%20classes.",
  "dojo.info.whatsapp": "WhatsApp",
  "dojo.freelesson": "The first lesson is free.",

  "home.eyebrow": "Sabaki · Full-Contact Karate",
  "home.title": "Redirect the Force. Control the Fight.",
  "home.sub": "Ashihara Karate is a full-contact martial art that turns an opponent's power against them through circular movement — sabaki. Under the Türkiye organisation we bring together discipline, courage, and respect.",
  "home.scroll": "Scroll",


  "prin.eyebrow": "Core Principles",
  "prin.title": "The Three Pillars of Sabaki",
  "prin.1.t": "Evasion",
  "prin.1.d": "Step off the line of attack with circular movement. Answer force with angle, not with force.",
  "prin.2.t": "Positioning",
  "prin.2.d": "Move to the opponent's blind side and seize their balance. Good position is half the fight won.",
  "prin.3.t": "Counter",
  "prin.3.d": "The moment control is yours, finish with a decisive, economical technique. This is Ashihara's signature.",

  "hteaser.eyebrow": "Ashihara Kaikan",
  "hteaser.title": "A School Born From Real Combat",
  "hteaser.p1": "Starting from the Kyokushin tradition, Kanchō Hideyuki Ashihara built a plain, effective system suited to real fighting conditions. It prioritises function over show.",
  "hteaser.p2": "In Türkiye we carry this legacy forward in a safe, disciplined, and supportive environment for children, teens, and adults alike.",
  "hteaser.link": "Read the full story",

  "about.eyebrow": "About Ashihara",
  "about.title": "Discipline, Movement, Honour",
  "about.sub": "Our sabaki philosophy, distance control, and dojo values.",
  "about.origin.eyebrow": "Origin",
  "about.origin.title": "The Sabaki Philosophy",
  "about.origin.p1": "Ashihara Karate (Ashihara Kaikan) was founded in 1980 by Kanchō Hideyuki Ashihara. After years of training in Kyokushin karate, Ashihara created his own school focused on techniques that work in a real confrontation.",
  "about.origin.p2": "At the heart of the system is 'sabaki': evading an attack with circular movement, moving to the opponent's blind spot, and countering the instant their balance breaks. This approach lets even smaller athletes gain the upper hand against stronger opponents.",
  "about.origin.p3": "Ashihara's teaching is known for turning kata from abstract movements into directly applicable fighting scenarios.",

  "about.maai.eyebrow": "Distance Control",
  "about.maai.title": "The Three Distances of Sabaki (Maai)",
  "about.maai.1.t": "Shoto no Maai — Close Distance",
  "about.maai.1.d": "The closest range to the opponent — a position from which a circular step can flow straight into a counter.",
  "about.maai.2.t": "Midoru no Maai — Middle Distance",
  "about.maai.2.d": "Neither too close nor too far — the middle distance where sabaki movement is applied most often.",
  "about.maai.3.t": "Rongu no Maai — Long Distance",
  "about.maai.3.d": "Just outside the opponent's striking range — the distance that buys timing and positional advantage.",

  "about.history.eyebrow": "History",
  "about.history.title": "Two Historical Journeys",
  "about.history.sub": "Explore Ashihara Karate's global story and its journey in Türkiye.",
  "about.history.world.t": "Global History",
  "about.history.world.d": "How Kanchō Hideyuki Ashihara's school was born in Japan and spread across the world.",
  "about.history.world.link": "Read More",
  "about.history.tr.t": "Turkey History",
  "about.history.tr.d": "Sensei Ziya Özkan's journey in Ümraniye from 1983 to today.",
  "about.history.tr.link": "Read More",

  "about.values.eyebrow": "Dojo Kun",
  "about.values.title": "Our Values",
  "about.v1.t": "Respect (Rei)",
  "about.v1.d": "Every session opens and closes with a bow. Respect for the opponent, the instructor, and yourself is essential.",
  "about.v2.t": "Patience",
  "about.v2.d": "Progress comes through repetition. A belt is not a destination but a journey.",
  "about.v3.t": "Courage",
  "about.v3.d": "Stepping outside the comfort zone builds strength on the mat and in life.",

  /* global (world) history page */
  "whist.eyebrow": "Global History",
  "whist.title": "From Kyokushin to Sabaki",
  "whist.sub": "How Hideyuki Ashihara's school was born in Japan and spread across the world.",

  "whist.origin.eyebrow": "Roots",
  "whist.origin.title": "A Student of Kyokushin",
  "whist.origin.p1": "Hideyuki Ashihara was born on 5 December 1944 in Hiroshima. In September 1961, at just 16, he joined the dojo of Kyokushinkai founder Mas Oyama.",
  "whist.origin.p2": "On 26 March 1964, at 19, he earned his black belt (Shodan); he soon became an instructor and helped expand Kyokushinkai across western Japan.",

  "whist.founding.eyebrow": "Founding",
  "whist.founding.title": "The Birth of Ashihara Kaikan",
  "whist.founding.p1": "In September 1980, Hideyuki Ashihara founded the New International Karate Organisation (NIKO) — Ashihara Kaikan — at his own dojo in Matsuyama, taking the title 'Kanchō' (Grandmaster).",
  "whist.founding.p2": "At the heart of the new school was 'sabaki': a system built on preparation, distance and timing judgement, and stance control — evading an attack in a circular motion and countering from the opponent's blind side.",

  "whist.spread.eyebrow": "Spread",
  "whist.spread.title": "From Japan to the World",
  "whist.spread.p1": "The school grew quickly and produced notable names, including Kazuyoshi Ishii, who became one of the creators of the K-1 kickboxing organisation.",
  "whist.spread.p2": "Today NIKO maintains around 180 branches in Japan and more than 220 abroad, across Europe, the Americas, the Middle East, and Africa, with international championships and anniversary events held every year.",

  "whist.succession.eyebrow": "Legacy",
  "whist.succession.title": "A New Generation Leads",
  "whist.succession.p1": "Diagnosed with ALS (amyotrophic lateral sclerosis) in 1987, Kanchō Ashihara appointed his senior student Hiroshi Harada in 1992 to oversee all of NIKO's affairs.",
  "whist.succession.p2": "He passed away on 24 April 1995 at the age of 50; more than 1,000 people attended his funeral. His son, Hidenori Ashihara, became NIKO's second Kanchō at just 18 and still leads the organisation today.",
  "whist.succession.p3": "After the Kanchō's passing, several senior students founded their own organisations, though all continue to share the same sabaki foundation.",

  "whist.tl.eyebrow": "Timeline",
  "whist.tl.title": "From Roots to Today",
  "whist.tl.1.t": "Joining the Oyama Dojo",
  "whist.tl.1.d": "A young Hideyuki Ashihara begins training at Mas Oyama's Kyokushinkai dojo.",
  "whist.tl.2.t": "Black Belt",
  "whist.tl.2.d": "At 19, Ashihara earns his Shodan rank and soon becomes an instructor.",
  "whist.tl.3.t": "Founding of Ashihara Kaikan",
  "whist.tl.3.d": "In September 1980, NIKO — Ashihara Kaikan is formally founded, and the title of Kanchō is taken.",
  "whist.tl.4.t": "Passing of the Kanchō",
  "whist.tl.4.d": "Hideyuki Ashihara passes away on 24 April 1995; his son Hidenori Ashihara becomes the second Kanchō.",
  "whist.tl.5.year": "Today",
  "whist.tl.5.t": "A Global Network",
  "whist.tl.5.d": "NIKO today operates with 180 dojos in Japan and more than 220 abroad.",

  /* turkey history page */
  "thist.eyebrow": "Turkey History",
  "thist.title": "From Ümraniye to Today",
  "thist.sub": "Sensei Ziya Özkan's journey since 1983, and the story of Ashihara Karate in Türkiye.",

  "thist.sensei.eyebrow": "Head Instructor",
  "thist.sensei.title": "Sensei Ziya Özkan",
  "thist.sensei.p1": "Ziya Özkan was born in 1969, is married, and is the father of two. He began martial arts in 1983 with full-contact Kyokushin Karate; between 1983 and 1992 he fought in numerous unprotected full-contact matches, earning his first black belt in 1988.",
  "thist.sensei.p2": "In 1991 he opened his first professional Ashihara Karate gym in Ümraniye (Çakmak Mah.), and has coached continuously in Ümraniye ever since.",
  "thist.sensei.p3": "He holds 3rd Dan from NIKO Japan, 7th Dan from the Turkish Karate Federation, and a 3rd-level trainer certification, teaching self-defence and fighting under Ashihara Fight Karate.",
  "thist.sensei.quote": "\"In battle, it is not the fanciest weapon that matters — it's the one that works.\"",

  "thist.founding.eyebrow": "Founding",
  "thist.founding.title": "The First Ashihara Dojo",
  "thist.founding.p1": "In 1991, Ziya Özkan opened Türkiye's first professional Ashihara Karate dojo in Ümraniye's Çakmak neighbourhood, and has coached there continuously ever since.",
  "thist.founding.p2": "Today, classes run twice a week in small, dedicated groups at the sports hall of Halide Edip Vocational and Technical Anatolian High School in the İnkılap neighbourhood.",

  "thist.recog.eyebrow": "Recognition",
  "thist.recog.title": "Over Three Decades of Work",
  "thist.recog.p1": "Ziya Özkan holds 3rd Dan from NIKO Japan and 7th Dan plus a 3rd-level trainer certification from the Turkish Karate Federation, and also teaches self-defence and fighting under Ashihara Fight Karate.",
  "thist.recog.p2": "His participation in the school's 40th-anniversary celebrations reflected the strong ties between the Turkish representation and the international Ashihara community.",

  "thist.tl.eyebrow": "Timeline",
  "thist.tl.title": "The Ümraniye Journey",
  "thist.tl.1.t": "First Steps in Kyokushin",
  "thist.tl.1.d": "Ziya Özkan begins his martial arts journey in full-contact Kyokushin Karate.",
  "thist.tl.2.t": "First Black Belt",
  "thist.tl.2.d": "After years of full-contact matches, he earns his first black belt.",
  "thist.tl.3.t": "First Dojo in Ümraniye",
  "thist.tl.3.d": "Türkiye's first professional Ashihara Karate dojo opens in the Çakmak neighbourhood.",
  "thist.tl.4.year": "2000 →",
  "thist.tl.4.t": "Continued Growth",
  "thist.tl.4.d": "The dojo continues teaching the discipline of sabaki to children, teens, and adults.",
  "thist.tl.5.year": "Today",
  "thist.tl.5.t": "Ashihara Karate Türkiye",
  "thist.tl.5.d": "The Ümraniye Ashihara Karate School carries the Ashihara legacy forward in Türkiye.",

  "gal.eyebrow": "Gallery",
  "gal.title": "Frames From the Mat",
  "gal.sub": "Moments from training, gradings, seminars, and tournaments.",
  "gal.filter.all": "All",
  "gal.filter.training": "Training",
  "gal.filter.grading": "Gradings",
  "gal.filter.event": "Events",
  "gal.empty.title": "No photos added yet",
  "gal.empty.body": "Add photos to the <code>photos/</code> folder, then run the gallery builder to refresh the list.",

  /* videos */
  "vid.eyebrow": "Watch",
  "vid.title": "Video Archive",
  "vid.sub": "Techniques, kata, and demonstrations from Sensei Ziya Özkan's YouTube channel.",
  "vid.more": "Watch the full channel on YouTube",

  "dojo.eyebrow": "Dojos & Contact",
  "dojo.title": "Join Us",
  "dojo.sub": "Visit our dojo or reach out directly. The first lesson is open to everyone.",
  "dojo.list.eyebrow": "Training Location",
  "dojo.list.title": "Ümraniye Ashihara Karate School",
  "dojo.addr.p1": "İnkılap Mah., Küçüksu Cad. No:67, 34768 Ümraniye/İstanbul — the sports hall inside İstanbul Halide Edip Vocational and Technical Anatolian High School.",
  "dojo.addr.p2": "Training runs in a dedicated space, at a private-lesson level, in groups of 10.",
  "dojo.schedule": "Training Hours",
  "dojo.days": "Monday · Thursday",
  "dojo.viewmap": "View on Map",
  "dojo.contact.eyebrow": "Contact",
  "dojo.contact.title": "Get in Touch",
  "dojo.form.name": "Full Name",
  "dojo.form.email": "Email",
  "dojo.form.msg": "Your Message",
  "dojo.form.send": "Send Message",
  "dojo.form.note": "This form is for demonstration. For real enquiries, use email.",
  "dojo.info.mail": "Email",
  "dojo.info.phone": "Training Hours",
  "dojo.info.hq": "Address",

  "foot.about": "Ashihara Karate Türkiye — the Turkish community of the sabaki-based full-contact karate school.",
  "foot.nav": "Pages",
  "foot.hq": "Ashihara Headquarters",
  "foot.contact": "Contact",
  "foot.rights": "All rights reserved.",
  "foot.disclaimer": "Unofficial promotional site.",
};

const DICTS = { tr: TR, en: EN };

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

function initI18n() {
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
