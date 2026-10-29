<script setup lang="ts">
import { NFormItem, NInput } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const value = useTranslatedRef(() => t('examples.NFormItem.value'))
</script>

<template>
  <NFormItem :label="t('examples.NFormItem.label')" :feedback="t('examples.NFormItem.feedback')" class="example-field">
    <NInput v-model:value="value" :placeholder="t('examples.NFormItem.placeholder')" />
  </NFormItem>
</template>
