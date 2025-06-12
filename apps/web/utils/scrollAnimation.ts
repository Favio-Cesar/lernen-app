export function scrollAnimation({
  element,
  className = 'visible',
}: {
  element: HTMLElement | null
  className?: string
}) {
  const valueUnref = unref(element)

  if (!valueUnref)
    return console.error(`The element you want to animate isn't in the DOM`)

  const elementToScroll = valueUnref

  const handleScroll = () => {
    const { top, bottom } = elementToScroll.getBoundingClientRect()

    const isVisible = top <= window.innerHeight && bottom >= 0

    if (isVisible) {
      elementToScroll.classList.add(className)
    } else {
      elementToScroll.classList.remove(className)
    }
  }

  handleScroll() // por si ya es visible al montar

  document.addEventListener('scroll', handleScroll)

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', handleScroll)
  })
}
