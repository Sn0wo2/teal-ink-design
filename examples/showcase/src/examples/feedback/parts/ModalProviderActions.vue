<script setup lang="ts">
import { TiButton, NFlex, useModal } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const modal = useModal()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <TiButton
      variant="primary"
      @click="modal.create({ title: t('examples.ModalProviderActions.title'), preset: 'card', content: t('examples.ModalProviderActions.content'), style: { width: 'min(420px, calc(100vw - 40px))' } })"
    >
      {{ t('examples.ModalProviderActions.open') }}
    </TiButton>
  </NFlex>
</template>
