<script setup lang="ts">
import { NFlex, TiButton, useMessage } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const message = useMessage()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NFlex>
      <TiButton variant="primary" @click="message.success(t('examples.MessageProviderActions.saved'))">{{ t('examples.MessageProviderActions.success') }}</TiButton>
      <TiButton variant="secondary" @click="message.info(t('examples.MessageProviderActions.draft'))">{{ t('examples.MessageProviderActions.hint') }}</TiButton>
    </NFlex>
  </NFlex>
</template>
