const localeKey = "teal-ink-locale"

export function readStoredLocale() {
  try {
    return localStorage.getItem(localeKey)
  } catch {
    return null
  }
}

export function storeLocale(locale: string) {
  try {
    localStorage.setItem(localeKey, locale)
  } catch {}
}
