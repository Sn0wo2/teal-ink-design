<script setup lang="ts">
import { NCheckbox, NCheckboxGroup, NSpace } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const value = ref<Array<string | number>>(['ceramics', 'printmaking'])
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NCheckboxGroup v-model:value="value">
    <NSpace>
      <NCheckbox value="ceramics">{{ t('examples.NCheckboxGroup.ceramics') }}</NCheckbox>
      <NCheckbox value="textiles">{{ t('examples.NCheckboxGroup.textiles') }}</NCheckbox>
      <NCheckbox value="printmaking">{{ t('examples.NCheckboxGroup.printmaking') }}</NCheckbox>
    </NSpace>
  </NCheckboxGroup>
</template>
