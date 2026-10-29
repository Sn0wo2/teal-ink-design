<script setup lang="ts">
import { NStatistic } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NStatistic :label="t('examples.NStatistic.label')" :value="12840" tabular-nums>
    <template #prefix>↗</template>
  </NStatistic>
</template>
