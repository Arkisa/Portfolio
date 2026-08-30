import { useEffect, useRef, useState } from 'react';
import craveh from '../assets/craveh.png';
import weatherApp from '../assets/WeaherApp.png';
import studyMate from '../assets/StudyMate.png';

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
    tech: ['Vue', 'C#', 'XAML', 'MVVM', 'SQLite', 'Open-Meteo API'],
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

  const wipeKeyRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopAuto() {
    if (autoRef.current !== null) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }

  function startAuto() {
    stopAuto();

    autoRef.current = setInterval(() => {
      wipeKeyRef.current += 1;

      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  function goTo(index: number) {
    wipeKeyRef.current += 1;

    setCurrent((index + slides.length) % slides.length);
  }

  useEffect(() => {
    startAuto();

    return () => {
      stopAuto();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

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

  const active = slides[current];

  return (
    <section id="projects" className="section projects">
      <header className="section-head">
        <h2 className="section-kicker" data-jp="作品集">
          Selected Works
        </h2>
      </header>

      <div className="ink-carousel" ref={viewportRef}>
        <article
          className="ink-carousel-slide"
          key={wipeKeyRef.current}
          style={{ ['--tint' as string]: active.tint }}
        >
          <div className="carousel-info">
            <span
              className="ink-carousel-kanji"
              aria-hidden="true"
            >
              {active.kanji}
            </span>

            <h3 className="carousel-title">
              {active.title}
            </h3>

            <p className="carousel-desc">
              {active.desc}
            </p>

            <ul className="tech-list">
              {active.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div className="carousel-links">
              {active.links.map((link) => (
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
              src={active.img}
              alt={active.alt}
            />
          </div>
        </article>
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-arrow carousel-arrow--prev"
          aria-label="Previous project"
          onClick={() => {
            goTo(current - 1);
            resetAuto();
          }}
        >
          ‹
        </button>

        <div
          className="carousel-dots"
          role="tablist"
          aria-label="Project slides"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              className={`carousel-dot${
                i === current ? ' is-active' : ''
              }`}
              aria-label={`Go to project ${i + 1}`}
              aria-selected={i === current}
              role="tab"
              onClick={() => {
                goTo(i);
                resetAuto();
              }}
            />
          ))}
        </div>

        <button
          className="carousel-arrow carousel-arrow--next"
          aria-label="Next project"
          onClick={() => {
            goTo(current + 1);
            resetAuto();
          }}
        >
          ›
        </button>
      </div>
    </section>
  );
}