<script setup lang="ts">
import { NGradientText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NGradientText font-size="28px" :gradient="{
    deg: 90,
    from: 'var(--ti-color-accent-text)',
    to: 'var(--ti-color-text)',
  }">{{ t('examples.NGradientText.text') }}</NGradientText>
</template>
