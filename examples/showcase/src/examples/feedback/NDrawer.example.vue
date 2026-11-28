<script setup lang="ts">
import { NDrawer, NDrawerContent, NFlex, NP, TiButton } from '@teal-ink/vue'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <TiButton variant="primary" @click="show = true">{{ $t('examples.NDrawer.open') }}</TiButton>
     <NDrawer v-model:show="show" placement="right" width="min(360px, calc(100vw - 24px))">
      <NDrawerContent :title="$t('examples.NDrawer.title')" :closable="true">
        <NP>{{ $t('examples.NDrawer.content') }}</NP>
         <template #footer>
          <TiButton variant="primary" @click="show = false">{{ $t('examples.NDrawer.close') }}</TiButton>
        </template>
      </NDrawerContent>
    </NDrawer>
  </NFlex>
</template>
