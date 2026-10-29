<script setup lang="ts">
import { NH1 } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NH1>{{ t('examples.NH1.heading') }}</NH1>
</template>
