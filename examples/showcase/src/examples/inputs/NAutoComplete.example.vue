<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { NAutoComplete } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const options = computed(() => [t('examples.NAutoComplete.kyoto'), t('examples.NAutoComplete.kanazawa'), t('examples.NAutoComplete.kamakura')])
const value = ref(options.value[0])
watch(options, (next, previous) => {
  const selectedIndex = previous.indexOf(value.value)
  if (selectedIndex !== -1) value.value = next[selectedIndex]
})
</script>

<template>
  <NAutoComplete v-model:value="value" :options="options" :placeholder="t('examples.NAutoComplete.placeholder')" class="example-field" />
</template>
