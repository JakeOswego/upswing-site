// "Book a demo" form: posts to /api/demo, which emails the request.
(function () {
  var yr = document.getElementById('yr')
  if (yr) yr.textContent = new Date().getFullYear()

  var form = document.getElementById('demo-form')
  if (!form) return
  var btn = document.getElementById('send')
  var msg = document.getElementById('msg')

  function show(text, ok) {
    msg.textContent = text
    msg.className = 'msg ' + (ok ? 'ok' : 'err')
    msg.hidden = false
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    var data = Object.fromEntries(new FormData(form))
    if (!data.name.trim() || !data.company.trim() || !/^\S+@\S+\.\S+$/.test(data.email.trim())) {
      show('Please fill in your name, company and a valid email.', false)
      return
    }
    btn.disabled = true
    btn.textContent = 'Sending...'
    fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {} }).then(function (j) { return { ok: r.ok, j: j } }) })
      .then(function (res) {
        if (!res.ok) throw new Error(res.j.error || 'failed')
        form.reset()
        show("Thanks! We got your request and will reach out within one business day.", true)
      })
      .catch(function () {
        show("Sorry, that didn't go through. Please email jake@upswingpro.com instead.", false)
      })
      .finally(function () {
        btn.disabled = false
        btn.textContent = 'Request a demo'
      })
  })
})()
