<script setup lang="ts">
import { NRadio, NRadioGroup, NSpace } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const value = ref('weekly')
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NRadioGroup v-model:value="value">
    <NSpace>
      <NRadio value="weekly">{{ t('examples.NRadioGroup.weekly') }}</NRadio>
      <NRadio value="monthly">{{ t('examples.NRadioGroup.monthly') }}</NRadio>
      <NRadio value="none">{{ t('examples.NRadioGroup.none') }}</NRadio>
    </NSpace>
  </NRadioGroup>
</template>
