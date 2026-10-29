<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem href="#layout-home">{{ t('examples.NBreadcrumb.home') }}</NBreadcrumbItem>
    <NBreadcrumbItem href="#layout-library">{{ t('examples.NBreadcrumb.library') }}</NBreadcrumbItem>
    <NBreadcrumbItem>{{ t('examples.NBreadcrumb.current') }}</NBreadcrumbItem>
  </NBreadcrumb>
</template>
