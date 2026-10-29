<script setup lang="ts">
import { NPerformantEllipsis } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NPerformantEllipsis :line-clamp="2" :tooltip="false" style="max-width: 260px">
    {{ t('examples.NPerformantEllipsis.description') }}
  </NPerformantEllipsis>
</template>
