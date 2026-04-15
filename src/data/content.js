// =====================================================================
// CONTENT CONFIG — single source of truth for all website content.
// =====================================================================

export const RESUME_PATH = '/resume.pdf';

export const profile = {
  name: 'Robayed Ashraf',
  title: 'AI/ML Engineer',
  tagline: 'Computer Vision · Agentic AI · LLM Applications',
  location: 'Sydney, Australia · Open to Relocate',
  email: 'robayedashraf@gmail.com',
  phone: '+61 492 979 732',
  github: 'https://github.com/robayedl',
  linkedin: 'https://www.linkedin.com/in/robayedashraf/',
  summary:
    'AI/ML Engineer with hands-on experience building production-grade agentic AI systems, LLM-powered applications, and end-to-end ML pipelines. Built DocuMind, an agentic RAG system using LangGraph with hybrid search, hallucination detection, and streaming responses, deployed with Docker and CI/CD. Completed a Master of Artificial Intelligence at UTS with applied work across computer vision, NLP, and generative AI.',
};

export const stats = [
  { label: 'Featured AI Projects', value: 6, suffix: '' },
  { label: 'Problems Solved', value: 1000, suffix: '+' },
  { label: 'GitHub Repo Contributions', value: 15, suffix: '' },
  { label: 'Masters WAM', value: 80.94, suffix: '/100', decimals: 2 },
  { label: 'Technologies', value: 33, suffix: '+' },
  { label: 'Undergrad CGPA', value: 3.64, suffix: '/4.00', decimals: 2 },
];

// =====================================================================
// PROJECTS
// video.type  = 'mp4' | 'youtube' | null
// video.src   = '/videos/file.mp4' or 'https://www.youtube.com/embed/ID'
// video.poster = '/posters/image.jpg'  (used as thumbnail)
//
// DROP mp4 files in /public/videos/
// DROP poster images in /public/posters/
// =====================================================================
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
    tech: ['LangGraph', 'LangChain', 'FastAPI', 'Gemini 2.5', 'ChromaDB', 'Docker', 'RAGAS'],
    github: 'https://github.com/robayedl/DocuMind',
    period: 'Feb 2026 – Present',
    video: {
      type: 'gdrive',
      src: 'https://drive.google.com/file/d/19S67KZ1nWcUcDesqeIP3ZHDbgPXOA7p2/preview',
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
      type: 'gdrive',
      src: 'https://drive.google.com/file/d/1poaLyyHlphwcyuERuAklksM7k_zmP1jN/preview',
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
      type: 'gdrive',
      src: 'https://drive.google.com/file/d/1zY1xYtHnkEqIkqKr526t_m4bbBOBLqQM/preview',
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
      type: 'gdrive',
      src: 'https://drive.google.com/file/d/1A_4sP8GilULZQaiBVip3vww99a75J2_U/preview',
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
      type: 'gdrive',
      src: 'https://drive.google.com/file/d/1boZB1i35HFjukPuEkh8ixloRWRtKCAvm/preview',
      poster: '',
    },
  },
];

export const skills = [
  {
    group: 'AI & Machine Learning',
    items: [
      'Computer Vision',
      'Deep Learning',
      'Generative AI',
      'Agentic AI',
      'LangChain',
      'LangGraph',
      'LLM Applications',
      'RAG',
      'Prompt Engineering',
      'Hybrid Search',
      'Semantic Search',
      'Vector Embeddings',
      'Responsible AI',
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'Keras',
      'OpenCV',
      'Scikit-Learn',
      'FastAPI',
      'ChromaDB',
      'HuggingFace',
    ],
  },
  {
    group: 'MLOps & Experimentation',
    items: ['ClearML', 'GitHub Actions', 'Docker', 'Docker Compose', 'Pytest', 'RAGAS Evaluation'],
  },
  {
    group: 'Tools & Practices',
    items: ['REST API Development', 'Git', 'Jira', 'Agile / Scrum', 'Confluence'],
  },
];

export const experience = [
  {
    role: 'AI/ML Engineer',
    company: 'Self-Employed',
    period: 'Feb 2026 – Present',
    bullets: [
      'Built DocuMind, a production-grade Agentic RAG system using LangGraph with query routing, relevance grading, hallucination detection, and self-correcting retry loops.',
      'Engineered hybrid retrieval combining BM25 sparse search with dense vector embeddings, fused via Reciprocal Rank Fusion and cross-encoder reranking.',
      'Integrated Gemini 2.5 Flash with SSE streaming, per-session conversation memory, and RAGAS evaluation for measurable quality tracking.',
      'Deployed as a multi-service app (FastAPI + Streamlit) with Docker Compose, GitHub Actions CI/CD, and a full REST API.',
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
