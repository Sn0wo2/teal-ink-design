<script setup lang="ts">
import { NDescriptions, NDescriptionsItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NDescriptions bordered :column="2">
    <NDescriptionsItem :label="t('examples.NDescriptionsItem.workspace')">{{ t('examples.NDescriptionsItem.designSystem') }}</NDescriptionsItem>
    <NDescriptionsItem :label="t('examples.NDescriptionsItem.theme')">{{ t('examples.NDescriptionsItem.themeValue') }}</NDescriptionsItem>
  </NDescriptions>
</template>
