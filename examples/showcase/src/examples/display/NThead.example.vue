<script setup lang="ts">
import { NTable, NTbody, NTd, NTh, NThead, NTr } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NTable size="small">
    <NThead><NTr><NTh>{{ t('examples.NThead.component') }}</NTh><NTh>{{ t('examples.NThead.category') }}</NTh></NTr></NThead>
    <NTbody><NTr><NTd>{{ t('examples.NThead.calendar') }}</NTd><NTd>{{ t('examples.NThead.date') }}</NTd></NTr></NTbody>
  </NTable>
</template>
