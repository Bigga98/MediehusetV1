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
    { label: 'Tjenester',    href: root + 'tjenester.html' },
    { label: 'Om oss',       href: root + 'om-oss.html' },
    { label: 'Nettside-demoer', href: root + 'bibliotek.html' },
    { label: 'Kontakt',      href: '#', kontakt: true },
    { label: 'Brand Guide',  href: root + 'brand/guide.html', meta: true },
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
      background: transparent;
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
  logo.innerHTML = '<img src="' + root + 'images/logo.svg" alt="Mediegruppen logo" style="height:36px;width:auto;display:block;margin-right:12px;filter:brightness(0) opacity(0.87);position:relative;top:-4px;"> Mediegruppen';

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

  nav.appendChild(logo);
  nav.appendChild(linkWrap);
  nav.appendChild(cta);

  // Insert at top of body
  document.body.insertBefore(nav, document.body.firstChild);

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
  });

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
})();
