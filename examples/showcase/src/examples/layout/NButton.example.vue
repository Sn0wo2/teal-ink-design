<script setup lang="ts">
import { NButton } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NButton type="primary">{{ t('examples.NButton.continue') }}</NButton>
</template>
