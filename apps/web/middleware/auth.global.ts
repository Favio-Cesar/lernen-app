// middleware/auth.global.ts

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    // Correcto para Nuxt 3
    const jwt = localStorage.getItem("jwt"); // Obtener el JWT desde localStorage

    console.log("JWT en localStorage:", jwt); // Verifica que el JWT esté guardado correctamente

    // Si no hay JWT y no estás en /login, redirige al login
    if (!jwt && to.path !== "/login") {
      console.log("Redirigiendo a /login");
      return navigateTo("/login");
    }

    // Si ya hay JWT y estás en la página de login, redirige al home o dashboard
    if (jwt && to.path === "/login") {
      console.log("Redirigiendo al home desde login");
      return navigateTo("/"); // O redirige a donde tenga sentido
    }
  }
});
