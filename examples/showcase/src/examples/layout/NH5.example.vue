<script setup lang="ts">
import { NH5 } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NH5>{{ t('examples.NH5.heading') }}</NH5>
</template>
