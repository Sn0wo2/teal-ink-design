<script setup lang="ts">
import { NButton, NFlex, NGlobalStyle, NP, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NGlobalStyle />
    <NText strong>{{ t('examples.NGlobalStyle.title') }}</NText>
    <NP>{{ t('examples.NGlobalStyle.description') }}</NP>
    <NButton type="primary">{{ t('examples.NGlobalStyle.status') }}</NButton>
  </NFlex>
</template>
