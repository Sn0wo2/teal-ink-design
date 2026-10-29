<script setup lang="ts">
import { TiTag } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <TiTag tone="accent" round>{{ t('examples.TiTag.brand') }}</TiTag>
</template>
