<script setup lang="ts">
import { NFloatButton, NFloatButtonGroup, NText, TiCard } from '@teal-ink/vue'
</script>

<template>
  <TiCard size="small" class="float-preview">
    <NText>{{ $t('examples.NFloatButtonGroup.content') }}</NText>
    <NFloatButtonGroup position="absolute" :right="12" :bottom="12" shape="circle">
      <NFloatButton type="primary">+</NFloatButton>
      <NFloatButton>⌕</NFloatButton>
    </NFloatButtonGroup>
  </TiCard>
</template>

<style scoped lang="scss">
.float-preview { position: relative; height: 136px; overflow: hidden; }
</style>
