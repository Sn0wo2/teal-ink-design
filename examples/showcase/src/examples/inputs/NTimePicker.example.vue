<script setup lang="ts">
import { ref } from 'vue'
import { NTimePicker } from '@teal-ink/vue'

const value = ref<number | null>(new Date(2026, 4, 24, 9, 30).getTime())
</script>

<template>
  <NTimePicker v-model:value="value" class="example-field" />
</template>
