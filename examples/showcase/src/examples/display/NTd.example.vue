<script setup lang="ts">
import { NTable, NTbody, NTd, NTh, NThead, NTr } from '@teal-ink/vue'
</script>

<template>
   <NTable size="small">
    <NThead><NTr><NTh>{{ $t('examples.NTd.component') }}</NTh><NTh>{{ $t('examples.NTd.status') }}</NTh></NTr></NThead>
    <NTbody><NTr><NTd>{{ $t('examples.NTd.avatar') }}</NTd><NTd>{{ $t('examples.NTd.ready') }}</NTd></NTr></NTbody>
  </NTable>
</template>
