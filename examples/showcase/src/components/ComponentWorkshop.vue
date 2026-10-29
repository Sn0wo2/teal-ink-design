<script setup lang="ts">
import * as library from '@teal-ink/vue'
import {
  NCode,
  NDataTable,
  NElement,
  NEmpty,
  NFlex,
  NFormItem,
  NH2,
  NH3,
  NMenu,
  NScrollbar,
  NSelect,
  NTabPane,
  NTabs,
  NText,
  TiButton,
  TiInput,
  TiTag,
  useTiTheme,
} from '@teal-ink/vue'
import { type Component, computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { copyToClipboard } from '../utils/clipboard'
import { useTabButtonProps } from '../utils/composables'

const groups = ['teal', 'inputs', 'display', 'feedback', 'layout'] as const
const exampleSuffix = /\.example\.vue$/
const privateProp = /^(private|internal|builtinTheme)/
const eventProp = /^on[A-Z]/

const { t, locale } = useI18n({ useScope: 'global' })
const exampleSources = import.meta.glob<string>('../examples/*/*.example.vue', { eager: true, query: '?raw', import: 'default' })
const examples = Object.entries(import.meta.glob<Component>('../examples/*/*.example.vue', { eager: true, import: 'default' }))
  .map(([path, example]) => {
    const [directory, filename] = path.split('/').slice(-2)
    if (!(directory && filename)) throw new Error(`Invalid example path: ${path}`)
    const name = filename.replace(exampleSuffix, '')
    const source = exampleSources[path]
    if (source === undefined) throw new Error(`Missing example source: ${path}`)
    return {
      name,
      example,
      source,
      group: directory as typeof groups[number],
      component: library[name as keyof typeof library] as Component,
    }
  }).sort((a, b) => a.name.localeCompare(b.name))

const initialName = new URLSearchParams(window.location.search).get('component')
const selectedName = ref(examples.find((entry) => entry.name === initialName)?.name ?? 'TiButton')
const selectedEntry = computed(() => {
  const entry = examples.find((entry) => entry.name === selectedName.value)
  if (!entry) throw new Error(`Unknown component example: ${selectedName.value}`)
  return entry
})
const searchText = ref('')
const categoryFilter = ref('all')
const activeTab = ref<'preview' | 'source' | 'api' | 'import'>('preview')
const tabProps = useTabButtonProps(activeTab)
const resetKey = ref(0)
const copyMessage = ref<'copied' | 'copyFailed' | ''>('')
const locationEvents = new AbortController()
const { theme } = useTiTheme()
const categoryOptions = computed(() => [
  { label: t('workshop.allCategories', { count: examples.length }), value: 'all' },
  ...groups.map((group) => ({
    label: t('workshop.groupCount', {
      label: t(`workshop.groups.${group}`),
      count: examples.filter((entry) => entry.group === group).length,
    }),
    value: group,
  })),
])
const filteredEntries = computed(() => {
  const query = searchText.value.trim().toLocaleLowerCase(locale.value)
  return examples.filter((entry) => (!query || `${entry.name} ${t(`workshop.groups.${entry.group}`)}`.toLocaleLowerCase().includes(query))
    && (categoryFilter.value === 'all' || entry.group === categoryFilter.value))
})
const menuOptions = computed(() => groups.map((group) => {
  const entries = filteredEntries.value.filter((entry) => entry.group === group)
  return {
    type: 'group' as const,
    key: group,
    label: t('workshop.groupCount', { label: t(`workshop.groups.${group}`), count: entries.length }),
    children: entries.map(({ name }) => ({ label: name, key: name })),
  }
}).filter((group) => group.children.length))
const previewFrameSrc = computed(() => {
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = ''
  url.searchParams.set('preview', selectedName.value)
  url.searchParams.set('theme', theme.value)
  url.searchParams.set('lang', locale.value)
  return `${url.pathname}${url.search}`
})
const propRows = computed(() => Object.entries((selectedEntry.value.component as { props?: Record<string, unknown> }).props ?? {})
  .filter(([name]) => !privateProp.test(name)).map(([name, value]) => {
    const prop = value && typeof value === 'object' ? value as { type?: unknown; default?: unknown } : { type: value }
    return {
      name,
      category: t(eventProp.test(name) ? 'workshop.events' : 'workshop.props'),
      type: [prop.type].flat().filter((type): type is { name: string } => typeof type === 'function').map((type) => type.name.toLowerCase()).join(' | ') || t('workshop.unknownType'),
      defaultValue: typeof prop.default === 'function' ? t('workshop.factoryDefault') : String(prop.default ?? '—'),
    }
  }))
const importCode = computed(() => `import { ${selectedName.value === 'TiProvider' ? 'TiProvider' : `${selectedName.value}, TiProvider`} } from '@teal-ink/vue'\nimport '@teal-ink/vue/style.css'`)

function selectComponent(name: string) {
  if (!examples.some((entry) => entry.name === name)) return
  selectedName.value = name
  activeTab.value = 'preview'
  copyMessage.value = ''
  const url = new URL(window.location.href)
  url.searchParams.set('component', name)
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
}

onMounted(async () => {
  window.addEventListener('popstate', () => {
    const name = new URLSearchParams(window.location.search).get('component')
    selectedName.value = examples.find((entry) => entry.name === name)?.name ?? 'TiButton'
    activeTab.value = 'preview'
    copyMessage.value = ''
  }, { signal: locationEvents.signal })
  if (examples.some((entry) => entry.name === initialName)) {
    await nextTick()
    document.getElementById('components')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start',
    })
  }
})
onBeforeUnmount(() => locationEvents.abort())
</script>

<template>
  <NFlex id="components" vertical :size="24" class="workshop" role="region" aria-labelledby="workshop-title">
    <NFlex vertical :size="10" class="workshop__intro">
      <NFlex align="center" :size="8" class="workshop__eyebrow">
        <span class="workshop__index" aria-hidden="true">02</span>
        <NText depth="3" class="overline">{{ t('workshop.overline') }}</NText>
      </NFlex>
      <NH2 id="workshop-title" class="section-title">{{ t('workshop.heading') }}</NH2>
    </NFlex>

    <div class="workbench">
      <aside class="directory" :aria-label="t('workshop.directoryAndFilters')">
        <header class="directory__header">
          <NText depth="3" class="directory__title">{{ t('workshop.directory') }}</NText>
          <TiTag size="small" :round="false">{{ t('workshop.filteredCount', { filtered: filteredEntries.length, total: examples.length }) }}</TiTag>
        </header>
        <NFlex vertical :size="16" class="directory__filters">
          <TiInput id="component-search" v-model="searchText" :label="t('workshop.searchComponents')" :placeholder="t('workshop.nameOrCategory')" clearable class="directory__search" />
          <NFormItem :label="t('workshop.exampleCategory')" :show-feedback="false">
            <NSelect v-model:value="categoryFilter" :aria-label="t('workshop.exampleCategory')" :options="categoryOptions" />
          </NFormItem>
          <NFormItem :label="t('workshop.quickSelect')" :show-feedback="false" class="directory__mobile-picker">
            <NSelect :value="selectedName" :aria-label="t('workshop.quickSelect')" :options="filteredEntries.map(({ name }) => ({ label: name, value: name }))" filterable @update:value="selectComponent" />
          </NFormItem>
          <NFlex v-if="filteredEntries.length" class="directory__list" :wrap="false" :aria-label="t('workshop.availableComponents')">
            <NScrollbar style="height: 360px">
              <NMenu :value="selectedName" :options="menuOptions" :indent="8" :root-indent="10"
                :node-props="option => ({ tabindex: option.type === 'group' ? undefined : 0, 'data-component': String(option.key) })"
                @update:value="selectComponent" @keydown="(event: KeyboardEvent) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return
                   const name = (event.target as HTMLElement).getAttribute('data-component')
                  if (!name) return
                  event.preventDefault()
                  selectComponent(name)
                }" />
            </NScrollbar>
          </NFlex>
          <NEmpty v-else :description="t('workshop.noMatchingComponents')" class="directory__empty" aria-live="polite">
            <template #extra><TiButton @click="searchText = ''; categoryFilter = 'all'">{{ t('workshop.clearFilters') }}</TiButton></template>
          </NEmpty>
        </NFlex>
      </aside>

      <section class="stage" :aria-label="t('workshop.previewAndApi')">
        <header class="stage__header">
          <NFlex vertical :size="4" class="stage__heading">
            <NText depth="3" class="stage__group">{{ t(`workshop.groups.${selectedEntry.group}`) }}</NText>
            <NH3 class="stage__title">{{ selectedEntry.name }}</NH3>
          </NFlex>
          <TiButton size="small" @click="resetKey++; activeTab = 'preview'; copyMessage = ''">{{ t('workshop.resetExample') }}</TiButton>
        </header>
        <NTabs v-model:value="activeTab" type="line" class="stage__tabs">
          <NTabPane name="preview" :tab="t('workshop.preview')" :tab-props="tabProps('preview')">
            <div class="stage__preview">
              <NElement v-if="['NGlobalStyle', 'NThemeEditor'].includes(selectedName)" :key="resetKey" tag="iframe" :src="previewFrameSrc" :title="t('workshop.isolatedPreview', { name: selectedEntry.name })" class="preview-frame" />
              <NFlex v-else :key="`${selectedName}-${resetKey}`" vertical :data-ti-example="selectedName" class="stage__example">
                <component :is="selectedEntry.example" />
              </NFlex>
            </div>
          </NTabPane>
          <NTabPane name="source" :tab="t('workshop.sourceTab')" :tab-props="tabProps('source')">
            <NCode :code="selectedEntry.source" language="html" show-line-numbers class="stage__source stage__code" />
          </NTabPane>
          <NTabPane name="api" :tab="t('workshop.apiTab')" :tab-props="tabProps('api')">
            <NFlex vertical :size="16" class="stage__api">
              <NText depth="3">{{ t('workshop.apiExplanation') }}</NText>
              <NDataTable v-if="propRows.length" :columns="[
                { title: t('workshop.name'), key: 'name', width: 180 },
                { title: t('workshop.category'), key: 'category', width: 80 },
                { title: t('workshop.type'), key: 'type', width: 180 },
                { title: t('workshop.defaultValue'), key: 'defaultValue', width: 160 },
              ]" :data="propRows" :row-key="row => row.name" :scroll-x="600" :max-height="480" size="small" />
              <NEmpty v-else :description="t('workshop.noRuntimeProps')" />
            </NFlex>
          </NTabPane>
          <NTabPane name="import" :tab="t('workshop.importTab')" :tab-props="tabProps('import')">
            <NFlex vertical :size="16" class="stage__import">
              <NFlex justify="space-between" align="center" :wrap="true">
                <NText strong>{{ t('workshop.onDemandImport') }}</NText>
                <TiButton size="small" @click="copyToClipboard(importCode).then(success => { copyMessage = success ? 'copied' : 'copyFailed' })">{{ t('workshop.copyCode') }}</TiButton>
              </NFlex>
              <NCode :code="importCode" language="javascript" class="stage__code" />
              <NText depth="3">{{ t('workshop.providerExplanation') }}</NText>
              <NText type="primary" aria-live="polite">{{ copyMessage ? t(`workshop.${copyMessage}`) : '' }}</NText>
            </NFlex>
          </NTabPane>
        </NTabs>
      </section>
    </div>
  </NFlex>
</template>

<style scoped lang="scss">
.workshop {
  width: 100%;
  min-width: 0;
  container-type: inline-size;
}
.workshop__eyebrow { align-items: center; gap: 10px !important; }
.workshop__index {
  color: var(--ti-color-text-secondary);
  font: 10px var(--ti-font-mono);
  padding-right: 12px;
  border-right: 1px solid var(--ti-color-border);
}
.workshop__intro :deep(.overline) {
  font-size: var(--ti-font-size-caption);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.section-title {
  margin: 0;
  font: 400 clamp(26px, 2.6vw, 34px) / 1.25 var(--ti-font-serif);
}
.workbench {
  display: grid;
  grid-template-columns: minmax(220px, 0.76fr) minmax(0, 2.3fr);
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--ti-color-border);
  border-radius: var(--ti-radius-display);
  background: var(--ti-color-raised);
}
.directory {
  min-width: 0;
  padding: var(--ti-space-5);
  border-right: 1px solid var(--ti-color-border);
  background: var(--ti-color-surface);
}
.directory__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ti-space-2);
  padding-bottom: var(--ti-space-4);
  border-bottom: 1px solid var(--ti-color-border);
}
.directory__title {
  font-size: var(--ti-font-size-caption);
  letter-spacing: 0.09em;
  text-transform: uppercase;
}
.directory__filters { padding-top: var(--ti-space-4); }
.directory__filters :deep(.ti-input__label),
.directory__filters :deep(.n-form-item-label) {
  color: var(--ti-color-text-secondary);
  font-size: var(--ti-font-size-caption);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.directory__filters :deep(.n-form-item) { margin-bottom: 0; }
.directory__mobile-picker { display: none; }
.directory__list { min-width: 0; }
.directory__list :deep(.n-menu-item-content) { min-width: 0; }
.directory__list :deep(.n-menu-item-content-header) {
  overflow: hidden;
  font-family: var(--ti-font-mono);
  text-overflow: ellipsis;
}
.directory__empty { padding-block: var(--ti-space-4); }
.stage {
  min-width: 0;
  padding: var(--ti-space-5);
  background: var(--ti-color-raised);
}
.stage__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ti-space-4);
  min-width: 0;
  padding-bottom: var(--ti-space-4);
  border-bottom: 1px solid var(--ti-color-border);
}
.stage__heading { min-width: 0; }
.stage__group {
  font-size: var(--ti-font-size-caption);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.stage__title {
  overflow-wrap: anywhere;
  margin: 0;
  font: 400 clamp(20px, 2vw, 26px) / 1.3 var(--ti-font-mono);
}
.stage__tabs { min-width: 0; margin-top: var(--ti-space-2); }
.stage__tabs :deep(.n-tabs-nav) { min-width: 0; }
.stage__tabs :deep(.n-tab-pane) { min-width: 0; }
.stage__preview {
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 320px;
  overflow: auto;
  padding: clamp(var(--ti-space-3), 3vw, var(--ti-space-6));
  border: 1px solid var(--ti-color-border);
  border-radius: var(--ti-radius-control);
  background: var(--ti-color-canvas);
}
.stage__example { width: 100%; min-width: 0; }
.stage__source,
.stage__api,
.stage__import { min-width: 0; padding-top: var(--ti-space-3); }
.stage__code { max-width: 100%; max-height: 560px; overflow: auto; }
.preview-frame {
  width: 100%;
  min-width: 0;
  min-height: 520px;
  border: 1px solid var(--ti-color-border);
  border-radius: var(--ti-radius-control);
  background: var(--ti-color-canvas);
}
@container (max-width: 760px) {
  .workbench { grid-template-columns: minmax(0, 1fr); }
  .directory {
    padding: var(--ti-space-4);
    border-right: 0;
    border-bottom: 1px solid var(--ti-color-border);
  }
  .directory__mobile-picker { display: block; }
  .directory__list { display: none !important; }
  .stage { padding: var(--ti-space-4); }
}
@media (max-width: 520px) {
  .workshop { gap: var(--ti-space-4); }
  .workbench { border-radius: var(--ti-radius-control); }
  .stage__header { align-items: flex-start; gap: var(--ti-space-2); }
  .stage__header :deep(.n-button) { flex: none; }
  .stage__title { font-size: 18px; }
  .stage__preview { min-height: 280px; padding: var(--ti-space-3); }
  .preview-frame { min-height: 480px; }
  .stage__tabs :deep(.n-tabs-nav-scroll-content) { min-width: max-content; }
}
</style>
