<script setup lang="ts">
import { NTag } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NTag type="success" :bordered="false">{{ t('examples.NTag.published') }}</NTag>
</template>
