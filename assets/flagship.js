(() => {
  'use strict';
  const frame = document.getElementById('depth-visual');
  const slider = document.getElementById('depth-range');
  if (frame && slider) {
    const update = () => frame.style.setProperty('--depth-reveal', slider.value + '%');
    slider.addEventListener('input', update, {passive:true});
    update();
  }
  const items = document.querySelectorAll('.depth-in');
  if (!items.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(item=>item.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) if (entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }, {threshold:.07});
  items.forEach(item=>io.observe(item));
})();
