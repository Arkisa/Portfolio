// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

interface WordPair {
  fi: string;
  se: string;
}

interface ScrambledTextProps {
  words: WordPair[];
  className?: string;
  duration?: number;
  speed?: number;
  scrambleChars?: string; // characters flickered through mid-transition
}

export default function ScrambledText({
  words,
  className = '',
  duration = 0.6,
  speed = 50,
  scrambleChars = '.',
}: ScrambledTextProps) {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  function handleEnter(i: number) {
    const el = wordRefs.current[i];
    if (!el) return;

    gsap.to(el, {
      duration,
      scrambleText: {
        text: words[i].se,
        chars: scrambleChars,
        speed,
      },
      overwrite: true,
    });
  }

  function handleLeave(i: number) {
    const el = wordRefs.current[i];
    if (!el) return;

    gsap.to(el, {
      duration,
      scrambleText: {
        text: words[i].fi,
        chars: scrambleChars,
        speed,
      },
      overwrite: true,
    });
  }

  return (
  <span className={className}>
    {words.map((word, i) => (
      <span
        key={word.fi}
        onMouseEnter={() => handleEnter(i)}
        onMouseLeave={() => handleLeave(i)}
        style={{
          display: 'inline-grid',
          justifyItems: 'start',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            visibility: 'hidden',
            whiteSpace: 'nowrap',
            gridArea: '1 / 1',
          }}
        >
          {word.fi}
        </span>
        <span
          style={{
            visibility: 'hidden',
            whiteSpace: 'nowrap',
            gridArea: '1 / 1',
          }}
        >
          {word.se}
        </span>
        <span
          ref={(el) => {
            wordRefs.current[i] = el;
          }}
          style={{
            gridArea: '1 / 1',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {word.fi}
        </span>
      </span>
    ))}
  </span>
);
}