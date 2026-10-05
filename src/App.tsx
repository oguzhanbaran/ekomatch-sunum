import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { LoginGate } from './components/LoginGate'
import { PresentationShell } from './components/PresentationShell'
import { scenes } from './data/deckData'
import { DeckScene } from './scenes/Deck'

const AUTH_SESSION_KEY = 'ekomatch:authenticated'

function Presentation({ onDirectNavigation }: { onDirectNavigation: () => void }) {
  const initialIndex = useMemo(() => {
    const id = window.location.hash.slice(1)
    const found = scenes.findIndex(scene => scene.id === id)
    return found >= 0 ? found : 0
  }, [])
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(1)
  const reduceMotion = useReducedMotion()

  const navigate = (next: number) => {
    setDirection(next >= index ? 1 : -1)
    setIndex(next)
  }

  useEffect(() => {
    const onHash = () => {
      const i = scenes.findIndex(scene => scene.id === window.location.hash.slice(1))
      if (i >= 0) {
        navigate(i)
        onDirectNavigation()
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  })

  const variants = reduceMotion ? {
    enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 },
  } : {
    enter: (d: number) => ({ opacity: 0, y: d * 34, scale: .992 }),
    center: { opacity: 1, y: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, y: d * -26, scale: 1.004 }),
  }

  return <MotionConfig reducedMotion="user"><PresentationShell index={index} setIndex={navigate}>
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={scenes[index].kind === 'perspective' ? 'perspective-pair' : scenes[index].id}
        className="scene-frame"
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: reduceMotion ? .12 : .42, ease: [0.22, 1, 0.36, 1] }}
      >
        <DeckScene index={index} />
      </motion.div>
    </AnimatePresence>
  </PresentationShell></MotionConfig>
}

function OpeningSequence({ onEnded }: { onEnded: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null)


  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== window.location.origin) return
      if (event.data?.type === 'animationEnded') onEnded()
    }
    window.addEventListener('message', onMessage)
    const focusFrame = () => frame.current?.focus()
    const timer = window.setTimeout(focusFrame, 0)
    return () => { window.removeEventListener('message', onMessage); window.clearTimeout(timer) }
  }, [onEnded])

  return <motion.div
    className="opening-sequence"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
  >
    <iframe ref={frame} src={`${import.meta.env.BASE_URL}giris/index.html`} title="EkoMatch açılış animasyonu" allow="autoplay; fullscreen" />
  </motion.div>
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => import.meta.env.DEV || window.sessionStorage.getItem(AUTH_SESSION_KEY) === 'true',
  )
  const [showOpening, setShowOpening] = useState(() => window.location.hash.length === 0)

  const authenticate = () => {
    window.sessionStorage.setItem(AUTH_SESSION_KEY, 'true')
    setAuthenticated(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {authenticated ? (
          <motion.div
            key="presentation"
            className="app-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .24 }}
          >
            <Presentation onDirectNavigation={() => setShowOpening(false)} />
            <AnimatePresence>{showOpening && <OpeningSequence onEnded={() => setShowOpening(false)} />}</AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="login" className="app-view" exit={{ opacity: 0 }} transition={{ duration: .16 }}>
            <LoginGate onAuthenticated={authenticate} />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
