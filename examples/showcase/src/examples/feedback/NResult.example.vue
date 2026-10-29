<script setup lang="ts">
import { TiButton, NResult } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const complete = ref(false)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NResult
    :status="complete ? 'success' : '404'"
    :title="complete ? t('examples.NResult.connected') : t('examples.NResult.unavailable')"
    :description="complete ? t('examples.NResult.restored') : t('examples.NResult.expired')"
  >
    <template #footer>
      <TiButton variant="primary" @click="complete = !complete">
        {{ complete ? t('examples.NResult.empty') : t('examples.NResult.reload') }}
      </TiButton>
    </template>
  </NResult>
</template>
