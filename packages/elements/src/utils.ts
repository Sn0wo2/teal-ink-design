import {
  dateZhCN,
  type NDateLocale,
  type NLocale,
  type TiColorMode,
  TiProvider,
  type TiThemeContext,
  useTiTheme,
  zhCN,
} from "@teal-ink/vue"
import styles from "@teal-ink/vue/style.css?inline"
import { useMutationObserver } from "@vueuse/core"
import {
  type Component,
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  type PropType,
  ref,
  shallowRef,
  useHost,
} from "vue"

interface ElementContext {
  mode: () => TiColorMode
  theme: () => TiColorMode
  locale: () => NLocale
  dateLocale: () => NDateLocale
  setMode: TiThemeContext["setMode"]
}

export const contexts = new WeakMap<HTMLElement, ElementContext>()
export const refreshScopes = new WeakMap<HTMLElement, () => void>()

export const ThemeConnection = defineComponent({
  props: {
    connect: { type: Function as PropType<(theme: TiThemeContext) => void>, required: true },
  },
  setup(props, { slots }) {
    props.connect(useTiTheme())
    return () => slots["default"]?.()
  },
})

export const options = {
  styles: [
    styles,
    ":host { display: inline-block; min-width: 0; vertical-align: middle; } :host([hidden]) { display: none !important; }",
  ],
}

export function renderControl(
  component: Component,
  props: () => Record<string, unknown>,
  attrs: Record<string, unknown>,
  names: string[] = [],
  relayTheme = false,
) {
  const host = useHost()
  if (!host) throw new Error("Teal Ink elements require a custom element host")
  const mode = ref<TiColorMode>("light")
  const fallback: ElementContext = {
    mode: () => mode.value,
    theme: () => mode.value,
    locale: () => zhCN,
    dateLocale: () => dateZhCN,
    setMode: (value) => {
      if (value !== mode.value) {
        mode.value = value
        host.dispatchEvent(new CustomEvent("mode-change", { detail: { mode: value }, bubbles: true, composed: true }))
      }
      return Promise.resolve()
    },
  }
  const context = shallowRef(fallback)
  const refresh = () => {
    let ancestor: Node | null = host
    while (ancestor) {
      ancestor =
        (ancestor instanceof Element && ancestor.assignedSlot) ||
        ancestor.parentNode ||
        (ancestor instanceof ShadowRoot ? ancestor.host : null)
      if (ancestor instanceof HTMLElement) {
        const scope = contexts.get(ancestor)
        if (scope) {
          context.value = scope
          return
        }
      }
    }
    context.value = fallback
  }
  refreshScopes.set(host, refresh)
  refresh()
  onBeforeUnmount(() => refreshScopes.delete(host))
  const assigned = shallowRef(new Set<string>())
  if (names.length) {
    const updateSlots = () => {
      const next = new Set(Array.from(host.children, (child) => child.getAttribute("slot") ?? ""))
      if (next.size !== assigned.value.size || Array.from(next).some((name) => !assigned.value.has(name))) {
        assigned.value = next
      }
    }
    updateSlots()
    useMutationObserver(host, updateSlots, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["slot"],
    })
  }
  return () => {
    const { class: _class, style: _style, ...forwarded } = attrs
    const componentProps = { ...forwarded, ...props() }
    const slots = {
      default: () => h("slot"),
      ...Object.fromEntries(
        names.filter((name) => assigned.value.has(name)).map((name) => [name, () => h("slot", { name })]),
      ),
    }
    return h(
      TiProvider,
      {
        mode: context.value.theme(),
        locale: context.value.locale(),
        dateLocale: context.value.dateLocale(),
        styleMountTarget: host.shadowRoot,
      },
      {
        default: () =>
          relayTheme
            ? h(
                ThemeConnection,
                {
                  connect: (theme: TiThemeContext) => {
                    theme.mode = computed(() => context.value.mode())
                    theme.setMode = (value, trigger) => context.value.setMode(value, trigger)
                  },
                },
                {
                  default: () => h(component, componentProps, slots),
                },
              )
            : h(component, componentProps, slots),
      },
    )
  }
}

export function registerElements(elements: Record<string, CustomElementConstructor>) {
  if (typeof customElements === "undefined") return
  for (const [name, element] of Object.entries(elements)) {
    const registered = customElements.get(name)
    if (registered && registered !== element) throw new Error(`Custom element ${name} is already registered`)
    if (!registered) customElements.define(name, element)
  }
  if (!document.querySelector("style[data-ti-elements]")) {
    const style = document.createElement("style")
    style.dataset["tiElements"] = ""
    style.textContent = `${styles}\n:where(ti-component) { display: block; min-width: 0; } ti-component[hidden] { display: none !important; }`
    document.head.append(style)
  }
}
