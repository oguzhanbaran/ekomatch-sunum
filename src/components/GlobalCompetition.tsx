import { motion, useReducedMotion } from 'framer-motion'
import { Radar, Handshake, Landmark } from 'lucide-react'
import type { Slide } from '../data/deckData'
import './GlobalCompetition.css'

const examples = [
  {
    institution: 'Standard Chartered', product: 'SOLV', description: 'Alıcı–satıcı ağı ve finansman',
    logo: new URL('../assets/global-competition/standard-chartered.png', import.meta.url).href,
    source: 'https://www.sc.com/en/press-release/sc-ventures-backs-solv-in-enabling-seamless-trade-and-access-to-finance-for-small-businesses-in-post-covid-world/',
  },
  {
    institution: 'Santander', product: 'Trade Club Alliance', description: 'Uluslararası ticari eşleşme',
    logo: new URL('../assets/global-competition/santander.svg', import.meta.url).href,
    source: 'https://www.santander.com/en/press-room/press-releases/trade-club-alliance-global-financial-leaders-to-launch-digital-platform-to-tackle-international-trade-barriers-and-help-businesses-grow',
  },
  {
    institution: 'Akbank', product: 'DijiOrtak', description: 'Ticari ilişki ve finansman yönetimi',
    logo: new URL('../assets/global-competition/akbank.svg', import.meta.url).href,
    source: 'https://www.akbank.com/kurumsal/hizmetler/dijiortak',
  },
]

const stages = [
  { title: 'Talebi keşfet', Icon: Radar },
  { title: 'İlişki öner', Icon: Handshake },
  { title: 'Finansmanla destekle', Icon: Landmark },
]

export function GlobalCompetition({ slide }: { slide: Slide }) {
  const reduced = useReducedMotion()
  return <>
    <header className="global-heading">
      <p className="deck-tag">{slide.eyebrow}</p>
      <h1>{slide.title}</h1>
    </header>
    <div className="global-content">
    <motion.div className="global-columns" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .35 }}>
      <section className="global-examples" aria-labelledby="global-examples-title">
        <span className="global-panel-number" aria-hidden="true">01</span>
        <h2 id="global-examples-title">Dünyadan örnekler</h2>
        <div className="global-example-list">
          {examples.map(example => <a className="global-example" key={example.product} href={example.source} target="_blank" rel="noopener noreferrer" aria-label={`${example.institution} ${example.product}: resmî kaynak`}>
            <div className="global-example-top"><span>{example.institution}</span><img src={example.logo} alt={`${example.institution} logosu`} draggable={false} /></div>
            <h3>{example.product}</h3>
            <p>{example.description}</p>
          </a>)}
        </div>
      </section>
      <section className="global-difference" aria-labelledby="global-difference-title">
        <span className="global-panel-number" aria-hidden="true">02</span>
        <h2 id="global-difference-title">EkoMatch’in farkı</h2>
        <div className="global-flow-card">
          <p className="global-signal-caption">Anonim sinyallerden yeni ticarete.</p>
          <ol className="global-flow">
            {stages.map(({ title, Icon }, i) => <motion.li key={title} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .3, delay: reduced ? 0 : .12 + i * .08 }}>
              <span className="global-flow-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3>
            </motion.li>)}
          </ol>
        </div>
      </section>
    </motion.div>
    <p className="global-main-message">Katılım bankacılığındaki öncülüğü,<br /> ekonomik fırsat keşfine taşıyoruz.</p>
    </div>
  </>
}
