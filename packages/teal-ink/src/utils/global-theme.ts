import { createCssVariables, type TiTheme } from "../tokens"

const owners = new Map<symbol, TiTheme>()
let previous: { theme: string | null; styles: Map<string, [string, string]> } | undefined

export function setGlobalTheme(owner: symbol, theme?: TiTheme) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (theme) {
    previous ??= {
      theme: root.getAttribute("data-ti-theme"),
      styles: new Map(
        [...Object.keys(createCssVariables(theme)), "color-scheme"].map((key) => [
          key,
          [root.style.getPropertyValue(key), root.style.getPropertyPriority(key)],
        ]),
      ),
    }
    owners.delete(owner)
    owners.set(owner, theme)
  } else owners.delete(owner)

  const active = [...owners.values()].at(-1)
  if (active) {
    root.dataset["tiTheme"] = active
    root.style.colorScheme = active
    for (const [key, value] of Object.entries(createCssVariables(active))) root.style.setProperty(key, value)
  } else if (previous) {
    if (previous.theme === null) root.removeAttribute("data-ti-theme")
    else root.setAttribute("data-ti-theme", previous.theme)
    previous.styles.forEach(([value, priority], key) => {
      if (value) root.style.setProperty(key, value, priority)
      else root.style.removeProperty(key)
    })
    previous = undefined
  }
}
