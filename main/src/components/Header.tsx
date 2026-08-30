import { useEffect, useState } from 'react';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
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
        <a href="#home" className="brand">
          <span className="brand-seal" aria-hidden="true">
            <svg viewBox="0 0 60 60"><circle cx={30} cy={30} r={27} /><text x={30} y={39} textAnchor="middle">名</text></svg>
          </span>
          <span className="brand-name">Cris Joseph Arquiza</span>
        </a>

        <div className="header-right">
          <button
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Open menu"
            aria-expanded={navOpen}
            aria-controls="primaryNav"
            onClick={toggleNav}
          >
            <span></span><span></span><span></span>
          </button>

          <nav className={`primary-nav${navOpen ? ' is-open' : ''}`} id="primaryNav">
            <a href="#home" className="nav-link" data-jp="家路" onClick={closeNav}>
              <span className="nav-en">Home</span>
            </a>
            <a href="#projects" className="nav-link" data-jp="作品" onClick={closeNav}>
              <span className="nav-en">Works</span>
            </a>
            <a href="#contact" className="nav-link" data-jp="便り" onClick={closeNav}>
              <span className="nav-en">Contact</span>
            </a>
          </nav>
        </div>
      </header>

      <div className={`nav-scrim${navOpen ? ' is-visible' : ''}`} id="navScrim" onClick={closeNav}></div>
    </>
  );
}