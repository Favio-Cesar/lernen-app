import { defineNuxtPlugin } from "#app";
import { createI18n } from "vue-i18n";
import login from "~/locales/en/login.json";
import layout from "~/locales/en/layout.json";

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: {
      en: {
        ...login,
        ...layout,
      },
    },
  });

  nuxtApp.vueApp.use(i18n);
});
