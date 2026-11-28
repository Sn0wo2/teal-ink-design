<script setup lang="ts">
import { NCheckbox } from '@teal-ink/vue'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <NCheckbox v-model:checked="checked">{{ $t('examples.NCheckbox.label') }}</NCheckbox>
</template>
