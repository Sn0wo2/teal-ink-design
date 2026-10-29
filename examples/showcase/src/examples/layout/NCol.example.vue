<script setup lang="ts">
import { TiCard, NCol, NRow } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NRow :gutter="12">
    <NCol :span="12"><TiCard size="small">{{ t('examples.NCol.half') }}</TiCard></NCol>
    <NCol :span="12"><TiCard size="small">{{ t('examples.NCol.half') }}</TiCard></NCol>
  </NRow>
</template>
