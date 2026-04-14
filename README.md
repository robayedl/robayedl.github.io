# Robayed Ashraf — Portfolio

Personal portfolio built with Vite + React + Tailwind CSS + Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Customising content

All content lives in a single file: `src/data/content.js`.

Swap in videos / posters / resume without touching component code:

- **Resume PDF** — drop at `public/resume.pdf` (or change `RESUME_PATH` in `src/data/content.js`).
- **Project demo videos** — inside the `projects` array, each project has a `video` block:
  - `video.type`   — `'mp4'` | `'youtube'` | `null`
  - `video.src`    — local path (e.g. `/videos/documind.mp4`) or YouTube `/embed/` URL
  - `video.poster` — thumbnail image path (e.g. `/posters/documind.jpg`)
  - Set `video.type` to `null` to hide the player for a specific project.
- **Local video files** — place mp4s in `public/videos/` and poster images in `public/posters/`.

Search the repo for `TODO` to find every drop-in spot.

## Stack

- Vite + React 18
- Tailwind CSS (dark theme)
- Framer Motion (scroll-triggered reveals, staggered cards, animated counters)
- HTML Canvas particle/neural network hero background
