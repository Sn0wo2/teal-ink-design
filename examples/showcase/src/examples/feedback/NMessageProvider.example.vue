<script setup lang="ts">
import { NMessageProvider } from '@teal-ink/vue'
import MessageProviderActions from './parts/MessageProviderActions.vue'
</script>

<template>
  <NMessageProvider>
    <MessageProviderActions />
  </NMessageProvider>
</template>
