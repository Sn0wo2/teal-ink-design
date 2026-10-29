<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NLayout class="layout-preview">
    <NLayoutHeader class="layout-header">{{ t('examples.NLayoutFooter.article') }}</NLayoutHeader>
    <NLayoutContent class="layout-content">{{ t('examples.NLayoutFooter.content') }}</NLayoutContent>
    <NLayoutFooter class="layout-footer">{{ t('examples.NLayoutFooter.updated') }}</NLayoutFooter>
  </NLayout>
</template>

<style scoped lang="scss">
.layout-preview { height: 146px; border: 1px solid var(--ti-color-border); }
.layout-header, .layout-content { padding: var(--ti-space-2) var(--ti-space-3); }
.layout-footer { padding: var(--ti-space-2) var(--ti-space-3); }
</style>
