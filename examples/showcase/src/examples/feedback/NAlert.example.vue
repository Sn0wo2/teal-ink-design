<script setup lang="ts">
import { NAlert } from '@teal-ink/vue'
</script>

<template>
  <NAlert type="info" :title="$t('examples.NAlert.title')">
    {{ $t('examples.NAlert.content') }}
  </NAlert>
</template>
