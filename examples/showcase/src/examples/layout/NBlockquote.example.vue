<script setup lang="ts">
import { NBlockquote } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NBlockquote>{{ t('examples.NBlockquote.quote') }}</NBlockquote>
</template>
