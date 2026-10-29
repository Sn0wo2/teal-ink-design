<script setup lang="ts">
import { NInput, NInputGroup, NInputGroupLabel } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref('slowstudio.example')
</script>

<template>
  <NInputGroup>
    <NInputGroupLabel>https://</NInputGroupLabel>
    <NInput v-model:value="value" />
    <NInputGroupLabel>/</NInputGroupLabel>
  </NInputGroup>
</template>
