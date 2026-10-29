<script setup lang="ts">
import { NButton, NPageHeader, NP, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NPageHeader :title="t('examples.NPageHeader.title')" :subtitle="t('examples.NPageHeader.subtitle')">
    <template #default><NP>{{ t('examples.NPageHeader.activity') }}</NP></template>
    <template #extra><NButton size="small" type="primary">{{ t('examples.NPageHeader.newProject') }}</NButton></template>
    <template #back><NText>←</NText></template>
  </NPageHeader>
</template>
