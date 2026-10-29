<script setup lang="ts">
import { ref } from 'vue'
import { NSwitch } from '@teal-ink/vue'

const value = ref(true)
</script>

<template>
  <NSwitch v-model:value="value" />
</template>
