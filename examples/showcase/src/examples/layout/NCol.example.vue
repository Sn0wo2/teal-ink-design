<script setup lang="ts">
import { NCol, NRow, TiCard } from '@teal-ink/vue'
</script>

<template>
  <NRow :gutter="12">
    <NCol :span="12"><TiCard size="small">{{ $t('examples.NCol.half') }}</TiCard></NCol>
    <NCol :span="12"><TiCard size="small">{{ $t('examples.NCol.half') }}</TiCard></NCol>
  </NRow>
</template>
