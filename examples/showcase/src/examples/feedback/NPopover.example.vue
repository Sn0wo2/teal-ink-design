<script setup lang="ts">
import { TiButton, NFlex, NPopover, NP, NText } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NPopover v-model:show="show" trigger="click">
      <template #trigger>
        <TiButton variant="secondary">{{ t('examples.NPopover.button') }}</TiButton>
      </template>
      <NFlex vertical :size="6" style="max-width: 220px">
        <NText strong>{{ t('examples.NPopover.title') }}</NText>
        <NP>{{ t('examples.NPopover.content') }}</NP>
      </NFlex>
    </NPopover>
  </NFlex>
</template>
