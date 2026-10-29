<script setup lang="ts">
withDefaults(defineProps<{
  size?: number | string
  label?: string
}>(), {
  size: 42,
  label: ''
})

defineOptions({ inheritAttrs: false })
</script>

<template>
  <svg
    v-bind="$attrs"
    :width="size"
    :height="size"
    viewBox="0 0 96 96"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <title v-if="label">{{ label }}</title>
    <path
      fill="currentColor"
      d="M43 31C34 24 25 20 15 20Q12 20 12 23V64Q12 67 15 67C26 67 35 72 43 80V67C36 61 29 58 22 57V31C30 33 37 37 43 43Z"
    />
    <path
      fill="var(--ti-logo-accent, currentColor)"
      d="M53 29C61 21 70 16 82 14C86 50 78 70 53 82V68C69 58 75 46 73 29C65 32 59 36 53 42Z"
    />
  </svg>
</template>

<style scoped>
svg {
  display: block;
}
</style>
