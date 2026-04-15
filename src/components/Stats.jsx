import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { stats } from '../data/content.js';

function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { rootMargin: '-60px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1600;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [triggered, value]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toString();
  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl font-bold gradient-text tabular-nums">
      {formatted}
      <span className="text-ink-300 text-xl sm:text-2xl">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07, type: 'spring', stiffness: 120, damping: 14 }}
              className="card p-4 sm:p-5 text-center sm:text-left"
            >
              <Counter value={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
              <div className="mono text-xs text-ink-400 mt-2 tracking-wider uppercase leading-snug">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
