<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutHeader } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NLayout class="layout-preview">
    <NLayoutHeader class="layout-header">{{ t('examples.NLayoutHeader.header') }}</NLayoutHeader>
    <NLayoutContent class="layout-content">{{ t('examples.NLayoutHeader.content') }}</NLayoutContent>
  </NLayout>
</template>

<style scoped lang="scss">
.layout-preview { height: 146px; border: 1px solid var(--ti-color-border); }
.layout-header, .layout-content { padding: var(--ti-space-3); }
</style>
