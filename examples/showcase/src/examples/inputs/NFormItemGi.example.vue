<script setup lang="ts">
import { reactive } from 'vue'
import { NForm, NFormItemGi, NGrid, NInput } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const model = reactive({ name: 'Mira Tanaka', role: useTranslatedRef(() => t('examples.NFormItemGi.maker')) })
</script>

<template>
  <NForm :model="model" class="example-field">
    <NGrid :cols="2" :x-gap="16">
      <NFormItemGi :label="t('examples.NFormItemGi.name')" path="name">
        <NInput v-model:value="model.name" />
      </NFormItemGi>
      <NFormItemGi :label="t('examples.NFormItemGi.role')" path="role">
        <NInput v-model:value="model.role" />
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>
