<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { FieldOfStudy, StrapiResponse } from '~/interfaces/strapi/fields-of-studies'
const jwt = localStorage.getItem('jwt')

console.log('jwt', jwt)
const { fields_of_studies: fields } = await useStrapiFetch<StrapiResponse<FieldOfStudy>>(
  'users/me',
  jwt,
  {
    params: { populate: 'fields_of_studies' },
  },
)
const { t } = useI18n()
const route = useRoute()
const navItems = ref([
  { path: '/maths', title: t('maths'), icon: 'fas fa-square-root-alt' },
  { path: '/physics', title: t('physics'), icon: 'fas fa-atom' },
  { path: '/more', title: t('more'), icon: 'fa fa-plus' },
])

const isMenuOpen = ref(false)
const shouldShowSelector = computed(() => {
  return !route.path.includes('/more')
})
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <IconsMenuIcon class="nav__icon" :is-open="isMenuOpen" @toggle="toggleMenu" />
  <Transition name="mobile-menu">
    <nav v-if="isMenuOpen" class="nav" :class="{ active: isMenuOpen }">
      >

      <div class="nav-collapse" :class="{ 'show-menu': isMenuOpen }">
        <ul class="nav-main">
          <li v-for="(item, index) in navItems" :key="index">
            <NuxtLink :to="item.path" class="nav-link">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </NuxtLink>
          </li>
        </ul>
        <Transition name="slide-fade">
          <ul v-if="shouldShowSelector" class="nav-sub" @click="closeMenu">
            <li>
              <NuxtLink to="/home" class="sub-link">
                <i class="fas fa-book"></i>
                <span>Home</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/workbook" class="sub-link">
                <i class="fas fa-book"></i>
                <span>Workbook</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/resources" class="sub-link">
                <i class="fas fa-box-open"></i>
                <span>Resources</span>
              </NuxtLink>
            </li>
          </ul>
        </Transition>
      </div>
    </nav>
  </Transition>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
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
.nav {
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

/* Responsive */
@media (max-width: $mobile-breakpoint) {
  .nav-collapse {
    position: fixed;
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
}
</style>
