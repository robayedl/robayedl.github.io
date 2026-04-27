import { lazy, Suspense } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import ParticleBackground from './components/ParticleBackground.jsx';

const Stats = lazy(() => import('./components/Stats.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Projects = lazy(() => import('./components/Projects.jsx'));
const Experience = lazy(() => import('./components/Experience.jsx'));
const Education = lazy(() => import('./components/Education.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

export default function App() {
  return (
    <div className="relative min-h-screen bg-base-900 text-ink-100">
      <ParticleBackground />
      <Nav />
      <main>
        <Hero />
        <Suspense>
          <Stats />
          <Skills />
          <Projects />
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
