import { useState, useEffect, useRef } from 'react';
import { profile, LAST_UPDATED } from '../data/content.js';

const GC_SITE = import.meta.env.VITE_GOATCOUNTER_SITE;
const GC_TOKEN = import.meta.env.VITE_GOATCOUNTER_TOKEN;

function usePageViews() {
  const [count, setCount] = useState(null);
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    if (!GC_SITE || !GC_TOKEN) return;

    const run = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const res = await fetch(
          `https://${GC_SITE}.goatcounter.com/api/v0/stats/hits?start=2025-01-01&end=${today}`,
          { headers: { Authorization: `Bearer ${GC_TOKEN}` } },
        );
        if (!res.ok) return;
        const data = await res.json();
        const total = (data.hits ?? []).reduce((sum, d) => sum + (d.count ?? 0), 0);
        if (total > 0) setCount(total);
      } catch {
        // non-critical
      }
    };

    run();
  }, []);

  return count;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const views = usePageViews();

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="mono text-xs text-ink-400">
          © {year} {profile.name} · Built with React, Framer Motion &amp; Tailwind.
        </div>

        <div className="flex items-center gap-4 mono text-xs text-ink-400">
          <div className="flex items-center gap-1.5 text-ink-400/50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Last updated: {LAST_UPDATED}
          </div>

          {views !== null && (
            <>
              <span className="text-white/10">|</span>
              <span className="flex items-center gap-1.5" title="Total unique sessions">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-accent-cyan/60">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span className="text-accent-cyan/80">{views.toLocaleString()}</span>
                <span className="text-white/30">views</span>
              </span>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
