import { computed, type Ref, ref, watch } from "vue"

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
