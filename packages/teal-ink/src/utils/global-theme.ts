import { createCssVariables, type TiTheme } from '../tokens'

const owners = new Map<symbol, TiTheme>()
let previous: { theme: string | null; styles: Map<string, [string, string]> } | undefined

export function setGlobalTheme(owner: symbol, theme?: TiTheme) {
  if (typeof document === 'undefined') return

  if (theme) {
    if (!previous) {
      previous = {
        theme: document.documentElement.getAttribute('data-ti-theme'),
        styles: new Map(
          [...Object.keys(createCssVariables(theme)), 'color-scheme'].map((key) => [
            key,
            [
              document.documentElement.style.getPropertyValue(key),
              document.documentElement.style.getPropertyPriority(key),
            ],
          ]),
        ),
      }
    }
    owners.delete(owner)
    owners.set(owner, theme)
  } else {
    owners.delete(owner)
  }

  const active = [...owners.values()].at(-1)
  if (active) {
    document.documentElement.dataset['tiTheme'] = active
    document.documentElement.style.colorScheme = active
    Object.entries(createCssVariables(active)).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  } else if (previous) {
    if (previous.theme === null) document.documentElement.removeAttribute('data-ti-theme')
    else document.documentElement.setAttribute('data-ti-theme', previous.theme)
    previous.styles.forEach(([value, priority], key) => {
      if (value) document.documentElement.style.setProperty(key, value, priority)
      else document.documentElement.style.removeProperty(key)
    })
    previous = undefined
  }
}
