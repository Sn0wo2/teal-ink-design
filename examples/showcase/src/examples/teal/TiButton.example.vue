<script setup lang="ts">
import { TiButton, NFlex, NSpace, useTiMessage } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const message = useTiMessage()
const { t } = useI18n({ useScope: 'global' })
</script>
 
<template>
   <NFlex vertical :size="16" style="max-width: 640px">
     <NSpace align="center" :size="12">
      <TiButton variant="primary" @click="message.success(t('examples.TiButton.done'))">{{ t('examples.TiButton.primary') }}</TiButton>
      <TiButton variant="secondary">{{ t('examples.TiButton.secondary') }}</TiButton>
      <TiButton variant="ghost">{{ t('examples.TiButton.outlined') }}</TiButton>
      <TiButton variant="text">{{ t('examples.TiButton.text') }}</TiButton>
     </NSpace>
     <NSpace align="center" :size="12">
      <TiButton variant="primary" round>{{ t('examples.TiButton.round') }}</TiButton>
      <TiButton disabled>{{ t('examples.TiButton.unavailable') }}</TiButton>
      <TiButton loading>{{ t('examples.TiButton.loading') }}</TiButton>
     </NSpace>
   </NFlex>
</template>
