export type SceneMeta = {
  id: string
  eyebrow: string
  title: string
  shortTitle: string
  note: string
}

export const scenes: SceneMeta[] = [
  { id: 'acilis', eyebrow: 'EKOMATCH', title: 'Bankanın ekonomik ağında henüz var olmayan ilişkileri keşfet.', shortTitle: 'Açılış', note: 'Önce fikri göster: EkoMatch, kopuk düğümler arasındaki olası ekonomik ilişkiyi görünür kılar.' },
  { id: 'problem', eyebrow: 'PROBLEM', title: 'Banka geçmişi görüyor. Fırsat ise henüz gerçekleşmedi.', shortTitle: 'Problem', note: 'Bankalar verisiz değil; yeni ilişkiyi soran bir bakış açısına ihtiyaç var.' },
  { id: 'beyaz-alan', eyebrow: 'TEMEL İÇGÖRÜ', title: 'Economic White Space', shortTitle: 'Beyaz Alan', note: 'Kesikli çizgi potansiyeldir; EkoMatch ihtiyacı garanti etmez, önceliklendirir.' },
  { id: 'ekonomik-ikiz', eyebrow: 'B2B · ECONOMIC TWIN', title: 'Bu şirkete benzeyen şirketler geçmişte kimlerle ticaret yaptı?', shortTitle: 'Ekonomik İkiz', note: 'Benzerlik; faaliyet, ölçek, finansal profil ve izinli işlem davranışından oluşur.' },
  { id: 'iliski-deseni', eyebrow: 'B2B · DESEN KEŞFİ', title: 'Tek bir tahmin değil. Benzerlerde tekrar eden ilişki deseni.', shortTitle: 'İlişki Deseni', note: 'Ekrandaki oranlar sentetik demo verisidir; gerçek pilotta bankanın verisiyle hesaplanır.' },
  { id: 'insan-dogrulamasi', eyebrow: 'B2B · HUMAN-IN-THE-LOOP', title: 'AI fırsatı keşfeder. İnsan ihtiyacı doğrular.', shortTitle: 'Doğrulama', note: 'Şube çalışanı müşteri görüşmesini daha hazırlıklı yapar; nihai ihtiyaç müşteriden gelir.' },
  { id: 'b2b-eslesme', eyebrow: 'B2B · MATCH', title: 'Doğrulanmış talebi, uygun tedarik alternatifleriyle buluştur.', shortTitle: 'B2B Eşleşme', note: 'Uyum skoru ürün kalitesi veya banka garantisi değildir; adayları sıralayan açıklanabilir bir sinyaldir.' },
  { id: 'davranissal-ikiz', eyebrow: 'B2C · BEHAVIORAL TWIN', title: 'Benzer davranışlar daha sonra hangi ekonomik ilişkileri kurdu?', shortTitle: 'Davranışsal İkiz', note: 'MCC, alışverişin tam ürününü veya özel hayat olayını değil, işyeri kategorisini gösterir.' },
  { id: 'mcc-yolculugu', eyebrow: 'B2C · SEQUENCE', title: 'Bir sonraki ekonomik ilişki hangi kategori olabilir?', shortTitle: 'MCC Yolculuğu', note: 'Akışlar kavramsal ve sentetiktir; model davranışsal ikizlerin kategori dizilerini öğrenir.' },
  { id: 'musteri-beyaz-alani', eyebrow: 'B2C · WHITE SPACE', title: 'Benzerlerimde var, bende yok.', shortTitle: 'Müşteri Alanı', note: 'Eksik kategori kesin ihtiyaç değil; uygun iletişim için potansiyel yeni ekonomik ilişkidir.' },
  { id: 'bolgesel-talep', eyebrow: 'B2C → BÖLGE', title: 'Bireysel sinyaller değil; anonimleştirilmiş bölgesel talep.', shortTitle: 'Bölgesel Talep', note: 'Müşteri düzeyi davranış işyerlerine açılmaz; yalnızca yeterli büyüklükte toplulaştırılmış sinyal kullanılır.' },
  { id: 'pos-arz', eyebrow: 'BÖLGE · POS EKOSİSTEMİ', title: 'Talep nerede oluşuyor, banka arzın neresinde?', shortTitle: 'Talep × Arz', note: 'Matris, kategori ve bölge bazında potansiyel talep ile banka POS kapsamasını karşılaştırır.' },
  { id: 'uc-beyaz-alan', eyebrow: 'TEK FIRSAT MOTORU', title: 'Üç beyaz alan. Tek ekonomik fırsat.', shortTitle: 'Üç Beyaz Alan', note: 'Müşteri, bölge ve POS sinyali birlikte değerlendirildiğinde aksiyon daha isabetli olur.' },
  { id: 'ekonomik-dongu', eyebrow: 'B2C + B2B', title: 'EkoMatch yalnızca fırsat bulmaz. Ekonomik ağı büyütür.', shortTitle: 'Ekonomik Döngü', note: 'Sunumun bağlayıcı anı: tüketici sinyali ticari kapasiteye, kapasite yeni B2B ilişkiye dönüşür.' },
  { id: 'ai-motoru', eyebrow: 'AI & DATA', title: 'Karar katmanları ayrışır. Sinyal açıklanabilir kalır.', shortTitle: 'AI Motoru', note: 'Üretken AI finansal skor hesaplamaz. Varsa, yalnızca açıklama ve çalışan deneyimi katmanında kullanılabilir.' },
  { id: 'guven', eyebrow: 'GÜVEN MİMARİSİ', title: 'Veri içeride kalır. Fırsat kontrollü biçimde dışarı çıkar.', shortTitle: 'Güven', note: 'KVKK ve bankacılık sırrı yükümlülüklerine duyarlı tasarım ilkeleridir; nihai uyum hukuk ve bilgi güvenliği onayına tabidir.' },
  { id: 'benchmark', eyebrow: 'YENİLİKÇİLİK · BENCHMARK', title: 'Mevcut ilişkiyi bulmaktan, yeni ilişki fırsatını keşfetmeye.', shortTitle: 'Benchmark', note: 'İddia kategori farkıdır; “dünyada tek” gibi doğrulanmamış üstünlük söylemi kullanılmaz.' },
  { id: 'riskler', eyebrow: 'SWOT · RİSK KONTROLÜ', title: 'Güçlü sinyal, kontrollü karar.', shortTitle: 'Riskler', note: 'Riskler saklanmaz; her biri ürün ve model tasarımında bir kontrol noktasına dönüşür.' },
  { id: 'yol-haritasi', eyebrow: '12 AYLIK ÖNERİLEN PLAN', title: 'Kanıtla. Pilotta ölç. Kontrollü ölçekle.', shortTitle: 'Yol Haritası', note: 'Takvim, doküman sağlanmadığı için yapılandırılabilir öneridir; iş gücü ve entegrasyon bağımlılıklarıyla netleştirilmelidir.' },
  { id: 'kurumsal-deger', eyebrow: 'FİNANSAL & STRATEJİK ETKİ', title: 'Finansman başlangıç değil, gerçek ticaretin sonucudur.', shortTitle: 'Kurumsal Değer', note: 'ROI uydurulmaz. Pilot; dönüşüm, yeni ilişki, ödeme hacmi ve ekosistem derinliği üzerinden ölçülür.' },
  { id: 'demo', eyebrow: 'MVP · CANLI AKIŞ', title: 'EkoMatch’i bir fırsatın doğuşunda izle.', shortTitle: 'Demo', note: 'Tüm profiller, skorlar ve hareketler sentetik demo verisidir.' },
  { id: 'final', eyebrow: 'EKOMATCH', title: 'Talebi keşfet. Arzla buluştur. Ekonomik ağı büyüt.', shortTitle: 'Final', note: 'Kapanış: benzer ilişkilerden yeni ticaret, benzer davranışlardan yeni talep.' },
]

export const demoPatterns = [
  { label: 'Makine / Ekipman', value: 43, color: 'var(--aqua)' },
  { label: 'Hammadde', value: 24, color: 'var(--blue)' },
  { label: 'Ticari Araç', value: 16, color: 'var(--amber)' },
  { label: 'Enerji', value: 10, color: 'var(--violet)' },
]

export const roadmap = [
  { range: 'AY 01–02', title: 'Keşif & veri', output: 'Veri sözlüğü + yönetişim' },
  { range: 'AY 03–04', title: 'Model prototipi', output: 'İkiz & white space v0' },
  { range: 'AY 05–06', title: 'B2B pilot', output: 'Şube doğrulama akışı' },
  { range: 'AY 07–08', title: 'B2C pilot', output: 'MCC dizisi + bölge sinyali' },
  { range: 'AY 09–10', title: 'POS zekâsı', output: 'Talep × arz önceliği' },
  { range: 'AY 11–12', title: 'MLOps & ölçek', output: 'Ölçüm + izleme + karar' },
]

export const risks = [
  { risk: 'Veri kalitesi', control: 'Veri sözlüğü · kalite eşikleri', level: 74 },
  { risk: 'Yanlış pozitif', control: 'İnsan doğrulaması · geri besleme', level: 62 },
  { risk: 'Mahremiyet', control: 'Anonimleştirme · minimum grup', level: 86 },
  { risk: 'Model kayması', control: 'Drift izleme · periyodik yeniden eğitim', level: 56 },
  { risk: 'Benimsenme', control: 'Açıklanabilir sinyal · pilot tasarımı', level: 48 },
  { risk: 'Tedarikçi riski', control: 'Alternatif liste · garanti değil uyarısı', level: 68 },
]
