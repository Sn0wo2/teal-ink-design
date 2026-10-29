<script setup lang="ts">
import { NNumberAnimation } from '@teal-ink/vue'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
</script>

<template>
  <NNumberAnimation :from="reducedMotion ? 1288 : 1240" :to="1288" :duration="reducedMotion ? 0 : 700"
    :precision="0" show-separator />
</template>
