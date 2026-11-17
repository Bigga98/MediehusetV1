/* Felles logikk for skjema-delsidene.
   - ?a=<annonsenr> fra annonsen styrer stripen/løftet og sendes med som skjult felt
   - Firmanavn slås opp i Enhetsregisteret (data.brreg.no), orgnr følger med
   - Innsending: Supabase (leads) + FormSubmit-e-post, som kontaktskjemaet på forsiden
   - Meta Pixel: «Lead» når skjemaet er sendt */
(function () {
  var SUPABASE_URL = 'https://seevzkxodkvgiffanacg.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZXZ6a3hvZGt2Z2lmZmFuYWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDUzODksImV4cCI6MjA4NTk4MTM4OX0.bGUpZQk1xDSVrinv9YzaeZHHHJyhKpf_54ywZyHWt6g';
  var CAL_URL = 'https://cal.com/birger-bratli-356xiz/uforpliktet-møte';

  var params = new URLSearchParams(location.search);
  var ad = (params.get('a') || '').replace(/\D/g, '');

  // Løftet fra annonsen (samme tekster som i Figma)
  var PROMISE = {
    '7': 'Ingen betaling før første befaring',
    '8': 'Nettsiden er inkludert i annonsepakken', '9': 'Nettsiden er inkludert i annonsepakken',
    '1': 'Vi får bare betalt når du får befaringer', '3': 'Vi får bare betalt når du får befaringer',
    '4': 'Vi får bare betalt når du får befaringer', '11': 'Vi får bare betalt når du får befaringer',
    '12': 'Vi får bare betalt når du får befaringer', '13': 'Vi får bare betalt når du får befaringer',
    '5': '229 kr i måneden · ingen forskudd', '6': 'Du betaler ikke før siden er ferdig',
    '2': 'Nettside for håndverksbedrifter', '10': 'Nettside for håndverksbedrifter',
    '14': 'Nettside for håndverksbedrifter', '15': 'Nettside for håndverksbedrifter'
  };
  document.querySelectorAll('[data-promise]').forEach(function (el) {
    if (PROMISE[ad]) { el.textContent = PROMISE[ad]; } else if (el.dataset.promise === 'hide') { el.closest('.sk-label').style.visibility = 'hidden'; }
  });

  // Brønnøysund-oppslag
  document.querySelectorAll('[data-org]').forEach(function (wrap) {
    var input = wrap.querySelector('input'), list = wrap.querySelector('.sk-org__list'), hidden = wrap.querySelector('[name="orgnr"]');
    var timer;
    input.addEventListener('input', function () {
      hidden.value = '';
      clearTimeout(timer);
      var q = input.value.trim();
      if (q.length < 3) { list.classList.remove('is-open'); return; }
      timer = setTimeout(function () {
        fetch('https://data.brreg.no/enhetsregisteret/api/enheter?size=5&navn=' + encodeURIComponent(q))
          .then(function (r) { return r.json(); })
          .then(function (d) {
            var rows = (d._embedded && d._embedded.enheter) || [];
            list.innerHTML = '';
            rows.forEach(function (e) {
              var b = document.createElement('button'); b.type = 'button';
              var sted = e.forretningsadresse ? (e.forretningsadresse.poststed || '') : '';
              b.innerHTML = '';
              b.appendChild(document.createTextNode(e.navn));
              var s = document.createElement('small'); s.textContent = 'Org.nr. ' + e.organisasjonsnummer + (sted ? ' · ' + sted : ''); b.appendChild(s);
              b.addEventListener('click', function () { input.value = e.navn; hidden.value = e.organisasjonsnummer + (sted ? ' (' + sted + ')' : ''); list.classList.remove('is-open'); });
              list.appendChild(b);
            });
            list.classList.toggle('is-open', rows.length > 0);
          })
          .catch(function () { list.classList.remove('is-open'); });
      }, 250);
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) list.classList.remove('is-open'); });
  });

  // Hjelper: samle skjemaet til tekst
  function collect(form) {
    var out = [], seen = {};
    form.querySelectorAll('[data-q]').forEach(function (el) {
      var key = el.dataset.q; if (seen[key]) return; seen[key] = 1;
      var vals = [];
      form.querySelectorAll('[name="' + el.name + '"]').forEach(function (i) {
        if ((i.type === 'radio' || i.type === 'checkbox') ? i.checked : i.value.trim()) vals.push(i.value.trim());
      });
      if (vals.length) out.push(key + ': ' + vals.join(', '));
    });
    return out;
  }

  // Innsending
  window.mgSkjema = function (form, opts) {
    var btn = form.querySelector('[type="submit"]'), err = form.querySelector('.sk-error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.fax_nr && form.fax_nr.value) { document.body.classList.add('is-sent'); return; } // bot-felle
      var phone = (form.telefon ? form.telefon.value : '').replace(/\D/g, '');
      var name = form.navn ? form.navn.value.trim() : '';
      var firma = form.firma ? form.firma.value.trim() : '';
      var email = form.epost ? form.epost.value.trim() : '';
      if (opts.requireChoices) {
        var missing = opts.requireChoices.filter(function (n) { return !form.querySelector('[name="' + n + '"]:checked'); });
        if (missing.length) { err.textContent = 'Svar på spørsmålene over.'; return; }
      }
      // Samme rekkefølge som feltene står i på sidene: firma, telefon, e-post
      if (opts.requireFirma && firma.length < 2) { err.textContent = 'Fyll inn firmanavnet.'; return; }
      if ((opts.requirePhone || !opts.requireEmail) && phone.length < 8) { err.textContent = 'Fyll inn et gyldig telefonnummer.'; return; }
      if (opts.requireEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { err.textContent = 'Fyll inn en gyldig e-postadresse.'; return; }
      if (opts.requireName && name.length < 2) { err.textContent = 'Fyll inn navnet ditt.'; return; }
      err.textContent = '';
      var lines = collect(form);
      if (form.orgnr && form.orgnr.value) lines.push('Org.nr.: ' + form.orgnr.value);
      lines.push('Annonse: ' + (ad || 'ingen (direkte)'));
      var reject = opts.isReject ? opts.isReject(form) : false;
      if (reject) lines.push('UTFALL: Avslag – har ikke kapasitet nå');
      var message = lines.join('\n');
      btn.disabled = true; var t = btn.textContent; btn.textContent = 'Sender...';
      // Takk-siden og Lead vises så snart henvendelsen er lagret (Supabase svarer på ~1 sek).
      // E-posten via FormSubmit går i bakgrunnen – den kan bruke over et minutt.
      // Feiler lagringen, venter vi på e-posten i stedet, så henvendelsen ikke går tapt.
      var done = false;
      var success = function () {
        if (done) return; done = true;
        if (!reject) { if (window.mgLead) mgLead({ content_name: opts.label, ad: ad || '', email: email, phone: phone }); else if (window.fbq) fbq('track', 'Lead', { content_name: opts.label, ad: ad || '' }); }
        if (opts.onSent) opts.onSent(form);
        document.body.classList.add('is-sent');
        if (reject) document.body.classList.add('is-reject');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      var fail = function () { btn.disabled = false; btn.textContent = t; err.textContent = 'Noe gikk galt. Prøv igjen, eller ring oss på 481 18 680.'; };
      var data = new FormData();
      data.append('name', name || firma); if (email) data.append('email', email); if (phone) data.append('phone', phone); data.append('message', message);
      data.append('_subject', (reject ? 'Avslag fra ' : 'Ny lead fra ') + opts.label + ': ' + (firma || name));
      data.append('_captcha', 'false');
      var mail = fetch('https://formsubmit.co/ajax/birbra.bb@gmail.com', { method: 'POST', body: data, keepalive: true })
        .then(function (r) { if (!r.ok) throw new Error(); });
      fetch(SUPABASE_URL + '/rest/v1/leads', {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ name: name || firma, email: email, website: form.nettside ? form.nettside.value.trim() : '', message: message, service_type: opts.service, source: opts.source + (ad ? '-a' + ad : '') })
      })
        .then(function (r) { if (!r.ok) throw new Error(); success(); })
        .catch(function () { mail.then(success).catch(fail); });
    });
  };
  document.querySelectorAll('[data-cal]').forEach(function (a) { a.href = CAL_URL; });
})();
