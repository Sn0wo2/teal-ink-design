<script setup lang="ts">
import { NTransfer } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref<Array<string | number>>(['wheel', 'studio'])
</script>

<template>
  <NTransfer v-model:value="value" :options="[
    { label: $t('examples.NTransfer.wheel'), value: 'wheel' },
    { label: $t('examples.NTransfer.studio'), value: 'studio' },
    { label: $t('examples.NTransfer.kiln'), value: 'kiln' },
    { label: $t('examples.NTransfer.shelves'), value: 'shelves' },
  ]" />
</template>
