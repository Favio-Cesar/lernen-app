import { ref, computed, watch } from 'vue'
import { useStrapi } from '#imports'
import type { FieldOfStudy } from '~/interfaces/strapi/fields-of-studies'

/**
 * Composable para gestionar campos de estudio (suscripciones, búsqueda, etc.)
 */
export const useFieldsOfStudy = async () => {
  const { fetchUser } = useStrapiAuth()

  const user = await fetchUser()
  const { find, update } = useStrapi()

  const config = useRuntimeConfig()
  // Datos del usuario desde otro composable

  // ----------------------------
  // State
  // ----------------------------

  const fields = ref<FieldOfStudy[]>([]) // Todos los campos de estudio disponibles
  const subscribedFieldIds = ref<number[]>([]) // IDs de campos a los que el usuario está suscrito
  const expandedCard = ref<number | null>(null) // Índice de tarjeta expandida (UI)
  const searchQuery = ref('') // Query de búsqueda para filtrar campos

  // ----------------------------
  // Fetch de campos de estudio
  // ----------------------------

  const { data } = await find<FieldOfStudy>('fields-of-studies', {
    populate: ['bookCover'],
  })
  fields.value = data

  // ----------------------------
  // Watchers
  // ----------------------------

  // Actualiza los IDs de campos suscritos al cambiar el usuario
  watch(
    () => user.value?.fields_of_studies,
    (newFields) => {
      subscribedFieldIds.value = newFields?.map((f: any) => f.id) ?? []
    },
    { immediate: true },
  )

  // ----------------------------
  // Computed
  // ----------------------------

  const filteredFields = computed(() =>
    fields.value.filter((field) =>
      field.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )

  // ----------------------------
  // Helpers
  // ----------------------------

  const isSubscribed = (fieldId: number) => {
    return subscribedFieldIds.value.includes(fieldId)
  }

  const toggleExpand = (index: number) => {
    expandedCard.value = expandedCard.value === index ? null : index
  }

  // ----------------------------
  // Acciones
  // ----------------------------
  const client = useStrapiClient()

  const subscribe = async (fieldId: number) => {
    console.log('[subscribe] llamado con fieldId:', fieldId)

    if (!user.value || isSubscribed(fieldId)) return

    const newFields = [...subscribedFieldIds.value, fieldId]
    console.log('[subscribe] IDs antes de la actualización:', newFields)

    try {
      await update('users', user.value.id, {
        fields_of_studies: newFields.map((id) => ({ id })),
      })

      await fetchUser() // refresca el usuario
      subscribedFieldIds.value = newFields

      console.log('[subscribe] IDs actualizados localmente:', subscribedFieldIds.value)
    } catch (error) {
      console.error('[subscribe] Error:', error)
    }
  }

  const unsubscribe = async (fieldId: number) => {
    console.log('[unsubscribe] llamado con fieldId:', fieldId)

    if (!user.value) return

    const newFields = subscribedFieldIds.value.filter((id) => id !== fieldId)
    console.log('[unsubscribe] IDs antes de la actualización:', newFields)

    try {
      await update('users', user.value.id, {
        fields_of_studies: newFields.map((id) => ({ id })),
      })

      await fetchUser() // refresca el usuario
      subscribedFieldIds.value = newFields

      console.log('[unsubscribe] IDs actualizados localmente:', subscribedFieldIds.value)
    } catch (error) {
      console.error('[unsubscribe] Error:', error)
    }
  }

  // ----------------------------
  // Exposición del composable
  // ----------------------------

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
