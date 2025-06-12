import type { ModuleOptions } from '@nuxtjs/i18n'

export default {
  lazy: true,
  defaultLocale: 'es',
  langDir: 'locales/',
  locales: [
    { code: 'es', file: 'es.json' },
    { code: 'en', file: 'en.json' },
  ],
  strategy: 'no_prefix',
} as Partial<ModuleOptions>
