import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/analyze': {
        target: 'https://cunicular-spotlike-jacinda.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/api/analyze-image': {
        target: 'https://cunicular-spotlike-jacinda.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      },
      '/api': {
        target: 'http://localhost:5147',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
