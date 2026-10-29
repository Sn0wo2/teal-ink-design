<script setup lang="ts">
import { NxButton } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NxButton type="primary">{{ t('examples.NxButton.action') }}</NxButton>
</template>
