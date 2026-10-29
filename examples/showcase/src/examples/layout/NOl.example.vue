<script setup lang="ts">
import { NLi, NOl } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NOl>
    <NLi>{{ t('examples.NOl.requirements') }}</NLi>
    <NLi>{{ t('examples.NOl.arrange') }}</NLi>
    <NLi>{{ t('examples.NOl.review') }}</NLi>
  </NOl>
</template>
