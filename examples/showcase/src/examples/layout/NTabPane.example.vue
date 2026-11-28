<script setup lang="ts">
import { NTabPane, NTabs } from '@teal-ink/vue'
</script>

<template>
  <NTabs default-value="activity">
    <NTabPane name="activity" :tab="$t('examples.NTabPane.activity')">{{ $t('examples.NTabPane.activityContent') }}</NTabPane>
    <NTabPane name="members" :tab="$t('examples.NTabPane.members')">{{ $t('examples.NTabPane.membersContent') }}</NTabPane>
  </NTabs>
</template>
