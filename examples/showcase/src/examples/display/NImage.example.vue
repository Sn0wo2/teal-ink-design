<script setup lang="ts">
import { NImage } from '@teal-ink/vue'
</script>

<template>
  <NImage src="./images/landscape.svg" :width="240" :height="150" :alt="$t('examples.NImage.alt')"
    object-fit="cover" preview-disabled />
</template>
