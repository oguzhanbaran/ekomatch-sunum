import { useLayoutEffect, useState, type CSSProperties } from 'react'
import { useReducedMotion } from 'framer-motion'
// Fixed target mesh sampled from the existing logo-mini.png silhouette.
import logoNetwork from '../data/logoNetwork.json'
import { perspectiveNetwork, perspectiveViewBox, TIMELINE, type Pair } from '../data/perspectiveNetwork'

const miniLogoUrl = new URL('../../logo-mini.png', import.meta.url).href

const clamp = (value: number) => Math.max(0, Math.min(1, value))
export function PerspectiveNetwork({ reveal, cropToArtwork = false, year = 2026, complete = true }: { reveal: boolean; cropToArtwork?: boolean; year?: number; complete?: boolean }) {
  const { nodes, edges, gaps } = perspectiveNetwork
  const reduced = useReducedMotion()
  const [morph, setMorph] = useState(reveal && reduced ? 1 : 0)
  useLayoutEffect(() => {
    if (!reveal) { setMorph(0); return }
    if (reduced) { setMorph(1); return }
    setMorph(0)
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = clamp((now - start - 800) / 6500)
      setMorph(t * t * (3 - 2 * t))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reveal, reduced])
  const positions = nodes.map((node, i) => ({ x: node.x + (logoNetwork.points[i].x - node.x) * morph, y: node.y + (logoNetwork.points[i].y - node.y) * morph }))
  const visibility = (birth: number, seconds: number) => complete ? 1 : clamp((year - birth) * TIMELINE.growth / 37 / seconds)
  const line = ([a, b]: Pair) => ({ x1: positions[a].x, y1: positions[a].y, x2: positions[b].x, y2: positions[b].y, 'data-from': a, 'data-to': b })
  return <svg className="perspective-network" viewBox={cropToArtwork ? perspectiveViewBox : '0 0 1000 760'} aria-hidden="true" data-logo-morph={morph}>
    {reveal && <svg className="perspective-logo-color" x="150" y="100" width="700" height="550" viewBox="170 320 920 720" preserveAspectRatio="xMidYMid meet" opacity={.3 * morph * morph} style={{ overflow: 'visible', pointerEvents: 'none' }}>
      <image href={miniLogoUrl} x="0" y="0" width="1280" height="1280" />
    </svg>}
    <g className="perspective-existing" opacity={.28 * (1 - morph)}>
      {edges.map((edge, i) => {
        const progress = visibility(edge.birthYear, TIMELINE.edgeDraw)
        return <line key={i} {...line([edge.a, edge.b])} data-birth-year={edge.birthYear} pathLength="1" opacity={progress > 0 ? 1 : 0} strokeDasharray="1" strokeDashoffset={1 - progress} />
      })}
    </g>
    {reveal && <g className="perspective-existing" opacity={.4 * morph}>{logoNetwork.edges.map(([a, b], i) => <line key={i} {...line([a, b])} />)}</g>}
    {nodes.map((node, i) => <g key={i} data-node={i} data-birth-year={node.birthYear} transform={`translate(${positions[i].x} ${positions[i].y})`} className="perspective-node" style={{ opacity: node.birthYear === TIMELINE.startYear ? 1 : visibility(node.birthYear, .18) }}>
      <circle r={node.business ? 5 : 3} />
      {node.business && <circle className="perspective-business" r="10" style={{ opacity: visibility(node.ringBirthYear, .18) }} />}
    </g>)}
    {reveal && <g className="perspective-opportunities">{[{ pairs: gaps, opacity: 1 - morph }, { pairs: logoNetwork.gaps.map(([a, b]): Pair => [a, b]), opacity: morph }].map((group, groupIndex) => <g key={groupIndex} opacity={group.opacity}>{group.pairs.map((edge, i) => <g key={i} className="perspective-gap" style={{ '--reveal-delay': `${.6 + i * .25}s` } as CSSProperties}>
      <line {...line(edge)} />
      {edge.map(n => <g key={n} data-node={n} transform={`translate(${positions[n].x} ${positions[n].y})`}>
        <circle className="perspective-glow" r="17" /><circle className="perspective-endpoint" r={nodes[n].business ? 5 : 3.5} />
        <circle className="perspective-potential-ring" r={nodes[n].business ? 10 : 8} />
      </g>)}
    </g>)}</g>)}</g>}
  </svg>
}
