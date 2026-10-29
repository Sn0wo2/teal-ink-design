<script setup lang="ts">
import { NCard } from 'naive-ui'

withDefaults(defineProps<{
  title?: string
  raised?: boolean
  size?: 'small' | 'medium' | 'large'
}>(), {
  raised: false,
  size: 'medium'
})

defineOptions({ inheritAttrs: false })
</script>

<template>
  <NCard
    v-bind="{ ...$attrs, ...(title === undefined ? {} : { title }) }"
    class="ti-card"
    :style="{
      backgroundColor: raised ? 'var(--ti-color-raised)' : 'var(--ti-color-surface)',
      boxShadow: raised ? 'var(--ti-shadow-floating)' : undefined,
    }"
    :size="size"
  >
    <template v-if="$slots['header']" #header>
      <slot name="header" />
    </template>
    <template v-if="$slots['header-extra']" #header-extra>
      <slot name="header-extra" />
    </template>
    <slot />
    <template v-if="$slots['footer']" #footer>
      <slot name="footer" />
    </template>
  </NCard>
</template>
