import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
    <path d="M8 5v14l11-7L8 5z"/>
  </svg>
);

export default function ShowcaseBadge({ showcase }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Badge button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mono text-xs font-medium transition-all duration-200 border cursor-pointer"
        style={{
          color: '#fbbf24',
          borderColor: '#fbbf2455',
          background: '#fbbf2412',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#fbbf2422';
          e.currentTarget.style.boxShadow = '0 0 20px -6px #fbbf24';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#fbbf2412';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <TrophyIcon />
        {showcase.label}
        <PlayIcon />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8"
            style={{ background: 'rgba(5,7,15,0.85)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
              style={{
                background: 'rgba(11,16,32,0.95)',
                border: '1px solid rgba(251,191,36,0.25)',
                borderRadius: 18,
                boxShadow: '0 0 60px -15px rgba(251,191,36,0.35)',
                overflow: 'hidden',
              }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#fbbf24' }}><TrophyIcon /></span>
                  <span className="mono text-sm text-amber-300/90 font-medium tracking-wide">
                    {showcase.label}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-7 w-7 rounded-full grid place-items-center text-ink-400 hover:text-ink-100 hover:bg-white/8 transition-all text-base"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Video embed */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`${showcase.youtubeEmbed}&autoplay=1`}
                  title={showcase.label}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="px-5 py-3 mono text-xs text-ink-400 text-center">
                Our project demo runs from the beginning — first 56 seconds
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
