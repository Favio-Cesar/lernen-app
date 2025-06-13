import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCookie, useStrapi } from '#imports'
import type { FieldOfStudy } from '~/interfaces/strapi/fields-of-studies'
import type { StrapiLocale } from '@nuxtjs/strapi'

export function useFieldNavigation() {
  const { t, locale } = useI18n()
  const route = useRoute()
  const fields = ref<FieldOfStudy[] | null>(null)
  const navItems = ref<
    { path: string; title: string; icon: string; longTitle?: string }[]
  >([])
  const isMenuOpen = ref(false)

  const fetchFields = async (localeCode: string) => {
    const jwt = useCookie('jwt')
    if (!jwt.value) {
      console.warn('No JWT token found')
      return
    }

    try {
      const strapi = useStrapi()

      const userResponse = await strapi.find('users/me', {
        populate: ['fields_of_studies'],
      })

      const userData = userResponse.data ?? userResponse
      const fieldIds = (userData as { fields_of_studies?: any[] }).fields_of_studies?.map(
        (f: any) => f.documentId,
      )

      if (!fieldIds || fieldIds.length === 0) return

      const { data } = await strapi.find('fields-of-studies', {
        filters: {
          documentId: {
            $in: fieldIds,
          },
        },
        locale: localeCode as StrapiLocale,
        publicationState: 'live',
      })

      const cleanFields = data
        ?.filter((item: any) => item.publishedAt !== null)
        ?.filter(
          (item: any, index: number, self: any[]) =>
            index === self.findIndex((i) => i.documentId === item.documentId),
        )

      fields.value = cleanFields as FieldOfStudy[]

      navItems.value = [
        ...cleanFields.map((field: any) => ({
          path: `/${field.title.toLowerCase().replace(/\s+/g, '-')}`,
          title: field.title,
          longTitle: field.longTitle,
          icon: field.iconCover,
        })),
        {
          path: '/more',
          title: t('more'),
          longTitle: t('more'),
          icon: 'fas fa-book',
        },
      ]
    } catch (error) {
      console.error('Failed to fetch fields_of_studies', error)
    }
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const shouldShowSelector = computed(() => !route.path.includes('/more'))

  onMounted(() => {
    fetchFields(locale.value)
  })

  watch(locale, (newLocale) => {
    fetchFields(newLocale)
  })

  return {
    t,
    locale,
    navItems,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    shouldShowSelector,
  }
}
