import { useAdminStore } from "~/pinaGlobal/admin"

export default defineNuxtRouteMiddleware((to, from) => {
  // Only target /admin routes
  if (to.path.startsWith("/admin")) {
    const adminStore = useAdminStore()
    const isAuthenticated = adminStore.initAdminAuth()

    // If navigating to /admin/login and already authenticated, send to dashboard
    if (to.path === "/admin/login") {
      if (isAuthenticated) {
        return navigateTo("/admin")
      }
      return
    }

    // For all other /admin routes, require authentication
    if (!isAuthenticated) {
      return navigateTo("/admin/login")
    }
  }
})

