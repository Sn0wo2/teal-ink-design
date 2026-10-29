<script setup lang="ts">
import { NFlex, NText, NUpload, NUploadDragger, type UploadFileInfo } from '@teal-ink/vue'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const files = ref<UploadFileInfo[]>([{ id: 'studio-notes', name: t('examples.NUploadDragger.fileName'), status: 'finished' }])
watch(() => t('examples.NUploadDragger.fileName'), (name) => {
  files.value = files.value.map((file) => file.id === 'studio-notes' ? { ...file, name } : file)
})
</script>

<template>
  <NUpload v-model:file-list="files" :default-upload="false">
    <NUploadDragger>
      <NFlex vertical align="center" :size="4">
        <NText strong>{{ t('examples.NUploadDragger.drop') }}</NText>
        <NText depth="3">{{ t('examples.NUploadDragger.browse') }}</NText>
      </NFlex>
    </NUploadDragger>
  </NUpload>
</template>
