<script setup lang="ts">
import { NInput } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const value = useTranslatedRef(() => t('examples.NInput.value'))
</script>

<template>
  <NInput v-model:value="value" :placeholder="t('examples.NInput.placeholder')" class="example-field" />
</template>
