<script setup lang="ts">
import { NCarousel, NCarouselItem, NP } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
 
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
   <NCarousel :autoplay="false" show-dots>
    <NCarouselItem><NP class="slide">01 · {{ t('examples.NCarousel.paper') }}</NP></NCarouselItem>
    <NCarouselItem><NP class="slide slide--ink">02 · {{ t('examples.NCarousel.ink') }}</NP></NCarouselItem>
    <NCarouselItem><NP class="slide slide--primary">03 · {{ t('examples.NCarousel.primary') }}</NP></NCarouselItem>
  </NCarousel>
</template>

<style scoped lang="scss">
.slide { margin: 0; padding: 48px 20px; background: var(--ti-color-surface); text-align: center; }
.slide--ink { background: var(--ti-color-raised); }
.slide--primary { background: var(--ti-color-selection); }
</style>
