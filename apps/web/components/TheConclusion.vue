<script lang="ts" setup>
const element = useTransition()
</script>
<template>
  <section class="conclusion">
    <div class="conclusion__content" ref="element">
      <div class="conclusion__text">
        <p class="conclusion__subtitle">
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.conclusion.h3') }}</span>
          </Transition>
        </p>
        <h1 class="conclusion__title">
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.conclusion.h2') }}</span>
          </Transition>
        </h1>
        <p class="conclusion__description">
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.conclusion.p') }}</span>
          </Transition>
        </p>
        <button class="conclusion__button">
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.conclusion.button') }}</span>
          </Transition>
        </button>
      </div>

      <div class="conclusion__image-wrapper">
        <img src="/laptop.png" alt="conclusion laptops" class="conclusion__image" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@include themify($themes) {
  .conclusion {
    background-color: themed('tertiary');
    color: themed('text');
    &__title {
      color: themed('text');
    }
    &__subtitle {
      color: themed('text');
    }
    &__description {
      color: themed('text');
    }
  }
}
.conclusion {
  padding: 5rem 2rem;
  margin-bottom: 8rem;
  &__content {
    max-width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 3rem;
    @include opacityTransition;
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__text {
    flex: 1;
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }

  &__subtitle {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  &__title {
    font-size: 2.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
    font-style: italic;
  }

  &__description {
    font-size: 1rem;
    color: #444;
    margin-bottom: 2rem;
  }

  &__button {
    background-color: #000;
    color: white;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: monospace;

    &:hover {
      background-color: #111;
    }
  }

  &__image-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    max-width: 100%;
    height: 100%;
  }
}
</style>
