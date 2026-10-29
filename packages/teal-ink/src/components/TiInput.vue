<script setup lang="ts">
import { computed, useId } from 'vue'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { NInput } from 'naive-ui'

const props = withDefaults(defineProps<{
  id?: string
  modelValue?: string
  label?: string
  hint?: string
  placeholder?: string
  type?: 'text' | 'textarea' | 'password'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  status?: 'success' | 'warning' | 'error'
  maxlength?: number
}>(), {
  modelValue: '',
  type: 'text',
  size: 'medium'
})

defineOptions({ inheritAttrs: false })

defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const generatedId = useId()
const inputId = computed(() => props.id || `ti-input-${generatedId}`)
</script>

<template>
  <div class="ti-input" :class="$attrs.class" :style="$attrs.style">
    <label v-if="label" class="ti-input__label" :for="inputId">{{ label }}</label>
    <NInput
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      :status="status"
      :maxlength="maxlength"
      :input-props="{
        ...Object.fromEntries(Object.entries($attrs).filter(([key]) => key !== 'class' && key !== 'style')),
        id: inputId,
        'aria-describedby': [
          typeof $attrs['aria-describedby'] === 'string' ? $attrs['aria-describedby'] : undefined,
          hint ? `${inputId}-hint` : undefined,
        ].filter(Boolean).join(' ') || undefined,
        'aria-invalid': status === 'error' ? 'true' : $attrs['aria-invalid'],
      } as InputHTMLAttributes & TextareaHTMLAttributes"
      @update:value="$emit('update:modelValue', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <div v-if="hint" :id="`${inputId}-hint`" class="ti-input__hint">{{ hint }}</div>
  </div>
</template>

<style scoped lang="scss">
.ti-input {
  display: grid;
  gap: var(--ti-space-2);

  &__hint {
    color: var(--ti-color-text-secondary);
    font-size: var(--ti-font-size-label);
  }
}
</style>
