<script setup lang="ts">
import { NCode } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NCode :code="t('examples.NCode.code')" language="javascript" show-line-numbers />
</template>
