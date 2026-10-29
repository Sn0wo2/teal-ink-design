<script setup lang="ts">
import { NFlex, NModal, NP, TiButton } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <TiButton variant="primary" @click="show = true">{{ t('examples.NModal.open') }}</TiButton>
    <NModal
      v-model:show="show"
      preset="card"
      :title="t('examples.NModal.title')"
      :style="{ width: 'min(420px, calc(100vw - 40px))' }"
      :mask-closable="true"
    >
      <NFlex vertical :size="16">
        <NP>{{ t('examples.NModal.content') }}</NP>
        <TiButton variant="primary" @click="show = false">{{ t('examples.NModal.continue') }}</TiButton>
      </NFlex>
    </NModal>
  </NFlex>
</template>
