<script setup lang="ts">
import { NForm, NFormItem, NInput } from '@teal-ink/vue'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const model = reactive({ title: useTranslatedRef(() => t('examples.NForm.title')), email: 'hello@slowstudio.example' })
</script>

<template>
  <NForm :model="model" class="example-field">
    <NFormItem :label="t('examples.NForm.journalTitle')" path="title">
      <NInput v-model:value="model.title" />
    </NFormItem>
    <NFormItem :label="t('examples.NForm.email')" path="email">
      <NInput v-model:value="model.email" />
    </NFormItem>
  </NForm>
</template>
