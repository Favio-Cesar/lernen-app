// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie("UserSession"); // o el nombre de tu cookie de sesión

  // Si no hay sesión y no estás en /login, redirige
  if (!user.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
