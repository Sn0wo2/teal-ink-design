<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCascader } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const value = ref<string | null>('kyoto')
const { t } = useI18n({ useScope: 'global' })
const options = computed(() => [
  { label: t('examples.NCascader.japan'), value: 'japan', children: [
    { label: t('examples.NCascader.kansai'), value: 'kansai', children: [
      { label: t('examples.NCascader.kyoto'), value: 'kyoto' },
      { label: t('examples.NCascader.osaka'), value: 'osaka' },
     ] },
    { label: t('examples.NCascader.hokuriku'), value: 'hokuriku', children: [
      { label: t('examples.NCascader.kanazawa'), value: 'kanazawa' },
    ] },
  ] },
])
</script>

<template>
  <NCascader v-model:value="value" :options="options" :placeholder="t('examples.NCascader.placeholder')" class="example-field" />
</template>
