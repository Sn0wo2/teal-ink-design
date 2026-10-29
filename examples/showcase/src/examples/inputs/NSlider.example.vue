<script setup lang="ts">
import { NSlider } from '@teal-ink/vue'
import { ref } from 'vue'

const value = ref(68)
</script>

<template>
  <NSlider v-model:value="value" :min="0" :max="100" class="example-field" />
</template>
