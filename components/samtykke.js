/* Samtykke til informasjonskapsler (ekomloven § 3-15 / GDPR).
   Meta-pikselen lastes først når besøkende har trykket «Godta». Valget lagres i
   localStorage (mg_cookie_consent = granted | denied) og gjelder alle sidene.
   Ett felles banner for alle sider, i fargene fra Figma «Variant C – Mørk gjennomgående»: lite kort nede til venstre på PC (den plasseringen
   som får flest svar i feltstudier), kort nederst på mobil. «Avvis» og «Godta» er like
   store og like synlige, som Datatilsynet krever. Ingen lukkekryss – man velger.
   API: mgConsent.granted(), mgConsent.grant(), mgConsent.deny(), mgConsent.reset() */
(function () {
  var KEY = 'mg_cookie_consent';
  var PIXEL_ID = '1438440671412379';
  var loaded = false;

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadPixel() {
    if (loaded) return; loaded = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  function gtagGrant() {
    if (window.gtag) gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
  }

  function hideBanner() {
    var b = document.getElementById('mg-samtykke');
    if (!b) return;
    b.classList.remove('is-in');
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 250);
  }

  function grant() { set('granted'); loadPixel(); gtagGrant(); hideBanner(); }
  function deny() { set('denied'); hideBanner(); }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); }

  window.mgConsent = { granted: function () { return get() === 'granted'; }, grant: grant, deny: deny, reset: reset };

  if (get() === 'granted') { loadPixel(); gtagGrant(); return; }
  if (get() === 'denied') return;

  var CSS =
    '#mg-samtykke{position:fixed;z-index:99999;left:24px;bottom:24px;width:380px;max-width:calc(100% - 32px);box-sizing:border-box;' +
    'background:#252523;color:#E3E3E3;border-radius:12px;box-shadow:0 16px 48px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.08);padding:20px;' +
    'font:400 14px/1.5 Inter,Helvetica,Arial,sans-serif;opacity:0;transform:translateY(12px);transition:opacity .25s ease,transform .25s ease}' +
    '#mg-samtykke.is-in{opacity:1;transform:none}' +
    '#mg-samtykke h2{margin:0 0 6px;font:600 15px/1.35 Inter,Helvetica,Arial,sans-serif;letter-spacing:-.005em;color:#E3E3E3}' +
    '#mg-samtykke p{margin:0 0 16px;color:#A8A5A2}' +
    '#mg-samtykke a{color:#E3E3E3;text-decoration:underline;text-underline-offset:2px}' +
    '#mg-samtykke .mg-s-knapper{display:flex;gap:8px}' +
    '#mg-samtykke button{flex:1;height:44px;border-radius:8px;font:500 14px Inter,Helvetica,Arial,sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '#mg-samtykke button[data-v=deny]{background:transparent;color:#E3E3E3;border:1px solid #E3E3E3}' +
    '#mg-samtykke button[data-v=grant]{background:#E3E3E3;color:#111111;border:1px solid #E3E3E3}' +
    '#mg-samtykke button:focus-visible{outline:2px solid #296ADA;outline-offset:2px}' +
    '@media (max-width:600px){#mg-samtykke{left:12px;right:12px;bottom:12px;width:auto;max-width:none;padding:16px}' +
    '#mg-samtykke p{margin-bottom:14px}}' +
    '@media (prefers-reduced-motion:reduce){#mg-samtykke{transition:none}}';

  function showBanner() {
    if (document.getElementById('mg-samtykke')) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var d = document.createElement('div');
    d.id = 'mg-samtykke';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-labelledby', 'mg-samtykke-tittel');
    d.innerHTML =
      '<h2 id="mg-samtykke-tittel">Kan vi måle besøket ditt?</h2>' +
      '<p>Vi bruker informasjonskapsler fra Meta og Google for å se hvilke annonser som fører til henvendelser, så vi viser dem til riktige bedrifter. Du kan endre valget når som helst. <a href="personvern.html#cookies">Les mer</a></p>' +
      '<div class="mg-s-knapper"><button type="button" data-v="deny">Avvis</button><button type="button" data-v="grant">Godta</button></div>';
    d.addEventListener('click', function (e) {
      var v = e.target && e.target.getAttribute('data-v');
      if (v === 'grant') grant(); else if (v === 'deny') deny();
    });
    document.body.appendChild(d);
    requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add('is-in'); }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner); else showBanner();
})();
