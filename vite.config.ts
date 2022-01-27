import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@comp': path.resolve(__dirname, './src/components'),
    },
  },
})
