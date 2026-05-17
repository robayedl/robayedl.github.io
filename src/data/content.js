// =====================================================================
// CONTENT CONFIG — single source of truth for all website content.
// =====================================================================

export const RESUME_PATH = '/resume.pdf';
export const LAST_UPDATED = typeof __LAST_UPDATED__ !== 'undefined' ? __LAST_UPDATED__ : 'April 2026';

export const profile = {
  name: 'Robayed Ashraf',
  title: 'AI/ML Engineer',
  tagline: 'Computer Vision · Agentic AI · LLM Applications',
  location: 'Sydney, Australia · Open to Relocate',
  email: 'robayedashraf@gmail.com',
  phone: '+61 492 979 732',
  github: 'https://github.com/robayedl',
  linkedin: 'https://www.linkedin.com/in/robayedashraf/',
  codeforces: 'https://codeforces.com/profile/robayedl?locale=en',
  leetcode: 'https://leetcode.com/u/robayedl/',
  summary:
    'AI/ML Engineer specialising in building production-grade systems across agentic RAG pipelines, LLM applications, and real-time computer vision. Built and deployed DocuMind end-to-end, a self-correcting, agentic RAG system with hybrid search, hallucination detection, and RAGAS evaluation. Comfortable owning the full stack from model design and API development to containerisation and CI/CD, and driven by shipping things that work in the real world.',
};

export const stats = [
  { label: 'Featured AI Projects', value: 6, suffix: '' },
  { label: 'GitHub Repo Contributions', value: 15, suffix: '+' },
  { label: 'Problems Solved', value: 1000, suffix: '+' },
  { label: 'Technologies', value: 30, suffix: '+' },
  { label: 'Masters GPA', value: 6.13, suffix: '/7.00', decimals: 2 },
  { label: 'Undergrad CGPA', value: 3.64, suffix: '/4.00', decimals: 2 },
];

export const projects = [
  {
    id: 'documind',
    title: 'DocuMind',
    subtitle: 'Agentic Document Intelligence',
    accent: '#6366f1',
    animType: 'neural',
    description:
      'Production-grade Agentic RAG system with query routing, relevance grading, hallucination detection, and self-correcting retry loops. Hybrid retrieval fuses BM25 with dense embeddings via Reciprocal Rank Fusion and cross-encoder reranking.',
    highlights: [
      'LangGraph agent with self-correcting retry loops',
      'Hybrid BM25 + dense vector search with RRF & reranking',
      'Gemini 2.5 Flash, SSE streaming, per-session memory',
      'FastAPI + Streamlit, Docker Compose, CI/CD, RAGAS eval',
    ],
    tech: ['LangGraph', 'LangChain', 'FastAPI', 'Gemini 2.5 Flash', 'ChromaDB', 'HuggingFace', 'BM25', 'Docker', 'GitHub Actions', 'RAGAS'],
    github: 'https://github.com/robayedl/DocuMind',
    period: 'Feb 2026 – Present',
    video: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/mBcN5ejaxfc',
      poster: '',
    },
  },
  {
    id: 'sign-language',
    title: 'SignSync',
    subtitle: 'Real-Time Sign Language Translation for Video Calls',
    accent: '#22d3ee',
    animType: 'wave',
    description:
      'Real-time AUSLAN finger-spelling classifier targeting the communication gap for the Deaf and Hard of Hearing community. Embedded into a customised Jitsi platform for live sign-to-text caption overlays during actual video calls.',
    highlights: [
      '99.79% validation accuracy across 42 classes / 3,200 images',
      '30-frame temporal smoothing (~1s) to stabilise live predictions',
      'Gemini API post-processing to correct concatenated words',
      'Selected for the UTS Tech Fest AI Showcase 2025',
    ],
    tech: ['Python', 'MediaPipe', 'OpenCV', 'ANN', 'Gemini API', 'Jitsi', 'React'],
    github: 'https://github.com/jason2134/SignSync',
    period: 'Feb 2025 – Jun 2025',
    showcase: {
      label: 'UTS Tech Fest AI Showcase 2025',
      youtubeEmbed: 'https://www.youtube.com/embed/Q38oYFgLOj0?start=0&end=56&rel=0',
    },
    video: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/iOI5fpFO3X8',
      poster: '',
    },
  },
  {
    id: 'smart-plant',
    title: 'Smart Plant Health Monitor',
    subtitle: 'MLOps-Driven Plant Disease Classification',
    accent: '#34d399',
    animType: 'grid',
    description:
      'End-to-end ML project lifecycle for precision agriculture — data ingestion, preprocessing, training, evaluation, and deployment managed with Agile practices, ClearML, and a Streamlit inference interface.',
    highlights: [
      'Modular ClearML pipeline with reproducible stages',
      'Artifact management for dataset and model versioning',
      'Streamlit inference UI for real-time leaf classification',
      'Jira + Confluence-driven Agile delivery',
    ],
    tech: ['Python', 'CNN', 'ClearML', 'Streamlit', 'Pandas', 'GitHub Actions'],
    github: 'https://github.com/asimsantos/thirdaxis',
    liveUrl: 'https://thirdaxis.onrender.com/',
    period: 'Feb 2025 – Jun 2025',
    video: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/XgYH-2zpQY4',
      poster: '',
    },
  },
  {
    id: 'mot',
    title: 'Multi-Object Tracking',
    subtitle: 'Transformer vs Detection-Based Benchmark',
    accent: '#e879f9',
    animType: 'track',
    description:
      'Compared MOTR (Transformer-based) and BoostTrack++ (tracking-by-detection with YOLOX) for retail footfall analytics and smart city surveillance. Profiled real-time inference trade-offs and benchmarked using MOTChallenge metrics.',
    highlights: [
      '1.54–3.60 FPS · 255–409 ms latency on RTX 4060',
      'Streamlit prototype for live webcam tracking comparison',
      'IDF1 / HOTA benchmarking via TrackEval',
      'Documented deployment trade-offs for live video',
    ],
    tech: ['PyTorch', 'YOLOX', 'MOTR', 'BoostTrack++', 'CUDA', 'TrackEval', 'Streamlit'],
    github: null,
    period: 'Jan 2025 – Jun 2025',
    video: {
      type: null,
      src: '',
      poster: '',
    },
  },
  {
    id: 'f1racers',
    title: 'F1Racers',
    subtitle: 'Deep RL for Autonomous Car Racing',
    accent: '#f59e0b',
    animType: 'race',
    description:
      'Autonomous car-racing agent trained with reinforcement learning in Gymnasium CarRacing-v3. Evaluated convergence, reward shaping and control efficiency across DQN, PPO and SAC.',
    highlights: [
      'Trained & compared DQN, PPO, SAC policies',
      'Analysed convergence and reward behaviour',
      'Control efficiency evaluation for autonomous driving',
    ],
    tech: ['Python', 'Gymnasium', 'PyTorch', 'DQN', 'PPO', 'SAC'],
    github: 'https://github.com/robayedl/F1Racers',
    period: 'Aug 2024 – Nov 2024',
    video: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/F8FQkhem2_k',
      poster: '',
    },
  },
  {
    id: 'traffic-sign',
    title: 'Traffic Sign Recognition',
    subtitle: 'CNN Classifier for Driver Assistance',
    accent: '#f43f5e',
    animType: 'scan',
    description:
      'CNN-based Traffic Sign Recognition system trained on the BTSC dataset. Designed for advanced driver assistance scenarios, with grayscale conversion and data augmentation pipeline.',
    highlights: [
      '98.45% test accuracy on BTSC dataset',
      '22,875 augmented training images',
      '4-layer CNN tailored to real-world road conditions',
    ],
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN'],
    github: 'https://github.com/robayedl/TrafficSignRecognitionUsingCNN',
    period: 'Feb 2024 – Jun 2024',
    video: {
      type: 'youtube',
      src: 'https://www.youtube.com/embed/r5fDZjh7Lp4',
      poster: '',
    },
  },
];

export const skills = [
  {
    group: 'AI & Machine Learning',
    items: [
      'Agentic AI',
      'LLM Applications',
      'RAG',
      'Generative AI',
      'Deep Learning',
      'Computer Vision',
      'NLP',
      'Prompt Engineering',
      'Hybrid Search',
      'Vector Embeddings',
      'LLM Evaluation (RAGAS)',
    ],
  },
  {
    group: 'Frameworks',
    items: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'Keras',
      'LangChain',
      'LangGraph',
      'FastAPI',
      'OpenCV',
      'Scikit-Learn',
      'HuggingFace',
      'ChromaDB',
    ],
  },
  {
    group: 'MLOps & DevOps',
    items: ['Docker', 'Docker Compose', 'GitHub Actions (CI/CD)', 'ClearML', 'Pytest'],
  },
  {
    group: 'Tools & Practices',
    items: ['REST API Development', 'Git', 'SQL', 'Agile/Scrum', 'Jira', 'Confluence'],
  },
];

export const experience = [
  {
    role: 'AI/ML Engineer',
    company: 'Self-Employed',
    period: 'Feb 2026 – Present',
    bullets: [
      'Designed the full agentic pipeline architecture from scratch, making deliberate choices around query routing, relevance grading, and hallucination detection.',
      'Improved retrieval precision by combining BM25 with dense vector search and cross-encoder reranking, iterating until results were meaningfully better than a vector-only baseline.',
      'Owned the evaluation strategy end-to-end, using RAGAS metrics to identify and fix quality gaps across pipeline iterations.',
      'Built the complete deployment setup, including containerisation, CI/CD, and REST API, taking the project from prototype to a shippable system.',
    ],
  },
  {
    role: 'Programming Trainer (Volunteer)',
    company: 'East West University Computer Programming Club',
    period: 'Jan 2019 – Oct 2021',
    bullets: [
      'Mentored 50+ students in algorithms, data structures, and competitive programming.',
      'Designed and conducted ICPC-style mock contests simulating high-pressure, time-critical environments.',
    ],
  },
];

export const education = [
  {
    school: 'University of Technology Sydney',
    url: 'https://www.uts.edu.au/',
    degree: 'Master of Artificial Intelligence',
    major: 'Major: Computer Vision',
    period: 'Aug 2023 – Jun 2025',
    grade: 'WAM: 80.94 / 100 · Grade: 6.13 / 7.00',
  },
  {
    school: 'East West University',
    url: 'https://ewubd.edu/',
    degree: 'B.Sc. in Computer Science and Engineering',
    major: '',
    period: 'Jan 2018 – Oct 2021',
    grade: 'CGPA: 3.64 / 4.00 · Dean\'s List & Merit Scholarship',
  },
];

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'stats', label: 'Stats' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
