<script setup lang="ts">
import { NList, NListItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NList bordered hoverable>
    <NListItem>{{ t('examples.NList.notes') }}</NListItem>
    <NListItem>{{ t('examples.NList.checklist') }}</NListItem>
    <NListItem>{{ t('examples.NList.directory') }}</NListItem>
  </NList>
</template>
