import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, Grid2X2, Maximize, Minimize, RotateCcw, StickyNote, Sun, X } from 'lucide-react'
import { scenes } from '../data/deckData'

type Props = {
  projection: boolean
  toggleProjection: () => void
  index: number
  setIndex: (index: number) => void
  children: React.ReactNode
}

export function PresentationShell({ index, setIndex, children, projection, toggleProjection }: Props) {
  const [overview, setOverview] = useState(false)
  const [notes, setNotes] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(false)
  const [canvasScale, setCanvasScale] = useState(() => Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const revealControls = useCallback(() => {
    setControlsVisible(true)
    clearTimeout(controlsTimer.current)
    controlsTimer.current = setTimeout(() => {
      if (!document.activeElement?.closest('.topbar, .controls')) setControlsVisible(false)
    }, 2500)
  }, [])
  useEffect(() => {
    const resize = () => setCanvasScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
    window.addEventListener('resize', resize)
    return () => { window.removeEventListener('resize', resize); clearTimeout(controlsTimer.current) }
  }, [])
  const wheelLast = useRef(0)
  const wheelNav = useRef(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const total = scenes.length
  const clamp = useCallback((n: number) => Math.max(0, Math.min(total - 1, n)), [total])
  const go = useCallback((n: number) => setIndex(clamp(n)), [clamp, setIndex])

  useEffect(() => {
    window.history.replaceState(null, '', `#${scenes[index].id}`)
    document.title = `${String(index + 1).padStart(2, '0')} · ${scenes[index].shortTitle} — EkoMatch`
  }, [index])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || document.querySelector('dialog[open]')) return
      const target = event.target as HTMLElement
      if (target.closest('input, select, textarea, [contenteditable=true]')) return
      if (event.key.toLowerCase() === 'p') { toggleProjection(); revealControls(); return }
      if (event.key.toLowerCase() === 'c') { revealControls(); return }
      if (event.key === 'Tab') revealControls()
      if (overview && event.key === 'Escape') return setOverview(false)
      if (notes && event.key === 'Escape') return setNotes(false)
      if (overview || notes) return
      if (event.key === ' ' && target.closest('button, a')) return
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); go(index + 1) }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); go(index - 1) }
      if (event.key.toLowerCase() === 'o') setOverview(v => !v)
      if (event.key.toLowerCase() === 'n') setNotes(v => !v)
      if (event.key.toLowerCase() === 'f') toggleFullscreen()
      if (event.key === 'Home') go(0)
      if (event.key === 'End') go(total - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, notes, overview, total, toggleProjection, revealControls])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (overview || notes || event.ctrlKey || document.querySelector('dialog[open]')) return
      const scene = document.querySelector('.deck-scene')
      if (scene && scene.scrollHeight > scene.clientHeight + 2) return
      const now = performance.now()
      const quiet = now - wheelLast.current > 180
      wheelLast.current = now
      if (!quiet || now - wheelNav.current < 720 || Math.abs(event.deltaY) < 18) return
      wheelNav.current = now
      go(index + (event.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [go, index, notes, overview])

  useEffect(() => {
    const onFull = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFull)
    return () => document.removeEventListener('fullscreenchange', onFull)
  }, [])

  useEffect(() => {
    if (!overview && !notes) return
    const panel = document.querySelector<HTMLElement>(overview ? '.overview' : '.notes')
    const previous = document.activeElement as HTMLElement | null
    panel?.querySelector<HTMLButtonElement>('button')?.focus()
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'))
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    window.addEventListener('keydown', trap)
    return () => { window.removeEventListener('keydown', trap); previous?.focus({ preventScroll: true }) }
  }, [overview, notes])

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.()
      else await document.exitFullscreen?.()
    } catch { /* Unsupported browser / presentation host: native window controls remain available. */ }
  }

  return <main className={`presentation${controlsVisible ? ' controls-visible' : ''}`} onPointerMove={revealControls} onBlurCapture={e => { if ((e.target as HTMLElement).closest('.topbar, .controls')) revealControls() }} onFocusCapture={e => { if ((e.target as HTMLElement).closest('.topbar, .controls')) revealControls() }} onTouchStart={e => {
    touchStart.current = null
    if (overview || notes || (e.target as HTMLElement).closest('button, select, input, dialog, .benchmark-scroll, .gantt, .relation-heatmap')) return
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }} onTouchEnd={e => {
    if (!touchStart.current) return
    const dx = touchStart.current.x - e.changedTouches[0].clientX, dy = touchStart.current.y - e.changedTouches[0].clientY
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx > 0 ? 1 : -1))
    touchStart.current = null
  }}>
    <a href="#scene" className="skip-link">Sunuma geç</a>
    <div className="presentation__grain" />
    <header className="topbar" inert={overview || notes || !controlsVisible}>
      <div className="topbar__spacer" aria-hidden="true" />
      <div className="topbar__chapter"><span>{String(index + 1).padStart(2, '0')}</span>{scenes[index].shortTitle}</div>
      <div className="topbar__tools">
        <button className="projection-toggle" onClick={toggleProjection} aria-pressed={projection} aria-label="Projeksiyon Modu" title="Projeksiyon Modu (P)"><Sun /><span>Projeksiyon Modu</span></button>
        <button onClick={() => setNotes(v => !v)} aria-label="Konuşmacı notları" title="Konuşmacı notları (N)"><StickyNote /></button>
        <button onClick={() => setOverview(true)} aria-label="Sahne görünümü" title="Genel görünüm (O)"><Grid2X2 /></button>
        <button onClick={toggleFullscreen} aria-label={fullscreen ? 'Tam ekrandan çık' : 'Tam ekran'} title="Tam ekran (F)">{fullscreen ? <Minimize /> : <Maximize />}</button>
      </div>
    </header>

    <div id="scene" className="stage" style={projection ? { width: 1920, height: 1080, position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) scale(${canvasScale})` } : undefined} tabIndex={-1} inert={overview || notes}>{children}</div>

    <footer className="controls" inert={overview || notes || !controlsVisible}>
      <button className="controls__nav" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Önceki sahne"><ChevronLeft /></button>
      <div className="progress-wrap">
        <div className="progress-meta"><span>{String(index + 1).padStart(2, '0')} / {total}</span><span>{scenes[index].shortTitle}</span></div>
        <div className="progress" role="progressbar" aria-label="Sunum ilerlemesi" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total}><motion.div animate={{ scaleX: (index + 1) / total }} /></div>
      </div>
      <button className="controls__nav is-next" onClick={() => go(index + 1)} disabled={index === total - 1} aria-label="Sonraki sahne"><ChevronRight /></button>
    </footer>

    <AnimatePresence>{notes && <motion.aside role="dialog" aria-modal="true" aria-label="Konuşmacı notları" className="notes" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}><button onClick={() => setNotes(false)} aria-label="Notları kapat"><X /></button><span>KONUŞMACI NOTU · {String(index + 1).padStart(2, '0')}</span><h2>{scenes[index].shortTitle}</h2><p>{scenes[index].note}</p><div className="notes__keys"><kbd>Esc</kbd> kapat · notlar açıkken sahne sabit kalır</div></motion.aside>}</AnimatePresence>

    <AnimatePresence>{overview && <motion.div role="dialog" aria-modal="true" aria-label="Sunum akışı" className="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="overview__head"><div><span>SUNUM AKIŞI</span><h2>{total} sahne · tek ekonomik hikâye</h2></div><button onClick={() => setOverview(false)} aria-label="Genel görünümü kapat"><X /></button></div>
      <div className="overview__grid">{scenes.map((scene, i) => <button key={scene.id} className={i === index ? 'is-active' : ''} onClick={() => { go(i); setOverview(false) }}><span>{String(i + 1).padStart(2, '0')}</span><strong>{scene.shortTitle}</strong><small>{scene.eyebrow}</small><Expand /></button>)}</div>
      <button className="overview__restart" onClick={() => { go(0); setOverview(false) }}><RotateCcw /> Baştan başlat</button>
    </motion.div>}</AnimatePresence>
  </main>
}
