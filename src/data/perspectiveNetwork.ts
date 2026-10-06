export const TIMELINE = { startYear: 1989, endYear: 2026, delay: .8, growth: 8, hold: 1.5, fade: .4, edgeDraw: .35 } as const
export const TIMELINE_END = TIMELINE.delay + TIMELINE.growth + TIMELINE.hold
export type Node = { x: number; y: number; business: boolean; birthYear: number; ringBirthYear: number }
export type Pair = readonly [number, number]
export type NetworkEdge = { a: number; b: number; birthYear: number; delayYears: number }

function birthYearForRank(rank: number) {
  if (rank < 8) return 1989
  // These six nodes finish fading in by 1992, leaving the initial network readable.
  if (rank < 14) return 1989 + (rank - 7) * .35
  const fraction = (rank - 13) / 106
  let low = 0, high = 1
  for (let i = 0; i < 30; i++) {
    const progress = (low + high) / 2
    if ((progress + progress ** 2.2) / 2 < fraction) low = progress
    else high = progress
  }
  return 1992 + 34 * (low + high) / 2
}

function createNetwork() {
  let seed = 20261005
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296 }
  const points: { x: number; y: number }[] = []
  while (points.length < 120) {
    const point = { x: 75 + random() * 835, y: 80 + random() * 610 }
    // Reserve space for the year/today labels above the artwork's upper-left corner.
    if (point.x < 350 && point.y < 115) continue
    if (points.some(n => Math.hypot(n.x - point.x, n.y - point.y) < 47)) continue
    points.push(point)
  }
  const shuffle = () => {
    const values = points.map((_, i) => i)
    for (let i = values.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [values[i], values[j]] = [values[j], values[i]] }
    return values
  }
  const businesses = new Set(shuffle().slice(0, 18))
  const order = shuffle(), ranks = new Map(order.map((id, rank) => [id, rank]))
  const nodes: Node[] = points.map((point, i) => {
    const birthYear = birthYearForRank(ranks.get(i)!)
    return { ...point, business: businesses.has(i), birthYear, ringBirthYear: Math.max(1995, birthYear) }
  })
  const candidates = nodes.flatMap((a, i) => nodes.slice(i + 1).map((b, j) => ({
    pair: [i, i + j + 1] as Pair, distance: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2,
  })))
  const same = (a: Pair, b: Pair) => a[0] === b[0] && a[1] === b[1]
  const crosses = (a: Pair, b: Pair) => {
    if (a.some(n => b.includes(n))) return false
    const [p, q] = a.map(i => nodes[i]), [r, s] = b.map(i => nodes[i])
    const orient = (a: Node, b: Node, c: Node) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
    return orient(p, q, r) * orient(p, q, s) < 0 && orient(r, s, p) * orient(r, s, q) < 0
  }
  const gaps: Pair[] = []
  for (const [x, y] of [[260, 180], [730, 180], [470, 380], [230, 570], [760, 570]]) {
    const pair = candidates.filter(p => p.distance < 125 && !gaps.some(g => g.some(n => p.pair.includes(n)) || crosses(g, p.pair)))
      .sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y))[0]
    gaps.push(pair.pair)
  }
  const available = candidates.filter(p => !gaps.some(g => same(g, p.pair) || crosses(g, p.pair))).sort((a, b) => a.distance - b.distance)
  const pairs: Pair[] = [], connected = new Set([0])
  while (connected.size < nodes.length) {
    const next = available.find(({ pair: [a, b] }) => connected.has(a) !== connected.has(b) && !pairs.some(pair => crosses(pair, [a, b])))
    if (!next) throw new Error('Perspective graph cannot be connected')
    pairs.push(next.pair); next.pair.forEach(n => connected.add(n))
  }
  for (const { pair } of available) {
    if (pairs.length === 200) break
    if (!pairs.includes(pair) && !pairs.some(other => crosses(other, pair))) pairs.push(pair)
  }
  const edges: NetworkEdge[] = pairs.map(([a, b]) => {
    const delayYears = random() * 1.5
    return { a, b, delayYears, birthYear: Math.max(nodes[a].birthYear, nodes[b].birthYear) + delayYears }
  })
  return { nodes, edges, gaps }
}

export const perspectiveNetwork = createNetwork()
// Both slides use the same artwork box and node positions.
export const perspectiveViewBox = '59.453129024244845 64.33150147879496 882.7824542075396 632.8798333187588'
