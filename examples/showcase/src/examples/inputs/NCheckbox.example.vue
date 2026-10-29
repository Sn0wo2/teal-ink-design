<script setup lang="ts">
import { NCheckbox } from '@teal-ink/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const checked = ref(true)
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NCheckbox v-model:checked="checked">{{ t('examples.NCheckbox.label') }}</NCheckbox>
</template>
