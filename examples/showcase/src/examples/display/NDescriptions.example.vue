<script setup lang="ts">
import { NDescriptions, NDescriptionsItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NDescriptions bordered :column="2" label-placement="left">
    <NDescriptionsItem :label="t('examples.NDescriptions.project')">{{ t('examples.NDescriptions.themeValue') }}</NDescriptionsItem>
    <NDescriptionsItem :label="t('examples.NDescriptions.version')">0.1.0</NDescriptionsItem>
    <NDescriptionsItem :label="t('examples.NDescriptions.status')">{{ t('examples.NDescriptions.active') }}</NDescriptionsItem>
    <NDescriptionsItem :label="t('examples.NDescriptions.theme')">{{ t('examples.NDescriptions.themeValue') }}</NDescriptionsItem>
  </NDescriptions>
</template>
