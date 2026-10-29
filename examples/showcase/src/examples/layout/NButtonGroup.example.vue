<script setup lang="ts">
import { NButton, NButtonGroup } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NButtonGroup>
    <NButton>{{ t('examples.NButtonGroup.previous') }}</NButton>
    <NButton type="primary">{{ t('examples.NButtonGroup.next') }}</NButton>
  </NButtonGroup>
</template>
