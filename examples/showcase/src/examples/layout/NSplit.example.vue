<script setup lang="ts">
import { NFlex, NSplit } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NSplit direction="horizontal" :default-size="0.42" :min="0.25" class="split-preview">
    <template #1><NFlex align="center" class="split-pane">{{ t('examples.NSplit.navigation') }}</NFlex></template>
    <template #2><NFlex align="center" class="split-pane">{{ t('examples.NSplit.details') }}</NFlex></template>
  </NSplit>
</template>

<style scoped lang="scss">
.split-preview { height: 132px; border: 1px solid var(--ti-color-border); }
.split-pane { padding: var(--ti-space-3); }
</style>
