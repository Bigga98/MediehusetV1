/* Google Analytics: klikk på telefon, e-post og «Kopier» (kontakt uten skjema).
   Hendelsen heter «kontakt_klikk» med metode = telefon | epost | kopier. Consent Mode avgjør hva Google lagrer. */
(function () {
  document.addEventListener('click', function (e) {
    if (!window.gtag || !e.target.closest) return;
    var el = e.target.closest('a[href^="tel:"], a[href^="mailto:"], .mgtl__kopier, [data-kopier]');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var metode = href.indexOf('tel:') === 0 ? 'telefon' : href.indexOf('mailto:') === 0 ? 'epost' : 'kopier';
    gtag('event', 'kontakt_klikk', { metode: metode, verdi: el.getAttribute('data-kopier') || href.replace(/^(tel:|mailto:)/, ''), side: location.pathname });
  }, true);
})();
