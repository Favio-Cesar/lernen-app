<script setup lang="ts">
import { useFieldNavigation } from '~/composables/useFieldNavigation'
import { useNavbarPaths } from '~/composables/useNavbarSelector'
const route = useRoute()

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

const { fullPaths, isActive } = useNavbarPaths(props)
const { t, navItems, isMenuOpen, toggleMenu, closeMenu, shouldShowSelector } =
  useFieldNavigation()
</script>

<template>
  <IconsMenuIcon class="nav__icon" :is-open="isMenuOpen" @toggle="toggleMenu" />
  <Transition name="mobile-menu">
    <nav v-if="isMenuOpen" class="nav" :class="{ active: isMenuOpen }">
      <div class="nav-collapse" :class="{ 'show-menu': isMenuOpen }">
        <ul class="nav-main">
          <li v-for="(item, index) in navItems" :key="index">
            <NuxtLink :to="item.path" class="nav-link">
              <i :class="item.icon"></i>
              <span>{{ item.longTitle }}</span>
            </NuxtLink>
          </li>
        </ul>
        <Transition name="slide-fade">
          <ul v-if="shouldShowSelector" class="nav-sub">
            <li v-for="(item, index) in fullPaths" :key="index">
              <NuxtLink
                :to="item.path"
                class="sub-link"
                :class="{ active: isActive(item.path) }"
                @click="closeMenu"
              >
                <i class="fas fa-book"></i> <span>Workbook</span></NuxtLink
              >
            </li>
          </ul>
        </Transition>
        <IconsLocaleSwitcher size="6rem" />
      </div>
    </nav>
  </Transition>
</template>
<style lang="scss" scoped>
@use 'sass:color';
/* Transición mejorada para móvil */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
$mobile-breakpoint: 991px;
.nav-collapse {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: $primary-color-lighter;
  padding: 2rem;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: -2px 0 10px $primary-color-transparent;

  &.show-menu {
    right: 0;
  }
}

.nav-main,
.nav-sub {
  flex-direction: column;
  gap: 1rem;
}

.nav-link,
.sub-link {
  padding: 1rem;
  border-radius: 4px;

  &:hover {
    background: rgba($primary-color, 0.1);
  }
}
.nav {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 999;
  &.active {
    background-color: $primary-color-transparent;
  }
  &__icon {
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
  }
}
.nav-main,
.nav-sub {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem;
}

.nav-link,
.sub-link {
  color: $primary-color-darker;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 1rem;

  &:hover {
    color: rgba($primary-color-darker, 0.8);
    transform: translateY(-2px);
  }

  i {
    font-size: 1.2rem;
  }
}

.nav-sub {
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: color.adjust($primary-color-lighter, $lightness: -5%);
}

/* Transiciones */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
