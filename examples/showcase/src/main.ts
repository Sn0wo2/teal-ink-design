import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import zhCN from './assets/i18n/zh-CN.json'
import en from './assets/i18n/en.json'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource-variable/noto-serif-sc'
import '@fontsource-variable/noto-sans-mono'
import 'katex/dist/katex.min.css'

let storedLocale: string | null = null
try { storedLocale = localStorage.getItem('teal-ink-locale') } catch {}
createApp(App)
  .use(createI18n({
    legacy: false,
    locale: ((new URLSearchParams(location.search).get('lang')) || storedLocale || navigator.language).toLowerCase().startsWith('en') ? 'en' : 'zh-CN',
    fallbackLocale: 'zh-CN',
    messages: { 'zh-CN': zhCN, en },
  }))
  .mount('#app')
