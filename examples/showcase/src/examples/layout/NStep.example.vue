<script setup lang="ts">
import { NStep, NSteps } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NSteps :current="1" size="small">
    <NStep :title="t('examples.NStep.details')" :description="t('examples.NStep.basics')" />
    <NStep :title="t('examples.NStep.review')" :description="t('examples.NStep.changes')" status="process" />
    <NStep :title="t('examples.NStep.publish')" :description="t('examples.NStep.share')" />
  </NSteps>
</template>
