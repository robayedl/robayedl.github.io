import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-10"
    >
      {eyebrow && (
        <div className="mono text-xs text-accent-cyan tracking-[0.2em] uppercase mb-2">
          {eyebrow}
        </div>
      )}
      <h2 className="section-title font-display text-3xl sm:text-4xl font-bold text-ink-100">
        {title}
      </h2>
      {children && <p className="mt-4 text-ink-300 max-w-2xl">{children}</p>}
    </motion.div>
  );
}
