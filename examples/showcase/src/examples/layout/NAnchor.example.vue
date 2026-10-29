<script setup lang="ts">
import { NAnchor, NAnchorLink, NFlex, NP } from '@teal-ink/vue'
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const anchorId = useId()
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NAnchor :affix="false" show-rail>
      <NAnchorLink :title="t('examples.NAnchor.introduction')" :href="`#${anchorId}-intro`" />
      <NAnchorLink :title="t('examples.NAnchor.details')" :href="`#${anchorId}-details`" />
    </NAnchor>
    <NP :id="`${anchorId}-intro`" class="anchor-section">{{ t('examples.NAnchor.introduction') }}</NP>
    <NP :id="`${anchorId}-details`" class="anchor-section">{{ t('examples.NAnchor.details') }}</NP>
  </NFlex>
</template>

<style scoped lang="scss">
.anchor-section { padding: var(--ti-space-3) 0; }
</style>
