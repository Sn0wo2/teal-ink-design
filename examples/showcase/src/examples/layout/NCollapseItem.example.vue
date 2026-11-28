<script setup lang="ts">
import { NCollapse, NCollapseItem } from '@teal-ink/vue'
</script>

<template>
  <NCollapse :default-expanded-names="['delivery']">
    <NCollapseItem :title="$t('examples.NCollapseItem.delivery')" name="delivery">
      {{ $t('examples.NCollapseItem.tracking') }}
    </NCollapseItem>
    <NCollapseItem :title="$t('examples.NCollapseItem.payment')" name="payment">
      {{ $t('examples.NCollapseItem.paymentMethods') }}
    </NCollapseItem>
  </NCollapse>
</template>
