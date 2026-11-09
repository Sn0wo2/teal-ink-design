<script setup lang="ts">
import { NAffix, NButton, NFlex, NP, TiCard } from '@teal-ink/vue'
import { computed, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const card = useTemplateRef<InstanceType<typeof TiCard>>('card')
const target = computed(() => {
  const element = card.value?.$el as HTMLElement | undefined
  return element ? () => element : undefined
})
</script>

<template>
  <TiCard ref="card" size="small" class="affix-target">
    <NFlex vertical :size="16" class="affix-content">
      <NP>{{ t('examples.NAffix.instruction') }}</NP>
      <NAffix v-if="target" position="absolute" :top="12" :target="target" :listen-to="target">
        <NButton size="small">{{ t('examples.NAffix.pinned') }}</NButton>
      </NAffix>
      <NP class="affix-end">{{ t('examples.NAffix.end') }}</NP>
    </NFlex>
  </TiCard>
</template>

<style scoped lang="scss">
.affix-target { position: relative; height: 150px; overflow: auto; }
.affix-content { position: relative; height: 330px; }
.affix-end { margin-top: 220px; }
</style>
