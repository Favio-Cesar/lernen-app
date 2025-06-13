<script setup lang="ts">
const left = useTransition()
const right = useTransition()
const authStore = useAuthStore()

const { isLoggedIn } = storeToRefs(authStore)
</script>

<template>
  <section class="intro">
    <div class="intro__left">
      <div class="intro__content" ref="left">
        <h2>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.intro.h2_left') }}</span>
          </Transition>
        </h2>
        <p>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.intro.p_left') }}</span>
          </Transition>
        </p>
        <a href="#explore" class="intro__button intro__button--yellow" v-if="!isLoggedIn">
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.intro.button_left') }}</span>
          </Transition>
        </a>
      </div>
    </div>

    <div class="intro__right">
      <div class="intro__content" ref="right">
        <h2>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.intro.h2_right') }}</span>
          </Transition>
        </h2>
        <p>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.intro.p_right') }}</span>
          </Transition>
        </p>
        <a href="/login" class="intro__button intro__button--dark" v-if="!isLoggedIn">
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.intro.button_right') }}</span>
          </Transition>
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@include themify($themes) {
  .intro {
    &__left {
      background-color: themed('secondary');
      color: themed('text');
    }
    &__right {
      background-color: themed('tertiary');
      color: themed('background');
    }
  }
}

.intro {
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;

  &__left,
  &__right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  &__content {
    max-width: 45rem;
    text-align: left;
    @include opacityTransition;
    h2 {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    p {
      font-size: 2rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: inherit;
    }
  }

  &__button {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;

    &--yellow {
      background-color: #ffe75e;
      color: #1e1e1e;

      &:hover {
        background-color: #fcd200;
      }
    }

    &--dark {
      background-color: #1e1e1e;
      color: white;

      &:hover {
        background-color: #000;
      }
    }
  }
}
</style>
