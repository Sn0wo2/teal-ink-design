<script setup lang="ts">
import { NH4 } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NH4>{{ t('examples.NH4.heading') }}</NH4>
</template>
