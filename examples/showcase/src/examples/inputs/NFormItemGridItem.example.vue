<script setup lang="ts">
import { reactive } from 'vue'
import { NForm, NFormItemGridItem, NGrid, NInput } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const model = reactive({ name: 'Mira Tanaka', role: useTranslatedRef(() => t('examples.NFormItemGridItem.maker')) })
</script>

<template>
  <NForm :model="model" class="example-field">
    <NGrid :cols="2" :x-gap="16">
      <NFormItemGridItem :label="t('examples.NFormItemGridItem.name')" path="name">
        <NInput v-model:value="model.name" />
      </NFormItemGridItem>
      <NFormItemGridItem :label="t('examples.NFormItemGridItem.role')" path="role">
        <NInput v-model:value="model.role" />
      </NFormItemGridItem>
    </NGrid>
  </NForm>
</template>
