<script setup>
import { ref, reactive, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)
const activeIndex = ref(1)
const navbarRef = ref(null)

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (val) => val.every((item) => 'path' in item && 'title' in item),
  },
  basePath: {
    type: String,
    default: '/',
  },
  isSubNav: {
    type: Boolean,
    default: false,
  },
  inverted: {
    type: Boolean,
    default: false,
  },
})

const fullPaths = computed(() => {
  let base = props.basePath

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

const selectorStyle = reactive({
  left: '0',
  width: '0',
})
const isActive = (path) => {
  if (path === '/') return route.path === '/'

  if (props.inverted) return route.path === path

  return (
    route.path.startsWith(path) &&
    (route.path === path || route.path.charAt(path.length) === '/' || path === '/')
  )
}
onUpdated(() => {
  nextTick(updateSelector)
})

const updateSelector = () => {
  nextTick(() => {
    const activeElement = navbarRef.value?.querySelector('.nav-item.active')
    const navbar = navbarRef.value

    if (activeElement && navbar) {
      const elementLeft = activeElement.offsetLeft
      const elementWidth = activeElement.offsetWidth

      Object.assign(selectorStyle, {
        left: `${elementLeft}px`,
        width: `${elementWidth}px`,
      })
    }
  })
}
const setActive = (index) => {
  activeIndex.value = index
  isMenuOpen.value = false
  nextTick(updateSelector)
}

onMounted(() => {
  updateSelector()
})

watch(
  () => route.path,
  () => nextTick(updateSelector),
)
</script>

<template>
  <ul ref="navbarRef" class="custom-nav navbar-nav">
    <div class="hori-selector" :class="{ inverted }" :style="selectorStyle">
      <div class="left" />
      <div class="right" />
    </div>
    <li
      v-for="(item, index) in fullPaths"
      :key="index"
      class="nav-item"
      :class="{ active: isActive(item.path) }"
      @click="setActive(index)"
    >
      <NuxtLink class="nav-link" :to="item.path">
        <span class="text">{{ item.title }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.custom-nav {
  &.navbar-nav {
    position: relative;
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    isolation: isolate;

    .nav-item {
      position: relative;
      z-index: 1;
      bottom: 0.5rem;
      .nav-link {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        text-decoration: none;
        font-size: 15px;
        color: $secondary-color-lighter;
        transition: all 0.2s;
        position: relative;

        i {
          font-size: 1.1rem;
          transition: inherit;
        }

        .text {
          font-size: 0.95rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: inherit;
        }
      }

      &.active {
        .nav-link {
          color: $secondary-color-darker;

          i,
          .text {
            color: inherit;
          }
        }
      }
    }
  }

  .hori-selector {
    display: inline-block;
    position: absolute;
    height: 100%;
    background: $tertiary-color-light;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    transition: all 0.6s;
    z-index: 0;

    .left,
    .right {
      position: absolute;
      width: 25px;
      height: 25px;
      background: $tertiary-color-light;
      bottom: -0.02rem;

      &::before {
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: $secondary-color-light;
      }
    }

    .left {
      left: -25px;

      &::before {
        bottom: 0;
        left: -25px;
      }
    }

    .right {
      right: -25px;

      &::before {
        bottom: 0;
        right: -25px;
      }
    }

    &.inverted {
      background: $tertiary-color-light;
      transform: rotate(180deg);
      margin-top: 0rem;
      margin-bottom: 10px;

      .left,
      .right {
        background: $tertiary-color-light;

        &::before {
          background: $secondary-color-light;
        }
      }
    }
  }
}
</style>
