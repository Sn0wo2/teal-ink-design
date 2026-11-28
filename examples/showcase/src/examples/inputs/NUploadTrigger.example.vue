<script setup lang="ts">
import { NUpload, NUploadFileList, NUploadTrigger, TiButton } from '@teal-ink/vue'
</script>

<template>
  <NUpload :default-upload="false" abstract>
    <NUploadTrigger><TiButton>{{ $t('examples.NUploadTrigger.chooseFile') }}</TiButton></NUploadTrigger>
    <NUploadFileList />
  </NUpload>
</template>
