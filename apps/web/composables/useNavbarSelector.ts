// composables/useNavbarPaths.ts
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 1. Define la interfaz esperada para los items
export interface NavbarItem {
  path: string
  title: string
}

// 2. Define la interfaz de props
interface NavbarProps {
  items: NavbarItem[]
  basePath?: string
  inverted?: boolean
}

export function useNavbarPaths(props: NavbarProps) {
  const route = useRoute()

  const fullPaths = computed<NavbarItem[]>(() => {
    let base = props.basePath || '/'

    if (props.inverted) {
      const segments = route.path.split('/').filter(Boolean)
      const lastSegment = segments[segments.length - 1]
      const isItemInPath = props.items.some((item) => item.path === lastSegment)
      base = isItemInPath ? '/' + segments.slice(0, -1).join('/') : route.path
    }

    return props.items.map((item) => {
      const baseSegments = base.split('/').filter(Boolean)
      const itemSegments = item.path.split('/').filter(Boolean)

      let mergedPath = [...baseSegments]

      if (
        itemSegments.length &&
        baseSegments[baseSegments.length - 1] !== itemSegments[0]
      ) {
        mergedPath = [...mergedPath, ...itemSegments]
      } else if (
        itemSegments.length &&
        baseSegments.slice(-itemSegments.length).join('/') !== itemSegments.join('/')
      ) {
        mergedPath = [...mergedPath, ...itemSegments]
      }

      return {
        ...item,
        path: '/' + mergedPath.join('/'),
      }
    })
  })

  const isActive = (path: string): boolean => {
    if (path === '/') return route.path === '/'

    if (props.inverted) return route.path === path

    return (
      route.path.startsWith(path) &&
      (route.path === path || route.path.charAt(path.length) === '/' || path === '/')
    )
  }

  return { fullPaths, isActive }
}
