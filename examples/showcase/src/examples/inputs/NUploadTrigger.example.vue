<script setup lang="ts">
import { NUpload, NUploadFileList, NUploadTrigger, TiButton } from '@teal-ink/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <NUpload :default-upload="false" abstract>
    <NUploadTrigger><TiButton>{{ t('examples.NUploadTrigger.chooseFile') }}</TiButton></NUploadTrigger>
    <NUploadFileList />
  </NUpload>
</template>
