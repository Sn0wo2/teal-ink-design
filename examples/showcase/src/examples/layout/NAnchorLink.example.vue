<script setup lang="ts">
import { NAnchor, NAnchorLink, NFlex, NP } from '@teal-ink/vue'
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const targetId = useId()
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NAnchor :affix="false">
      <NAnchorLink :title="t('examples.NAnchorLink.readDetails')" :href="`#${targetId}`" />
    </NAnchor>
    <NP :id="targetId" class="anchor-section">{{ t('examples.NAnchorLink.linkedDetails') }}</NP>
  </NFlex>
</template>

<style scoped lang="scss">
.anchor-section { padding: var(--ti-space-4) 0; }
</style>
