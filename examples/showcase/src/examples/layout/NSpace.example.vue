<script setup lang="ts">
import { NButton, NSpace, NText } from '@teal-ink/vue'
</script>

<template>
  <NSpace align="center" :size="12">
    <NButton size="small">{{ $t('examples.NSpace.save') }}</NButton>
    <NButton size="small" secondary>{{ $t('examples.NSpace.preview') }}</NButton>
    <NText>{{ $t('examples.NSpace.draft') }}</NText>
  </NSpace>
</template>
