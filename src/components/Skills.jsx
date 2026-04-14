import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { skills } from '../data/content.js';

const GROUP_ACCENTS = ['#6366f1', '#22d3ee', '#8b5cf6', '#34d399'];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-accent-indigo/5 blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-accent-cyan/5 blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Stack" title="Skills" />

        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((group, i) => {
            const accent = GROUP_ACCENTS[i % GROUP_ACCENTS.length];
            return (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card p-6"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 40px -14px ${accent}66`)
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
              >
                {/* Group header with accent indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                  />
                  <div
                    className="mono text-xs sm:text-sm uppercase tracking-[0.18em] font-medium"
                    style={{ color: accent }}
                  >
                    {group.group}
                  </div>
                </div>

                {/* Chips with staggered wave animation */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {group.items.map((item, j) => (
                    <motion.span
                      key={item}
                      className="tag"
                      style={{ '--tag-color': accent }}
                      variants={chipVariants}
                      custom={j}
                      whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
