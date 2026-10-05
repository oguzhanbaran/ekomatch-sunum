// Eight-minute delivery plan: 47-second opening + 403-second speech + 30-second transition allowance.
const speakerNotes: Record<string, string> = {
  'acilis': `HEDEF SÜRE: 12 saniye

Merhaba. EkoMatch ile bankanın elindeki ekonomik ilişki verisini, yeni ticaret fırsatlarını keşfetmek için kullanmayı öneriyoruz. Amacımız, müşterinin olası talebini doğru işletmeyle buluşturmak ve bu ilişkiden doğan finansal ihtiyaca hizmet etmek.

ANLATIM NOTU
Projenin uzun başlığını kelimesi kelimesine okumak yerine doğrudan ne yaptığını anlat.

AÇILIŞ VE SÜRE PLANI
47 saniyelik açılış videosu oynarken konuşma. Son karede logo göründükten sonra kısa bir duraklama yap ve kapak slaydına geç.
Ana anlatım 6 dakika 43 saniye; video ile birlikte 7 dakika 30 saniye. Kalan 30 saniye geçişler ve duraklamalar için ayrıldı. Süreler prova hedefidir.
22. slayt soru gelirse kullanılacak ektir; ana sunumu 21. slaytta bitir.`,
  'problem': `HEDEF SÜRE: 6 saniye

Müşterimiz bizimle bankacılık ilişkisi kuruyor. Ancak onun alışveriş, tedarik ve ticaret ilişkileri her zaman bizim ekosistemimizde gelişmiyor.

ANLATIM NOTU
Bu bir bölüm geçişi. Beklemeden üçüncü slayta ilerle.`,
  'bugunku-bakis': `HEDEF SÜRE: 20 saniye

Bugün müşterimiz hakkında oldukça değerli bilgilere sahibiz. Hangi kartı kullanıyor, hangi finansmanı almış, hangi kategorilerde harcama yapıyor, görebiliyoruz. CRM ve kampanya sistemleri bu kayıtları anlamlandırıyor.

Ancak bu verilerin ortak bir özelliği var: Gerçekleşmiş işlemleri ve kurulmuş ilişkileri gösteriyorlar. Henüz kurulmamış bir ilişkiyi keşfetmek için bu kayıtların arasındaki örüntülere de bakmamız gerekiyor.

ANLATIM NOTU
Son cümlede ağdaki mevcut bağlantılara işaret et. “Henüz kurulmamış” ifadesini vurgula.`,
  'yeni-bakis': `HEDEF SÜRE: 25 saniye

EkoMatch burada farklı bir soru soruyor: Bir müşterinin veya işletmenin benzerlerinde görülen, fakat kendisinde henüz oluşmamış ilişki ne olabilir?

Örneğin benzer akaryakıt istasyonları elektrikli araç şarj ünitesi kurmuş, incelediğimiz istasyon henüz kurmamış olabilir. Bu fark bize görüşmeye değer bir fırsat gösterir.

Buna ekonomik boşluk, yani White Space diyoruz. Bu boşluk kesin ihtiyaç anlamına gelmez. Yapay zekâ sinyali üretir; şubeci müşteriyle görüşerek gerçek ihtiyacı doğrular.

ANLATIM NOTU
Yeni bağlantılar belirirken örneği anlat. “Kesin ihtiyaç anlamına gelmez” cümlesini kısa ve net söyle.`,
  'yaklasim': `HEDEF SÜRE: 22 saniye

Bu slaytta iki farklı başlangıç noktasını karşılaştırıyoruz. Ürün ve kampanya odaklı akışlarda müşteriye uygun bankacılık teklifini belirlemek öne çıkıyor. EkoMatch ise müşterinin kurabileceği yeni ekonomik ilişkiyi araştırarak başlıyor.

Önce fırsat keşfediliyor, ardından ihtiyaç doğrulanıyor ve taraflar buluşuyor. Finansman ve POS ihtiyacı bu ticaretin içinden doğuyor.

Bu yaklaşımı mevcut CRM ve kampanya sistemlerini tamamlayan bir fırsat keşif katmanı olarak konumluyoruz.

ANLATIM NOTU
Üst sırayı kısa geç; ağırlığı alttaki EkoMatch akışına ver.`,
  'cozum': `HEDEF SÜRE: 7 saniye

Bu keşfi iki model yaklaşımıyla destekliyoruz: işletmeler için ekonomik ikizler, bireysel müşteriler için davranışsal ikizler. İkisini aynı ekonomik ağda birleştiriyoruz.`,
  'davranissal-ikiz': `HEDEF SÜRE: 42 saniye

Fırsatları üç düzeyde ele alıyoruz.

İlk düzey müşteri. Örneğin benzer harcama davranışlarına sahip kişilerde ev ve yapı kategorisi görülürken, bu müşteride henüz görünmeyebilir. Burada potansiyel bir kategori ilişkisi yakalıyoruz.

İkinci düzey bölge. Benzer sinyalleri yeterli ölçekte anonim olarak bir araya getirip hangi bölgede talep yoğunlaştığını inceliyoruz. Bunu bankanın POS kapsamasıyla birlikte değerlendiriyoruz.

Üçüncü düzey işyeri. Örneğin benzer fırınların kullandığı bir üretim ekipmanı, bu işletmede henüz bulunmayabilir. Bu da şubecinin görüşmesinde ele alabileceği bir fırsat oluşturur.

Bu örnekler temsilidir. Harcama kategorisi verisi tek başına tam ürünü veya kesin ihtiyacı göstermez; her fırsatın doğrulanması gerekir.

ANLATIM NOTU
Önce Müşteri ekranını göster. İkinci paragrafta Bölge’ye, üçüncü paragrafta İşyeri’ne geç. İşyeri örneğinde “Mahalle fırını”nı seç. Bütün örnekleri tek tek açma.

ZAMAN KONTROLÜ
Bu slaydın sonunda, video dâhil yaklaşık 3:23 hedefle.`,
  'ekonomik-dongu': `HEDEF SÜRE: 22 saniye

Bu üç düzey birbirini besleyen bir ekonomik döngü oluşturuyor.

Bir bölgede keşfedilen talep, yeni bir işyeri veya POS ilişkisine dönüşebilir. İşletmenin büyümesi yeni ekipman ve tedarikçi ihtiyacı doğurabilir. Bu ihtiyaç yeni ticareti, ticaret de ödeme ve finansman ilişkilerini oluşturur.

Gerçekleşen işlemler ve şubeciden gelen geri bildirimler modelin öğrenmesine katkı sağlar. Böylece her doğrulanmış ilişki, sonraki fırsatların keşfini destekler.

ANLATIM NOTU
Döngüyü parmağınla veya imleçle takip et. Sekiz adımı ayrı ayrı okumaya çalışma.`,
  'teknoloji': `HEDEF SÜRE: 23 saniye

Önerdiğimiz altyapıyı banka içinde çalışan ve sonuçları izlenebilen bir yapı olarak tasarlıyoruz.

Veri katmanı kart, POS ve finansman kayıtlarını hazırlıyor. Benzerlik modelleri ve graf analitiği, müşterilerle işletmeler arasındaki ilişki örüntülerini inceliyor. Makine öğrenmesi bu örüntülerden fırsat sinyalleri ve skorlar üretiyor.

Dil modeli ise fırsatın gerekçesini şubecinin anlayabileceği şekilde açıklıyor. Finansal hesapları ve karar kurallarını tanımlı sistemlerde tutuyor, modellerin performansını ayrıca izliyoruz.

ANLATIM NOTU
Teknoloji isimlerini listelemek yerine her katmanın yaptığı işi anlat.`,
  'uygulama': `HEDEF SÜRE: 6 saniye

Uygulama yaklaşımımız üç aşamalı: Önce teknik olarak kanıtlamak, ardından pilotta iş etkisini ölçmek ve sonuçlara göre kontrollü yaygınlaştırmak.`,
  'yol-haritasi': `HEDEF SÜRE: 26 saniye

Önerdiğimiz on iki aylık planda ilk dört ay veri erişimi, hazırlık ve anonimleştirme çalışmalarına odaklanıyoruz. Üçüncü aydan itibaren ikiz modelleri, ardından fırsat skoru ve açıklama katmanı geliştiriliyor.

Altıncı ile dokuzuncu ay arasında şube ekranı ve entegrasyonları hazırlıyoruz. Dokuzuncu ayda kontrollü pilot başlıyor; son aşamada sonuçları ölçerek yaygınlaştırma kararını veriyoruz.

Dördüncü, sekizinci ve on ikinci aylardaki karar kapılarında veri uygunluğunu, model doğruluğunu ve iş etkisini değerlendiriyoruz. Bu aylık dağılım önerilen çalışma planımız.

ANLATIM NOTU
Yedi satırı ayrı ayrı okumak yerine veri, model, entegrasyon ve pilot olmak üzere dört grupta anlat.`,
  'kaynak': `HEDEF SÜRE: 16 saniye

Başvuru planındaki kaynak ihtiyacımız on üç kişilik ekip ve yaklaşık kırk beş milyon liralık bütçe.

Veri mühendisliği, veri bilimi, ürün, entegrasyon, altyapı ve iş birimi yetkinliklerini birlikte ele alıyoruz. Bu aşamada toplam kaynak çerçevesi belirli; rol bazlı kişi dağılımı ve maliyet kalemlerinin ayrıntıları planlama sürecinde netleştirilecek.`,
  'rekabet': `HEDEF SÜRE: 6 saniye

EkoMatch’in değerini, yeni ekonomik ilişki keşfini müşteri görüşmesi, eşleştirme ve finansman süreciyle bir araya getirmesinde görüyoruz.`,
  'benchmark': `HEDEF SÜRE: 20 saniye

Buradaki tablo ürün kategorileri düzeyinde kavramsal bir karşılaştırma.

EkoMatch’in önerilen kapsamı; bireysel ve ticari müşteri sinyallerini birlikte değerlendirmek, talebi arzla eşleştirmek ve fırsatı gerekçesiyle şubeciye sunmak üzerine kurulu.

Öne çıkardığımız nokta, keşiften ticarete kadar bütün akışın bağlantılı olması. İnsan doğrulaması da bu akışın bir parçası. Belirli ürünlerin yetenekleri farklılaşabileceği için tabloyu bu çerçevede değerlendirmek gerekiyor.

ANLATIM NOTU
Tablodaki tüm işaretleri okumak yerine üç özellik seç: B2B+B2C, eşleştirme, insan onayı.`,
  'swot': `HEDEF SÜRE: 26 saniye

Güçlü tarafımız, bankaya özgü ilişki verisini bireysel ve ticari müşteri tarafında birlikte değerlendirebilmek. İnsan onayı ve reel ticarete dayalı yaklaşım da bu gücü destekliyor.

Zayıf taraflarımız veri kalitesine bağımlılık, yeni müşterilerde geçmiş verinin sınırlı olması ve şubelerin sistemi benimseme ihtiyacı.

Fırsat tarafında POS payını artırma ve yeni ticari ilişkiler kazanma potansiyeli var. Risk tarafında ise yanlış fırsat sinyalleri, gizlilik gereklilikleri ve model performansının zamanla değişmesi bulunuyor. Bu nedenle pilot ölçümü ve insan doğrulamasını merkeze alıyoruz.

ANLATIM NOTU
Dört bölüme sırayla işaret et. Riskleri hızlıca geçiştirmek yerine son cümlede nasıl yöneteceğini bağla.

ZAMAN KONTROLÜ
Bu slaydın sonunda, video dâhil yaklaşık 5:48 hedefle.`,
  'ekonomik-katki': `HEDEF SÜRE: 6 saniye

Şimdi bu yaklaşımın ekonomik karşılığına bakalım. Burada işlem hacmini, bankaya oluşabilecek gelir katkısından ayrı değerlendirmemiz gerekiyor.`,
  'ekonomik-firsat': `HEDEF SÜRE: 26 saniye

Sunumda kullandığımız çalışma rakamlarına göre, Kuveyt Türk kartlarıyla yapılan yaklaşık sekiz yüz elli beş milyar liralık harcamanın beş yüz altmış dört milyarı diğer bankaların POS’larında gerçekleşiyor.

Bu, müşterimizle başlayan ödeme ilişkisinin işyeri tarafında başka bir bankaya uzandığını gösteriyor. EkoMatch ile talebin yoğunlaştığı alanları görerek işyeri ve POS kazanımını daha hedefli hâle getirmeyi amaçlıyoruz.

Ekrandaki yirmi iki milyar liralık fırsat senaryosunun hesap bazı ise teyit bekliyor; bu tutarı kesin kazanım olarak değerlendirmiyoruz.

ANLATIM NOTU
Ana mesaj “kart müşterisi bizde, işyeri ilişkisi başka bankada”. 652 ara tutarının tanımı sorulursa mevcut hesapta teyit beklediğini açıkça söyle.`,
  'bankaya-katki': `HEDEF SÜRE: 25 saniye

Sunumdaki katkı projeksiyonu iki kalemden oluşuyor: yüz elli beş milyon lira POS ve iki yüz kırk beş milyon lira finansman katkısı. Toplamda dört yüz milyon liralık bir potansiyel öngörülüyor.

Bu tutar gerçekleşmiş gelir değil. Dönem, gelir marjları ve net veya brüt tanımı netleştirilmeli; ardından pilotta ölçülen dönüşüm oranlarıyla doğrulanmalı.

Yaklaşık kırk beş milyon liralık maliyetle sağlıklı karşılaştırma yapmak için de aynı dönem ve kapsamı kullanmamız gerekiyor.

ANLATIM NOTU
Beklenen senaryoda kal. Sayısal girdileri olmayan iyi ve kötü senaryolar hakkında getiri iddiasında bulunma.`,
  'strateji-kapanis': `HEDEF SÜRE: 6 saniye

Son olarak, bu yaklaşımın sunumda ele aldığımız Kuveyt Türk strateji başlıklarına nasıl katkı sağlayabileceğini birlikte değerlendirelim.`,
  'strateji': `HEDEF SÜRE: 22 saniye

EkoMatch, güncel yapay zekâ yöntemlerini somut bir müşteri ihtiyacına bağlıyor. Gerekçeli fırsat sinyalleri ve insan doğrulaması, kontrollü karar sürecini destekliyor.

Müşteri açısından doğru zamanda, ihtiyacına uygun bir görüşme hedefliyoruz. Banka açısından yeni POS ve finansman ilişkileriyle sürdürülebilir gelir potansiyeli oluşturmayı amaçlıyoruz.

Şubeciye de görüşmesini hazırlayabileceği bir içgörü sunuyoruz: Hangi müşteriyle, hangi olası ihtiyaç hakkında ve hangi gerekçeyle iletişim kurabilir?

ANLATIM NOTU
Sol başlıklarla sağ açıklamaları eşleştirerek ilerle. Son soruyu dinleyiciye bakarak söyle.`,
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

Sunumda Türkiye’de yıllık kartlı harcama hacmi otuz üç virgül dört trilyon lira, Kuveyt Türk kartlarıyla yapılan harcama yaklaşık sekiz yüz elli beş milyar lira olarak yer alıyor. Bunun yaklaşık beş yüz altmış dört milyarı diğer banka POS’larında gerçekleşiyor.

On virgül üç milyon müşteri ve dört yüz elli sekiz şubelik yapı da önerdiğimiz keşif ve insan doğrulaması yaklaşımının ölçeğini anlatıyor.

Bu verilerin dönem ve kapsamlarını eşleştirerek pilot hedeflerini netleştirmemiz gerekiyor.

ANLATIM NOTU
Bu slaydı ana sunuma eklemek yerine hacim, müşteri tabanı veya uygulama ölçeği sorulduğunda kullan.`,
}

export type Slide = { id: string; shortTitle: string; eyebrow: string; title: string; note: string; kind: string; chapter?: string }
const s = (id: string, shortTitle: string, eyebrow: string, title: string, kind: string, note: string, chapter?: string): Slide => ({ id, shortTitle, eyebrow, title, kind, note: speakerNotes[id] ? `${speakerNotes[id]}\n\nEK HATIRLATMA\n${note}` : note, chapter })

export const scenes: Slide[] = [
  s('acilis', 'Kapak', 'EKOMATCH', 'Yapay Zekâ Destekli Ekonomik İlişki ve Fırsat Keşif Platformu', 'cover', 'Kesikli bağlantı henüz kurulmamış ekonomik ilişkiyi temsil eder. Önce fırsat, sonra reel ticaret ve finansman.'),
  s('problem', 'Problem & Fırsat', 'BÖLÜM 01', 'Ağın görünen ve görünmeyen yanı.', 'divider', 'Bankanın müşteri ilişkisi ile müşterinin ticari ilişkisinin aynı ekosistemde kalması arasındaki farkı anlatın.', 'Temel Fikir'),
  s('bugunku-bakis', 'Bugünkü Bakış', '01 / BUGÜNKÜ BAKIŞ', 'Bugün, kurulmuş ilişkileri görüyoruz.', 'perspective', 'Bankalar müşterilerine bakarken hep var olana bakar: hangi kartı kullanıyor, hangi krediyi almış, nerede harcıyor. Bu çok değerli, ama resmin sadece bir kısmı.'),
  s('yeni-bakis', 'Yeni Bakış', '02 / YENİ BAKIŞ', 'EkoMatch, henüz kurulmamış olanlara bakıyor.', 'perspective', 'Birbirine benzeyen müşteriler ve işletmeler çoğu zaman benzer ilişkiler kurar. Benzerlerinin kurduğu ama bir müşterinin henüz kurmadığı ilişki bir boşluktur. EkoMatch bu boşlukları görür; her biri bankanın önceden görebileceği bir fırsattır.\n\nBenzerlerini buluyoruz: davranışı ve yapısı birbirine benzeyen müşteri ve işletmeleri. Sonra boşluğu görüyoruz: benzerlerinde kurulmuş, ona henüz kurulmamış ilişkiyi. En sonunda şubemiz doğruluyor ve banka ilişkinin kurulmasını destekliyor.'),
  s('ekomatch-nedir', 'NASIL ÇALIŞIR?', '01 / PROBLEM & FIRSAT', 'EkoMatch dört adımda çalışır.', 'definition', 'EkoMatch dört adımda çalışıyor. Önce benzerlerinin geçmişinden öğrenip henüz kurulmamış ilişkileri buluyor. Bu fırsat gerekçesiyle şubemize geliyor ve gerçek ihtiyacı şubemiz doğruluyor; yapay zekâ kararı kendi başına vermiyor. İhtiyaç doğrulanırsa uygun alternatifler sunuluyor, seçimi taraflar yapıyor. Kurulan ticaretin üzerine de ödeme, POS ve finansman geliyor.'),
  s('cozum', 'Çözüm & Mimari', 'BÖLÜM 02', 'İki model, tek ekonomik ağ.', 'divider', 'Economic Twin şirketlerin geçmiş ticari ilişkilerinden; Behavioral Twin MCC kategori dizilerinden öğrenir.', 'Çözüm & Mimari'),
  s('davranissal-ikiz', 'B2C · Üç White Space', '02 / ÇÖZÜM & MİMARİ', 'Benzer davranışlardan bölgesel talep.', 'b2c', 'Kasap hikâyesi temsilidir: davranışsal ikizlerde görülen kategori ilişkileri müşteride yoksa potansiyel sinyal oluşur. Yeterli ölçekte anonim toplulaştırma ve banka POS kapsaması birlikte değerlendirilir. MCC tam ürünü veya özel hayat olayını göstermez.'),
  s('ekonomik-dongu', 'Ekonomik Döngü', '02 / ÇÖZÜM & MİMARİ', 'B2B ve B2C, aynı ağın iki tarafı.', 'flywheel', 'Bölgesel talep → POS/işyeri fırsatı → işletmede büyüme → yeni tedarikçi → reel ticaret → finansman ve POS → yeni veri → yeniden öğrenme.'),
  s('teknoloji', 'Teknoloji Yığını', '02 / ÇÖZÜM & MİMARİ', 'Banka içinde çalışan, izlenebilir bir altyapı.', 'stack', 'Bunlar sunumda önerilen teknoloji seçenekleridir; tamamlanmış entegrasyon veya kurulu altyapı iddiası değildir. LLM ve RAG on-prem açıklama katmanıdır.'),
  s('uygulama', 'Uygulama & Yol Haritası', 'BÖLÜM 03', 'Kanıtla. Pilotta ölç. Kontrollü yaygınlaştır.', 'divider', 'Veri erişimi, anonimleştirme, model, açıklama, şube entegrasyonu, pilot ve ölçüm birbirine bağlı iş paketleridir.', 'Uygulama & Yol Haritası'),
  s('yol-haritasi', '12 Aylık Yol Haritası', '03 / UYGULAMA & YOL HARİTASI', 'Her fazın çıktısı ve karar kapısı var.', 'roadmap', 'Fazlar sağlanan metindendir. Aylara dağılım öneri olarak yerleştirilmiştir. Devam/durdur kararları: veri erişimi ve gizlilik, model doğrulaması, pilot etkisi.'),
  s('kaynak', 'Kaynak Planı & Maliyet', '03 / UYGULAMA & YOL HARİTASI', '13 kişilik ekip. Yaklaşık 45 milyon TL.', 'resources', '13 kişi ve yaklaşık 45 milyon TL başvuru rakamları olarak kullanıcı metninde belirtilmiştir. Rol başına kişi ve ekip/altyapı/veri/eğitim maliyetleri verilmemiştir. Paylar uydurulmadı; alanlar teyit bekliyor.'),
  s('rekabet', 'Rekabet & Değer', 'BÖLÜM 04', 'Ürünün ötesinde, yeni ekonomik ilişki.', 'divider', 'Karşılaştırma ürün kategorileri düzeyinde kavramsaldır. Adı geçen bir rakibin doğrulanmış yetenek denetimi değildir.', 'Rekabet & Değer'),
  s('benchmark', 'Özellik Karşılaştırması', '04 / REKABET & DEĞER', 'Fark, fırsatın nasıl keşfedildiğinde.', 'benchmark', 'Var/kısmi/yok işaretleri önerilen EkoMatch kapsamını ve tipik kategori odağını gösterir. Ürün bazında farklılaşabilir; araştırılmış rekabet iddiası olarak kullanılmamalıdır.'),
  s('swot', 'SWOT', '04 / REKABET & DEĞER', 'Veri gücünü, kontrollü büyümeye dönüştür.', 'swot', 'Güç: bankaya özgü ilişki verisi, B2B+B2C, açıklanabilirlik ve insan onayı, katılım bankacılığı uyumu. Zayıflık: veri kalitesi, MCC sınırı, soğuk başlangıç, benimsenme. Fırsat ve tehditler stratejik değerlendirmelerdir.'),
  s('ekonomik-katki', 'Ekonomik Katkı', 'BÖLÜM 05', 'Potansiyelden ölçülebilir katkıya.', 'divider', 'Ekonomik katkı bölümüne geçiş. Hacim ile gelir projeksiyonunu ayrı değerlendirin.', 'Ekonomik Katkı'),
  s('ekonomik-firsat', 'Ekonomik Fırsat', '05 / EKONOMİK KATKI', 'Talep bizde, dükkân başka bankada.', 'opportunity', '564 milyar TL hacimdir; gelir kaybı değildir. 855 → 652 → 564 dizisinde 652 ara adımının tanımı verilmemiştir. Binde 1 = 22 milyar TL için gereken baz 22 trilyon TL’dir. 33,4 trilyonun binde 1’i 33,4 milyar; 564 milyarın binde 1’i 564 milyondur. Ek panelde teyit listesi bulunur.'),
  s('bankaya-katki', 'Bankaya Katkısı', '05 / EKONOMİK KATKI', '400 milyon TL katkı projeksiyonu.', 'revenue', '155 milyon TL POS + 245 milyon TL finansman = 400 milyon TL. Gerçekleşmiş sonuç değildir. Net/brüt tanımı ve dönem verilmemiştir. Kötü/iyi senaryoların tutarları eksik olduğundan maliyet üstünde kaldıkları iddia edilemez. 45 milyon maliyet ancak eş dönem/kapsamda karşılaştırılabilir.'),
  s('strateji-kapanis', 'Strateji & Kapanış', 'BÖLÜM 06', 'Stratejiyi reel ticaretle buluştur.', 'divider', 'Strateji ve kapanış bölümüne geçiş.', 'Strateji & Kapanış'),
  s('strateji', 'Kuveyt Türk Stratejileri', '06 / STRATEJİ & KAPANIŞ', 'Reel ekonomiden, sürdürülebilir değere.', 'strategy', 'Strateji ifadeleri kullanıcı tarafından sağlanan sunum metnindendir. Güncel kurumsal strateji belgesi bu çalışmaya eklenmedi; resmî dönem ve kaynak teyit edilmelidir.'),
  s('final', 'Kapanış', 'EKOMATCH', 'Henüz kurulmamış ilişki, keşfedilmeyi bekleyen bir fırsattır.', 'final', 'Talebi keşfet. Arzla buluştur. Ekonomik ağı büyüt. Tek büyük logo yalnızca bu sahnede görünür.'),
  s('mevcut-durum', 'Mevcut Durum', 'EK / MEVCUT DURUM', 'Müşteri ve kart bizde. Harcamanın büyük kısmı başka bankada.', 'metrics', 'Bu boşluklar küçük değil. Müşterilerimiz her yıl kartlarımızla yaklaşık 855 milyar lira harcıyor. Ama bunun 564 milyarı başka bankaların POS\'larında gerçekleşiyor. Kart bizim, POS başka bankanın. Rakamlar kullanıcının sağladığı sunum metninden alınmıştır. Referans yıl, tanım ve birincil kaynaklar verilmediğinden dışarıdan doğrulanmış sonuç değildir. 33,4 trilyon TL yıllık kartlı harcama; yaklaşık 855 milyar TL KT kart harcaması; yaklaşık 564 milyar TL diğer banka POS harcaması; 10,3 milyon müşteri ve 458 şube.'),
]

export const definition = ['Keşif', 'Doğrulama', 'Eşleştirme', 'Finansman']
export const metrics = [['33,4', 'trilyon TL', 'Türkiye’de yıllık kartlı harcama'], ['~855', 'milyar TL', 'Kuveyt Türk kartlarıyla yapılan harcama'], ['~564', 'milyar TL', 'Diğer bankaların POS’larında'], ['10,3', 'milyon', 'Kuveyt Türk müşterisi'], ['458', 'şube', 'İnsan doğrulaması için temas ağı']]
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
export const b2cLayers = [['Müşteri', 'Benzerlerimde var, bende yok.'], ['Bölge', 'Anonim sinyaller aynı kategoride yoğunlaşıyor.'], ['İşyeri', 'Benzer işletmelerde var, bu işyerinde yok.']]
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
export const finances = { pos: 155, financing: 245, total: 400, cost: 45, cardVolume: 855, intermediate: 652, outside: 564, opportunity: 22, share: .001, low: null, high: null } as const
export const appendices = [
  { title: 'Ek 1 · 564 milyar TL hesabı', body: ['Verilen hacim dizisi: 855 → 652 → 564 milyar TL.', 'Aritmetik farklar: 855 − 652 = 203; 652 − 564 = 88 milyar TL. Bu farkların ekonomik tanımı verilmedi.', '652 ara bazının kapsamı, veri dönemi ve dış POS oranı teyit edilmeli. 564 milyar TL gelir kaybı değil, harcama hacmidir.'] },
  { title: 'Ek 2 · 400 milyon TL hesabı', body: ['155 milyon TL POS + 245 milyon TL finansman = 400 milyon TL katkı projeksiyonu.', 'POS hacmi × etkin gelir oranı ve finansman hacmi × etkin marj girdileri paylaşılmadı.', '400 − 45 = 355 milyon TL yalnızca aynı dönem ve kapsamda, 400 maliyet öncesi katkıysa geçerlidir. Net gelir sonucu olarak kullanılmaz.'] },
  { title: 'Ek 3 · Senaryolar ve iki kontrol', body: ['Kötü ve iyi senaryonun sayısal girdileri paylaşılmadı. “Kötü senaryoda bile maliyetin üstünde” iddiası henüz kurulamaz.', 'Üstten kontrol: 22 milyar / 0,001 = 22 trilyon TL baz hacim gerekir. Baz teyit bekliyor.', 'Alttan kontrol: işlem sayısı × ortalama hacim × artımsal dönüşüm; POS ve finansman gelir oranlarıyla ayrı hesaplanmalı.'] },
  { title: 'Ek 4 · Varsayımlar ve teyit planı', body: ['İş birimi: 33,4 trilyon, 855/652/564 milyar, 10,3 milyon müşteri ve 458 şube için tarih, kapsam, kaynak.', 'Finans / ürün: gelir marjları, net/brüt tanımı, senaryo girdileri ve 45 milyon TL maliyetin dönemi.', 'Proje ekibi: 13 kişinin rol dağılımı; ekip, altyapı, veri ve eğitim bütçeleri.', 'Veri yönetişimi ve pilot ekibi: minimum örneklem, model kalibrasyonu, test/kontrol ataması ve ölçüm dönemi.'] },
]
