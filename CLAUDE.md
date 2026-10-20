# UpSwing website (upswingpro.com)

Public sales site for UpSwing (Academy + Pulse). The apps live elsewhere:
Academy at app.upswingpro.com (repo `JakeOswego/Upswing-Academy`, which has the
product notes in its CLAUDE.md), Pulse at app.upswingpro.com/dashboard.

- Plain HTML + CSS, no build step: `index.html`, `story.html` (Our story),
  `styles.css`, `demo.js` (form + footer year), `favicon.svg` (same logo as
  the app). Colors match the app (accent `#1f7a5a`).
- `api/demo.js` (Vercel function): "Book a demo" form → email through Resend
  from `no-reply@upswingpro.com` to `DEMO_TO` (default `jake@upswingpro.com`),
  reply-to = the visitor. Needs Vercel env var `RESEND_API_KEY` (Secret).
  Hidden `website` field is a bot trap.
- `vercel.json`: clean URLs (`/story`). Domains are set in Vercel: www.upswingpro.com is the main address and upswingpro.com redirects to it (Vercel's setting; don't add a redirect here too or they loop).
- Repo is public on purpose (no secrets in it) so Claude's commits deploy on
  the Vercel Hobby plan.
- Copy rules: UpSwing is a blank canvas: say "your sales process", "your
  training"; never imply it comes pre-loaded (only a few starter templates).
  Only describe features the app has today. No emojis. Pricing is not shown
  yet ("founding companies, talk to us").
- Owner: Jake Wetherbee, founder, sales manager, ~20 years in the trades.
  Email `jake@upswingpro.com` (Cloudflare Email Routing catch-all → the
  UpSwing Gmail). No phone number on the site.
- Example screens use the made-up demo company "Summit Plumbing & Air".
