import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/CRM/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  server: {
    hmr: {
      host: 'localhost',
    },
  },
  plugins: [react()],
})