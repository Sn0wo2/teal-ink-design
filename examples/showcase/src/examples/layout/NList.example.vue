<script setup lang="ts">
import { NList, NListItem } from '@teal-ink/vue'
</script>

<template>
  <NList bordered hoverable>
    <NListItem>{{ $t('examples.NList.notes') }}</NListItem>
    <NListItem>{{ $t('examples.NList.checklist') }}</NListItem>
    <NListItem>{{ $t('examples.NList.directory') }}</NListItem>
  </NList>
</template>
