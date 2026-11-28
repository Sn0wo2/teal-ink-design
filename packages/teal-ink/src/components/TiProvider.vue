<script setup lang="ts">
import type { NDateLocale, NLocale } from 'naive-ui'
import {
  darkTheme,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
} from 'naive-ui'
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { themeKey } from '../context'
import { darkThemeOverrides, lightThemeOverrides } from '../theme'
import { createCssVariables, type TiColorMode } from '../tokens'
import { setGlobalTheme } from '../utils/global-theme'

const props = withDefaults(defineProps<{
  mode?: TiColorMode
  global?: boolean
  locale: NLocale
  dateLocale: NDateLocale
  styleMountTarget?: ParentNode | null
}>(), {
  mode: 'light',
  global: false,
})
const emit = defineEmits<{ 'update:mode': [mode: TiColorMode] }>()
const preference = typeof window === 'undefined' ? undefined : window.matchMedia('(prefers-color-scheme: dark)')
const systemEvents = new AbortController()
const currentMode = ref(props.mode)
const changing = ref(false)
const systemDark = ref(preference?.matches ?? false)
const resolveTheme = (mode: TiColorMode, dark = systemDark.value) => mode === 'system' ? (dark ? 'dark' : 'light') : mode
const theme = computed(() => resolveTheme(currentMode.value))
const owner = Symbol('teal-ink-global-theme')
let requestedMode = props.mode
let mounted = false
let transition: ViewTransition | undefined
let revision = 0

async function setMode(next: TiColorMode, trigger?: HTMLElement) {
  requestedMode = next
  const currentRevision = ++revision
  transition?.skipTransition()
  const settle = () => {
    if (currentRevision === revision) changing.value = false
  }
  const update = async () => {
    changing.value = true
    currentMode.value = requestedMode
    systemDark.value = preference?.matches ?? false
    emit('update:mode', requestedMode)
    await nextTick()
  }

  if (!props.global || theme.value === resolveTheme(next, preference?.matches ?? false)
    || typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || typeof document === 'undefined' || !document.startViewTransition) {
    await update()
    if (typeof requestAnimationFrame === 'undefined') settle()
    else requestAnimationFrame(() => requestAnimationFrame(settle))
    return
  }

  const root = document.documentElement
  const rect = trigger?.getBoundingClientRect()
  const contained = rect !== undefined && rect.top >= 0 && rect.bottom <= innerHeight
  const x = contained ? rect.left + rect.width / 2 : innerWidth / 2
  const y = contained ? rect.top + rect.height / 2 : innerHeight / 2
  root.style.setProperty('--ti-theme-origin-x', `${x}px`)
  root.style.setProperty('--ti-theme-origin-y', `${y}px`)
  root.style.setProperty('--ti-theme-radius', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`)
  root.dataset['tiTransition'] = ''

  const active = document.startViewTransition(update)
  void active.ready.catch(() => {})
  transition = active
  try { await active.finished } catch {}
  if (transition !== active) return
  transition = undefined
  settle()
  root.removeAttribute('data-ti-transition')
  for (const key of ['origin-x', 'origin-y', 'radius']) root.style.removeProperty(`--ti-theme-${key}`)
}

provide(themeKey, { mode: currentMode, theme, setMode })

watch(() => props.mode, (next) => {
  if (next !== requestedMode) void setMode(next)
})
watch([theme, () => props.global], () => {
  if (mounted) setGlobalTheme(owner, props.global ? theme.value : undefined)
}, { flush: 'post' })

onMounted(() => {
  mounted = true
  if (props.global) setGlobalTheme(owner, theme.value)
  preference?.addEventListener('change', () => {
    if (requestedMode === 'system') void setMode('system')
  }, { signal: systemEvents.signal })
})

onBeforeUnmount(() => {
  mounted = false
  transition?.skipTransition()
  systemEvents.abort()
  setGlobalTheme(owner)
})
</script>

<template>
  <NConfigProvider
    class="ti-provider"
    :data-ti-theme="theme"
    :data-ti-changing="changing ? '' : undefined"
    :style="createCssVariables(theme)"
    :theme="theme === 'dark' ? darkTheme : null"
    :theme-overrides="theme === 'dark' ? darkThemeOverrides : lightThemeOverrides"
    :locale="props.locale"
    :date-locale="props.dateLocale"
    :style-mount-target="props.styleMountTarget ?? null"
  >
    <NMessageProvider>
      <NDialogProvider>
        <slot />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style lang="scss">
:root[data-ti-theme] body {
  margin: 0;
  background: var(--ti-color-canvas);
  color: var(--ti-color-text);
  font: var(--ti-font-size-body) / var(--ti-line-height-body) var(--ti-font-sans);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

.ti-provider {
  color: var(--ti-color-text);
  font: var(--ti-font-size-body) / var(--ti-line-height-body) var(--ti-font-sans);
  color-scheme: light;

  &[data-ti-theme='dark'] { color-scheme: dark; }

  *, *::before, *::after { box-sizing: border-box; }

  :focus-visible {
    outline: 2px solid var(--ti-color-focus);
    outline-offset: var(--ti-space-1);
  }

  ::selection {
    color: var(--ti-color-on-selection);
    background: var(--ti-color-selection);
  }
}

@supports (corner-shape: squircle) {
  :is(.ti-provider, :root[data-ti-theme] body) :is(
    .n-base-selection,
    .n-base-selection__border,
    .n-base-selection__state-border,
    .n-button,
    .n-button__border,
    .n-button__state-border,
    .n-checkbox-box,
    .n-checkbox-box__border,
    .n-input,
    .n-input__border,
    .n-input__state-border,
    .n-message,
    .n-tag
  ) {
    corner-shape: var(--ti-corner-shape-control);
  }

  :is(.ti-provider, :root[data-ti-theme] body) :is(
    .n-alert,
    .n-auto-complete-menu,
    .n-base-select-menu,
    .n-card,
    .n-cascader-menu,
    .n-color-picker,
    .n-color-picker-panel,
    .n-date-panel,
    .n-dialog,
    .n-dropdown-menu,
    .n-mention-menu,
    .n-notification,
    .n-popover,
    .n-popselect-menu,
    .n-time-picker-panel,
    .n-tree-select-menu,
    .n-upload-dragger
  ) {
    corner-shape: var(--ti-corner-shape);
  }

  :is(.ti-provider, :root[data-ti-theme] body) :is(.n-input--round, .n-tag--round, .n-button--circle) { corner-shape: round; }
}

:is(:root[data-ti-transition], .ti-provider[data-ti-changing]) {
  *, *::before, *::after { transition: none !important; }
}

:root[data-ti-transition] {
  &::view-transition { pointer-events: none; }

  &::view-transition-group(root), &::view-transition-old(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  &::view-transition-new(root) {
    animation: ti-theme-reveal var(--ti-motion-theme-duration) var(--ti-motion-easing) both;
    mix-blend-mode: normal;
  }
}

@keyframes ti-theme-reveal {
  from { clip-path: circle(0 at var(--ti-theme-origin-x) var(--ti-theme-origin-y)); }
  to { clip-path: circle(var(--ti-theme-radius) at var(--ti-theme-origin-x) var(--ti-theme-origin-y)); }
}

@media (pointer: coarse) {
  .ti-provider { --ti-control-height: 44px !important; }
  .ti-provider :is(.n-button, .n-input, .n-base-selection) { min-height: var(--ti-control-height); }
  .ti-provider :is(.n-tag--closable, .n-base-close, .n-base-clear, .n-base-clear__clear, .n-input__input-el, .n-checkbox, .n-radio, .n-tabs-tab) {
    min-height: var(--ti-control-height);
  }
  .ti-provider :is(.n-base-close, .n-base-clear, .n-base-clear__clear, .n-checkbox, .n-radio, .n-tabs-tab) { min-width: var(--ti-control-height); }
  .ti-provider .n-base-clear__clear {
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%) !important;
  }
  .ti-provider .n-tag--round.n-tag--closable { border-radius: var(--ti-radius-pill); }
}

@media (prefers-reduced-motion: reduce) {
  :is(:root[data-ti-theme], .ti-provider) {
    --ti-motion-duration: 0ms !important;
    --ti-motion-theme-duration: 0ms !important;

    *, &::before, &::after, & {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }

    .n-base-clear__clear { transform: translate(-50%, -50%) !important; }
  }

  :root[data-ti-transition]::view-transition-new(root) { animation: none; }
}
</style>
