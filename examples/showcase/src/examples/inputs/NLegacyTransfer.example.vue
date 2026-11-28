<script setup lang="ts">
import { NLegacyTransfer } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref<Array<string | number>>(['paper'])
</script>

<template>
  <NLegacyTransfer v-model:value="value" :options="[
    { label: $t('examples.NLegacyTransfer.paper'), value: 'paper' },
    { label: $t('examples.NLegacyTransfer.ink'), value: 'ink' },
    { label: $t('examples.NLegacyTransfer.sage'), value: 'sage' },
  ]" />
</template>
