<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from '@teal-ink/vue'
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem href="#layout-home">{{ $t('examples.NBreadcrumb.home') }}</NBreadcrumbItem>
    <NBreadcrumbItem href="#layout-library">{{ $t('examples.NBreadcrumb.library') }}</NBreadcrumbItem>
    <NBreadcrumbItem>{{ $t('examples.NBreadcrumb.current') }}</NBreadcrumbItem>
  </NBreadcrumb>
</template>
