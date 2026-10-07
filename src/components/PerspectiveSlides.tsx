import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CreditCard, Landmark, Users, Radar, UserCheck, type LucideIcon } from 'lucide-react'
import type { Slide } from '../data/deckData'
import { PerspectiveNetwork } from './PerspectiveNetwork'
import { TIMELINE, TIMELINE_END } from '../data/perspectiveNetwork'


const existingItems: [LucideIcon, string, string?][] = [
  [CreditCard, 'Kart kullanımı'],
  [Landmark, 'Ürün ve finansman'],
  [Users, 'Mevcut ilişkiler'],
]
const opportunityItems: [LucideIcon, string][] = [
  [Users, 'Benzerlerini bulur'],
  [Radar, 'Boşluğu görür'],
  [UserCheck, 'Fırsata çevirir'],
]

export function PerspectiveSlides({ slide, direction = 'forward' }: { slide: Slide; direction?: 'forward' | 'backward' }) {
  const root = useRef<HTMLElement>(null)
  const reveal = slide.id === 'yeni-bakis'
  const current = slide.id === 'bugunku-bakis'
  const reduced = useReducedMotion()
  const end = TIMELINE_END + TIMELINE.fade
  const [elapsed, setElapsed] = useState(() => current && direction === 'forward' && !reduced ? 0 : end)
  const complete = !current || elapsed >= TIMELINE_END
  // Let edge delays finish during the 1.5-second hold; the displayed year stays 2026.
  const year = TIMELINE.startYear + Math.max(0, elapsed - TIMELINE.delay) / TIMELINE.growth * 37
  const finalFade = current ? Math.max(0, Math.min(1, (elapsed - TIMELINE_END) / TIMELINE.fade)) : 1
  useLayoutEffect(() => {
    if (!current || direction === 'backward' || reduced) { setElapsed(end); return }
    setElapsed(0)
    const start = performance.now()
    let frame = 0, skipped = false
    const finish = () => { skipped = true; cancelAnimationFrame(frame); setElapsed(end) }
    const tick = (now: number) => {
      if (skipped) return
      const seconds = Math.min(end, (now - start) / 1000)
      setElapsed(seconds)
      if (seconds < end) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    window.addEventListener('ekomatch:finish-timeline', finish)
    return () => { skipped = true; cancelAnimationFrame(frame); window.removeEventListener('ekomatch:finish-timeline', finish) }
  }, [slide.id, current, direction, reduced, end])
  useEffect(() => { root.current?.focus({ preventScroll: true }) }, [slide.id])
  return <section ref={root} tabIndex={-1} data-timeline-running={current && elapsed < end} className={`scene deck-scene deck-perspective${reveal ? ' is-new-view' : ''}${current ? ' is-current-view' : ''}`} aria-label={slide.shortTitle}>
    <div className="deck-veil" />
    <div className="perspective-layout">
      <div className="perspective-copy-slot">
        <p className="deck-tag perspective-fixed-tag">{slide.eyebrow}</p>
          <div key={slide.id} className="perspective-copy">
            <h1>{reveal ? <><span className="perspective-title-line">EkoMatch, henüz</span><br />{' '}<span className="perspective-title-line">kurulmamış olanlara bakıyor.</span></> : slide.title}</h1>
            <p className="perspective-description">{reveal
              ? 'Benzerlerinde olup bir müşteride henüz olmayan ilişki, EkoMatch için bir boşluktur.'
              : 'CRM, kampanya ve ürün öneri sistemleri, müşterilerin bugüne kadar yaptıklarına dayanır.'}</p>
            <ul className="perspective-items">{(reveal ? opportunityItems : existingItems).map(([Icon, title]) => <li key={title}>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <div><h2>{title}</h2></div>
            </li>)}</ul>
            <p className="perspective-emphasis" style={{ opacity: finalFade }} aria-hidden={finalFade === 0}>{reveal ? 'Henüz kurulmamış ilişki, keşfedilmeyi bekleyen bir fırsattır.' : 'Peki, henüz kurulmamış olanlar?'}</p>
          </div>
      </div>
      <div className="perspective-visual">
        <div className="perspective-artwork">
          {current && <div className="perspective-year"><span className="perspective-year-value">{Math.min(2026, Math.floor(year))}</span><span className="perspective-today" style={{ opacity: Math.max(0, Math.min(1, (elapsed - TIMELINE.delay - TIMELINE.growth) / TIMELINE.fade)) }}>bugün</span></div>}
          <PerspectiveNetwork reveal={reveal} cropToArtwork year={year} complete={complete} />
        </div>
        <div className="perspective-legend-space" aria-hidden="true" />
      </div>
    </div>
  </section>
}
