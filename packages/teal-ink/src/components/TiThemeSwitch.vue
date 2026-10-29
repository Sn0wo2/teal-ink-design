<script setup lang="ts">
import { NButton, NTab, NTabs } from 'naive-ui'
import { onBeforeUnmount, ref, watch } from 'vue'
import { useTiTheme } from '../context'
import type { TiColorMode } from '../tokens'

defineProps<{
  label: string
  labels: Record<TiColorMode, string>
  icons: Record<TiColorMode, string>
}>()
const { mode, setMode } = useTiTheme()
const control = ref<InstanceType<typeof NTabs>>()
const selected = ref(mode.value)
let dragPointer: number | undefined
let dragEvents: AbortController | undefined

watch(mode, (value) => { selected.value = value })
onBeforeUnmount(stopDrag)

function select(value: string | number, trigger?: HTMLElement) {
  if (value === selected.value) return
  selected.value = value as TiColorMode
  void setMode(selected.value, trigger ?? control.value?.$el)
}

function startDrag(value: TiColorMode, event: PointerEvent) {
  if (event.button !== 0) return
  stopDrag()
  dragPointer = event.pointerId
  dragEvents = new AbortController()
  window.addEventListener('pointerup', stopDrag, { signal: dragEvents.signal, capture: true })
  window.addEventListener('pointercancel', stopDrag, { signal: dragEvents.signal, capture: true })
  window.addEventListener('blur', stopDrag, { signal: dragEvents.signal })
  if ((event.target as Element).hasPointerCapture(event.pointerId)) {
    (event.target as Element).releasePointerCapture(event.pointerId)
  }
  select(value, event.currentTarget as HTMLElement)
}

function stopDrag(event?: Event) {
  if (event && 'pointerId' in event && event.pointerId !== dragPointer) return
  dragPointer = undefined
  dragEvents?.abort()
  dragEvents = undefined
}
</script>

<template>
  <NTabs
    ref="control"
    class="ti-theme-switch"
    type="segment"
    :value="selected"
    :theme-overrides="{
      tabBorderRadius: 'var(--ti-radius-pill)',
      colorSegment: 'var(--ti-color-surface)',
      tabColorSegment: 'var(--ti-color-selection)',
      tabTextColorSegment: 'var(--ti-color-text-secondary)',
      tabTextColorActiveSegment: 'var(--ti-color-text)',
      tabTextColorHoverSegment: 'var(--ti-color-text)',
    }"
    tab-style="width: var(--ti-control-height); height: var(--ti-control-height); padding: 0"
    pane-wrapper-style="display: none"
    role="group"
    :aria-label="label"
    @update:value="select"
  >
    <NTab
      v-for="option in (['light', 'dark', 'system'] as const)"
      :key="option"
      :name="option"
      @pointerdown="startDrag(option, $event)"
      @pointerenter="dragPointer === $event.pointerId && $event.buttons === 1 && select(option, $event.currentTarget as HTMLElement)"
    >
      <NButton
        text
        circle
        :aria-label="labels[option]"
        :title="labels[option]"
        :aria-pressed="selected === option"
        style="width: var(--ti-control-height); height: var(--ti-control-height); color: inherit"
      >
        <span class="icon" aria-hidden="true" :style="{ '--ti-icon': `url(${icons[option]})` }" />
      </NButton>
    </NTab>
  </NTabs>
</template>

<style scoped lang="scss">
.ti-theme-switch {
  width: max-content;
  flex: none;
  cursor: pointer;
  user-select: none;
  touch-action: pan-y;

  :deep(.n-tabs-rail) {
    padding: var(--ti-space-1);
    border: 1px solid var(--ti-color-border);
  }

  :deep(.n-tabs-rail:not(.transition-disabled) .n-tabs-capsule) {
    transition: transform var(--ti-motion-duration) var(--ti-motion-easing) !important;
  }

  .icon {
    display: block;
    width: 20px;
    height: 20px;
    background: currentColor;
    mask: var(--ti-icon) center / contain no-repeat;
    -webkit-mask: var(--ti-icon) center / contain no-repeat;
  }
}
</style>
