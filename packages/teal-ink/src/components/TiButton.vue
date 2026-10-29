<script setup lang="ts">
import { NButton } from 'naive-ui'

withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  round?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'secondary',
  size: 'medium',
  type: 'button'
})

defineOptions({ inheritAttrs: false })

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <NButton
    v-bind="$attrs"
    :type="variant === 'primary' ? 'primary' : 'default'"
    :secondary="variant === 'secondary'"
    :ghost="variant === 'ghost'"
    :text="variant === 'text'"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :block="block"
    :round="round"
    :attr-type="type"
    @click="$emit('click', $event)"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <slot />
  </NButton>
</template>
