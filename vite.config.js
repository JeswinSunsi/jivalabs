import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ['localhost', '', "*", "0.0.0.0", "fllhq-14-96-13-220.run.pinggy-free.link"],
    host: true, 
  }
})