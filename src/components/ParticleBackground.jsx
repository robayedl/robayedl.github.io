import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (reduced || isMobile) return;

    const COLORS = ['#6366f1', '#22d3ee', '#818cf8', '#34d399', '#a78bfa'];
    let width = 0, height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let lastTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(60, Math.floor((width * height) / 18000));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.6 + 0.7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.018,
        isStar: i < 5,
      }));
    };

    const draw = (timestamp) => {
      if (timestamp - lastTime < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 16900) {
          const force = (1 - Math.sqrt(md2) / 130) * 0.018;
          p.vx += mdx * force;
          p.vy += mdy * force;
        }
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.0) { p.vx *= 1.0 / spd; p.vy *= 1.0 / spd; }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Batch connection lines
      const maxDist2 = 140 * 140;
      ctx.beginPath();
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = 'rgba(99,102,241,0.14)';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (dx * dx + dy * dy < maxDist2) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();

      // Soft halos for star particles
      for (const p of particles) {
        if (!p.isStar) continue;
        const pf = 0.5 + Math.sin(p.pulse) * 0.5;
        ctx.fillStyle = p.color + '1a';
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.r + 1 + pf) * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // All particle dots with pulsing size
      for (const p of particles) {
        const pf = 0.5 + Math.sin(p.pulse) * 0.5;
        const r = p.isStar ? p.r * 1.5 + pf * 0.9 : p.r + pf * 0.25;
        const a = p.isStar
          ? Math.round((0.55 + pf * 0.4) * 255).toString(16).padStart(2, '0')
          : 'bb';
        ctx.fillStyle = p.color + a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    />
  );
}
