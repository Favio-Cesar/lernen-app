import { alias } from "./config/alias";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: "static",
  },
  alias,
  app: {
    baseURL: "./",
  },
  plugins: ["~/locales/i18n.ts"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@nuxt/fonts",
    "@nuxt/scripts",
  ],
  css: ["@/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData:
            '@use "~/assets/styles/_variables.scss" as *;@use "~/assets/styles/_mixins.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      STRAPI_URL: process.env.STRAPI_URL,
    },
  },
});
