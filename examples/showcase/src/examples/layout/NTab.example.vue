<script setup lang="ts">
import { NFlex, NP, NTab, NTabs } from '@teal-ink/vue'
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NTabs default-value="activity" type="line">
      <NTab name="activity" :label="$t('examples.NTab.activity')" />
      <NTab name="members" :label="$t('examples.NTab.members')" />
    </NTabs>
    <NP>{{ $t('examples.NTab.instruction') }}</NP>
  </NFlex>
</template>
