import { useEffect, useRef } from 'react';

export default function WindLayer() {
  const windLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const windLayer = windLayerRef.current;
    if (prefersReducedMotion || !windLayer) return;

    const EMBER_COUNT = window.innerWidth < 720 ? 40 : 70;
    // rise distance is measured from the section's own height, not the
    // viewport, so embers always travel fully off the top of their section
    const rise = windLayer.offsetHeight * 1.15;

    for (let i = 0; i < EMBER_COUNT; i++) {
      const ember = document.createElement('span');
      ember.className = 'ember';

      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 2;
      const delay = Math.random() * 3;
      const drift = (Math.random() * 700 - 350).toFixed(0) + 'px';
      const size = (5 + Math.random() * 6).toFixed(1) + 'px';

      ember.style.left = left + '%';
      ember.style.width = size;
      ember.style.height = size;
      ember.style.setProperty('--dx', drift);
      ember.style.setProperty('--rise', rise + 'px');
      ember.style.animationDuration = duration + 's';
      ember.style.animationDelay = delay + 's';

      windLayer.appendChild(ember);
    }

    return () => {
      windLayer.innerHTML = '';
    };
  }, []);

  return <div className="wind-layer" id="windLayer" ref={windLayerRef} aria-hidden="true"></div>;
}