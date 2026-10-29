<script setup lang="ts">
import { NButton, NText, NThing } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NThing :title="t('examples.NThing.title')" :description="t('examples.NThing.updated')">
    <template #header-extra><NText :depth="3">{{ t('examples.NThing.draft') }}</NText></template>
    {{ t('examples.NThing.summary') }}
    <template #action><NButton text size="small">{{ t('examples.NThing.open') }}</NButton></template>
  </NThing>
</template>
