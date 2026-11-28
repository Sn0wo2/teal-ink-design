<script setup lang="ts">
import { NA, NFlex, NP } from '@teal-ink/vue'
import { useId } from 'vue'

const targetId = useId()
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NA :href="`#${targetId}`">{{ $t('examples.NA.open') }}</NA>
    <NP :id="targetId">{{ $t('examples.NA.content') }}</NP>
  </NFlex>
</template>
