<script setup lang="ts">
import { NImage, NImageGroup, NSpace } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NImageGroup>
     <NSpace>
      <NImage src="./images/landscape.svg" :width="150" :height="96" :alt="t('examples.NImageGroup.landscape')" object-fit="cover" />
      <NImage src="./images/portrait.svg" :width="96" :height="96" :alt="t('examples.NImageGroup.portrait')" object-fit="cover" />
    </NSpace>
  </NImageGroup>
</template>
