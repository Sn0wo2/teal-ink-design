<script setup lang="ts">
import { NLi, NUl } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NUl>
    <NLi>{{ t('examples.NUl.related') }}</NLi>
    <NLi>{{ t('examples.NUl.concise') }}</NLi>
    <NLi>{{ t('examples.NUl.scan') }}</NLi>
  </NUl>
</template>
