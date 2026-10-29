<script setup lang="ts">
import { NInput, NInputGroup, NInputGroupLabel } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const value = useTranslatedRef(() => t('examples.NInputGroupLabel.value'))
</script>

<template>
  <NInputGroup>
    <NInputGroupLabel>slowstudio.example/</NInputGroupLabel>
    <NInput v-model:value="value" />
  </NInputGroup>
</template>
