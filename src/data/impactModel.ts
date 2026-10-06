// Ticari portföy varsayımları: kullanıcının paylaştığı senaryo girdileri.
// Yeni ilişkiler tam yıl gelir üretir; devam oranı her yıl bir kez uygulanır.
export const impactModel = {
  branches: 451, staff: 3, opportunities: 2, weeks: 52, investment: 45,
  margin: .0558,
  scenarios: [
    { label: 'Beklenen', color: '#0A6B5C', usage: [.5, .7, .85], conversion: [.036, .05, .065], incrementality: .6, balance: 2350000, counterparty: 1.3, retention: .85 },
    { label: 'İyi', color: '#13283B', usage: [.6, .8, .9], conversion: [.045, .065, .08], incrementality: .65, balance: 2590000, counterparty: 1.4, retention: .9 },
  ],
}
export const impactScenarios = impactModel.scenarios.map(scenario => {
  const relationshipIncome = scenario.balance * impactModel.margin * scenario.counterparty
  let priorRevenue = 0
  const years = scenario.usage.map((usage, year) => {
    const relationships = impactModel.branches * impactModel.staff * impactModel.opportunities * impactModel.weeks * usage * scenario.conversion[year] * scenario.incrementality
    const newRevenue = relationships * relationshipIncome / 1000000
    const retainedRevenue = priorRevenue * scenario.retention
    const revenue = newRevenue + retainedRevenue
    priorRevenue = revenue
    return { relationships, newRevenue, retainedRevenue, revenue }
  })
  const total = years.reduce((sum, year) => sum + year.revenue, 0)
  return { ...scenario, relationshipIncome, years, total, multiple: total / impactModel.investment }
})
export const impactNumber = (value: number, decimals = 0) => new Intl.NumberFormat('tr-TR', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value)
export const impactNotes = `Bu slayt ticari portföy için tam yıl gelir senaryosudur. 451 şube, şube başına 3 ticari personel, kişi başına haftada 2 fırsat ve 52 hafta üzerinden hesaplıyoruz. Beklenen kullanım yüzde 50, 70, 85; dönüşüm yüzde 3,6, 5, 6,5; artımsallık yüzde 60. İyi senaryoda kullanım yüzde 60, 80, 90; dönüşüm yüzde 4,5, 6,5, 8; artımsallık yüzde 65. Ortalama bakiye sırasıyla 2,35 ve 2,59 milyon TL; net marj yüzde 5,58; karşı taraf çarpanı 1,3 ve 1,4. Karşı taraf çarpanı yalnızca ilave geliri temsil etmeli, aynı gelir iki kez sayılmamalıdır. Devam oranları yüzde 85 ve yüzde 90; önceki yılların geliri her yıl bu oranla korunur. ${impactScenarios.map(s => `${s.label} senaryoda yıllık gelirler ${s.years.map(y => impactNumber(y.revenue)).join(', ')} milyon TL, üç yıllık toplam ${impactNumber(s.total)} milyon TL.`).join(' ')} Yeni ilişkiler için yarım yıl indirimi uygulanmadı; bu bir tam yıl gelir kapasitesi varsayımıdır, takvim yılı gerçekleşme tahmini değildir. İlişkiler yıl içine yayılarak kurulursa ilk yıl geliri daha düşük olur. Bunlar net kâr değil, risk ve işletme giderleri düşülmemiş brüt gelirlerdir. Bireysel gelir ayrıca eklenmedi. Yatırım 45 milyon TL; tüm model varsayımları pilotta doğrulanacaktır.`
