<script setup lang="ts">
import { ref } from 'vue'
import { NRate } from '@teal-ink/vue'

const value = ref(4)
</script>

<template>
  <NRate v-model:value="value" />
</template>
