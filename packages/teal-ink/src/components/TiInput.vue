<script setup lang="ts">
import { NInput } from 'naive-ui'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import { computed, useAttrs, useId } from 'vue'

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

const attrs = useAttrs()
const generatedId = useId()
const inputId = computed(() => props.id || generatedId)

function inputProps(): InputHTMLAttributes & TextareaHTMLAttributes {
  const { class: _class, style: _style, ...forwarded } = attrs
  const describedBy = [
    typeof forwarded['aria-describedby'] === 'string' ? forwarded['aria-describedby'] : undefined,
    props.hint ? `${inputId.value}-hint` : undefined,
  ].filter(Boolean).join(' ') || undefined
  return {
    ...forwarded,
    id: inputId.value,
    'aria-describedby': describedBy,
    'aria-invalid': props.status === 'error' ? 'true' : forwarded['aria-invalid'],
  } as InputHTMLAttributes & TextareaHTMLAttributes
}
</script>

<template>
  <div class="ti-input" :class="$attrs.class" :style="$attrs.style">
    <label v-if="label" class="ti-input__label" :for="inputId">{{ label }}</label>
    <NInput
      :value="modelValue"
      :type="type"
      v-bind="{
        ...(placeholder === undefined ? {} : { placeholder }),
        ...(status === undefined ? {} : { status }),
        ...(maxlength === undefined ? {} : { maxlength }),
      }"
      :size="size"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      :input-props="inputProps()"
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
