import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { education } from '../data/content.js';

const ACCENTS = ['#6366f1', '#22d3ee'];

export default function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-cyan/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Academia" title="Education" />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((ed, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div
                key={ed.school}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="card p-6 sm:p-7 flex flex-col gap-1"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 40px -12px ${accent}66`)
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
              >
                {/* Period badge */}
                <div
                  className="mono text-xs sm:text-sm uppercase tracking-widest mb-2 inline-flex items-center gap-1.5"
                  style={{ color: accent }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  {ed.period}
                </div>

                {/* Degree */}
                <h3 className="font-display text-xl sm:text-2xl font-semibold">{ed.degree}</h3>

                {/* Major */}
                {ed.major && (
                  <p className="text-ink-300 text-sm sm:text-base mt-0.5">{ed.major}</p>
                )}

                {/* Institution — clickable */}
                <a
                  href={ed.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-ink-200 text-sm sm:text-base hover:text-accent-cyan transition-colors duration-200 group"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                       className="h-3.5 w-3.5 shrink-0 text-ink-400 group-hover:text-accent-cyan transition-colors">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  {ed.school}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                       className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>

                {/* Grade */}
                <p className="mono text-xs sm:text-sm text-ink-400 mt-2 pt-2 border-t border-white/5">
                  {ed.grade}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
