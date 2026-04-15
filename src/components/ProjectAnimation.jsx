import { useEffect, useRef } from 'react';

// Canvas tech animations keyed by animType.
// Uses IntersectionObserver to pause the RAF loop when the card is off-screen,
// keeping 6 simultaneous canvases cheap.

export default function ProjectAnimation({ animType = 'neural', accent = '#6366f1' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let visible = false;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Hex to r,g,b string
    const hexRgb = (hex) => {
      const h = hex.length === 7 ? hex : '#6366f1';
      return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`;
    };
    const rgb = hexRgb(accent);

    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;

    // ── per-type state ────────────────────────────────────────────────

    // NEURAL
    const nodes = Array.from({ length: 16 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random()-0.5)*0.0002, vy: (Math.random()-0.5)*0.0002,
      pulse: Math.random()*Math.PI*2,
    }));

    // WAVE
    const rings = [0, 0.25, 0.5, 0.75].map(phase => ({ phase }));

    // GRID
    const gridPts = Array.from({ length: 30 }, (_, i) => ({
      col: i%6, row: Math.floor(i/6), born: Math.random(),
    }));

    // TRACK
    const trackers = Array.from({ length: 4 }, (_, i) => ({
      x: 0.15+(i%2)*0.5, y: 0.25+Math.floor(i/2)*0.4,
      vx: (Math.random()-0.5)*0.001, vy: (Math.random()-0.5)*0.0007,
      id: i+1,
    }));

    // RACE
    const trails = Array.from({ length: 20 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: Math.random()*0.005+0.002,
      vy: (Math.random()-0.5)*0.0015,
      life: Math.random(), maxLife: 0.5+Math.random()*0.5,
    }));

    // SCAN
    const scanDots = Array.from({ length: 14 }, () => ({
      angle: Math.random()*Math.PI*2,
      dist: 0.08+Math.random()*0.38,
      bright: Math.random(),
    }));

    // ── draw ──────────────────────────────────────────────────────────
    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      // ── NEURAL ──────────────────────────────────────────────────────
      if (animType === 'neural') {
        nodes.forEach(n => {
          n.x = (n.x + n.vx + 1) % 1;
          n.y = (n.y + n.vy + 1) % 1;
          n.pulse += 0.035;
        });
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i+1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const dx = (a.x-b.x)*w, dy = (a.y-b.y)*h;
            const d = Math.sqrt(dx*dx+dy*dy);
            if (d < w*0.28) {
              ctx.strokeStyle = `rgba(${rgb},${(1-d/(w*0.28))*0.22})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(a.x*w, a.y*h);
              ctx.lineTo(b.x*w, b.y*h);
              ctx.stroke();
            }
          }
        }
        nodes.forEach(n => {
          const r = 2+Math.sin(n.pulse)*0.8;
          const g = ctx.createRadialGradient(n.x*w, n.y*h, 0, n.x*w, n.y*h, r*5);
          g.addColorStop(0, `rgba(${rgb},0.45)`);
          g.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(n.x*w, n.y*h, r*5, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = `rgba(${rgb},0.8)`;
          ctx.beginPath(); ctx.arc(n.x*w, n.y*h, r, 0, Math.PI*2); ctx.fill();
        });
      }

      // ── WAVE ────────────────────────────────────────────────────────
      if (animType === 'wave') {
        const cx = w/2, cy = h/2;
        rings.forEach(ring => {
          const progress = ((t*0.35+ring.phase) % 1);
          const radius = progress * Math.min(w,h) * 0.6;
          const alpha = (1-progress)*0.45;
          ctx.strokeStyle = `rgba(${rgb},${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI*2); ctx.stroke();
        });
        const p = 0.5+Math.sin(t*1.8)*0.5;
        const g = ctx.createRadialGradient(cx,cy,0, cx,cy,22);
        g.addColorStop(0, `rgba(${rgb},${0.6*p})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = `rgba(${rgb},0.85)`;
        ctx.beginPath(); ctx.arc(cx,cy,3.5,0,Math.PI*2); ctx.fill();
      }

      // ── GRID ────────────────────────────────────────────────────────
      if (animType === 'grid') {
        const cols=6, rows=5;
        const px0 = w*0.1, py0 = h*0.1;
        const cw = (w-px0*2)/(cols-1), ch = (h-py0*2)/(rows-1);
        gridPts.forEach(p => {
          const age = (t*0.18-p.born+2)%2;
          const alpha = (age < 1 ? age : 2-age)*0.65;
          const x = px0+p.col*cw, y = py0+p.row*ch;
          ctx.fillStyle = `rgba(${rgb},${alpha*0.85})`;
          ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2); ctx.fill();
          if (p.col < cols-1) {
            ctx.strokeStyle = `rgba(${rgb},${alpha*0.2})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+cw,y); ctx.stroke();
          }
          if (p.row < rows-1) {
            ctx.strokeStyle = `rgba(${rgb},${alpha*0.12})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+ch); ctx.stroke();
          }
        });
      }

      // ── TRACK ───────────────────────────────────────────────────────
      if (animType === 'track') {
        trackers.forEach(tr => {
          tr.x = Math.max(0.08, Math.min(0.9, tr.x+tr.vx));
          tr.y = Math.max(0.08, Math.min(0.9, tr.y+tr.vy));
          if (tr.x<=0.08||tr.x>=0.9) tr.vx*=-1;
          if (tr.y<=0.08||tr.y>=0.9) tr.vy*=-1;
          const bw=w*0.13, bh=h*0.18;
          const bx=tr.x*w-bw/2, by=tr.y*h-bh/2;
          const k=6;
          ctx.strokeStyle = `rgba(${rgb},0.65)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(bx+k,by); ctx.lineTo(bx+bw-k,by);
          ctx.moveTo(bx+bw,by+k); ctx.lineTo(bx+bw,by+bh-k);
          ctx.moveTo(bx+bw-k,by+bh); ctx.lineTo(bx+k,by+bh);
          ctx.moveTo(bx,by+bh-k); ctx.lineTo(bx,by+k);
          ctx.stroke();
          ctx.strokeStyle = `rgba(${rgb},0.95)`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(bx,by+k); ctx.lineTo(bx,by); ctx.lineTo(bx+k,by);
          ctx.moveTo(bx+bw-k,by); ctx.lineTo(bx+bw,by); ctx.lineTo(bx+bw,by+k);
          ctx.moveTo(bx+bw,by+bh-k); ctx.lineTo(bx+bw,by+bh); ctx.lineTo(bx+bw-k,by+bh);
          ctx.moveTo(bx+k,by+bh); ctx.lineTo(bx,by+bh); ctx.lineTo(bx,by+bh-k);
          ctx.stroke();
          ctx.fillStyle = `rgba(${rgb},0.85)`;
          ctx.font = 'bold 8px DM Mono,monospace';
          ctx.fillText(`#${tr.id}`, bx+2, by-3);
          ctx.fillStyle = `rgba(${rgb},0.7)`;
          ctx.beginPath(); ctx.arc(tr.x*w,tr.y*h,2,0,Math.PI*2); ctx.fill();
        });
      }

      // ── RACE ────────────────────────────────────────────────────────
      if (animType === 'race') {
        trails.forEach(tr => {
          tr.x += tr.vx; tr.life += 0.015;
          if (tr.x>1||tr.life>tr.maxLife) {
            tr.x=0; tr.y=Math.random(); tr.life=0;
            tr.vx=Math.random()*0.005+0.002;
          }
          tr.y = Math.max(0, Math.min(1, tr.y+tr.vy));
          const alpha = (1-tr.life/tr.maxLife)*0.65;
          const g = ctx.createLinearGradient((tr.x-tr.vx*10)*w, tr.y*h, tr.x*w, tr.y*h);
          g.addColorStop(0, `rgba(${rgb},0)`);
          g.addColorStop(1, `rgba(${rgb},${alpha})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo((tr.x-tr.vx*10)*w, tr.y*h);
          ctx.lineTo(tr.x*w, tr.y*h);
          ctx.stroke();
        });
      }

      // ── SCAN ────────────────────────────────────────────────────────
      if (animType === 'scan') {
        const cx=w/2, cy=h/2;
        const maxR = Math.min(w,h)*0.42;
        const sweep = (t*1.1)%(Math.PI*2);
        [0.33,0.66,1].forEach(f => {
          ctx.strokeStyle = `rgba(${rgb},0.1)`;
          ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.arc(cx,cy,maxR*f,0,Math.PI*2); ctx.stroke();
        });
        ctx.strokeStyle = `rgba(${rgb},0.07)`;
        ctx.lineWidth=0.7;
        ctx.beginPath();
        ctx.moveTo(cx-maxR,cy); ctx.lineTo(cx+maxR,cy);
        ctx.moveTo(cx,cy-maxR); ctx.lineTo(cx,cy+maxR);
        ctx.stroke();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,maxR,sweep-Math.PI*0.35,sweep);
        ctx.closePath();
        const g = ctx.createRadialGradient(cx,cy,0, cx,cy,maxR);
        g.addColorStop(0, `rgba(${rgb},0.3)`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = `rgba(${rgb},0.75)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx,cy);
        ctx.lineTo(cx+Math.cos(sweep)*maxR, cy+Math.sin(sweep)*maxR);
        ctx.stroke();
        scanDots.forEach(d => {
          const diff = ((d.angle-sweep)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
          if (diff < Math.PI*0.45) {
            const alpha = (1-diff/(Math.PI*0.45))*d.bright*0.9;
            const dx = cx+Math.cos(d.angle)*d.dist*maxR;
            const dy = cy+Math.sin(d.angle)*d.dist*maxR;
            ctx.fillStyle = `rgba(${rgb},${alpha})`;
            ctx.beginPath(); ctx.arc(dx,dy,2.2,0,Math.PI*2); ctx.fill();
          }
        });
        ctx.fillStyle = `rgba(${rgb},0.9)`;
        ctx.beginPath(); ctx.arc(cx,cy,2.5,0,Math.PI*2); ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    // Only animate when visible
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) {
          raf = requestAnimationFrame(draw);
        } else if (!visible) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
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
