<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem href="#layout-crumb-start">{{ t('examples.NBreadcrumbItem.workspace') }}</NBreadcrumbItem>
    <NBreadcrumbItem href="#layout-crumb-current">{{ t('examples.NBreadcrumbItem.projects') }}</NBreadcrumbItem>
    <NBreadcrumbItem>{{ t('examples.NBreadcrumbItem.current') }}</NBreadcrumbItem>
  </NBreadcrumb>
</template>
