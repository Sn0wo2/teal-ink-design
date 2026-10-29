<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItemRow, NInput } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const value = ref('')
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NForm label-placement="top">
    <NFormItemRow :label="t('examples.NFormItemRow.label')">
      <NInput v-model:value="value" :placeholder="t('examples.NFormItemRow.placeholder')" />
    </NFormItemRow>
  </NForm>
</template>
