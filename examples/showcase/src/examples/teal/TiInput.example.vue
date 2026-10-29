<script setup lang="ts">
import { TiInput } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const value = useTranslatedRef(() => t('examples.TiInput.initial'))
</script>

<template>
  <TiInput v-model="value" :label="t('examples.TiInput.label')" :hint="t('examples.TiInput.hint')" clearable />
</template>
