<script setup lang="ts">
import { NElement } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NElement tag="section">{{ t('examples.NElement.content') }}</NElement>
</template>
