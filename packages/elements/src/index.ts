import {
  dateEnUS,
  dateZhCN,
  enUS,
  type NDateLocale,
  type NLocale,
  TiButton,
  TiCard,
  type TiColorMode,
  TiInput,
  TiLogo,
  TiProvider,
  TiTag,
  type TiThemeContext,
  TiThemeSwitch,
  zhCN,
} from "@teal-ink/vue"
import darkIcon from "@teal-ink/vue/icons/theme-dark.svg?url"
import lightIcon from "@teal-ink/vue/icons/theme-light.svg?url"
import systemIcon from "@teal-ink/vue/icons/theme-system.svg?url"
import {
  computed,
  defineComponent,
  defineCustomElement,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  type PropType,
  type Ref,
  ref,
  useHost,
  type VueElement,
} from "vue"
import { contexts, options, refreshScopes, registerElements, renderControl, ThemeConnection } from "./utils"

const formState = new WeakMap<HTMLElement, { internals: ElementInternals; disabled: Ref<boolean> }>()

export const TiProviderElement = defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      mode: { type: String as PropType<TiColorMode>, default: "light" },
      global: Boolean,
      locale: { type: [String, Object] as PropType<"zh-CN" | "en-US" | NLocale>, default: "zh-CN" },
      dateLocale: Object as PropType<NDateLocale>,
    },
    setup(props) {
      const host = useHost() as VueElement & { mode: TiColorMode }
      let theme: TiThemeContext
      const locale = computed(() =>
        typeof props.locale === "string" ? (props.locale === "en-US" ? enUS : zhCN) : props.locale,
      )
      const dateLocale = computed(() => props.dateLocale ?? (locale.value.name === "en-US" ? dateEnUS : dateZhCN))
      contexts.set(host, {
        mode: () => props.mode,
        theme: () => theme.theme.value,
        locale: () => locale.value,
        dateLocale: () => dateLocale.value,
        setMode: (value, trigger) => theme.setMode(value, trigger),
      })
      onBeforeUnmount(() => contexts.delete(host))
      return () =>
        h(
          TiProvider,
          {
            mode: props.mode,
            global: props.global,
            locale: locale.value,
            dateLocale: dateLocale.value,
            styleMountTarget: host.shadowRoot,
            "onUpdate:mode": (value: TiColorMode) => {
              if (value === props.mode) return
              host.mode = value
              host.dispatchEvent(
                new CustomEvent("mode-change", { detail: { mode: value }, bubbles: true, composed: true }),
              )
            },
          },
          {
            default: () =>
              h(
                ThemeConnection,
                {
                  connect: (value: TiThemeContext) => {
                    theme = value
                  },
                },
                {
                  default: () => h("slot"),
                },
              ),
          },
        )
    },
  }),
  { styles: [...options.styles, ":host { display: block; }"] },
)

export class TiButtonElement extends defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      variant: { type: String as PropType<"primary" | "secondary" | "ghost" | "text">, default: "secondary" },
      size: { type: String as PropType<"small" | "medium" | "large">, default: "medium" },
      disabled: Boolean,
      loading: Boolean,
      block: Boolean,
      round: Boolean,
      type: { type: String as PropType<"button" | "submit" | "reset">, default: "button" },
      name: String,
      value: String,
    },
    setup(props, { attrs }) {
      const host = useHost() as TiButtonElement
      const state = formState.get(host)
      return renderControl(
        TiButton,
        () => {
          return {
            ...props,
            disabled: props.disabled || state?.disabled.value,
            onClick: (event: MouseEvent) => {
              queueMicrotask(() => {
                const form = state?.internals.form
                if (!form || event.defaultPrevented || props.disabled || props.loading || state?.disabled.value) return
                if (props.type === "reset") HTMLFormElement.prototype.reset.call(form)
                if (props.type === "submit") {
                  const submitter = document.createElement("button")
                  submitter.type = "submit"
                  submitter.hidden = true
                  submitter.name = props.name ?? ""
                  submitter.value = props.value ?? ""
                  for (const attribute of ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"]) {
                    const value = host.getAttribute(attribute)
                    if (value !== null) submitter.setAttribute(attribute, value)
                  }
                  form.append(submitter)
                  try {
                    HTMLFormElement.prototype.requestSubmit.call(form, submitter)
                  } finally {
                    submitter.remove()
                  }
                }
              })
            },
          }
        },
        attrs,
        ["icon"],
      )
    },
  }),
  { shadowRootOptions: { delegatesFocus: true }, styles: [...options.styles, ":host([block]) { display: block; }"] },
) {
  static formAssociated = true

  constructor() {
    super()
    formState.set(this, { internals: this.attachInternals(), disabled: ref(false) })
    this.addEventListener(
      "click",
      (event) => {
        if (this.disabled || this.loading || formState.get(this)?.disabled.value) {
          event.preventDefault()
          event.stopImmediatePropagation()
        }
      },
      { capture: true },
    )
  }

  get form() {
    return formState.get(this)?.internals.form ?? null
  }

  override connectedCallback() {
    super.connectedCallback()
    refreshScopes.get(this)?.()
  }

  formDisabledCallback(disabled: boolean) {
    const state = formState.get(this)
    if (state) state.disabled.value = disabled
  }

  override click() {
    this.shadowRoot?.querySelector("button")?.click()
  }
  override focus(options?: FocusOptions) {
    this.shadowRoot?.querySelector("button")?.focus(options)
  }
}

export class TiCardElement extends defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      title: String,
      raised: Boolean,
      size: { type: String as PropType<"small" | "medium" | "large">, default: "medium" },
    },
    setup: (props, { attrs }) => renderControl(TiCard, () => props, attrs, ["header", "header-extra", "footer"]),
  }),
  { styles: [...options.styles, ":host { display: block; }"] },
) {
  override connectedCallback() {
    super.connectedCallback()
    refreshScopes.get(this)?.()
  }
}

export class TiInputElement extends defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      value: { type: String, default: "" },
      name: String,
      label: String,
      hint: String,
      placeholder: String,
      type: { type: String as PropType<"text" | "textarea" | "password">, default: "text" },
      size: { type: String as PropType<"small" | "medium" | "large">, default: "medium" },
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      clearable: Boolean,
      status: String as PropType<"success" | "warning" | "error">,
      maxlength: Number,
    },
    setup(props, { attrs }) {
      const host = useHost() as TiInputElement
      const state = formState.get(host)
      const synchronize = () => {
        state?.internals.setFormValue(props.value)
        const input = host.shadowRoot?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
        if (input) state?.internals.setValidity(input.validity, input.validationMessage, input)
      }
      onMounted(synchronize)
      onUpdated(synchronize)
      return renderControl(
        TiInput,
        () => {
          return {
            ...props,
            disabled: props.disabled || state?.disabled.value,
            modelValue: props.value,
            "onUpdate:modelValue": (value: string) => {
              host.value = value
              host.dispatchEvent(new Event("input", { bubbles: true, composed: true }))
            },
            onInput: (event: Event) => event.stopPropagation(),
            onChange: (event: Event) => {
              event.stopPropagation()
              host.dispatchEvent(new Event("change", { bubbles: true, composed: true }))
            },
          }
        },
        attrs,
      )
    },
  }),
  { shadowRootOptions: { delegatesFocus: true }, styles: [...options.styles, ":host { display: block; }"] },
) {
  static formAssociated = true
  #defaultValue: string | undefined

  constructor() {
    super()
    formState.set(this, { internals: this.attachInternals(), disabled: ref(false) })
    this.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" || event.isComposing || this.type === "textarea") return
      queueMicrotask(() => {
        const form = this.form
        if (!form || event.defaultPrevented || this.disabled || formState.get(this)?.disabled.value) return
        const fields = Array.from(form.elements)
        const submitter = fields.find(
          (field) =>
            (field instanceof HTMLButtonElement ||
              field instanceof HTMLInputElement ||
              field instanceof TiButtonElement) &&
            field.type === "submit",
        )
        if (submitter instanceof HTMLElement) submitter.click()
        else if (
          fields.filter((field) =>
            field instanceof TiInputElement
              ? field.type !== "textarea"
              : field instanceof HTMLInputElement &&
                [
                  "text",
                  "search",
                  "url",
                  "tel",
                  "email",
                  "password",
                  "date",
                  "month",
                  "week",
                  "time",
                  "datetime-local",
                  "number",
                ].includes(field.type),
          ).length === 1
        ) {
          HTMLFormElement.prototype.requestSubmit.call(form)
        }
      })
    })
  }

  override connectedCallback() {
    this.#defaultValue ??= this.getAttribute("value") ?? ""
    super.connectedCallback()
    refreshScopes.get(this)?.()
  }

  get form() {
    return formState.get(this)?.internals.form ?? null
  }
  get validity() {
    return formState.get(this)?.internals.validity
  }
  get validationMessage() {
    return formState.get(this)?.internals.validationMessage ?? ""
  }
  get willValidate() {
    return formState.get(this)?.internals.willValidate ?? false
  }
  get defaultValue() {
    return this.#defaultValue ?? ""
  }
  set defaultValue(value: string) {
    this.#defaultValue = String(value)
  }

  formDisabledCallback(disabled: boolean) {
    const state = formState.get(this)
    if (state) state.disabled.value = disabled
  }

  formResetCallback() {
    this.value = this.defaultValue
  }
  formStateRestoreCallback(state: string | File | FormData) {
    if (typeof state === "string") this.value = state
  }

  checkValidity() {
    return formState.get(this)?.internals.checkValidity() ?? true
  }
  reportValidity() {
    return formState.get(this)?.internals.reportValidity() ?? true
  }
  override focus(options?: FocusOptions) {
    this.shadowRoot?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea")?.focus(options)
  }
}

export class TiTagElement extends defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      tone: {
        type: String as PropType<"neutral" | "accent" | "success" | "info" | "warning" | "error">,
        default: "neutral",
      },
      size: { type: String as PropType<"small" | "medium" | "large">, default: "medium" },
      round: { type: Boolean, default: true },
      closable: Boolean,
      disabled: Boolean,
    },
    setup(props, { attrs }) {
      const host = useHost()
      return renderControl(
        TiTag,
        () => {
          return {
            ...props,
            onClose: () => host?.dispatchEvent(new Event("close", { bubbles: true, composed: true })),
          }
        },
        attrs,
      )
    },
  }),
  options,
) {
  override connectedCallback() {
    super.connectedCallback()
    refreshScopes.get(this)?.()
  }
}

export class TiLogoElement extends defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      size: { type: [Number, String], default: 42 },
      label: { type: String, default: "" },
    },
    setup: (props, { attrs }) => renderControl(TiLogo, () => props, attrs),
  }),
  options,
) {
  override connectedCallback() {
    super.connectedCallback()
    refreshScopes.get(this)?.()
  }
}

export class TiThemeSwitchElement extends defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      label: { type: String, default: "主题" },
      labels: {
        type: Object as PropType<Record<TiColorMode, string>>,
        default: () => {
          return { light: "浅色", dark: "深色", system: "跟随系统" }
        },
      },
      icons: {
        type: Object as PropType<Record<TiColorMode, string>>,
        default: () => {
          return { light: lightIcon, dark: darkIcon, system: systemIcon }
        },
      },
    },
    setup: (props, { attrs }) => renderControl(TiThemeSwitch, () => props, attrs, [], true),
  }),
  options,
) {
  override connectedCallback() {
    super.connectedCallback()
    refreshScopes.get(this)?.()
  }
}

export function defineTealInkElements() {
  registerElements({
    "ti-provider": TiProviderElement,
    "ti-button": TiButtonElement,
    "ti-card": TiCardElement,
    "ti-input": TiInputElement,
    "ti-tag": TiTagElement,
    "ti-logo": TiLogoElement,
    "ti-theme-switch": TiThemeSwitchElement,
  })
}

declare global {
  interface HTMLElementTagNameMap {
    "ti-provider": InstanceType<typeof TiProviderElement>
    "ti-button": TiButtonElement
    "ti-card": InstanceType<typeof TiCardElement>
    "ti-input": TiInputElement
    "ti-tag": InstanceType<typeof TiTagElement>
    "ti-logo": InstanceType<typeof TiLogoElement>
    "ti-theme-switch": InstanceType<typeof TiThemeSwitchElement>
  }
}
