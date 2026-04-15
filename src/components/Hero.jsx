import { motion } from 'framer-motion';
import { profile, RESUME_PATH } from '../data/content.js';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent-indigo/10 blur-[120px]" />
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-accent-cyan/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          {...fadeUp(0)}
          className="mono text-xs sm:text-sm text-accent-cyan tracking-[0.25em] uppercase mb-5 flex items-center gap-2"
        >
          <span className="inline-block h-px w-8 bg-accent-cyan/60" />
          {profile.title}
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="font-display text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          className="mt-5 text-ink-200 text-lg sm:text-xl max-w-2xl font-medium"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          {...fadeUp(0.28)}
          className="mt-6 text-ink-300 text-base sm:text-lg leading-relaxed text-justify"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          {...fadeUp(0.38)}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a href={RESUME_PATH} download className="btn btn-primary text-sm sm:text-base">
            Download Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost text-sm sm:text-base flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost text-sm sm:text-base flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost text-sm sm:text-base flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: '#FFA116' }}>
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
            </svg>
            LeetCode
          </a>
          <a
            href={profile.codeforces}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost text-sm sm:text-base flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: '#318CE7' }}>
              <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9A1.5 1.5 0 0 1 1.5 7.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h3z"/>
            </svg>
            Codeforces
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mono text-sm sm:text-base text-ink-400 mt-10 flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-accent-cyan/70">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {profile.location}
        </motion.div>
      </div>
    </section>
  );
}
