<script setup lang="ts">
const title = useTransition()
</script>

<template>
  <section class="body" id="explore">
    <div ref="title" class="body__content">
      <p class="body__subtitle">
        <Transition name="text" mode="out-in">
          <span :key="$i18n.locale">{{ $t('home.body.h3') }}</span>
        </Transition>
      </p>
      <h2 class="body__title">
        <Transition name="text" mode="out-in">
          <span :key="$i18n.locale">{{ $t('home.body.h2_right') }}</span>
        </Transition>
      </h2>
      <p class="body__description">
        <Transition name="text" mode="out-in">
          <span :key="$i18n.locale">{{ $t('home.body.p_sub') }}</span>
        </Transition>
      </p>
    </div>

    <div class="body__grid">
      <div class="body__card">
        <h3>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.body.blobs[0].title') }}</span>
          </Transition>
        </h3>
        <p>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.body.blobs[0].description') }}</span>
          </Transition>
        </p>
      </div>
      <div class="body__card">
        <h3>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.body.blobs[1].title') }}</span>
          </Transition>
        </h3>
        <p>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.body.blobs[1].description') }}</span>
          </Transition>
        </p>
      </div>
      <div class="body__card">
        <h3>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.body.blobs[2].title') }}</span>
          </Transition>
        </h3>
        <p>
          <Transition name="text" mode="out-in">
            <span :key="$i18n.locale">{{ $t('home.body.blobs[2].description') }}</span>
          </Transition>
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@include themify($themes) {
  .intro {
    background-color: themed('secondary');
  }
  .body {
    &__subtitle {
      color: themed('text');
    }
    &__title {
      color: themed('text');
    }
    &__content {
      color: themed('text');
    }
    &__card {
      h3,
      p {
        color: themed('text');
      }
    }
  }
}
.body {
  text-align: center;
  padding: 4rem 2rem;
  font-family: 'Inter', sans-serif;

  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__subtitle {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  &__content {
    @include opacityTransition;
  }
  &__description {
    font-size: 1rem;

    margin-bottom: 3rem;
    max-width: 40rem;
    margin-left: auto;
    margin-right: auto;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

  &__card {
    flex: 1 1 250px;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    padding: 1.5rem;
    text-align: left;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-weight: 600;
      margin-bottom: 1rem;
      font-family: 'Courier New', monospace;
    }

    p {
      font-size: 0.95rem;
    }
  }
}
</style>
