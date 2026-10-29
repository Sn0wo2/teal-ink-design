<script setup lang="ts">
import { NIcon, NIconWrapper } from '@teal-ink/vue'
</script>

<template>
  <NIconWrapper :size="48" :border-radius="14" color="var(--ti-color-selection)" icon-color="var(--ti-color-accent-text)">
    <NIcon :size="25">
      <span class="public-icon" aria-hidden="true" style="--icon: url('./icons/sparkle.svg')" />
    </NIcon>
  </NIconWrapper>
</template>
