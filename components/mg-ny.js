// Felles skript for undersidene i den nye designen (samme som forsiden).
// Ny logo, «Meny»-knapp med lyst panel, footer som avdekkes, og WebGL-bånd i heroen.
// Lastes ETTER components/navbar.js (den lager nav-en og kontaktskjemaet).
(function () {
  // ── Logo: trekant + «mediegruppen» i gråsvart
  (() => {
      const old = document.querySelector('.mg-nav__logo');
      if (old) {
        // Ny kopi uten den gamle hover-animasjonen (den leter etter det gamle logobildet)
        const logo = old.cloneNode(false);
        old.replaceWith(logo);
        logo.classList.add('mgh-logo');
        logo.innerHTML = '<svg viewBox="0 0 178 23" fill="currentColor" role="img" aria-label="Mediegruppen"><path fill-rule="evenodd" clip-rule="evenodd" d="M98.3791 5.79961C99.2179 5.79961 99.9594 5.97294 100.602 6.31961C101.258 6.65294 101.769 7.07294 102.136 7.57961V5.97961H104.398V16.6596C104.398 17.6729 104.188 18.4431 103.768 19.2298C103.348 20.0298 102.739 20.6565 101.939 21.1098C101.152 21.5631 100.208 21.7898 99.1068 21.7898L95.3924 21.8502V19.8098H99.1068C100.012 19.8098 100.739 19.5298 101.29 18.9698C101.854 18.4098 102.136 17.7263 102.136 16.6596V15.3396C101.755 15.8596 101.238 16.2996 100.582 16.6596C99.9398 17.0063 99.2622 17.1771 98.3791 17.1796C97.3281 17.1826 96.5695 16.9396 95.7827 16.4596C95.0091 15.9663 94.3928 15.2863 93.9339 14.4196C93.488 13.5396 93.2652 12.5463 93.2652 11.4396C93.2652 10.3329 93.488 9.35291 93.9339 8.49961C94.3928 7.64628 95.0091 6.98628 95.7827 6.51961C96.5695 6.03961 97.435 5.79961 98.3791 5.79961ZM101.664 9.49961C101.978 10.0596 102.136 10.7196 102.136 11.4796C102.136 12.2396 101.978 12.9063 101.664 13.4796C101.362 14.0396 100.963 14.4663 100.464 14.7596C99.9653 15.0529 99.4284 15.1996 98.8511 15.1996C98.2876 15.1996 97.7497 15.0529 97.2382 14.7596C96.7399 14.4529 96.3335 14.0129 96.0188 13.4396C95.7171 12.8663 95.5664 12.1996 95.5664 11.4396C95.5664 10.6796 95.7171 10.0263 96.0188 9.47961C96.3335 8.91961 96.7399 8.49961 97.2382 8.21961C97.7369 7.92628 98.2738 7.77961 98.8511 7.77961C99.4284 7.77961 99.9653 7.92628 100.464 8.21961C100.963 8.51294 101.362 8.93961 101.664 9.49961Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M45.3951 6.33961C44.7263 5.97961 43.9659 5.79961 43.1135 5.79961C42.3137 5.79961 41.5663 5.99961 40.8713 6.39961C40.1763 6.78628 39.6649 7.31294 39.3372 7.97961C38.9701 7.27294 38.4455 6.73294 37.7637 6.35961C37.0819 5.98628 36.3082 5.79961 35.4428 5.79961C34.8003 5.79961 34.1971 5.92628 33.6333 6.17961C33.0695 6.43294 32.604 6.78628 32.2368 7.23961V5.97961H29.9946V16.9996H32.2368V10.8396C32.2368 9.85291 32.4795 9.09961 32.9646 8.57961C33.4629 8.04628 34.1316 7.77961 34.9708 7.77961C35.8099 7.77961 36.4722 8.04628 36.9573 8.57961C37.4424 9.09961 37.685 9.85291 37.685 10.8396V16.9996H39.9076V10.8396C39.9076 9.85291 40.1502 9.09961 40.6353 8.57961C41.1336 8.04628 41.8023 7.77961 42.6415 7.77961C43.4806 7.77961 44.1429 8.04628 44.628 8.57961C45.1131 9.09961 45.3557 9.85291 45.3557 10.8396V16.9996H47.5783V10.4996C47.5783 9.49961 47.3816 8.64628 46.9882 7.93961C46.6079 7.23294 46.0769 6.69961 45.3951 6.33961ZM60.4428 12.3396C60.4952 12.0063 60.5214 11.6329 60.5214 11.2196C60.5214 10.1529 60.2985 9.21291 59.8526 8.39961C59.4068 7.57294 58.784 6.93294 57.9842 6.47961C57.1843 6.02628 56.273 5.79961 55.2502 5.79961C54.1881 5.79961 53.2441 6.03294 52.418 6.49961C51.605 6.96628 50.969 7.63294 50.5101 8.49961C50.0643 9.35291 49.8413 10.3463 49.8413 11.4796C49.8413 12.6129 50.0709 13.6129 50.5297 14.4796C51.0018 15.3329 51.6443 15.9996 52.4572 16.4796C53.2833 16.9463 54.2143 17.1796 55.2502 17.1796C56.5221 17.1796 57.5842 16.8596 58.4366 16.2196C59.302 15.5663 59.8985 14.7329 60.2263 13.7196H57.8072C57.3089 14.7463 56.4565 15.2596 55.2502 15.2596C54.411 15.2596 53.7029 14.9929 53.1261 14.4596C52.5491 13.9263 52.2278 13.2196 52.1622 12.3396H60.4428ZM57.2958 8.47961C57.8727 8.98628 58.1677 9.65961 58.1809 10.4996H52.1819C52.2868 9.64631 52.6147 8.97294 53.1654 8.47961C53.7161 7.97294 54.3783 7.71961 55.1519 7.71961C56.0042 7.71961 56.7188 7.97294 57.2958 8.47961ZM62.8066 8.49961C62.3608 9.35291 62.1379 10.3329 62.1379 11.4396C62.1379 12.5463 62.3608 13.5396 62.8066 14.4196C63.2656 15.2863 63.8818 15.9663 64.6555 16.4596C65.4422 16.9396 66.3076 17.1796 67.2517 17.1796C68.0909 17.1796 68.8318 17.0063 69.4742 16.6596C70.1299 16.3129 70.6413 15.8729 71.0084 15.3396V16.9996H73.2703V2.19961H71.0084V7.51961C70.6019 6.99961 70.0512 6.58628 69.3562 6.27961C68.6744 5.95961 67.9794 5.79961 67.2714 5.79961C66.3142 5.79961 65.4422 6.03961 64.6555 6.51961C63.8818 6.98628 63.2656 7.64628 62.8066 8.49961ZM70.5363 9.49961C70.851 10.0596 71.0084 10.7196 71.0084 11.4796C71.0084 12.2396 70.851 12.9063 70.5363 13.4796C70.2347 14.0396 69.8349 14.4663 69.3366 14.7596C68.8383 15.0529 68.3007 15.1996 67.7237 15.1996C67.1599 15.1996 66.6223 15.0529 66.1109 14.7596C65.6126 14.4529 65.2062 14.0129 64.8915 13.4396C64.5899 12.8663 64.4391 12.1996 64.4391 11.4396C64.4391 10.6796 64.5899 10.0263 64.8915 9.47961C65.2062 8.91961 65.6126 8.49961 66.1109 8.21961C66.6092 7.92628 67.1468 7.77961 67.7237 7.77961C68.3007 7.77961 68.8383 7.92628 69.3366 8.21961C69.8349 8.51294 70.2347 8.93961 70.5363 9.49961ZM76.4907 4.09961C76.766 4.37961 77.107 4.51961 77.5134 4.51961C77.9068 4.51961 78.2412 4.37961 78.5165 4.09961C78.7919 3.81961 78.9296 3.47294 78.9296 3.05961C78.9296 2.64628 78.7919 2.29961 78.5165 2.01961C78.2412 1.73961 77.9068 1.59961 77.5134 1.59961C77.107 1.59961 76.766 1.73961 76.4907 2.01961C76.2153 2.29961 76.0776 2.64628 76.0776 3.05961C76.0776 3.47294 76.2153 3.81961 76.4907 4.09961ZM78.6149 16.9996V5.97961H76.3727V16.9996H78.6149ZM91.5699 12.3396C91.6224 12.0063 91.6486 11.6329 91.6486 11.2196C91.6486 10.1529 91.4258 9.21291 90.9799 8.39961C90.5341 7.57294 89.9113 6.93294 89.1114 6.47961C88.3116 6.02628 87.4002 5.79961 86.3774 5.79961C85.3153 5.79961 84.3713 6.03294 83.5452 6.49961C82.7323 6.96628 82.0963 7.63294 81.6373 8.49961C81.1916 9.35291 80.9686 10.3463 80.9686 11.4796C80.9686 12.6129 81.1981 13.6129 81.657 14.4796C82.1291 15.3329 82.7716 15.9996 83.5845 16.4796C84.4106 16.9463 85.3416 17.1796 86.3774 17.1796C87.6494 17.1796 88.7115 16.8596 89.5637 16.2196C90.4292 15.5663 91.0258 14.7329 91.3536 13.7196H88.9344C88.4361 14.7463 87.5838 15.2596 86.3774 15.2596C85.5383 15.2596 84.8302 14.9929 84.2533 14.4596C83.6764 13.9263 83.3551 13.2196 83.2895 12.3396H91.5699ZM88.423 8.47961C89 8.98628 89.295 9.65961 89.3081 10.4996H83.3092C83.4141 9.64631 83.7419 8.97294 84.2926 8.47961C84.8433 7.97294 85.5055 7.71961 86.2791 7.71961C87.1314 7.71961 87.8461 7.97294 88.423 8.47961ZM111.041 6.27961C110.503 6.58628 109.743 7.21121 109.743 7.21121V5.97961H107.5V16.9996H109.743V11.1996C109.743 10.0796 109.965 9.29291 110.411 8.83961C110.87 8.38628 111.538 8.15961 112.417 8.15961H112.988V5.97961C112.24 5.97961 111.591 5.95961 111.041 6.27961ZM125.02 16.9996V5.97961H122.778V12.1196C122.778 13.1063 122.529 13.8663 122.03 14.3996C121.546 14.9196 120.884 15.1796 120.044 15.1796C119.205 15.1796 118.543 14.9196 118.057 14.3996C117.573 13.8663 117.33 13.1063 117.33 12.1196V5.97961H115.107V12.4596C115.107 13.4596 115.298 14.3129 115.678 15.0196C116.071 15.7263 116.602 16.2596 117.271 16.6196C117.953 16.9796 118.72 17.1596 119.572 17.1596C120.215 17.1596 120.818 17.0329 121.381 16.7796C121.959 16.5129 122.424 16.1529 122.778 15.6996V16.9996H125.02ZM131.933 6.31961C131.277 6.66628 130.758 7.09294 130.379 7.59961V5.97961H128.137V22.2396H130.379V15.3996C130.785 15.9063 131.309 16.3329 131.952 16.6796C132.594 17.0129 133.329 17.1796 134.155 17.1796C135.099 17.1796 135.958 16.9396 136.732 16.4596C137.518 15.9663 138.134 15.2863 138.581 14.4196C139.026 13.5396 139.249 12.5463 139.249 11.4396C139.249 10.3329 139.026 9.35291 138.581 8.49961C138.134 7.64628 137.518 6.98628 136.732 6.51961C135.958 6.03961 135.099 5.79961 134.155 5.79961C133.329 5.79961 132.588 5.97294 131.933 6.31961ZM136.496 9.47961C136.81 10.0263 136.968 10.6796 136.968 11.4396C136.968 12.1996 136.81 12.8663 136.496 13.4396C136.194 14.0129 135.788 14.4529 135.276 14.7596C134.778 15.0529 134.24 15.1996 133.663 15.1996C133.099 15.1996 132.562 15.0529 132.051 14.7596C131.552 14.4663 131.146 14.0396 130.831 13.4796C130.529 12.9063 130.379 12.2396 130.379 11.4796C130.379 10.7196 130.529 10.0596 130.831 9.49961C131.146 8.93961 131.552 8.51294 132.051 8.21961C132.562 7.92628 133.099 7.77961 133.663 7.77961C134.24 7.77961 134.778 7.92628 135.276 8.21961C135.788 8.49961 136.194 8.91961 136.496 9.47961ZM145.419 6.31961C144.764 6.66628 144.246 7.09294 143.865 7.59961V5.97961H141.623V22.2396H143.865V15.3996C144.273 15.9063 144.797 16.3329 145.439 16.6796C146.082 17.0129 146.816 17.1796 147.642 17.1796C148.586 17.1796 149.445 16.9396 150.218 16.4596C151.005 15.9663 151.622 15.2863 152.067 14.4196C152.514 13.5396 152.736 12.5463 152.736 11.4396C152.736 10.3329 152.514 9.35291 152.067 8.49961C151.622 7.64628 151.005 6.98628 150.218 6.51961C149.445 6.03961 148.586 5.79961 147.642 5.79961C146.816 5.79961 146.075 5.97294 145.419 6.31961ZM149.982 9.47961C150.297 10.0263 150.454 10.6796 150.454 11.4396C150.454 12.1996 150.297 12.8663 149.982 13.4396C149.681 14.0129 149.274 14.4529 148.763 14.7596C148.265 15.0529 147.727 15.1996 147.15 15.1996C146.587 15.1996 146.049 15.0529 145.537 14.7596C145.04 14.4663 144.633 14.0396 144.318 13.4796C144.017 12.9063 143.865 12.2396 143.865 11.4796C143.865 10.7196 144.017 10.0596 144.318 9.49961C144.633 8.93961 145.04 8.51294 145.537 8.21961C146.049 7.92628 146.587 7.77961 147.15 7.77961C147.727 7.77961 148.265 7.92628 148.763 8.21961C149.274 8.49961 149.681 8.91961 149.982 9.47961ZM164.965 12.3396C165.017 12.0063 165.044 11.6329 165.044 11.2196C165.044 10.1529 164.82 9.21291 164.375 8.39961C163.929 7.57294 163.306 6.93294 162.506 6.47961C161.707 6.02628 160.795 5.79961 159.772 5.79961C158.71 5.79961 157.766 6.03294 156.94 6.49961C156.127 6.96628 155.492 7.63294 155.032 8.49961C154.587 9.35291 154.364 10.3463 154.364 11.4796C154.364 12.6129 154.593 13.6129 155.052 14.4796C155.524 15.3329 156.166 15.9996 156.979 16.4796C157.806 16.9463 158.737 17.1796 159.772 17.1796C161.044 17.1796 162.106 16.8596 162.959 16.2196C163.824 15.5663 164.421 14.7329 164.748 13.7196H162.329C161.831 14.7463 160.979 15.2596 159.772 15.2596C158.933 15.2596 158.225 14.9929 157.648 14.4596C157.071 13.9263 156.75 13.2196 156.684 12.3396H164.965ZM161.818 8.47961C162.395 8.98628 162.69 9.65961 162.703 10.4996H156.704C156.809 9.64631 157.137 8.97294 157.687 8.47961C158.238 7.97294 158.9 7.71961 159.674 7.71961C160.527 7.71961 161.241 7.97294 161.818 8.47961ZM175.157 6.33961C174.488 5.97961 173.727 5.79961 172.876 5.79961C172.232 5.79961 171.623 5.92628 171.046 6.17961C170.482 6.43294 170.017 6.78628 169.65 7.23961V5.97961H167.408V16.9996H169.65V10.8396C169.65 9.85291 169.892 9.09961 170.378 8.57961C170.875 8.04628 171.544 7.77961 172.384 7.77961C173.223 7.77961 173.885 8.04628 174.37 8.57961C174.855 9.09961 175.098 9.85291 175.098 10.8396V16.9996H177.321V10.4996C177.321 9.49961 177.13 8.64628 176.75 7.93961C176.37 7.23294 175.839 6.69961 175.157 6.33961Z"/><path d="M10.13 1.16L11.31 3.86C11.7257 4.8018 12.2024 5.8879 12.1379 7.0046C12.0955 7.7393 11.8215 8.4418 11.3553 9.0113C10.6468 9.8768 9.5606 10.3535 8.6179 10.7672L3.76 12.90L2.96 11.10L8.74 8.56C9.1461 8.3840 9.6183 8.1768 9.9263 7.8005C10.1289 7.5530 10.2480 7.2476 10.2665 6.9282C10.2945 6.4428 10.0873 5.9706 9.9074 5.5607L8.32 1.95Z"/><path d="M11.51 20.01L10.32 17.31C9.9103 16.3642 9.4336 15.2781 9.4981 14.1614C9.5405 13.4267 9.8145 12.7242 10.2807 12.1547C10.9892 11.2892 12.0754 10.8125 13.0181 10.3988L17.88 8.26L18.67 10.07L12.90 12.60C12.4899 12.7820 12.0177 12.9892 11.7097 13.3655C11.5071 13.6130 11.3880 13.9184 11.3695 14.2378C11.3415 14.7232 11.5487 15.1954 11.7286 15.6053L13.31 19.21Z"/></svg>';
      }
  })();

  // ── «Meny»
  const tplHtml = `
  <button type="button" class="mgm-btn" aria-expanded="false" aria-controls="mgm-panel">Meny <span class="mgm-plus" aria-hidden="true"></span></button>
  <div class="mgm-veil" aria-hidden="true"></div>
  <div class="mgm-wrap">
    <nav class="mgm-panel" id="mgm-panel" aria-label="Meny">
      <div class="mgm-head" data-m>
        <button type="button" class="mgm-close">Lukk</button>
      </div>
      <ul class="mgm-big">
        <li data-m><a href="index.html#tjenester">Nettsider</a></li>
        <li data-m><a href="index.html#slik-jobber-vi">Slik jobber vi</a></li>
        <li data-m><a href="index.html#kontakt-skjema">Kontakt</a></li>
      </ul>
      <ul class="mgm-sub">
        <li data-m><a href="#" onclick="openContactPopup(); return false;">Bestill en samtale</a></li>
        <li data-m><a href="bibliotek.html">Kundecaser</a></li>
        <li data-m><a href="kontakt.html">Kontakt</a></li>
        <li data-m><a href="vilkår.html">Vilkår</a></li>
        <li data-m><a href="personvern.html">Personvern</a></li>
      </ul>
      <ul class="mgm-contact">
        <li data-m><a href="mailto:post@mediegruppen.no"><span><strong>post@mediegruppen.no</strong><small>For generelle spørsmål</small></span><svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 10L10 2M4 2h6v6" stroke="currentColor" stroke-width="1.2"/></svg></a></li>
        <li data-m><a href="tel:+4748118680"><span><strong>+47 481 18 680</strong><small>Direkte til oss</small></span><svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 10L10 2M4 2h6v6" stroke="currentColor" stroke-width="1.2"/></svg></a></li>
      </ul>
    </nav>
  </div>
`;
  const tpl = document.createElement('template');
  tpl.id = 'mgm-mal';
  tpl.innerHTML = tplHtml;
  document.body.appendChild(tpl);
    // «Meny»: legges rett etter nav-en, så knappen kan følge nav-en når den skjules.
    // Som menyen på badesiden åpner den seg når musen kommer nær knappen (eller
    // ved klikk/tastatur). Selve bevegelsen er CSS-overganger.
  (function () {
      const nav = document.querySelector('.mg-nav');
      const tpl = document.getElementById('mgm-mal');
      if (!nav || !tpl) return;
      nav.after(tpl.content.cloneNode(true));
      const root = document.documentElement;
      const btn = document.querySelector('.mgm-btn');
      const wrap = document.querySelector('.mgm-wrap');
      const panel = document.getElementById('mgm-panel');
      const veil = document.querySelector('.mgm-veil');
      const items = panel.querySelectorAll('[data-m]');
      const focusables = panel.querySelectorAll('a, button');


      const small = matchMedia('(max-width: 768px)');
      const NEAR = 60, LEAVE = 32;
      let open = false, armed = false, closeTimer = 0;
      items.forEach((el, i) => el.style.setProperty('--i', i));

      const dist = (x, y, r) => Math.hypot(
        Math.max(r.left - x, 0, x - r.right),
        Math.max(r.top - y, 0, y - r.bottom)
      );

      const setOpen = (value) => {
        if (open === value) return;
        open = value;
        root.classList.toggle('mgm-open', value);
        // Lukking: en kort uttoning før boksen skjules
        clearTimeout(closeTimer);
        root.classList.toggle('mgm-closing', !value);
        if (!value) closeTimer = setTimeout(() => root.classList.remove('mgm-closing'), 240);
        btn.setAttribute('aria-expanded', String(value));
        panel.setAttribute('aria-hidden', String(!value));
        focusables.forEach((el) => { el.tabIndex = value ? 0 : -1; });
        if (!value) armed = false;
      };

      // Musen nær knappen åpner; godt utenfor boksen lukker
      document.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || small.matches) return;
        if (document.querySelector('.popup-overlay.active, .popup-overlay.open')) return;
        if (open) {
          if (dist(e.clientX, e.clientY, wrap.getBoundingClientRect()) <= LEAVE) return;
          if (panel.contains(document.activeElement)) return;
          setOpen(false);
          return;
        }
        if (nav.classList.contains('nav-hidden')) { armed = true; return; }
        const d = dist(e.clientX, e.clientY, btn.getBoundingClientRect());
        if (d > NEAR) armed = true;
        else if (armed || d === 0) setOpen(true);
      }, { passive: true });

      root.addEventListener('mouseleave', () => {
        if (!panel.contains(document.activeElement)) setOpen(false);
      });
      btn.addEventListener('click', () => setOpen(true));
      document.querySelector('.mgm-close').addEventListener('click', () => { setOpen(false); btn.focus({ preventScroll: true }); });
      veil.addEventListener('click', () => setOpen(false));
      panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && open) { setOpen(false); btn.focus({ preventScroll: true }); }
      });
      panel.addEventListener('focusout', (e) => {
        if (!panel.contains(e.relatedTarget) && e.relatedTarget !== btn) setOpen(false);
      });

      focusables.forEach((el) => { el.tabIndex = -1; });
      panel.setAttribute('aria-hidden', 'true');
    })();

  // ── Footer som avdekkes
    // Footer: avdekkes bak siden (som på badesiden)
    (() => {
      const wrap = document.getElementById('mgf-reveal');
      const footer = wrap && wrap.querySelector('.mgf');
      if (!footer) return;
      let h = 0;
      // Høy footer: når toppen av rammen når toppen av vinduet, slipper den taket
      const onScroll = () => {
        wrap.classList.toggle('is-scrolled', h > window.innerHeight && wrap.getBoundingClientRect().top <= 0);
      };
      const update = () => {
        h = footer.offsetHeight;
        wrap.style.setProperty('--mgf-h', h + 'px');
        wrap.style.setProperty('--mgf-top', Math.max(window.innerHeight - h, 0) + 'px');
        wrap.classList.add('is-on');
        onScroll();
      };
      new ResizeObserver(update).observe(footer);
      window.addEventListener('resize', update);
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    })();

  // ── WebGL-bånd i heroen. data-gl på lerretet velger variant:
  //    kryss (vridde L-bånd, J fra testsiden), buer / bånd (G fra testsiden, buer eller bånd ved kantene).
  //    data-a / data-b: farger (r,g,b 0–1). data-amt: styrke for buer/bånd.
  const FS_KRYSS = `
        precision highp float;
        uniform vec2 u_res;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_morph;
        uniform float u_scroll;
        uniform float u_dark;   // 0 lys side, 1 mørk side
        uniform float u_grain;  // korn i shaderen (0 på mobil)
        uniform vec3 u_colA;    // fargen i den skarpe kanten
        uniform vec3 u_colB;    // fargen mot den myke siden
        const vec3 BG = vec3(0.992, 0.988, 0.984);

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
                     mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
        }

        // Variant J fra testsiden: to L-formede bånd som peker mot hverandre uten å
        // møtes (to grener av en hyperbel med asymptotene v1 og v2). Hvert bånd er
        // som et vridd stoffbånd: bredt og blurry ute ved endene, smalt og skarpt der
        // det vrir seg, og den skarpe kanten bytter side i vridningspunktet (s0).
        vec4 twistBranch(vec2 r, vec2 v1, vec2 v2, float c, float s0, float flip, float seed) {
          vec2 n1 = vec2(-v1.y, v1.x), n2 = vec2(-v2.y, v2.x);
          float l1 = dot(r, n1), l2 = dot(r, n2);
          float d = (l1 * l2 + c) / max(length(l2 * n1 + l1 * n2), 1e-4);  // avstand til grenen
          float s = dot(r, v2) - dot(r, v1);                                 // posisjon langs grenen
          float tw = clamp((s - s0) / 0.55, -1.0, 1.0);
          float u = d * sign(tw) * flip;                     // > 0 inn i båndet fra den skarpe kanten
          float aw = abs(tw);
          // Variasjon langs båndet: bredde, skarphet og styrke svinger og vandrer
          float wob = noise(vec2(s * 3.0 - u_time * 0.12, seed));
          float w = (0.004 + 0.12 * aw) * (0.65 + 0.7 * wob);
          float e = 0.0015 + 0.03 * aw * aw * (0.5 + wob);
          float a = smoothstep(-e, e, u) * exp(-1.3 * pow(max(u, 0.0) / w, 1.6));
          a *= smoothstep(0.0, 0.02, aw + 0.004);
          a *= 0.6 + 0.4 * smoothstep(0.15, 0.75, noise(vec2(s * 1.6 + u_time * 0.08, seed + 2.0)));
          a *= 1.0 - 0.3 * smoothstep(0.3, 1.0, aw);
          vec3 col = mix(u_colA, u_colB, smoothstep(0.1, 1.0, u / w) * 0.85);
          return vec4(col, a);
        }

        vec4 twistRibbon(vec2 p, vec2 c0, vec2 v1, vec2 v2, float c, vec2 s0) {
          vec2 r = p - c0;
          // Myk, organisk bølging, så formen ikke blir stiv og geometrisk
          r += 0.035 * vec2(noise(r * 2.2 + u_time * 0.07) - 0.5, noise(r * 2.2 + 7.3 - u_time * 0.06) - 0.5);
          // Begge grenene regnes ut og blandes mykt (et hardt bytte gir en strek i midten)
          vec4 up = twistBranch(r, v1, v2, c, s0.x, -1.0, 1.0);
          vec4 lo = twistBranch(r, v1, v2, c, s0.y, 1.0, 5.0);
          float k = smoothstep(-0.06, 0.06, dot(r, v1 + v2));
          up.a *= k;
          lo.a *= 1.0 - k;
          float a = up.a + lo.a;
          return vec4((up.rgb * up.a + lo.rgb * lo.a) / max(a, 1e-4), a);
        }

        void main() {
          vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
          p += (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0) * 0.06;
          float k = smoothstep(0.0, 1.0, u_morph);
          // Båndene glir med scrollen, men buene står fast (ellers scrolles de ut
          // av skjermen lenger ned på siden, særlig på mobil der siden er lang)
          p.y += min(u_scroll, 1.0) * 0.35 * (1.0 - k);
          float t = u_time;

          // Formen driver langsomt (vinkler, avstand, vridningspunkter og plassering
          // med ulike perioder), så den hele tiden endrer seg uten å gjenta seg
          vec2 v1 = normalize(vec2(-1.0, 0.15 + 0.22 * sin(t * 0.09) + 0.08 * sin(t * 0.23)));
          vec2 v2 = normalize(vec2(-0.37 + 0.3 * sin(t * 0.07 + 1.3), 1.0));
          // Hjørnene står langt fra hverandre (oppe til venstre og nede til høyre),
          // så båndene rammer inn det sentrerte innholdet og midten er fri
          vec2 c0 = vec2(0.04 * sin(t * 0.05), 0.04 + 0.03 * sin(t * 0.06 + 2.0));
          float gap = 0.034 + 0.008 * sin(t * 0.11 + 0.5);
          vec2 s0 = vec2(-0.02 + 0.12 * sin(t * 0.13), -0.15 + 0.12 * sin(t * 0.1 + 2.1));

          // Når Prinsipper scrolles inn: rommet bøyes rundt et punkt ved høyre kant,
          // og L-ene flates ut og glir fra hverandre til to buer langs høyre side.
          // Skjøten (der vinkelen hopper) peker rett ut til høyre, utenfor skjermen.
          // På smal (stående) mobilskjerm flyttes midtpunktet inn, så buene synes.
          float halfW = 0.5 * u_res.x / u_res.y;
          vec2 cm = vec2(min(1.05, halfW + 0.3), -0.05);
          vec2 dm = p - cm;
          float ang = atan(-dm.y, -dm.x);
          vec2 q = mix(p, vec2(ang * 0.6, length(dm) - 0.62), k);
          float seam = mix(1.0, smoothstep(3.1416, 2.6, abs(ang)), smoothstep(0.0, 0.012, k));
          v1 = normalize(mix(v1, vec2(-1.0, 0.2 + 0.06 * sin(t * 0.09)), k));
          v2 = normalize(mix(v2, vec2(1.0, 0.2 + 0.06 * sin(t * 0.07 + 1.3)), k));
          c0 = mix(c0, vec2(0.04 * sin(t * 0.05), 0.0), k);
          gap = mix(gap, 0.012 + 0.003 * sin(t * 0.11 + 0.5), k);
          // Ingen vridning i buene: vridningspunktet glir langs båndet og ut av
          // skjermen, så buene blir hele uten knekk midt i kurven
          s0 = mix(s0, vec2(-4.0, 4.0), k * k);

          vec3 col = mix(BG, vec3(0.110, 0.110, 0.106), u_dark);
          vec4 rib = twistRibbon(q, c0, v1, v2, gap, s0);
          col = mix(col, rib.rgb, rib.a * 0.8 * seam);
          col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012 * u_grain;  // av på mobil (støylaget dekker)
          gl_FragColor = vec4(col, 1.0);
        }`;
  const FS_BUER = `
        precision highp float;
        uniform vec2 u_res;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_morph;
        uniform float u_scroll;
        uniform float u_dark;   // 0 lys side, 1 mørk side
        uniform float u_grain;  // korn i shaderen (0 på mobil)
        uniform vec3 u_colA;    // mørk ende av fargeskalaen
        uniform vec3 u_colB;    // lys ende av fargeskalaen
        uniform float u_amt;    // styrke
        const vec3 BG = vec3(0.992, 0.988, 0.984);

        // Variant G fra testsiden: kald grå og stålblå
        vec3 spectrum(float t) {
          return mix(u_colA, u_colB, 0.5 + 0.5 * cos(6.2831 * (t + 0.15)));
        }
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

        vec4 band(vec2 p, float angle, float offset, float amp, float freq, float speed, float width, float hue) {
          p = rot(angle) * p;
          float t = u_time * speed;
          float y = offset + amp * sin(p.x * freq + t) + amp * 0.5 * sin(p.x * freq * 2.3 - t * 1.3);
          float slope = amp * freq * cos(p.x * freq + t);
          float d = (p.y - y) / sqrt(1.0 + slope * slope);
          float w = width * (0.35 + 0.65 * smoothstep(-1.6, 0.4, p.x)) * (0.6 + 0.4 * sin(p.x * 1.7 + t * 0.7));
          float k = 0.04 * w;  // grå: nesten ikke fargeskjær i kantene
          vec3 a = vec3(exp(-pow((d - k) / w, 2.0)), exp(-pow(d / w, 2.0)), exp(-pow((d + k) / w, 2.0)));
          float s = max(a.r, max(a.g, a.b));
          return vec4(spectrum(hue + d / w * 0.25) * a / max(s, 1e-4), s);
        }

        void main() {
          vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
          p += (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0) * 0.06;
          // Båndene glir med scrollen, men buene står fast (ellers scrolles de ut
          // av skjermen lenger ned på siden, særlig på mobil der siden er lang)
          p.y += min(u_scroll, 1.0) * 0.35 * (1.0 - smoothstep(0.0, 1.0, u_morph));
          // Variant G: båndene ligger ute ved kantene (oppe til høyre og nede til
          // venstre), og det som havner midt på skjermen tones nesten ut, så
          // teksten står fritt. Formskiftet bøyer dem til buer langs høyre kant.
          float k = smoothstep(0.0, 1.0, u_morph);
          // Halv skjermbredde i samme enhet som p. På smal (stående) mobilskjerm er
          // den liten, så midtpunktet for buene flyttes inn (ellers havner buene
          // utenfor skjermen), og midten dempes mindre (ellers forsvinner alt).
          float halfW = 0.5 * u_res.x / u_res.y;
          float narrow = 1.0 - smoothstep(0.45, 0.8, halfW);
          vec2 c = vec2(min(1.0, halfW + 0.3), -0.05);
          vec2 dc = p - c;
          // Vinkelen måles slik at skjøten (der den hopper) peker rett mot høyre,
          // utenfor skjermen. Da er buene hele der de synes, også på mobil.
          float ang = atan(-dc.y, -dc.x);
          vec2 q = mix(p, vec2(ang * 0.6, length(dc) - 0.55), k);
          float seam = mix(1.0, smoothstep(3.1416, 2.6, abs(ang)), smoothstep(0.0, 0.012, k));
          float calm = mix(mix(0.12, 0.6, narrow), 1.0, smoothstep(0.15, 0.62, length(p * vec2(0.6, 1.0))));
          vec3 col = mix(BG, vec3(0.110, 0.110, 0.106), u_dark);
          vec4 b1 = band(q, mix(-0.32, 0.0, k), mix(0.42, 0.0, k), mix(0.07, 0.025, k), 0.9, 0.11, mix(0.12, 0.07, k), 0.05);
          vec4 b2 = band(q, mix(-0.28, 0.0, k), mix(-0.46, 0.13, k), mix(0.06, 0.02, k), 1.0, 0.09, mix(0.1, 0.045, k), 0.3);
          col = mix(col, b1.rgb, b1.a * 0.62 * u_amt * seam * calm);
          col = mix(col, b2.rgb, b2.a * 0.5 * u_amt * seam * calm);
          col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012 * u_grain;  // av på mobil (støylaget dekker)
          gl_FragColor = vec4(col, 1.0);
        }`;
  const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const vec = (s, d) => (s || d).split(',').map(Number);
  document.querySelectorAll('canvas[data-gl]').forEach((canvas) => {
    const kind = canvas.dataset.gl;
    const gl = canvas.getContext('webgl', { antialias: false });
    if (!gl) return;
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, kind === 'kryss' ? FS_KRYSS : FS_BUER));
    gl.linkProgram(prog); gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(prog, n);
    const defA = kind === 'kryss' ? '0.56,0.73,1.0' : '0.30,0.35,0.42';
    const defB = kind === 'kryss' ? '1.0,0.95,0.88' : '0.86,0.88,0.91';
    gl.uniform3f(U('u_colA'), ...vec(canvas.dataset.a, defA));
    gl.uniform3f(U('u_colB'), ...vec(canvas.dataset.b, defB));
    gl.uniform1f(U('u_amt'), Number(canvas.dataset.amt || 1));
    gl.uniform1f(U('u_morph'), kind === 'buer' ? 1 : 0);
    gl.uniform1f(U('u_scroll'), 0);
    gl.uniform1f(U('u_dark'), 0);
    // Mobil: halv oppløsning, 30 bilder i sekundet og uten korn i shaderen
    const phone = matchMedia('(max-width: 768px)').matches;
    gl.uniform1f(U('u_grain'), phone ? 0 : 1);
    const uRes = U('u_res'), uTime = U('u_time'), uMouse = U('u_mouse');
    const resize = () => {
      const dpr = phone ? 0.5 : Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
      canvas.width = Math.max(1, Math.round(canvas.offsetWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.offsetHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    let lastW = innerWidth;
    window.addEventListener('resize', () => { if (innerWidth !== lastW) { lastW = innerWidth; resize(); } });
    resize();
    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, visible = false, raf = 0, elapsed = 0, last = performance.now();
    window.addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth; ty = 1 - e.clientY / innerHeight; }, { passive: true });
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frame = (now) => {
      if (phone && now - last < 30) { raf = visible ? requestAnimationFrame(frame) : 0; return; }
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      if (document.documentElement.classList.contains('mgm-open')) { raf = 0; return; }
      elapsed += dt; mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 4 : elapsed);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }).observe(canvas);
    new MutationObserver(() => { if (visible && !raf && !document.documentElement.classList.contains('mgm-open')) { last = performance.now(); raf = requestAnimationFrame(frame); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  });
})();
