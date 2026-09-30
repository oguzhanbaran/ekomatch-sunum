export type Slide = { id: string; shortTitle: string; eyebrow: string; title: string; note: string; kind: string; chapter?: string }
const s = (id: string, shortTitle: string, eyebrow: string, title: string, kind: string, note: string, chapter?: string): Slide => ({ id, shortTitle, eyebrow, title, kind, note, chapter })

export const scenes: Slide[] = [
  s('acilis', 'Kapak', 'EKOMATCH', 'Yapay Zekâ Destekli Ekonomik İlişki ve Fırsat Keşif Platformu', 'cover', 'Kesikli bağlantı henüz kurulmamış ekonomik ilişkiyi temsil eder. Önce fırsat, sonra reel ticaret ve finansman.'),
  s('problem', 'Problem & Fırsat', 'BÖLÜM 01', 'Ekonomik ilişkiler banka dışında kuruluyor.', 'divider', 'Bankanın müşteri ilişkisi ile müşterinin ticari ilişkisinin aynı ekosistemde kalması arasındaki farkı anlatın.', 'Problem & Fırsat'),
  s('mevcut-durum', 'Mevcut Durum', '01 / PROBLEM & FIRSAT', 'Talep bizde, ekonomik ilişki başka bankada.', 'metrics', 'Bu boşluklar küçük değil. Müşterilerimiz her yıl kartlarımızla yaklaşık 970 milyar lira harcıyor. Ama bunun 590 milyarı başka bankaların POS\'larında gerçekleşiyor. Kart bizim, POS başka bankanın. Rakamlar kullanıcının sağladığı sunum metninden alınmıştır. Referans yıl, tanım ve birincil kaynaklar verilmediğinden dışarıdan doğrulanmış sonuç değildir. 33,4 trilyon TL yıllık kartlı harcama; yaklaşık 970 milyar TL KT kart harcaması; yaklaşık 590 milyar TL diğer banka POS harcaması; 10,3 milyon müşteri ve 453 şube.'),
  s('ekomatch-nedir', 'EkoMatch Nedir?', '01 / PROBLEM & FIRSAT', 'Henüz kurulmamış ilişkiyi keşfet.', 'definition', 'Bankanın geçmiş ekonomik ilişkilerinden öğrenerek henüz oluşmamış potansiyel ilişkileri keşfeden, talep ile arzı buluşturan platform. Keşif, doğrulama, eşleştirme ve finansman aynı değer zinciridir.'),
  s('beyaz-alan', 'Economic White Space', '01 / PROBLEM & FIRSAT', 'Benzerleri bu ilişkiyi kurdu. O henüz kurmadı.', 'heatmap', 'Isı haritası temsili müşteri-kategori ilişkilerini gösterir. Boş hücre kesin ihtiyaç değildir. AI potansiyeli keşfeder, şubeci gerçek ihtiyacı doğrular.'),
  s('cozum', 'Çözüm & Mimari', 'BÖLÜM 02', 'İki ikiz model, tek ekonomik ağ.', 'divider', 'Economic Twin şirketlerin geçmiş ticari ilişkilerinden; Behavioral Twin MCC kategori dizilerinden öğrenir.', 'Çözüm & Mimari'),
  s('yaklasim', 'Mevcut Yaklaşım / EkoMatch', '02 / ÇÖZÜM & MİMARİ', 'Önce ekonomik fırsat, sonra bankacılık ürünü.', 'comparison', 'Mevcut yaklaşım akışı kavramsal karşılaştırmadır; bütün CRM ve kampanya çözümleri için evrensel özellik iddiası değildir.'),
  s('ekonomik-ikiz', 'B2B · Economic Twin', '02 / ÇÖZÜM & MİMARİ', 'Benzer ilişkilerden yeni ticaret.', 'b2b', 'Temsili mobilya atölyesi: benzer atölyelerin kereste tedarikçileriyle finansman-ticaret ilişkileri fırsat sinyali üretir. Şubeci ihtiyacı doğrular. Tedarikçi sıralaması banka garantisi değildir.'),
  s('davranissal-ikiz', 'B2C · Üç White Space', '02 / ÇÖZÜM & MİMARİ', 'Benzer davranışlardan bölgesel talep.', 'b2c', 'Kasap hikâyesi temsilidir: davranışsal ikizlerde görülen kategori ilişkileri müşteride yoksa potansiyel sinyal oluşur. Yeterli ölçekte anonim toplulaştırma ve banka POS kapsaması birlikte değerlendirilir. MCC tam ürünü veya özel hayat olayını göstermez.'),
  s('ekonomik-dongu', 'Ekonomik Döngü', '02 / ÇÖZÜM & MİMARİ', 'B2B ve B2C, aynı ağın iki tarafı.', 'flywheel', 'Bölgesel talep → POS/işyeri fırsatı → işletmede büyüme → yeni tedarikçi → reel ticaret → finansman ve POS → yeni veri → yeniden öğrenme.'),
  s('ai-motoru', 'AI Mimarisi', '02 / ÇÖZÜM & MİMARİ', 'Veriden fırsata. Fırsattan insan kararına.', 'architecture', 'Önerilen mimari beş bloktur: veri, temsil, zekâ, fırsat/karar, deneyim. LLM hesap yapmaz; model ve kural sonuçlarını açıklar. ML modelleri pilot öncesinde doğrulanmalıdır; mevcut doğrulama performansı sunulmamıştır.'),
  s('guven', 'Açıklanabilirlik & Gizlilik', '02 / ÇÖZÜM & MİMARİ', 'Her fırsatın gerekçesi, her verinin sınırı var.', 'privacy', 'Şubeci maketi sentetik örnektir. Güven skoru 82/100 gerçek model başarısı değildir. Bireysel kart verileri içeride kalır; işyerine anonim ve toplu bölgesel sinyal aktarılır. Minimum örneklem eşiği veri yönetişimi tarafından belirlenecektir.'),
  s('teknoloji', 'Teknoloji Yığını', '02 / ÇÖZÜM & MİMARİ', 'Banka içinde çalışan, izlenebilir bir altyapı.', 'stack', 'Bunlar sunumda önerilen teknoloji seçenekleridir; tamamlanmış entegrasyon veya kurulu altyapı iddiası değildir. LLM ve RAG on-prem açıklama katmanıdır.'),
  s('uygulama', 'Uygulama & Yol Haritası', 'BÖLÜM 03', 'Kanıtla. Pilotta ölç. Kontrollü yaygınlaştır.', 'divider', 'Veri erişimi, anonimleştirme, model, açıklama, şube entegrasyonu, pilot ve ölçüm birbirine bağlı iş paketleridir.', 'Uygulama & Yol Haritası'),
  s('yol-haritasi', '12 Aylık Yol Haritası', '03 / UYGULAMA & YOL HARİTASI', 'Her fazın çıktısı ve karar kapısı var.', 'roadmap', 'Fazlar sağlanan metindendir. Aylara dağılım öneri olarak yerleştirilmiştir. Devam/durdur kararları: veri erişimi ve gizlilik, model doğrulaması, pilot etkisi.'),
  s('pilot', 'Pilot & Ölçüm', '03 / UYGULAMA & YOL HARİTASI', 'EkoMatch olmasa bu işlem gerçekleşir miydi?', 'pilot', 'Pilot ve kontrol şubeleri karşılaştırılır. Önce/sonra değişimlerin farkı artımsal etkiyi değerlendirmeye yardımcı olur. Atama ve eşleştirme tasarımı, dönem etkileri ve örneklem yeterliliği pilotta belirlenir.'),
  s('kaynak', 'Kaynak Planı & Maliyet', '03 / UYGULAMA & YOL HARİTASI', '13 kişilik ekip. Yaklaşık 45 milyon TL.', 'resources', '13 kişi ve yaklaşık 45 milyon TL başvuru rakamları olarak kullanıcı metninde belirtilmiştir. Rol başına kişi ve ekip/altyapı/veri/eğitim maliyetleri verilmemiştir. Paylar uydurulmadı; alanlar teyit bekliyor.'),
  s('rekabet', 'Rekabet & Değer', 'BÖLÜM 04', 'Ürünün ötesinde, yeni ekonomik ilişki.', 'divider', 'Karşılaştırma ürün kategorileri düzeyinde kavramsaldır. Adı geçen bir rakibin doğrulanmış yetenek denetimi değildir.', 'Rekabet & Değer'),
  s('benchmark', 'Özellik Karşılaştırması', '04 / REKABET & DEĞER', 'Fark, fırsatın nasıl keşfedildiğinde.', 'benchmark', 'Var/kısmi/yok işaretleri önerilen EkoMatch kapsamını ve tipik kategori odağını gösterir. Ürün bazında farklılaşabilir; araştırılmış rekabet iddiası olarak kullanılmamalıdır.'),
  s('konumlandirma', 'Konumlandırma', '04 / REKABET & DEĞER', 'Yeni ilişki keşfi × ekonomik ilişki odağı.', 'positioning', 'Kavramsal matris. EkoMatch sağ üstte, ağ analitiği sol üstte, kampanya motoru sol altta; CRM/ürün önerisi sağ altta gösterilir. Sağ alttaki yeni ilişki banka ürünü düzeyindedir, EkoMatch’in ticari ilişki keşfiyle aynı değildir.'),
  s('swot', 'SWOT', '04 / REKABET & DEĞER', 'Veri gücünü, kontrollü büyümeye dönüştür.', 'swot', 'Güç: bankaya özgü ilişki verisi, B2B+B2C, açıklanabilirlik ve insan onayı, katılım bankacılığı uyumu. Zayıflık: veri kalitesi, MCC sınırı, soğuk başlangıç, benimsenme. Fırsat ve tehditler stratejik değerlendirmelerdir.'),
  s('riskler', 'Risk Yönetimi', '04 / REKABET & DEĞER', 'Kontrol noktaları, ürünün parçasıdır.', 'risks', 'Gizlilik, yanlış pozitif, tedarikçi algısı ve aşırı otomasyon için tasarım kontrolleri. Kredi ve limit kararları EkoMatch fırsat motoruna bırakılmaz; bankanın yetkili karar süreçleri geçerlidir.'),
  s('ekonomik-firsat', 'Ekonomik Fırsat', 'BÖLÜM 05 / EKONOMİK KATKI', 'Talep bizde, dükkân başka bankada.', 'opportunity', '590 milyar TL hacimdir; gelir kaybı değildir. 970 → 652 → 590 dizisinde 652 ara adımının tanımı verilmemiştir. Binde 1 = 22 milyar TL için gereken baz 22 trilyon TL’dir. 33,4 trilyonun binde 1’i 33,4 milyar; 590 milyarın binde 1’i 590 milyondur. Ek panelde teyit listesi bulunur.'),
  s('bankaya-katki', 'Bankaya Katkısı', '05 / EKONOMİK KATKI', '400 milyon TL katkı projeksiyonu.', 'revenue', '155 milyon TL POS + 245 milyon TL finansman = 400 milyon TL. Gerçekleşmiş sonuç değildir. Net/brüt tanımı ve dönem verilmemiştir. Kötü/iyi senaryoların tutarları eksik olduğundan maliyet üstünde kaldıkları iddia edilemez. 45 milyon maliyet ancak eş dönem/kapsamda karşılaştırılabilir.'),
  s('strateji', 'Kuveyt Türk Stratejileri', 'BÖLÜM 06 / STRATEJİ & KAPANIŞ', 'Reel ekonomiden, sürdürülebilir değere.', 'strategy', 'Strateji ifadeleri kullanıcı tarafından sağlanan sunum metnindendir. Güncel kurumsal strateji belgesi bu çalışmaya eklenmedi; resmî dönem ve kaynak teyit edilmelidir.'),
  s('final', 'Kapanış', 'EKOMATCH', 'Henüz kurulmamış ilişki, keşfedilmeyi bekleyen bir fırsattır.', 'final', 'Talebi keşfet. Arzla buluştur. Ekonomik ağı büyüt. Tek büyük logo yalnızca bu sahnede görünür.'),
]

export const definition = [
  ['Keşif', 'Benzer müşteri ve şirketlerden öğrenerek fırsatı bulur.'],
  ['Doğrulama', 'Şubeci gerçek ihtiyacı teyit eder.'],
  ['Eşleştirme', 'Talebi bankanın ekosistemindeki arzla buluşturur.'],
  ['Finansman', 'Reel ticarete ödeme ve finansmanla hizmet eder.'],
]
export const metrics = [['33,4', 'trilyon TL', 'Türkiye’de yıllık kartlı harcama'], ['~970', 'milyar TL', 'Kuveyt Türk kartlarıyla yapılan harcama'], ['~590', 'milyar TL', 'Diğer bankaların POS’larında'], ['10,3', 'milyon', 'Kuveyt Türk müşterisi'], ['453', 'şube', 'İnsan doğrulaması için temas ağı']]
export const b2bSteps = ['Şirket', 'Benzer şirketler', 'Geçmiş ticaret ve finansman', 'Fırsat alanı', 'Şubeci doğrulaması', 'Tedarikçi eşleşmesi', 'Finansman']
export const b2bStory = [
  ['Mobilya atölyesi', 'Faaliyet, ölçek, finansal profil ve işlem davranışıyla ekonomik temsil oluşturulur.'],
  ['Ekonomik ikizler', 'Benzer atölyelerin kereste tedarikçileriyle kurduğu finansman-ticaret ilişkileri incelenir.'],
  ['İlişki örüntüsü', 'Benzer atölyelerin çoğu bu ilişkiyi kurmuş; incelenen atölye henüz kurmamış.'],
  ['Potansiyel fırsat', 'Kereste tedariki bir görüşme sinyalidir. Kesin ihtiyaç olarak yorumlanmaz.'],
  ['İnsan doğrulaması', 'Müşteri görüşmesinde yeni siparişler için kereste ihtiyacı teyit edilir.'],
  ['Tedarik alternatifleri', 'Bankanın müşterisi olan keresteciler uyuma göre değerlendirilir. Kalite garantisi verilmez.'],
  ['Reel ticaret', 'Tarafların kararıyla yeni ilişki kurulur; ödeme ve finansman ihtiyacı bu ticaretten doğar.'],
]
export const b2cLayers = [['Müşteri', 'Benzerlerimde var, bende yok.'], ['Bölge', 'Anonim sinyaller aynı kategoride yoğunlaşıyor.'], ['İşyeri / POS', 'Talep güçlü, bankanın POS kapsaması zayıf.']]
export const loop = ['Bölgesel talep sinyali', 'POS / işyeri fırsatı', 'İşletmede büyüme', 'Yeni tedarikçi ilişkisi', 'Reel ticaret', 'Finansman + POS', 'Yeni veri', 'Model yeniden öğrenir']
export const architecture = [['Veri', 'Kart · POS · finansman · NACE'], ['Temsil', 'Economic Twin + Behavioral Twin temsilleri'], ['Zekâ', 'Benzerlik · kümeleme · dizi · bağlantı tahmini · skorlama'], ['Fırsat ve karar', 'White Space + insan onayı'], ['Deneyim', 'Şube ve genel müdürlük ekranları']]
export const stack = [['Veri & özellik deposu', 'SQL · feature store'], ['Temsil & vektör', 'pgvector / Milvus'], ['Graf analitiği', 'Graf veritabanı / analitik altyapı'], ['Makine öğrenmesi', 'Kümeleme · dizi · bağlantı tahmini · artımsal etki'], ['LLM & RAG', 'Banka içinde · açıklama katmanı'], ['Servis & MLOps', 'FastAPI · Redis · model izleme']]
export const phases = [
  { name: 'Keşif ve veri erişimi', start: 1, end: 2, output: 'Veri envanteri' },
  { name: 'Veri hazırlama ve anonimleştirme', start: 2, end: 4, output: 'İzinli veri seti' },
  { name: 'B2B ve B2C ikiz modelleri', start: 3, end: 6, output: 'Model prototipleri' },
  { name: 'Fırsat skoru ve açıklama', start: 5, end: 7, output: 'Gerekçeli sinyal' },
  { name: 'Şube ekranı ve entegrasyon', start: 6, end: 9, output: 'Çalışan MVP' },
  { name: 'Kontrollü pilot', start: 9, end: 11, output: 'Test / kontrol ölçümü' },
  { name: 'Ölçüm ve yaygınlaştırma', start: 11, end: 12, output: 'Ölçekleme kararı' },
]
export const team = ['Veri mühendisliği', 'Veri bilimi / ML', 'Ürün ve entegrasyon', 'MLOps / altyapı', 'İş birimi ve pilot', 'Güvenlik ve yönetişim']
export const benchmarkColumns = ['EkoMatch', 'CRM / ürün önerisi', 'Kampanya motoru', 'Mevcut ağ analitiği', 'Pazaryeri']
export const benchmarkRows: { label: string; values: number[] }[] = [
  { label: 'Yeni ekonomik ilişki keşfi', values: [2, 0, 0, 1, 1] },
  { label: 'B2B + B2C tek ağ', values: [2, 1, 1, 1, 1] },
  { label: 'Talep–arz eşleştirmesi', values: [2, 0, 1, 1, 2] },
  { label: 'Bölgesel talep istihbaratı', values: [2, 1, 1, 1, 1] },
  { label: 'Gerekçe + skor', values: [2, 1, 1, 1, 1] },
  { label: 'İnsan onaylı karar', values: [2, 1, 1, 1, 1] },
  { label: 'Önce ticaret, sonra finansman', values: [2, 0, 0, 0, 1] },
]
export const swot = [
  ['Güçlü yönler', ['Bankaya özgü ilişki verisi', 'B2B + B2C tek ağ', 'Açıklanabilir ve insan onaylı', 'Katılım bankacılığıyla uyum']],
  ['Zayıf yönler', ['Veri kalitesine bağımlılık', 'MCC ürünü göstermez', 'Soğuk başlangıç', 'Şubenin benimsemesi gerekli']],
  ['Fırsatlar', ['POS pazar payı artışı', 'Ticari müşteri kazanımı', 'Katılım ekosistemine ihracat', 'Açık bankacılık']],
  ['Tehditler', ['KVKK / BDDK değişiklikleri', 'Yanlış pozitif fırsatlar', 'Tedarikçi riski algısı', 'Model kayması']],
] as const
export const risks = [['Gizlilik', 'Anonimleştirme, toplulaştırma ve minimum örneklem eşiği.'], ['Yanlış pozitif', 'Şubeci doğrulaması, güven skoru ve geri besleme.'], ['Tedarikçi riski', 'Birden fazla alternatif; uyum skoru garanti değildir.'], ['Aşırı otomasyon', 'Kredi ve limit kararları yetkili banka süreçlerinde kalır.']]
export const strategies = [['En güncel teknolojiler', 'Graf, embedding ve açıklanabilir AI ile ekonomik ağ analizi.'], ['Etkin risk yönetimi & aktif kalite', 'Reel ticarete dayalı, insan onaylı finansman.'], ['Müşteriye yalın deneyim', 'Doğru zamanda doğru ilişki; veriye dayalı şube görüşmesi.'], ['Sürdürülebilir yüksek kârlılık', 'Yeni POS ve finansman geliri potansiyeli.'], ['Geleceğin yetkinlikleri & dinamik takımlar', 'Şubeciyi fırsat içgörüsüyle güçlendiren deneyim.']]
export const finances = { pos: 155, financing: 245, total: 400, cost: 45, cardVolume: 970, intermediate: 652, outside: 590, opportunity: 22, share: .001, low: null, high: null } as const
export const appendices = [
  { title: 'Ek 1 · 590 milyar TL hesabı', body: ['Verilen hacim dizisi: 970 → 652 → 590 milyar TL.', 'Aritmetik farklar: 970 − 652 = 318; 652 − 590 = 62 milyar TL. Bu farkların ekonomik tanımı verilmedi.', '652 ara bazının kapsamı, veri dönemi ve dış POS oranı teyit edilmeli. 590 milyar TL gelir kaybı değil, harcama hacmidir.'] },
  { title: 'Ek 2 · 400 milyon TL hesabı', body: ['155 milyon TL POS + 245 milyon TL finansman = 400 milyon TL katkı projeksiyonu.', 'POS hacmi × etkin gelir oranı ve finansman hacmi × etkin marj girdileri paylaşılmadı.', '400 − 45 = 355 milyon TL yalnızca aynı dönem ve kapsamda, 400 maliyet öncesi katkıysa geçerlidir. Net gelir sonucu olarak kullanılmaz.'] },
  { title: 'Ek 3 · Senaryolar ve iki kontrol', body: ['Kötü ve iyi senaryonun sayısal girdileri paylaşılmadı. “Kötü senaryoda bile maliyetin üstünde” iddiası henüz kurulamaz.', 'Üstten kontrol: 22 milyar / 0,001 = 22 trilyon TL baz hacim gerekir. Baz teyit bekliyor.', 'Alttan kontrol: işlem sayısı × ortalama hacim × artımsal dönüşüm; POS ve finansman gelir oranlarıyla ayrı hesaplanmalı.'] },
  { title: 'Ek 4 · Varsayımlar ve teyit planı', body: ['İş birimi: 33,4 trilyon, 970/652/590 milyar, 10,3 milyon müşteri ve 453 şube için tarih, kapsam, kaynak.', 'Finans / ürün: gelir marjları, net/brüt tanımı, senaryo girdileri ve 45 milyon TL maliyetin dönemi.', 'Proje ekibi: 13 kişinin rol dağılımı; ekip, altyapı, veri ve eğitim bütçeleri.', 'Veri yönetişimi ve pilot ekibi: minimum örneklem, model kalibrasyonu, test/kontrol ataması ve ölçüm dönemi.'] },
]
