export type WhiteSpaceProfile = {
  name: string
  existing: string[]
  gaps: { name: string; detail: string }[]
  insight: string
}

// Fictional examples for the presentation; no personal or company records.
export const customerWhiteSpaces: WhiteSpaceProfile[] = [
  {
    name: 'Müşteri A',
    existing: ['Market', 'Akaryakıt', 'Restoran'],
    gaps: [
      { name: 'Ev / yapı', detail: 'Benzer müşterilerde kategori ilişkisi var; bu müşteride henüz görünmüyor.' },
      { name: 'Elektronik', detail: 'Benzer harcama örüntülerinde var; bu müşteride henüz görünmüyor.' },
    ],
    insight: 'Müşteri A için ev / yapı ve elektronik kategorileri potansiyel fırsat alanlarıdır.',
  },
  {
    name: 'Müşteri B',
    existing: ['Market', 'Ulaşım', 'Giyim'],
    gaps: [
      { name: 'Spor mağazaları', detail: 'Benzer müşterilerde kategori ilişkisi var; bu müşteride henüz görünmüyor.' },
      { name: 'Kitap / kırtasiye', detail: 'Benzer harcama örüntülerinde var; bu müşteride henüz görünmüyor.' },
    ],
    insight: 'Müşteri B için spor mağazaları ve kitap / kırtasiye kategorileri potansiyel fırsat alanlarıdır.',
  },
  {
    name: 'Müşteri C',
    existing: ['Market', 'Restoran', 'Elektronik'],
    gaps: [
      { name: 'Kasap', detail: 'Benzer müşterilerde kategori ilişkisi var; bu müşteride henüz görünmüyor.' },
      { name: 'Ev / yaşam', detail: 'Benzer harcama örüntülerinde var; bu müşteride henüz görünmüyor.' },
    ],
    insight: 'Müşteri C için kasap ve ev / yaşam kategorileri potansiyel fırsat alanlarıdır.',
  },
]

export const businessWhiteSpaces: WhiteSpaceProfile[] = [
  {
    name: 'Akaryakıt istasyonu',
    existing: ['Akaryakıt satışı', 'Market', 'POS'],
    gaps: [{ name: 'Elektrikli araç şarj ünitesi', detail: 'Benzer istasyonlarda şarj ünitesi kurulmuş; bu istasyonda henüz bulunmuyor.' }],
    insight: 'Şubeci şarj ünitesi ihtiyacını doğrular; banka tedarikçi eşleşmesi ve finansmanla destekler.',
  },
  {
    name: 'Mahalle fırını',
    existing: ['Üretim fırını', 'Satış tezgâhı', 'POS'],
    gaps: [{ name: 'Endüstriyel hamur yoğurma makinesi', detail: 'Benzer ölçekteki fırınlar bu ekipmanı kullanıyor; bu fırında henüz bulunmuyor.' }],
    insight: 'Şubeci üretim kapasitesi ihtiyacını doğrular; banka ekipman tedariki ve finansmanla destekler.',
  },
  {
    name: 'Yerel market',
    existing: ['Mağaza satışı', 'Soğutma dolabı', 'POS'],
    gaps: [{ name: 'Self servis kasa', detail: 'Benzer marketlerde self servis kasa kullanılıyor; bu markette henüz bulunmuyor.' }],
    insight: 'Şubeci kasa ihtiyacını doğrular; banka ürün tedariki ve ödeme altyapısıyla destekler.',
  },
]
