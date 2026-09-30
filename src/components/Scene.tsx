import { motion } from 'framer-motion'
import { Eyebrow } from './Brand'

type SceneProps = {
  eyebrow: string
  title: React.ReactNode
  children: React.ReactNode
  className?: string
  titleClassName?: string
}

export function Scene({ eyebrow, title, children, className = '', titleClassName = '' }: SceneProps) {
  return (
    <section className={`scene ${className}`}>
      <div className="scene__wash" />
      <div className="scene__content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <motion.h1 className={`scene__title ${titleClassName}`} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .62, ease: [0.22, 1, 0.36, 1] }}>{title}</motion.h1>
        {children}
      </div>
    </section>
  )
}

export function Statement({ children, tone = 'muted' }: { children: React.ReactNode, tone?: 'muted' | 'bright' | 'accent' }) {
  return <motion.p className={`statement statement--${tone}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 }}>{children}</motion.p>
}

export function FlowArrow({ label }: { label?: string }) {
  return <div className="flow-arrow" aria-hidden="true"><span>{label}</span><svg viewBox="0 0 80 20"><path d="M2 10h72m-8-7 8 7-8 7" /></svg></div>
}
