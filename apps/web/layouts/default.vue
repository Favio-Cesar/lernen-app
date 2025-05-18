<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import SuperNavBar from '~/components/layout/elements/SuperNavBar.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const navItems = ref([
  { path: '/maths', title: t('maths'), icon: 'fas fa-square-root-alt' },
  { path: '/physics', title: t('physics'), icon: 'fas fa-atom' },
  { path: '/more', title: t('more'), icon: 'fa fa-plus' },
])
const basePath = ref('/')

const shouldShowSelector = computed(() => !route.path.includes('/more'))

const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 992
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
})
</script>

<template>
  <div>
    <nav class="navbar navbar-mainbg">
      <div class="navbar navbar-collapse navbar-supported-content">
        <SuperNavBar :items="navItems" :base-path="basePath" is-sub-nav />
        <Transition name="fade-expand">
          <SuperNavBar
            v-show="shouldShowSelector"
            :items="[
              { path: '', title: 'home', icon: 'fas fa-book' },
              { path: 'workbook', title: 'Workbook', icon: 'fas fa-book' },
              { path: 'resources', title: 'Resources', icon: 'fas fa-box-open' },
            ]"
            :base-path="basePath"
            is-sub-nav
            inverted
          />
        </Transition>
      </div>
    </nav>
    <LayoutElementsMobileNavBar v-if="isMobile" />
    <NuxtPage :transition="{ name: 'fade', mode: 'out-in' }" />
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-expand-enter-active,
.fade-expand-leave-active {
  transition:
    opacity 0.4s ease,
    max-height 0.3s ease;
  overflow: hidden;
}

.fade-expand-enter-from,
.fade-expand-leave-to {
  opacity: 0;
  max-height: 0 !important;
}

.fade-expand-enter-to,
.fade-expand-leave-from {
  opacity: 1;
  max-height: 500px;
}

.transition-height {
  overflow: hidden;
  transition:
    min-height 0.4s ease,
    opacity 0.4s ease;
  &.v-leave-from,
  &.v-enter-to {
    min-height: 5rem;
    opacity: 1;
  }
  &.v-enter-from,
  &.v-leave-to {
    min-height: 0;
    opacity: 0;
  }
}
.navbar {
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  transition: all 0.5s ease;
}
.navbar-mainbg {
  background-color: $secondary-color-light;
  padding: 0px;
}
.navbar-supported-content {
  overflow: hidden;
  position: relative;
  padding: 0.2rem 2rem;
  box-sizing: border-box;

  li {
    list-style-type: none;
    float: left;
  }
  ul li a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 15px;
    display: block;
    padding: 1rem 1rem 0rem 1rem;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: relative;
  }
}
@media (max-width: 62rem) {
  .navbar-collapse {
    display: none;
    &.show {
      display: block;
    }
  }
  .nav-mobile {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;

    transition: all 0.5s ease;
  }
}
</style>
