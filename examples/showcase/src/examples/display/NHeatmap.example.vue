<script setup lang="ts">
import { NHeatmap } from '@teal-ink/vue'
</script>

<template>
  <NHeatmap :x-gap="4" :y-gap="4" tooltip :data="Array.from({ length: 42 }, (_, index) => ({
    timestamp: Date.now() - index * 24 * 60 * 60 * 1000,
    value: (index * 7 + 3) % 5,
  }))" />
</template>
