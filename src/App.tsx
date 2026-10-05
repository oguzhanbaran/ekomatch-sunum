import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
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

  const navigate = (next: number) => {
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

  return <MotionConfig reducedMotion="user"><PresentationShell index={index} setIndex={navigate}>
      <div
        key={scenes[index].kind === 'perspective' ? 'perspective-pair' : scenes[index].id}
        className="scene-frame"
      >
        <DeckScene index={index} />
      </div>
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
          <div
            key="presentation"
            className="app-view"
          >
            <Presentation onDirectNavigation={() => setShowOpening(false)} />
            <AnimatePresence>{showOpening && <OpeningSequence onEnded={() => setShowOpening(false)} />}</AnimatePresence>
          </div>
        ) : (
          <motion.div key="login" className="app-view" exit={{ opacity: 0 }} transition={{ duration: .16 }}>
            <LoginGate onAuthenticated={authenticate} />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
