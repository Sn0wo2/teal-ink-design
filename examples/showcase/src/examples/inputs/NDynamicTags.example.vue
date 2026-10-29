<script setup lang="ts">
import { NDynamicTags } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const value = useTranslatedRef(() => [t('examples.NDynamicTags.handmade'), t('examples.NDynamicTags.smallBatch')])
</script>

<template>
  <NDynamicTags v-model:value="value" />
</template>
