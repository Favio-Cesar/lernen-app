// plugins/i18n.ts
import { defineNuxtPlugin } from '#app'
import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(async (nuxtApp) => {
  const files = import.meta.glob('~/locales/**/*.json')
  const messages: Record<string, Record<string, string>> = {}

  for (const path in files) {
    const mod = (await files[path]()) as { default?: Record<string, unknown> }
    const match = path.match(/\/locales\/([a-zA-Z0-9-_]+)\/.+\.json$/)

    if (match) {
      const locale = match[1]
      if (!messages[locale]) {
        messages[locale] = {}
      }

      Object.assign(messages[locale] as object, mod.default || mod)
    }
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  })

  nuxtApp.vueApp.use(i18n)
})
