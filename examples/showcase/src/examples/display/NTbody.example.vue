<script setup lang="ts">
import { NTable, NTbody, NTd, NTh, NThead, NTr } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NTable size="small">
    <NThead><NTr><NTh>{{ t('examples.NTbody.material') }}</NTh><NTh>{{ t('examples.NTbody.finish') }}</NTh></NTr></NThead>
     <NTbody>
      <NTr><NTd>{{ t('examples.NTbody.teal') }}</NTd><NTd>{{ t('examples.NTbody.matte') }}</NTd></NTr>
      <NTr><NTd>{{ t('examples.NTbody.porcelain') }}</NTd><NTd>{{ t('examples.NTbody.glazed') }}</NTd></NTr>
    </NTbody>
  </NTable>
</template>
