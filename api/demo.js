// Vercel function: emails a "Book a demo" request through Resend.
// Env vars (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  Resend key with sending access for upswingpro.com (Secret)
//   DEMO_TO         where requests go (optional, default jake@upswingpro.com)

const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })
  let b = req.body || {}
  if (typeof b === 'string') { try { b = JSON.parse(b) } catch { b = {} } }

  // Bots fill the hidden "website" field; pretend it worked.
  if (b.website) return res.status(200).json({ ok: true })

  const f = {
    name: clean(b.name, 100),
    company: clean(b.company, 120),
    email: clean(b.email, 200),
    phone: clean(b.phone, 40),
    trade: clean(b.trade, 40),
    size: clean(b.size, 20),
    note: String(b.note ?? '').trim().slice(0, 2000),
  }
  if (!f.name || !f.company || !/^\S+@\S+\.\S+$/.test(f.email)) {
    return res.status(400).json({ error: 'Name, company and email are required.' })
  }
  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(500).json({ error: 'Email is not set up yet.' })

  const rows = [
    ['Name', f.name], ['Company', f.company], ['Email', f.email], ['Phone', f.phone || '-'],
    ['Trade', f.trade], ['Team size', f.size], ['Notes', f.note || '-'],
  ]
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html = `<h2>New demo request</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'UpSwing <no-reply@upswingpro.com>',
      to: [process.env.DEMO_TO || 'jake@upswingpro.com'],
      reply_to: f.email,
      subject: `Demo request: ${f.company} (${f.name})`,
      text,
      html,
    }),
  })
  if (!r.ok) {
    console.error('Resend error', r.status, await r.text())
    return res.status(502).json({ error: 'Could not send right now.' })
  }
  return res.status(200).json({ ok: true })
}
