<script setup lang="ts">
import { computed, type Component } from 'vue'
import { NEmpty, NFlex } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ name: string }>()
const { t } = useI18n({ useScope: 'global' })
const examples = import.meta.glob<Component>('../examples/*/*.example.vue', { eager: true, import: 'default' })
const example = computed(() => Object.entries(examples).find(([path]) => path.endsWith(`/${props.name}.example.vue`))?.[1])
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
