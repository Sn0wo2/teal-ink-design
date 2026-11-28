<script setup lang="ts">
import { NGrid, NGridItem, TiCard } from '@teal-ink/vue'
</script>

<template>
  <NGrid :cols="2" :x-gap="12" :y-gap="12">
    <NGridItem :span="1"><TiCard size="small">{{ $t('examples.NGrid.item', { number: 1 }) }}</TiCard></NGridItem>
    <NGridItem :span="1"><TiCard size="small">{{ $t('examples.NGrid.item', { number: 2 }) }}</TiCard></NGridItem>
  </NGrid>
</template>
