<script setup lang="ts">
import { NDivider, NFlex, NText } from '@teal-ink/vue'
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NText>{{ $t('examples.NDivider.first') }}</NText>
    <NDivider dashed />
    <NText>{{ $t('examples.NDivider.second') }}</NText>
  </NFlex>
</template>
