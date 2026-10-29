<script setup lang="ts">
import { NList, NListItem, NThing } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NList bordered>
    <NListItem>
      <NThing :title="t('examples.NListItem.checklist')" :description="t('examples.NListItem.updated')" />
    </NListItem>
    <NListItem>{{ t('examples.NListItem.notes') }}</NListItem>
  </NList>
</template>
