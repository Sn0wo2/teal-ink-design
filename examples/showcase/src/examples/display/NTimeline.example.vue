<script setup lang="ts">
import { NTimeline, NTimelineItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NTimeline size="medium">
    <NTimelineItem type="success" :title="t('examples.NTimeline.published')" time="09:40">{{ t('examples.NTimeline.release') }}</NTimelineItem>
    <NTimelineItem type="info" :title="t('examples.NTimeline.reviewed')" time="09:10">{{ t('examples.NTimeline.changes') }}</NTimelineItem>
  </NTimeline>
</template>
