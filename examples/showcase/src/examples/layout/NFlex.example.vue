<script setup lang="ts">
import { NButton, NFlex, NText } from '@teal-ink/vue'
</script>

<template>
  <NFlex align="center" justify="space-between" wrap :size="12">
    <NText>{{ $t('examples.NFlex.content') }}</NText>
    <NButton size="small">{{ $t('examples.NFlex.action') }}</NButton>
  </NFlex>
</template>
