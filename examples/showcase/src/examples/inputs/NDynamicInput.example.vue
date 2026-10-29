<script setup lang="ts">
import { NDynamicInput } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const value = useTranslatedRef(() => [t('examples.NDynamicInput.paper'), t('examples.NDynamicInput.ink')])
</script>

<template>
  <NDynamicInput v-model:value="value" :placeholder="t('examples.NDynamicInput.placeholder')" class="example-field" />
</template>
