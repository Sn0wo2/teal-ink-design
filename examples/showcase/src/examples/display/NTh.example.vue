<script setup lang="ts">
import { NTable, NTbody, NTd, NTh, NThead, NTr } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NTable size="small">
    <NThead><NTr><NTh>{{ t('examples.NTh.component') }}</NTh><NTh>{{ t('examples.NTh.status') }}</NTh></NTr></NThead>
    <NTbody><NTr><NTd>{{ t('examples.NTh.calendar') }}</NTd><NTd>{{ t('examples.NTh.ready') }}</NTd></NTr></NTbody>
  </NTable>
</template>
