<script setup lang="ts">
import { NBadge, NText } from '@teal-ink/vue'
</script>

<template>
  <NBadge :value="8" :max="99"><NText>{{ $t('examples.NBadge.unread') }}</NText></NBadge>
</template>
