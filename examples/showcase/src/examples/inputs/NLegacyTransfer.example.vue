<script setup lang="ts">
import { ref } from 'vue'
import { NLegacyTransfer } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const value = ref<Array<string | number>>(['paper'])
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NLegacyTransfer v-model:value="value" :options="[
    { label: t('examples.NLegacyTransfer.paper'), value: 'paper' },
    { label: t('examples.NLegacyTransfer.ink'), value: 'ink' },
    { label: t('examples.NLegacyTransfer.sage'), value: 'sage' },
  ]" />
</template>
