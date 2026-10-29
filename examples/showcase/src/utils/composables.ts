import { computed, type Ref, ref, watch } from 'vue'

/** Creates a ref initialized from a translated value that re-syncs on locale change until the user edits it. */
export function useTranslatedRef<T>(translate: () => T) {
  const source = computed(translate)
  const value = ref(source.value) as Ref<T>
  watch(source, (next, previous) => {
    const current = value.value as unknown
    if (
      Array.isArray(current) && Array.isArray(previous)
        ? current.length === previous.length && current.every((item, index) => item === previous[index])
        : current === previous
    )
      value.value = next
  })
  return value
}

/** Tracks a component instance's root element through a template ref. */
export function useElementRef() {
  const element = ref<HTMLElement | null>(null)
  return {
    element,
    setElement(instance: unknown) {
      element.value =
        instance && typeof instance === 'object' && '$el' in instance ? (instance.$el as HTMLElement) : null
    },
  }
}

export function useTabButtonProps<T extends string>(selected: Ref<T>) {
  return (name: T) => ({
    role: 'button',
    tabindex: 0,
    'aria-pressed': selected.value === name,
    onKeydown(event: KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      selected.value = name
    },
  })
}
