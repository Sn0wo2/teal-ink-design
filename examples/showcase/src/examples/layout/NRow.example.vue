<script setup lang="ts">
import { TiCard, NCol, NRow } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NRow :gutter="12">
    <NCol :span="8"><TiCard size="small">{{ t('examples.NRow.content') }}</TiCard></NCol>
    <NCol :span="8"><TiCard size="small">{{ t('examples.NRow.content') }}</TiCard></NCol>
    <NCol :span="8"><TiCard size="small">{{ t('examples.NRow.content') }}</TiCard></NCol>
  </NRow>
</template>
