<script setup lang="ts">
import { NTreeSelect } from '@teal-ink/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const value = ref<string | null>('tea-bowls')
const { t } = useI18n({ useScope: 'global' })
const options = computed(() => [
  { label: t('examples.NTreeSelect.tableware'), key: 'tableware', children: [
    { label: t('examples.NTreeSelect.bowls'), key: 'tea-bowls' },
    { label: t('examples.NTreeSelect.plates'), key: 'serving-plates' },
  ] },
  { label: t('examples.NTreeSelect.vases'), key: 'vases' },
])
</script>

<template>
  <NTreeSelect v-model:value="value" :options="options" :placeholder="t('examples.NTreeSelect.placeholder')" class="example-field" />
</template>
