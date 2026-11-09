import * as library from "@teal-ink/vue"
import {
  type Component,
  defineComponent,
  defineCustomElement,
  h,
  type PropType,
  resolveComponent,
  type Slots,
} from "vue"
import { defineTealInkElements as defineBaseElements } from "./index"
import { refreshScopes, registerElements, renderControl } from "./utils"

export * from "@teal-ink/vue"
export { defineComponent, h, nextTick, reactive, ref, shallowRef } from "vue"
export * from "./index"

const componentName = /^(N[A-Z]|NxButton|Ti[A-Z])/

export class TiComponentElement extends defineCustomElement(
  defineComponent({
    inheritAttrs: false,
    props: {
      component: [String, Object, Function] as PropType<string | Component>,
      props: Object as PropType<Record<string, unknown>>,
      slots: Object as PropType<Slots>,
    },
    setup(props) {
      return renderControl(
        defineComponent(() => () => {
          if (!props.component) return null
          return h(
            typeof props.component === "string" ? resolveComponent(props.component) : props.component,
            props.props,
            props.slots,
          )
        }),
        () => {
          return {}
        },
        {},
        [],
        true,
      )
    },
  }),
  {
    shadowRoot: false,
    configureApp(app) {
      for (const [name, component] of Object.entries(library).filter(
        ([name, component]) =>
          componentName.test(name) &&
          component &&
          (typeof component === "function" ||
            (typeof component === "object" && ("setup" in component || "render" in component))),
      ))
        app.component(name, component as Component)
    },
  },
) {
  override connectedCallback() {
    super.connectedCallback()
    refreshScopes.get(this)?.()
  }
}

export function defineTealInkElements() {
  defineBaseElements()
  registerElements({ "ti-component": TiComponentElement })
}

declare global {
  interface HTMLElementTagNameMap {
    "ti-component": TiComponentElement
  }
}
