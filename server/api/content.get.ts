import defaultContent from '../data/content.json'

export default defineEventHandler(async (event) => {
  try {
    const env = event.req?.runtime?.cloudflare?.env
    if (env?.CONTENT_KV) {
      const data = await env.CONTENT_KV.get('content', { type: 'json' })
      if (data) return data
    }
  } catch {}

  return defaultContent
})
