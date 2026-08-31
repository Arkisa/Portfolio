import BootScreen from './components/BootScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import BrushDivider from './components/BrushDivider';
import ProjectCarousel from './components/ProjectCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashCursor from './components/SplashCursor';

export default function App() {
  return (
    <>
      {/* ===== SPLASH CURSOR EFFECT ===== */}
      <SplashCursor />

      {/* ===== BOOT SCREEN ===== */}
      <BootScreen />

      {/* ===== NAV ===== */}
      <Header />

      <main>
        {/* ===== HOME ===== */}
        <Hero />

        <BrushDivider path="M2,20 C150,5 300,35 500,18 C700,2 850,30 998,15" />

        {/* ===== PROJECTS ===== */}
        <ProjectCarousel />

        <BrushDivider path="M2,25 C150,40 300,5 500,22 C700,38 850,10 998,25" />

        {/* ===== CONTACT ===== */}
        <Contact />

        <Footer />
      </main>
    </>
  );
}