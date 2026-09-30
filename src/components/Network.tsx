import { motion, useReducedMotion } from 'framer-motion'
import { networkEdges, networkNodes, potentialEdges } from '../data/demoData'

type Props = {
  rich?: boolean
  highlight?: boolean
  labels?: boolean
  className?: string
}

export function EconomicNetwork({ rich = false, highlight = true, labels = false, className = '' }: Props) {
  const reduced = useReducedMotion()
  const allEdges = rich ? [...networkEdges, ...potentialEdges] : networkEdges
  return (
    <svg className={`network ${className}`} viewBox="0 0 1000 600" role="img" aria-label="Mevcut ve potansiyel ekonomik ilişkiler ağı">
      <defs>
        <radialGradient id="nodeGlow">
          <stop offset="0" stopColor="#bdfbea" />
          <stop offset="1" stopColor="#36d9b0" />
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <g className="network__grid">
        {Array.from({ length: 9 }).map((_, i) => <line key={`v${i}`} x1={80 + i * 105} x2={80 + i * 105} y1="20" y2="580" />)}
        {Array.from({ length: 5 }).map((_, i) => <line key={`h${i}`} x1="20" x2="980" y1={70 + i * 115} y2={70 + i * 115} />)}
      </g>
      <g>
        {allEdges.map(([a, b], i) => {
          const from = networkNodes[a], to = networkNodes[b]
          return <motion.line key={`e${i}`} x1={from[0] * 10} y1={from[1] * 6} x2={to[0] * 10} y2={to[1] * 6} className="network__edge" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: rich ? .72 : .34 }} transition={reduced ? { duration: 0 } : { delay: .05 + i * .018, duration: .55 }} />
        })}
        {!rich && potentialEdges.map(([a, b], i) => {
          const from = networkNodes[a], to = networkNodes[b]
          return <motion.line key={`p${i}`} x1={from[0] * 10} y1={from[1] * 6} x2={to[0] * 10} y2={to[1] * 6} className={`network__potential ${highlight && i === 1 ? 'is-selected' : ''}`} initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: highlight && i === 1 ? 1 : .4 }} transition={reduced ? { duration: 0 } : { delay: .75 + i * .12, duration: .8 }} />
        })}
      </g>
      <g>
        {networkNodes.map(([x, y], i) => (
          <g key={i}>
            <motion.circle cx={x * 10} cy={y * 6} r={i === 6 || i === 15 ? 8 : 5} className={i === 6 || i === 15 ? 'network__node is-key' : 'network__node'} initial={reduced ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={reduced ? { duration: 0 } : { delay: .08 + i * .025, type: 'spring' }} />
            {labels && [6, 15].includes(i) && <text x={x * 10 + 14} y={y * 6 - 12}>{i === 6 ? 'TALEP' : 'ARZ'}</text>}
          </g>
        ))}
      </g>
    </svg>
  )
}

export function MiniNetworkLegend() {
  return <div className="network-legend"><span><i className="legend-line solid" />Mevcut ilişki</span><span><i className="legend-line dotted" />Potansiyel ilişki</span></div>
}
