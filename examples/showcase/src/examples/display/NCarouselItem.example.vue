<script setup lang="ts">
import { NCarousel, NCarouselItem, NP } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NCarousel :autoplay="false" show-dots>
    <NCarouselItem><NP class="slide">{{ t('examples.NCarouselItem.first') }}</NP></NCarouselItem>
    <NCarouselItem><NP class="slide slide--accent">{{ t('examples.NCarouselItem.another') }}</NP></NCarouselItem>
  </NCarousel>
</template>

<style scoped lang="scss">
.slide { margin: 0; padding: 54px 20px; background: var(--ti-color-surface); text-align: center; }
.slide--accent { background: var(--ti-color-selection); }
</style>
