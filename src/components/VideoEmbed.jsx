import { useState } from 'react';

// video.type = 'mp4' | 'youtube' | 'gdrive' | null
//
// youtube → click-to-play with auto-derived thumbnail, then autoplay iframe
// gdrive  → iframe shown immediately (Drive player handles its own play button)
// mp4     → click-to-play overlay, then <video autoPlay>
// null    → styled placeholder

function getYoutubeThumbnail(src) {
  const match = src && src.match(/youtube\.com\/embed\/([^?/]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
}

export default function VideoEmbed({ video, accent }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = video && video.type && video.src;

  // ── No video: placeholder ────────────────────────────────────────────
  if (!hasVideo) {
    return (
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3"
        style={{
          border: `1px dashed ${accent}40`,
          background: `radial-gradient(ellipse at 50% 60%, ${accent}0d, transparent 70%),
                       linear-gradient(135deg, rgba(11,16,32,0.6), rgba(17,22,51,0.5))`,
        }}
      >
        <div
          className="h-14 w-14 rounded-full grid place-items-center"
          style={{ background: `${accent}14`, border: `1px solid ${accent}44` }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 ml-0.5" style={{ color: accent }}>
            <path d="M8 5v14l11-7L8 5z" fill="currentColor" opacity="0.55" />
          </svg>
        </div>
        <span className="mono text-xs tracking-widest uppercase" style={{ color: `${accent}77` }}>
          Demo coming soon
        </span>
      </div>
    );
  }

  // ── Google Drive: iframe shown directly ──────────────────────────────
  if (video.type === 'gdrive') {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/6 bg-black">
        <iframe
          src={video.src}
          title="Project demo"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  // ── YouTube / MP4: click-to-play overlay ─────────────────────────────
  if (!playing) {
    const poster = video.poster || (video.type === 'youtube' ? getYoutubeThumbnail(video.src) : '');
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group relative w-full aspect-video rounded-xl border border-white/6 overflow-hidden"
        aria-label="Play demo video"
      >
        {poster ? (
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 35% 45%, ${accent}20, transparent 60%),
                           linear-gradient(135deg, rgba(11,16,32,0.97), rgba(17,22,51,0.92))`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="absolute h-16 w-16 rounded-full animate-ping opacity-15"
            style={{ background: accent }}
            aria-hidden
          />
          <div
            className="relative h-16 w-16 rounded-full grid place-items-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${accent}20`,
              border: `1.5px solid ${accent}`,
              boxShadow: `0 0 40px -8px ${accent}`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 ml-0.5" style={{ color: accent }}>
              <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  // ── YouTube ───────────────────────────────────────────────────────────
  if (video.type === 'youtube') {
    const src = `${video.src}${video.src.includes('?') ? '&' : '?'}autoplay=1&rel=0&vq=hd1080`;
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/6">
        <iframe
          src={src}
          title="Project demo"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox allow-clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  // ── MP4 ───────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/6 bg-black">
      <video
        className="h-full w-full"
        src={video.src}
        poster={video.poster || undefined}
        controls
        autoPlay
        playsInline
      />
    </div>
  );
}
