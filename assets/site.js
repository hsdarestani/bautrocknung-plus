(() => {
  'use strict';
  const $ = (selector, scope=document) => scope.querySelector(selector);
  const $$ = (selector, scope=document) => [...scope.querySelectorAll(selector)];

  const menuButton = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  if (menuButton && mobileNav) {
    const close = () => { mobileNav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); document.body.classList.remove('locked'); };
    menuButton.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('locked', open);
    });
    $$('#mobile-nav a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  const path = location.pathname.replace(/\/$/, '') || '/';
  $$('[data-nav]').forEach(a => {
    const href = new URL(a.href).pathname.replace(/\/$/, '') || '/';
    if (href === path || (href === '/leistungen' && ['/leckortung','/bautrocknung','/wasserschaden','/versicherung'].includes(path))) {
      a.classList.add('active'); a.setAttribute('aria-current','page');
    }
  });

  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, {threshold:.08,rootMargin:'0px 0px -35px 0px'});
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  function openEmail(subject, body) {
    const url = 'mailto:info@bautrocknung-plus.de?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = url;
  }

  const contact = $('#contact-form');
  if (contact) contact.addEventListener('submit', e => {
    e.preventDefault();
    if (!contact.reportValidity()) return;
    const d = new FormData(contact);
    const line = (key) => String(d.get(key) || '').trim();
    const body = [
      'Anfrage über die Website Bautrocknung Plus', '',
      'Name: ' + line('name'),
      'Telefon: ' + line('phone'),
      'E-Mail: ' + line('email'),
      'Anliegen: ' + line('service'),
      'Nachricht:', line('message'), '',
      'Diese E-Mail wurde im E-Mail-Programm vorbereitet. Sie muss dort noch gesendet werden.'
    ].join('\n');
    openEmail('Anfrage: ' + line('service') + ' – Bautrocknung Plus', body);
    const status = $('#contact-status');
    if (status) status.textContent = 'Bitte senden Sie den Entwurf in Ihrem E-Mail-Programm. Falls sich kein Programm öffnet, schreiben Sie direkt an info@bautrocknung-plus.de.';
  });

  const wizard = $('#damage-wizard');
  if (!wizard) return;
  let step = 0;
  const steps = $$('.wizard-step', wizard);
  const indicators = $$('.wizard-progress span', wizard);
  const back = $('#wizard-back');
  const next = $('#wizard-next');
  const error = $('#wizard-error');
  const required = (selector, scope) => {
    const el = $(selector, scope);
    return el && String(el.value || '').trim() !== '';
  };
  const show = (initial = false) => {
    steps.forEach((el,i) => { el.hidden = i !== step; });
    indicators.forEach((el,i) => el.classList.toggle('active', i <= step));
    back.hidden = step === 0;
    next.textContent = step === steps.length - 1 ? 'E-Mail vorbereiten' : 'Weiter';
    error.textContent = '';
    const focus = $('h2', steps[step]);
    if (focus) focus.focus({preventScroll:true});
    if (!initial) wizard.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  };
  const validate = () => {
    const active = steps[step];
    if (step === 0 && !$('input[name="damage"]:checked', active)) return 'Bitte wählen Sie die Art des Schadens.';
    if (step === 1 && !$('input[name="urgency"]:checked', active)) return 'Bitte wählen Sie die Dringlichkeit.';
    if (step === 2 && (!required('input[name="postcode"]', active) || !$('input[name="postcode"]',active).checkValidity())) return 'Bitte geben Sie eine gültige Postleitzahl ein.';
    if (step === 3) {
      for (const name of ['name','phone','email']) {
        const input = $('[name="' + name + '"]', active);
        if (input && !input.checkValidity()) { input.reportValidity(); return 'Bitte prüfen Sie Ihre Kontaktdaten.'; }
      }
      const consent = $('[name="privacy"]', active);
      if (!consent.checked) return 'Bitte bestätigen Sie den Datenschutzhinweis.';
    }
    return '';
  };
  back.addEventListener('click', () => { if (step > 0) { step--; show(); } });
  next.addEventListener('click', () => {
    const message = validate();
    if (message) { error.textContent = message; return; }
    if (step < steps.length-1) { step++; show(); return; }
    const d = new FormData(wizard);
    const v = key => String(d.get(key)||'').trim();
    const body = [
      'SCHADENMELDUNG – Bautrocknung Plus', '',
      'Schadensart: ' + v('damage'),
      'Dringlichkeit: ' + v('urgency'),
      'PLZ: ' + v('postcode'),
      'Ort/Straße: ' + v('address'), '',
      'Ansprechperson: ' + v('name'),
      'Telefon: ' + v('phone'),
      'E-Mail: ' + v('email'), '',
      'Beschreibung:', v('description') || '(keine zusätzlichen Angaben)', '',
      'Hinweis: Bitte bei Bedarf Fotos als Anhang im E-Mail-Programm hinzufügen.'
    ].join('\n');
    openEmail('Schadenmeldung – ' + v('damage') + ' – ' + v('postcode'), body);
    error.style.color='var(--ink)';
    error.textContent='Bitte senden Sie den Entwurf in Ihrem E-Mail-Programm. Auf dieser Website wurde noch nichts übertragen. Falls sich kein Programm öffnet: info@bautrocknung-plus.de.';
  });
  show(true);
})();