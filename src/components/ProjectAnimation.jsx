import { useEffect, useRef } from 'react';

// Per-project canvas animations keyed by animType:
//   'neural' – floating connected nodes (DocuMind / LangGraph)
//   'wave'   – ripple rings (Sign Language)
//   'grid'   – growing data-point grid (Smart Plant / MLOps)
//   'track'  – moving tracked objects with bounding boxes (MOT)
//   'race'   – speed-trail particles (F1Racers / RL)
//   'scan'   – rotating radar sweep (Traffic Sign / CNN)

export default function ProjectAnimation({ animType = 'neural', accent = '#6366f1' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Hex to rgb helper
    const hexRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    };
    const rgb = hexRgb(accent.length === 7 ? accent : '#6366f1');

    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;

    // ── NEURAL ─────────────────────────────────────────────────────────
    const neuralNodes = Array.from({ length: 14 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      pulse: Math.random() * Math.PI * 2,
    }));

    // ── WAVE ──────────────────────────────────────────────────────────
    const waveRings = Array.from({ length: 4 }, (_, i) => ({ phase: i * (Math.PI / 2) }));

    // ── GRID ──────────────────────────────────────────────────────────
    const gridPts = Array.from({ length: 30 }, (_, i) => ({
      col: i % 6, row: Math.floor(i / 6),
      born: Math.random(),
    }));

    // ── TRACK ─────────────────────────────────────────────────────────
    const trackers = Array.from({ length: 4 }, (_, i) => ({
      x: 0.15 + (i % 2) * 0.5, y: 0.25 + Math.floor(i / 2) * 0.4,
      vx: (Math.random() - 0.5) * 0.0012, vy: (Math.random() - 0.5) * 0.0008,
      id: i + 1,
    }));

    // ── RACE ──────────────────────────────────────────────────────────
    const trails = Array.from({ length: 18 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() * 0.006 + 0.002),
      vy: (Math.random() - 0.5) * 0.002,
      life: Math.random(),
      maxLife: 0.5 + Math.random() * 0.5,
    }));

    // ── SCAN ──────────────────────────────────────────────────────────
    const scanDots = Array.from({ length: 12 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: 0.1 + Math.random() * 0.35,
      bright: Math.random(),
    }));

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      if (animType === 'neural') {
        // Move nodes
        neuralNodes.forEach(n => {
          n.x = (n.x + n.vx + 1) % 1;
          n.y = (n.y + n.vy + 1) % 1;
          n.pulse += 0.04;
        });
        // Edges
        for (let i = 0; i < neuralNodes.length; i++) {
          for (let j = i + 1; j < neuralNodes.length; j++) {
            const a = neuralNodes[i], b = neuralNodes[j];
            const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < w * 0.3) {
              const alpha = (1 - d / (w * 0.3)) * 0.35;
              ctx.strokeStyle = `rgba(${rgb},${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(a.x * w, a.y * h);
              ctx.lineTo(b.x * w, b.y * h);
              ctx.stroke();
            }
          }
        }
        // Nodes
        neuralNodes.forEach(n => {
          const r = 2.5 + Math.sin(n.pulse) * 1;
          const glow = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, r * 4);
          glow.addColorStop(0, `rgba(${rgb},0.6)`);
          glow.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(n.x * w, n.y * h, r * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${rgb},0.9)`;
          ctx.beginPath();
          ctx.arc(n.x * w, n.y * h, r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      if (animType === 'wave') {
        const cx = w / 2, cy = h / 2;
        waveRings.forEach((ring, i) => {
          const progress = ((t * 0.4 + ring.phase / (Math.PI * 2)) % 1);
          const radius = progress * Math.min(w, h) * 0.55;
          const alpha = (1 - progress) * 0.5;
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();
        });
        // Centre pulse dot
        const pulse = 0.5 + Math.sin(t * 2) * 0.5;
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
        glow.addColorStop(0, `rgba(${rgb},${0.7 * pulse})`);
        glow.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${rgb},0.9)`;
        ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
      }

      if (animType === 'grid') {
        const cols = 6, rows = 5;
        const padX = w * 0.12, padY = h * 0.12;
        const cellW = (w - padX * 2) / (cols - 1);
        const cellH = (h - padY * 2) / (rows - 1);
        gridPts.forEach((p, idx) => {
          const age = (t * 0.2 - p.born + 2) % 2;
          const alpha = age < 1 ? age * 0.7 : (2 - age) * 0.7;
          const px = padX + p.col * cellW;
          const py = padY + p.row * cellH;
          ctx.fillStyle = `rgba(${rgb},${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
          // horizontal line to next col
          if (p.col < cols - 1) {
            ctx.strokeStyle = `rgba(${rgb},${alpha * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + cellW, py);
            ctx.stroke();
          }
        });
      }

      if (animType === 'track') {
        trackers.forEach(tr => {
          tr.x = Math.max(0.08, Math.min(0.92, tr.x + tr.vx));
          tr.y = Math.max(0.08, Math.min(0.92, tr.y + tr.vy));
          if (tr.x <= 0.08 || tr.x >= 0.92) tr.vx *= -1;
          if (tr.y <= 0.08 || tr.y >= 0.92) tr.vy *= -1;
          const bw = w * 0.14, bh = h * 0.14;
          const bx = tr.x * w - bw / 2, by = tr.y * h - bh / 2;
          // Bounding box
          ctx.strokeStyle = `rgba(${rgb},0.7)`;
          ctx.lineWidth = 1.2;
          const corner = 5;
          ctx.beginPath();
          ctx.moveTo(bx + corner, by); ctx.lineTo(bx + bw - corner, by);
          ctx.moveTo(bx + bw, by + corner); ctx.lineTo(bx + bw, by + bh - corner);
          ctx.moveTo(bx + bw - corner, by + bh); ctx.lineTo(bx + corner, by + bh);
          ctx.moveTo(bx, by + bh - corner); ctx.lineTo(bx, by + corner);
          ctx.stroke();
          // Corner ticks
          ctx.beginPath();
          ctx.moveTo(bx, by + corner); ctx.lineTo(bx, by); ctx.lineTo(bx + corner, by);
          ctx.moveTo(bx + bw - corner, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + corner);
          ctx.moveTo(bx + bw, by + bh - corner); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw - corner, by + bh);
          ctx.moveTo(bx + corner, by + bh); ctx.lineTo(bx, by + bh); ctx.lineTo(bx, by + bh - corner);
          ctx.strokeStyle = `rgba(${rgb},1)`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
          // ID label
          ctx.fillStyle = `rgba(${rgb},0.9)`;
          ctx.font = `bold 9px DM Mono, monospace`;
          ctx.fillText(`#${tr.id}`, bx + 2, by - 3);
          // Centre dot
          ctx.fillStyle = `rgba(${rgb},0.8)`;
          ctx.beginPath(); ctx.arc(tr.x * w, tr.y * h, 2.5, 0, Math.PI * 2); ctx.fill();
        });
      }

      if (animType === 'race') {
        trails.forEach(tr => {
          tr.x += tr.vx;
          tr.life += 0.018;
          if (tr.x > 1 || tr.life > tr.maxLife) {
            tr.x = 0; tr.y = Math.random(); tr.life = 0;
            tr.vx = Math.random() * 0.006 + 0.002;
            tr.vy = (Math.random() - 0.5) * 0.002;
          }
          tr.y = Math.max(0, Math.min(1, tr.y + tr.vy));
          const alpha = (1 - tr.life / tr.maxLife) * 0.7;
          const tailLen = w * (0.04 + tr.vx * 5);
          const grad = ctx.createLinearGradient((tr.x - tr.vx * 8) * w, tr.y * h, tr.x * w, tr.y * h);
          grad.addColorStop(0, `rgba(${rgb},0)`);
          grad.addColorStop(1, `rgba(${rgb},${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo((tr.x - tr.vx * 8) * w, tr.y * h);
          ctx.lineTo(tr.x * w, tr.y * h);
          ctx.stroke();
        });
      }

      if (animType === 'scan') {
        const cx = w / 2, cy = h / 2;
        const maxR = Math.min(w, h) * 0.42;
        const sweepAngle = (t * 1.2) % (Math.PI * 2);
        // Radar rings
        [0.33, 0.66, 1].forEach(f => {
          ctx.strokeStyle = `rgba(${rgb},0.12)`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(cx, cy, maxR * f, 0, Math.PI * 2);
          ctx.stroke();
        });
        // Cross-hairs
        ctx.strokeStyle = `rgba(${rgb},0.08)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
        ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
        ctx.stroke();
        // Sweep gradient
        const sweep = ctx.createConicalGradient ? null : null; // not supported; use clip+arc
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, sweepAngle - Math.PI * 0.4, sweepAngle);
        ctx.closePath();
        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        radGrad.addColorStop(0, `rgba(${rgb},0.35)`);
        radGrad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = radGrad;
        ctx.fill();
        ctx.restore();
        // Sweep line
        ctx.strokeStyle = `rgba(${rgb},0.8)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sweepAngle) * maxR, cy + Math.sin(sweepAngle) * maxR);
        ctx.stroke();
        // Blip dots
        scanDots.forEach(d => {
          const angleDiff = ((d.angle - sweepAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
          const fadeWindow = Math.PI * 0.5;
          if (angleDiff < fadeWindow) {
            const alpha = (1 - angleDiff / fadeWindow) * d.bright;
            const dx = cx + Math.cos(d.angle) * d.dist * maxR;
            const dy = cy + Math.sin(d.angle) * d.dist * maxR;
            ctx.fillStyle = `rgba(${rgb},${alpha})`;
            ctx.beginPath(); ctx.arc(dx, dy, 2.5, 0, Math.PI * 2); ctx.fill();
          }
        });
        // Centre dot
        ctx.fillStyle = `rgba(${rgb},0.9)`;
        ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [animType, accent]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
