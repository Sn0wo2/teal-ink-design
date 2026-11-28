<script setup lang="ts">
import { NDescriptions, NDescriptionsItem } from '@teal-ink/vue'
</script>

<template>
   <NDescriptions bordered :column="2">
    <NDescriptionsItem :label="$t('examples.NDescriptionsItem.workspace')">{{ $t('examples.NDescriptionsItem.designSystem') }}</NDescriptionsItem>
    <NDescriptionsItem :label="$t('examples.NDescriptionsItem.theme')">{{ $t('examples.NDescriptionsItem.themeValue') }}</NDescriptionsItem>
  </NDescriptions>
</template>
