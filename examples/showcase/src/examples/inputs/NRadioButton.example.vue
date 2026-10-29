<script setup lang="ts">
import { ref } from 'vue'
import { NRadioButton, NRadioGroup } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const value = ref('linen')
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NRadioGroup v-model:value="value">
    <NRadioButton value="linen">{{ t('examples.NRadioButton.linen') }}</NRadioButton>
    <NRadioButton value="primary">{{ t('examples.NRadioButton.primary') }}</NRadioButton>
    <NRadioButton value="ink">{{ t('examples.NRadioButton.ink') }}</NRadioButton>
  </NRadioGroup>
</template>
