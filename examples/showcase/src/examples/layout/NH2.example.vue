<script setup lang="ts">
import { NH2 } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NH2>{{ t('examples.NH2.heading') }}</NH2>
</template>
