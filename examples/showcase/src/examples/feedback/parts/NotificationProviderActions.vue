<script setup lang="ts">
import { TiButton, NFlex, useNotification } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const notification = useNotification()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <TiButton
      variant="primary"
      @click="notification.success({ title: t('examples.NotificationProviderActions.title'), content: t('examples.NotificationProviderActions.content'), duration: 3000 })"
    >
      {{ t('examples.NotificationProviderActions.send') }}
    </TiButton>
  </NFlex>
</template>
