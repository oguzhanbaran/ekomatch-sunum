import { type CSSProperties } from 'react'
import { perspectiveNetwork, perspectiveViewBox, TIMELINE, type Pair } from '../data/perspectiveNetwork'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
export function PerspectiveNetwork({ reveal, cropToArtwork = false, year = 2026, complete = true }: { reveal: boolean; cropToArtwork?: boolean; year?: number; complete?: boolean }) {
  const { nodes, edges, gaps } = perspectiveNetwork
  const visibility = (birth: number, seconds: number) => complete ? 1 : clamp((year - birth) * TIMELINE.growth / 37 / seconds)
  const line = ([a, b]: Pair) => ({ x1: nodes[a].x, y1: nodes[a].y, x2: nodes[b].x, y2: nodes[b].y, 'data-from': a, 'data-to': b })
  return <svg className="perspective-network" viewBox={cropToArtwork ? perspectiveViewBox : '0 0 1000 760'} aria-hidden="true">
    <g className="perspective-existing" opacity=".28">
      {edges.map((edge, i) => {
        const progress = visibility(edge.birthYear, TIMELINE.edgeDraw)
        return <line key={i} {...line([edge.a, edge.b])} data-birth-year={edge.birthYear} pathLength="1" opacity={progress > 0 ? 1 : 0} strokeDasharray="1" strokeDashoffset={1 - progress} />
      })}
    </g>
    {nodes.map((node, i) => <g key={i} data-node={i} data-birth-year={node.birthYear} transform={`translate(${node.x} ${node.y})`} className="perspective-node" style={{ opacity: node.birthYear === TIMELINE.startYear ? 1 : visibility(node.birthYear, .18) }}>
      <circle r={node.business ? 5 : 3} />
      {node.business && <circle className="perspective-business" r="10" style={{ opacity: visibility(node.ringBirthYear, .18) }} />}
    </g>)}
    {reveal && <g className="perspective-opportunities">{gaps.map((edge, i) => <g key={i} className="perspective-gap" style={{ '--reveal-delay': `${.6 + i * .25}s` } as CSSProperties}>
      <line {...line(edge)} />
      {edge.map(n => <g key={n} data-node={n} transform={`translate(${nodes[n].x} ${nodes[n].y})`}>
        <circle className="perspective-glow" r="17" /><circle className="perspective-endpoint" r={nodes[n].business ? 5 : 3.5} />
        <circle className="perspective-potential-ring" r={nodes[n].business ? 10 : 8} />
      </g>)}
    </g>)}</g>}
  </svg>
}
