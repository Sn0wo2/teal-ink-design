<script setup lang="ts">
import { NForm, NFormItemCol, NInput, NRow } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <NForm label-placement="top">
    <NRow>
      <NFormItemCol :label="$t('examples.NFormItemCol.label')" :span="16">
        <NInput v-model:value="value" :placeholder="$t('examples.NFormItemCol.placeholder')" />
      </NFormItemCol>
    </NRow>
  </NForm>
</template>
