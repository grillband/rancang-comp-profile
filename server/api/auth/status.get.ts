export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'admin-session')
  return { authenticated: session === 'authenticated' }
})
