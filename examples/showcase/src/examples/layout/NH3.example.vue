<script setup lang="ts">
import { NH3 } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NH3>{{ t('examples.NH3.heading') }}</NH3>
</template>
