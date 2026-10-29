<script setup lang="ts">
import { NMarquee } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NMarquee :auto-fill="false" :speed="24">{{ t('examples.NMarquee.motto') }}</NMarquee>
</template>
