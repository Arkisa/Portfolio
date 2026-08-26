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

// Close mobile nav after choosing a section
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ============================================================
// Ambient drifting embers (purely decorative, respects reduced motion)
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const windLayer = document.getElementById('windLayer');
  const EMBER_COUNT = window.innerWidth < 720 ? 10 : 18;

  for (let i = 0; i < EMBER_COUNT; i++) {
    const ember = document.createElement('span');
    ember.className = 'ember';
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay = Math.random() * 12;
    const drift = (Math.random() * 160 - 80).toFixed(0) + 'px';
    const size = (3 + Math.random() * 4).toFixed(1) + 'px';

    ember.style.left = left + 'vw';
    ember.style.width = size;
    ember.style.height = size;
    ember.style.setProperty('--dx', drift);
    ember.style.animationDuration = duration + 's';
    ember.style.animationDelay = delay + 's';

    windLayer.appendChild(ember);
  }
}
