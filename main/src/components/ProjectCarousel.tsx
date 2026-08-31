import { useEffect, useRef, useState } from 'react';
import craveh from '../assets/craveh.png';
import weatherApp from '../assets/WeaherApp.png';
import studyMate from '../assets/StudyMate.png';
import WindLayer from './WindLayer';

interface Slide {
  title: string;
  desc: string;
  tech: string[];
  links: {
    label: string;
    href: string;
    variant: 'primary' | 'ghost';
  }[];
  tint: string;
  img: string;
  alt: string;
  kanji: string;
}

const slides: Slide[] = [
  {
    title: 'Craveh',
    desc: 'A food ordering and delivery system that allows customers to browse menus, place orders, and track their food deliveries online.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    links: [
      {
        label: 'View Project',
        href: 'https://craveh.dcism.org',
        variant: 'primary',
      },
      {
        label: 'Source Code',
        href: 'https://github.com/hynnah/craveh',
        variant: 'ghost',
      },
    ],
    tint: '#8c2f2f',
    img: craveh,
    alt: 'Craveh screenshot',
    kanji: '一番目',
  },

  {
    title: 'Weather App',
    desc: 'A weather app that uses an external API to track weather reports in various cities across the globe.',
    tech: [
      'Vue',
      'C#',
      'XAML',
      'MVVM',
      'SQLite',
      'Open-Meteo API',
    ],
    links: [
      {
        label: 'Source Code',
        href: 'https://github.com/FxhsZyan/WeatherApp',
        variant: 'ghost',
      },
    ],
    tint: '#B8462E',
    img: weatherApp,
    alt: 'Weather App screenshot',
    kanji: '二番目',
  },

  {
    title: 'Studymate',
    desc: 'A website that helps students keep track of scheduled dates, deadlines and expenses.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    links: [
      {
        label: 'View Project',
        href: 'https://studymate.dcism.org',
        variant: 'primary',
      },
      {
        label: 'Source Code',
        href: 'https://github.com/StevenTampos/StudyMate',
        variant: 'ghost',
      },
    ],
    tint: '#C6A66B',
    img: studyMate,
    alt: 'StudyMate',
    kanji: '三番目',
  },
];

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [transitionKey, setTransitionKey] = useState(0);

  const currentRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /*
   * Keep the ref synchronized with the current slide.
   * This lets the autoplay interval access the latest slide
   * without constantly recreating the interval.
   */
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  /*
   * Stop autoplay.
   */
  function stopAuto() {
    if (autoRef.current !== null) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }

  /*
   * Start autoplay.
   */
  function startAuto() {
    stopAuto();

    autoRef.current = setInterval(() => {
      goTo(currentRef.current + 1, 1);
    }, 7000);
  }

  /*
   * Restart autoplay after user interaction.
   */
  function resetAuto() {
    stopAuto();
    startAuto();
  }

  /*
   * Change slides.
   */
  function goTo(index: number, dir: 1 | -1) {
    const normalized =
      (index + slides.length) % slides.length;

    // Don't animate if we're already on this slide.
    if (normalized === currentRef.current) {
      return;
    }

    /*
     * Lock the viewport height while both slides are
     * absolutely positioned during the animation.
     */
    const el = viewportRef.current;

    if (el) {
      el.style.height = `${el.offsetHeight}px`;
    }

    setDirection(dir);
    setPrevIndex(currentRef.current);
    setCurrent(normalized);

    // Force a new animation instance.
    setTransitionKey((key) => key + 1);
  }

  /*
   * Initialize autoplay when component mounts.
   */
  useEffect(() => {
    startAuto();

    return () => {
      stopAuto();
    };

    // We intentionally only initialize autoplay once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Pause autoplay while hovering over the carousel.
   */
  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const onEnter = () => {
      stopAuto();
    };

    const onLeave = () => {
      startAuto();
    };

    viewport.addEventListener('mouseenter', onEnter);
    viewport.addEventListener('mouseleave', onLeave);

    return () => {
      viewport.removeEventListener('mouseenter', onEnter);
      viewport.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /*
   * Called when the incoming slide finishes its animation.
   */
  function handleIncomingSettled() {
    setPrevIndex(null);

    const el = viewportRef.current;

    if (el) {
      el.style.height = 'auto';
    }
  }

  /*
   * Render the content inside each slide.
   */
  function renderSlideBody(slide: Slide) {
    return (
      <div className="carousel-track">
        <div className="carousel-info">
          <span
            className="ink-carousel-kanji"
            aria-hidden="true"
          >
            {slide.kanji}
          </span>

          <h3 className="carousel-title">
            {slide.title}
          </h3>

          <p className="carousel-desc">
            {slide.desc}
          </p>

          <ul className="tech-list">
            {slide.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="carousel-links">
            {slide.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-${link.variant}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="carousel-media">
          <img
            src={slide.img}
            alt={slide.alt}
          />
        </div>
      </div>
    );
  }

  const active = slides[current];

  const outgoing =
    prevIndex !== null
      ? slides[prevIndex]
      : null;

  const isTransitioning = outgoing !== null;

  return (
    <section
      id="projects"
      className="section projects"
    >
      <WindLayer />

      <header className="section-head">
        <h2
          className="section-kicker"
          data-jp="作品集"
        >
          Selected Works
        </h2>
      </header>

      <div
        className="ink-carousel"
        ref={viewportRef}
      >
        {/* Ink wipe animation */}
        <div
          className="carousel-wipe"
          key={`wipe-${transitionKey}`}
          aria-hidden="true"
        />

        {/* Previous / outgoing slide */}
        {outgoing && (
          <article
            className={`ink-carousel-slide ink-carousel-slide--outgoing ${
              direction === 1
                ? 'is-leaving-left'
                : 'is-leaving-right'
            }`}
            style={
              {
                '--tint': outgoing.tint,
              } as React.CSSProperties
            }
          >
            {renderSlideBody(outgoing)}
          </article>
        )}

        {/* Current / incoming slide */}
        <article
          className={`ink-carousel-slide${
            isTransitioning
              ? ` ink-carousel-slide--incoming ${
                  direction === 1
                    ? 'is-entering-right'
                    : 'is-entering-left'
                }`
              : ''
          }`}
          key={`slide-${transitionKey}`}
          style={
            {
              '--tint': active.tint,
            } as React.CSSProperties
          }
          onAnimationEnd={
            isTransitioning
              ? handleIncomingSettled
              : undefined
          }
        >
          {renderSlideBody(active)}
        </article>
      </div>

      {/* Carousel controls */}
      <div className="carousel-controls">
        {/* Previous button */}
        <button
          type="button"
          className="carousel-arrow carousel-arrow--prev"
          aria-label="Previous project"
          onClick={() => {
            goTo(current - 1, -1);
            resetAuto();
          }}
        >
          ‹
        </button>

        {/* Dots */}
        <div
          className="carousel-dots"
          role="tablist"
          aria-label="Project slides"
        >
          {slides.map((slide, i) => (
            <button
              type="button"
              key={slide.title}
              className={`carousel-dot${
                i === current
                  ? ' is-active'
                  : ''
              }`}
              aria-label={`Go to project ${i + 1}`}
              aria-selected={i === current}
              role="tab"
              onClick={() => {
                if (i === current) {
                  return;
                }

                goTo(
                  i,
                  i > current ? 1 : -1
                );

                resetAuto();
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          type="button"
          className="carousel-arrow carousel-arrow--next"
          aria-label="Next project"
          onClick={() => {
            goTo(current + 1, 1);
            resetAuto();
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}
