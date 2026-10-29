<script setup lang="ts">
import { NCountdown } from '@teal-ink/vue'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
</script>

<template>
  <NCountdown :duration="3000" :precision="0" :active="!reducedMotion" />
</template>
