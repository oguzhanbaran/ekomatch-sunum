import { useEffect, useRef } from 'react'
import { CreditCard, Landmark, Users, Radar, UserCheck, type LucideIcon } from 'lucide-react'
import type { Slide } from '../data/deckData'
import { PerspectiveNetwork } from './PerspectiveNetwork'

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

export function PerspectiveSlides({ slide }: { slide: Slide }) {
  const root = useRef<HTMLElement>(null)
  const reveal = slide.id === 'yeni-bakis'
  const current = slide.id === 'bugunku-bakis'
  useEffect(() => { root.current?.focus({ preventScroll: true }) }, [slide.id])
  return <section ref={root} tabIndex={-1} className={`scene deck-scene deck-perspective${reveal ? ' is-new-view' : ''}${current ? ' is-current-view' : ''}`} aria-label={slide.shortTitle}>
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
            <p className="perspective-emphasis">{reveal ? 'Henüz kurulmamış ilişki, keşfedilmeyi bekleyen bir fırsattır.' : 'Peki, henüz kurulmamış olanlar?'}</p>
          </div>
      </div>
      <div className="perspective-visual">
        <PerspectiveNetwork reveal={reveal} cropToArtwork />
        <div className="perspective-legend"><div className="perspective-relation-legend"><span><i />Kurulmuş ilişki</span>{reveal && <span><i className="is-potential" />Henüz kurulmamış ilişki</span>}</div><div className="perspective-node-legend"><span><i className="is-customer" />Müşteri</span><span><i className="is-business" />İşletme</span></div></div>
      </div>
    </div>
  </section>
}
