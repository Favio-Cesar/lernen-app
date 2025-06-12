export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  await authStore.checkAuth()

  const adminRoutes = ['user']
  const name = to.matched[0].name
  const pagina = typeof name === 'string' ? name.split('___')[0] : ''
  console.log('Middleware check:', isLoggedIn.value)

  if (adminRoutes.includes(pagina) && !isLoggedIn.value) {
    return navigateTo('/')
  }
})
