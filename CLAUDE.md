# UpSwing website (upswingpro.com)

Public sales site for UpSwing (Academy + Pulse), aimed at home service
companies in general (not only plumbing/HVAC/electrical). The demo form's
trade is free text with suggestions (`datalist`). The apps live elsewhere:
Academy at app.upswingpro.com (repo `JakeOswego/Upswing-Academy`, which has the
product notes in its CLAUDE.md), Pulse at app.upswingpro.com/dashboard.

- Plain HTML + CSS, no build step: `index.html`, `story.html` (Our story),
  `styles.css`, `demo.js` (form + footer year), `favicon.svg` (same logo as
  the app). Colors match the app (accent `#1f7a5a`). Light only (owner's choice): no
  dark-mode styles, `color-scheme: light`.
- `api/demo.js` (Vercel function): "Book a demo" form → email through Resend
  from `no-reply@upswingpro.com` to `DEMO_TO` (default `jake@upswingpro.com`),
  reply-to = the visitor. Needs Vercel env var `RESEND_API_KEY` (Secret).
  Hidden `website` field is a bot trap.
- `vercel.json`: clean URLs (`/story`). Domains are set in Vercel: www.upswingpro.com is the main address and upswingpro.com redirects to it (Vercel's setting; don't add a redirect here too or they loop).
- Repo is public on purpose (no secrets in it) so Claude's commits deploy on
  the Vercel Hobby plan.
- Copy rules: UpSwing is a blank canvas: say "your sales process", "your
  training"; never imply it comes pre-loaded (only a few starter templates).
  Only describe features the app has today. No emojis. Pricing section (`#pricing`): priced by field people
  (techs + reps), managers/office free, everything included: Starter $299
  (≤10), Team $499 (11–25), Company $799 (26–50), Enterprise custom (51+ /
  multi-location); yearly = 2 months free; setup help from $1,500. The founding-company offer is off the site (owner's choice: it
  reads as a startup); it's offered privately in sales conversations.
- Owner: Jake Wetherbee, founder, sales manager, ~20 years in the trades.
  Email `jake@upswingpro.com` (Cloudflare Email Routing catch-all → the
  UpSwing Gmail). No phone number on the site.
- Offline is not a headline (owner's call): only the FAQ mentions it.
  Wording must stay honest: only items saved with "Save for offline"
  open with no signal; courses, quizzes and progress need a connection.
  Sales come in by importing the CRM's sales report (direct CRM
  connections are "on the way", not available). FAQ section `#faq` answers
  sales import, no signal, adoption, setup (about two weeks) and contracts.
- Example screens use the made-up demo company "Summit Plumbing & Air".
