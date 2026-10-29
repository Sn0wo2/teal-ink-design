<script setup lang="ts">
import { NDatePicker } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref<number | null>(new Date(2026, 4, 24).getTime())
</script>

<template>
  <NDatePicker v-model:value="value" type="date" class="example-field" />
</template>
