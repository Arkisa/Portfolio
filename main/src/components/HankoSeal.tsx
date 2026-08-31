import { useEffect, useRef, useState } from 'react';
import logoMark from '../assets/logo.png';

interface HankoSealProps {
  /** sm = footer signature mark, md = contact-page seal */
  size?: 'sm' | 'md';
  className?: string;
  /** If provided, the seal becomes a real link (e.g. "mailto:you@example.com") */
  href?: string;
  /** Accessible name — required when href is set, since the seal is icon-only */
  label?: string;
}

export default function HankoSeal({
  size = 'md',
  className = '',
  href,
  label,
}: HankoSealProps) {
  const ref = useRef<HTMLElement>(null);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setStamped(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStamped(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const classes = `hanko-seal hanko-seal--${size}${
    stamped ? ' is-stamped' : ''
  }${href ? ' hanko-seal--live' : ''}${
    className ? ` ${className}` : ''
  }`;

  const face = (
    <span className="hanko-face">
      <span
        className="hanko-mark"
        style={{
          WebkitMaskImage: `url(${logoMark})`,
          maskImage: `url(${logoMark})`,
        }}
      />
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        aria-label={label}
      >
        {face}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={classes}
      aria-hidden="true"
    >
      {face}
    </div>
  );
}