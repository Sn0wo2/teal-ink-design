<script setup lang="ts">
import { NInfiniteScroll, NP } from '@teal-ink/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const count = ref(12)
const rows = computed(() => Array.from({ length: count.value }, (_, index) => t('examples.NInfiniteScroll.activity', { number: index + 1 })))
</script>

<template>
  <NInfiniteScroll style="height: 210px" :distance="24"
    :scrollbar-props="{ contentStyle: { padding: '8px 12px' } }" @load="() => void (count = Math.min(count + 3, 24))">
    <NP v-for="row in rows" :key="row" class="row">{{ row }}</NP>
  </NInfiniteScroll>
</template>

<style scoped lang="scss">
.row { margin: 0; padding: 8px 4px; border-bottom: 1px solid var(--ti-color-border); }
</style>
