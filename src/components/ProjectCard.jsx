import { motion } from 'framer-motion';
import VideoEmbed from './VideoEmbed.jsx';

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
);

const tagVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.3, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectCard({ project, index }) {
  const accent = project.accent;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card p-6 sm:p-7 group flex flex-col"
      style={{ '--accent': accent, '--tag-color': accent }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 50px -12px ${accent}77, 0 0 0 1px ${accent}33 inset`)
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="mono text-xs tracking-widest uppercase mb-1.5" style={{ color: accent }}>
            {project.period}
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold leading-tight">
            {project.title}
          </h3>
          <p className="text-ink-300 text-sm mt-1 font-medium">{project.subtitle}</p>
        </div>

        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg mono text-xs font-medium transition-all duration-200 border"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              background: `${accent}12`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${accent}26`;
              e.currentTarget.style.boxShadow = `0 0 22px -6px ${accent}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${accent}12`;
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <GitHubIcon />
            View on GitHub
          </motion.a>
        )}
      </div>

      {/* Video / animation area */}
      <VideoEmbed video={project.video} accent={accent} animType={project.animType} />

      {/* Description */}
      <p className="text-ink-200 text-sm sm:text-base leading-relaxed mt-5">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="mt-4 space-y-2 flex-1">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-ink-300 text-sm sm:text-base">
            <span
              className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: accent }}
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags — staggered wave animation on entry */}
      <motion.div
        className="mt-5 flex flex-wrap gap-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {project.tech.map((t, i) => (
          <motion.span
            key={t}
            className="tag"
            style={{ '--tag-color': accent }}
            variants={tagVariants}
            custom={i}
          >
            {t}
          </motion.span>
        ))}
      </motion.div>
    </motion.article>
  );
}
