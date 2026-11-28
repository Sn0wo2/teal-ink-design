<script setup lang="ts">
import { NRadioButton, NRadioGroup } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref('linen')
</script>

<template>
  <NRadioGroup v-model:value="value">
    <NRadioButton value="linen">{{ $t('examples.NRadioButton.linen') }}</NRadioButton>
    <NRadioButton value="primary">{{ $t('examples.NRadioButton.primary') }}</NRadioButton>
    <NRadioButton value="ink">{{ $t('examples.NRadioButton.ink') }}</NRadioButton>
  </NRadioGroup>
</template>
