<script setup lang="ts">
import { NStatistic } from '@teal-ink/vue'
</script>

<template>
  <NStatistic :label="$t('examples.NStatistic.label')" :value="12_840" tabular-nums>
    <template #prefix>↗</template>
  </NStatistic>
</template>
