/**
 * app/api/send-email/route.js  — Next.js App Router
 *
 * Receives the chat transcript and emails it to the admin.
 *
 * Required env vars (add to .env.local):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL
 *
 * Install dependency:  npm install nodemailer
 */

import { NextResponse } from 'next/server'
// nodemailer is loaded dynamically so static export builds succeed without it installed.
// Run  npm install nodemailer  when deploying to a server environment.

/* ── Reject non-POST ── */
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { transcript, visitorEmail } = body

  if (!transcript || !Array.isArray(transcript)) {
    return NextResponse.json({ error: 'transcript is required and must be an array' }, { status: 400 })
  }

  /* ── Build HTML email ── */
  const dateStr = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const messageRows = transcript
    .map((msg) => {
      const isUser = msg.role === 'user'
      const borderColor = isUser ? '#F97316' : '#1B3A6B'
      const label = isUser ? 'Visitor' : 'OctaUnitech Bot'
      const safeTxt = (msg.text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>')
        // render **bold**
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      return `
        <div style="
          margin-bottom:12px;
          padding:12px 16px;
          border-left:4px solid ${borderColor};
          background:#fafafa;
          border-radius:0 8px 8px 0;
        ">
          <div style="font-size:11px;color:#8A97B0;margin-bottom:4px;">
            <strong style="color:${borderColor};">${label}</strong>
            ${msg.time ? `&nbsp;·&nbsp;${msg.time}` : ''}
          </div>
          <div style="font-size:14px;color:#1B3A6B;line-height:1.6;">
            ${safeTxt}
          </div>
        </div>`
    })
    .join('\n')

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td>
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08);">

        <!-- Header -->
        <div style="background:#1B3A6B;padding:24px 28px;">
          <h1 style="margin:0;font-size:18px;color:#ffffff;font-weight:700;">
            New Chat Lead — OctaUnitech
          </h1>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,.65);">
            Chatbot transcript
          </p>
        </div>

        <!-- Meta -->
        <div style="padding:20px 28px;border-bottom:1px solid #f0f0f0;background:#fafafa;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:13px;color:#8A97B0;padding-right:12px;padding-bottom:6px;">Date &amp; Time</td>
              <td style="font-size:13px;color:#1B3A6B;font-weight:600;padding-bottom:6px;">${dateStr}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#8A97B0;padding-right:12px;">Visitor Email</td>
              <td>
                <a href="mailto:${visitorEmail || 'unknown'}"
                   style="font-size:14px;color:#F97316;font-weight:700;text-decoration:none;">
                  ${visitorEmail || 'Not provided'}
                </a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Transcript -->
        <div style="padding:24px 28px;">
          <h2 style="margin:0 0 16px;font-size:14px;color:#1B3A6B;text-transform:uppercase;letter-spacing:.06em;">
            Conversation Transcript
          </h2>
          ${messageRows}
        </div>

        <!-- Footer -->
        <div style="padding:16px 28px;border-top:1px solid #f0f0f0;background:#fafafa;text-align:center;">
          <p style="margin:0;font-size:12px;color:#8A97B0;">
            Sent by <strong style="color:#1B3A6B;">OctaUnitech chatbot</strong>
            &nbsp;·&nbsp;
            <a href="https://www.octaunitech.com" style="color:#F97316;text-decoration:none;">
              www.octaunitech.com
            </a>
          </p>
        </div>

      </div>
    </td></tr>
  </table>
</body>
</html>`

  /* ── Send via Nodemailer (dynamic import) ── */
  const nodemailer = (await import('nodemailer')).default
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"OctaUnitech Chatbot" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: visitorEmail || undefined,
      subject: `New Chat Lead — ${visitorEmail || 'unknown visitor'}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[send-email] SMTP error:', err)
    return NextResponse.json({ error: 'Failed to send email', detail: err.message }, { status: 500 })
  }
}

/* ──────────────────────────────────────────────────────────────
   PAGES ROUTER VERSION  (for reference — not used in this project)
   Would live at:  pages/api/send-email.js
   ──────────────────────────────────────────────────────────────

import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  const { transcript, visitorEmail } = req.body
  if (!transcript || !Array.isArray(transcript)) {
    return res.status(400).json({ error: 'transcript is required' })
  }

  // ... build same HTML string as above ...

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: `"OctaUnitech Chatbot" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: visitorEmail || undefined,
      subject: `New Chat Lead — ${visitorEmail || 'unknown visitor'}`,
      html,   // same html variable built above
    })
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[send-email]', err)
    return res.status(500).json({ error: err.message })
  }
}
*/
