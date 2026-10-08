import { impactNotes } from './impactModel'
// Eight-minute delivery plan: 47-second opening + 403-second speech + 30-second transition allowance.
const speakerNotes: Record<string, string> = {
  'acilis': `HEDEF SÜRE: 12 saniye

Merhaba. EkoMatch ile bankanın elindeki ekonomik ilişki verisini, yeni ticaret fırsatlarını keşfetmek için kullanmayı öneriyoruz. Amacımız, müşterinin olası talebini doğru işletmeyle buluşturmak ve bu ilişkiden doğan finansal ihtiyaca hizmet etmek.

ANLATIM NOTU
Projenin uzun başlığını kelimesi kelimesine okumak yerine doğrudan ne yaptığını anlat.

AÇILIŞ VE SÜRE PLANI
47 saniyelik açılış videosu oynarken konuşma. Son karede logo göründükten sonra kısa bir duraklama yap ve kapak slaydına geç.
Ana anlatım 6 dakika 43 saniye; video ile birlikte 7 dakika 30 saniye. Kalan 30 saniye geçişler ve duraklamalar için ayrıldı. Süreler prova hedefidir.
Sunumu logolu kapanış slaydında bitir.`,
  'problem': `HEDEF SÜRE: 6 saniye

Müşterimiz bizimle bankacılık ilişkisi kuruyor. Ancak onun alışveriş, tedarik ve ticaret ilişkileri her zaman bizim ekosistemimizde gelişmiyor.

ANLATIM NOTU
Bu bir bölüm geçişi. Beklemeden üçüncü slayta ilerle.`,
  'bugunku-bakis': `Bu ağ temsilidir; ama gerçek bir gerçeği anlatır. 1989'da küçük bir ağla başladık. Her müşteri, her ödeme, her ticaret bu ağa bir çizgi ekledi. Otuz yedi yılda bu ağ bankamızın hafızası oldu. Bugün bu ağda yalnızca kurulmuş ilişkileri görüyoruz. Peki, henüz kurulmamış olanlar?\n\nHEDEF SÜRE: 20 saniye

Bugün müşterimiz hakkında oldukça değerli bilgilere sahibiz. Hangi kartı kullanıyor, hangi finansmanı almış, hangi kategorilerde harcama yapıyor, görebiliyoruz. CRM ve kampanya sistemleri bu kayıtları anlamlandırıyor.

Ancak bu verilerin ortak bir özelliği var: Gerçekleşmiş işlemleri ve kurulmuş ilişkileri gösteriyorlar. Henüz kurulmamış bir ilişkiyi keşfetmek için bu kayıtların arasındaki örüntülere de bakmamız gerekiyor.

ANLATIM NOTU
Son cümlede ağdaki mevcut bağlantılara işaret et. “Henüz kurulmamış” ifadesini vurgula.`,
  'yeni-bakis': `HEDEF SÜRE: 25 saniye

EkoMatch burada farklı bir soru soruyor: Bir müşterinin veya işletmenin benzerlerinde görülen, fakat kendisinde henüz oluşmamış ilişki ne olabilir?

Örneğin benzer akaryakıt istasyonları elektrikli araç şarj ünitesi kurmuş, incelediğimiz istasyon henüz kurmamış olabilir. Bu fark bize görüşmeye değer bir fırsat gösterir.

Buna ekonomik boşluk diyoruz. Bu boşluk kesin ihtiyaç anlamına gelmez. Yapay zekâ sinyali üretir; şubeci müşteriyle görüşerek gerçek ihtiyacı doğrular.

ANLATIM NOTU
Yeni bağlantılar belirirken örneği anlat. “Kesin ihtiyaç anlamına gelmez” cümlesini kısa ve net söyle.`,
  'yaklasim': `HEDEF SÜRE: 22 saniye

Bu slaytta iki farklı başlangıç noktasını karşılaştırıyoruz. Ürün ve kampanya odaklı akışlarda müşteriye uygun bankacılık teklifini belirlemek öne çıkıyor. EkoMatch ise müşterinin kurabileceği yeni ekonomik ilişkiyi araştırarak başlıyor.

Önce fırsat keşfediliyor, ardından ihtiyaç doğrulanıyor ve taraflar buluşuyor. Finansman ihtiyacı bu ticaretin içinden doğuyor.

Bu yaklaşımı mevcut CRM ve kampanya sistemlerini tamamlayan bir fırsat keşif katmanı olarak konumluyoruz.

ANLATIM NOTU
Üst sırayı kısa geç; ağırlığı alttaki EkoMatch akışına ver.`,
  'cozum': `HEDEF SÜRE: 7 saniye

Bu keşfi iki model yaklaşımıyla destekliyoruz: işletmeler için ekonomik ikizler, bireysel müşteriler için davranışsal ikizler. İkisini aynı ekonomik ağda birleştiriyoruz.`,
  'davranissal-ikiz': `Bir örnekle gösterelim. Müşterimiz A market, akaryakıt ve giyimde harcama yapıyor. Harcama davranışı ona benzer yüz müşterinin otuz sekizi yapı market kategorisine girmiş, o henüz girmemiş. Bu bir boşluk; tek bir müşteri için küçük bir sinyal. Biz yalnızca işyeri kategorisine bakıyoruz; ne alındığını ya da nedenini çıkarmıyoruz.
Bu sinyalleri anonim olarak ilçe bazında topladığımızda, özellikle kentsel dönüşümün sürdüğü bölgelerde talebin yoğunlaştığını, bankamızın ticari ağının ise seyrek olduğunu görüyoruz. Bireysel veri bankada kalıyor; işletmeye yalnızca anonim toplam gidiyor.
O bölgedeki bir yapı market zinciri bankamızın müşterisi. Ona ölçek, bölge ve büyüme bakımından en çok benzeyen kırk işletmeye bakıyoruz: yirmi altısı üreticilerden vadeli alımını Tedarikçi Finansmanı ile yapmış, on yedisi ekipmanını finansal kiralamayla finanse etmiş. Bu zincir yapmamış.
Bu bir ihtiyaç tespiti değil, bir görüşme sinyali. Şubemiz görüşüyor; ihtiyaç gerçekse müşterimiz olan üreticileri alternatif olarak sunuyoruz, seçimi taraflar yapıyor. Örnekteki iş yeri, ürün adları ve oranlar temsilidir. Haritada il bazında gösteriyoruz; analiz ilçe bazında yapılıyor.`,
  'ekonomik-dongu': `HEDEF SÜRE: 22 saniye

Bu üç düzey birbirini besleyen bir ekonomik döngü oluşturuyor.

Bir bölgede keşfedilen talep, bir işletme fırsatına dönüşebilir. İşletmenin büyümesi yeni ekipman ve tedarikçi ihtiyacı doğurabilir. Bu ihtiyaç yeni ticareti, ticaret de ödeme ve finansman ilişkilerini oluşturur.

Gerçekleşen işlemler ve şubeciden gelen geri bildirimler modelin öğrenmesine katkı sağlar. Böylece her doğrulanmış ilişki, sonraki fırsatların keşfini destekler.

ANLATIM NOTU
Döngüyü parmağınla veya imleçle takip et. Sekiz adımı ayrı ayrı okumaya çalışma.`,
  'teknoloji': `HEDEF SÜRE: 23 saniye

Önerdiğimiz altyapıyı banka içinde çalışan ve sonuçları izlenebilen bir yapı olarak tasarlıyoruz.

Veri katmanı kart, ödeme ve finansman kayıtlarını hazırlıyor. Benzerlik modelleri ve graf analitiği, müşterilerle işletmeler arasındaki ilişki örüntülerini inceliyor. Makine öğrenmesi bu örüntülerden fırsat sinyalleri ve skorlar üretiyor.

Dil modeli ise fırsatın gerekçesini şubecinin anlayabileceği şekilde açıklıyor. Finansal hesapları ve karar kurallarını tanımlı sistemlerde tutuyor, modellerin performansını ayrıca izliyoruz.

ANLATIM NOTU
Teknoloji isimlerini listelemek yerine her katmanın yaptığı işi anlat.`,
  'uygulama': `HEDEF SÜRE: 6 saniye

Uygulama yaklaşımımız üç aşamalı: Önce teknik olarak kanıtlamak, ardından pilotta iş etkisini ölçmek ve sonuçlara göre kontrollü yaygınlaştırmak.`,
  'yol-haritasi': `Uygulamayı on iki ayda ve aşamalı yapıyoruz. Her aşamanın bir çıktısı var. Dördüncü, sekizinci ve on ikinci aylarda birer karar kapımız var: veri ve gizlilik uygunsa, model doğrulanırsa ve pilot sonuçları olumluysa devam ediyoruz; olmazsa duruyoruz. Pilotu kontrol grubuyla yürütüyoruz: EkoMatch olmasa bu işlem yine olur muydu, buna bakıyoruz.`,
  'yol-haritasi-ek': `HEDEF SÜRE: 26 saniye

Önerdiğimiz on iki aylık planda ilk dört ay veri erişimi, hazırlık ve anonimleştirme çalışmalarına odaklanıyoruz. Üçüncü aydan itibaren ikiz modelleri, ardından fırsat skoru ve açıklama katmanı geliştiriliyor.

Altıncı ile dokuzuncu ay arasında şube ekranı ve entegrasyonları hazırlıyoruz. Dokuzuncu ayda kontrollü pilot başlıyor; son aşamada sonuçları ölçerek yaygınlaştırma kararını veriyoruz.

Dördüncü, sekizinci ve on ikinci aylardaki karar kapılarında veri uygunluğunu, model doğruluğunu ve iş etkisini değerlendiriyoruz. Bu aylık dağılım önerilen çalışma planımız.

ANLATIM NOTU
Yedi satırı ayrı ayrı okumak yerine veri, model, entegrasyon ve pilot olmak üzere dört grupta anlat.`,
  'kaynak': `Ekibi on üç kişi olarak planladık: veri mühendisliği, veri bilimi, ürün ve entegrasyon, altyapı, iş birimi ve güvenlik. Maliyetin yaklaşık yüzde yetmiş sekizi ekip, geri kalanı altyapı, veri ve eğitim. Rakamları FlowVision'da kullandığımız kıdemli fintech kaynak seviyesine göre aldık; gösterge niteliğindedir. Güvenlik ve yönetişim rolü paylaşımlı bir kaynak olarak planlandı.`,
  'rekabet': `HEDEF SÜRE: 6 saniye

EkoMatch’in değerini, yeni ekonomik ilişki keşfini müşteri görüşmesi, eşleştirme ve finansman süreciyle bir araya getirmesinde görüyoruz.`,
  'benchmark': `HEDEF SÜRE: 20 saniye

Buradaki tablo ürün kategorileri düzeyinde kavramsal bir karşılaştırma.

EkoMatch’in önerilen kapsamı; bireysel ve ticari müşteri sinyallerini birlikte değerlendirmek, talebi arzla eşleştirmek ve fırsatı gerekçesiyle şubeciye sunmak üzerine kurulu.

Öne çıkardığımız nokta, keşiften ticarete kadar bütün akışın bağlantılı olması. İnsan doğrulaması da bu akışın bir parçası. Belirli ürünlerin yetenekleri farklılaşabileceği için tabloyu bu çerçevede değerlendirmek gerekiyor.

ANLATIM NOTU
Tablodaki tüm işaretleri okumak yerine üç özellik seç: bireysel ve ticari tek ağ, eşleştirme, insan onayı.`,
  'swot': `HEDEF SÜRE: 26 saniye

Güçlü tarafımız, bankaya özgü ilişki verisini bireysel ve ticari müşteri tarafında birlikte değerlendirebilmek. İnsan onayı ve reel ticarete dayalı yaklaşım da bu gücü destekliyor.

Zayıf taraflarımız veri kalitesine bağımlılık, yeni müşterilerde geçmiş verinin sınırlı olması ve şubelerin sistemi benimseme ihtiyacı.

Fırsat tarafında ticari ağ ve finansmanı büyütme ve yeni ticari ilişkiler kazanma potansiyeli var. Risk tarafında ise yanlış fırsat sinyalleri, gizlilik gereklilikleri ve model performansının zamanla değişmesi bulunuyor. Bu nedenle pilot ölçümü ve insan doğrulamasını merkeze alıyoruz.

ANLATIM NOTU
Dört bölüme sırayla işaret et. Riskleri hızlıca geçiştirmek yerine son cümlede nasıl yöneteceğini bağla.

ZAMAN KONTROLÜ
Bu slaydın sonunda, video dâhil yaklaşık 5:48 hedefle.`,
  'ekonomik-katki': `HEDEF SÜRE: 6 saniye

Şimdi bu yaklaşımın ekonomik karşılığına bakalım. Burada işlem hacmini, bankaya oluşabilecek gelir katkısından ayrı değerlendirmemiz gerekiyor.`,
  'bankaya-katki': impactNotes,
  'strateji-kapanis': `HEDEF SÜRE: 6 saniye

Son olarak, bu yaklaşımın sunumda ele aldığımız Kuveyt Türk strateji başlıklarına nasıl katkı sağlayabileceğini birlikte değerlendirelim.`,
  'strateji': `HEDEF SÜRE: 22 saniye

EkoMatch, güncel yapay zekâ yöntemlerini somut bir müşteri ihtiyacına bağlıyor. Gerekçeli fırsat sinyalleri ve insan doğrulaması, kontrollü karar sürecini destekliyor.

Müşteri açısından doğru zamanda, ihtiyacına uygun bir görüşme hedefliyoruz. Banka açısından yeni ticari finansman ilişkileriyle sürdürülebilir gelir potansiyeli oluşturmayı amaçlıyoruz.

Şubeciye de görüşmesini hazırlayabileceği bir içgörü sunuyoruz: Hangi müşteriyle, hangi olası ihtiyaç hakkında ve hangi gerekçeyle iletişim kurabilir?

ANLATIM NOTU
Kuveyt Türk başlıklarını EkoMatch katkılarıyla eşleştirerek ilerle. Architecht tarafında herkes için yenilikçi ve sürdürülebilir finansal teknolojiler sunmak; finansal teknolojide yapay zekâ dönüşümüne öncülük eden en güvenilir iş ortağı olmak stratejilerini vurgula.`,
  'final': `HEDEF SÜRE: 17 saniye

EkoMatch ile önerimiz, bankanın ekonomik ağını henüz kurulmamış ilişkileri de keşfedebilecek şekilde değerlendirmek.

Yapay zekâ fırsatı görünür kılsın, şubeci ihtiyacı doğrulasın, banka tarafların buluşmasını desteklesin.

Çünkü henüz kurulmamış bir ilişki, keşfedilmeyi bekleyen bir fırsattır.

Talebi keşfet. Arzla buluştur. Ekonomik ağı büyüt.

Teşekkür ederim.

ANLATIM NOTU
Son üç cümleyi yavaş söyle. Teşekkür ettikten sonra logolu kapanış ekranında kal.

ZAMAN KONTROLÜ
Video ve anlatım sonunda 7:30 hedefle. Geçişler ve duraklamalar için ayrılan 30 saniyeyle toplam süre 8 dakika.`,
  'mevcut-durum': `EK SLAYT — SORU GELİRSE
HEDEF SÜRE: 30–35 saniye; ana 8 dakikalık anlatıma dâhil değil.

Bu ek slayt, fırsatın ölçeğini değerlendirmek için kullandığımız çalışma rakamlarını bir arada gösteriyor.

Sunumda Türkiye’de yıllık kartlı harcama hacmi otuz üç virgül dört trilyon lira, Kuveyt Türk kartlarıyla yapılan harcama yaklaşık sekiz yüz elli beş milyar lira olarak yer alıyor.

On virgül üç milyon müşteri ve dört yüz elli sekiz şubelik yapı da önerdiğimiz keşif ve insan doğrulaması yaklaşımının ölçeğini anlatıyor.

Bu verilerin dönem ve kapsamlarını eşleştirerek pilot hedeflerini netleştirmemiz gerekiyor.

ANLATIM NOTU
Bu slaydı ana sunuma eklemek yerine hacim, müşteri tabanı veya uygulama ölçeği sorulduğunda kullan.`,
}

export type Slide = { id: string; shortTitle: string; eyebrow: string; title: string; note: string; kind: string; chapter?: string }
const s = (id: string, shortTitle: string, eyebrow: string, title: string, kind: string, note: string, chapter?: string): Slide => ({ id, shortTitle, eyebrow, title, kind, note: speakerNotes[id] ? (note ? `${speakerNotes[id]}\n\nEK HATIRLATMA\n${note}` : speakerNotes[id]) : note, chapter })

export const scenes: Slide[] = [
  s('acilis', 'Kapak', 'EKOMATCH', 'Yapay Zekâ Destekli Ekonomik İlişki ve Fırsat Keşif Platformu', 'cover', 'Kesikli bağlantı henüz kurulmamış ekonomik ilişkiyi temsil eder. Önce fırsat, sonra reel ticaret ve finansman.'),
  s('problem', 'Problem & Fırsat', 'BÖLÜM 01', 'Ağın görünen ve görünmeyen yanı.', 'divider', 'Bankanın müşteri ilişkisi ile müşterinin ticari ilişkisinin aynı ekosistemde kalması arasındaki farkı anlatın.', 'Temel Fikir'),
  s('bugunku-bakis', 'Bugünkü Bakış', '01 / BUGÜNKÜ BAKIŞ', 'Bugün, kurulmuş ilişkileri görüyoruz.', 'perspective', 'Bankalar müşterilerine bakarken hep var olana bakar: hangi kartı kullanıyor, hangi krediyi almış, nerede harcıyor. Bu çok değerli, ama resmin sadece bir kısmı.'),
  s('yeni-bakis', 'Yeni Bakış', '02 / YENİ BAKIŞ', 'EkoMatch, henüz kurulmamış olanlara bakıyor.', 'perspective', 'Birbirine benzeyen müşteriler ve işletmeler çoğu zaman benzer ilişkiler kurar. Benzerlerinin kurduğu ama bir müşterinin henüz kurmadığı ilişki bir boşluktur. EkoMatch bu boşlukları görür; her biri bankanın önceden görebileceği bir fırsattır.\n\nBenzerlerini buluyoruz: davranışı ve yapısı birbirine benzeyen müşteri ve işletmeleri. Sonra boşluğu görüyoruz: benzerlerinde kurulmuş, ona henüz kurulmamış ilişkiyi. En sonunda şubemiz doğruluyor ve banka ilişkinin kurulmasını destekliyor.'),
  s('ekomatch-nedir', 'NASIL ÇALIŞIR?', '01 / PROBLEM & FIRSAT', 'EkoMatch dört adımda çalışır.', 'definition', 'EkoMatch dört adımda çalışıyor. Önce benzerlerinin geçmişinden öğrenip henüz kurulmamış ilişkileri buluyor. Bu fırsat gerekçesiyle şubemize geliyor ve gerçek ihtiyacı şubemiz doğruluyor; yapay zekâ kararı kendi başına vermiyor. İhtiyaç doğrulanırsa uygun alternatifler sunuluyor, seçimi taraflar yapıyor. Kurulan ticaretin üzerine de finansman geliyor.'),
  s('cozum', 'Çözüm & Mimari', 'BÖLÜM 02', 'İki model, tek ekonomik ağ.', 'divider', 'Economic Twin şirketlerin geçmiş ticari ilişkilerinden; Behavioral Twin işyeri kategorisi dizilerinden öğrenir.', 'Çözüm & Mimari'),
  s('davranissal-ikiz', 'BİR ÖRNEK', '02 / ÇÖZÜM & MİMARİ', 'Bir müşteriden bir tedarik zincirine.', 'b2c', ''),
  s('ekonomik-dongu', 'Ekonomik Döngü', '02 / ÇÖZÜM & MİMARİ', 'Talep ve arz, aynı ağın iki tarafı.', 'flywheel', 'Bölgesel talep sinyali → işletme fırsatı → şubeci doğrular → tedarikçi alternatifleri → reel ticaret → finansman → yeni veri → model yeniden öğrenir.'),
  s('teknoloji', 'Teknoloji Yığını', '02 / ÇÖZÜM & MİMARİ', 'Banka içinde çalışan, izlenebilir bir altyapı.', 'stack', 'Bunlar sunumda önerilen teknoloji seçenekleridir; tamamlanmış entegrasyon veya kurulu altyapı iddiası değildir. LLM ve RAG on-prem açıklama katmanıdır.'),
  s('uygulama', 'Uygulama & Yol Haritası', 'BÖLÜM 03', 'Kanıtla. Pilotta ölç. Kontrollü yaygınlaştır.', 'divider', 'Veri erişimi, anonimleştirme, model, açıklama, şube entegrasyonu, pilot ve ölçüm birbirine bağlı iş paketleridir.', 'Uygulama & Yol Haritası'),
  s('yol-haritasi', '12 Aylık Yol Haritası', '03 / UYGULAMA & YOL HARİTASI', 'Her fazın çıktısı ve karar kapısı var.', 'roadmap', ''),
  s('kaynak', 'Kaynak Planı & Maliyet', '03 / UYGULAMA & YOL HARİTASI', '13 kişilik ekip, 12 ay, yaklaşık 45 milyon TL.', 'resources', ''),
  s('rekabet', 'Rekabet & Değer', 'BÖLÜM 04', 'Ürünün ötesinde, yeni ekonomik ilişki.', 'divider', 'Karşılaştırma ürün kategorileri düzeyinde kavramsaldır. Adı geçen bir rakibin doğrulanmış yetenek denetimi değildir.', 'Rekabet & Değer'),
  s('swot', 'SWOT', '04 / REKABET & DEĞER', 'Güçlü veri, kontrollü büyüme.', 'swot', 'Güç: bankaya özgü ilişki verisi, bireysel ve ticari tek ağ, açıklanabilirlik ve insan onayı, katılım bankacılığı uyumu. Zayıflık: veri kalitesi, kategori verisinin sınırı, soğuk başlangıç, benimsenme. Fırsat ve tehditler stratejik değerlendirmelerdir.'),
  s('ekonomik-katki', 'Ekonomik Katkı', 'BÖLÜM 05', 'Potansiyelden ölçülebilir katkıya.', 'divider', 'Ekonomik katkı bölümüne geçiş. Hacim ile gelir projeksiyonunu ayrı değerlendirin.', 'Ekonomik Katkı'),
  s('bankaya-katki', 'ETKİ', '05 / EKONOMİK KATKI', 'Her ilişki, büyüyen gelir potansiyeli.', 'revenue', ''),
  s('strateji-kapanis', 'Strateji & Kapanış', 'BÖLÜM 06', 'Stratejiyi reel ticaretle buluştur.', 'divider', 'Strateji ve kapanış bölümüne geçiş.', 'Strateji & Kapanış'),
  s('strateji', 'Kuveyt Türk & Architecht Stratejileri', '06 / STRATEJİ & KAPANIŞ', 'Reel ekonomiden, sürdürülebilir değere.', 'strategy', 'Strateji ifadeleri kullanıcı tarafından sağlanan sunum metnindendir. Güncel kurumsal strateji belgesi bu çalışmaya eklenmedi; resmî dönem ve kaynak teyit edilmelidir.'),
  s('final', 'Kapanış', 'EKOMATCH', 'Henüz kurulmamış ilişki, keşfedilmeyi bekleyen bir fırsattır.', 'final', 'Talebi keşfet. Arzla buluştur. Ekonomik ağı büyüt. Tek büyük logo yalnızca bu sahnede görünür.'),
]

export const definition = ['Keşif', 'Doğrulama', 'Eşleştirme', 'Finansman']
export const metrics = [['33,4', 'trilyon TL', 'Türkiye’de yıllık kartlı harcama'], ['~855', 'milyar TL', 'Kuveyt Türk kartlarıyla yapılan harcama'], ['10,3', 'milyon', 'Kuveyt Türk müşterisi'], ['458', 'şube', 'İnsan doğrulaması için temas ağı']]
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
export const b2cLayers = [['Müşteri', 'Benzerlerinde var, bu müşteride yok.'], ['Bölge', 'Talep yoğunlaşıyor, bankanın ticari ağı seyrek.'], ['İşletme', 'Benzerlerinde var, bu işletmede yok.']]
export const loop = ['Bölgesel talep sinyali', 'İşletme fırsatı', 'Şubeci doğrular', 'Tedarikçi alternatifleri', 'Reel ticaret', 'Finansman', 'Yeni veri', 'Model yeniden öğrenir']
export const loopDetails = [
  { label: 'BİREY → BÖLGE', description: 'Bireysel sinyaller anonim toplanır; hangi kategoride talebin yoğunlaştığı görünür.' },
  { label: 'BÖLGE → İŞLETME', description: 'Talebin yoğunlaştığı bölgede, talebi karşılayabilecek işletmeler belirlenir.' },
  { label: 'İNSAN KARARI', description: 'Fırsat gerekçesiyle gelir; gerçek ihtiyacı kullanıcı doğrular.' },
  { label: 'İŞLETME → TEDARİKÇİ', description: 'Doğrulanan ihtiyaç için bankanın müşterisi olan birden fazla tedarikçi sunulur.' },
  { label: 'TİCARET', description: 'Taraflar ticareti kendi seçimleriyle kurar; banka tedarikçiyi garanti etmez.' },
  { label: 'FİNANSMAN', description: 'Kurulan ticarete uygun finansman eşlik eder; kredi kararı bankada, insan onayıyla verilir.' },
  { label: 'VERİ', description: 'Gerçekleşen ve gerçekleşmeyen her sonuç sisteme geri beslenir.' },
  { label: 'ÖĞRENME', description: 'Sonuçlar benzerlik ve skorlama modellerini iyileştirir; döngü yeniden başlar.' },
]
export const architecture = [['Veri', 'Kart · ödeme · finansman · NACE'], ['Temsil', 'Economic Twin + Behavioral Twin temsilleri'], ['Zekâ', 'Benzerlik · kümeleme · dizi · bağlantı tahmini · skorlama'], ['Fırsat ve karar', 'Fırsat keşfi + insan onayı'], ['Deneyim', 'Şube ve genel müdürlük ekranları']]
export const stack = [['Veri & özellik deposu', 'SQL · feature store'], ['Temsil & vektör', 'pgvector / Milvus'], ['Graf analitiği', 'Graf veritabanı / analitik altyapı'], ['Makine öğrenmesi', 'Kümeleme · dizi · bağlantı tahmini · artımsal etki'], ['LLM & RAG', 'Banka içinde · açıklama katmanı'], ['Servis & MLOps', 'FastAPI · Redis · model izleme']]
export const phases = [
  { name: 'Veri erişimi ve anonimleştirme', start: 1, end: 4, output: 'İzinli veri seti' },
  { name: 'Benzerlik modelleri ve fırsat açıklaması', start: 3, end: 8, output: 'Gerekçeli sinyal' },
  { name: 'Şube ekranı ve entegrasyon', start: 6, end: 9, output: 'Çalışan prototip' },
  { name: 'Kontrollü pilot', start: 9, end: 11, output: 'Test / kontrol ölçümü' },
  { name: 'Ölçüm ve karar', start: 11, end: 12, output: 'Ölçekleme kararı' },
]
export const detailedPhases = [
  { name: 'Keşif ve veri erişimi', start: 1, end: 2, output: 'Veri envanteri' },
  { name: 'Veri hazırlama ve anonimleştirme', start: 2, end: 4, output: 'İzinli veri seti' },
  { name: 'Benzerlik modelleri', start: 3, end: 6, output: 'Model prototipleri' },
  { name: 'Fırsat skoru ve açıklama', start: 5, end: 7, output: 'Gerekçeli sinyal' },
  { name: 'Şube ekranı ve entegrasyon', start: 6, end: 9, output: 'Çalışan prototip' },
  { name: 'Kontrollü pilot', start: 9, end: 11, output: 'Test / kontrol ölçümü' },
  { name: 'Ölçüm ve yaygınlaştırma', start: 11, end: 12, output: 'Ölçekleme kararı' },
]
export const team = [
  { role: 'Veri mühendisliği', people: 3, cost: 7.6 },
  { role: 'Veri bilimi / ML', people: 3, cost: 8.6 },
  { role: 'Ürün ve entegrasyon', people: 3, cost: 8.7 },
  { role: 'MLOps / altyapı', people: 1, cost: 3.2 },
  { role: 'İş birimi ve pilot', people: 2, cost: 5.4 },
  { role: 'Güvenlik ve yönetişim', people: 1, cost: 1.5 },
]
export const costBreakdown = [
  { name: 'Ekip', cost: 35, color: '#0A6B5C' },
  { name: 'Altyapı', cost: 6, color: '#13283B' },
  { name: 'Veri', cost: 2, color: '#5E9E93' },
  { name: 'Eğitim', cost: 2, color: '#A8CCC4' },
]
export const benchmarkColumns = ['EkoMatch', 'CRM / ürün önerisi', 'Kampanya motoru', 'Mevcut ağ analitiği', 'Pazaryeri']
export const benchmarkRows: { label: string; values: number[] }[] = [
  { label: 'Yeni ekonomik ilişki keşfi', values: [2, 0, 0, 1, 1] },
  { label: 'Bireysel + ticari tek ağ', values: [2, 1, 1, 1, 1] },
  { label: 'Talep–arz eşleştirmesi', values: [2, 0, 1, 1, 2] },
  { label: 'Bölgesel talep istihbaratı', values: [2, 1, 1, 1, 1] },
  { label: 'Gerekçe + skor', values: [2, 1, 1, 1, 1] },
  { label: 'İnsan onaylı karar', values: [2, 1, 1, 1, 1] },
  { label: 'Önce ticaret, sonra finansman', values: [2, 0, 0, 0, 1] },
]
export const swot = [
  ['Güçlü yönler', ['Bankaya özgü ilişki verisi', 'Bireysel + ticari tek ağ', 'Katılım bankacılığıyla uyum']],
  ['Zayıf yönler', ['Veri kalitesine bağımlılık', 'Kategori, ürünü göstermez']],
  ['Fırsatlar', ['Ticari ağ ve finansman büyümesi', 'Ticari müşteri kazanımı', 'Katılım ekosistemine ihracat']],
  ['Tehditler', ['Yanlış pozitif fırsatlar', 'Tedarikçi riski algısı']],
] as const
export const risks = [['Gizlilik', 'Anonimleştirme, toplulaştırma ve minimum örneklem eşiği.'], ['Yanlış pozitif', 'Şubeci doğrulaması, güven skoru ve geri besleme.'], ['Tedarikçi riski', 'Birden fazla alternatif; uyum skoru garanti değildir.'], ['Aşırı otomasyon', 'Kredi ve limit kararları yetkili banka süreçlerinde kalır.']]
export const strategies = [['En güncel teknolojiler', 'Benzerlik modelleri ve açıklanabilir yapay zekâ ile ekonomik ağ analizi.'], ['Etkin risk yönetimi & aktif kalite', 'Reel ticarete dayalı, insan onaylı finansman.'], ['Müşteriye yalın deneyim', 'Doğru zamanda doğru ilişki; veriye dayalı şube görüşmesi.'], ['Sürdürülebilir yüksek kârlılık', 'Yeni ticari finansman geliri potansiyeli.'], ['Geleceğin yetkinlikleri & dinamik takımlar', 'Şubeciyi fırsat içgörüsüyle güçlendiren deneyim.']]

export const architechtStrategies = [
  'Herkes için yenilikçi ve sürdürülebilir finansal teknolojiler sunmak.',
  'Finansal teknolojide yapay zekâ dönüşümüne öncülük eden en güvenilir iş ortağı olmak.',
] as const

export const teamMembers = [
  ['Oğuzhan Baran', 'Architecht', 'Fon Tahsis ve Kontrol', new URL('../../oguzhan.png', import.meta.url).href],
  ['Abdurrahman Şahin', 'Architecht', 'Alacak Yönetimi ve Muhasebe', new URL('../../abdurrahman.png', import.meta.url).href],
  ['Muhammed Osman Kutlu', 'Architecht', 'Fon Tahsis ve Kontrol', new URL('../../osman.png', import.meta.url).href],
  ['Resul Pala', 'Architecht', 'Fon Tahsis ve Kontrol', new URL('../../resul.png', import.meta.url).href],
  ['Zafer Uçar', 'Kuveyt Türk', 'Bireysel Kredi Analitiği', new URL('../../zafer.png', import.meta.url).href],
] as const
