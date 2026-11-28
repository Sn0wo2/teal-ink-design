<script setup lang="ts">
import { NDrawer, NDrawerContent, NFlex, NP, TiButton } from '@teal-ink/vue'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <TiButton variant="primary" @click="show = true">{{ $t('examples.NDrawerContent.open') }}</TiButton>
     <NDrawer v-model:show="show" width="min(360px, calc(100vw - 24px))">
      <NDrawerContent :title="$t('examples.NDrawerContent.title')" :closable="true">
        <NP>{{ $t('examples.NDrawerContent.content') }}</NP>
         <template #footer>
          <TiButton variant="primary" @click="show = false">{{ $t('examples.NDrawerContent.done') }}</TiButton>
        </template>
      </NDrawerContent>
    </NDrawer>
  </NFlex>
</template>
