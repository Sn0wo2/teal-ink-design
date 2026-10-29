<script setup lang="ts">
import { NTag } from 'naive-ui'

withDefaults(defineProps<{
  tone?: 'neutral' | 'accent' | 'success' | 'info' | 'warning' | 'error'
  size?: 'small' | 'medium' | 'large'
  round?: boolean
  closable?: boolean
  disabled?: boolean
}>(), {
  tone: 'neutral',
  size: 'medium',
  round: true,
  closable: false,
  disabled: false
})

defineOptions({ inheritAttrs: false })

defineEmits<{
  close: [event: MouseEvent]
}>()
</script>

<template>
  <NTag
    v-bind="$attrs"
    :type="tone === 'neutral' ? 'default' : tone === 'accent' ? 'primary' : tone"
    :size="size"
    :round="round"
    :closable="closable"
    :disabled="disabled"
    @close="$emit('close', $event)"
  >
    <slot />
  </NTag>
</template>
