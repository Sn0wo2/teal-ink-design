<script setup lang="ts">
import { createThemeOverrides, NAlert, NButton, NConfigProvider, NFlex, NP, TiButton, useTiTheme } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { theme } = useTiTheme()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NConfigProvider :preflight-style-disabled="true" :theme-overrides="createThemeOverrides(theme)">
    <NFlex vertical :size="16" style="max-width: 640px">
      <NP>{{ t('examples.NConfigProvider.description') }}</NP>
      <NFlex align="center">
        <TiButton variant="primary">{{ t('examples.NConfigProvider.save') }}</TiButton>
        <NButton secondary>{{ t('examples.NConfigProvider.later') }}</NButton>
      </NFlex>
      <NAlert type="success" :title="t('examples.NConfigProvider.synced')" :bordered="false">
        {{ t('examples.NConfigProvider.palette') }}
      </NAlert>
    </NFlex>
  </NConfigProvider>
</template>
