import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
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

function SectionSkeleton() {
  return (
    <div className="py-20 sm:py-28" aria-hidden>
      <div className="mx-auto max-w-6xl px-5">
        <div className="h-4 w-24 rounded-md bg-white/[0.05] animate-pulse mb-3" />
        <div className="h-7 w-44 rounded-md bg-white/[0.05] animate-pulse mb-10" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-white/[0.04] animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen bg-base-900 text-ink-100">
        <ParticleBackground />
        <Nav />
        <main>
          <Hero />
          <Suspense fallback={<SectionSkeleton />}><Stats /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Skills /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Projects /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Experience /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Education /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Contact /></Suspense>
        </main>
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    </LazyMotion>
  );
}
