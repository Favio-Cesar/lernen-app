<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from '#app'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()
const isMenuOpen = ref(false)
const activeIndex = ref(1)

const navItems = ref([
  { path: '/book', title: t('book'), icon: 'fas fa-square-root-alt' },
  { path: '/sources', title: t('sources'), icon: 'fas fa-atom' },

  { path: '/more', title: t('more'), icon: 'fa fa-plus' },
])

const selectorStyle = reactive({
  top: '0',
  left: '0',

  width: '0',
})

const isActive = (path) => {
  return route.path === path
}

const updateSelector = () => {
  const activeElement = document.querySelector('.nav-item.active')
  const navbar = document.querySelector('.navbar-nav')

  if (activeElement && navbar) {
    const navRect = navbar.getBoundingClientRect()
    const activeRect = activeElement.getBoundingClientRect()

    Object.assign(selectorStyle, {
      top: `${activeRect.top - navRect.top}px`,
      left: `${activeRect.left - navRect.left}px`,

      width: `${activeElement.offsetWidth}px`,
    })
  }
}
const setActive = (index) => {
  activeIndex.value = index
  isMenuOpen.value = false
  updateSelector()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleResize = () => {
  updateSelector()
  if (window.innerWidth > 991) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  updateSelector()
  window.addEventListener('resize', handleResize)
})

watch(
  () => route.path,
  () => {
    nextTick(updateSelector)
  },
)
</script>

<template>
  <ul class="navbar-nav ml-auto">
    <div class="hori-selector" :style="selectorStyle">
      <div class="left" />
      <div class="right" />
    </div>
    <li
      v-for="(item, index) in navItems"
      :key="index"
      class="nav-item"
      :class="{ active: isActive(item.path) }"
      @click="setActive(index)"
    >
      <NuxtLink class="nav-link" :to="item.path">
        <i :class="[item.icon]" :style="{ color: isActive(item.path) ? 'black' : '' }" />
        <span class="text" :style="{ color: isActive(item.path) ? 'black' : '' }">{{
          item.title
        }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
.text {
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.5s ease;
}
body {
  font-family: 'Roboto', sans-serif;
  transition: all 0.7s;
}

* {
  margin: 0;
  padding: 0;
}
.navbar-nav {
  position: relative;
}
.navbar-mainbg {
  background-color: #171717;
  padding: 0px;
}

#navbarSupportedContent {
  overflow: hidden;
  position: relative;

  ul {
    padding: 0px;
    margin: 0px;
    margin-left: 1.4rem;
    li a i {
      margin-right: 10px;
    }
  }

  li {
    list-style-type: none;
    float: left;
  }

  ul li a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 15px;
    display: block;
    padding: 1rem 1rem 0.5rem 1rem;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: relative;
  }
}

.nav-item.active .nav-link {
  color: #171717;
  background-color: transparent;
  transition: all 0.7s;
}

.hori-selector {
  display: inline-block;
  position: absolute;
  height: 2.2rem;
  top: 0px;
  left: 0px;
  transition-duration: 0.2s;
  background-color: #fff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-top: 0.5rem;
  transform: rotate(180deg);
  .right,
  .left {
    position: absolute;
    width: 20px;
    height: 15px;
    margin-top: 20px;
    background-color: #fff;
  }

  .right {
    right: -20px;
    &:before {
      content: '';
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #171717;
      bottom: 0;
      right: -25px;
    }
  }

  .left {
    left: -20px;
    &:before {
      content: '';
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #171717;
      bottom: 0;
      left: -25px;
    }
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    display: none;
    &.show {
      display: block;
    }
  }

  .hori-selector {
    margin-top: 0px;
    margin-left: 10px;
    border-radius: 0;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
}
</style>
