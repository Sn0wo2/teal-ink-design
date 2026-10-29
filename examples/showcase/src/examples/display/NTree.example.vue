<script setup lang="ts">
import { NTree } from '@teal-ink/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

 
const { t } = useI18n({ useScope: 'global' })
const data = computed(() => [
  { key: 'workspace', label: t('examples.NTree.workspace'), children: [
    { key: 'components', label: t('examples.NTree.components'), children: [
      { key: 'display', label: t('examples.NTree.display') },
      { key: 'data', label: t('examples.NTree.dataEntry') },
     ] },
    { key: 'tokens', label: t('examples.NTree.tokens') },
  ] },
])
</script>

<template>
  <NTree :data="data" :default-expanded-keys="['workspace', 'components']"
    :default-checked-keys="['display']" checkable block-node :animated="false" />
</template>
