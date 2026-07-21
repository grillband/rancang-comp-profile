export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'admin-session')
  if (session !== 'authenticated') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)

  try {
    const env = event.req?.runtime?.cloudflare?.env
    if (env?.CONTENT_KV) {
      await env.CONTENT_KV.put('content', JSON.stringify(body))
      return { success: true }
    }
  } catch {}

  throw createError({ statusCode: 500, message: 'Storage not available' })
})
