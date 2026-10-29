<script setup lang="ts">
import { ref } from 'vue'
import { NRadio } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const checked = ref(true)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NRadio v-model:checked="checked">{{ t('examples.NRadio.label') }}</NRadio>
</template>
