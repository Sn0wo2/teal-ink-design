<script setup lang="ts">
import { NFlex, NPopconfirm, NText, TiButton } from '@teal-ink/vue'
import { ref } from 'vue'

const show = ref(false)
const archived = ref(false)
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NText aria-live="polite">{{ (archived ? $t('examples.NPopconfirm.archived') : '') || $t('examples.NPopconfirm.prompt') }}</NText>
    <NPopconfirm
      v-model:show="show"
      trigger="click"
      :positive-text="$t('examples.NPopconfirm.archive')"
      :negative-text="$t('examples.NPopconfirm.cancel')"
      @positive-click="archived = true; show = false"
      @negative-click="show = false"
    >
      <template #trigger>
        <TiButton variant="secondary">{{ $t('examples.NPopconfirm.button') }}</TiButton>
      </template>
      {{ $t('examples.NPopconfirm.confirm') }}
    </NPopconfirm>
  </NFlex>
</template>
