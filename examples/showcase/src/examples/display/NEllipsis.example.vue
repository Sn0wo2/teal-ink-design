<script setup lang="ts">
import { NEllipsis } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NEllipsis :line-clamp="2" style="max-width: 260px">
    {{ t('examples.NEllipsis.description') }}
  </NEllipsis>
</template>
