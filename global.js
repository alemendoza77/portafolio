/* ═══════════════════════════════════════
   GLOBAL.JS — Cursor, navbar scroll,
   hamburger, mobile menu, marquee,
   scroll-reveal. Included on every page.
   ═══════════════════════════════════════ */

// ── CURSOR  
const cur = document.getElementById('cur');
const curR = document.getElementById('cur-r');
document.addEventListener('mousemove', e => {
  cur.style.left  = e.clientX + 'px';
  cur.style.top   = e.clientY + 'px';
  setTimeout(() => {
    curR.style.left = e.clientX + 'px';
    curR.style.top  = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a, button, .proj-tab, .exp-logo-zone').forEach(el => {
  el.addEventListener('mouseenter', () => { curR.style.width='60px'; curR.style.height='60px'; curR.style.opacity='0.5'; });
  el.addEventListener('mouseleave', () => { curR.style.width='38px'; curR.style.height='38px'; curR.style.opacity='1'; });
});

// ── NAVBAR SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('sc', scrollY > 60));

// ── MARK ACTIVE NAV LINK
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.n-links a, #mmenu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── HAMBURGER / MOBILE MENU
const ham = document.getElementById('ham');
const mm  = document.getElementById('mmenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('on');
  mm.classList.toggle('on');
});


function closeM() {
    if(ham) ham.classList.remove('on');
    if(mm) mm.classList.remove('on');
}

// ── MARQUEE
(function() {
  const words = ['Java Spring Boot','▸','Content Strategy','▸','UX Writing','▸','SEO','▸','React','▸','Marketing Digital','▸','Full Stack','▸','IA & Automatización','▸','Node.js','▸','Scrum','▸','Periodismo','▸','Git / GitHub','▸'];
  const mt = document.getElementById('mtrack');
  if (!mt) return;
  const html = words.map(w => `<span class="m-item${w==='▸'?' accent':''}">${w}</span>`).join('');
  mt.innerHTML = html + html;
})();

// ── SCROLL REVEAL (Mejorado para detectar cambios de pestaña)
const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add('v');
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.05 });

function initReveal() {
    document.querySelectorAll('.reveal, .exp-card, .sk-card, .edu-card').forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initReveal);


// ── LÓGICA DE MODAL
function closeModal() {
    const modal = document.getElementById('proj-modal');
    const content = document.getElementById('m-content');

    if (!modal) return;

    // 1. Cerramos visualmente
    modal.classList.remove('open');
    document.body.style.overflow = '';

    // 2. Limpiamos contenido (esto detiene el PDF/Video)
    if (content) content.innerHTML = '';
}

// En tu script de experiencia.html
document.addEventListener('DOMContentLoaded', () => {
  const zones = ['exp-logo-1', 'exp-logo-2', 'exp-logo-3'];
  zones.forEach(zoneId => {
    const savedImg = localStorage.getItem('logo_' + zoneId);
    if (savedImg) {
      const zoneElement = document.getElementById(zoneId);
      const img = zoneElement.querySelector('img');
      img.src = savedImg;
      zoneElement.classList.add('has-img');
    }
    // Si no hay savedImg, el navegador mostrará el src que pusiste en el HTML
  });
});