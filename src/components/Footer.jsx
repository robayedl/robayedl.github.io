import { profile } from '../data/content.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="mono text-xs text-ink-400">
          © {year} {profile.name}. Built with React, Vite & Tailwind.
        </div>
        <div className="flex items-center gap-4 mono text-xs text-ink-400">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink-100">
            github
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink-100">
            linkedin
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-ink-100">
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
