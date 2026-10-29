<script setup lang="ts">
import { TiButton, NDropdown, NFlex, NText } from '@teal-ink/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const chosen = ref<string | null>(null)
const { t } = useI18n({ useScope: 'global' })
const options = computed(() => [
  { label: t('examples.NDropdown.edit'), key: 'edit' },
  { label: t('examples.NDropdown.copy'), key: 'copy' },
  { type: 'divider', key: 'divider' },
  { label: t('examples.NDropdown.archive'), key: 'archive' },
])
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NText aria-live="polite">{{ t('examples.NDropdown.recent', { action: chosen ? t('examples.NDropdown.' + (chosen)) : t('examples.NDropdown.none') }) }}</NText>
    <NDropdown
      v-model:show="show"
      :options="options"
      trigger="click"
      @select="chosen = String($event); show = false"
    >
      <TiButton variant="secondary">{{ t('examples.NDropdown.button') }}　⌄</TiButton>
    </NDropdown>
  </NFlex>
</template>
