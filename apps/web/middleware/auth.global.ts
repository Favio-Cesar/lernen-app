export default defineNuxtRouteMiddleware(async (to) => {
  const jwtCookie = useCookie('jwtToken')
  const jwt = jwtCookie.value

  if (!jwt && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (jwt) {
    try {
      await $fetch('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      if (to.path === '/login') {
        return navigateTo('/')
      }

      return
    } catch (error) {
      // Borrar cookie correctamente en SSR
      jwtCookie.value = null
      console.error('Error fetching user:', error)
      return navigateTo('/login')
    }
  }
})
