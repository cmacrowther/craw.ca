export type ProjectCategory = "web" | "music" | "tool" | "games" | "other";

export interface ProjectAccent {
  badgeGradient: string;
  spotlight: string;
  surfaceGradient: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image?: string;
  video?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory;
  year: string;
  accent: ProjectAccent;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web App",
  music: "Music",
  tool: "Tool",
  games: "Game",
  other: "Other",
};

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "games", label: "Games" },
  { id: "music", label: "Music" },
  { id: "tool", label: "Tools" },
  { id: "other", label: "Other" },
] as const;

export const projects: Project[] = [
  {
    id: 1,
    slug: "tuneiq",
    title: "TuneIQ",
    description: "Real-time multiplayer music quiz with live leaderboard",
    longDescription:
      "TuneIQ is a real-time multiplayer music quiz built with Next.js, TypeScript, and Socket.IO. Players jump into shared rooms, answer music trivia together, and watch the live leaderboard and chat update in sync for a fast-moving party-game feel.",
    video: "/tuneiq-video.webm",
    technologies: ["Next.js", "TypeScript", "Socket.IO"],
    githubUrl: "https://gitlab.com/cmacrowther/tuneiq",
    liveUrl: "https://tuneiq.craw.ca/",
    category: "games",
    year: "2025",
    accent: {
      badgeGradient: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 48%, #a855f7 100%)",
      spotlight: "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(59,130,246,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(34,211,238,0.22) 0%, rgba(59,130,246,0.14) 50%, rgba(168,85,247,0.18) 100%)",
    },
  },
  {
    id: 2,
    slug: "songwriterjs",
    title: "SongwriterJS",
    description: "Gatsby template based on Spotify's Songwriter pages",
    longDescription:
      "SongwriterJS is a Gatsby and Netlify CMS template for artists who want a polished songwriter page without reinventing the whole stack. Inspired by Spotify's Songwriter Pages, it brings credits, collaborators, and track previews together in a clean editorial layout.",
    video: "/songwriter-video.webm",
    technologies: ["Gatsby v4", "React", "Bulma", "TypeScript"],
    githubUrl: "https://gitlab.com/cmacrowther/songwriter",
    liveUrl: "https://music.craw.ca",
    category: "music",
    year: "2024",
    accent: {
      badgeGradient: "linear-gradient(135deg, #f97316 0%, #f43f5e 55%, #fb7185 100%)",
      spotlight: "radial-gradient(circle, rgba(249,115,22,0.24) 0%, rgba(244,63,94,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(244,63,94,0.14) 50%, rgba(251,113,133,0.18) 100%)",
    },
  },
  {
    id: 3,
    slug: "heather-band-website",
    title: "Heather Band Website",
    description: "Static website for an indie band with a modern editorial feel",
    longDescription:
      "A static site created for my band, Heather. The goal was a clean and atmospheric presentation that felt current without losing personality, pairing straightforward navigation with a visual direction that matched the band's identity.",
    video: "/heather-video.webm",
    technologies: ["Gatsby", "React"],
    liveUrl: "https://heatherband.ca/",
    category: "music",
    year: "2022",
    accent: {
      badgeGradient: "linear-gradient(135deg, #fb7185 0%, #f59e0b 50%, #f97316 100%)",
      spotlight: "radial-gradient(circle, rgba(251,113,133,0.24) 0%, rgba(245,158,11,0.18) 44%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(251,113,133,0.18) 0%, rgba(245,158,11,0.14) 50%, rgba(249,115,22,0.18) 100%)",
    },
  },
  {
    id: 4,
    slug: "basket-case",
    title: "Basket Case",
    description: "VR paper toss game inspired by the classic mobile game",
    longDescription:
      "Basket Case is a fully immersive VR game built in Unity and inspired by the old Paper Toss formula. It uses motion controls and hand tracking so every crumple, throw, and bank shot feels tactile, physical, and a little ridiculous in the best way.",
    video: "/basket-case-video.webm",
    technologies: ["Unity", "C#", "Virtual Reality", "Hand Tracking"],
    githubUrl: "https://gitlab.com/TimeShifts/papertossvr",
    category: "games",
    year: "2023",
    accent: {
      badgeGradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 55%, #dc2626 100%)",
      spotlight: "radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(239,68,68,0.2) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(245,158,11,0.22) 0%, rgba(239,68,68,0.16) 50%, rgba(220,38,38,0.18) 100%)",
    },
  },
  {
    id: 5,
    slug: "forestry-mapper",
    title: "Forestry Mapper",
    description: "Interactive mapping web app built with drone photography tiles",
    longDescription:
      "Forestry Mapper is an interactive mapping app created as a learning project around open-source geospatial tooling. It uses custom tiles generated from drone photography and turns them into a smooth browsing experience with responsive controls and an approachable interface.",
    video: "/forestry-mapper-video.webm",
    technologies: ["Leaflet", "TypeScript", "Vite", "Node.js"],
    githubUrl: "https://gitlab.com/cmacrowther/macphail-woods-dashboard",
    liveUrl: "https://jelly-racer-wfsn.vercel.app/",
    category: "web",
    year: "2024",
    accent: {
      badgeGradient: "linear-gradient(135deg, #14b8a6 0%, #22c55e 48%, #0ea5e9 100%)",
      spotlight: "radial-gradient(circle, rgba(20,184,166,0.26) 0%, rgba(34,197,94,0.18) 44%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(20,184,166,0.2) 0%, rgba(34,197,94,0.16) 50%, rgba(14,165,233,0.18) 100%)",
    },
  },
  {
    id: 6,
    slug: "jelly-jammers",
    title: "Jelly Jammers",
    description: "Multiplayer bumper-car battle royale with mobile tilt controls",
    longDescription:
      "Jelly Jammers is a chaotic multiplayer web game inspired by the Jackbox controller model. Players use their phones as tilt-based controllers and slam jelly cars into each other in a browser-based party game built around Socket.IO, responsive input, and fast feedback.",
    video: "/jelly-jammers-video.webm",
    technologies: ["Socket.IO", "Express", "Three.js", "Mobile Controls"],
    githubUrl: "https://gitlab.com/cmacrowther/jelly-racer",
    liveUrl: "https://jelly.craw.ca",
    category: "games",
    year: "2025",
    accent: {
      badgeGradient: "linear-gradient(135deg, #84cc16 0%, #06b6d4 50%, #3b82f6 100%)",
      spotlight: "radial-gradient(circle, rgba(132,204,22,0.26) 0%, rgba(6,182,212,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(132,204,22,0.2) 0%, rgba(6,182,212,0.14) 50%, rgba(59,130,246,0.18) 100%)",
    },
  },
  {
    id: 7,
    slug: "waxtrax",
    title: "WaxTrax",
    description: "Music display for vinyl lovers with real-time track identification",
    longDescription:
      "WaxTrax listens to the music playing in your room, identifies the track in real time, and turns a television into a living now-playing screen. Album art, artist details, and song information all update live to make a listening session feel like an installation piece.",
    video: "/waxtrax-video.webm",
    technologies: ["Python", "Next.js", "Flask"],
    githubUrl: "https://gitlab.com/cmacrowther/waxtrax",
    category: "music",
    year: "2025",
    accent: {
      badgeGradient: "linear-gradient(135deg, #ec4899 0%, #f97316 52%, #facc15 100%)",
      spotlight: "radial-gradient(circle, rgba(236,72,153,0.24) 0%, rgba(249,115,22,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(249,115,22,0.16) 50%, rgba(250,204,21,0.16) 100%)",
    },
  },
  {
    id: 8,
    slug: "gobert-ui",
    title: "Gobert UI",
    description: "Modern immersive AI chat interface with an interactive 3D avatar",
    longDescription:
      "Gobert UI is a cinematic AI chat experience built with Next.js, Tailwind CSS, and React Three Fiber. It pairs a floating 3D avatar with real-time messaging and a polished interface designed for talking to local or remote Clawdbot instances.",
    image: "/gobert-ui.png",
    video: "/gobertui-video.mp4",
    technologies: ["Next.js", "Tailwind CSS", "React Three Fiber", "Docker"],
    githubUrl: "https://github.com/cmacrowther/gobert",
    category: "tool",
    year: "2026",
    accent: {
      badgeGradient: "linear-gradient(135deg, #38bdf8 0%, #3b82f6 45%, #2dd4bf 100%)",
      spotlight: "radial-gradient(circle, rgba(56,189,248,0.24) 0%, rgba(59,130,246,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(59,130,246,0.14) 50%, rgba(45,212,191,0.18) 100%)",
    },
  },
];

export const projectsByYear = [...projects].sort((a, b) => Number(b.year) - Number(a.year));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3) {
  return projectsByYear.filter((project) => project.slug !== slug).slice(0, limit);
}

export function isEmbeddableProject(project: Project) {
  return Boolean(project.liveUrl && !project.liveUrl.includes("#"));
}
