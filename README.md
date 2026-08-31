# Cris Joseph Arquiza — Portfolio

This is my portfolio site, showcasing basic information about me along with the projects I've completed. It's a single-page React app with a Japanese ink/brush-inspired aesthetic — boot screen intro, animated wind/leaf layers, a project carousel, and a contact section.

## Project Structure

```
Portfolio(REAL)/
└── main/                     React + TypeScript app (Vite)
    ├── public/
    │   └── logo.png
    ├── src/
    │   ├── assets/            images (logo, profile, project screenshots, brush/ink strokes, background)
    │   ├── components/
    │   │   ├── BootScreen.tsx
    │   │   ├── Header.tsx
    │   │   ├── Hero.tsx
    │   │   ├── BrushDivider.tsx
    │   │   ├── ProjectCarousel.tsx
    │   │   ├── Contact.tsx
    │   │   ├── Footer.tsx
    │   │   ├── WindLayer.tsx
    │   │   ├── LeafLayer.tsx
    │   │   ├── HankoSeal.tsx
    │   │   └── ScrambledText.tsx
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── style.css          stylesheet
    │   └── vite-env.d.ts
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    └── package.json
```

## Setup Instructions

**1. Install dependencies**

```bash
cd main
npm install
```

**2. Run in development**

```bash
npm run dev          # http://localhost:5173
```

**3. Build for production**

```bash
npm run build         # type-checks with tsc, then outputs to main/dist
npm run preview        # preview the production build locally
```

This is a static frontend-only app — the production build in `main/dist` can be deployed directly to any static host (e.g. Vercel, Netlify, GitHub Pages).

## Technologies Used

- **React 18 + TypeScript** (Vite build tooling)
- **GSAP** — animations (boot screen text scramble, wind/leaf layers, brush dividers, carousel transitions)
- **Google Fonts** — Yuji Syuku, Shippori Mincho, Noto Sans JP

**Featured projects showcased on the site:**

| Project | Stack |
|---|---|
| Craveh | HTML, CSS, JavaScript, PHP, MySQL |
| Weather App | Vue, C#, XAML, MVVM, SQLite, Open-Meteo API |
| Studymate | HTML, CSS, JavaScript, PHP, MySQL |

## Contact

- **Email:** arquizacrisjoseph@gmail.com
- **Location:** Cebu City, Philippines
- **Available for:** Freelance & part-time work
