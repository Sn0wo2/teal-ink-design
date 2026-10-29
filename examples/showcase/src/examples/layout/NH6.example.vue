<script setup lang="ts">
import { NH6 } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NH6>{{ t('examples.NH6.heading') }}</NH6>
</template>
