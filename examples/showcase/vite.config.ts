import { fileURLToPath } from "node:url"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@teal-ink/vue/style.css": fileURLToPath(new URL("../../packages/teal-ink/src/style.css", import.meta.url)),
    },
    conditions: ["teal-ink-source", "module", "browser", "development|production"],
    dedupe: ["vue"],
  },
  optimizeDeps: { exclude: ["@teal-ink/vue"] },
})
