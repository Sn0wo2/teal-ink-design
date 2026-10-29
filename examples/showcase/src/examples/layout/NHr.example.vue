<script setup lang="ts">
import { NFlex, NHr, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NText>{{ t('examples.NHr.above') }}</NText>
    <NHr />
    <NText>{{ t('examples.NHr.below') }}</NText>
  </NFlex>
</template>
