## Teal Ink Design

The fixed palette holds seven colors, unchanged across light and dark modes: warm lights paper `#faf9f5`, ivory `#f5f4ed`, and sand `#e8e6dc`; warm blacks ink `#141413` and charcoal `#292929`; and the theme colors teal `#39c5bb` and sage green `#8a9a78`. Fixed colors are reserved for brand marks and palette samples; interfaces color by semantic role.

Interface colors divide by semantic role, with separate values for light and dark modes:

- Three surface levels: page base, local surface, and raised surface (overlays and the like)
- Two text levels: primary content and secondary information
- Accent: primary actions, plus hover (lighter) and pressed (darker); accent text uses a deeper teal; text on teal uses ink black
- Three border weights: regular, strong (for control borders that need recognition), and subtle (decorative separators)
- Selection and focus: both use the teal family; hover never substitutes for selection
- Four state colors: success green, info purple, warning amber, and error red; low saturation, darker in light mode, lighter in dark mode

Color discipline:

- Light mode keeps a paper feel: paper as the page base, ivory as the local surface; dark mode keeps a warm black: ink as the page base, charcoal as the surface. Adjacent surfaces separate through subtle lightness differences, never mechanical inversion
- Keep large areas neutral. Teal appears only on primary actions and sparing accents; sage provides support. Theme colors never substitute for text roles
- When adding state colors, give the same meaning separate values in light and dark modes, each calibrated against its actual background
- Keep interface bases clean: no decorative gradients, grid backgrounds, noise, blur, or glow
