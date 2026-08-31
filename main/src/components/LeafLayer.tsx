import { useEffect, useRef } from 'react';

export default function LeafLayer() {
  const leafLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const leafLayer = leafLayerRef.current;
    if (prefersReducedMotion || !leafLayer) return;

    const LEAF_COUNT = window.innerWidth < 720 ? 40 : 75;
    const LEAF_COLORS = ['#e9eef0', '#c7d0d2', '#a9b4b6'];
    const LEAF_SHAPES = [
      '<path d="M12 2C8 6 4 10 4 15a8 8 0 0 0 16 0c0-5-4-9-8-13z"/>',
      '<path d="M12 3c-3 4-7 6-7 11a7 7 0 0 0 14 0c0-5-4-7-7-11z"/>',
    ];

    for (let i = 0; i < LEAF_COUNT; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';

      const top = Math.random() * 100;
      const duration = 4 + Math.random() * 4;
      const delay = Math.random() * -duration;
      const dy = (Math.random() * 90 - 45).toFixed(0) + 'px';
      const size = (18 + Math.random() * 16).toFixed(1) + 'px';
      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      const shape = LEAF_SHAPES[Math.floor(Math.random() * LEAF_SHAPES.length)];

      leaf.style.top = top + '%';
      leaf.style.width = size;
      leaf.style.height = size;
      leaf.style.setProperty('--dy', dy);
      leaf.style.animationDuration = duration + 's';
      leaf.style.animationDelay = delay + 's';
      leaf.innerHTML = `<svg viewBox="0 0 24 24" fill="${color}">${shape}</svg>`;

      leafLayer.appendChild(leaf);
    }

    return () => {
      leafLayer.innerHTML = '';
    };
  }, []);

  return <div className="leaf-layer" id="leafLayer" ref={leafLayerRef} aria-hidden="true"></div>;
}