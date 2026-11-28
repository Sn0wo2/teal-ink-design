<script setup lang="ts">
import {
  NCode,
  NDropdown,
  palette,
  TiButton,
  TiLogo,
  TiThemeSwitch,
  themes,
  useTiMessage,
  useTiTheme,
} from '@teal-ink/vue'
import { computed, defineAsyncComponent, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { themeIcons } from './assets/icons'
import { copyToClipboard } from './utils/clipboard'

const { t, locale } = useI18n({ useScope: 'global' })
const ComponentWorkshop = defineAsyncComponent(() => import('./components/ComponentWorkshop.vue'))
const message = useTiMessage()
const { theme } = useTiTheme()
watchEffect(() => document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themes[theme.value].canvas))
const copied = ref(false)
const buildCommand = 'bun run build:lib'
const languageOptions = computed(() => [
  { label: t('showcase.languages.chinese'), key: 'zh-CN' },
  { label: t('showcase.languages.english'), key: 'en' },
])

const swatchCards = [
  { key: 'paper', x: 3, y: 3, w: 28, tilt: -4, z: 2, tone: 'ink' },
  { key: 'ivory', x: 53, y: 0, w: 28, tilt: 4, z: 3, tone: 'ink' },
  { key: 'sand', x: 28, y: 26, w: 26, tilt: -3, z: 4, tone: 'ink' },
  { key: 'charcoal', x: 3, y: 36, w: 28, tilt: 3, z: 2, tone: 'paper' },
  { key: 'ink', x: 53, y: 33, w: 28, tilt: -2, z: 2, tone: 'paper' },
  { key: 'primary', x: 16, y: 66, w: 28, tilt: 5, z: 3, tone: 'ink' },
  { key: 'secondary', x: 62, y: 64, w: 28, tilt: -5, z: 2, tone: 'ink' },
] as const
const semanticGroups = [
  {
    key: 'surfaces',
    roles: ['canvas', 'surface', 'raised'] as const,
  },
  {
    key: 'text',
    roles: ['text', 'textSecondary'] as const,
  },
  {
    key: 'borders',
    roles: ['border', 'borderSubtle', 'borderStrong'] as const,
  },
  {
    key: 'accent',
    roles: ['primary', 'primaryHover', 'primaryPressed', 'secondary', 'accent', 'accentHover', 'accentPressed', 'accentText', 'onAccent'] as const,
  },
  {
    key: 'selection',
    roles: ['selection', 'onSelection', 'focus'] as const,
  },
  {
    key: 'status',
    roles: ['success', 'info', 'warning', 'error'] as const,
  },
] as const
const statusRoles = new Set(['success', 'info', 'warning', 'error'])
function roleLabel(role: string) {
  return statusRoles.has(role) ? t(`showcase.stateColors.${role}`) : t(`showcase.semanticColors.${role}`)
}
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

function setLocale(key: string | number) {
  locale.value = String(key)
}

async function copy(value: string) {
  if (await copyToClipboard(value)) {
    message.success(t('showcase.copied'))
    if (value === buildCommand) copied.value = true
  } else message.error(t('showcase.copyError'))
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
        <NDropdown trigger="click" :options="languageOptions" @select="setLocale">
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
        </div>

        <div class="interface-specimen">
          <div class="specimen-caption"><span>{{ t('showcase.swatchCaption') }}</span><code>ti-ink · palette</code></div>
          <div class="swatch-field">
            <button
              v-for="card in swatchCards"
              :key="card.key"
              type="button"
              class="swatch-card"
              :class="`swatch-card--on-${card.tone}`"
              :style="{ left: `${card.x}%`, top: `${card.y}%`, width: `${card.w}%`, zIndex: card.z, '--tilt': `${card.tilt}deg`, backgroundColor: palette[card.key] }"
              :aria-label="t('showcase.copyColor', { color: t(`showcase.colors.${card.key}`), hex: palette[card.key].toUpperCase() })"
              @click="copy(palette[card.key].toUpperCase())"
            >
              <span class="swatch-card-name">{{ t(`showcase.colors.${card.key}`) }}</span>
              <span class="swatch-card-hex">{{ palette[card.key].toUpperCase() }}</span>
            </button>
          </div>
        </div>
      </section>

      <section id="language" class="language-section" aria-labelledby="palette-title">
        <header class="section-heading">
          <div><p class="eyebrow"><span class="section-index">01</span>{{ t('showcase.design') }}</p><h2 id="palette-title" class="section-title">{{ t('showcase.paletteTitle') }}</h2></div>
          <p class="section-description">{{ t('showcase.paletteLead') }}</p>
        </header>
        <div class="foundations-grid">
          <div class="color-sheet">
            <section class="semantic-palette" aria-labelledby="semantic-palette-title">
              <div class="sheet-heading"><h3 id="semantic-palette-title">{{ t('showcase.semanticPalette') }}</h3><span>{{ t('showcase.paletteHint') }}</span></div>
              <div v-for="mode in (['light', 'dark'] as const)" :key="mode" class="semantic-palette-mode">
                <h4>{{ t(`showcase.${mode}`) }}</h4>
                <div v-for="group in semanticGroups" :key="group.key" class="semantic-group">
                  <h5>{{ t(`showcase.colorGroups.${group.key}`) }}</h5>
                  <div class="neutral-tokens">
                    <button
                      v-for="role in group.roles"
                      :key="role"
                      type="button"
                      class="neutral-token"
                      :aria-label="t('showcase.copyColor', { color: `${t(`showcase.${mode}`)} · ${roleLabel(role)}`, hex: themes[mode][role].toUpperCase() })"
                      @click="copy(themes[mode][role].toUpperCase())"
                    ><span class="neutral-chip" :style="{ backgroundColor: themes[mode][role] }" /><span class="token-name">{{ roleLabel(role) }}</span><span class="token-hex">{{ themes[mode][role].toUpperCase() }}</span></button>
                  </div>
                </div>
              </div>
            </section>
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
        <div class="start-details">
          <div class="install-panel">
            <div class="install-heading"><span>{{ t('showcase.workspaceSetup') }}</span><code>Vue 3 + TypeScript</code></div>
            <div class="install-command"><code><span class="muted" aria-hidden="true">$</span> {{ buildCommand }}</code><TiButton variant="text" size="small" :aria-label="t(copied ? 'showcase.copyAgain' : 'showcase.copyCommand')" @click="copy(buildCommand)">{{ t(copied ? 'showcase.copied' : 'showcase.copy') }}</TiButton></div>
            <NCode :code="usage" language="html" class="usage-code" />
          </div>
          <div id="ecosystems" class="ecosystem-block" :aria-label="t('showcase.ecosystems.link')">
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
        </div>
      </section>
    </main>
    <footer class="site-footer"><div class="footer-brand"><TiLogo :size="24" /><span>{{ t('showcase.brand') }}</span></div><a href="#top" class="footer-top">{{ t('showcase.top') }}<span aria-hidden="true">↑</span></a></footer>
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
.site-header, .brand, .main-nav, .header-tools, .hero-actions, .specimen-caption, .sheet-heading, .sample-label, .install-heading, .install-command, .site-footer, .footer-brand { display: flex; align-items: center; }
.site-header {
  position: sticky;
  top: 0;
  z-index: 9;
  justify-content: space-between;
  gap: var(--ti-space-6);
  min-height: 96px;
  border-bottom: 1px solid var(--ti-color-border);
  background: var(--ti-color-canvas);

  @supports (backdrop-filter: blur(1px)) {
    background: color-mix(in srgb, var(--ti-color-canvas) 78%, transparent);
    backdrop-filter: blur(14px) saturate(1.1);
    -webkit-backdrop-filter: blur(14px) saturate(1.1);
  }

  @media (prefers-reduced-transparency: reduce) {
    background: var(--ti-color-canvas);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
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
.brand-dot { flex: none; width: 8px; height: 8px; border-radius: var(--ti-radius-pill); background: var(--ti-color-primary); }
.hero h1 { margin-top: var(--ti-space-6); font: 400 var(--ti-font-size-display) / var(--ti-line-height-heading) var(--ti-font-serif); letter-spacing: -0.045em; }
.hero h1 span { display: block; }
.hero-description { max-width: 32em; margin-top: var(--ti-space-6); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-body); line-height: var(--ti-line-height-body); text-wrap: pretty; }
.hero-actions { gap: var(--ti-space-6); flex-wrap: wrap; margin-top: var(--ti-space-8); }
.button-arrow { margin-left: var(--ti-space-4); }
.text-link { display: inline-flex; align-items: center; gap: var(--ti-space-3); min-height: var(--ti-control-height); }
.hero-stack { display: flex; flex-wrap: wrap; gap: var(--ti-space-4); padding: 0; margin: var(--ti-space-8) 0 0; list-style: none; color: var(--ti-color-text-secondary); font: var(--ti-font-size-caption) / var(--ti-line-height-control) var(--ti-font-mono); }
.hero-stack li + li { padding-left: var(--ti-space-4); border-left: 1px solid var(--ti-color-border); }
.interface-specimen { min-width: 0; }
.specimen-caption { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); margin-bottom: var(--ti-space-3); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.specimen-caption code { font: var(--ti-font-size-caption) / var(--ti-line-height-control) var(--ti-font-mono); }
.muted { color: var(--ti-color-text-secondary); }
.swatch-field { position: relative; max-width: 560px; aspect-ratio: 1 / 1; }
.swatch-card {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--ti-space-1);
  padding: var(--ti-space-3) var(--ti-space-4);
  aspect-ratio: 1 / 1;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  border-radius: var(--ti-radius-swatch);
  corner-shape: var(--ti-corner-shape);
  box-shadow: 0 12px 28px rgb(0 0 0 / 16%);
  transform: rotate(var(--tilt));
  transition: transform var(--ti-motion-duration) var(--ti-motion-easing);
  appearance: none;
  color: var(--ti-palette-ink);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.swatch-card:hover, .swatch-card:focus-visible { z-index: 20; transform: rotate(0deg) translateY(-6px); }
.swatch-card--on-paper { color: var(--ti-palette-paper); }
.swatch-card-name { font: 400 1rem / 1.3 var(--ti-font-serif); }
.swatch-card-hex { color: inherit; opacity: 0.68; font: var(--ti-font-size-caption) / 1.5 var(--ti-font-mono); }
.language-section { padding-top: var(--ti-space-12); border-top: 1px solid var(--ti-color-border); }
.section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--ti-space-10); margin-bottom: var(--ti-space-10); }
.section-index { padding-right: var(--ti-space-3); border-right: 1px solid var(--ti-color-border); font-family: var(--ti-font-mono); }
.section-title { margin-top: var(--ti-space-4); font: 400 var(--ti-font-size-heading) / var(--ti-line-height-heading) var(--ti-font-serif); text-wrap: pretty; }
.section-description { max-width: 28em; color: var(--ti-color-text-secondary); line-height: var(--ti-line-height-body); }
.foundations-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: var(--ti-space-12); align-items: start; }
.color-sheet, .type-sheet { min-width: 0; }
.sheet-heading { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); margin-bottom: var(--ti-space-5); }
.sheet-heading h3 { font-size: var(--ti-font-size-body); font-weight: 500; }
.sheet-heading > span { color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.semantic-palette { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ti-space-12); }
.semantic-palette .sheet-heading { grid-column: 1 / -1; margin-bottom: 0; }
.neutral-tokens { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--ti-space-3); }
.palette-note { margin-top: var(--ti-space-6); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.semantic-palette-mode h4 { margin: 0 0 var(--ti-space-3); color: var(--ti-color-text); font-size: var(--ti-font-size-body); font-weight: 500; }
.semantic-group + .semantic-group { margin-top: var(--ti-space-4); }
.semantic-group h5 { margin: 0 0 var(--ti-space-2); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); font-weight: 500; }
.neutral-token { appearance: none; min-width: 0; padding: 0; border: 0; border-radius: var(--ti-radius-control); corner-shape: var(--ti-corner-shape-control); background: transparent; color: var(--ti-color-text); font: inherit; text-align: left; cursor: pointer; }
.neutral-token { display: grid; align-content: start; gap: var(--ti-space-1); padding-bottom: var(--ti-space-2); }
.neutral-token:hover .token-name { color: var(--ti-color-accent-text); }
.neutral-chip { display: block; width: 64px; height: 64px; aspect-ratio: 1 / 1; justify-self: start; margin-bottom: var(--ti-space-2); border: 1px solid var(--ti-color-border); border-radius: var(--ti-radius-control); corner-shape: var(--ti-corner-shape-control); }
.token-name { font-size: var(--ti-font-size-label); }
.token-hex { color: var(--ti-color-text-secondary); font: var(--ti-font-size-caption) / var(--ti-line-height-body) var(--ti-font-mono); }
.type-sheet { position: sticky; top: 128px; align-self: start; padding-left: var(--ti-space-10); border-left: 1px solid var(--ti-color-border); }
.type-sample + .type-sample { margin-top: var(--ti-space-6); }
.sample-label { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); margin-bottom: var(--ti-space-2); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.sample-label code { font: inherit; font-family: var(--ti-font-mono); }
.type-serif { font: 400 var(--ti-font-size-heading) / var(--ti-line-height-heading) var(--ti-font-serif); }
.type-body { max-width: 27em; line-height: var(--ti-line-height-body); }
.type-mono { font: var(--ti-font-size-label) / var(--ti-line-height-body) var(--ti-font-mono); overflow-wrap: anywhere; }
.foundation-notes { display: flex; flex-wrap: wrap; gap: var(--ti-space-6); margin-top: var(--ti-space-8); padding-top: var(--ti-space-4); border-top: 1px solid var(--ti-color-border-subtle); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-caption); }
.foundation-notes p { display: flex; align-items: center; gap: var(--ti-space-2); }
.foundation-notes code { color: var(--ti-color-text); font-family: var(--ti-font-mono); }
.start-section { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr); align-items: start; gap: var(--ti-space-12); padding-top: var(--ti-space-12); border-top: 1px solid var(--ti-color-border); }
.start-copy { position: sticky; top: 128px; align-self: start; }
.start-copy .section-title { white-space: pre-line; }
.start-copy .section-description { margin-top: var(--ti-space-5); }
.start-note { margin-top: var(--ti-space-6); color: var(--ti-color-text-secondary); font-size: var(--ti-font-size-label); }
.start-details { display: grid; gap: var(--ti-space-8); min-width: 0; }
.install-panel { min-width: 0; overflow: hidden; border: 1px solid var(--ti-color-border); border-radius: var(--ti-radius-control); corner-shape: var(--ti-corner-shape-control); background: var(--ti-color-raised); }
.install-heading { justify-content: space-between; flex-wrap: wrap; gap: var(--ti-space-2); padding: var(--ti-space-4) var(--ti-space-5); border-bottom: 1px solid var(--ti-color-border); font-size: var(--ti-font-size-label); }
.install-heading code { color: var(--ti-color-text-secondary); font: var(--ti-font-size-caption) / var(--ti-line-height-control) var(--ti-font-mono); }
.install-command { justify-content: space-between; gap: var(--ti-space-2); padding: var(--ti-space-3) var(--ti-space-5); background: var(--ti-color-surface); border-bottom: 1px solid var(--ti-color-border); }
.install-command code { font: var(--ti-font-size-label) / var(--ti-line-height-body) var(--ti-font-mono); }
.install-command code .muted { margin-right: var(--ti-space-2); }
.usage-code { display: block; max-width: 100%; padding: var(--ti-space-5); overflow: auto; font-size: var(--ti-font-size-label); line-height: var(--ti-line-height-body); }
.ecosystem-block { padding-top: var(--ti-space-8); border-top: 1px solid var(--ti-color-border-subtle); }
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
.footer-top { display: inline-flex; align-items: center; gap: var(--ti-space-3); min-height: var(--ti-control-height); font-size: var(--ti-font-size-label); }
.skip-link {
  position: fixed;
  top: var(--ti-space-3);
  left: var(--ti-space-4);
  z-index: 10;
  transform: translateY(calc(-100% - var(--ti-space-4)));
  padding: var(--ti-space-3) var(--ti-space-4);
  border: 1px solid var(--ti-color-border-strong);
  border-radius: var(--ti-radius-control);
  corner-shape: var(--ti-corner-shape-control);
  background: var(--ti-color-raised);

  @supports (backdrop-filter: blur(1px)) {
    background: color-mix(in srgb, var(--ti-color-raised) 78%, transparent);
    backdrop-filter: blur(14px) saturate(1.1);
    -webkit-backdrop-filter: blur(14px) saturate(1.1);
  }

  @media (prefers-reduced-transparency: reduce) {
    background: var(--ti-color-raised);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
.skip-link:focus { transform: translateY(0); }
@media (max-width: 1100px) {
  .hero { gap: var(--ti-space-10); }
  .hero h1 { font-size: clamp(2.5rem, 4.5vw, 3.5rem); }
  .foundations-grid { gap: var(--ti-space-8); }
  .semantic-palette { grid-template-columns: minmax(0, 1fr); gap: var(--ti-space-8); }
  .type-sheet { padding-left: var(--ti-space-8); }
}
@media (max-width: 820px) {
  .site-header { flex-wrap: wrap; padding-block: var(--ti-space-5) var(--ti-space-3); gap: var(--ti-space-4); }
  .main-nav { order: 3; width: 100%; justify-content: space-between; gap: var(--ti-space-4); border-top: 1px solid var(--ti-color-border-subtle); padding-top: var(--ti-space-1); }
  .hero { grid-template-columns: minmax(0, 1fr); gap: var(--ti-space-8); padding-top: var(--ti-space-10); }
  .hero-copy { max-width: 36em; padding: 0; }
  .hero h1 { font-size: var(--ti-font-size-display); }
  .interface-specimen { width: 100%; max-width: 560px; }
  .section-heading { align-items: flex-start; flex-direction: column; gap: var(--ti-space-4); margin-bottom: var(--ti-space-8); }
  .section-description { max-width: 36em; }
  .foundations-grid, .start-section { grid-template-columns: minmax(0, 1fr); gap: var(--ti-space-8); }
  .type-sheet { position: static; padding: var(--ti-space-6) 0 0; border-top: 1px solid var(--ti-color-border); border-left: 0; }
  .main-content { gap: var(--ti-space-12); padding-bottom: var(--ti-space-12); }
  .language-section, .start-section { padding-top: var(--ti-space-8); }
  .start-copy { position: static; }
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
  .specimen-caption code { flex-basis: 100%; }
  .swatch-card { padding: var(--ti-space-2) var(--ti-space-3); }
  .swatch-card-name { font-size: 0.875rem; }
  .sheet-heading { align-items: baseline; }
  .install-heading, .install-command, .usage-code { padding-inline: var(--ti-space-4); }
  .site-footer { gap: var(--ti-space-4); }
}
@media (max-width: 360px) {
  .brand :deep(svg) { width: 24px; height: 24px; }
  .brand-name { max-width: 44px; font-size: 1rem; }
}
@media (pointer: coarse) {
  .brand, .main-nav a, .text-link, .footer-top { min-height: 44px; }
  .header-tools :deep(.n-button) { min-width: 44px; }
  .swatch-card { min-width: 88px; min-height: 64px; }
}
</style>
