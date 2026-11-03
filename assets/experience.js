/* LIGHTFIELD / progressive enhancement. No libraries, tracking or data collection. */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const frame = callback => window.requestAnimationFrame(callback);

  // A narrow illuminated line indicates scroll progress, without introducing a floating overlay.
  let scrollQueued = false;
  function updateScrollProgress() {
    scrollQueued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? Math.max(0, Math.min(100, (window.scrollY / max) * 100)) : 0;
    root.style.setProperty('--reading-progress', percent.toFixed(2) + '%');
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; frame(updateScrollProgress); }
  }, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Slow, bounded pointer response. Only transform and CSS variables are touched.
  const instrument = document.querySelector('.instrument');
  const stage = document.querySelector('.hero-art');
  if (finePointer.matches && !reduced.matches && instrument && stage) {
    let scheduled = false;
    let lastX = 0, lastY = 0;
    stage.addEventListener('pointermove', event => {
      const rect = stage.getBoundingClientRect();
      lastX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      lastY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      if (!scheduled) {
        scheduled = true;
        frame(() => {
          instrument.style.setProperty('--parallax-x', (lastX * 8).toFixed(1) + 'px');
          instrument.style.setProperty('--parallax-y', (lastY * 8).toFixed(1) + 'px');
          scheduled = false;
        });
      }
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      instrument.style.setProperty('--parallax-x', '0px');
      instrument.style.setProperty('--parallax-y', '0px');
    });
  }

  if (finePointer.matches && !reduced.matches) {
    document.querySelectorAll('.service-card').forEach(card => {
      let pending = false;
      let xp = '50%', yp = '50%';
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        xp = (100 * (event.clientX - rect.left) / rect.width).toFixed(1) + '%';
        yp = (100 * (event.clientY - rect.top) / rect.height).toFixed(1) + '%';
        if (!pending) {
          pending = true;
          frame(() => {
            card.style.setProperty('--glow-x', xp);
            card.style.setProperty('--glow-y', yp);
            pending = false;
          });
        }
      }, {passive: true});
    });
  }

  // Accessible schematic tabs. The visualization is explicitly illustrative, not live measurements.
  const panel = document.querySelector('.precision-panel');
  if (panel) {
    const tabs = [...panel.querySelectorAll('[role="tab"]')];
    const copies = [...panel.querySelectorAll('.phase-copy')];
    function selectPhase(index, moveFocus) {
      if (index < 0) index = tabs.length - 1;
      if (index >= tabs.length) index = 0;
      tabs.forEach((tab, i) => {
        const selected = index === i;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      copies.forEach((copy, i) => {
        copy.classList.toggle('active', i === index);
        copy.hidden = i !== index;
      });
      panel.dataset.phase = tabs[index].dataset.phase;
      if (moveFocus) tabs[index].focus();
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectPhase(i, false));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = i + 1;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = i - 1;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        selectPhase(next, true);
      });
    });
    selectPhase(0, false);
  }

  // Pause ambient movement when browser tab is hidden to avoid unnecessary GPU work.
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('visuals-paused', document.hidden);
  });
})();