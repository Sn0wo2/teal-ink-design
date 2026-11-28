<script setup lang="ts">
import { TiButton, TiCard, TiTag } from '@teal-ink/vue'
</script>

<template>
  <TiCard :title="$t('examples.TiCard.title')">
    <template #header-extra><TiTag tone="accent">{{ $t('examples.TiCard.featured') }}</TiTag></template>
    {{ $t('examples.TiCard.content') }}
    <template #footer><TiButton>{{ $t('examples.TiCard.more') }}</TiButton></template>
   </TiCard>
</template>
