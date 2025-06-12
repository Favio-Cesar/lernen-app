import type { LanguageCode } from '@/types/common'
import { LANGUAGE, FLAGS } from '@/constants/languages'

const storedLanguage = localStorage.getItem(LANGUAGE) as LanguageCode | null

const DEFAULT_LANGUAGE = 'es'

const isValidLanguage = (lang: unknown): lang is LanguageCode => {
  const validLanguages = FLAGS.map((flag) => flag.value)
  return validLanguages.includes(lang as LanguageCode)
}

export const useLanguageStore = defineStore('language', () => {
  const language = ref<LanguageCode>(
    isValidLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE,
  )

  const getLanguage = computed(() => language.value)

  const setLanguage = async (lang: LanguageCode) => {
    language.value = lang
    localStorage.setItem(LANGUAGE, lang)
  }

  return { language, getLanguage, setLanguage }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLanguageStore, import.meta.hot))
}
