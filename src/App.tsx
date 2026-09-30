import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { PresentationShell } from './components/PresentationShell'
import { scenes } from './data/deckData'
import { DeckScene } from './scenes/Deck'

export default function App() {
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
      if (i >= 0) navigate(i)
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
        key={scenes[index].id}
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
