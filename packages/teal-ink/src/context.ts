import { inject, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import type { TiColorMode, TiTheme } from './tokens'

export interface TiThemeContext {
  mode: Ref<TiColorMode>
  theme: ComputedRef<TiTheme>
  setMode: (mode: TiColorMode, trigger?: HTMLElement) => Promise<void>
}

export const themeKey: InjectionKey<TiThemeContext> = Symbol('teal-ink-theme')

export function useTiTheme() {
  const context = inject(themeKey)
  if (!context) throw new Error('Teal Ink components must be rendered inside TiProvider')
  return context
}
