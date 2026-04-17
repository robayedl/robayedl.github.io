import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle.jsx';
import { profile } from '../data/content.js';

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 shrink-0">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 shrink-0">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.46 2 2 0 0 1 3.58 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const items = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    accent: '#22d3ee',
    Icon: EmailIcon,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    accent: '#6366f1',
    Icon: PhoneIcon,
  },
  {
    label: 'GitHub',
    value: 'github.com/robayedl',
    href: profile.github,
    accent: '#8b5cf6',
    Icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/robayedashraf',
    href: profile.linkedin,
    accent: '#34d399',
    Icon: LinkedInIcon,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent-indigo/6 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Reach Out" title="Contact">
          Open to AI / ML engineering roles. Happy to chat about Computer Vision, Agentic Systems, and LLM Applications.
        </SectionTitle>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="card p-5 flex items-center gap-4 group"
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = `0 0 35px -10px ${item.accent}88`)
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '')}
            >
              {/* Icon circle */}
              <motion.div
                className="h-11 w-11 rounded-xl grid place-items-center shrink-0 transition-all duration-300"
                style={{
                  background: `${item.accent}18`,
                  border: `1px solid ${item.accent}44`,
                  color: item.accent,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.Icon />
              </motion.div>

              <div className="min-w-0 flex-1">
                <div
                  className="mono text-xs sm:text-sm uppercase tracking-[0.18em] mb-0.5"
                  style={{ color: item.accent }}
                >
                  {item.label}
                </div>
                <div className="text-ink-100 text-sm sm:text-base truncate">{item.value}</div>
              </div>

              <span className="shrink-0 text-lg" style={{ color: item.accent }}>→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
