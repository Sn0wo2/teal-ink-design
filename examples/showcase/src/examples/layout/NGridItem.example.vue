<script setup lang="ts">
import { NGrid, NGridItem, TiCard } from '@teal-ink/vue'
</script>

<template>
  <NGrid :cols="3" :x-gap="12">
    <NGridItem :span="1"><TiCard size="small">{{ $t('examples.NGridItem.one') }}</TiCard></NGridItem>
    <NGridItem :span="2"><TiCard size="small">{{ $t('examples.NGridItem.two') }}</TiCard></NGridItem>
  </NGrid>
</template>
