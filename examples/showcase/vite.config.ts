import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    conditions: ['teal-ink-source', 'module', 'browser', 'development|production'],
    dedupe: ['vue'],
  },
  optimizeDeps: { exclude: ['@teal-ink/vue'] },
})
