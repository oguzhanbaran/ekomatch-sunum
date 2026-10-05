# EkoMatch · Techathon Sunumu

Sağlanan içerik planından seçilmiş 23 slaytlık Türkçe interaktif sunum. React, TypeScript, Vite, Framer Motion ve SVG görselleştirmeleri kullanır. Tek büyük logo yalnızca kapanışta görünür.

## Çalıştırma

```bash
npm install
npm run dev -- --host 127.0.0.1
```

Üretim sürümü:

```bash
npm run build
npm run preview -- --host 127.0.0.1
```

## GitHub Pages'e yayınlama

`main` dalına yapılan her gönderim `.github/workflows/deploy-pages.yml`
üzerinden üretim derlemesini otomatik olarak GitHub Pages'e yayınlar. GitHub'da
deponun **Settings → Pages → Source** ayarı **GitHub Actions** olmalıdır.

Vite göreli dosya yolları ürettiği için yayın, depo adından bağımsız olarak
`https://<kullanıcı>.github.io/<depo>/` adresinde çalışır.

Fontlar, logo ve harita yereldir; dış internet servisi gerekmez. Yerel sunucu açık kalmalıdır. Doğrudan file:// veya sunucu kapalıyken yeniden yükleme desteklenmez; service worker kurulmamıştır.

## Kontroller

- Sunum doğrudan açıldığında seslendirmeli Canvas açılışı gelir; tıklama veya Boşluk ile başlar ve 47 saniyelik anlatımın sonunda kapak slaydına geçer.
- Açılışta Sol/Sağ: 2 sn sarma; D: zaman paneli; S: altyazı; M: müzik; R: başa dön; F: tam ekran.
- Ok tuşları, Space, PageUp / PageDown: önceki / sonraki sahne
- F: tam ekran; O: genel görünüm; N: konuşmacı notları
- Home / End: ilk / son sahne
- Tekerlek / trackpad: kesintisiz hareket başına bir sahne
- Yatay dokunma: sahne değiştirir; küçük ekranlarda dikey kaydırma içeriği gösterir
- Açık not veya ek panelinde sahne kısayolları durur. Esc paneli kapatır.
- B2B adımları, kategori matrisi, il haritası, ekonomik döngü, Gantt ve senaryolar etkileşimlidir.

## İçerik

Kapak → Problem / Fırsat → Bugünkü Bakış → Yeni Bakış → Çözüm / Mimari → Uygulama / Yol Haritası → Rekabet / Değer → Ekonomik Katkı → Strateji / Kapanış → Ek: Mevcut Durum.

23 sahneye ek olarak finansal sahnelerde **Hesaplar ve varsayımlar** altında dört ek panel vardır. Gerçek Ek 1–4 dosyaları paylaşılmadığından bu paneller mevcut aritmetiği ve teyit listesini içerir.

- Başlıklar, notlar, içerik, finansal girdiler: `src/data/deckData.ts`
- Güncel sahneler: `src/scenes/Deck.tsx`
- Büyük ekran tipografisi ve yeni tasarım: `src/deck.css`
- Ortak kabuk: `src/styles.css`, `src/components/PresentationShell.tsx`
- İl geometrisi: `src/data/provinces.json`; kaynak: `docs/SOURCES.md`

Eski Scenes.tsx ve projectData.ts önceki sürümdür; uygulama onları kullanmaz.

## Veri doğruluğu ve eksikler

33,4 trilyon TL; 855 / 652 / 564 milyar TL; 10,3 milyon müşteri; 458 şube; 13 kişi; yaklaşık 45 milyon TL maliyet ve 155 + 245 = 400 milyon TL katkı, kullanıcının metninden alınmıştır. Dönemleri ve birincil kaynakları paylaşılmamıştır; gerçekleşmiş veya dışarıdan doğrulanmış sonuç gibi sunulmaz.

- 22 milyar TL için binde 1 hesabı 22 trilyon TL baz gerektirir. Bu baz ve 652 ara tutarının tanımı teyit bekler.
- Kötü / iyi senaryo tutarları verilmemiştir. “Kötü senaryoda bile maliyetin üzerinde” sonucu çıkarılmaz.
- 400 milyon TL için dönem, net/brüt tanımı ve gelir oranları eksiktir; doğrudan ROI hesabı yapılmaz.
- Rol başına kişi ve maliyet kırılımı eksiktir; uydurma halka dilimleri yoktur.
- B2B/B2C örnekleri ve harita sinyalleri temsilidir. Aylık yol haritası dağılımı ve rol listesi öneridir.
- Benchmark kavramsal karşılaştırmadır; doğrulanmış rakip ürün araştırması değildir.

## Test

Sunucu 5173 portunda açıkken:

```bash
npm run lint
npm run build
npm run test:presentation
```

Test macOS Google Chrome kullanır. Farklı ortam için EKOMATCH_CHROME ve EKOMATCH_TEST_URL değişkenlerini ayarlayın. lint betiği TypeScript tip kontrolüdür; ayrı ESLint yapılandırması yoktur.

23 sahne 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024 ve 375×812 boyutlarında kontrol edilir. Klavye, trackpad, tam ekran, genel görünüm, notlar, B2C etkileşimleri, senaryolar, ekler, logo kuralı ve dış internet olmadan yerel çalışma test edilir.

Rapor `test-results/audit.json`, 1920×1080 görüntüleri aynı klasördedir. Headless animasyon ölçümü fiziksel projektör testi veya 60 FPS garantisi değildir. Gerçek salonda yazı okunabilirliği ayrıca kontrol edilmelidir.

Üretim önizlemesi 4173 portunda çalışırken `node tests/production-smoke.mjs` ayrıca 23 sahneyi, dokunmayı, yeniden başlatmayı, odak kilidini, döngüyü ve Gantt seçimini kontrol eder.
