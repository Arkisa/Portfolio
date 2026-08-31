import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';

    return (
      (localStorage.getItem('theme') as 'dark' | 'light') ||
      'dark'
    );
  });

  const themeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Set the theme on the HTML element
    document.documentElement.setAttribute(
      'data-theme',
      theme
    );

    // Save theme
    localStorage.setItem('theme', theme);

    // Tell the SplashCursor which color to use
    document.documentElement.style.setProperty(
      '--cursor-color',
      theme === 'dark'
        ? '#3e3c3c'
        : '#111111'
    );
  }, [theme]);

  useEffect(() => {
    return () => {
      if (themeTimeoutRef.current !== null) {
        window.clearTimeout(
          themeTimeoutRef.current
        );
      }
    };
  }, []);

  function toggleTheme() {
    setSweepKey((k) => k + 1);
    setSweeping(true);

    if (themeTimeoutRef.current !== null) {
      window.clearTimeout(
        themeTimeoutRef.current
      );
    }

    themeTimeoutRef.current =
      window.setTimeout(() => {
        setTheme((t) =>
          t === 'dark'
            ? 'light'
            : 'dark'
        );
      }, 420);
  }

  function closeNav() {
    setNavOpen(false);
  }

  function toggleNav() {
    setNavOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <header className="site-header">
        <a
          href="#home"
          className="brand"
        >
          <span
            className="brand-seal"
            aria-hidden="true"
          >
            <svg viewBox="0 0 60 60">
              <circle
                cx={30}
                cy={30}
                r={27}
              />

              <text
                x={30}
                y={39}
                textAnchor="middle"
              >
                名
              </text>
            </svg>
          </span>
        </a>

        <div className="header-right">
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Open menu"
            aria-expanded={navOpen}
            aria-controls="primaryNav"
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav
            className={`primary-nav${
              navOpen
                ? ' is-open'
                : ''
            }`}
            id="primaryNav"
          >
            <a
              href="#home"
              className="nav-link"
              data-jp="家路"
              onClick={closeNav}
            >
              <span className="nav-en">
                Home
              </span>
            </a>

            <a
              href="#projects"
              className="nav-link"
              data-jp="作品"
              onClick={closeNav}
            >
              <span className="nav-en">
                Works
              </span>
            </a>

            <a
              href="#contact"
              className="nav-link"
              data-jp="便り"
              onClick={closeNav}
            >
              <span className="nav-en">
                Contact
              </span>
            </a>

            <button
              className="nav-link theme-toggle"
              data-jp={
                theme === 'dark'
                  ? '闇'
                  : '光'
              }
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              onClick={toggleTheme}
            >
              <span
                className="nav-en"
                aria-hidden="true"
              >
                {theme === 'dark'
                  ? '☀'
                  : '☾'}
              </span>
            </button>
          </nav>
        </div>
      </header>

      <div
        className={`nav-scrim${
          navOpen
            ? ' is-visible'
            : ''
        }`}
        id="navScrim"
        onClick={closeNav}
      ></div>

      {sweeping && (
        <div
          className="theme-wipe"
          key={sweepKey}
          aria-hidden="true"
          onAnimationEnd={() =>
            setSweeping(false)
          }
        ></div>
      )}
    </>
  );
}