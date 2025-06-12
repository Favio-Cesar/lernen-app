export function useTransition() {
  const element = ref<HTMLElement>()
  onMounted(() => {
    if (element.value) {
      scrollAnimation({ element: element.value, className: 'visible' })
    }
  })
  return element
}
