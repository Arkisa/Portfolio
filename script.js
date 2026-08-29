// ===== boot screen =====
window.addEventListener('load', () => {
  const bootScreen = document.getElementById('bootScreen');
  if (!bootScreen) return;
  setTimeout(() => {
    bootScreen.classList.add('boot-done');
    setTimeout(() => bootScreen.remove(), 700);
  }, 3000);
});

// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
const navScrim   = document.getElementById('navScrim');

function closeNav(){
  primaryNav.classList.remove('is-open');
  navScrim.classList.remove('is-visible');
  navToggle.setAttribute('aria-expanded', 'false');
}
function openNav(){
  primaryNav.classList.add('is-open');
  navScrim.classList.add('is-visible');
  navToggle.setAttribute('aria-expanded', 'true');
}

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.contains('is-open');
  isOpen ? closeNav() : openNav();
});
navScrim.addEventListener('click', closeNav);

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ============================================================
// Ambient drifting embers (purely decorative, respects reduced motion)
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const windLayer = document.getElementById('windLayer');
  const EMBER_COUNT = window.innerWidth < 720 ? 90 : 160;

  for (let i = 0; i < EMBER_COUNT; i++) {
    const ember = document.createElement('span');
    ember.className = 'ember';
    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 3;
    const drift = (Math.random() * 700 - 350).toFixed(0) + 'px';
    const size = (5 + Math.random() * 6).toFixed(1) + 'px';

    ember.style.left = left + 'vw';
    ember.style.width = size;
    ember.style.height = size;
    ember.style.setProperty('--dx', drift);
    ember.style.animationDuration = duration + 's';
    ember.style.animationDelay = delay + 's';

    windLayer.appendChild(ember);
  }
}

// ============================================================
// Project carousel
// ============================================================
(function(){
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to project ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsWrap.appendChild(dot);
  });

  function render(){
    track.style.transform = `translateX(-${current * 100}%)`;
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function goTo(index){
    current = (index + slides.length) % slides.length;
    render();
  }

  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  let auto;
  function startAuto(){ auto = setInterval(() => goTo(current + 1), 7000); }
  function resetAuto(){ clearInterval(auto); startAuto(); }
  startAuto();

  const viewport = track.closest('.carousel-viewport');
  viewport.addEventListener('mouseenter', () => clearInterval(auto));
  viewport.addEventListener('mouseleave', startAuto);
})();