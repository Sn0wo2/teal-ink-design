<script setup lang="ts">
import { NCol, NRow, TiCard } from '@teal-ink/vue'
</script>

<template>
  <NRow :gutter="12">
    <NCol :span="8"><TiCard size="small">{{ $t('examples.NRow.content') }}</TiCard></NCol>
    <NCol :span="8"><TiCard size="small">{{ $t('examples.NRow.content') }}</TiCard></NCol>
    <NCol :span="8"><TiCard size="small">{{ $t('examples.NRow.content') }}</TiCard></NCol>
  </NRow>
</template>
