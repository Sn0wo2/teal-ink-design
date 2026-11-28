<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from '@teal-ink/vue'
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem href="#layout-crumb-start">{{ $t('examples.NBreadcrumbItem.workspace') }}</NBreadcrumbItem>
    <NBreadcrumbItem href="#layout-crumb-current">{{ $t('examples.NBreadcrumbItem.projects') }}</NBreadcrumbItem>
    <NBreadcrumbItem>{{ $t('examples.NBreadcrumbItem.current') }}</NBreadcrumbItem>
  </NBreadcrumb>
</template>
