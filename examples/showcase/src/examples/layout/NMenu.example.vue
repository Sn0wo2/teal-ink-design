<script setup lang="ts">
import { NMenu } from '@teal-ink/vue'
</script>

<template>
  <NMenu mode="horizontal" default-value="overview" :options="[
    { label: $t('examples.NMenu.overview'), key: 'overview' },
    { label: $t('examples.NMenu.projects'), key: 'projects' },
    { label: $t('examples.NMenu.settings'), key: 'settings' },
  ]" />
</template>
