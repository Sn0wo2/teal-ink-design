<script setup lang="ts">
import { TiCard, NFlex, NP, NScrollbar } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <TiCard size="small">
    <NScrollbar class="scroll-preview">
      <NFlex vertical :size="16" class="scroll-content">
        <NP>{{ t('examples.NScrollbar.preview') }}</NP>
        <NP class="scroll-end">{{ t('examples.NScrollbar.instruction') }}</NP>
      </NFlex>
    </NScrollbar>
  </TiCard>
</template>

<style scoped lang="scss">
.scroll-preview { max-height: 116px; }
.scroll-content { min-height: 260px; padding: var(--ti-space-1); }
.scroll-end { margin-top: 150px; }
</style>
