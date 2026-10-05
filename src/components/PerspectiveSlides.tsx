import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CreditCard, Landmark, Users, Radar, UserCheck, type LucideIcon } from 'lucide-react'
import type { Slide } from '../data/deckData'
import { PerspectiveNetwork } from './PerspectiveNetwork'

const existingItems: [LucideIcon, string, string?][] = [
  [CreditCard, 'Kart kullanımı'],
  [Landmark, 'Ürün ve finansman'],
  [Users, 'Mevcut ilişkiler'],
]
const opportunityItems: [LucideIcon, string, string][] = [
  [Users, 'Benzerlerini bulur', 'Davranışı ve yapısı benzeyen müşteri ve işletmeler'],
  [Radar, 'Boşluğu görür', 'Benzerlerinde kurulmuş, onda henüz kurulmamış ilişki'],
  [UserCheck, 'Fırsata çevirir', 'Şubeci doğrular, banka ilişkinin kurulmasını destekler'],
]

export function PerspectiveSlides({ slide }: { slide: Slide }) {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const reveal = slide.id === 'yeni-bakis'
  useEffect(() => { root.current?.focus({ preventScroll: true }) }, [slide.id])
  const item = { hidden: { opacity: 0, y: reduced ? 0 : 12 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : .35 } } }
  return <section ref={root} tabIndex={-1} className={`scene deck-scene deck-perspective${reveal ? ' is-new-view' : ''}`} aria-label={slide.shortTitle}>
    <div className="deck-veil" />
    <div className="perspective-layout">
      <div className="perspective-copy-slot">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} className="perspective-copy" initial="hidden" animate="visible" exit={{ opacity: 0, transition: { duration: reduced ? 0 : .15 } }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .15 } } }}>
            <motion.p variants={item} className="deck-tag">{slide.eyebrow}</motion.p>
            <motion.h1 variants={item}>{slide.title}</motion.h1>
            <motion.p variants={item} className="perspective-description">{reveal
              ? 'Birbirine benzeyen müşteriler ve işletmeler çoğu zaman benzer ilişkiler kurar. Benzerlerinde olup bir müşteride henüz olmayan ilişki, EkoMatch için bir boşluktur.'
              : 'Bankacılık sistemleri müşterilerin bugüne kadar yaptıklarını kaydeder. CRM, kampanya ve ürün öneri sistemleri bu kayıtlar üzerinde çalışır.'}</motion.p>
            <ul className="perspective-items">{(reveal ? opportunityItems : existingItems).map(([Icon, title, description]) => <motion.li key={title} variants={item}>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
            </motion.li>)}</ul>
            {reveal && <motion.p variants={item} className="perspective-example">Örnek: Benzer istasyonlar şarj ünitesi kurmuş; bu istasyon henüz kurmamış.</motion.p>}
            <motion.p variants={item} className="perspective-emphasis">{reveal ? 'Henüz kurulmamış ilişki, keşfedilmeyi bekleyen bir fırsattır.' : 'Hepsi, zaten kurulmuş ilişkiler.'}</motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="perspective-visual">
        <PerspectiveNetwork reveal={reveal} />
        <div className="perspective-legend"><span><i />Kurulmuş ilişki</span>{reveal && <span><i className="is-potential" />Henüz kurulmamış ilişki</span>}</div>
      </div>
    </div>
  </section>
}
