<script setup lang="ts">
import { ref } from 'vue'
import { NInputNumber } from '@teal-ink/vue'

const value = ref<number | null>(24)
</script>

<template>
  <NInputNumber v-model:value="value" :min="0" :max="120" class="example-field" />
</template>
