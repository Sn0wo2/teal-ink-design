<script setup lang="ts">
import { NHighlight } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NHighlight :text="t('examples.NHighlight.text')" :patterns="[t('examples.NHighlight.component'), t('examples.NHighlight.match')]" />
</template>
