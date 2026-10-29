<script setup lang="ts">
import { NAlert } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NAlert type="info" :title="t('examples.NAlert.title')">
    {{ t('examples.NAlert.content') }}
  </NAlert>
</template>
