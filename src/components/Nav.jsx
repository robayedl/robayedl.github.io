import { useEffect, useState } from 'react';
import { nav, RESUME_PATH } from '../data/content.js';

export default function Nav() {
  const [active, setActive] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) setActive(id); });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-[0_6px_30px_-15px_rgba(0,0,0,0.6)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        {/* Profile photo logo */}
        <a href="#about" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src="/Picture.jpg"
              alt="Robayed Ashraf"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-accent-indigo/50 group-hover:ring-accent-cyan/70 transition-all duration-300"
            />
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-indigo/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display text-sm font-semibold gradient-text hidden sm:inline">
            Robayed Ashraf
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative px-3 py-2 text-sm transition-colors duration-200 ${
                  active === item.id ? 'text-ink-100' : 'text-ink-300 hover:text-ink-100'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setResumeOpen((v) => !v)}
            className="btn btn-primary text-sm hidden sm:inline-flex"
          >
            {resumeOpen ? 'Hide Resume' : 'View Resume'}
          </button>
          <button
            className="md:hidden btn btn-primary text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-white/5 animate-fade-down">
          <ul className="px-5 py-3 flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-2.5 text-sm border-b border-white/5 last:border-0 ${
                    active === item.id ? 'text-accent-cyan' : 'text-ink-300'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button
                onClick={() => { setResumeOpen((v) => !v); setOpen(false); }}
                className="btn btn-primary text-sm w-full justify-center"
              >
                {resumeOpen ? 'Hide Resume' : 'View Resume'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>

      {resumeOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-[#080d1a] animate-fade-down">
          <iframe
            src={RESUME_PATH}
            title="Resume"
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </>
  );
}
