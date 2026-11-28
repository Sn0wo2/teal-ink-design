<script setup lang="ts">
import { NHighlight } from '@teal-ink/vue'
</script>

<template>
  <NHighlight :text="$t('examples.NHighlight.text')" :patterns="[$t('examples.NHighlight.component'), $t('examples.NHighlight.match')]" />
</template>
