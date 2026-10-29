<script setup lang="ts">
import { NEmpty, NFlex, NP, TiButton, TiCard } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const hasItems = ref(false)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex v-if="hasItems" vertical :size="16" style="max-width: 640px">
    <TiCard :title="t('examples.NEmpty.favorites')">
      <NP>{{ t('examples.NEmpty.book') }}</NP>
    </TiCard>
    <TiButton variant="secondary" @click="hasItems = false">{{ t('examples.NEmpty.clear') }}</TiButton>
  </NFlex>
  <NEmpty v-else :description="t('examples.NEmpty.empty')">
    <template #extra>
      <TiButton variant="primary" @click="hasItems = true">{{ t('examples.NEmpty.browse') }}</TiButton>
    </template>
  </NEmpty>
</template>
