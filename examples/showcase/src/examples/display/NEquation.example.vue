<script setup lang="ts">
import { NEquation } from '@teal-ink/vue'
import katex from 'katex'
</script>

<template>
  <NEquation value="E = mc^2" :katex="katex" />
</template>
