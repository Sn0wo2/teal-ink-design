<script setup lang="ts">
import { NRadio } from '@teal-ink/vue'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <NRadio v-model:checked="checked">{{ $t('examples.NRadio.label') }}</NRadio>
</template>
