<script setup lang="ts">
import { TiCard, NWatermark, palette } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NWatermark :content="t('showcase.brand')" :width="180" :height="88" :font-size="15" :font-color="`${palette.primary}33`" :rotate="-18">
    <TiCard size="small">{{ t('examples.NWatermark.preview') }}</TiCard>
  </NWatermark>
</template>
