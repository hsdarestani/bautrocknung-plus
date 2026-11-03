/* Small, progressive interactions. All content is present without JavaScript. */
(() => {
 const menu = document.querySelector('#menu-toggle');
 const nav = document.querySelector('#mobile-nav');
 if(menu && nav) {
  const sync = () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen'); menu.querySelector('span').textContent=open?'−':'+'; nav.inert=!open; };
  sync(); menu.addEventListener('click',sync);
  document.addEventListener('keydown',e=>{if(e.key==='Escape') sync()});
  window.addEventListener('resize',sync);
 }
 const wizard=document.querySelector('#damage-wizard');
 if(wizard) wizard.addEventListener('submit',e=>e.preventDefault());
 const hero=document.querySelector('.architecture');
 if(hero && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const io=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){hero.animate([{opacity:.35,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.2,.6,.2,1)'});io.disconnect()}},{threshold:.2});io.observe(hero);
 }
})();
(() => {
 const menu=document.querySelector('#menu-toggle'),nav=document.querySelector('#mobile-nav');
 if(!menu||!nav)return;
 const update=()=>{let open=menu.getAttribute('aria-expanded')==='true';document.querySelectorAll('main,.contact-close,.site-footer').forEach(el=>el.inert=open)};
 menu.addEventListener('click',update);document.addEventListener('keydown',e=>{if(e.key==='Escape'){update();menu.focus()}});window.addEventListener('resize',update);
 nav.addEventListener('keydown',e=>{if(e.key==='Tab'&&!e.shiftKey&&e.target===nav.lastElementChild){e.preventDefault();menu.focus()}});
 menu.addEventListener('keydown',e=>{if(e.key==='Tab'&&e.shiftKey&&menu.getAttribute('aria-expanded')==='true'){e.preventDefault();nav.lastElementChild.focus()}});
})();
