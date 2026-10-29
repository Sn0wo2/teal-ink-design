<script setup lang="ts">
import { NButton, NCollapseTransition, NFlex, TiCard } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const visible = ref(true)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NButton size="small" @click="visible = !visible">
      {{ visible ? t('examples.NCollapseTransition.hide') : t('examples.NCollapseTransition.show') }}
    </NButton>
    <NCollapseTransition :show="visible">
      <TiCard size="small">{{ t('examples.NCollapseTransition.content') }}</TiCard>
    </NCollapseTransition>
  </NFlex>
</template>
