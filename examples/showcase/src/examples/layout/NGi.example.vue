<script setup lang="ts">
import { NGi, NGrid, TiCard } from '@teal-ink/vue'
</script>

<template>
  <NGrid :cols="2" :x-gap="12">
    <NGi :span="1"><TiCard size="small">{{ $t('examples.NGi.item') }}</TiCard></NGi>
    <NGi :span="1"><TiCard size="small">{{ $t('examples.NGi.item') }}</TiCard></NGi>
  </NGrid>
</template>
