<script setup lang="ts">
import { TiThemeSwitch, NFlex, NText } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import { themeIcons } from '../../assets/icons'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical align="start">
    <TiThemeSwitch
      :label="t('examples.TiThemeSwitch.theme')"
      :labels="{ light: t('examples.TiThemeSwitch.light'), dark: t('examples.TiThemeSwitch.dark'), system: t('examples.TiThemeSwitch.system') }"
      :icons="themeIcons"
    />
    <NText depth="3">{{ t('examples.TiThemeSwitch.hint') }}</NText>
  </NFlex>
</template>
