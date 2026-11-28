<script setup lang="ts">
import { NTable, NTbody, NTd, NTh, NThead, NTr } from '@teal-ink/vue'
</script>

<template>
   <NTable size="small">
    <NThead><NTr><NTh>{{ $t('examples.NTr.component') }}</NTh><NTh>{{ $t('examples.NTr.status') }}</NTh></NTr></NThead>
     <NTbody>
      <NTr><NTd>{{ $t('examples.NTr.avatar') }}</NTd><NTd>{{ $t('examples.NTr.ready') }}</NTd></NTr>
      <NTr><NTd>{{ $t('examples.NTr.calendar') }}</NTd><NTd>{{ $t('examples.NTr.ready') }}</NTd></NTr>
    </NTbody>
  </NTable>
</template>
