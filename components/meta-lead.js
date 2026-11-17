/* Meta «Lead» fra to kilder med samme event-ID, så Meta teller hver henvendelse én gang:
   1) Pikselen i nettleseren (fbq)
   2) Conversions API fra serveren (Supabase-funksjonen meta-capi), som ikke stoppes av
      reklameblokkere eller personvern i nettleseren.
   Bruk: mgLead({ content_name, ad, email, phone }) når et skjema er sendt.
   Test i Events Manager: legg til ?test_event_code=TESTxxxx i adressen. */
(function () {
  var FN = 'https://seevzkxodkvgiffanacg.supabase.co/functions/v1/meta-capi';
  var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZXZ6a3hvZGt2Z2lmZmFuYWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDUzODksImV4cCI6MjA4NTk4MTM4OX0.bGUpZQk1xDSVrinv9YzaeZHHHJyhKpf_54ywZyHWt6g';

  function cookie(name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }

  window.mgLead = function (d) {
    d = d || {};
    var params = new URLSearchParams(location.search);
    var id = 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
    var custom = { content_name: d.content_name || '' };
    if (d.ad) custom.ad = d.ad;
    if (window.fbq) fbq('track', 'Lead', custom, { eventID: id });

    var fbc = cookie('_fbc');
    var clid = params.get('fbclid');
    if (!fbc && clid) fbc = 'fb.1.' + Date.now() + '.' + clid;
    try {
      fetch(FN, {
        method: 'POST',
        keepalive: true,
        headers: { 'Authorization': 'Bearer ' + KEY, 'apikey': KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'Lead', event_id: id, event_source_url: location.href,
          content_name: d.content_name || '', ad: d.ad || '',
          email: d.email || '', phone: d.phone || '',
          fbp: cookie('_fbp'), fbc: fbc,
          test_event_code: params.get('test_event_code') || ''
        })
      }).catch(function () {});
    } catch (e) {}
  };
})();
