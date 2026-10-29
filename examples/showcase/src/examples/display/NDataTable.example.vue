<script setup lang="ts">
import { computed } from 'vue'
import { NDataTable, type DataTableColumns } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const data = computed(() => [
  { id: 1, name: t('examples.NDataTable.avatar'), category: t('examples.NDataTable.media'), updated: t('examples.NDataTable.today') },
  { id: 2, name: t('examples.NDataTable.calendar'), category: t('examples.NDataTable.date'), updated: t('examples.NDataTable.today') },
  { id: 3, name: t('examples.NDataTable.dataTable'), category: t('examples.NDataTable.data'), updated: t('examples.NDataTable.yesterday') },
  { id: 4, name: t('examples.NDataTable.tree'), category: t('examples.NDataTable.navigation'), updated: t('examples.NDataTable.yesterday') },
])
type Row = typeof data.value[number]

const columns = computed<DataTableColumns<Row>>(() => [
  { title: t('examples.NDataTable.name'), key: 'name', sorter: 'default' },
  { title: t('examples.NDataTable.category'), key: 'category' },
  { title: t('examples.NDataTable.updated'), key: 'updated' },
])
</script>

<template>
  <NDataTable :columns="columns" :data="data" :row-key="(row: Row) => row.id" :pagination="{ pageSize: 2 }" striped />
</template>
