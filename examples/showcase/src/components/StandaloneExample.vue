<script setup lang="ts">
import { NEmpty, NFlex } from '@teal-ink/vue'
import { type Component, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { exampleName } from '../utils/example-name'

const props = defineProps<{ name: string }>()
const { t } = useI18n({ useScope: 'global' })
const examples = new Map(
  Object.entries(import.meta.glob<Component>('../examples/*/*[.-]example.vue', { eager: true, import: 'default' }))
    .map(([path, example]) => [exampleName(path), example] as const),
)
const example = computed(() => examples.get(props.name))
</script>

<template>
  <NFlex vertical class="standalone-example">
    <NFlex v-if="example" vertical :data-ti-example="name"><component :is="example" /></NFlex>
    <NEmpty v-else :description="t('standalone.missingExample', { name })" />
  </NFlex>
</template>

<style scoped lang="scss">
.standalone-example { padding: 24px; }
</style>
