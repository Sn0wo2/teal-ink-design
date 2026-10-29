<script setup lang="ts">
import { NFlex, NText, NVirtualList } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NVirtualList :item-size="36" style="height: 216px"
    :items="Array.from({ length: 48 }, (_, index) => ({ key: index, label: t('examples.NVirtualList.row', { number: index + 1 }) }))"
    :scrollbar-props="{ contentStyle: { padding: '4px 12px' } }">
    <template #default="{ item }">
      <NFlex class="row" align="center">
        <NText>{{ String(item.key + 1).padStart(2, '0') }} · {{ item.label }}</NText>
      </NFlex>
    </template>
  </NVirtualList>
</template>

<style scoped lang="scss">
.row { height: 36px; box-sizing: border-box; border-bottom: 1px solid var(--ti-color-border); }
</style>
