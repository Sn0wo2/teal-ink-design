<script setup lang="ts">
import { NTable, NTbody, NTd, NTh, NThead, NTr } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NTable bordered :single-line="false" size="small">
    <NThead><NTr><NTh>{{ t('examples.NTable.component') }}</NTh><NTh>{{ t('examples.NTable.status') }}</NTh></NTr></NThead>
     <NTbody>
      <NTr><NTd>{{ t('examples.NTable.avatar') }}</NTd><NTd>{{ t('examples.NTable.ready') }}</NTd></NTr>
      <NTr><NTd>{{ t('examples.NTable.calendar') }}</NTd><NTd>{{ t('examples.NTable.ready') }}</NTd></NTr>
    </NTbody>
  </NTable>
</template>
