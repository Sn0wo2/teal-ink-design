import { createApp } from "vue"
import { createI18n } from "vue-i18n"
import App from "./App.vue"
import en from "./assets/i18n/en.json"
import zhCN from "./assets/i18n/zh-CN.json"
import { readStoredLocale } from "./utils/storage"
import "@fontsource-variable/noto-sans-sc"
import "@fontsource-variable/noto-serif-sc"
import "@fontsource-variable/noto-sans-mono"
import "katex/dist/katex.min.css"

const requestedLocale = new URLSearchParams(location.search).get("lang") || readStoredLocale() || navigator.language
createApp(App)
  .use(
    createI18n({
      legacy: false,
      locale: requestedLocale.toLowerCase().startsWith("en") ? "en" : "zh-CN",
      fallbackLocale: "zh-CN",
      messages: { "zh-CN": zhCN, en },
    }),
  )
  .mount("#app")
