<script setup lang="ts">
import { NFlex, NProgress, TiButton } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref(42)
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NProgress :percentage="value" />
    <NFlex>
      <TiButton variant="primary" @click="value = Math.min(100, value + 10)">{{ $t('examples.NProgress.advance') }}</TiButton>
      <TiButton variant="secondary" @click="value = 0">{{ $t('examples.NProgress.restart') }}</TiButton>
    </NFlex>
  </NFlex>
</template>
