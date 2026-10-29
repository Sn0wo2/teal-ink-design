<script setup lang="ts">
import { NModalProvider } from '@teal-ink/vue'
import ModalProviderActions from './parts/ModalProviderActions.vue'
</script>

<template>
  <NModalProvider>
    <ModalProviderActions />
  </NModalProvider>
</template>
