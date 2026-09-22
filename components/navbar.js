/* ─────────────────────────────────────────────
   Mediegruppen — Navbar Component
   Bruk: <script src="../components/navbar.js"></script>
   Legg til data-root="../" på <script>-taggen hvis
   filen er i en undermappe (f.eks. brand/).
────────────────────────────────────────────── */

(function () {
  const script = document.currentScript;
  const root = script?.dataset?.root ?? './';

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500&display=swap';
  document.head.appendChild(fontLink);

  const links = [
    { label: 'Hjem',           href: root + 'index.html' },
    { label: 'Tjenester',      href: root + 'tjenester.html' },
    { label: 'Om oss',         href: root + 'om-oss.html' },
    // { label: 'Nettside-demoer', href: root + 'bibliotek.html' },
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
      padding: 0 24px;
      z-index: var(--z-overlay);
      background: rgba(239, 238, 236, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      transition: background var(--transition-base), transform 0.4s cubic-bezier(0.25, 0, 0, 1);
    }
    .mg-nav.nav-hidden {
      transform: translateY(-100%);
    }
    .mg-nav.scrolled {
      background: rgba(239, 238, 236, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .mg-nav__logo {
      display: flex;
      align-items: center;
      font-family: 'Inter', Helvetica, sans-serif;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.1em;
      color: var(--color-ink);
      text-decoration: none;
      margin-right: auto;
    }
    .mg-logo-svg {
      display: block;
      height: 28px;
      width: auto;
    }
    .mg-bar {
      transform-box: fill-box;
      transform-origin: left center;
    }
    @keyframes mgBarRight {
      0%   { transform: translateX(0); }
      35%  { transform: translateX(12px); }
      65%  { transform: translateX(-5px); }
      85%  { transform: translateX(3px); }
      100% { transform: translateX(0); }
    }
    @keyframes mgBarLeft {
      0%   { transform: translateX(0); }
      35%  { transform: translateX(-14px); }
      65%  { transform: translateX(6px); }
      85%  { transform: translateX(-3px); }
      100% { transform: translateX(0); }
    }
    .mg-logo-svg.mg-animate .mg-bar-1 {
      animation: mgBarRight 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    .mg-logo-svg.mg-animate .mg-bar-2 {
      animation: mgBarLeft 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both 0.05s;
    }
    .mg-logo-svg.mg-animate .mg-bar-3 {
      animation: mgBarRight 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both 0.1s;
    }
    .mg-nav__links {
      display: flex;
      align-items: center;
      gap: 40px;
      margin-left: auto;
    }
    .mg-nav__links a {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 13px;
      text-transform: uppercase;
      color: var(--color-ink);
      text-decoration: none;
      position: relative;
      padding-bottom: 2px;
      transition: color var(--transition-base);
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
      transition: transform var(--transition-base);
    }
    .mg-nav__links a:hover {
      color: var(--color-dark);
    }
    .mg-nav__links a:hover::after {
      transform: scaleX(1);
    }
    .mg-nav__links a.active {
      color: var(--color-dark);
      font-weight: 500;
    }
    .mg-nav__links a.active::after {
      transform: scaleX(1);
      background: rgba(var(--color-dark-rgb), 0.25);
    }
    .mg-nav__links a.meta {
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--color-text-hint);
      border-left: 1px solid var(--color-text-hint);
      padding-left: 16px;
      margin-left: -12px;
    }
    .mg-nav__links a.meta::after { display: none; }
    .mg-nav__links a.meta:hover { color: var(--color-text-muted); }
    .mg-nav__links a.meta.active { color: var(--color-dark); }
    .mg-nav__cta {
      margin-left: var(--space-lg, 24px);
      padding: 10px 20px;
      border-radius: var(--radius-full);
      border: 1px solid var(--color-ink);
      font-family: 'Inter', Helvetica, sans-serif;
      font-weight: 500;
      font-size: 14px;
      color: var(--color-ink);
      text-decoration: none;
      white-space: nowrap;
      transition: background var(--transition-fast), color var(--transition-fast);
    }
    .mg-nav__cta:hover {
      background: var(--color-ink);
      color: var(--color-white);
      border-color: var(--color-dark);
    }
    .mg-nav__hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 44px;
      height: 44px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      margin-left: 4px;
    }
    .mg-nav__hamburger span {
      display: block;
      height: 1.5px;
      background: var(--color-ink);
      border-radius: 2px;
      transition: transform var(--transition-base), opacity var(--transition-base);
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
      background: rgba(255, 255, 255, 0.97);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      flex-direction: column;
      padding: 8px 20px 24px;
      gap: 0;
      z-index: var(--z-overlay);
    }
    .mg-nav__drawer.open {
      display: flex;
    }
    .mg-nav__drawer a {
      font-family: 'Instrument Sans', sans-serif;
      font-size: 22px;
      font-weight: 400;
      letter-spacing: 0;
      text-transform: none;
      color: var(--color-ink);
      text-decoration: none;
      padding: 16px 0;
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .mg-nav__drawer a:last-child {
      border-bottom: none;
    }
    .mg-nav__drawer a.active {
      color: var(--color-dark);
    }
    .mg-nav__drawer a.meta {
      font-size: 14px;
      letter-spacing: 0;
      text-transform: none;
      color: var(--color-text-hint);
      border: none;
      padding-top: 20px;
    }
    @media (max-width: 1024px) {
      .mg-nav__links, .mg-nav__cta {
        display: none;
      }
      .mg-nav__hamburger {
        display: flex;
        grid-column: 3;
        justify-self: end;
      }
    }
    @media (max-width: 768px) {
      .mg-nav {
        padding: 0 20px;
        height: 60px;
        backdrop-filter: none;
        background: transparent;
        border-bottom: none;
      }
      .mg-nav.scrolled {
        background: var(--color-white);
        border-bottom: 1px solid var(--color-border-light);
      }
      .mg-nav__drawer {
        top: 60px;
      }
      .mg-logo-svg {
        height: 22px;
        max-width: 140px;
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
  logo.innerHTML = `<img class="mg-logo-svg" src="${root}images/mediegruppen-logo.svg" alt="Mediegruppen">`;

  logo.addEventListener('mouseenter', function () {
    const svg = logo.querySelector('.mg-logo-svg');
    svg.classList.remove('mg-animate');
    void svg.offsetWidth;
    svg.classList.add('mg-animate');
  });

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

  window.addEventListener('resize', () => updateNavBg(window.scrollY));

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
      .popup-overlay{position:fixed;inset:0;z-index: var(--z-toast);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;visibility:hidden;transition:opacity var(--transition-base),visibility var(--transition-base)}
      .popup-overlay.open{opacity:1;visibility:visible}
      .popup-backdrop{position:absolute;inset:0;background:rgba(8,9,11,.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
      .popup-card{position:relative;z-index: var(--z-base);display:flex;max-width:780px;width:100%;overflow:hidden;border-radius:4px;box-shadow:var(--shadow-xl);transform:translateY(24px) scale(.97);transition:transform var(--transition-spring)}
      .popup-overlay.open .popup-card{transform:translateY(0) scale(1)}
      .popup-left{flex:0 0 260px;background:#efefed;padding:44px 36px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid rgba(0,0,0,.08)}
      .popup-brand-dot{display:none}
      .popup-left-heading{font-family:'Instrument Sans',Helvetica,Arial,sans-serif;font-size:22px;font-weight:300;line-height:1.2;letter-spacing:-.02em;color:#222222;margin-bottom:12px}
      .popup-left-sub{font-family:'Inter',Helvetica,sans-serif;font-size:13px;line-height:1.7;color:rgba(34,34,34,.5)}
      .popup-trust{display:flex;flex-direction:column;gap:14px}
      .popup-trust-item{display:flex;align-items:center;gap:10px;font-family:'Inter',Helvetica,sans-serif;font-size:12px;color:rgba(34,34,34,.5);letter-spacing:.01em}
      .popup-trust-item svg{flex-shrink:0;opacity:.6}
      .popup-right{flex:1;background:#f8f8f8;padding:44px 44px 40px;position:relative}
      .popup-close{position:absolute;top:16px;right:16px;width:28px;height:28px;background:rgba(0,0,0,.06);border:none;border-radius:50%;cursor:pointer;color:rgba(34,34,34,.4);font-size:16px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background var(--transition-fast),color var(--transition-fast)}
      .popup-close:hover{background:rgba(0,0,0,.1);color:rgba(34,34,34,.8)}
      .popup-right-heading{font-family:'Instrument Sans',Helvetica,Arial,sans-serif;font-size:22px;font-weight:300;letter-spacing:-.025em;color:#222222;margin-bottom:6px;line-height:1.1}
      .popup-right-sub{font-family:'Inter',Helvetica,sans-serif;font-size:13px;line-height:1.6;color:rgba(34,34,34,.5);margin-bottom:28px}
      .popup-form{display:flex;flex-direction:column;gap:0}
      .popup-form-row{display:grid;grid-template-columns:1fr 1fr;gap:0 24px}
      .popup-field{display:flex;flex-direction:column;gap:7px;margin-bottom:24px}
      .popup-field label{font-family:'Inter',sans-serif;font-size:10px;font-weight:500;color:rgba(34,34,34,.4);letter-spacing:.12em;text-transform:uppercase}
      .popup-input,.popup-textarea{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(34,34,34,.25);border-radius:0;padding:0 0 11px;height:40px;font-family:'Instrument Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:300;color:#222222;outline:none;transition:border-color var(--transition-base),box-shadow var(--transition-base);-webkit-appearance:none}
      .popup-input::placeholder,.popup-textarea::placeholder{color:rgba(34,34,34,.35)}
      .popup-input:-webkit-autofill,.popup-input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 100px #f8f8f8 inset;-webkit-text-fill-color:#222}
      .popup-input:hover,.popup-textarea:hover{border-bottom-color:rgba(34,34,34,.45)}
      .popup-input:focus,.popup-textarea:focus{border-bottom-color:#222222;box-shadow:0 1px 0 rgba(34,34,34,.1)}
      .popup-textarea{height:auto;padding:0 0 11px;min-height:72px;resize:none;line-height:1.6}
      .popup-submit{width:auto;align-self:flex-start;height: var(--btn-height-sm);padding: 0 var(--btn-padding-x);background:#222222;color:#f8f8f8;border:none;border-radius: var(--radius-full);font-family:var(--font-ui);font-size: var(--type-ui);font-weight:500;cursor:pointer;transition:background var(--transition-fast),transform var(--transition-fast),box-shadow var(--transition-fast);display:inline-flex;align-items:center;gap:8px;margin-top:4px}
      .popup-submit:hover{background:#1a1a1a;transform:translateY(-1px);box-shadow:var(--shadow-md)}
      .popup-submit:active{transform:translateY(0);box-shadow:none}
      .popup-submit svg{transition:transform var(--transition-base)}
      .popup-submit:hover svg{transform:translateX(3px)}
      .popup-contact-links{display:flex;gap:20px;margin-top:18px;flex-wrap:wrap;border-top:1px solid rgba(0,0,0,.08);padding-top:16px}
      .popup-contact-link{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(34,34,34,.45);text-decoration:none;transition:color var(--transition-base);font-family:'Inter',sans-serif}
      .popup-contact-link:hover{color:rgba(34,34,34,.8)}
      .popup-success{display:none;padding:24px 0}
      .popup-success-icon{width:40px;height:40px;background:rgba(0,0,0,.06);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px}
      .popup-success h3{font-family:'Instrument Sans',Helvetica,Arial,sans-serif;font-size:22px;font-weight:300;color:#222222;margin-bottom:8px;letter-spacing:-.02em}
      .popup-success p{font-family:'Inter',Helvetica,sans-serif;font-size:13px;color:rgba(34,34,34,.5);line-height:1.6}
      @media(max-width:640px){.popup-left{display:none}.popup-right{padding:36px 28px 32px}.popup-form-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(popupStyle);

    const popup = document.createElement('div');
    popup.innerHTML = `
      <div class="popup-overlay" id="kontaktPopup">
        <div class="popup-backdrop" onclick="closeContactPopup()"></div>
        <div class="popup-card">
          <div class="popup-left">
            <div class="popup-left-top">
              <p class="popup-left-heading">La oss ta en prat om nettsiden din</p>
              <p class="popup-left-sub">Vi hjelper deg med å få en nettside som faktisk gjør jobben — og som du er stolt av.</p>
            </div>
            <div class="popup-trust">
              <div class="popup-trust-item"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,11 12,3" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Svar innen én arbeidsdag</div>
              <div class="popup-trust-item"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,11 12,3" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Ingen bindingstid</div>
              <div class="popup-trust-item"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><polyline points="2,7 5.5,11 12,3" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Fast pris — ingen overraskelser</div>
            </div>
          </div>
          <div class="popup-right">
            <button class="popup-close" onclick="closeContactPopup()">&times;</button>
            <div id="popupFormView">
              <h2 class="popup-right-heading">Send oss en melding</h2>
              <p class="popup-right-sub">Vi tar kontakt innen én arbeidsdag.</p>
              <form class="popup-form" id="popupForm" onsubmit="submitPopupForm(event)">
                <div class="popup-form-row">
                  <div class="popup-field">
                    <label>Navn</label>
                    <input class="popup-input" type="text" name="name" placeholder="Ola Nordmann" required />
                  </div>
                  <div class="popup-field">
                    <label>E-post</label>
                    <input class="popup-input" type="email" name="email" placeholder="ola@bedrift.no" required />
                  </div>
                </div>
                <div class="popup-field">
                  <label>Bedrift / Nettside</label>
                  <input class="popup-input" type="text" name="company" placeholder="Bedrift AS" />
                </div>
                <div class="popup-field">
                  <label>Melding</label>
                  <textarea class="popup-textarea" name="message" placeholder="Hva kan vi hjelpe med?"></textarea>
                </div>
                <button class="popup-submit" type="submit">Send melding <svg viewBox="0 0 15 15" fill="none" width="13" height="13"><path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              </form>
              <div class="popup-contact-links">
                <a href="tel:+4748118680" class="popup-contact-link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+47 481 18 680</a>
                <a href="mailto:post@mediegruppen.no" class="popup-contact-link"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>post@mediegruppen.no</a>
              </div>
            </div>
            <div class="popup-success" id="popupSuccess">
              <div class="popup-success-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-white)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
              <h3>Sendt!</h3>
              <p>Vi tar kontakt innen én arbeidsdag.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(popup.firstElementChild);
  });
})();
