<script setup lang="ts">
import { NForm, NFormItemRow, NInput } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <NForm label-placement="top">
    <NFormItemRow :label="$t('examples.NFormItemRow.label')">
      <NInput v-model:value="value" :placeholder="$t('examples.NFormItemRow.placeholder')" />
    </NFormItemRow>
  </NForm>
</template>
