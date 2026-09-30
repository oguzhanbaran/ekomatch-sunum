import { motion } from 'framer-motion'
import { Check, ShieldCheck, Sparkles } from 'lucide-react'

export function Node({ x, y, label, kind = 'default', delay = 0 }: { x: number, y: number, label: string, kind?: 'default' | 'accent' | 'warm' | 'ghost', delay?: number }) {
  return <motion.div className={`v-node v-node--${kind}`} style={{ left: `${x}%`, top: `${y}%` }} initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, type: 'spring', stiffness: 130 }}><span>{label}</span></motion.div>
}

export function AnimatedPath({ d, delay = 0, kind = 'solid' }: { d: string, delay?: number, kind?: 'solid' | 'dotted' | 'hot' }) {
  return <motion.path d={d} className={`animated-path animated-path--${kind}`} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay, duration: .8, ease: 'easeOut' }} />
}

export function Pill({ children, tone = 'default' }: { children: React.ReactNode, tone?: 'default' | 'accent' | 'warm' | 'violet' }) {
  return <span className={`pill pill--${tone}`}>{children}</span>
}

export function SignalCard({ kicker, title, text, active = false, index = 0 }: { kicker: string, title: string, text: string, active?: boolean, index?: number }) {
  return <motion.div className={`signal-card ${active ? 'is-active' : ''}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 + index * .1 }}><span>{kicker}</span><strong>{title}</strong><p>{text}</p></motion.div>
}

export function Metric({ value, label, sample = false }: { value: string, label: string, sample?: boolean }) {
  return <div className="metric"><strong>{value}</strong><span>{label}</span>{sample && <small>demo</small>}</div>
}

export function ValidationRail() {
  const items = [
    { label: 'AI SİNYALİ', text: 'Makine / ekipman ilişkisi', icon: <Sparkles size={19} /> },
    { label: 'İNSAN DOĞRULAMASI', text: '“Yeni hat yatırımı planlıyoruz.”', icon: <Check size={19} /> },
    { label: 'DOĞRULANMIŞ İHTİYAÇ', text: 'Tedarikçi alternatifleri hazır', icon: <ShieldCheck size={19} /> },
  ]
  return <div className="validation-rail">
    <div className="validation-rail__line" />
    {items.map((item, i) => <motion.div className="validation-step" key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + i * .24 }}><i>{item.icon}</i><span>{item.label}</span><strong>{item.text}</strong></motion.div>)}
  </div>
}

export function Radar({ values }: { values: number[] }) {
  const labels = ['Veri', 'Gizlilik', 'Model', 'Uyum', 'Benimsenme', 'Tedarik']
  const points = values.map((v, i) => {
    const a = (-Math.PI / 2) + i * (Math.PI * 2 / values.length)
    const r = 105 * v / 100
    return `${160 + Math.cos(a) * r},${160 + Math.sin(a) * r}`
  }).join(' ')
  return <svg className="radar" viewBox="0 0 320 320" role="img" aria-label="Risk radar görselleştirmesi">
    {[1, .75, .5, .25].map(scale => <polygon key={scale} points={values.map((_, i) => { const a = (-Math.PI / 2) + i * (Math.PI * 2 / values.length); return `${160 + Math.cos(a) * 105 * scale},${160 + Math.sin(a) * 105 * scale}` }).join(' ')} className="radar__grid" />)}
    {values.map((_, i) => { const a = (-Math.PI / 2) + i * (Math.PI * 2 / values.length); return <line key={i} x1="160" y1="160" x2={160 + Math.cos(a) * 105} y2={160 + Math.sin(a) * 105} className="radar__axis" /> })}
    <motion.polygon points={points} className="radar__shape" initial={{ opacity: 0, scale: .5, transformOrigin: 'center' }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} />
    {labels.map((label, i) => { const a = (-Math.PI / 2) + i * (Math.PI * 2 / labels.length); return <text key={label} x={160 + Math.cos(a) * 135} y={164 + Math.sin(a) * 135} textAnchor="middle">{label}</text> })}
  </svg>
}

export function SampleNotice({ children = 'Bu görseldeki veriler sunum amaçlı sentetiktir.' }: { children?: React.ReactNode }) {
  return <div className="sample-notice"><span />{children}</div>
}
