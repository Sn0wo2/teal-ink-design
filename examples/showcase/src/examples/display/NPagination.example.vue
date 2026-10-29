<script setup lang="ts">
import { NPagination } from '@teal-ink/vue'
import { ref } from 'vue'

const page = ref(2)
</script>

<template>
  <NPagination v-model:page="page" :item-count="120" :page-size="10" />
</template>
