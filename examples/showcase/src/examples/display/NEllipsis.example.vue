<script setup lang="ts">
import { NEllipsis } from '@teal-ink/vue'
</script>

<template>
   <NEllipsis :line-clamp="2" style="max-width: 260px">
    {{ $t('examples.NEllipsis.description') }}
  </NEllipsis>
</template>
