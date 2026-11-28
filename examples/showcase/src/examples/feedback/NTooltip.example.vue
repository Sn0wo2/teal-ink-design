<script setup lang="ts">
import { NFlex, NTooltip, TiButton } from '@teal-ink/vue'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NTooltip v-model:show="show" trigger="click">
      <template #trigger>
        <TiButton variant="secondary">{{ $t('examples.NTooltip.button') }}</TiButton>
      </template>
      {{ $t('examples.NTooltip.content') }}
    </NTooltip>
  </NFlex>
</template>
