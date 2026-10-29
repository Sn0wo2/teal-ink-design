<script setup lang="ts">
import { NSwitch } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <NSwitch v-model:value="value" />
</template>
