<script setup lang="ts">
import { NEl } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NEl tag="article">{{ t('examples.NEl.content') }}</NEl>
</template>
