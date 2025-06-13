<script setup lang="ts">
const { cookiesAccepted, checkCookiesAccepted } = useCookies()

const theme = ref('light')

onMounted(() => {
  checkCookiesAccepted()
  const html = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  theme.value = prefersDark ? 'dark' : 'light'
  html.classList.add(theme.value)
})
</script>
<template>
  <div :class="`${theme}-theme`">
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </div>

  <Transition name="alert">
    <UiBannerCookieBanner v-if="!cookiesAccepted" />
  </Transition>
</template>
<style lang="scss">
@import 'flag-icons/css/flag-icons.min.css';
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
