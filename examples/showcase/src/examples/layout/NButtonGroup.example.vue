<script setup lang="ts">
import { NButton, NButtonGroup } from '@teal-ink/vue'
</script>

<template>
  <NButtonGroup>
    <NButton>{{ $t('examples.NButtonGroup.previous') }}</NButton>
    <NButton type="primary">{{ $t('examples.NButtonGroup.next') }}</NButton>
  </NButtonGroup>
</template>
