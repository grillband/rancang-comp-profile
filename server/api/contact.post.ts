import defaultContent from '../data/content.json'

interface ContactBody {
  name: string
  email: string
  message: string
}

function validate(body: any): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') return { valid: false, error: 'Invalid request body' }
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) return { valid: false, error: 'Name is required' }
  if (!body.email || typeof body.email !== 'string') return { valid: false, error: 'Email is required' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return { valid: false, error: 'Invalid email format' }
  if (!body.message || typeof body.message !== 'string' || !body.message.trim()) return { valid: false, error: 'Message is required' }
  return { valid: true }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)
  const validation = validate(body)
  if (!validation.valid) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', message: validation.error })
  }

  const submission = {
    name: body.name.trim(),
    email: body.email.trim(),
    message: body.message.trim(),
    submittedAt: new Date().toISOString(),
    ip: getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || '',
  }

  const env = event.context?.cloudflare?.env ?? process.env

  // Save to KV
  try {
    if (env?.CONTENT_KV) {
      const existing = await env.CONTENT_KV.get('contact:submissions', { type: 'json' }) as any[] | null
      const submissions = Array.isArray(existing) ? existing : []
      submissions.push(submission)
      await env.CONTENT_KV.put('contact:submissions', JSON.stringify(submissions))
    } else {
      console.log('[contact] Submission received (KV not available):', submission)
    }
  } catch (e) {
    console.error('[contact] Failed to save to KV:', e)
  }

  // Send notification via webhook (Discord / Slack / generic)
  const webhookUrl = env.CONTACT_WEBHOOK_URL
  if (webhookUrl) {
    try {
      const isDiscord = webhookUrl.includes('discord.com/api/webhooks')
      const isSlack = webhookUrl.includes('hooks.slack.com')
      const dateStr = new Date(submission.submittedAt).toLocaleString()

      let body: any

      if (isDiscord) {
        body = {
          embeds: [{
            title: 'New Contact Form Submission',
            color: 0x3b82f6,
            fields: [
              { name: 'Name', value: submission.name, inline: true },
              { name: 'Email', value: submission.email, inline: true },
              { name: 'Date', value: dateStr, inline: false },
              { name: 'Message', value: submission.message, inline: false },
            ],
            timestamp: submission.submittedAt,
          }],
        }
      } else if (isSlack) {
        body = {
          blocks: [
            { type: 'header', text: { type: 'plain_text', text: '📬 New Contact Form Submission' } },
            { type: 'section', fields: [
              { type: 'mrkdwn', text: `*Name:*\n${submission.name}` },
              { type: 'mrkdwn', text: `*Email:*\n${submission.email}` },
            ]},
            { type: 'section', fields: [
              { type: 'mrkdwn', text: `*Date:*\n${dateStr}` },
            ]},
            { type: 'section', text: { type: 'mrkdwn', text: `*Message:*\n${submission.message}` } },
          ],
        }
      } else {
        body = {
          text: `New Contact: ${submission.name} <${submission.email}> — ${submission.message}`,
        }
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        console.error('[contact] Webhook returned', res.status, await res.text().catch(() => ''))
      }
    } catch (e: any) {
      console.error('[contact] Failed to send webhook:', e.message)
    }
  } else {
    console.log('[contact] No webhook configured — set CONTACT_WEBHOOK_URL to get notified.')
  }

  return { success: true, message: 'Thank you! We will get back to you soon.' }
})
