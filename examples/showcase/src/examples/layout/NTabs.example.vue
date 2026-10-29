<script setup lang="ts">
import { NTabPane, NTabs } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NTabs default-value="summary" type="line">
    <NTabPane name="summary" :tab="t('examples.NTabs.summary')">{{ t('examples.NTabs.summaryContent') }}</NTabPane>
    <NTabPane name="files" :tab="t('examples.NTabs.files')">{{ t('examples.NTabs.filesContent') }}</NTabPane>
  </NTabs>
</template>
