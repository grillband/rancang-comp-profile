import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'admin-session')
  if (session !== 'authenticated') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)

  // Cloudflare Workers: use KV
  try {
    const env = event.req?.runtime?.cloudflare?.env
    if (env?.CONTENT_KV) {
      await env.CONTENT_KV.put('content', JSON.stringify(body))
      return { success: true }
    }
  } catch {}

  // Local / Node.js: write to file
  try {
    const dataDir = join(process.cwd(), 'server', 'data')
    await mkdir(dataDir, { recursive: true })
    await writeFile(join(dataDir, 'content.json'), JSON.stringify(body, null, 2), 'utf-8')
    return { success: true }
  } catch (e) {
    throw createError({ statusCode: 500, message: 'Failed to save content' })
  }
})
