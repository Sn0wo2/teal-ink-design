<script setup lang="ts">
import { NPerformantEllipsis } from '@teal-ink/vue'
</script>

<template>
   <NPerformantEllipsis :line-clamp="2" :tooltip="false" style="max-width: 260px">
    {{ $t('examples.NPerformantEllipsis.description') }}
  </NPerformantEllipsis>
</template>
