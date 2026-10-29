<script setup lang="ts">
import { NMention } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useTranslatedRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const value = useTranslatedRef(() => t('examples.NMention.value', { at: '@' }))
</script>

<template>
  <NMention v-model:value="value"
    :options="[
      { label: 'Mira Tanaka', value: 'Mira' },
      { label: 'Jonas Lee', value: 'Jonas' },
      { label: 'Ari Chen', value: 'Ari' },
    ]" type="textarea"
    :placeholder="t('examples.NMention.placeholder', { at: '@' })" class="example-field" />
</template>
