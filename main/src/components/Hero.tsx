import { useState } from 'react';
import profileImg from '../assets/profile.jpg';
import LeafLayer from './LeafLayer';

export default function Hero() {
  const [portraitFallback, setPortraitFallback] = useState(false);

  return (
    <section id="home" className="section hero">
      <div className="hero-ink-wash" aria-hidden="true"></div>
      <LeafLayer />

      <div className="hero-inner">
        <p className="eyebrow">
          <span className="rule"></span>
          Developer &amp; Chronically Online
          <span className="rule"></span>
        </p>

        <h1 className="hero-title">
          <span className="hero-title-en">Cris Joseph Arquiza</span>
          <span className="hero-title-jp" aria-hidden="true">りじょせあうぃざ</span>
        </h1>

        <p className="hero-bio">
          I’m a BSIT student at the University of San Carlos, working on improving my skills
          and getting better at software development. I’m always looking to learn more, build cool stuff,
          and hopefully become someone who can turn ideas into real, useful software.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-ghost">Get In Touch</a>
        </div>
      </div>

      <div className="hero-portrait">
        <div className={`portrait-ring${portraitFallback ? ' portrait-fallback' : ''}`}>
          {!portraitFallback && (
            <img
              src={profileImg}
              alt="Portrait of Cris Joseph Arquiza"
              id="profileImg"
              onError={() => setPortraitFallback(true)}
            />
          )}
          <span className="portrait-fallback-initial" aria-hidden="true">JS</span>
        </div>
        <svg className="portrait-brush" viewBox="0 0 220 220" aria-hidden="true">
          <circle cx={110} cy={110} r={103} />
        </svg>
      </div>

      <a href="#projects" className="scroll-cue" aria-label="Scroll to projects">
        <span></span>
      </a>
    </section>
  );
}
