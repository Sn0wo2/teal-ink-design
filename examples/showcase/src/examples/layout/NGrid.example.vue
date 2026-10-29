<script setup lang="ts">
import { TiCard, NGrid, NGridItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NGrid :cols="2" :x-gap="12" :y-gap="12">
    <NGridItem :span="1"><TiCard size="small">{{ t('examples.NGrid.item', { number: 1 }) }}</TiCard></NGridItem>
    <NGridItem :span="1"><TiCard size="small">{{ t('examples.NGrid.item', { number: 2 }) }}</TiCard></NGridItem>
  </NGrid>
</template>
