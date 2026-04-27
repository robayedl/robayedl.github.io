import { useState, useEffect, useRef } from 'react';
import { profile } from '../data/content.js';

// Supabase anon key is safe to expose — RLS blocks all direct writes.
// Increment only happens via the increment_views() DB function.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SESSION_KEY = 'pv_counted';

function usePageViews() {
  const [count, setCount] = useState(null);
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    console.log('[counter] URL:', SUPABASE_URL, 'KEY:', SUPABASE_ANON_KEY?.slice(0, 12));
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) { console.error('[counter] env vars missing'); return; }

    const headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    const already = !!sessionStorage.getItem(SESSION_KEY);
    if (!already) sessionStorage.setItem(SESSION_KEY, '1');

    const run = async () => {
      try {
        if (already) {
          const res = await fetch(
            `${SUPABASE_URL}/rest/v1/pageviews?select=count&id=eq.1`,
            { headers },
          );
          const raw = await res.json();
          console.log('[counter] GET response:', res.status, raw);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const [row] = raw;
          const n = Number(row?.count);
          if (Number.isFinite(n) && n > 0) setCount(n);
        } else {
          const res = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/increment_views`,
            { method: 'POST', headers, body: '{}' },
          );
          const raw = await res.json();
          console.log('[counter] INCR response:', res.status, raw);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const n = Number(raw);
          if (Number.isFinite(n) && n > 0) setCount(n);
        }
      } catch (e) {
        console.error('[counter] fetch error:', e);
        if (!already) sessionStorage.removeItem(SESSION_KEY);
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
          © {year} {profile.name}. Built with React, Vite & Tailwind.
        </div>

        <div className="flex items-center gap-4 mono text-xs text-ink-400">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink-100 transition-colors">
            github
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink-100 transition-colors">
            linkedin
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-ink-100 transition-colors">
            gmail
          </a>

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
