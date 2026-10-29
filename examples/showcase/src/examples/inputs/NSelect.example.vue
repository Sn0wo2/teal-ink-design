<script setup lang="ts">
import { ref } from 'vue'
import { NSelect } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const value = ref<string | null>('matte-glaze')
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NSelect v-model:value="value"
    :options="[
      { label: t('examples.NSelect.matte'), value: 'matte-glaze' },
      { label: t('examples.NSelect.gloss'), value: 'gloss-glaze' },
      { label: t('examples.NSelect.unglazed'), value: 'unglazed' },
    ]"
    :placeholder="t('examples.NSelect.placeholder')" class="example-field" />
</template>
