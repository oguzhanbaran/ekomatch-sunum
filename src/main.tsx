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
import './projection.css'

try { document.documentElement.dataset.projection = String(localStorage.getItem('ekomatch:projection') !== 'false') } catch { document.documentElement.dataset.projection = 'true' }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
