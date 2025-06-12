import i18nConfig from './config/i18n'
import { alias } from './config/alias'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: 'static',
  },
  alias,
  app: {
    baseURL: './',
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/scripts',
    '@nuxtjs/strapi',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
  ],
  i18n: {
    ...i18nConfig,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'es',
    },
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    admin: '/admin',
    version: 'v5',
    cookie: {},
    cookieName: 'jwt',
  },
  css: ['@/assets/styles/main.scss'],
  imports: {
    dirs: ['composables', 'utils'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData:
            '@use "@/assets/styles/reset.scss" as *;@use "@/assets/styles/_themes.scss" as *;@use "@/assets/styles/_mixins.scss" as *;@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      STRAPI_URL: process.env.STRAPI_URL,
      STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    },
  },
})
