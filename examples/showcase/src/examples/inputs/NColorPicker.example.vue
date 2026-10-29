<script setup lang="ts">
import { ref } from 'vue'
import { NColorPicker, palette } from '@teal-ink/vue'

const value = ref<string>(palette.primary)
</script>

<template>
  <NColorPicker v-model:value="value" class="example-field" />
</template>
