<script setup lang="ts">
import { NLog } from '@teal-ink/vue'
</script>

<template>
  <NLog :rows="5" :font-size="12" :lines="[
    `[09:41:02] ${$t('examples.NLog.started')}`,
    `[09:41:03] ${$t('examples.NLog.loaded')}`,
    `[09:41:04] ${$t('examples.NLog.rendered')}`,
    `[09:41:05] ${$t('examples.NLog.ready')}`,
  ]" />
</template>
