/* BAUTROCKNUNG PLUS / Editorial interaction
   The UI never pretends to display live sensor data. No autonomous animations. */
(() => {
  'use strict';
  const section = document.querySelector('.method-interactive');
  if (!section) return;

  const tabs = [...section.querySelectorAll('[role="tab"]')];
  const descriptions = [...section.querySelectorAll('[data-method-copy]')];
  const image = section.querySelector('[data-method-image]');
  const figureLabel = section.querySelector('[data-method-figure-label]');
  const detailPanel = section.querySelector('[role="tabpanel"]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function activate(index, keyboard = false) {
    if (!tabs.length || !image) return;
    const resolved = (index + tabs.length) % tabs.length;
    const selected = tabs[resolved];
    tabs.forEach((tab, i) => {
      const active = i === resolved;
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    descriptions.forEach((item, i) => {
      item.hidden = i !== resolved;
      item.classList.toggle('active', i === resolved);
    });

    detailPanel.setAttribute('aria-labelledby', selected.id);
    const target = selected.dataset.photo;
    if (target && image.getAttribute('src') !== target) {
      if (!reduceMotion.matches) image.style.opacity = '.58';
      image.setAttribute('src', target);
      image.setAttribute('alt', selected.dataset.alt || 'Fotografische Illustration zum Arbeitsschritt');
      const restore = () => { image.style.opacity = ''; };
      if (image.complete) restore();
      else image.addEventListener('load', restore, { once:true });
    }
    if (figureLabel) figureLabel.textContent = selected.dataset.caption || 'ARBEITSSCHRITT';
    if (keyboard) selected.focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(i));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = i + 1;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = i - 1;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(target, true);
    });
  });
  activate(0);
})();