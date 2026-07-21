export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'admin-session')
  if (session !== 'authenticated') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = formData[0]
  if (!file.filename) {
    throw createError({ statusCode: 400, message: 'No filename provided' })
  }

  const ext = file.filename.replace(/^.*\./, '')
  const baseName = file.filename.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-')
  const finalName = `${baseName}-${Date.now()}.${ext}`

  try {
    const env = event.req?.runtime?.cloudflare?.env
    if (env?.UPLOADS_R2) {
      await env.UPLOADS_R2.put(finalName, file.data, {
        httpMetadata: { contentType: file.type },
      })
      return { url: `/uploads/${finalName}` }
    }
  } catch {}

  throw createError({ statusCode: 500, message: 'Storage not available' })
})
