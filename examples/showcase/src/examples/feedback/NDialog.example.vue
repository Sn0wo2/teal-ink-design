<script setup lang="ts">
import { NDialog, NFlex, NModal, TiButton } from '@teal-ink/vue'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <TiButton variant="primary" @click="show = true">{{ $t('examples.NDialog.open') }}</TiButton>
    <NModal v-model:show="show" :mask-closable="true">
      <NDialog
        :title="$t('examples.NDialog.title')"
        :content="$t('examples.NDialog.content')"
        type="info"
        :positive-text="$t('examples.NDialog.publish')"
        :negative-text="$t('examples.NDialog.reconsider')"
        @positive-click="show = false"
        @negative-click="show = false"
        @close="show = false"
      />
    </NModal>
  </NFlex>
</template>
