<script setup lang="ts">
import { NSelect } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref<string | null>('matte-glaze')
</script>

<template>
  <NSelect v-model:value="value"
    :options="[
      { label: $t('examples.NSelect.matte'), value: 'matte-glaze' },
      { label: $t('examples.NSelect.gloss'), value: 'gloss-glaze' },
      { label: $t('examples.NSelect.unglazed'), value: 'unglazed' },
    ]"
    :placeholder="$t('examples.NSelect.placeholder')" class="example-field" />
</template>
