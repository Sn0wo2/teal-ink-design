<script setup lang="ts">
import { NCollapse, NCollapseItem } from '@teal-ink/vue'
</script>

<template>
  <NCollapse :default-expanded-names="['shipping']">
    <NCollapseItem :title="$t('examples.NCollapse.shipping')" name="shipping">{{ $t('examples.NCollapse.shippingContent') }}</NCollapseItem>
    <NCollapseItem :title="$t('examples.NCollapse.returns')" name="returns">{{ $t('examples.NCollapse.returnsContent') }}</NCollapseItem>
  </NCollapse>
</template>
