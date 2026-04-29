import * as m from 'framer-motion/m';
import SectionTitle from './SectionTitle.jsx';
import { skills } from '../data/content.js';

const GROUP_ACCENTS = ['#6366f1', '#22d3ee', '#8b5cf6', '#34d399'];

const GROUP_ICONS = [
  // AI & Machine Learning — brain / neural
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M9.5 2a2.5 2.5 0 1 1 0 5H9a7 7 0 0 0-7 7 3 3 0 0 0 3 3h1.5" />
    <path d="M14.5 2a2.5 2.5 0 1 0 0 5H15a7 7 0 0 1 7 7 3 3 0 0 1-3 3h-1.5" />
    <circle cx="12" cy="17" r="3" />
    <path d="M12 14v-2" />
    <path d="M9.5 19.5 8 21" />
    <path d="M14.5 19.5 16 21" />
  </svg>,
  // Frameworks — code brackets
  <svg key="fw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  // MLOps & DevOps — settings gear
  <svg key="ops" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>,
  // Tools & Practices — wrench
  <svg key="tools" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>,
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-accent-indigo/5 blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-accent-cyan/5 blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Stack" title="Skills" />

        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((group, i) => {
            const accent = GROUP_ACCENTS[i % GROUP_ACCENTS.length];
            const isFeatured = i === 0;
            return (
              <m.div
                key={group.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ boxShadow: `0 0 40px -14px ${accent}66` }}
                className="card p-6 border-l-2"
                style={{
                  borderLeftColor: accent,
                  ...(isFeatured && {
                    background: `radial-gradient(ellipse at top left, ${accent}0d 0%, transparent 55%), var(--card-bg, rgba(11,16,32,0.7))`,
                  }),
                }}
              >
                {/* Group header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span style={{ color: accent }}>{GROUP_ICONS[i]}</span>
                  <div
                    className="mono text-xs sm:text-sm uppercase tracking-[0.18em] font-medium"
                    style={{ color: accent }}
                  >
                    {group.group}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tag" style={{ '--tag-color': accent }}>
                      {item}
                    </span>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
