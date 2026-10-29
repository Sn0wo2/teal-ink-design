<script setup lang="ts">
import { TiButton, NFlex, NTooltip } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NTooltip v-model:show="show" trigger="click">
      <template #trigger>
        <TiButton variant="secondary">{{ t('examples.NTooltip.button') }}</TiButton>
      </template>
      {{ t('examples.NTooltip.content') }}
    </NTooltip>
  </NFlex>
</template>
