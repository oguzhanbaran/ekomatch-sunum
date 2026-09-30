# EkoMatch Açılış Animasyonu — Codex Prompt

Aşağıdaki metni, bu klasördeki dosyalarla (ekomatch_seslendirme.mp3, logo.png, cues.json) birlikte Codex'e ver.

---

```
EkoMatch sunumunun açılışı için web tabanlı, seslendirmeyle senkron bir ağ
animasyonu hazırla. Ekte üç dosya var:
- ekomatch_seslendirme.mp3 (47,05 sn; zamanlaması analiz edildi)
- logo.png (1672x941, şeffaf arka plan, açık renkli yazı + turkuaz/yeşil ikon)
- cues.json (tüm sahne zamanları, müzik ses seviyeleri, logo koordinatları)

Ekranda logo dışında HİÇBİR yazı olmayacak (altyazı modu hariç, varsayılan kapalı).

## TEKNİK GEREKSİNİMLER
- Tek bir index.html; CSS ve JS aynı dosyada. Canvas 2D kullan (three.js gerekmez).
  Ses, logo ve cues.json aynı klasörden yüklenecek.
- ZAMAN KAYNAĞI SESTİR: Her karede t = voice.currentTime oku ve sahnenin durumunu
  bu t değerinden hesapla (requestAnimationFrame). setTimeout/setInterval ile
  zamanlama YAPMA. Animasyon t'nin saf fonksiyonu olsun; ileri/geri sarınca
  doğru kareyi göstersin.
- Sahne zamanlarını cues.json'daki "sahneler" dizisinden oku; hiçbir saniyeyi
  koda sabit yazma. Geçişler 0,4–0,8 sn ease-in-out yumuşaklıkta olsun.
- Rastgelelik için sabit seed'li bir PRNG (ör. mulberry32) kullan; her oynatma
  birebir aynı görünsün.
- Tarayıcı sesi kullanıcı etkileşimi olmadan başlatmaz: siyah ekranda bekle,
  Boşluk tuşu veya tıklamayla ses ve animasyon birlikte başlasın.
- 16:9 sahneyi 1920x1080 mantıksal koordinatta çiz, pencereye sığacak şekilde
  ölçekle (devicePixelRatio'yu hesaba kat, keskin görünsün). F tuşu tam ekran.
- 60 fps hedefle. Yaklaşık 220 nokta ve 350 çizgi yeterli; parçacık sayısını
  performansa göre sınırla. Glow için shadowBlur yerine önceden hazırlanmış
  radyal gradyan sprite'lar kullan (performans).

## MÜZİK (henüz seçilmedi)
- İkinci bir <audio> elemanı "music.mp3" dosyasını yüklemeyi denesin; dosya
  yoksa sessizce devam et, hata verme.
- Müzik seslendirmeyle aynı anda başlasın; ses seviyesi her karede cues.json'daki
  "muzik" dizisindeki noktalar arasında doğrusal enterpolasyonla ayarlansın.
  21.45'teki kesilme 0,15 sn içinde olsun (keskin sessizlik).
- Senkron kayarsa (|music.currentTime - voice.currentTime| > 0,1 sn) müziği
  voice.currentTime'a eşitle.

## RENK PALETİ (logodan alındı)
- Zemin: #0B1620, merkezi #13283B olan hafif radyal gradyan; çok hafif vinyet.
- Nötr noktalar ve çizgiler: #F3F7F7 (düşük opaklıkta çizgiler).
- Dışarıda kalan ilişki: turuncu #EF8A3C.
- Keşfedilen ilişki: turkuaz #02ABBF → orta yeşil #05AA6A → yeşil #5AC526
  gradyanı (logonun gradyanıyla aynı).
- Müşteri tarafı vurgusu turkuaz #02ABBF, işletme/tedarikçi tarafı yeşil #5AC526.

## NOKTA TÜRLERİ
- Müşteri: küçük (r 2–3 px) beyaz nokta, hafif parıltı.
- İşletme: daha büyük (r 5–7 px) nokta + ince halka; noktaların ~%15'i.
- Noktalar çok yavaş (nefes alır gibi) sürüklensin; ağ asla tamamen durağan olmasın
  (s5_donma sahnesi hariç).

## SAHNELER (id'ler cues.json'daki sahnelerle aynı)
- s0_giris: Karanlık. Merkezde tek bir nokta nabız gibi atar.
- s1_kivilcim_1/2/3: Her biri merkez çevresinde iki nokta arasında kısa, parlak bir
  ışık çizgisi çakar (0,3 sn parlama, sonra soluk kalır). Üç farklı nokta çifti.
- s1_iliski: Üç bağlantı aynı anda parlayıp kalıcı beyaz çizgi olur.
- s2_ag_acilis → s2_ag_tam: Kamera geri çekilir (zoom out ~3x'ten 1x'e);
  çevrede noktalar ve çizgiler dalga gibi belirir. s2_ag_tam'da ağ tamamlanır.
- s3_yeni_iliskiler: Ağda sürekli yeni ince çizgiler çizilir (çizgi uçtan uca
  büyüyerek oluşur).
- s3_bizimle: Merkez bölgedeki çizgilerin bir kısmı hafif turkuaz parlar.
- s3_disimizda: Dış halkadaki çizgilerin bir kısmı turuncuya döner; bağlı
  işletmeler ekran kenarına doğru kayar; turuncu parçacıklar DIŞA doğru akar.
- s4_kurulmus: Kamera ağın üzerinde yavaşça yana kayar (pan); mevcut çizgiler parlak.
- s4_bosluk: Mevcut çizgiler %30 opaklığa kararır. Ağda çizgi olmayan 5–6 boşluk
  alanı seç; bu boşlukların kenarındaki noktalar parlar, böylece göz boşluğu fark
  eder. Boşlukları çizme; karanlık bırak.
- s4_bosluk_vurgu: Boşlukların etrafındaki parıltı en yüksek seviyede.
- s5_donma: Tüm hareket ve parçacıklar durur; ağ %15 opaklığa kararır.
- s5_peki: Ekranın ortasında tek bir turkuaz (#02ABBF) nokta belirir ve yavaşça
  nabız atar.
- s6_zincir_musteri: Turkuaz noktadan radar dalgası (genişleyen ince halka) yayılır.
  Dalga geçtikçe ağ %60 opaklığa geri gelir. Seçili bir müşteri noktası turkuaz yanar.
- s6_zincir_isletme: Müşteriden bir işletmeye, s4'teki boşluklardan birinin içinden
  geçen ışık akar; işletme orta yeşil (#05AA6A) yanar.
- s6_zincir_tedarikci: İşletmeden başka bir işletmeye (tedarikçi) ışık akar;
  tedarikçi yeşil (#5AC526) yanar. Zincir turkuaz→yeşil gradyanlı bir yol olur.
- s6_zincir_cogalma: Aynı türden müşteri→işletme→tedarikçi zincirleri ağın
  farklı yerlerinde 6–8 kez kısa gecikmelerle yanar.
- s7_firsat: s4'teki boşlukların yerinde kesikli turkuaz-yeşil çizgiler belirir
  (kesikler hafifçe akar: lineDashOffset animasyonu).
- s7_duzlesme: Kesikli çizgiler tek tek düz çizgiye dönüşür; turuncuya dönmüş
  çizgiler de turkuaz-yeşile döner, kenara kaymış işletmeler geri gelir;
  parçacıklar artık İÇE doğru akar; ağ en parlak hâline ulaşır.
- s8_toplanma: Ağ merkeze doğru toplanıp silikleşir. s6'daki ilk zincirin turkuaz
  müşteri noktası ve yeşil tedarikçi noktası, logonun iki noktasının ekrandaki
  konumuna doğru hareket eder (koordinatlar cues.json > logo içinde; logo
  ekranda genişliğin %55'i kadar ortalanmış çizilecek, konumları buna göre ölçekle).
- s8_logo: logo.png 0,6 sn içinde belirir (hafif ölçek 0,96→1). İki nokta
  logonun noktalarının tam üstüne oturur ve logoya karışarak kaybolur.
  Arkada ağ %10 opaklıkta silik bir desen olarak kalır.
- s8_slogan_1: Logonun turkuaz noktasının üzerinde tek bir yumuşak nabız (parıltı).
- s8_slogan_2: Logonun yeşil noktasının üzerinde tek bir nabız.
- s8_slogan_3: Arkadaki silik ağ bir kez nefes alır gibi hafifçe genişleyip daralır.
- s9_son_kare: Her şey sabit; logo kalır.
- bitis: window'da "animationEnded" CustomEvent yayınla ve
  window.parent.postMessage({type:"animationEnded"}, "*") gönder
  (sunum iframe içinde çalışırsa bir sonraki slayta geçebilsin).

## PROVA VE HATA AYIKLAMA
- D: Köşede küçük panel aç/kapat: t (2 ondalık), aktif sahne id'si, fps.
- Sol/Sağ ok: 2 sn geri/ileri (ses + müzik + görüntü birlikte).
- R: Başa dön (bekleme ekranına).
- S: Yedek altyazı modu (cues.json'daki "altyazi" alanları, ekranın altında,
  beyaz, 36 px, yarı saydam koyu şerit üzerinde). Varsayılan KAPALI.
- M: Müziği aç/kapat.

## KOD YAPISI
- Her sahneyi ayrı bir fonksiyon olarak yaz; her fonksiyon sahne içi ilerlemeyi
  (0–1) alsın. Ortak yardımcılar: easeInOut, lerp, renk enterpolasyonu,
  seed'li PRNG, glow sprite önbelleği.
- Önce s0–s3 sahnelerini yap ve bırak; ben senkronu kontrol ettikten sonra
  kalan sahnelere devam edeceğiz.
```

---

## Notlar

- **Aşamalı ilerle:** Prompt'un sonundaki "önce s0–s3" satırı kasıtlı. İlk parçayı kontrol edip sonra devam ettirmek, tek seferde tümünü istemekten çok daha iyi sonuç verir.
- **Zamanlama kayarsa:** Kodu değil, sadece `cues.json` içindeki ilgili `t` değerini değiştir. D tuşuyla açılan panel hangi sahnenin kaydığını gösterir.
- **Müzik:** Seçtiğin parçayı `music.mp3` adıyla aynı klasöre koyman yeterli. Ses seviyeleri `cues.json` > `muzik` bölümünden ayarlanır.
