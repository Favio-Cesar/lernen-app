<script setup lang="ts">
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
  inverted: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const isMenuOpen = ref(false)
const activeIndex = ref(1)
const navbarRef = ref(null)
const { fullPaths, isActive } = useNavbarPaths(props)

const selectorStyle = reactive({
  left: '0',
  width: '0',
})

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
  <ul ref="navbarRef" class="custom-nav navbar-nav" :class="{ inverted }">
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
@include themify($themes) {
  .custom-nav.navbar-nav .nav-item.active .nav-link {
    color: themed('text');
  }
  .custom-nav.navbar-nav .hori-selector {
    background: themed('secondary');
    .left,
    .right {
      background: themed('secondary');
      &::before {
        background: themed('tertiary');
      }
    }
  }
}
.custom-nav {
  height: 100%;
  &.navbar-nav {
    position: relative;
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    isolation: isolate;
    align-items: flex-end;

    &.inverted {
      align-items: flex-start;
    }

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
        transition: all 0.2s ease;
        position: relative;

        i {
          font-size: 1.5rem;
          transition: inherit;
        }

        .text {
          font-size: 1.5rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: inherit;
        }
      }
    }
    .hori-selector {
      display: inline-block;
      position: absolute;
      height: 3.2rem;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      transition: all 0.2s ease;
      z-index: 0;
      .left,
      .right {
        position: absolute;
        width: 25px;
        height: 25px;
        bottom: 0.25rem;
        transition: all 0.2s ease;
        &::before {
          content: '';
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.2s ease;
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
        transform: rotate(180deg);
        margin-top: 0rem;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
