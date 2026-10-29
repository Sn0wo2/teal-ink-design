export const palette = {
  paper: '#faf9f5',
  ivory: '#f5f4ed',
  sand: '#e8e6dc',
  charcoal: '#292929',
  ink: '#141413',
  primary: '#39c5bb',
  secondary: '#8a9a78',
} as const

export type TiColorMode = 'light' | 'dark' | 'system'
export type TiTheme = Exclude<TiColorMode, 'system'>

export const foundations = {
  fontSans: '"Noto Sans SC Variable", "Noto Sans SC", "Noto Sans", sans-serif',
  fontSerif: '"Noto Serif SC Variable", "Noto Serif SC", "Noto Serif", serif',
  fontMono:
    '"Noto Sans Mono Variable", "Noto Sans Mono", "Noto Sans Mono CJK SC", "Noto Sans SC Variable", "Noto Sans SC", monospace',
  fontEmoji: '"Noto Color Emoji", "Noto Emoji", emoji',
  fontSizeCaption: '0.6875rem',
  fontSizeLabel: '0.75rem',
  fontSizeBody: '0.875rem',
  fontSizeHeading: '1.75rem',
  fontSizeDisplay: 'clamp(3rem, 5vw, 4.25rem)',
  lineHeightBody: '1.7',
  lineHeightHeading: '1.28',
  lineHeightControl: '1.5',
  radiusControl: '8px',
  radiusSwatch: '12px',
  radiusDisplay: '18px',
  radiusPill: '999px',
  controlHeight: '36px',
  motionDuration: '160ms',
  motionThemeDuration: '360ms',
  motionEasing: 'ease-out',
} as const

export const themes = {
  light: {
    canvas: palette.paper,
    surface: palette.ivory,
    raised: palette.paper,
    text: palette.ink,
    textSecondary: '#6f6e68',
    border: '#dedcd2',
    borderSubtle: '#dedcd28c',
    borderStrong: '#6f6e68',
    primary: palette.primary,
    primaryHover: '#60cfc7',
    primaryPressed: '#30a79f',
    secondary: palette.secondary,
    accent: palette.primary,
    accentHover: '#60cfc7',
    accentPressed: '#30a79f',
    accentText: '#18756f',
    onAccent: palette.ink,
    selection: '#e0f2ee',
    onSelection: palette.ink,
    success: '#265b19',
    info: '#74556f',
    warning: '#5a4815',
    error: '#7f2c28',
    focus: '#18756f',
    shadowFloating: '0 20px 50px rgb(0 0 0 / 5%)',
  },
  dark: {
    canvas: palette.ink,
    surface: '#242422',
    raised: palette.charcoal,
    text: palette.paper,
    textSecondary: '#aaa79f',
    border: '#3f3f39',
    borderSubtle: '#faf9f51a',
    borderStrong: '#aaa79f',
    primary: palette.primary,
    primaryHover: '#60cfc7',
    primaryPressed: '#30a79f',
    secondary: palette.secondary,
    accent: palette.primary,
    accentHover: '#60cfc7',
    accentPressed: '#30a79f',
    accentText: palette.primary,
    onAccent: palette.ink,
    selection: '#1d3835',
    onSelection: palette.paper,
    success: '#7ab948',
    info: '#c2a0c2',
    warning: '#d1a041',
    error: '#ee8884',
    focus: palette.primary,
    shadowFloating: '0 20px 50px rgb(0 0 0 / 28%)',
  },
} as const

export function createCssVariables(theme: TiTheme): Record<`--ti-${string}`, string> {
  return Object.fromEntries([
    ...Object.entries(palette).map(([key, value]) => [`--ti-palette-${key}`, value]),
    ...Object.entries(foundations).map(([key, value]) => [
      `--ti-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      value,
    ]),
    ...Object.entries(themes[theme]).map(([key, value]) => [
      key === 'shadowFloating'
        ? '--ti-shadow-floating'
        : `--ti-color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      value,
    ]),
    ...[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((step) => [`--ti-space-${step}`, `${step * 4}px`]),
  ])
}
