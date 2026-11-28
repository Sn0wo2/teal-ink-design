<script setup lang="ts">
import { NFlex, TiLogo } from '@teal-ink/vue'
</script>

<template>
  <NFlex align="center" :size="24" :wrap="false">
    <TiLogo :size="42" class="brand" />
    <TiLogo :size="28" :label="$t('examples.TiLogo.brand')" class="primary" />
    <TiLogo :size="20" class="secondary" />
  </NFlex>
</template>

<style scoped>
.brand {
  --ti-logo-accent: var(--ti-palette-primary);
}
.primary {
  color: var(--ti-palette-primary);
}
.secondary {
  color: var(--ti-palette-secondary);
}
</style>
