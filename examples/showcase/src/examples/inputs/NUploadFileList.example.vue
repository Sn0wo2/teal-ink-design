<script setup lang="ts">
import { NUpload, NUploadFileList, type UploadFileInfo } from '@teal-ink/vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const files = ref<UploadFileInfo[]>([{ id: 'studio-notes', name: t('examples.NUploadFileList.fileName'), status: 'finished' }])
watch(() => t('examples.NUploadFileList.fileName'), (name) => {
  files.value = files.value.map((file) => file.id === 'studio-notes' ? { ...file, name } : file)
})
</script>

<template>
  <NUpload v-model:file-list="files" :default-upload="false" abstract>
    <NUploadFileList />
  </NUpload>
</template>
