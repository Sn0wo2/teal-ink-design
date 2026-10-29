<script setup lang="ts">
import { NDialogProvider } from '@teal-ink/vue'
import DialogProviderActions from './parts/DialogProviderActions.vue'
</script>

<template>
  <NDialogProvider>
    <DialogProviderActions />
  </NDialogProvider>
</template>
