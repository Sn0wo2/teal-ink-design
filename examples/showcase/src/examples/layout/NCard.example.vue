<script setup lang="ts">
import { NCard } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NCard :title="t('examples.NCard.title')" size="small">
    {{ t('examples.NCard.content') }}
  </NCard>
</template>
