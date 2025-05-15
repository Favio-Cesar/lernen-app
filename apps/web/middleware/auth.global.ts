export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const jwt = localStorage.getItem('jwt')

    console.log('JWT en localStorage:', jwt)

    if (!jwt && to.path !== '/login') {
      console.log('Redirigiendo a /login')
      return navigateTo('/login')
    }

    if (jwt && to.path === '/login') {
      console.log('Redirigiendo al home desde login')
      return navigateTo('/')
    }
  }
})
