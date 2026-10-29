<script setup lang="ts">
import { NUpload, TiButton, type UploadFileInfo } from '@teal-ink/vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const files = ref<UploadFileInfo[]>([{ id: 'studio-notes', name: t('examples.NUpload.fileName'), status: 'finished' }])
watch(() => t('examples.NUpload.fileName'), (name) => {
  files.value = files.value.map((file) => file.id === 'studio-notes' ? { ...file, name } : file)
})
</script>

<template>
  <NUpload v-model:file-list="files" :default-upload="false">
    <TiButton>{{ t('examples.NUpload.chooseFile') }}</TiButton>
  </NUpload>
</template>
