<script setup lang="ts">
import {
  NCheckbox,
  NCode,
  NDropdown,
  NProgress,
  NSwitch,
  palette,
  TiButton,
  TiInput,
  TiLogo,
  TiTag,
  TiThemeSwitch,
  themes,
  useTiMessage,
  useTiTheme,
} from "@teal-ink/vue";
import { computed, defineAsyncComponent, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { themeIcons } from "./assets/icons";
import { copyToClipboard } from "./utils/clipboard";
import { useTranslatedRef } from "./utils/composables";

const { t, locale } = useI18n({ useScope: "global" });
const ComponentWorkshop = defineAsyncComponent(
  () => import("./components/ComponentWorkshop.vue"),
);
const message = useTiMessage();
const { theme } = useTiTheme();
watchEffect(() =>
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themes[theme.value].canvas),
);
const note = useTranslatedRef(() => t("showcase.initialNote"));
const savedNote = useTranslatedRef(() => t("showcase.initialNote"));
const quiet = ref(true);
const tasks = ref([true, true, false]);
const copied = ref(false);
const usage = computed(() => `import { TiProvider, TiButton, dateEnUS, dateZhCN, enUS, zhCN } from '@teal-ink/vue'
import '@teal-ink/vue/style.css'

<TiProvider mode="system" :locale="${locale.value === "en" ? "enUS" : "zhCN"}" :date-locale="${locale.value === "en" ? "dateEnUS" : "dateZhCN"}">
  <TiButton variant="primary">${t("showcase.hello")}</TiButton>
</TiProvider>`);

async function copy(value: string) {
  if (await copyToClipboard(value)) {
    message.success(t("showcase.copied"));
    if (value === "bun run build:lib") copied.value = true;
  } else {
    message.error(t("showcase.copyError"));
  }
}

function saveNote() {
  if (!note.value.trim()) {
    message.warning(t("showcase.emptyNote"));
    return;
  }
  savedNote.value = note.value;
  message.success(t("showcase.saved"));
}
</script>

<template>
  <div id="top" class="showcase">
    <a href="#components" class="skip-link">{{ t("showcase.skip") }}</a>

    <header class="site-header">
      <a href="#top" class="brand" :aria-label="t('showcase.home')">
        <TiLogo :size="32" />
        <span class="brand-name">{{ t("showcase.brand") }}</span>
      </a>
      <nav class="main-nav" :aria-label="t('showcase.navigation')">
        <a href="#language">{{ t("showcase.design") }}</a>
        <a href="#components">{{ t("showcase.components") }}</a>
        <a href="#start">{{ t("showcase.start") }}</a>
      </nav>
      <div class="header-tools">
        <NDropdown
          trigger="click"
          :options="[
            { label: t('showcase.languages.chinese'), key: 'zh-CN' },
            { label: t('showcase.languages.english'), key: 'en' },
          ]"
          @select="locale = $event"
        >
          <TiButton
            variant="text"
            size="small"
            :aria-label="t('showcase.language')"
            :title="t('showcase.language')"
          >
            {{ t("showcase.languageCode") }}
          </TiButton>
        </NDropdown>
        <span class="tool-divider" aria-hidden="true" />
        <TiThemeSwitch
          :label="t('showcase.appearance')"
          :labels="{
            light: t('showcase.light'),
            dark: t('showcase.dark'),
            system: t('showcase.system'),
          }"
          :icons="themeIcons"
        />
      </div>
    </header>

    <main class="main-content">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <h1 id="hero-title">
            {{ t("showcase.heroTitle") }}<br /><span>{{ t("showcase.heroAccent") }}</span>
          </h1>
          <p class="hero-description">
            {{ t("showcase.heroDescription") }}
          </p>
          <div class="hero-actions">
            <TiButton tag="a" href="#components" variant="primary" size="large">
              {{ t("showcase.explore") }}<span class="button-arrow" aria-hidden="true">↗</span>
            </TiButton>
            <a href="#language" class="text-link">
              {{ t("showcase.meet") }}<span aria-hidden="true">→</span>
            </a>
          </div>
          <div class="hero-stack">
            <span>Vue 3</span>
            <i />
            <span>TypeScript</span>
            <i />
            <span>Naive UI</span>
            <span class="version">v0.1.0</span>
          </div>
        </div>

        <div class="preview-composition">
          <div class="workspace-preview" :aria-label="t('showcase.previewTitle')">
            <div class="workspace-toolbar">
              <div class="workspace-identity">
                <TiLogo :size="20" />
                <span>{{ t("showcase.previewTitle") }}</span>
                <span class="workspace-slash">/</span>
                <span class="muted">{{ t("showcase.previewPath") }}</span>
              </div>
              <span class="workspace-avatar" aria-hidden="true">M</span>
            </div>
            <div class="workspace-body">
              <div class="workspace-greeting">
                <h2>{{ t("showcase.previewGreeting") }}</h2>
                <span class="workspace-mark" aria-hidden="true">✳</span>
              </div>
              <div class="note-panel">
                <div class="panel-heading">
                  <h3 id="note-title">{{ t("showcase.note") }}</h3>
                  <TiTag
                    size="small"
                    class="status-tag"
                    :class="{ 'status-tag--unsaved': note !== savedNote }"
                  >
                    <span class="small-dot" />{{ t(note === savedNote ? "showcase.saved" : "showcase.unsaved") }}
                  </TiTag>
                </div>
                <TiInput
                  v-model="note"
                  type="textarea"
                  aria-labelledby="note-title"
                  :placeholder="t('showcase.notePlaceholder')"
                  :maxlength="80"
                  class="note-input"
                  @keydown.ctrl.enter.prevent="saveNote"
                  @keydown.meta.enter.prevent="saveNote"
                />
                <div class="note-footer">
                  <span class="muted note-count">{{ note.length }} / 80</span>
                  <TiButton variant="primary" size="small" @click="saveNote">
                    {{ t("showcase.save") }}<span class="button-arrow" aria-hidden="true">↗</span>
                  </TiButton>
                </div>
              </div>
              <div class="rhythm-panel">
                <div class="panel-heading">
                  <h3>{{ t("showcase.rhythm") }}</h3>
                  <span class="task-count">
                    {{ tasks.filter(Boolean).length }} <span class="muted">/ {{ tasks.length }}</span>
                  </span>
                </div>
                <NProgress
                  type="line"
                  :percentage="Math.round((tasks.filter(Boolean).length / tasks.length) * 100)"
                  :show-indicator="false"
                  :height="3"
                  :color="palette.secondary"
                />
                <div class="task-list">
                  <NCheckbox
                    v-for="(label, index) in [
                      t('showcase.taskSpace'),
                      t('showcase.taskFocus'),
                      t('showcase.taskPolish'),
                    ]"
                    :key="label"
                    v-model:checked="tasks[index]"
                    :theme-overrides="{
                      colorChecked: palette.secondary,
                      borderChecked: `1px solid ${palette.secondary}`,
                      borderFocus: `1px solid ${palette.secondary}`,
                      checkMarkColor: palette.ink,
                    }"
                  >
                    {{ label }}
                  </NCheckbox>
                </div>
              </div>
            </div>
            <div class="workspace-footer">
              <span>{{ t("showcase.previewOnly") }}</span>
              <label for="focus-toggle" class="focus-toggle">
                {{ t("showcase.focus") }}<NSwitch
                  id="focus-toggle"
                  v-model:value="quiet"
                  size="small"
                  :aria-label="t('showcase.focus')"
                  :theme-overrides="{ railColorActive: palette.secondary }"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section id="language" class="palette-section" aria-labelledby="palette-title">
        <div class="section-intro">
          <div class="eyebrow">
            <span class="section-index">01</span>{{ t("showcase.design") }}
          </div>
          <h2 id="palette-title" class="section-title">
            {{ t("showcase.paletteTitle") }}<br />{{ t("showcase.paletteLead") }}
          </h2>
          <div class="color-roles">
            <div>
              <span class="role-dot primary-dot" />
              <span>{{ t("showcase.primaryRole") }}</span>
            </div>
            <div>
              <span class="role-dot secondary-dot" />
              <span>{{ t("showcase.secondaryRole") }}</span>
            </div>
          </div>
        </div>

        <div class="color-sheet">
          <div
            class="composition-bar"
            :aria-label="t('showcase.compositionLabel')"
            role="img"
          >
            <span
              v-for="color in ([
                { key: 'paper', share: 85 },
                { key: 'sand', share: 10 },
                { key: 'primary', share: 3 },
                { key: 'secondary', share: 2 },
              ] as const)"
              :key="color.key"
              :style="{ flex: color.share, backgroundColor: palette[color.key] }"
            />
          </div>
          <div class="composition-legend">
            <span>{{ t("showcase.compositionBase") }} 85%</span>
            <span>{{ t("showcase.compositionStructure") }} 10%</span>
            <span>{{ t("showcase.compositionPrimary") }} 3%</span>
            <span>{{ t("showcase.compositionSecondary") }} 2%</span>
          </div>
          <div class="neutral-tokens">
            <button
              v-for="key in (['paper', 'ivory', 'sand', 'charcoal', 'ink'] as const)"
              :key="key"
              type="button"
              class="neutral-token"
              :aria-label="
                t('showcase.copyColor', {
                  color: t(`showcase.colors.${key}`),
                  hex: palette[key].toUpperCase(),
                })
              "
              @click="copy(palette[key].toUpperCase())"
            >
              <span class="neutral-chip" :style="{ backgroundColor: palette[key] }" />
              <span class="token-name">{{ t(`showcase.colors.${key}`) }}</span>
              <span class="token-hex">{{ palette[key].toUpperCase() }}</span>
            </button>
          </div>
          <div class="accent-tokens">
            <button
              v-for="key in (['primary', 'secondary'] as const)"
              :key="key"
              type="button"
              class="accent-token"
              :aria-label="
                t('showcase.copyColor', {
                  color: t(`showcase.colors.${key}`),
                  hex: palette[key].toUpperCase(),
                })
              "
              @click="copy(palette[key].toUpperCase())"
            >
              <span class="accent-chip" :style="{ backgroundColor: palette[key] }" />
              <span class="accent-token-copy">
                <span class="token-name">
                  {{ t(`showcase.colors.${key}`) }}<span class="token-role">{{
                    t(`showcase.${key}Label`)
                  }}</span>
                </span>
                <span class="token-hex">{{ palette[key].toUpperCase() }}</span>
              </span>
              <svg
                class="copy-icon"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                aria-hidden="true"
              >
                <rect x="7" y="7" width="9" height="10" rx="2" />
                <path d="M12 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h2" />
              </svg>
            </button>
          </div>
          <p class="color-sheet-note">
            {{ t("showcase.paletteHint") }}<span>{{ t("showcase.compositionHint") }}</span>
          </p>
        </div>
      </section>

      <ComponentWorkshop />

      <section id="start" class="start-section" aria-labelledby="start-title">
        <div class="section-intro">
          <div class="eyebrow">
            <span class="section-index">03</span>{{ t("showcase.startOverline") }}
          </div>
          <h2 id="start-title" class="section-title">{{ t("showcase.startTitle") }}</h2>
          <p class="section-description">{{ t("showcase.startDescription") }}</p>
        </div>
        <div class="install-panel">
          <div class="install-heading">
            <span class="eyebrow">QUICK START</span>
            <span class="token-hex">Vue 3 + TypeScript</span>
          </div>
          <div class="install-command">
            <code><span class="muted">$</span> bun run build:lib</code>
            <TiButton
              variant="text"
              size="small"
              :aria-label="t(copied ? 'showcase.copyAgain' : 'showcase.copyCommand')"
              @click="copy('bun run build:lib')"
            >
              {{ t(copied ? "showcase.copied" : "showcase.copy") }}
            </TiButton>
          </div>
          <NCode :code="usage" language="html" class="usage-code" />
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <TiLogo :size="24" />
        <span>{{ t("showcase.brand") }}</span>
      </div>
      <a href="#top" class="footer-top">{{ t("showcase.top") }} ↑</a>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.showcase {
  --sage-soft: color-mix(in srgb, var(--ti-color-secondary) 13%, var(--ti-color-raised));
  --sage-text: color-mix(in srgb, var(--ti-color-secondary) 55%, var(--ti-color-text));
  width: min(1200px, calc(100% - 96px));
  margin-inline: auto;
  color: var(--ti-color-text);
  overflow-wrap: anywhere;
}
.showcase :deep(.n-h), .showcase :deep(.n-p), h1, h2, h3, p { margin: 0; }
a:not(.n-button) { color: inherit; text-decoration: none; }
button, a { -webkit-tap-highlight-color: transparent; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--ti-color-focus); outline-offset: 5px; }
.site-header, .brand, .main-nav, .header-tools, .hero-actions, .hero-stack, .workspace-toolbar, .workspace-identity, .workspace-greeting, .panel-heading, .note-footer, .workspace-footer, .focus-toggle, .composition-legend, .accent-token, .install-heading, .install-command, .site-footer, .footer-brand { display: flex; align-items: center; }
.site-header { min-height: 100px; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--ti-color-border); }
.brand, .workspace-identity, .footer-brand { --ti-logo-accent: var(--ti-palette-primary); }
.brand { gap: 12px; flex-shrink: 0; }
.brand-name { font: 500 23px var(--ti-font-serif); letter-spacing: 0.04em; }
.main-nav { gap: 28px; font-size: 13px; color: var(--ti-color-text-secondary); }
.main-nav a { padding-block: 12px; transition: color var(--ti-motion-duration); }
.main-nav a:hover, .text-link:hover, .footer-top:hover { color: var(--ti-color-accent-text); }
.header-tools { gap: 12px; }
.header-tools :deep(.ti-theme-switch) { --ti-control-height: 32px; }
.tool-divider { height: 16px; width: 1px; background: var(--ti-color-border); }
.main-content { display: flex; flex-direction: column; gap: 88px; padding-block: 64px 80px; }
.hero { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); align-items: center; gap: 64px; }
.eyebrow { display: flex; align-items: center; gap: 10px; font-size: 11px; letter-spacing: 0.12em; color: var(--ti-color-text-secondary); }
.small-dot { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.hero h1 { font: 450 clamp(44px, 4.3vw, 62px) / 1.35 var(--ti-font-serif); letter-spacing: -0.045em; }
.hero h1 > span {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--ti-color-primary);
  text-decoration-thickness: 3px;
  text-underline-offset: 0.17em;
  text-decoration-skip-ink: none;
}
.hero-description { max-width: 420px; margin-top: 25px; font-size: 14px; line-height: 1.95; color: var(--ti-color-text-secondary); text-wrap: pretty; }
.hero-actions { flex-wrap: wrap; gap: 26px; margin-top: 30px; }
.hero-actions :deep(.n-button) { padding-inline: 22px; }
.button-arrow { margin-left: 16px; font: 18px var(--ti-font-sans); }
.text-link { display: inline-flex; align-items: center; gap: 14px; font-size: 13px; white-space: nowrap; transition: color var(--ti-motion-duration); }
.hero-stack { flex-wrap: wrap; gap: 12px; margin-top: 28px; font: 10px var(--ti-font-mono); color: var(--ti-color-text-secondary); }
.hero-stack i { width: 2px; height: 2px; border-radius: 50%; background: var(--ti-color-border-strong); }
.version { margin-left: 4px; padding: 3px 6px; border: 1px solid var(--ti-color-border); border-radius: 4px; font-size: 9px; }
.preview-composition { min-width: 0; }
.workspace-preview { overflow: hidden; border: 1px solid var(--ti-color-border); border-radius: 14px; background: var(--ti-color-surface); box-shadow: 0 20px 60px rgb(0 0 0 / 4%), 0 2px 5px rgb(0 0 0 / 2%); }
.workspace-toolbar { justify-content: space-between; min-height: 52px; gap: 10px; padding: 0 22px; border-bottom: 1px solid var(--ti-color-border); background: var(--ti-color-raised); }
.workspace-identity { gap: 9px; font-size: 11px; }
.workspace-slash { margin-inline: 3px; color: var(--ti-color-border-strong); }
.workspace-avatar { display: grid; place-items: center; width: 24px; height: 24px; background: var(--sage-soft); border: 1px solid color-mix(in srgb, var(--ti-color-secondary) 30%, transparent); color: var(--sage-text); border-radius: 50%; font-size: 10px; }
.muted { color: var(--ti-color-text-secondary); }
.workspace-body { padding: 22px; }
.workspace-greeting { justify-content: space-between; margin-bottom: 20px; }
.workspace-greeting h2 { font: 450 22px / 1.5 var(--ti-font-serif); }
.workspace-mark { color: var(--ti-color-secondary); font-size: 37px; line-height: 1; margin-right: 2px; }
.note-panel { padding: 18px; border: 1px solid var(--ti-color-border); border-radius: 9px; background: var(--ti-color-raised); }
.panel-heading { justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.panel-heading h3 { font-weight: 500; font-size: 12px; }
.status-tag { --n-color: var(--sage-soft) !important; --n-border: 1px solid transparent !important; --n-text-color: var(--sage-text) !important; font-size: 10px !important; height: 22px; padding: 0 8px; }
.status-tag :deep(.n-tag__content) { display: flex; align-items: center; gap: 5px; }
.status-tag--unsaved { --n-color: var(--ti-color-selection) !important; --n-text-color: var(--ti-color-accent-text) !important; }
.note-input :deep(.n-input) { --n-border: 1px solid var(--ti-color-border) !important; --n-font-size: 12px !important; --n-color: var(--ti-color-canvas) !important; }
.note-input :deep(textarea) { min-height: 54px !important; line-height: 1.8 !important; }
.note-footer { justify-content: space-between; margin-top: 12px; }
.note-count { font: 9px var(--ti-font-mono); }
.note-footer :deep(.n-button) { font-size: 11px; padding-inline: 12px; }
.note-footer .button-arrow { margin-left: 9px; font-size: 14px; }
.rhythm-panel { margin-top: 18px; }
.rhythm-panel .panel-heading { margin-bottom: 9px; }
.task-count { font: 10px var(--ti-font-mono); }
.task-list { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 12px; }
.task-list :deep(.n-checkbox) { --n-font-size: 11px !important; --n-size: 13px !important; }
.task-list :deep(.n-checkbox__label) { padding-left: 6px; color: var(--ti-color-text-secondary); }
.workspace-footer { justify-content: space-between; gap: 12px; border-top: 1px solid var(--ti-color-border); padding: 11px 22px; background: var(--ti-color-raised); font-size: 10px; color: var(--ti-color-text-secondary); }
.focus-toggle { gap: 8px; cursor: pointer; }
.palette-section, .start-section { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr); gap: 72px; align-items: start; }
.section-index { font: 10px var(--ti-font-mono); color: var(--ti-color-text-secondary); padding-right: 12px; border-right: 1px solid var(--ti-color-border); }
.section-intro .section-title { margin-top: 22px; font: 450 clamp(26px, 2.5vw, 34px) / 1.55 var(--ti-font-serif); letter-spacing: -0.02em; text-wrap: pretty; }
.section-description { margin-top: 18px; font-size: 13px; line-height: 1.95; color: var(--ti-color-text-secondary); max-width: 330px; }
.color-roles { display: grid; gap: 12px; margin-top: 24px; font-size: 12px; }
.color-roles > div { display: flex; align-items: center; gap: 10px; }
.role-dot { width: 7px; height: 7px; border-radius: 2px; }
.primary-dot { background: var(--ti-color-primary); }
.secondary-dot { background: var(--ti-color-secondary); }
.color-sheet { padding: 25px 28px 20px; border: 1px solid var(--ti-color-border); border-radius: 12px; background: var(--ti-color-raised); min-width: 0; }
.composition-bar { display: flex; height: 68px; overflow: hidden; border: 1px solid var(--ti-color-border); border-radius: 5px; }
.composition-bar > span { min-width: 0; }
.composition-legend { justify-content: space-between; flex-wrap: wrap; gap: 8px 12px; margin-top: 10px; font-size: 9px; color: var(--ti-color-text-secondary); }
.neutral-tokens { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; padding-block: 26px 22px; border-bottom: 1px solid var(--ti-color-border); }
.neutral-token, .accent-token { appearance: none; border: 0; font-family: inherit; cursor: pointer; color: var(--ti-color-text); background: transparent; text-align: left; border-radius: 5px; transition: background var(--ti-motion-duration); }
.neutral-token:hover, .accent-token:hover { background: var(--ti-color-surface); }
.neutral-token { display: flex; flex-direction: column; align-items: start; gap: 5px; padding: 6px; margin: -6px; }
.neutral-chip { width: 24px; height: 24px; margin-bottom: 4px; border: 1px solid #dedcd28c; border-radius: 50%; }
.token-name { font-size: 11px; }
.token-hex { font: 9px var(--ti-font-mono); color: var(--ti-color-text-secondary); white-space: nowrap; }
.accent-tokens { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; padding-block: 22px; }
.accent-token { gap: 12px; padding: 8px; margin: -8px; min-width: 0; }
.accent-chip { width: 30px; height: 36px; flex-shrink: 0; border-radius: 4px; }
.accent-token-copy { display: grid; gap: 5px; min-width: 0; }
.token-role { margin-left: 8px; font-size: 9px; color: var(--ti-color-text-secondary); }
.copy-icon { width: 15px; height: 15px; color: var(--ti-color-text-secondary); margin-left: auto; flex-shrink: 0; opacity: 0.65; }
.color-sheet-note { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 9px; color: var(--ti-color-text-secondary); }
.start-section { border-top: 1px solid var(--ti-color-border); padding-top: 64px; }
.start-section .section-title { white-space: pre-line; }
.install-panel { border: 1px solid var(--ti-color-border); background: var(--ti-color-raised); border-radius: 12px; min-width: 0; overflow: hidden; }
.install-heading { justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid var(--ti-color-border); }
.install-heading .eyebrow { font-size: 9px; }
.install-command { justify-content: space-between; gap: 16px; padding: 12px 24px; background: var(--ti-color-surface); border-bottom: 1px solid var(--ti-color-border); }
.install-command code { font: 11px var(--ti-font-mono); }
.install-command code .muted { margin-right: 8px; }
.install-command :deep(.n-button) { font-size: 10px; }
.usage-code { display: block; max-width: 100%; box-sizing: border-box; padding: 22px 24px; overflow: auto; font-size: 11px; line-height: 1.9; }
.site-footer { justify-content: space-between; gap: 24px; padding-block: 28px; border-top: 1px solid var(--ti-color-border); }
.footer-brand { gap: 10px; font: 500 16px var(--ti-font-serif); }
a.footer-top { font-size: 10px; color: var(--ti-color-text-secondary); }
.skip-link { position: fixed; top: -80px; left: 20px; z-index: 10; padding: 8px 16px; background: var(--ti-color-raised); border: 1px solid var(--ti-color-border); border-radius: 6px; }
.skip-link:focus { top: 12px; }
@media (max-width: 1100px) {
  .showcase { width: calc(100% - 64px); }
  .main-nav { gap: 20px; }
  .hero { gap: 36px; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); }
  .hero h1 { font-size: 49px; }
  .hero-actions { gap: 18px; }
  .hero-actions :deep(.n-button) { padding-inline: 18px; }
  .task-list { gap: 8px 12px; }
  .palette-section, .start-section { gap: 40px; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); }
  .color-sheet { padding-inline: 22px; }
  .accent-tokens { gap: 16px; }
  .accent-token { gap: 8px; }
  .token-role { display: block; margin-left: 0; margin-top: 3px; }
  .copy-icon { display: none; }
}
@media (max-width: 820px) {
  .site-header { min-height: 88px; flex-wrap: wrap; gap: 16px; padding-block: 20px 14px; }
  .main-nav { order: 3; width: 100%; justify-content: center; gap: 40px; border-top: 1px solid var(--ti-color-border); padding-top: 6px; }
  .main-nav a { padding-block: 10px 2px; font-size: 12px; }
  .main-content { padding-block: 46px 56px; gap: 64px; }
  .hero { grid-template-columns: 1fr; gap: 42px; }
  .hero-copy { max-width: 540px; }
  .hero h1 { font-size: 55px; }
  .hero-description { max-width: none; }
  .preview-composition { width: 100%; max-width: 600px; margin-inline: auto; }
  .palette-section, .start-section { grid-template-columns: 1fr; gap: 28px; }
  .section-description { max-width: 500px; }
  .color-roles { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-top: 18px; }
  .color-sheet { padding: 24px; }
  .token-role { display: inline; margin: 0 0 0 8px; }
  .copy-icon { display: block; }
  .start-section { padding-top: 44px; }
  .site-footer { padding-block: 22px; }
}
@media (max-width: 480px) {
  .showcase { width: calc(100% - 40px); }
  .brand-name { font-size: 21px; }
  .brand { gap: 8px; }
  .brand :deep(svg) { width: 28px; height: 28px; }
  .header-tools { gap: 7px; }
  .tool-divider { display: none; }
  .main-content { gap: 52px; padding-top: 32px; }
  .hero h1 { font-size: 46px; }
  .hero-description { font-size: 12px; margin-top: 18px; }
  .hero-actions { margin-top: 24px; }
  .hero-stack { gap: 9px; margin-top: 22px; font-size: 9px; }
  .hero-actions .text-link { font-size: 12px; }
  .workspace-toolbar { padding-inline: 16px; }
  .workspace-body { padding: 18px 16px; }
  .note-panel { padding: 14px; }
  .workspace-footer { padding-inline: 16px; }
  .workspace-greeting h2 { font-size: 21px; }
  .workspace-identity { gap: 7px; font-size: 10px; }
  .task-list { flex-direction: column; gap: 9px; }
  .section-intro .section-title { margin-top: 16px; font-size: 28px; }
  .section-description { font-size: 12px; margin-top: 14px; }
  .color-roles { gap: 10px; font-size: 11px; flex-direction: column; }
  .color-sheet { padding: 20px 16px 16px; }
  .composition-bar { height: 56px; }
  .composition-legend { display: grid; grid-template-columns: repeat(2, 1fr); }
  .neutral-tokens { column-gap: 5px; }
  .neutral-chip { width: 22px; height: 22px; }
  .neutral-token .token-name { font-size: 10px; }
  .neutral-token .token-hex { font-size: 7px; letter-spacing: -0.04em; }
  .accent-tokens { gap: 16px; }
  .accent-chip { width: 22px; height: 32px; }
  .accent-token-copy .token-name { font-size: 10px; }
  .token-role { display: block; margin: 3px 0 0; font-size: 9px; }
  .copy-icon { display: none; }
  .color-sheet-note { font-size: 8px; }
  .install-heading, .install-command { padding-inline: 16px; }
  .usage-code { padding-inline: 16px; font-size: 10px; }
}
@media (max-width: 360px) {
  .site-header { gap: 12px; }
  .brand { gap: 6px; }
  .brand-name { font-size: 19px; }
  .header-tools :deep(.ti-theme-switch) { --ti-control-height: 28px; }
  .hero h1:lang(en) { font-size: 39px; }
}
</style>
