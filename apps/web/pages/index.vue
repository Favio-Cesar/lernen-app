<script setup lang="ts">
import type { FieldOfStudy, StrapiResponse } from '~/interfaces/strapi/fields-of-studies'
const { data: fieldsRaw } = await useStrapiFetch<StrapiResponse<FieldOfStudy>>(
  'fields-of-studies?populate=bookCover',
)
const authStore = useAuthStore()

const { isLoggedIn } = storeToRefs(authStore)
</script>
<template>
  <div>
    <header class="header" v-if="!isLoggedIn">
      <section class="header__half">
        <div class="header__title">
          <h1>LERNEN.IO</h1>
        </div>
      </section>
      <section class="header__half header__half--other">
        <nav class="header__nav">
          <ul class="nav__list">
            <li class="nav__item">
              <a href="/">
                <Transition name="text" mode="out-in">
                  <span :key="$i18n.locale">{{ $t('home.header__nav.home') }}</span>
                </Transition></a
              >
            </li>
            <li class="nav__item">
              <a href="#explore">
                <Transition name="text" mode="out-in">
                  <span :key="$i18n.locale">{{ $t('home.header__nav.learning') }}</span>
                </Transition>
              </a>
            </li>
            <li class="nav__item">
              <a href="https://github.com/Favio-Cesar">
                <Transition name="text" mode="out-in">
                  <span :key="$i18n.locale">{{ $t('home.header__nav.contact') }}</span>
                </Transition>
              </a>
            </li>
            <li class="nav__item nav__item--button">
              <a href="/login"
                ><Transition name="text" mode="out-in">
                  <span :key="$i18n.locale">{{ $t('home.header__nav.sign-in') }}</span>
                </Transition>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </header>
    <TheIntro />
    <TheBody />
    <TheConclusion />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/main.scss';

@include themify($themes) {
  .header__half {
    background-color: themed('secondary');
    border-bottom: 1px solid themed('border');
  }
  .header__half--other {
    background-color: themed('tertiary');
  }

  .header__title h1 {
    color: themed('text');
  }

  .nav__item a {
    color: themed('text');
    border: 0.1rem solid themed('border');
    &:hover {
      background-color: themed('secondary');
      color: themed('text');
    }
  }
}

.header {
  display: flex;
  height: 4rem;
  @include responsive();
  &__half {
    width: 50%;

    display: flex;
    align-items: center;
    padding-left: 2rem;

    &--other {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 2rem;
    }
  }
  &__title h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
  &__nav {
    .nav__list {
      display: flex;
      gap: 1rem;
      list-style: none;
      padding: 0;
      margin: 0;
      align-items: center;
      .nav__item {
        a {
          white-space: nowrap;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          transition: all 0.3s ease;
        }
      }
    }
  }
}

.article {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
</style>
