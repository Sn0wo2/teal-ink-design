<script setup lang="ts">
import { TiButton, NFlex, NText, useLoadingBar } from '@teal-ink/vue'
import { onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const loadingBar = useLoadingBar()
const { t } = useI18n({ useScope: 'global' })
let timer: number | undefined

function saveDraft() {
  window.clearTimeout(timer)
  loadingBar.start()
  timer = window.setTimeout(() => loadingBar.finish(), 900)
}

onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NText>{{ t('examples.LoadingBarProviderActions.description') }}</NText>
    <TiButton variant="primary" @click="saveDraft">{{ t('examples.LoadingBarProviderActions.save') }}</TiButton>
  </NFlex>
</template>
