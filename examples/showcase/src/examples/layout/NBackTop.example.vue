<script setup lang="ts">
import { TiCard, NBackTop, NFlex, NP, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { useElementRef } from '../../utils/composables'

const { t } = useI18n({ useScope: 'global' })
const { element: target, setElement } = useElementRef()
</script>

<template>
  <TiCard size="small" :ref="setElement" class="back-top-target">
    <NFlex vertical :size="16" class="back-top-content">
      <NText strong>{{ t('examples.NBackTop.title') }}</NText>
      <NP>{{ t('examples.NBackTop.instruction') }}</NP>
      <NP class="back-top-end">{{ t('examples.NBackTop.end') }}</NP>
    </NFlex>
    <NBackTop
      v-if="target"
      :to="target"
      :listen-to="() => target!"
      show
      :right="12"
      :bottom="12"
      style="position: absolute"
    >↑</NBackTop>
  </TiCard>
</template>

<style scoped lang="scss">
.back-top-target { position: relative; height: 160px; overflow: auto; }
.back-top-content { min-height: 360px; padding: var(--ti-space-3) var(--ti-space-3) 90px; }
.back-top-content .back-top-end { margin-top: 174px; }
</style>
