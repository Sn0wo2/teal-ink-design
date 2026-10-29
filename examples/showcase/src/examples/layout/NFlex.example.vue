<script setup lang="ts">
import { NButton, NFlex, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex align="center" justify="space-between" wrap :size="12">
    <NText>{{ t('examples.NFlex.content') }}</NText>
    <NButton size="small">{{ t('examples.NFlex.action') }}</NButton>
  </NFlex>
</template>
