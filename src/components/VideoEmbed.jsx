import { useState } from 'react';
import ProjectAnimation from './ProjectAnimation.jsx';

export default function VideoEmbed({ video, accent, animType }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = video && video.type && video.src;

  if (!hasVideo) {
    return (
      <div
        className="relative w-full aspect-video rounded-xl border border-white/5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(11,16,32,0.9), rgba(17,22,51,0.8))' }}
      >
        <ProjectAnimation animType={animType} accent={accent} />
        {/* Subtle label overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-base-900/80 to-transparent flex items-end px-3 pb-2">
          <span className="mono text-[10px] text-ink-400 tracking-widest uppercase">
            Demo coming soon
          </span>
        </div>
      </div>
    );
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group relative w-full aspect-video rounded-xl border border-white/5 overflow-hidden"
        aria-label="Play demo video"
      >
        {video.poster ? (
          <img src={video.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 40%, ${accent}22, transparent 60%),
                           radial-gradient(ellipse at 70% 60%, ${accent}15, transparent 55%),
                           linear-gradient(135deg, rgba(11,16,32,0.95), rgba(17,22,51,0.9))`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-900/80 via-base-900/10 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="h-16 w-16 rounded-full grid place-items-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${accent}22`,
              border: `1.5px solid ${accent}`,
              boxShadow: `0 0 40px -8px ${accent}, 0 0 0 8px ${accent}11`,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 ml-0.5" style={{ color: accent }}>
              <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
            </svg>
          </div>
        </div>
        {/* Pulsing ring */}
        <div
          className="absolute inset-0 grid place-items-center pointer-events-none"
          aria-hidden
        >
          <div
            className="h-16 w-16 rounded-full animate-ping opacity-20"
            style={{ background: accent }}
          />
        </div>
      </button>
    );
  }

  if (video.type === 'youtube') {
    const src = `${video.src}${video.src.includes('?') ? '&' : '?'}autoplay=1&rel=0`;
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5">
        <iframe
          src={src}
          title="Project demo"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-black">
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
