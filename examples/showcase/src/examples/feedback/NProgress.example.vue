<script setup lang="ts">
import { TiButton, NFlex, NProgress } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const value = ref(42)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NProgress :percentage="value" />
    <NFlex>
      <TiButton variant="primary" @click="value = Math.min(100, value + 10)">{{ t('examples.NProgress.advance') }}</TiButton>
      <TiButton variant="secondary" @click="value = 0">{{ t('examples.NProgress.restart') }}</TiButton>
    </NFlex>
  </NFlex>
</template>
