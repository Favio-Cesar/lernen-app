export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const jwt = useCookie('jwt')
  const route = useRoute()

  const adminRoutes = ['user']

  const checkAuth = async () => {
    if (jwt.value) {
      try {
        await $fetch('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${jwt.value}`,
          },
        })
        isLoggedIn.value = true
        console.log('Logged in!')
      } catch {
        jwt.value = null
        isLoggedIn.value = false
        console.log('FAIL LOGIN!')
      }
    } else {
      isLoggedIn.value = false
      console.log('NO JWT!')
    }
  }

  if (import.meta.client) {
    checkAuth()

    watch(jwt, async () => {
      await checkAuth()

      const name = route.matched[0]?.name
      const pagina = typeof name === 'string' ? name.split('___')[0] : ''
      if (adminRoutes.includes(pagina) && !isLoggedIn.value) {
        navigateTo('/')
      }
    })
  }

  const logout = () => {
    jwt.value = null
    isLoggedIn.value = false
    if (import.meta.client) {
      navigateTo('/')
    }
  }

  return { isLoggedIn, checkAuth, logout }
})
