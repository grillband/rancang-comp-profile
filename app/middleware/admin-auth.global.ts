export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    try {
      const { authenticated } = await $fetch<{ authenticated: boolean }>('/api/auth/status')
      if (!authenticated) {
        return navigateTo('/admin/login')
      }
    } catch {
      return navigateTo('/admin/login')
    }
  }
})
