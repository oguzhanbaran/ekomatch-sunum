import { motion } from 'framer-motion'

const logoUrl = new URL('../../Ekomatch Logo.PNG', import.meta.url).href
export const ktLogoUrl = new URL('../../kt-logo-siyah.png', import.meta.url).href
export const archiLogoUrl = new URL('../../archi-logo-siyah.png', import.meta.url).href

export function SlidePartnerMarks() {
  return <div className="slide-partner-marks" aria-label="Proje paydaşları">
    <span className="slide-partner-mark is-kt"><img src={ktLogoUrl} alt="Kuveyt Türk" draggable={false} /></span>
    <span className="slide-partner-mark is-archi"><img src={archiLogoUrl} alt="Architecht" draggable={false} /></span>
  </div>
}

export function EkoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`} aria-label="EkoMatch">
      <img src={logoUrl} alt="EkoMatch" draggable={false} />
    </div>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="eyebrow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .12, duration: .42 }}
    >
      <span className="eyebrow__line" />{children}
    </motion.div>
  )
}

export function DemoBadge() {
  return <span className="demo-badge">SENTETİK DEMO VERİSİ</span>
}
