<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItemCol, NInput, NRow } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const value = ref('')
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NForm label-placement="top">
    <NRow>
      <NFormItemCol :label="t('examples.NFormItemCol.label')" :span="16">
        <NInput v-model:value="value" :placeholder="t('examples.NFormItemCol.placeholder')" />
      </NFormItemCol>
    </NRow>
  </NForm>
</template>
