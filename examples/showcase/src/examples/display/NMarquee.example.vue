<script setup lang="ts">
import { NMarquee } from '@teal-ink/vue'
</script>

<template>
  <NMarquee :auto-fill="false" :speed="24">{{ $t('examples.NMarquee.motto') }}</NMarquee>
</template>
