(() => {
  'use strict';
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector('#blue-menu-toggle');
  const nav = document.querySelector('#blue-mobile-nav');
  const setMenu = open => {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    nav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  };
  if (menu && nav) {
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); }, { passive: true });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
    setMenu(false);
  }
  const reveals = [...document.querySelectorAll('.blue-reveal, .blue-image-reveal')];
  if (!prefersReduced.matches && 'IntersectionObserver' in window) {
    root.classList.add('js-motion');
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .06, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(element => observer.observe(element));
  } else reveals.forEach(element => element.classList.add('is-visible'));
  const header = document.querySelector('#site-header');
  if (header) {
    let scheduled = false;
    const updateHeader = () => {
      scheduled = false;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateHeader); }
    }, { passive: true });
    updateHeader();
  }
})();