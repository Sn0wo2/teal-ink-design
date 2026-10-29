<script setup lang="ts">
import { NFlex, TiButton, useDialog } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const dialog = useDialog()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NFlex vertical :size="16" style="max-width: 640px">
    <NFlex>
      <TiButton
        variant="primary"
        @click="dialog.info({ title: t('examples.DialogProviderActions.infoTitle'), content: t('examples.DialogProviderActions.infoContent'), positiveText: t('examples.DialogProviderActions.understood') })"
      >
        {{ t('examples.DialogProviderActions.info') }}
      </TiButton>
      <TiButton
        variant="secondary"
        @click="dialog.warning({ title: t('examples.DialogProviderActions.archiveTitle'), content: t('examples.DialogProviderActions.archiveContent'), positiveText: t('examples.DialogProviderActions.archive'), negativeText: t('examples.DialogProviderActions.cancel') })"
      >
        {{ t('examples.DialogProviderActions.confirm') }}
      </TiButton>
    </NFlex>
  </NFlex>
</template>
