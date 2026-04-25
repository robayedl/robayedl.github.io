import { lazy, Suspense } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import ParticleBackground from './components/ParticleBackground.jsx';
import Stats from './components/Stats.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';

const Experience = lazy(() => import('./components/Experience.jsx'));
const Education = lazy(() => import('./components/Education.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

export default function App() {
  return (
    <div className="min-h-screen bg-base-900 text-ink-100">
      <ParticleBackground />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <Suspense>
          <Experience />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
