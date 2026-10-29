<script setup lang="ts">
import { NInputNumber } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref<number | null>(24)
</script>

<template>
  <NInputNumber v-model:value="value" :min="0" :max="120" class="example-field" />
</template>
