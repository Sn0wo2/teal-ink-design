# Web integration

- **Vue:** Import `@teal-ink/vue/style.css` once and use `TiProvider` with matching `locale` and `date-locale`. It defaults to scoped light; `mode="system"` follows the OS. Use `global` for document theming only; otherwise keep token-dependent overlays inside the scope
- **Custom elements:** Import `@teal-ink/elements/register` and use `ti-provider` with `ti-*` controls. Styles are included. Use `@teal-ink/elements/register-full` instead if you need `ti-component`
- **Plain CSS:** Copy [tokens.css](../assets/tokens.css) into the app and set the theme root's `data-ti-theme` to `light` or `dark`. Follow `prefers-color-scheme` while system mode is selected. The sheet provides variables and `color-scheme` only; apply the roles to the host components

For custom controls, use visible keyboard focus, 44 px target sizing for coarse pointers, and reduced-motion support. Prefer live package tokens over the bundled snapshot in an existing integration
