<script setup lang="ts">
import { NTimeline, NTimelineItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NTimeline>
    <NTimelineItem type="success" :title="t('examples.NTimelineItem.completed')" :time="t('examples.NTimelineItem.today')">{{ t('examples.NTimelineItem.ready') }}</NTimelineItem>
    <NTimelineItem type="info" :title="t('examples.NTimelineItem.started')" :time="t('examples.NTimelineItem.yesterday')">{{ t('examples.NTimelineItem.workspace') }}</NTimelineItem>
  </NTimeline>
</template>
