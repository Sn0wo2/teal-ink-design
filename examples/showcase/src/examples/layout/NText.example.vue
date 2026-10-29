<script setup lang="ts">
import { NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NText :depth="2">{{ t('examples.NText.content') }}</NText>
</template>
