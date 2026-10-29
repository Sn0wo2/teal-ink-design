<script setup lang="ts">
import { NP } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NP>{{ t('examples.NP.paragraph') }}</NP>
</template>
