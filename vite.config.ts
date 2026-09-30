import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs keep the build portable under any GitHub Pages
  // repository path (for example /ekomatch-sunum/).
  base: './',
})
