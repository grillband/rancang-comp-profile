const mimeTypes: Record<string, string> = {
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
}

export default defineEventHandler(async (event) => {
  const path = event.path.replace('/uploads/', '')

  try {
    const env = event.context?.cloudflare?.env ?? process.env
    if (env?.UPLOADS_R2) {
      const object = await env.UPLOADS_R2.get(path)
      if (object) {
        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        return new Response(object.body, { headers })
      }
    }
  } catch {}

  throw createError({ statusCode: 404, message: 'File not found' })
})
