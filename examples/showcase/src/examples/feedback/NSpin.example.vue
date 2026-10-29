<script setup lang="ts">
import { TiButton, TiCard, NFlex, NSpin, NText } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const spinning = ref(true)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NSpin :show="spinning" :description="t('examples.NSpin.description')">
      <TiCard :title="t('examples.NSpin.title')" :style="{ minHeight: '100px' }">
        <NText>{{ t('examples.NSpin.content') }}</NText>
      </TiCard>
    </NSpin>
    <TiButton variant="secondary" @click="spinning = !spinning">
      {{ spinning ? t('examples.NSpin.show') : t('examples.NSpin.refresh') }}
    </TiButton>
  </NFlex>
</template>
