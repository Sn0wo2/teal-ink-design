<script setup lang="ts">
import { TiCard, NFloatButton, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <TiCard size="small" class="float-preview">
    <NText>{{ t('examples.NFloatButton.content') }}</NText>
    <NFloatButton position="absolute" :right="12" :bottom="12" type="primary">+</NFloatButton>
  </TiCard>
</template>

<style scoped lang="scss">
.float-preview { position: relative; height: 118px; overflow: hidden; }
</style>
