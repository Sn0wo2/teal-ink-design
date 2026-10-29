<script setup lang="ts">
import { NNotificationProvider } from '@teal-ink/vue'
import NotificationProviderActions from './parts/NotificationProviderActions.vue'
</script>

<template>
  <NNotificationProvider>
    <NotificationProviderActions />
  </NNotificationProvider>
</template>
