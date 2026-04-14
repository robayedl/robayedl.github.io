import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { experience } from '../data/content.js';

export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-20 sm:py-28" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-indigo/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Timeline" title="Experience" />

        <div className="relative pl-8 sm:pl-12">
          {/* Track (static, dim) */}
          <div
            className="absolute left-3 sm:left-5 top-0 bottom-0 w-px"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          />
          {/* Animated fill */}
          <div
            className="absolute left-3 sm:left-5 top-0 w-px overflow-hidden"
            style={{ height: '100%' }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #6366f1 0%, #22d3ee 60%, rgba(34,211,238,0) 100%)',
              }}
            />
          </div>

          <div className="space-y-10">
            {experience.map((e, i) => (
              <motion.div
                key={`${e.role}-${i}`}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                  className="absolute -left-[21px] sm:-left-[27px] top-5 h-3.5 w-3.5 rounded-full ring-4 ring-base-900"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                    boxShadow: '0 0 12px rgba(99,102,241,0.6)',
                  }}
                />

                <div className="card p-5 sm:p-6">
                  <div className="flex flex-wrap items-start sm:items-center justify-between gap-2 mb-3">
                    <h3 className="font-display text-lg sm:text-xl font-semibold">
                      {e.role}
                      <span className="text-ink-300 font-normal"> · {e.company}</span>
                    </h3>
                    <span className="mono text-xs sm:text-sm text-accent-cyan shrink-0 bg-accent-cyan/10 px-2.5 py-1 rounded-full border border-accent-cyan/20">
                      {e.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {e.bullets.map((b, bi) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 + bi * 0.06 + 0.3 }}
                        className="flex gap-2.5 text-ink-200 text-sm sm:text-base"
                      >
                        <span className="mt-[8px] h-1.5 w-1.5 rounded-full shrink-0 bg-accent-indigo" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
