import SectionTitle from './SectionTitle.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/content.js';

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[400px] -translate-x-1/2 rounded-full bg-accent-indigo/4 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Featured Work" title="Projects">
          Selected work across agentic AI, computer vision, and MLOps. Each card shows a live
          demo animation — click play when video is available.
        </SectionTitle>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
