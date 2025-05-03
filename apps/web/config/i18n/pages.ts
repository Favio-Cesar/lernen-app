import type { ModuleOptions } from '@nuxtjs/i18n'

export const pages: ModuleOptions['pages'] = {
  contacto: {
    es: '/contacto',
    en: '/contact',
    'pt-BR': '/contato',
  },
  contenidos: {
    es: '/contenidos',
    en: '/contents',
    'pt-BR': '/conteudos',
  },
  expertos: {
    es: '/expertos',
    en: '/experts',
    'pt-BR': '/especialistas',
  },
  'plan-site': {
    es: '/plan-site',
    en: '/plan-site',
    'pt-BR': '/plan-site',
  },
  'dental-procedures-simulator': {
    es: '/dental-procedures-simulator',
    en: '/dental-procedures-simulator',
    'pt-BR': '/dental-procedures-simulator',
  },
  'videos-3d-formacion-dental': {
    es: '/videos-3d-formacion-dental',
    en: '/videos-3d-dental-training',
    'pt-BR': '/videos-de-treinamento-odontologico-em-3d',
  },
  partners: {
    es: '/partners',
    en: '/partners',
    'pt-BR': '/parceiros',
  },
  series: {
    es: '/series',
    en: '/series',
    'pt-BR': '/series',
  },
  account: {
    es: '/mi-cuenta',
    en: '/my-account',
    'pt-BR': '/minha-conta',
  },
}

export const i18nConfig: Partial<ModuleOptions> = {
  customRoutes: 'config',
  defaultLocale: 'es',
  pages,
  strategy: 'prefix_and_default',
}
