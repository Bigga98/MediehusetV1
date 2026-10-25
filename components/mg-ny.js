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
        logo.innerHTML = '<svg viewBox="0 0 19 18" fill="none" aria-hidden="true"><path d="M10.9171 17.7263C7.57499 15.3234 1.49297 7.23626 0.05861 3.1328C-0.160674 2.50546 0.260582 1.89084 0.912257 1.76064C5.14796 0.914379 12.4872 0.0440429 17.7478 5.56984e-05C18.6028 -0.00709316 19.1959 0.822345 18.9222 1.63245C17.2885 6.46783 14.4579 13.3157 12.4353 17.2866C12.1385 17.8695 11.4481 18.108 10.9171 17.7263Z" fill="url(#mgh-logo-grad)"/><defs><linearGradient id="mgh-logo-grad" x1="18.9634" y1="0.784941" x2="5.30201" y2="11.7064" gradientUnits="userSpaceOnUse"><stop stop-color="#151514"/><stop offset="0.144231" stop-color="#3A3C3E"/><stop offset="0.610577" stop-color="#6E7276"/><stop offset="1" stop-color="#A9ADB1"/></linearGradient></defs></svg><span class="mgh-logo__txt">mediegruppen</span>';
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
          col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012;
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
          col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012;
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
    const uRes = U('u_res'), uTime = U('u_time'), uMouse = U('u_mouse');
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
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
