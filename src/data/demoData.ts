export const networkNodes = [
  [10, 22], [19, 12], [24, 36], [34, 20], [42, 42], [52, 18], [61, 33], [70, 14],
  [78, 38], [90, 24], [15, 69], [28, 58], [37, 78], [49, 64], [59, 82], [69, 64],
  [80, 78], [91, 62], [7, 88], [95, 88],
] as const

export const networkEdges = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 11], [3, 4], [3, 5], [4, 6], [4, 13],
  [5, 6], [5, 7], [6, 8], [7, 8], [7, 9], [8, 9], [8, 16], [10, 11], [10, 18],
  [11, 12], [11, 13], [12, 13], [12, 18], [13, 14], [13, 15], [14, 15], [15, 16],
  [15, 17], [16, 17], [17, 19],
] as const

export const potentialEdges = [[4, 12], [6, 15], [8, 17], [9, 17], [14, 16]] as const

export const mccCategories = ['Market', 'Akaryakıt', 'Restoran', 'Havayolu', 'Konaklama', 'Ev & Yaşam']

export const demoCompanies = [
  { name: 'Anka Dokuma', nace: '13.20', scale: 'Orta Ölçek', city: 'Gaziantep' },
  { name: 'Mavi İplik', nace: '13.10', scale: 'Orta Ölçek', city: 'Bursa' },
  { name: 'Atlas Tekstil', nace: '13.20', scale: 'Orta Ölçek', city: 'Denizli' },
]

export const demoCustomers = [
  { id: 'M-2048', rhythm: 'Düzenli', categories: ['Market', 'Akaryakıt', 'Restoran'] },
  { id: 'M-3172', rhythm: 'Değişken', categories: ['Market', 'Ulaşım', 'Dijital'] },
  { id: 'M-8841', rhythm: 'Yoğun', categories: ['Market', 'Restoran', 'Havayolu'] },
]
