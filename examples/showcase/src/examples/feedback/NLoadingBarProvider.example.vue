<script setup lang="ts">
import { NLoadingBarProvider } from '@teal-ink/vue'
import LoadingBarProviderActions from './parts/LoadingBarProviderActions.vue'
</script>

<template>
  <NLoadingBarProvider>
    <LoadingBarProviderActions />
  </NLoadingBarProvider>
</template>
