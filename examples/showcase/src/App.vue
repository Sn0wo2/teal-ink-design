<script setup lang="ts">
import { defineAsyncComponent, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { TiProvider, dateEnUS, dateZhCN, enUS, zhCN, type TiColorMode } from "@teal-ink/vue";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";
import Showcase from "./Showcase.vue";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("scss", scss);

const { t, locale } = useI18n({ useScope: "global" });
const params = new URLSearchParams(location.search);
const initialMode = params.get("theme");
const mode = ref<TiColorMode>(initialMode === "light" || initialMode === "dark" ? initialMode : "system");
const preview = params.get("preview");
const StandaloneExample = defineAsyncComponent(
  () => import("./components/StandaloneExample.vue"),
);

watchEffect(() => {
  document.documentElement.lang = locale.value;
  document.title = t("app.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("app.description"));
  try { localStorage.setItem("teal-ink-locale", locale.value); } catch {}
  const url = new URL(location.href);
  url.searchParams.set("lang", locale.value);
  history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
});
</script>

<template>
  <TiProvider v-model:mode="mode" :locale="locale === 'en' ? enUS : zhCN" :date-locale="locale === 'en' ? dateEnUS : dateZhCN" :hljs="hljs" global>
    <StandaloneExample v-if="preview" :name="preview" />
    <Showcase v-else />
  </TiProvider>
</template>

<style lang="scss">
html {
  scroll-behavior: smooth;
  scroll-padding-top: 110px;
  scrollbar-color: var(--ti-color-border) var(--ti-color-canvas);
}

html[data-ti-theme] {
  background: var(--ti-color-canvas);
}
body {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.example-field {
  width: 100%;
  max-width: 420px;
}
.public-icon {
  display: block;
  width: 100%;
  height: 100%;
  background: currentColor;
  mask: var(--icon) center / contain no-repeat;
  -webkit-mask: var(--icon) center / contain no-repeat;
}
.overline {
  font-size: var(--ti-font-size-label);
  letter-spacing: 0.06em;
}
.section-title {
  margin: 0;
  font: 400 clamp(26px, 3vw, 36px) / 1.5 var(--ti-font-serif);
}

@media (max-width: 700px) {
  html {
    scroll-padding-top: 130px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .n-marquee * {
    animation: none !important;
  }
}
</style>
