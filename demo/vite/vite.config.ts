import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@intlify/worker-dom': path.join(__dirname, '../../')
    }
  }
})
