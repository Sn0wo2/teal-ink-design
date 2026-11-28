<script setup lang="ts">
import { NFlex, NText, TiThemeSwitch } from '@teal-ink/vue'
import { themeIcons } from '../../assets/icons'
</script>

<template>
  <NFlex vertical align="start">
    <TiThemeSwitch
      :label="$t('examples.TiThemeSwitch.theme')"
      :labels="{ light: $t('examples.TiThemeSwitch.light'), dark: $t('examples.TiThemeSwitch.dark'), system: $t('examples.TiThemeSwitch.system') }"
      :icons="themeIcons"
    />
    <NText depth="3">{{ $t('examples.TiThemeSwitch.hint') }}</NText>
  </NFlex>
</template>
