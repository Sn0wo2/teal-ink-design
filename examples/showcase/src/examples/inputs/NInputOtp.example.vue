<script setup lang="ts">
import { ref } from 'vue'
import { NInputOtp } from '@teal-ink/vue'

const value = ref<string[] | null>(['4', '2', '7', '1', '8', '5'])
</script>

<template>
  <NInputOtp v-model:value="value" :length="6" class="example-field" />
</template>
