<script setup lang="ts">
import { NTime } from '@teal-ink/vue'
</script>

<template>
  <NTime :time="Date.now() - 8 * 60 * 1000" type="relative" />
</template>
