<script setup lang="ts">
import { NRate } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref(4)
</script>

<template>
  <NRate v-model:value="value" />
</template>
