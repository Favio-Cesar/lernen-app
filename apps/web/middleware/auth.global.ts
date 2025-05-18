export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const jwt = localStorage.getItem('jwt')
    if (!jwt && to.path !== '/login') {
      return navigateTo('/login')
    }

    if (jwt && to.path === '/login') {
      return navigateTo('/')
    }
  }
})
