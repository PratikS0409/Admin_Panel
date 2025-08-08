import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './config'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [react()],
  server: {
    port: config.PORT,               // 👈 set custom port here
    host: true,               // 👈 optional: allows LAN access
    historyApiFallback: true,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
