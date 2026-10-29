<script setup lang="ts">
import { NTabPane, NTabs } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NTabs default-value="activity">
    <NTabPane name="activity" :tab="t('examples.NTabPane.activity')">{{ t('examples.NTabPane.activityContent') }}</NTabPane>
    <NTabPane name="members" :tab="t('examples.NTabPane.members')">{{ t('examples.NTabPane.membersContent') }}</NTabPane>
  </NTabs>
</template>
