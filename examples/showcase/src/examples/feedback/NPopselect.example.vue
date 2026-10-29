<script setup lang="ts">
import { NFlex, NPopselect, NText, TiButton } from '@teal-ink/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const show = ref(false)
const value = ref<string | null>('paper')
const { t } = useI18n({ useScope: 'global' })
const options = computed(() => [
  { label: t('examples.NPopselect.paper'), value: 'paper' },
  { label: t('examples.NPopselect.ink'), value: 'ink' },
  { label: t('examples.NPopselect.primary'), value: 'primary' },
])
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NText aria-live="polite">{{ t('examples.NPopselect.current', { label: options.find((option) => option.value === value)?.label }) }}</NText>
    <NPopselect
      v-model:show="show"
      v-model:value="value"
      :options="options"
      trigger="click"
    >
      <TiButton variant="secondary">{{ t('examples.NPopselect.button') }}　⌄</TiButton>
    </NPopselect>
  </NFlex>
</template>
