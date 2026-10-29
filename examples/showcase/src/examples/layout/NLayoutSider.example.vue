<script setup lang="ts">
import { NFlex, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NLayout has-sider class="layout-preview">
    <NLayoutSider :width="108" bordered>
      <NFlex vertical :size="4" class="sider-content">
        <NText>{{ t('examples.NLayoutSider.overview') }}</NText>
        <NText>{{ t('examples.NLayoutSider.projects') }}</NText>
      </NFlex>
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader class="layout-content">{{ t('examples.NLayoutSider.project') }}</NLayoutHeader>
      <NLayoutContent class="layout-content">{{ t('examples.NLayoutSider.workspace') }}</NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style scoped lang="scss">
.layout-preview { height: 166px; border: 1px solid var(--ti-color-border); }
.sider-content, .layout-content { padding: var(--ti-space-3); }
</style>
