<script setup lang="ts">
import { TiCard, TiProvider, dateEnUS, dateZhCN, enUS, useTiTheme, zhCN } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'
import TiThemeSwitchExample from './TiThemeSwitch.example.vue'

const { mode } = useTiTheme()
const { locale, t } = useI18n({ useScope: 'global' })
</script>

<template>
  <TiProvider :mode="mode" :locale="locale === 'en' ? enUS : zhCN" :date-locale="locale === 'en' ? dateEnUS : dateZhCN">
    <TiCard :title="t('examples.TiProvider.title')">
      {{ t('examples.TiProvider.content') }}
      <template #footer>
        <TiThemeSwitchExample />
      </template>
    </TiCard>
  </TiProvider>
</template>
