<script setup lang="ts">
import { NColorPicker, palette } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref<string>(palette.primary)
</script>

<template>
  <NColorPicker v-model:value="value" class="example-field" />
</template>
