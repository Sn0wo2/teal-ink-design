<script setup lang="ts">
import { NStep, NSteps } from '@teal-ink/vue'
</script>

<template>
  <NSteps :current="1" size="small">
    <NStep :title="$t('examples.NSteps.details')" :description="$t('examples.NSteps.basics')" />
    <NStep :title="$t('examples.NSteps.review')" :description="$t('examples.NSteps.changes')" />
    <NStep :title="$t('examples.NSteps.publish')" :description="$t('examples.NSteps.share')" />
  </NSteps>
</template>
