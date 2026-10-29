<script setup lang="ts">
import { ref } from 'vue'
import { NCalendar } from '@teal-ink/vue'

const value = ref(Date.now())
</script>

<template>
  <NCalendar v-model:value="value" style="height: 350px; max-width: 720px" />
</template>
