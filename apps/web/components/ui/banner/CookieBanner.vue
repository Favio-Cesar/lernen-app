<script setup lang="ts">
import type { CookiesModalLocales } from '@/interfaces/web/cookiesModal'
const { setCookiesAccepted } = useCookies()
const { t } = useI18n<CookiesModalLocales>()
const cookiesText = {
  cookies_text: t('cookies.cookies_text'),
  more_info: t('cookies.more_info'),
  accept_cookies: t('cookies.accept_cookies'),
}
</script>
<template>
  <section v-if="cookiesText" class="banner-cookies">
    <span>{{ cookiesText.cookies_text }}</span>
    <div class="banner-cookies__actions">
      <NuxtLinkLocale :to="{ name: 'politica-cookies' }" class="banner-cookies__info">
        {{ cookiesText.more_info }}
      </NuxtLinkLocale>
      <button class="banner-cookies__accept" @click="setCookiesAccepted">
        {{ cookiesText.accept_cookies }}
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner-cookies {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem;
  border-radius: 0.25rem;
  z-index: 20;
  margin: 1rem;
  background-color: var(--c-static-graphite);
  color: var(--c-static-white);
  font-family: var(--f-font-extraLight);
  box-shadow:
    0 0.1875rem 0.3125rem -0.0625rem rgba(0, 0, 0, 0.2),
    0 0.375rem 0.625rem 0 rgba(0, 0, 0, 0.14),
    0 0.0625rem 1.125rem 0 rgba(0, 0, 0, 0.12);
  @include flex($justify: flex-start, $wrap: wrap, $gap: 0.5rem);
  @include responsive(48rem) {
    margin: 0.5rem;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 0;
    gap: 0.625rem;
  }
  &__info,
  &__accept {
    color: var(--c-primary);
    font-size: 0.8125rem;
    cursor: pointer;
    padding: 0 0.25rem;
    margin: 0.5rem 0;
  }
}
</style>
