<script setup lang="ts">
import {
  NCheckbox,
  NCode,
  NDropdown,
  NProgress,
  NSwitch,
  palette,
  TiButton,
  TiInput,
  TiLogo,
  TiTag,
  TiThemeSwitch,
  themes,
  useTiMessage,
  useTiTheme,
} from '@teal-ink/vue'
import { computed, defineAsyncComponent, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { themeIcons } from './assets/icons'
import { copyToClipboard } from './utils/clipboard'
import { useTranslatedRef } from './utils/composables'

const { t, locale } = useI18n({ useScope: 'global' })
const ComponentWorkshop = defineAsyncComponent(() => import('./components/ComponentWorkshop.vue'))
const message = useTiMessage()
const { theme } = useTiTheme()
watchEffect(() => document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themes[theme.value].canvas))
const note = useTranslatedRef(() => t('showcase.initialNote'))
const savedNote = useTranslatedRef(() => t('showcase.initialNote'))
const hideCompleted = ref(false)
const tasks = ref([true, true, false])
const copied = ref(false)
const usage = computed(() => `<script setup lang="ts">
import { TiProvider, TiButton, ${locale.value === 'en' ? 'dateEnUS, enUS' : 'dateZhCN, zhCN'} } from '@teal-ink/vue'
import '@teal-ink/vue/style.css'
\x3c/script>

<template>
  <TiProvider
    mode="system"
    :locale="${locale.value === 'en' ? 'enUS' : 'zhCN'}"
    :date-locale="${locale.value === 'en' ? 'dateEnUS' : 'dateZhCN'}"
  >
    <TiButton variant="primary">${t('showcase.hello')}</TiButton>
  </TiProvider>
</template>`)

async function copy(value: string) {
  if (await copyToClipboard(value)) {
    message.success(t('showcase.copied'))
    if (value === 'bun run build:lib') copied.value = true
  } else message.error(t('showcase.copyError'))
}

function saveNote() {
  if (!note.value.trim()) {
    message.warning(t('showcase.emptyNote'))
    return
  }
  savedNote.value = note.value
  message.success(t('showcase.saved'))
}
</script>

<template>
  <div id="top" class="showcase">
    <a href="#components" class="skip-link">{{ t('showcase.skip') }}</a>
    <header class="site-header">
      <a href="#top" class="brand" :aria-label="t('showcase.home')">
        <TiLogo :size="32" />
        <span class="brand-name">{{ t('showcase.brand') }}</span>
      </a>
      <nav class="main-nav" :aria-label="t('showcase.navigation')">
        <a href="#language">{{ t('showcase.design') }}</a>
        <a href="#components">{{ t('showcase.components') }}</a>
        <a href="#start">{{ t('showcase.start') }}</a>
      </nav>
      <div class="header-tools">
        <NDropdown
          trigger="click"
          :options="[
            { label: t('showcase.languages.chinese'), key: 'zh-CN' },
            { label: t('showcase.languages.english'), key: 'en' },
          ]"
          @select="(key: string | number) => { locale = String(key) }"
        >
          <TiButton variant="text" size="small" :aria-label="t('showcase.language')" :title="t('showcase.language')">
            {{ t('showcase.languageCode') }}
          </TiButton>
        </NDropdown>
        <TiThemeSwitch
          :label="t('showcase.appearance')"
          :labels="{ light: t('showcase.light'), dark: t('showcase.dark'), system: t('showcase.system') }"
          :icons="themeIcons"
        />
      </div>
    </header>

    <main class="main-content">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="brand-dot" aria-hidden="true" />{{ t('showcase.heroOverline') }}</p>
          <h1 id="hero-title">{{ t('showcase.heroTitle') }}<span>{{ t('showcase.heroAccent') }}</span></h1>
          <p class="hero-description">{{ t('showcase.heroDescription') }}</p>
          <div class="hero-actions">
            <TiButton tag="a" href="#components" variant="primary" size="large">
              {{ t('showcase.explore') }}<span class="button-arrow" aria-hidden="true">→</span>
            </TiButton>
            <a href="#language" class="text-link">{{ t('showcase.meet') }}<span aria-hidden="true">↗</span></a>
          </div>
          <ul class="hero-stack" aria-label="Vue 3, TypeScript, Naive UI"><li>Vue 3</li><li>TypeScript</li><li>Naive UI</li></ul>
          <a href="#ecosystems" class="text-link ecosystem-link">{{ t('showcase.ecosystems.link') }}<span aria-hidden="true">↗</span></a>
        </div>

        <div class="interface-specimen">
          <div class="specimen-caption"><span>{{ t('showcase.livePreview') }}</span><code>TiInput · TiButton · NCheckbox</code></div>
          <section class="workspace-preview" :aria-label="t('showcase.previewTitle')">
            <header class="workspace-toolbar">
              <div class="workspace-identity"><TiLogo :size="20" /><span>{{ t('showcase.previewTitle') }}</span></div>
              <span class="muted">{{ t('showcase.previewPath') }}</span>
            </header>
            <div class="workspace-body">
              <h2 class="workspace-greeting">{{ t('showcase.previewGreeting') }}</h2>
              <div class="panel-heading">
                <label id="note-title" for="project-note">{{ t('showcase.note') }}</label>
                <TiTag size="small" :tone="note === savedNote ? 'neutral' : 'accent'" aria-live="polite">{{ t(note === savedNote ? 'showcase.saved' : 'showcase.unsaved') }}</TiTag>
              </div>
              <TiInput
                id="project-note"
                v-model="note"
                type="textarea"
                aria-labelledby="note-title"
                :placeholder="t('showcase.notePlaceholder')"
                :maxlength="80"
                class="note-input"
                @keydown.ctrl.enter.prevent="saveNote"
                @keydown.meta.enter.prevent="saveNote"
              />
              <div class="note-footer">
                <span class="note-count muted">{{ note.length }} / 80</span>
                <TiButton variant="primary" size="small" @click="saveNote">{{ t('showcase.save') }}</TiButton>
              </div>
              <div class="rhythm-panel">
                <div class="panel-heading">
                  <h3>{{ t('showcase.rhythm') }}</h3>
                  <span class="task-count" aria-live="polite">{{ tasks.filter(Boolean).length }} <span class="muted">/ {{ tasks.length }}</span></span>
                </div>
                <NProgress type="line" :percentage="Math.round((tasks.filter(Boolean).length / tasks.length) * 100)" :show-indicator="false" :height="4" color="var(--ti-color-accent-text)" :aria-label="t('showcase.rhythm')" />
                <div class="task-list">
                  <div
                    v-for="(label, index) in [t('showcase.taskSpace'), t('showcase.taskFocus'), t('showcase.taskPolish')]"
                    v-show="!(hideCompleted && tasks[index])"
                    :key="label"
                    class="task-row"
                    :class="{ 'task-row--complete': tasks[index] }"
                  ><NCheckbox v-model:checked="tasks[index]">{{ label }}</NCheckbox></div>
                  <p v-if="hideCompleted && tasks.every(Boolean)" class="task-empty" role="status">{{ t('showcase.allDone') }}</p>
                </div>
              </div>
            </div>
            <footer class="workspace-footer">
              <span>{{ t('showcase.previewOnly') }}</span>
              <label for="focus-toggle" class="focus-toggle"><NSwitch id="focus-toggle" v-model:value="hideCompleted" size="small" :aria-label="t('showcase.focus')" />{{ t('showcase.focus') }}</label>
            </footer>
          </section>
        </div>
      </section>

      <section id="language" class="language-section" aria-labelledby="palette-title">
        <header class="section-heading">
          <div><p class="eyebrow"><span class="section-index">01</span>{{ t('showcase.design') }}</p><h2 id="palette-title" class="section-title">{{ t('showcase.paletteTitle') }}</h2></div>
          <p class="section-description">{{ t('showcase.paletteLead') }}</p>
        </header>
        <div class="foundations-grid">
          <div class="color-sheet">
            <div class="sheet-heading"><h3>{{ t('showcase.paletteLabel') }}</h3><span>{{ t('showcase.paletteHint') }}</span></div>
            <div class="neutral-tokens">
              <button
                v-for="key in (['paper', 'ivory', 'sand', 'charcoal', 'ink'] as const)"
                :key="key"
                type="button"
                class="neutral-token"
                :aria-label="t('showcase.copyColor', { color: t(`showcase.colors.${key}`), hex: palette[key].toUpperCase() })"
                @click="copy(palette[key].toUpperCase())"
              ><span class="neutral-chip" :style="{ backgroundColor: palette[key] }" /><span class="token-name">{{ t(`showcase.colors.${key}`) }}</span><span class="token-hex">{{ palette[key].toUpperCase() }}</span></button>
            </div>
            <div class="accent-tokens">
              <button
                v-for="key in (['primary', 'secondary'] as const)"
                :key="key"
                type="button"
                class="accent-token"
                :aria-label="t('showcase.copyColor', { color: t(`showcase.colors.${key}`), hex: palette[key].toUpperCase() })"
                @click="copy(palette[key].toUpperCase())"
              >
                <span class="accent-chip" :style="{ backgroundColor: palette[key] }" />
                <span class="accent-token-copy"><span class="token-name">{{ t(`showcase.colors.${key}`) }}<span class="token-role">{{ t(`showcase.${key}Label`) }}</span></span><span class="token-hex">{{ palette[key].toUpperCase() }}</span></span>
                <span class="copy-label">{{ t('showcase.copy') }}</span>
              </button>
            </div>
            <div class="color-roles"><p><span class="role-dot primary-dot" aria-hidden="true" />{{ t('showcase.primaryRole') }}</p><p><span class="role-dot secondary-dot" aria-hidden="true" />{{ t('showcase.secondaryRole') }}</p></div>
            <p class="palette-note">{{ t('showcase.paletteNote') }}</p>
          </div>
          <div class="type-sheet">
            <div class="sheet-heading"><h3>{{ t('showcase.typography') }}</h3><span>{{ t('showcase.typeHint') }}</span></div>
            <div class="type-sample"><div class="sample-label"><span>{{ t('showcase.typeHeading') }}</span><code>--ti-font-serif</code></div><p class="type-serif">{{ t('showcase.typeSerifSample') }}</p></div>
            <div class="type-sample"><div class="sample-label"><span>{{ t('showcase.typeBody') }}</span><code>--ti-font-sans</code></div><p class="type-body">{{ t('showcase.typeBodySample') }}</p></div>
            <div class="type-sample"><div class="sample-label"><span>{{ t('showcase.typeCode') }}</span><code>--ti-font-mono</code></div><code class="type-mono">import { TiButton } from '@teal-ink/vue'</code></div>
            <div class="foundation-notes"><p><code>4px</code>{{ t('showcase.spacingUnit') }}</p><p><code>1.7</code>{{ t('showcase.bodyRhythm') }}</p></div>
          </div>
        </div>
      </section>

      <ComponentWorkshop />

      <section id="start" class="start-section" aria-labelledby="start-title">
        <div class="start-copy">
          <p class="eyebrow"><span class="section-index">03</span>{{ t('showcase.startOverline') }}</p>
          <h2 id="start-title" class="section-title">{{ t('showcase.startTitle') }}</h2>
          <p class="section-description">{{ t('showcase.startDescription') }}</p>
          <p class="start-note">{{ t('showcase.providerNote') }}</p>
        </div>
        <div class="install-panel">
          <div class="install-heading"><span>{{ t('showcase.workspaceSetup') }}</span><code>Vue 3 + TypeScript</code></div>
          <div class="install-command"><code><span class="muted" aria-hidden="true">$</span> bun run build:lib</code><TiButton variant="text" size="small" :aria-label="t(copied ? 'showcase.copyAgain' : 'showcase.copyCommand')" @click="copy('bun run build:lib')">{{ t(copied ? 'showcase.copied' : 'showcase.copy') }}</TiButton></div>
          <NCode :code="usage" language="html" class="usage-code" />
        </div>
        <section id="ecosystems" class="ecosystems" aria-labelledby="ecosystems-title">
          <div class="ecosystems-copy">
            <h3 id="ecosystems-title">{{ t('showcase.ecosystems.title') }}</h3>
            <p>{{ t('showcase.ecosystems.description') }}</p>
          </div>
          <div>
            <dl class="ecosystem-routes">
              <div>
                <dt><span>Vue 3</span><span class="ecosystem-kind">{{ t('showcase.ecosystems.vueLabel') }}</span></dt>
                <dd><code>@teal-ink/vue</code><p>{{ t('showcase.ecosystems.vueDescription') }}</p></dd>
              </div>
              <div>
                <dt><span>HTML · jQuery · React · Svelte · Angular</span><span class="ecosystem-kind">Web Components</span></dt>
                <dd><code>@teal-ink/elements</code><p>{{ t('showcase.ecosystems.elementsDescription') }}</p></dd>
              </div>
            </dl>
            <p class="ecosystem-note">{{ t('showcase.ecosystems.verification') }}</p>
          </div>
        </section>
      </section>
    </main>
    <footer class="site-footer"><div class="footer-brand"><TiLogo :size="24" /><span>{{ t('showcase.brand') }}</span></div><p>{{ t('showcase.footerNote') }}</p><a href="#top" class="footer-top">{{ t('showcase.top') }}<span aria-hidden="true">↑</span></a></footer>
  </div>
</template>

<style scoped lang="scss">
.showcase {
  width: min(1200px, calc(100% - var(--ti-space-16)));
  margin-inline: auto;
  color: var(--ti-color-text);
  overflow-wrap: anywhere;
}
h1, h2, h3, p { margin: 0; }
a:not(.n-button) { color: inherit; text-decoration: none; }
a, button { -webkit-tap-highlight-color: transparent; }
.site-header, .brand, .main-nav, .header-tools, .hero-actions, .specimen-caption, .workspace-toolbar, .workspace-identity, .panel-heading, .note-footer, .workspace-footer, .focus-toggle, .sheet-heading, .accent-token, .sample-label, .install-heading, .install-command, .site-footer, .footer-brand { display: flex; align-items: center; }
.site-header { justify-content: space-between; gap: var(--ti-space-6); min-height: 96px; border-bottom: 1px solid var(--ti-color-border); }
.brand, .workspace-identity, .footer-brand { --ti-logo-accent: var(--ti-palette-primary); gap: var(--ti-space-3); }
.brand { flex-shrink: 0; }
.brand-name { font: 400 1.375rem / var(--ti-line-height-heading) var(--ti-font-serif); }
.main-nav { gap: var(--ti-space-8); color: var(--ti-color-text-secondary); }
.main-nav a { padding-block: var(--ti-space-3); }
.main-nav a:hover, .text-link:hover, .footer-top:hover { color: var(--ti-color-accent-text); }
.header-tools { gap: var(--ti-space-3); }
.main-content { display: grid; gap: var(--ti-space-20); padding-bottom: var(--ti-space-20); }
.hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--ti-space-16); align-items: center; padding-top: var(--ti-space-16); }
.hero-copy { padding-bottom: var(--ti-space-6); }
.eyebrow { display: flex; align-items: center; gap: var(--ti-space-3); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.brand-dot, .role-dot { flex: none; width: 8px; height: 8px; border-radius: var(--ti-radius-pill); }
.brand-dot, .primary-dot { background: var(--ti-color-primary); }
.secondary-dot { background: var(--ti-color-secondary); }
.hero h1 { margin-top: var(--ti-space-6); font: 400 var(--ti-font-size-display) / var(--ti-line-height-heading) var(--ti-font-serif); letter-spacing: -0.045em; }
.hero h1 span { display: block; }
.hero-description { max-width: 32em; margin-top: var(--ti-space-6); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-body); line-height: var(--ti-line-height-body); text-wrap: pretty; }
.hero-actions { gap: var(--ti-space-6); flex-wrap: wrap; margin-top: var(--ti-space-8); }
.button-arrow { margin-left: var(--ti-space-4); }
.text-link { display: inline-flex; align-items: center; gap: var(--ti-space-3); min-height: var(--ti-control-height); }
.hero-stack { display: flex; flex-wrap: wrap; gap: var(--ti-space-4); padding: 0; margin: var(--ti-space-8) 0 0; list-style: none; color: var(--ti-color-text-secondary); font: var(--ti-font-size-caption) / var(--ti-line-height-control) var(--ti-font-mono); }
.hero-stack li + li { padding-left: var(--ti-space-4); border-left: 1px solid var(--ti-color-border); }
.ecosystem-link { margin-top: var(--ti-space-2); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.interface-specimen { min-width: 0; }
.specimen-caption { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); margin-bottom: var(--ti-space-3); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.specimen-caption code { font: var(--ti-font-size-caption) / var(--ti-line-height-control) var(--ti-font-mono); }
.workspace-preview { overflow: hidden; border: 1px solid var(--ti-color-border); border-radius: var(--ti-radius-display); corner-shape: var(--ti-corner-shape); background: var(--ti-color-raised); }
.workspace-toolbar { justify-content: space-between; gap: var(--ti-space-3); padding: var(--ti-space-4) var(--ti-space-6); border-bottom: 1px solid var(--ti-color-border); font-size: var(--ti-font-size-label); }
.workspace-identity { min-width: 0; }
.workspace-identity :deep(svg) { flex: none; }
.workspace-body { padding: var(--ti-space-6); }
.workspace-greeting { margin-bottom: var(--ti-space-6); font: 400 1.375rem / var(--ti-line-height-heading) var(--ti-font-serif); }
.muted { color: var(--ti-color-text-secondary); }
.panel-heading { justify-content: space-between; gap: var(--ti-space-3); margin-bottom: var(--ti-space-3); }
.panel-heading label, .panel-heading h3 { font-size: var(--ti-font-size-label); font-weight: 500; }
.note-input :deep(textarea) { min-height: 72px; }
.note-footer { justify-content: space-between; gap: var(--ti-space-3); margin-top: var(--ti-space-3); }
.note-count, .task-count { font: var(--ti-font-size-label) / var(--ti-line-height-control) var(--ti-font-mono); }
.rhythm-panel { padding-top: var(--ti-space-5); margin-top: var(--ti-space-5); border-top: 1px solid var(--ti-color-border-subtle); }
.task-list { display: grid; gap: var(--ti-space-2); margin-top: var(--ti-space-3); }
.task-row { min-width: 0; }
.task-row--complete :deep(.n-checkbox__label) { color: var(--ti-color-text-secondary); text-decoration: line-through; text-decoration-color: var(--ti-color-border-strong); }
.task-empty { color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.workspace-footer { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-3); padding: var(--ti-space-3) var(--ti-space-6); border-top: 1px solid var(--ti-color-border); background: var(--ti-color-surface); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.focus-toggle { gap: var(--ti-space-2); min-height: 28px; cursor: pointer; }
.language-section { padding-top: var(--ti-space-12); border-top: 1px solid var(--ti-color-border); }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--ti-space-10); margin-bottom: var(--ti-space-10); }
.section-index { padding-right: var(--ti-space-3); border-right: 1px solid var(--ti-color-border); font-family: var(--ti-font-mono); }
.section-title { margin-top: var(--ti-space-4); font: 400 var(--ti-font-size-heading) / var(--ti-line-height-heading) var(--ti-font-serif); text-wrap: pretty; }
.section-description { max-width: 28em; color: var(--ti-color-text-secondary); line-height: var(--ti-line-height-body); }
.foundations-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: var(--ti-space-12); }
.color-sheet, .type-sheet { min-width: 0; }
.sheet-heading { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); margin-bottom: var(--ti-space-5); }
.sheet-heading h3 { font-size: var(--ti-font-size-body); font-weight: 500; }
.sheet-heading > span { color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.neutral-tokens { display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: var(--ti-space-3); }
.neutral-token, .accent-token { appearance: none; min-width: 0; padding: 0; border: 0; border-radius: var(--ti-radius-control); background: transparent; color: var(--ti-color-text); font: inherit; text-align: left; cursor: pointer; }
.neutral-token { display: grid; align-content: start; gap: var(--ti-space-1); padding-bottom: var(--ti-space-2); }
.neutral-token:hover .token-name, .accent-token:hover .copy-label { color: var(--ti-color-accent-text); }
.neutral-chip { display: block; height: 64px; margin-bottom: var(--ti-space-2); border: 1px solid var(--ti-color-border); border-radius: var(--ti-radius-control); }
.token-name { font-size: var(--ti-font-size-label); }
.token-hex { color: var(--ti-color-text-secondary); font: var(--ti-font-size-caption) / var(--ti-line-height-body) var(--ti-font-mono); }
.accent-tokens { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ti-space-4); margin-top: var(--ti-space-6); }
.accent-token { gap: var(--ti-space-3); padding-block: var(--ti-space-3); border-block: 1px solid var(--ti-color-border-subtle); border-radius: 0; }
.accent-chip { flex: none; width: 36px; height: 44px; border: 1px solid var(--ti-color-border-subtle); border-radius: var(--ti-radius-control); }
.accent-token-copy { display: grid; gap: var(--ti-space-1); }
.token-role { display: block; color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.copy-label { margin-left: auto; color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.color-roles { display: grid; gap: var(--ti-space-2); margin-top: var(--ti-space-5); font-size: var(--ti-font-size-label); }
.color-roles p { display: flex; align-items: center; gap: var(--ti-space-2); }
.palette-note { margin-top: var(--ti-space-4); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.type-sheet { padding-left: var(--ti-space-10); border-left: 1px solid var(--ti-color-border); }
.type-sample + .type-sample { margin-top: var(--ti-space-5); }
.sample-label { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); margin-bottom: var(--ti-space-2); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.sample-label code { font: inherit; font-family: var(--ti-font-mono); }
.type-serif { font: 400 var(--ti-font-size-heading) / var(--ti-line-height-heading) var(--ti-font-serif); }
.type-body { max-width: 27em; line-height: var(--ti-line-height-body); }
.type-mono { font: var(--ti-font-size-label) / var(--ti-line-height-body) var(--ti-font-mono); overflow-wrap: anywhere; }
.foundation-notes { display: flex; flex-wrap: wrap; gap: var(--ti-space-6); margin-top: var(--ti-space-6); padding-top: var(--ti-space-4); border-top: 1px solid var(--ti-color-border-subtle); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.foundation-notes p { display: flex; align-items: center; gap: var(--ti-space-2); }
.foundation-notes code { color: var(--ti-color-text); font-family: var(--ti-font-mono); }
.start-section { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr); align-items: start; gap: var(--ti-space-12); padding-top: var(--ti-space-12); border-top: 1px solid var(--ti-color-border); }
.start-copy .section-title { white-space: pre-line; }
.start-copy .section-description { margin-top: var(--ti-space-5); }
.start-note { margin-top: var(--ti-space-6); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.install-panel { min-width: 0; overflow: hidden; border: 1px solid var(--ti-color-border); border-radius: var(--ti-radius-control); background: var(--ti-color-raised); }
.install-heading { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); padding: var(--ti-space-4) var(--ti-space-5); border-bottom: 1px solid var(--ti-color-border); font-size: var(--ti-font-size-label); }
.install-heading code { color: var(--ti-color-text-secondary); font: var(--ti-font-size-caption) / var(--ti-line-height-control) var(--ti-font-mono); }
.install-command { justify-content: space-between; gap: var(--ti-space-2); padding: var(--ti-space-3) var(--ti-space-5); background: var(--ti-color-surface); border-bottom: 1px solid var(--ti-color-border); }
.install-command code { font: var(--ti-font-size-label) / var(--ti-line-height-body) var(--ti-font-mono); }
.install-command code .muted { margin-right: var(--ti-space-2); }
.usage-code { display: block; max-width: 100%; padding: var(--ti-space-5); overflow: auto; font-size: var(--ti-font-size-label); line-height: var(--ti-line-height-body); }
.ecosystems { grid-column: 1 / -1; display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr); gap: var(--ti-space-12); padding-top: var(--ti-space-8); border-top: 1px solid var(--ti-color-border-subtle); }
.ecosystems-copy h3 { font: 400 var(--ti-font-size-heading) / var(--ti-line-height-heading) var(--ti-font-serif); }
.ecosystems-copy p { margin-top: var(--ti-space-4); color: var(--ti-color-text-secondary); line-height: var(--ti-line-height-body); }
.ecosystem-routes { margin: 0; }
.ecosystem-routes > div + div { margin-top: var(--ti-space-6); padding-top: var(--ti-space-6); border-top: 1px solid var(--ti-color-border-subtle); }
.ecosystem-routes dt { display: flex; justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2) var(--ti-space-4); }
.ecosystem-kind { color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.ecosystem-routes dd { margin: var(--ti-space-2) 0 0; }
.ecosystem-routes code { font: var(--ti-font-size-label) / var(--ti-line-height-body) var(--ti-font-mono); }
.ecosystem-routes dd p { margin-top: var(--ti-space-2); color: var(--ti-color-text-secondary); line-height: var(--ti-line-height-body); }
.ecosystem-note { margin-top: var(--ti-space-5); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.site-footer { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-6); padding-block: var(--ti-space-6); border-top: 1px solid var(--ti-color-border); }
.footer-brand { font: 400 1rem / var(--ti-line-height-heading) var(--ti-font-serif); }
.site-footer > p { color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.footer-top { display: inline-flex; align-items: center; gap: var(--ti-space-3); min-height: var(--ti-control-height); font-size: var(--ti-font-size-label); }
.skip-link { position: fixed; top: var(--ti-space-3); left: var(--ti-space-4); z-index: 10; transform: translateY(calc(-100% - var(--ti-space-4))); padding: var(--ti-space-3) var(--ti-space-4); border: 1px solid var(--ti-color-border-strong); border-radius: var(--ti-radius-control); background: var(--ti-color-raised); }
.skip-link:focus { transform: translateY(0); }
@media (max-width: 1100px) {
  .hero { gap: var(--ti-space-10); }
  .hero h1 { font-size: clamp(2.5rem, 4.5vw, 3.5rem); }
  .foundations-grid { gap: var(--ti-space-8); }
  .type-sheet { padding-left: var(--ti-space-8); }
  .accent-tokens { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .accent-token + .accent-token { border-top: 0; }
  .token-role { display: inline; margin-left: var(--ti-space-2); }
}
@media (max-width: 820px) {
  .site-header { flex-wrap: wrap; padding-block: var(--ti-space-5) var(--ti-space-3); gap: var(--ti-space-4); }
  .main-nav { order: 3; width: 100%; justify-content: space-between; gap: var(--ti-space-4); border-top: 1px solid var(--ti-color-border-subtle); padding-top: var(--ti-space-1); }
  .hero { grid-template-columns: minmax(0, 1fr); gap: var(--ti-space-8); padding-top: var(--ti-space-10); }
  .hero-copy { max-width: 36em; padding: 0; }
  .hero h1 { font-size: var(--ti-font-size-display); }
  .interface-specimen { width: 100%; max-width: 620px; }
  .section-heading { align-items: flex-start; flex-direction: column; gap: var(--ti-space-4); margin-bottom: var(--ti-space-8); }
  .section-description { max-width: 36em; }
  .foundations-grid, .start-section, .ecosystems { grid-template-columns: minmax(0, 1fr); gap: var(--ti-space-8); }
  .type-sheet { padding: var(--ti-space-6) 0 0; border-top: 1px solid var(--ti-color-border); border-left: 0; }
  .accent-tokens { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ti-space-5); }
  .accent-token + .accent-token { border-top: 1px solid var(--ti-color-border-subtle); }
  .token-role { display: block; margin: 0; }
  .main-content { gap: var(--ti-space-12); padding-bottom: var(--ti-space-12); }
  .language-section, .start-section { padding-top: var(--ti-space-8); }
  .start-note { margin-top: var(--ti-space-4); }
}
@media (max-width: 480px) {
  .showcase { width: calc(100% - var(--ti-space-8)); }
  .brand { gap: var(--ti-space-2); }
  .brand-name { font-size: 1.125rem; }
  .header-tools { gap: var(--ti-space-1); }
  .site-header { column-gap: var(--ti-space-2); }
  .main-nav { font-size: var(--ti-font-size-label); }
  .hero h1 { font-size: clamp(2.25rem, 10vw, 3rem); }
  .hero h1:lang(en) { font-size: clamp(2rem, 8.5vw, 2.625rem); }
  .hero-actions { gap: var(--ti-space-5); }
  .workspace-toolbar, .workspace-body, .workspace-footer { padding-inline: var(--ti-space-4); }
  .workspace-body { padding-block: var(--ti-space-5); }
  .workspace-greeting { font-size: 1.25rem; }
  .specimen-caption code { flex-basis: 100%; }
  .neutral-tokens { grid-template-columns: repeat(auto-fit, minmax(76px, 1fr)); }
  .neutral-chip { height: 56px; }
  .accent-tokens { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .accent-token + .accent-token { border-top: 0; }
  .token-role { display: inline; margin-left: var(--ti-space-2); }
  .sheet-heading { align-items: baseline; }
  .install-heading, .install-command, .usage-code { padding-inline: var(--ti-space-4); }
  .site-footer { gap: var(--ti-space-4); }
  .site-footer > p { order: 3; flex-basis: 100%; }
}
@media (max-width: 360px) {
  .brand :deep(svg) { width: 24px; height: 24px; }
  .brand-name { max-width: 44px; font-size: 1rem; }
}
@media (pointer: coarse) {
  .brand, .main-nav a, .text-link, .footer-top, .focus-toggle { min-height: 44px; }
  .task-row :deep(.n-checkbox) { min-height: 44px; align-items: center; }
  .header-tools :deep(.n-button) { min-width: 44px; }
  .focus-toggle { padding-block: var(--ti-space-2); }
}
</style>
