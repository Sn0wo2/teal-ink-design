<script setup lang="ts">
import { TiButton, NFlex, NImage, NImagePreview } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NFlex align="center">
      <NImage src="./images/landscape.svg" :width="150" :height="96" :alt="t('examples.NImagePreview.alt')" object-fit="cover" preview-disabled />
      <TiButton variant="primary" @click="show = true">{{ t('examples.NImagePreview.preview') }}</TiButton>
    </NFlex>
    <NImagePreview v-model:show="show" src="./images/landscape.svg" />
  </NFlex>
</template>
