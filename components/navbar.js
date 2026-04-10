/* ─────────────────────────────────────────────
   Mediegruppen — Navbar Component
   Bruk: <script src="../components/navbar.js"></script>
   Legg til data-root="../" på <script>-taggen hvis
   filen er i en undermappe (f.eks. brand/).
────────────────────────────────────────────── */

(function () {
  const script = document.currentScript;
  const root = script?.dataset?.root ?? './';

  const links = [
    { label: 'Hjem',         href: root + 'index.html' },
    { label: 'Tjenester',    href: root + 'tjenester.html' },
    { label: 'Om oss',       href: root + 'om-oss.html' },
    { label: 'Nettside-demoer', href: root + 'bibliotek.html' },
    // { label: 'Brand Guide',  href: root + 'brand/guide.html', meta: true },
  ];

  const current = location.pathname;

  const css = `
    .mg-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 72px;
      will-change: transform;
      display: flex;
      align-items: center;
      padding: 0 80px;
      z-index: 1000;
      background: rgba(245, 244, 241, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      transition: background 0.2s, transform 0.4s cubic-bezier(0.25, 0, 0, 1);
    }
    .mg-nav.nav-hidden {
      transform: translateY(-100%);
    }
    .mg-nav.scrolled {
      background: rgba(245, 244, 241, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .mg-nav__logo {
      display: flex;
      align-items: center;
      font-family: 'Sorts Mill Goudy', Georgia, serif;
      font-weight: 400;
      font-size: 24px;
      color: #141414;
      text-decoration: none;
      margin-right: auto;
    }
    .mg-nav__links {
      display: flex;
      align-items: center;
      gap: 40px;
      margin-left: auto;
    }
    .mg-nav__links a {
      font-family: 'Instrument Sans', Helvetica, sans-serif;
      font-weight: 400;
      font-size: 16px;
      color: #111;
      text-decoration: none;
      position: relative;
      padding-bottom: 2px;
      transition: color 0.25s ease;
    }
    .mg-nav__links a::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background: rgba(34, 34, 34, 0.85);
      transform: scaleX(0);
      transform-origin: var(--underline-origin, left) center;
      transition: transform 0.25s ease;
    }
    .mg-nav__links a:hover {
      color: #30332f;
    }
    .mg-nav__links a:hover::after {
      transform: scaleX(1);
    }
    .mg-nav__links a.active {
      color: #30332f;
      font-weight: 500;
    }
    .mg-nav__links a.active::after {
      transform: scaleX(1);
      background: rgba(48, 51, 47, 0.25);
    }
    .mg-nav__links a.meta {
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #bbb;
      border-left: 1px solid #aaa;
      padding-left: 16px;
      margin-left: -12px;
    }
    .mg-nav__links a.meta::after { display: none; }
    .mg-nav__links a.meta:hover { color: #777; }
    .mg-nav__links a.meta.active { color: #30332f; }
    .mg-nav__cta {
      margin-left: var(--space-lg, 24px);
      padding: 10px 20px;
      border-radius: 100px;
      border: 1px solid #000;
      font-family: 'Instrument Sans', Helvetica, sans-serif;
      font-weight: 500;
      font-size: 13px;
      color: #0c0c0c;
      text-decoration: none;
      white-space: nowrap;
      transition: background 0.15s, color 0.15s;
    }
    .mg-nav__cta:hover {
      background: #222222;
      color: #fff;
      border-color: #30332f;
    }
    .mg-nav__hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      margin-left: 8px;
    }
    .mg-nav__hamburger span {
      display: block;
      height: 1.5px;
      background: #111;
      border-radius: 2px;
      transition: transform 0.25s, opacity 0.2s;
    }
    .mg-nav__hamburger.open span:nth-child(1) {
      transform: translateY(6.5px) rotate(45deg);
    }
    .mg-nav__hamburger.open span:nth-child(2) {
      opacity: 0;
    }
    .mg-nav__hamburger.open span:nth-child(3) {
      transform: translateY(-6.5px) rotate(-45deg);
    }
    .mg-nav__drawer {
      display: none;
      position: fixed;
      top: 72px;
      left: 0;
      right: 0;
      background: rgba(245, 244, 241, 0.97);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(0,0,0,0.08);
      flex-direction: column;
      padding: 24px 24px 32px;
      gap: 0;
      z-index: 999;
    }
    .mg-nav__drawer.open {
      display: flex;
    }
    .mg-nav__drawer a {
      font-family: 'Instrument Sans', Helvetica, sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: #111;
      text-decoration: none;
      padding: 14px 0;
      border-bottom: 1px solid rgba(0,0,0,0.07);
    }
    .mg-nav__drawer a:last-child {
      border-bottom: none;
    }
    .mg-nav__drawer a.meta {
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #999;
      border: none;
      padding-top: 20px;
    }
    @media (max-width: 768px) {
      .mg-nav {
        padding: 0 20px;
      }
      .mg-nav__links, .mg-nav__cta {
        display: none;
      }
      .mg-nav__hamburger {
        display: flex;
      }
    }
    @media (hover: none) {
      .mg-nav__links a,
      .mg-nav__links a::after,
      .mg-nav__cta,
      .mg-nav__hamburger span {
        transition: none;
      }
    }
  `;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Build nav
  const nav = document.createElement('nav');
  nav.className = 'mg-nav';

  const logo = document.createElement('a');
  logo.className = 'mg-nav__logo';
  logo.href = root + 'index.html';
  logo.innerHTML = '<img src="' + root + 'images/logo.svg" alt="Mediegruppen logo" style="height:36px;width:auto;display:block;margin-right:12px;position:relative;top:-4px;"> Mediegruppen';

  const linkWrap = document.createElement('div');
  linkWrap.className = 'mg-nav__links';

  links.forEach(({ label, href, meta, kontakt }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (meta) a.classList.add('meta');
    if (kontakt) {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('mg-kontakt'));
      });
    }
    const hrefPath = href.split('#')[0];
    const hrefHash = href.includes('#') ? href.split('#')[1] : null;
    const isCurrentPage = hrefPath && hrefPath !== '#' && current.endsWith(hrefPath.replace(root, ''));
    if (isCurrentPage && !hrefHash) a.classList.add('active');
    linkWrap.appendChild(a);
  });

  const cta = document.createElement('a');
  cta.className = 'mg-nav__cta';
  cta.href = '#';
  cta.textContent = 'Kontakt oss';
  cta.addEventListener('click', e => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('mg-kontakt'));
  });

  // Hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'mg-nav__hamburger';
  hamburger.setAttribute('aria-label', 'Meny');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  // Mobile drawer
  const drawer = document.createElement('nav');
  drawer.className = 'mg-nav__drawer';
  links.forEach(({ label, href, meta, kontakt }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (meta) a.classList.add('meta');
    if (kontakt) {
      a.addEventListener('click', e => {
        e.preventDefault();
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        document.dispatchEvent(new CustomEvent('mg-kontakt'));
      });
    } else {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
      });
    }
    drawer.appendChild(a);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
  });

  nav.appendChild(logo);
  nav.appendChild(linkWrap);
  nav.appendChild(cta);
  nav.appendChild(hamburger);

  // Insert at top of body
  document.body.insertBefore(nav, document.body.firstChild);
  document.body.insertBefore(drawer, document.body.children[1]);

  // Scroll effect + hide on scroll down, show on scroll up
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        nav.classList.toggle('scrolled', currentScrollY > 20);

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          nav.classList.add('nav-hidden');
        } else {
          nav.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Directional underline — strek vokser fra den siden musen entrer fra
  linkWrap.querySelectorAll('a:not(.meta)').forEach(link => {
    link.addEventListener('mouseenter', e => {
      const rect = link.getBoundingClientRect();
      const fromRight = e.clientX > rect.left + rect.width / 2;
      link.style.setProperty('--underline-origin', fromRight ? 'right' : 'left');
    });
    link.addEventListener('mouseleave', e => {
      const rect = link.getBoundingClientRect();
      const exitRight = e.clientX > rect.left + rect.width / 2;
      link.style.setProperty('--underline-origin', exitRight ? 'right' : 'left');
    });
  });

  // ── KONTAKT POPUP ─────────────────────────────────────────────
  // Globale funksjoner — tilgjengelig for inline onclick-handlere
  window.openContactPopup = function () {
    const el = document.getElementById('kontaktPopup');
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  };
  window.closeContactPopup = function () {
    const el = document.getElementById('kontaktPopup');
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  };

  // Lytt på navbar-event
  document.addEventListener('mg-kontakt', window.openContactPopup);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeContactPopup(); });

  const SUPABASE_URL = 'https://seevzkxodkvgiffanacg.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZXZ6a3hvZGt2Z2lmZmFuYWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDUzODksImV4cCI6MjA4NTk4MTM4OX0.bGUpZQk1xDSVrinv9YzaeZHHHJyhKpf_54ywZyHWt6g';

  window.submitPopupForm = function (e) {
    e.preventDefault();
    const form = document.getElementById('popupForm');
    const submitBtn = form.querySelector('.popup-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sender...';
    submitBtn.disabled = true;
    const name    = form.querySelector('[name="name"]').value || '';
    const email   = form.querySelector('[name="email"]').value || '';
    const company = form.querySelector('[name="company"]').value || '';
    const message = form.querySelector('[name="message"]').value || '';
    fetch(SUPABASE_URL + '/rest/v1/leads', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ name, email, message: company + (message ? '\n' + message : ''), service_type: 'Kontakt', source: 'hero-preview' })
    });
    const emailData = new FormData();
    emailData.append('name', name);
    emailData.append('email', email);
    emailData.append('message', (company ? 'Bedrift: ' + company + '\n' : '') + message);
    emailData.append('_subject', 'Ny kontaktforespørsel fra ' + name);
    emailData.append('_captcha', 'false');
    fetch('https://formsubmit.co/ajax/birbra.bb@gmail.com', { method: 'POST', body: emailData })
      .then(r => {
        if (r.ok) {
          document.getElementById('popupFormView').style.display = 'none';
          document.getElementById('popupSuccess').style.display = 'block';
        } else {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          alert('Noe gikk galt. Prøv igjen.');
        }
      })
      .catch(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        alert('Noe gikk galt. Prøv igjen.');
      });
  };

  // Injiser popup på sider som mangler den
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('kontaktPopup')) return;

    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
      .popup-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;opacity:0;visibility:hidden;transition:opacity .35s ease,visibility .35s ease}
      .popup-overlay.open{opacity:1;visibility:visible}
      .popup-backdrop{position:absolute;inset:0;background:rgba(20,22,20,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
      .popup-card{position:relative;z-index:1;display:flex;max-width:860px;width:100%;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,.28),0 0 0 1px rgba(255,255,255,.06);transform:translateY(20px) scale(.96);transition:transform .4s cubic-bezier(.22,1,.36,1)}
      .popup-overlay.open .popup-card{transform:translateY(0) scale(1)}
      .popup-left{flex:0 0 300px;background:#222;padding:52px 40px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
      .popup-left::before{content:'';position:absolute;top:-80px;right:-80px;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,.04)}
      .popup-left::after{content:'';position:absolute;bottom:-60px;left:-60px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.03)}
      .popup-left-top{position:relative;z-index:1}
      .popup-brand-dot{width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:10px;margin-bottom:28px;display:flex;align-items:center;justify-content:center}
      .popup-left-heading{font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;font-weight:500;line-height:1.2;letter-spacing:-.01em;color:#fff;margin-bottom:14px}
      .popup-left-sub{font-family:'Instrument Sans',Helvetica,sans-serif;font-size:13px;line-height:1.65;color:rgba(255,255,255,.5)}
      .popup-trust{position:relative;z-index:1;display:flex;flex-direction:column;gap:12px}
      .popup-trust-item{display:flex;align-items:center;gap:10px;font-family:'Instrument Sans',Helvetica,sans-serif;font-size:13px;color:rgba(255,255,255,.65)}
      .popup-right{flex:1;background:#fff;padding:48px 48px 44px;position:relative}
      .popup-close{position:absolute;top:14px;right:14px;width:30px;height:30px;background:#f2f2f2;border:none;border-radius:50%;cursor:pointer;color:#777;font-size:17px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
      .popup-close:hover{background:#e6e6e6;color:#111}
      .popup-right-heading{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;font-weight:600;letter-spacing:-.01em;color:#17181c;margin-bottom:4px}
      .popup-right-sub{font-family:'Instrument Sans',Helvetica,sans-serif;font-size:13px;color:#999;margin-bottom:26px}
      .popup-form{display:flex;flex-direction:column;gap:11px}
      .popup-form-row{display:grid;grid-template-columns:1fr 1fr;gap:11px}
      .popup-input,.popup-textarea{width:100%;padding:0 14px;height:44px;background:#f7f7f7;border:1.5px solid transparent;border-radius:10px;font-family:'Instrument Sans',Helvetica,sans-serif;font-size:14px;color:#17181c;outline:none;transition:border-color .15s,background .15s,box-shadow .15s}
      .popup-textarea{height:auto;padding:12px 14px;min-height:110px;resize:none}
      .popup-input::placeholder,.popup-textarea::placeholder{color:#bbb}
      .popup-input:focus,.popup-textarea:focus{border-color:#222;background:#fff;box-shadow:0 0 0 3px rgba(48,51,47,.07)}
      .popup-submit{width:100%;height:48px;background:#222;border:none;border-radius:12px;font-family:'Instrument Sans',Helvetica,sans-serif;font-size:14px;font-weight:500;color:#fff;letter-spacing:.02em;cursor:pointer;transition:background .15s,transform .15s,box-shadow .15s;margin-top:2px;display:flex;align-items:center;justify-content:center;gap:8px}
      .popup-submit:hover{background:#1e2119;box-shadow:0 4px 16px rgba(48,51,47,.2)}
      .popup-submit:active{transform:scale(.98)}
      @media(hover:none){.popup-submit:active{transform:none}.popup-submit{transition:background .15s}}
      .popup-contact-links{display:flex;gap:20px;margin-top:16px;flex-wrap:wrap}
      .popup-contact-link{display:flex;align-items:center;gap:6px;font-size:13px;color:#555;text-decoration:none;transition:color .2s}
      .popup-contact-link:hover{color:#111}
      .popup-success{display:none;text-align:center;padding:48px 0 24px}
      .popup-success-icon{width:56px;height:56px;background:#f0fdf4;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px}
      .popup-success h3{font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;font-weight:600;color:#17181c;margin-bottom:8px}
      .popup-success p{font-family:'Instrument Sans',Helvetica,sans-serif;font-size:14px;color:#999}
      @media(max-width:600px){.popup-left{display:none}.popup-right{padding:36px 24px 32px}}
    `;
    document.head.appendChild(popupStyle);

    const popup = document.createElement('div');
    popup.innerHTML = `
      <div class="popup-overlay" id="kontaktPopup">
        <div class="popup-backdrop" onclick="closeContactPopup()"></div>
        <div class="popup-card">
          <div class="popup-left">
            <div class="popup-left-top">
              <div class="popup-brand-dot">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" fill="none"/></svg>
              </div>
              <p class="popup-left-heading">La oss ta en prat om nettsiden din</p>
              <p class="popup-left-sub">Vi hjelper deg med å få en nettside som faktisk gjør jobben — og som du er stolt av.</p>
            </div>
            <div class="popup-trust">
              <div class="popup-trust-item"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,11 12,3" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Svar innen én arbeidsdag</div>
              <div class="popup-trust-item"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,11 12,3" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Ingen bindingstid</div>
              <div class="popup-trust-item"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,11 12,3" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Fast pris — ingen overraskelser</div>
            </div>
          </div>
          <div class="popup-right">
            <button class="popup-close" onclick="closeContactPopup()">&times;</button>
            <div id="popupFormView">
              <h2 class="popup-right-heading">Send oss en melding</h2>
              <p class="popup-right-sub">Vi tar kontakt innen én arbeidsdag.</p>
              <form class="popup-form" id="popupForm" onsubmit="submitPopupForm(event)">
                <div class="popup-form-row">
                  <input class="popup-input" type="text" name="name" placeholder="Navn" required />
                  <input class="popup-input" type="email" name="email" placeholder="E-post" required />
                </div>
                <input class="popup-input" type="text" name="company" placeholder="Bedrift / Nettside" />
                <textarea class="popup-textarea" name="message" placeholder="Hva kan vi hjelpe med?"></textarea>
                <button class="popup-submit" type="submit">Send melding <svg viewBox="0 0 341 312" fill="currentColor" width="14" height="13"><path d="M0.000473052 166.524L0.354026 124.451L259.155 122.329L146.725 9.89949L195.515 -8.22544e-06L340.826 145.31L174.656 311.481L162.989 262.337L258.802 166.524H0.000473052"/></svg></button>
              </form>
              <div class="popup-contact-links">
                <a href="tel:+4748118680" class="popup-contact-link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+47 481 18 680</a>
                <a href="mailto:post@mediegruppen.no" class="popup-contact-link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>post@mediegruppen.no</a>
              </div>
            </div>
            <div class="popup-success" id="popupSuccess">
              <div class="popup-success-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
              <h3>Meldingen er sendt!</h3>
              <p>Vi tar kontakt innen én arbeidsdag.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(popup.firstElementChild);
  });
})();
