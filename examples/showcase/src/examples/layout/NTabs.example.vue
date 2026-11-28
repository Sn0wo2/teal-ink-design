<script setup lang="ts">
import { NTabPane, NTabs } from '@teal-ink/vue'
</script>

<template>
  <NTabs default-value="summary" type="line">
    <NTabPane name="summary" :tab="$t('examples.NTabs.summary')">{{ $t('examples.NTabs.summaryContent') }}</NTabPane>
    <NTabPane name="files" :tab="$t('examples.NTabs.files')">{{ $t('examples.NTabs.filesContent') }}</NTabPane>
  </NTabs>
</template>
