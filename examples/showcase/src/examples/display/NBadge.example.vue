<script setup lang="ts">
import { NBadge, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NBadge :value="8" :max="99"><NText>{{ t('examples.NBadge.unread') }}</NText></NBadge>
</template>
