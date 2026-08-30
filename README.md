# Cris Joseph Arquiza — Portfolio (React + TypeScript / Node.js + Express)

This is the original ink-brush, samurai-inspired portfolio site, rebuilt on:

- **Frontend:** React + TypeScript (Vite)
- **Backend:** Node.js + Express (serves the built frontend, plus a small `/api/health` endpoint)

The visual design, copy, layout, animations, and interactive behavior (boot screen, mobile nav,
ambient ember particles, project carousel, contact section) are unchanged from the original
vanilla HTML/CSS/JS version — only the implementation technology changed.

##  Project Structure

```
portfolio-fullstack/
├── frontend/          React + TypeScript app (Vite)
│   ├── src/
│   │   ├── assets/            images (logo, profile, project screenshots, background)
│   │   ├── components/        BootScreen, WindLayer, Header, Hero, ProjectCarousel, Contact, Footer, BrushDivider
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── style.css          original stylesheet, unmodified
│   └── index.html
└── backend/           Node.js + Express server
    └── server.js       serves frontend/dist and exposes /api/health
```

## Setup Instructions

**1. Install dependencies**

```bash
cd frontend && npm install
cd ../backend && npm install
```

**2. Run in development (frontend dev server + backend API)**

```bash
# terminal 1
cd frontend
npm run dev        # http://localhost:5173

# terminal 2
cd backend
npm run dev         # http://localhost:4000
```

**3. Build and run in production (backend serves the built frontend)**

```bash
cd frontend
npm run build       # outputs frontend/dist

cd ../backend
npm start           # serves the app at http://localhost:4000
```

## Technologies Used

- **React 18 + TypeScript** (Vite build tooling)
- **Node.js + Express** (static file server / API)
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
