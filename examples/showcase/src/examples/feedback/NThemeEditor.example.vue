<script setup lang="ts">
import { NButton, NFlex, NP, NText, NThemeEditor } from '@teal-ink/vue'
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NThemeEditor />
    <NText strong>{{ $t('examples.NThemeEditor.title') }}</NText>
    <NP>{{ $t('examples.NThemeEditor.description') }}</NP>
    <NFlex>
      <NButton type="primary">{{ $t('examples.NThemeEditor.primary') }}</NButton>
      <NButton secondary>{{ $t('examples.NThemeEditor.secondary') }}</NButton>
    </NFlex>
  </NFlex>
</template>
