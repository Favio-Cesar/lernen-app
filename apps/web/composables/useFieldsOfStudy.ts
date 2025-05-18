import { ref, computed } from 'vue'
import { useStrapi } from '#imports'
import type { FieldOfStudy } from '~/interfaces/strapi/fields-of-studies'
import { useStrapiUser } from './useStrapiUser'

export const useFieldsOfStudy = async () => {
  const { find, update } = useStrapi()
  const config = useRuntimeConfig()
  const { user, refreshUser } = await useStrapiUser()

  const fields = ref<FieldOfStudy[]>([])
  const expandedCard = ref<number | null>(null)
  const searchQuery = ref('')

  const { data } = await find<FieldOfStudy>('fields-of-studies', {
    populate: ['bookCover'],
  })

  fields.value = data

  const filteredFields = computed(() =>
    fields.value.filter((field) =>
      field.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )

  const subscribedFieldIds = ref<number[]>(
    user.value?.fields_of_studies?.map((f: unknown) => f.id) ?? [],
  )

  const isSubscribed = (fieldId: number) => subscribedFieldIds.value.includes(fieldId)

  const subscribe = async (fieldId: number) => {
    if (!user.value || isSubscribed(fieldId)) return

    const newFields = [...subscribedFieldIds.value, fieldId]

    await update('plugin::users-permissions.user', user.value.id.toString(), {
      fields_of_studies: newFields.map((id) => ({ id })),
    })

    await refreshUser()
    subscribedFieldIds.value = user.value.fields_of_studies.map((f: unknown) => f.id)
  }

  const unsubscribe = async (fieldId: number) => {
    if (!user.value) return

    const newFields = subscribedFieldIds.value.filter((id) => id !== fieldId)

    await update('plugin::users-permissions.user', user.value.id.toString(), {
      fields_of_studies: newFields.map((id) => ({ id })),
    })

    await refreshUser()
    subscribedFieldIds.value = user.value.fields_of_studies.map((f: unknown) => f.id)
  }

  const toggleExpand = (index: number) => {
    expandedCard.value = expandedCard.value === index ? null : index
  }

  return {
    fields,
    filteredFields,
    searchQuery,
    expandedCard,
    toggleExpand,
    isSubscribed,
    subscribe,
    unsubscribe,
    config,
  }
}
