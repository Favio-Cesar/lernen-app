<script setup>
import { LayoutElementsSuperNavBar } from '#components'
import SuperNavBar from '~/components/layout/elements/SuperNavBar.vue'

const { t } = useI18n()
const route = useRoute()
const authStore = useAuthStore()

const { isLoggedIn } = storeToRefs(authStore)

const navItems = computed(() => [
  { path: '/maths', title: t('maths'), icon: 'fas fa-square-root-alt' },
  { path: '/physics', title: t('physics'), icon: 'fas fa-atom' },
  { path: '/more', title: t('more.title'), icon: 'fa fa-plus' },
])

const basePath = ref('/')

const shouldShowSelector = computed(() => !route.path.includes('/more'))
const { isMobile, isTablet, isDesktop } = useDevice()
</script>

<template>
  <div>
    <nav class="navbar navbar-mainbg" v-if="isLoggedIn">
      <div class="navbar navbar-collapse navbar-supported-content">
        <LayoutElementsSuperNavBar :items="navItems" :base-path="basePath" is-sub-nav />
        <Transition name="fade-expand">
          <LayoutElementsSuperNavBar
            v-show="shouldShowSelector"
            :items="[
              { path: '', title: $t('more.title_s'), icon: 'fas fa-book' },
              { path: 'workbook', title: $t('workbook'), icon: 'fas fa-book' },
            ]"
            :base-path="basePath"
            is-sub-nav
            inverted
          />
        </Transition>
      </div>

      <IconsUserIcon />
    </nav>

    <Transition name="fade-expand">
      <LayoutElementsMobileNavBar
        :items="navItems"
        :base-path="basePath"
        is-sub-nav
        v-if="isMobile"
      />
    </Transition>
    <NuxtPage :transition="{ name: 'fade', mode: 'out-in' }" />
  </div>
  <div class="fixed-switchers">
    <IconsLocaleSwitcher size="2.5rem" />
    <IconsColorSwitcher size="2.5rem" />
  </div>
</template>

<style lang="scss">
@include themify($themes) {
  .navbar-mainbg {
    background-color: themed('tertiary');
    border-bottom: 0.5rem solid themed('secondary');
  }
}
.fixed-switchers {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  gap: 2rem;
  z-index: 1000;
}

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
  transition: all 0.4s ease;
  overflow: hidden;
}

.fade-expand-enter-from,
.fade-expand-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.fade-expand-enter-to,
.fade-expand-leave-from {
  opacity: 1;
  transform: translateY(0%);
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
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  min-height: fit-content;
  height: 4rem;
  width: 100%;
  transition: all 0.5s ease;
}
.navbar-mainbg {
  display: flex;
  justify-content: space-evenly;
  background-color: $secondary-color-light;
  padding: 0px 2rem;
}
.navbar-supported-content {
  overflow: hidden;
  position: relative;
  padding: 0rem 2rem;
  box-sizing: border-box;

  li {
    list-style-type: none;
    float: left;
  }
  ul li a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 1.2rem;
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
