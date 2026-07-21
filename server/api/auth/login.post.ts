export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  const config = useRuntimeConfig()

  if (password === config.adminPassword) {
    setCookie(event, 'admin-session', 'authenticated', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'lax',
    })
    return { success: true }
  }

  throw createError({ statusCode: 401, message: 'Invalid password' })
})
