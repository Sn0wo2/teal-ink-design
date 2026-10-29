<script setup lang="ts">
import { NFlex, NSkeleton, NText, TiButton, TiCard } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const loading = ref(true)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NFlex v-if="loading" vertical :size="10">
      <NSkeleton text :repeat="3" />
      <NSkeleton width="55%" height="28px" />
    </NFlex>
    <TiCard v-else :title="t('examples.NSkeleton.title')">
      <NText>{{ t('examples.NSkeleton.content') }}</NText>
    </TiCard>
    <TiButton variant="secondary" @click="loading = !loading">
      {{ loading ? t('examples.NSkeleton.show') : t('examples.NSkeleton.reload') }}
    </TiButton>
  </NFlex>
</template>
