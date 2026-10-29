<script setup lang="ts">
import { NAvatarGroup } from '@teal-ink/vue'
</script>

<template>
  <NAvatarGroup :max="3" size="medium" :options="[
    { src: './images/portrait.svg' },
    { src: './images/landscape.svg' },
    { src: './images/portrait.svg' },
    { src: './images/landscape.svg' },
  ]" />
</template>
