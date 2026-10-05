import { useEffect, useRef, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Edge = readonly [number, number]

function createNetwork() {
  let seed = 20261005
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const nodes: { x: number; y: number; phase: number; business: boolean }[] = []
  while (nodes.length < 40) {
    const x = 65 + random() * 870, y = 65 + random() * 630
    if (nodes.some(n => Math.hypot(n.x - x, n.y - y) < 85)) continue
    nodes.push({ x, y, phase: random() * Math.PI * 2, business: [3, 9, 17, 22, 28, 36].includes(nodes.length) })
  }
  const candidates = nodes.flatMap((a, i) => nodes.slice(i + 1).map((b, j) => ({
    edge: [i, i + j + 1] as Edge, distance: Math.hypot(a.x - b.x, a.y - b.y),
    x: (a.x + b.x) / 2, y: (a.y + b.y) / 2,
  })))
  // Reserve five nearby, separate pairs before constructing existing links.
  const gaps: Edge[] = []
  for (const [x, y] of [[260,180], [730,180], [470,380], [230,570], [760,570]]) {
    const pair = candidates.filter(p => p.distance < 210 && !gaps.some(g => g.some(n => p.edge.includes(n))))
      .sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y))[0]
    gaps.push(pair.edge)
  }
  const available = candidates.filter(p => !gaps.includes(p.edge)).sort((a, b) => a.distance - b.distance)
  const edges: Edge[] = []
  // A spanning tree keeps the entire network connected, then local links add density.
  const connected = new Set([0])
  while (connected.size < nodes.length) {
    const next = available.find(({ edge: [a, b] }) => connected.has(a) !== connected.has(b))!
    edges.push(next.edge); next.edge.forEach(n => connected.add(n))
  }
  for (const { edge } of available) {
    if (edges.length === 55) break
    if (!edges.includes(edge)) edges.push(edge)
  }
  return { nodes, edges, gaps }
}

const network = createNetwork()

export function PerspectiveNetwork({ reveal }: { reveal: boolean }) {
  const svg = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const { nodes, edges, gaps } = network

  // This SVG stays mounted between the two slides. Animate lines and their
  // endpoints with the same clock so breathing never resets at the transition.
  useEffect(() => {
    if (reduced || !svg.current) return
    const element = svg.current
    let frame = 0
    const draw = (now: number) => {
      const bounds = element.getBoundingClientRect()
      const scale = Math.min(bounds.width / 1000, bounds.height / 760)
      const amplitude = 1.5 / Math.max(scale, .1)
      const points = nodes.map(n => ({
        x: n.x + Math.sin(now / 7000 + n.phase) * amplitude,
        y: n.y + Math.cos(now / 8500 + n.phase) * amplitude,
      }))
      element.querySelectorAll<SVGLineElement>('line[data-from]').forEach(line => {
        const a = points[Number(line.dataset.from)], b = points[Number(line.dataset.to)]
        line.setAttribute('x1', String(a.x)); line.setAttribute('y1', String(a.y))
        line.setAttribute('x2', String(b.x)); line.setAttribute('y2', String(b.y))
      })
      element.querySelectorAll<SVGGElement>('[data-node]').forEach(group => {
        const point = points[Number(group.dataset.node)]
        group.setAttribute('transform', `translate(${point.x} ${point.y})`)
      })
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [reduced, nodes])

  const line = ([a, b]: Edge) => ({
    x1: nodes[a].x, y1: nodes[a].y, x2: nodes[b].x, y2: nodes[b].y,
    'data-from': a, 'data-to': b,
  })
  return <svg ref={svg} className="perspective-network" viewBox="0 0 1000 760" aria-hidden="true">
    <motion.g className="perspective-existing" initial={{ opacity: .28 }} animate={{ opacity: reveal ? .12 : .28 }} transition={{ duration: reduced ? 0 : .6 }}>
      {edges.map((edge, i) => <line key={i} {...line(edge)} />)}
    </motion.g>
    {nodes.map((node, i) => <g key={i} data-node={i} transform={`translate(${node.x} ${node.y})`} className="perspective-node">
      <circle r={node.business ? 5 : 3} />
      {node.business && <circle className="perspective-business" r="10" />}
    </g>)}
    {reveal && <g className="perspective-opportunities">{gaps.map((edge, i) => <g key={i} className="perspective-gap" style={{ '--reveal-delay': `${.6 + i * .25}s` } as CSSProperties}>
      <line {...line(edge)} />
      {edge.map(n => <g key={n} data-node={n} transform={`translate(${nodes[n].x} ${nodes[n].y})`}>
        <circle className="perspective-glow" r="17" /><circle className="perspective-endpoint" r={nodes[n].business ? 5 : 3.5} />
      </g>)}
    </g>)}</g>}
  </svg>
}
