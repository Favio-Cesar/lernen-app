import { ref } from 'vue'
import { useRuntimeConfig, useCookie } from '#imports'

export const useStrapiUser = () => {
  const user = ref<unknown>(null)

  const fetchUser = async () => {
    const jwt = useCookie('jwt')
    const config = useRuntimeConfig()

    if (!jwt.value) return

    try {
      const response = await $fetch(`${config.public.strapi.url}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt.value}`,
        },
        params: {
          populate: ['fields_of_studies'],
        },
      })

      console.log('User data:', response)
      user.value = response
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  return {
    user,
    fetchUser,
  }
}
