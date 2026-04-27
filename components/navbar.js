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
    { label: 'Nettside-demoer', href: root + 'bibliotek.html' },
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
      background: rgba(246, 245, 242, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      transition: background var(--transition-base), transform 0.4s cubic-bezier(0.25, 0, 0, 1);
    }
    .mg-nav.nav-hidden {
      transform: translateY(-100%);
    }
    .mg-nav.scrolled {
      background: rgba(246, 245, 242, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .mg-nav__logo {
      display: flex;
      align-items: center;
      font-family: 'Instrument Sans', Helvetica, sans-serif;
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
      font-family: 'DM Sans', sans-serif;
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
      font-family: 'Instrument Sans', Helvetica, sans-serif;
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
      font-family: 'Funnel Display', sans-serif;
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
  logo.innerHTML = `<svg class="mg-logo-svg" viewBox="0 0 398 63" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mediegruppen">
    <path d="M0 9V46L5.5 46V17C5.5 17 17.8396 28.8214 20.5 46H26L41.5 20V46L47 46V9H41.5L23.5 38C18.6226 20.381 5.5 9 5.5 9H0Z" fill="var(--color-ui-mid)"/>
    <path d="M74.36 33.862C74.36 34.73 74.304 35.514 74.192 36.214H56.51C56.65 38.062 57.336 39.546 58.568 40.666C59.8 41.786 61.312 42.346 63.104 42.346C65.68 42.346 67.5 41.268 68.564 39.112H73.73C73.03 41.24 71.756 42.99 69.908 44.362C68.088 45.706 65.82 46.378 63.104 46.378C60.892 46.378 58.904 45.888 57.14 44.908C55.404 43.9 54.032 42.5 53.024 40.708C52.044 38.888 51.554 36.788 51.554 34.408C51.554 32.028 52.03 29.942 52.982 28.15C53.962 26.33 55.32 24.93 57.056 23.95C58.82 22.97 60.836 22.48 63.104 22.48C65.288 22.48 67.234 22.956 68.942 23.908C70.65 24.86 71.98 26.204 72.932 27.94C73.884 29.648 74.36 31.622 74.36 33.862ZM69.362 32.35C69.334 30.586 68.704 29.172 67.472 28.108C66.24 27.044 64.714 26.512 62.894 26.512C61.242 26.512 59.828 27.044 58.652 28.108C57.476 29.144 56.776 30.558 56.552 32.35H69.362ZM77.4759 34.324C77.4759 32 77.9519 29.942 78.9039 28.15C79.8839 26.358 81.1999 24.972 82.8519 23.992C84.5319 22.984 86.3939 22.48 88.4379 22.48C89.9499 22.48 91.4339 22.816 92.8899 23.488C94.3739 24.132 95.5499 25 96.4179 26.092V14.92H101.248V46H96.4179V42.514C95.6339 43.634 94.5419 44.558 93.1419 45.286C91.7699 46.014 90.1879 46.378 88.3959 46.378C86.3799 46.378 84.5319 45.874 82.8519 44.866C81.1999 43.83 79.8839 42.402 78.9039 40.582C77.9519 38.734 77.4759 36.648 77.4759 34.324ZM96.4179 34.408C96.4179 32.812 96.0819 31.426 95.4099 30.25C94.7659 29.074 93.9119 28.178 92.8479 27.562C91.7839 26.946 90.6359 26.638 89.4039 26.638C88.1719 26.638 87.0239 26.946 85.9599 27.562C84.8959 28.15 84.0279 29.032 83.3559 30.208C82.7119 31.356 82.3899 32.728 82.3899 34.324C82.3899 35.92 82.7119 37.32 83.3559 38.524C84.0279 39.728 84.8959 40.652 85.9599 41.296C87.0519 41.912 88.1999 42.22 89.4039 42.22C90.6359 42.22 91.7839 41.912 92.8479 41.296C93.9119 40.68 94.7659 39.784 95.4099 38.608C96.0819 37.404 96.4179 36.004 96.4179 34.408ZM109.973 19.792C109.105 19.792 108.377 19.498 107.789 18.91C107.201 18.322 106.907 17.594 106.907 16.726C106.907 15.858 107.201 15.13 107.789 14.542C108.377 13.954 109.105 13.66 109.973 13.66C110.813 13.66 111.527 13.954 112.115 14.542C112.703 15.13 112.997 15.858 112.997 16.726C112.997 17.594 112.703 18.322 112.115 18.91C111.527 19.498 110.813 19.792 109.973 19.792ZM112.325 22.858V46H107.537V22.858H112.325ZM139.821 33.862C139.821 34.73 139.765 35.514 139.653 36.214H121.971C122.111 38.062 122.797 39.546 124.029 40.666C125.261 41.786 126.773 42.346 128.565 42.346C131.141 42.346 132.961 41.268 134.025 39.112H139.191C138.491 41.24 137.217 42.99 135.369 44.362C133.549 45.706 131.281 46.378 128.565 46.378C126.353 46.378 124.365 45.888 122.601 44.908C120.865 43.9 119.493 42.5 118.485 40.708C117.505 38.888 117.015 36.788 117.015 34.408C117.015 32.028 117.491 29.942 118.443 28.15C119.423 26.33 120.781 24.93 122.517 23.95C124.281 22.97 126.297 22.48 128.565 22.48C130.749 22.48 132.695 22.956 134.403 23.908C136.111 24.86 137.441 26.204 138.393 27.94C139.345 29.648 139.821 31.622 139.821 33.862ZM134.823 32.35C134.795 30.586 134.165 29.172 132.933 28.108C131.701 27.044 130.175 26.512 128.355 26.512C126.703 26.512 125.289 27.044 124.113 28.108C122.937 29.144 122.237 30.558 122.013 32.35H134.823ZM153.857 22.48C155.649 22.48 157.231 22.844 158.603 23.572C160.003 24.272 161.095 25.154 161.879 26.218V22.858H166.709V46.378C166.709 48.506 166.261 50.396 165.365 52.048C164.469 53.728 163.167 55.044 161.459 55.996C159.779 56.948 157.763 57.424 155.411 57.424C152.275 57.424 149.671 56.682 147.599 55.198C145.527 53.742 144.351 51.754 144.071 49.234H148.817C149.181 50.438 149.951 51.404 151.127 52.132C152.331 52.888 153.759 53.266 155.411 53.266C157.343 53.266 158.897 52.678 160.073 51.502C161.277 50.326 161.879 48.618 161.879 46.378V42.514C161.067 43.606 159.961 44.53 158.561 45.286C157.189 46.014 155.621 46.378 153.857 46.378C151.841 46.378 149.993 45.874 148.313 44.866C146.661 43.83 145.345 42.402 144.365 40.582C143.413 38.734 142.937 36.648 142.937 34.324C142.937 32 143.413 29.942 144.365 28.15C145.345 26.358 146.661 24.972 148.313 23.992C149.993 22.984 151.841 22.48 153.857 22.48ZM161.879 34.408C161.879 32.812 161.543 31.426 160.871 30.25C160.227 29.074 159.373 28.178 158.309 27.562C157.245 26.946 156.097 26.638 154.865 26.638C153.633 26.638 152.485 26.946 151.421 27.562C150.357 28.15 149.489 29.032 148.817 30.208C148.173 31.356 147.851 32.728 147.851 34.324C147.851 35.92 148.173 37.32 148.817 38.524C149.489 39.728 150.357 40.652 151.421 41.296C152.513 41.912 153.661 42.22 154.865 42.22C156.097 42.22 157.245 41.912 158.309 41.296C159.373 40.68 160.227 39.784 160.871 38.608C161.543 37.404 161.879 36.004 161.879 34.408ZM177.786 26.218C178.486 25.042 179.41 24.132 180.558 23.488C181.734 22.816 183.12 22.48 184.716 22.48V27.436H183.498C181.622 27.436 180.194 27.912 179.214 28.864C178.262 29.816 177.786 31.468 177.786 33.82V46H172.998V22.858H177.786V26.218ZM210.075 22.858V46H205.287V43.27C204.531 44.222 203.537 44.978 202.305 45.538C201.101 46.07 199.813 46.336 198.441 46.336C196.621 46.336 194.983 45.958 193.527 45.202C192.099 44.446 190.965 43.326 190.125 41.842C189.313 40.358 188.907 38.566 188.907 36.466V22.858H193.653V35.752C193.653 37.824 194.171 39.42 195.207 40.54C196.243 41.632 197.657 42.178 199.449 42.178C201.241 42.178 202.655 41.632 203.691 40.54C204.755 39.42 205.287 37.824 205.287 35.752V22.858H210.075ZM221.18 26.26C221.992 25.196 223.098 24.3 224.498 23.572C225.898 22.844 227.48 22.48 229.244 22.48C231.26 22.48 233.094 22.984 234.746 23.992C236.426 24.972 237.742 26.358 238.694 28.15C239.646 29.942 240.122 32 240.122 34.324C240.122 36.648 239.646 38.734 238.694 40.582C237.742 42.402 236.426 43.83 234.746 44.866C233.094 45.874 231.26 46.378 229.244 46.378C227.48 46.378 225.912 46.028 224.54 45.328C223.168 44.6 222.048 43.704 221.18 42.64V57.004H216.392V22.858H221.18V26.26ZM235.25 34.324C235.25 32.728 234.914 31.356 234.242 30.208C233.598 29.032 232.73 28.15 231.638 27.562C230.574 26.946 229.426 26.638 228.194 26.638C226.99 26.638 225.842 26.946 224.75 27.562C223.686 28.178 222.818 29.074 222.146 30.25C221.502 31.426 221.18 32.812 221.18 34.408C221.18 36.004 221.502 37.404 222.146 38.608C222.818 39.784 223.686 40.68 224.75 41.296C225.842 41.912 226.99 42.22 228.194 42.22C229.426 42.22 230.574 41.912 231.638 41.296C232.73 40.652 233.598 39.728 234.242 38.524C234.914 37.32 235.25 35.92 235.25 34.324ZM249.645 26.26C250.457 25.196 251.563 24.3 252.963 23.572C254.363 22.844 255.945 22.48 257.709 22.48C259.725 22.48 261.559 22.984 263.211 23.992C264.891 24.972 266.207 26.358 267.159 28.15C268.111 29.942 268.587 32 268.587 34.324C268.587 36.648 268.111 38.734 267.159 40.582C266.207 42.402 264.891 43.83 263.211 44.866C261.559 45.874 259.725 46.378 257.709 46.378C255.945 46.378 254.377 46.028 253.005 45.328C251.633 44.6 250.513 43.704 249.645 42.64V57.004H244.857V22.858H249.645V26.26ZM263.715 34.324C263.715 32.728 263.379 31.356 262.707 30.208C262.063 29.032 261.195 28.15 260.103 27.562C259.039 26.946 257.891 26.638 256.659 26.638C255.455 26.638 254.307 26.946 253.215 27.562C252.151 28.178 251.283 29.074 250.611 30.25C249.967 31.426 249.645 32.812 249.645 34.408C249.645 36.004 249.967 37.404 250.611 38.608C251.283 39.784 252.151 40.68 253.215 41.296C254.307 41.912 255.455 42.22 256.659 42.22C257.891 42.22 259.039 41.912 260.103 41.296C261.195 40.652 262.063 39.728 262.707 38.524C263.379 37.32 263.715 35.92 263.715 34.324ZM294.532 33.862C294.532 34.73 294.476 35.514 294.364 36.214H276.682C276.822 38.062 277.508 39.546 278.74 40.666C279.972 41.786 281.484 42.346 283.276 42.346C285.852 42.346 287.672 41.268 288.736 39.112H293.902C293.202 41.24 291.928 42.99 290.08 44.362C288.26 45.706 285.992 46.378 283.276 46.378C281.064 46.378 279.076 45.888 277.312 44.908C275.576 43.9 274.204 42.5 273.196 40.708C272.216 38.888 271.726 36.788 271.726 34.408C271.726 32.028 272.202 29.942 273.154 28.15C274.134 26.33 275.492 24.93 277.228 23.95C278.992 22.97 281.008 22.48 283.276 22.48C285.46 22.48 287.406 22.956 289.114 23.908C290.822 24.86 292.152 26.204 293.104 27.94C294.056 29.648 294.532 31.622 294.532 33.862ZM289.534 32.35C289.506 30.586 288.876 29.172 287.644 28.108C286.412 27.044 284.886 26.512 283.066 26.512C281.414 26.512 280 27.044 278.824 28.108C277.648 29.144 276.948 30.558 276.724 32.35H289.534ZM310.92 22.48C312.74 22.48 314.364 22.858 315.792 23.614C317.248 24.37 318.382 25.49 319.194 26.974C320.006 28.458 320.412 30.25 320.412 32.35V46H315.666V33.064C315.666 30.992 315.148 29.41 314.112 28.318C313.076 27.198 311.662 26.638 309.87 26.638C308.078 26.638 306.65 27.198 305.586 28.318C304.55 29.41 304.032 30.992 304.032 33.064V46H299.244V22.858H304.032V25.504C304.816 24.552 305.81 23.81 307.014 23.278C308.246 22.746 309.548 22.48 310.92 22.48Z" fill="var(--color-ui-mid)"/>
    <path class="mg-bar mg-bar-1" d="M343 18H386.5L383.38 24.5H343V18Z" fill="var(--color-ui-mid)"/>
    <path class="mg-bar mg-bar-2" d="M343 28.4999H398L396.027 31.7499L394.055 34.9999H343V28.4999Z" fill="var(--color-ui-mid)"/>
    <path class="mg-bar mg-bar-3" d="M343 38.9999H386.5L383.38 45.4999H343V38.9999Z" fill="var(--color-ui-mid)"/>
  </svg>`;

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
      .popup-left{flex:0 0 260px;background:var(--color-ui-dark);padding:44px 36px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid rgba(255,255,255,.06)}
      .popup-brand-dot{display:none}
      .popup-left-heading{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:300;line-height:1.2;letter-spacing:-.02em;color:var(--color-white);margin-bottom:12px}
      .popup-left-sub{font-family:'Instrument Sans',Helvetica,sans-serif;font-size:13px;line-height:1.7;color:rgba(255,255,255,.35)}
      .popup-trust{display:flex;flex-direction:column;gap:14px}
      .popup-trust-item{display:flex;align-items:center;gap:10px;font-family:'Instrument Sans',Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,.45);letter-spacing:.01em}
      .popup-trust-item svg{flex-shrink:0;opacity:.6}
      .popup-right{flex:1;background:var(--color-ui-dark);padding:44px 44px 40px;position:relative}
      .popup-close{position:absolute;top:16px;right:16px;width:28px;height:28px;background:rgba(255,255,255,.07);border:none;border-radius:50%;cursor:pointer;color:rgba(255,255,255,.4);font-size:16px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background var(--transition-fast),color var(--transition-fast)}
      .popup-close:hover{background:rgba(255,255,255,.12);color:rgba(255,255,255,.8)}
      .popup-right-heading{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:300;letter-spacing:-.025em;color:var(--color-white);margin-bottom:6px;line-height:1.1}
      .popup-right-sub{font-family:'Instrument Sans',Helvetica,sans-serif;font-size:13px;line-height:1.6;color:rgba(255,255,255,.35);margin-bottom:28px}
      .popup-form{display:flex;flex-direction:column;gap:0}
      .popup-form-row{display:grid;grid-template-columns:1fr 1fr;gap:0 24px}
      .popup-field{display:flex;flex-direction:column;gap:7px;margin-bottom:24px}
      .popup-field label{font-family:'Instrument Sans',sans-serif;font-size:10px;font-weight:500;color:rgba(255,255,255,.4);letter-spacing:.12em;text-transform:uppercase}
      .popup-input,.popup-textarea{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,.5);border-radius:0;padding:0 0 11px;height:40px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:300;color:var(--color-white);outline:none;transition:border-color var(--transition-base),box-shadow var(--transition-base);-webkit-appearance:none}
      .popup-input::placeholder,.popup-textarea::placeholder{color:rgba(255,255,255,.28)}
      .popup-input:-webkit-autofill,.popup-input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 100px var(--color-ui-dark) inset;-webkit-text-fill-color:#fff}
      .popup-input:hover,.popup-textarea:hover{border-bottom-color:rgba(255,255,255,.65)}
      .popup-input:focus,.popup-textarea:focus{border-bottom-color:var(--color-white);box-shadow:0 1px 0 rgba(255,255,255,.1)}
      .popup-textarea{height:auto;padding:0 0 11px;min-height:72px;resize:none;line-height:1.6}
      .popup-submit{width:auto;align-self:flex-start;height: var(--btn-height-sm);padding: 0 var(--btn-padding-x);background:var(--color-white);color:var(--color-ui-dark);border:none;border-radius: var(--radius-full);font-family:var(--font-ui);font-size: var(--type-ui);font-weight:500;cursor:pointer;transition:background var(--transition-fast),transform var(--transition-fast),box-shadow var(--transition-fast);display:inline-flex;align-items:center;gap:8px;margin-top:4px}
      .popup-submit:hover{background:var(--surface-light);transform:translateY(-1px);box-shadow:var(--shadow-md)}
      .popup-submit:active{transform:translateY(0);box-shadow:none}
      .popup-submit svg{transition:transform var(--transition-base)}
      .popup-submit:hover svg{transform:translateX(3px)}
      .popup-contact-links{display:flex;gap:20px;margin-top:18px;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,.06);padding-top:16px}
      .popup-contact-link{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;transition:color var(--transition-base);font-family:'Instrument Sans',sans-serif}
      .popup-contact-link:hover{color:rgba(255,255,255,.7)}
      .popup-success{display:none;padding:24px 0}
      .popup-success-icon{width:40px;height:40px;background:rgba(255,255,255,.1);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px}
      .popup-success h3{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:300;color:var(--color-white);margin-bottom:8px;letter-spacing:-.02em}
      .popup-success p{font-family:'Instrument Sans',Helvetica,sans-serif;font-size:13px;color:rgba(255,255,255,.4);line-height:1.6}
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
