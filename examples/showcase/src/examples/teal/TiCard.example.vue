<script setup lang="ts">
import { TiButton, TiCard, TiTag } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>
 
<template>
  <TiCard :title="t('examples.TiCard.title')">
    <template #header-extra><TiTag tone="accent">{{ t('examples.TiCard.featured') }}</TiTag></template>
    {{ t('examples.TiCard.content') }}
    <template #footer><TiButton>{{ t('examples.TiCard.more') }}</TiButton></template>
   </TiCard>
</template>
