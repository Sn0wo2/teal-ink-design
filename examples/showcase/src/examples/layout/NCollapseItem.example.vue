<script setup lang="ts">
import { NCollapse, NCollapseItem } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NCollapse :default-expanded-names="['delivery']">
    <NCollapseItem :title="t('examples.NCollapseItem.delivery')" name="delivery">
      {{ t('examples.NCollapseItem.tracking') }}
    </NCollapseItem>
    <NCollapseItem :title="t('examples.NCollapseItem.payment')" name="payment">
      {{ t('examples.NCollapseItem.paymentMethods') }}
    </NCollapseItem>
  </NCollapse>
</template>
