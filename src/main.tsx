import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-ext-500.css'
import '@fontsource/space-grotesk/latin-600.css'
import '@fontsource/space-grotesk/latin-ext-600.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/space-grotesk/latin-ext-700.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-ext-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-ext-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-ext-600.css'
import '@fontsource/manrope/latin-700.css'
import '@fontsource/manrope/latin-ext-700.css'
import '@fontsource/dm-mono/latin-400.css'
import '@fontsource/dm-mono/latin-ext-400.css'
import '@fontsource/dm-mono/latin-500.css'
import '@fontsource/dm-mono/latin-ext-500.css'
import App from './App'
import './styles.css'
import './deck.css'
import './light.css'

document.documentElement.dataset.theme = 'light'

async function startApp() {
  // Load every presentation weight, including Turkish glyphs, before its first paint.
  // Waiting for fonts.ready alone would miss fonts that have not been used yet.
  const sample = 'EkoMatch İıŞşĞğÜüÖöÇç 0123456789'
  const fonts = [
    ...[500, 600, 700].map(weight => `${weight} 32px "Space Grotesk"`),
    ...[400, 500, 600, 700].map(weight => `${weight} 32px "Manrope"`),
    ...[400, 500].map(weight => `${weight} 32px "DM Mono"`),
  ]
  // A failed font request should still allow the presentation to open.
  await Promise.allSettled(fonts.map(font => document.fonts.load(font, sample)))

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

void startApp()
