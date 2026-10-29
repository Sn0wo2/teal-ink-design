<script setup lang="ts">
import { NGi, NGrid, TiCard } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NGrid :cols="2" :x-gap="12">
    <NGi :span="1"><TiCard size="small">{{ t('examples.NGi.item') }}</TiCard></NGi>
    <NGi :span="1"><TiCard size="small">{{ t('examples.NGi.item') }}</TiCard></NGi>
  </NGrid>
</template>
