export type ProjectCategory = "web" | "music" | "tool" | "games" | "ai" | "other";
export type ProjectState = "ongoing" | "feature-complete" | "archived";
export type ProjectDistribution = "open-source" | "closed-source";

export interface ProjectAccent {
  badgeGradient: string;
  spotlight: string;
  surfaceGradient: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  projectStory: string;
  buildFocus: string;
  experienceGoal: string;
  image?: string;
  video?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  categories: ProjectCategory[];
  projectState: ProjectState;
  distribution: ProjectDistribution;
  releaseDate: string;
  accent: ProjectAccent;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web App",
  music: "Music",
  tool: "Tool",
  games: "Game",
  ai: "AI",
  other: "Other",
};

export const projectStateLabels: Record<ProjectState, string> = {
  ongoing: "Ongoing",
  "feature-complete": "Feature Complete",
  archived: "Archived",
};

export const distributionLabels: Record<ProjectDistribution, string> = {
  "open-source": "Open Source",
  "closed-source": "Closed Source",
};

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI" },
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
    shortDescription: "Real-time multiplayer music quiz with live rooms and leaderboard drama.",
    longDescription:
      "TuneIQ is a browser-based multiplayer music quiz built to capture the energy of a living-room party game. Players join shared rooms, answer rounds together in real time, and see scores, chat, and momentum shift instantly as the session unfolds.",
    projectStory:
      "I wanted to build a music game that felt social first instead of quiz-first. The interesting challenge was not only validating answers quickly, but making the whole room feel connected through synchronized state, fast score updates, and a pace that stayed exciting between questions. TuneIQ became a project about orchestrating shared moments, where technical decisions around websockets, room flow, and feedback all served the same goal: keeping the energy high from the first round to the last reveal.",
    buildFocus: "Tight real-time multiplayer loops, clear room state, and fast feedback that keeps players engaged together.",
    experienceGoal: "Make a music trivia session feel lively, competitive, and easy to jump into with friends.",
    video: "/tuneiq-video.webm",
    technologies: ["Next.js", "TypeScript", "Socket.IO"],
    githubUrl: "https://gitlab.com/cmacrowther/tuneiq",
    liveUrl: "https://tuneiq.craw.ca/",
    categories: ["games", "music", "web"],
    projectState: "feature-complete",
    distribution: "open-source",
    releaseDate: "2025",
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
    shortDescription: "Artist-focused Gatsby template inspired by Spotify's songwriter presentation.",
    longDescription:
      "SongwriterJS is a Gatsby and Netlify CMS template for artists who want a polished songwriter page without rebuilding the stack from scratch. It combines credits, collaborators, releases, and previews into an editorial layout that feels focused on the work itself.",
    projectStory:
      "This project started from a simple question: why is it still so hard for artists and songwriters to present their body of work cleanly online? I used that frustration as a design prompt and built a reusable template that balances structure with personality. The result is part website starter, part content system, and part design exercise in making music metadata feel curated instead of cluttered.",
    buildFocus: "Reusable content structure for music portfolios paired with a clean, publication-style frontend.",
    experienceGoal: "Help artists launch a credible online presence that feels polished, personal, and easy to maintain.",
    video: "/songwriter-video.webm",
    technologies: ["Gatsby v4", "React", "Bulma", "TypeScript"],
    githubUrl: "https://gitlab.com/cmacrowther/songwriter",
    liveUrl: "https://music.craw.ca",
    categories: ["music", "web", "tool"],
    projectState: "feature-complete",
    distribution: "open-source",
    releaseDate: "2024",
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
    shortDescription: "Editorial-style band website designed to feel atmospheric, current, and human.",
    longDescription:
      "Heather Band Website is a static site created for my band, designed to feel atmospheric without becoming difficult to use. The layout pairs straightforward navigation with a visual direction that supports the band's identity and gives the music space to breathe.",
    projectStory:
      "Because this was for my own band, the project lived right at the intersection of design taste and practical delivery. I wanted the site to feel like an extension of the music instead of a generic promo page, which meant paying close attention to mood, pacing, typography, and restraint. The story of the build was really about translating a creative identity into a web experience that still stayed fast, clear, and maintainable.",
    buildFocus: "A strong visual mood supported by simple information architecture and lightweight static delivery.",
    experienceGoal: "Give visitors a memorable sense of the band's identity within a clean, low-friction browsing experience.",
    video: "/heather-video.webm",
    technologies: ["Gatsby", "React"],
    liveUrl: "https://heatherband.ca/",
    categories: ["music", "web"],
    projectState: "ongoing",
    distribution: "closed-source",
    releaseDate: "2022",
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
    shortDescription: "VR paper toss game that turns a simple idea into something physical and playful.",
    longDescription:
      "Basket Case is a fully immersive VR game built in Unity and inspired by the classic Paper Toss loop. Motion controls and hand tracking turn each crumple, throw, and lucky bank shot into a tactile interaction that feels much bigger in virtual reality.",
    projectStory:
      "What interested me here was taking a tiny, familiar mechanic and seeing how far immersion could transform it. In VR, even a simple paper toss becomes about gesture, distance, timing, and the physical comedy of missing badly. Building Basket Case meant focusing on responsiveness and embodiment so the player could forget the technical layer and just enjoy the absurdity of throwing virtual garbage with conviction.",
    buildFocus: "Responsive motion input, tactile interaction, and a compact gameplay loop that feels great moment to moment.",
    experienceGoal: "Make a throwaway arcade mechanic feel surprisingly physical, funny, and satisfying in VR.",
    video: "/basket-case-video.webm",
    technologies: ["Unity", "C#", "Virtual Reality", "Hand Tracking"],
    githubUrl: "https://gitlab.com/TimeShifts/papertossvr",
    categories: ["games"],
    projectState: "archived",
    distribution: "open-source",
    releaseDate: "2023",
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
    shortDescription: "Interactive mapping app built around custom drone-photography tile layers.",
    longDescription:
      "Forestry Mapper is an interactive mapping app created as a hands-on exploration of open-source geospatial tooling. It uses custom map tiles generated from drone photography and presents them through a responsive interface built for easy exploration.",
    projectStory:
      "This project was driven by curiosity around mapping pipelines as much as frontend implementation. I wanted to understand how raw aerial imagery could move from drone capture into a usable web experience, and that made the build both technical and product-oriented. The final app became a way to experiment with tiles, performance, and map UX while still delivering something understandable to someone who just wants to pan, zoom, and inspect the landscape.",
    buildFocus: "Translating geospatial data into a smooth browser mapping experience with approachable controls.",
    experienceGoal: "Make detailed environmental imagery feel easy to navigate, inspect, and trust.",
    video: "/forestry-mapper-video.webm",
    technologies: ["Leaflet", "TypeScript", "Vite", "Node.js"],
    githubUrl: "https://gitlab.com/cmacrowther/macphail-woods-dashboard",
    liveUrl: "https://jelly-racer-wfsn.vercel.app/",
    categories: ["web", "tool"],
    projectState: "feature-complete",
    distribution: "open-source",
    releaseDate: "2024",
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
    shortDescription: "Chaotic browser party game with mobile tilt controls and jelly-car collisions.",
    longDescription:
      "Jelly Jammers is a chaotic multiplayer web game inspired by the Jackbox controller model. Players use their phones as tilt-based controllers and smash jelly cars into each other in a browser party game built around responsive input and shared-state action.",
    projectStory:
      "I liked the challenge of splitting the experience across devices without making setup feel complicated. The core idea was simple and silly, but making it actually fun meant solving for controller latency, readable game states, and enough audiovisual feedback to make every collision land. Jelly Jammers turned into a playful systems project where multiplayer architecture and party-game energy had to reinforce each other at every step.",
    buildFocus: "Cross-device multiplayer flow, responsive controller input, and high-energy feedback loops.",
    experienceGoal: "Create a party game that feels instantly understandable, chaotic, and fun in a room full of people.",
    video: "/jelly-jammers-video.webm",
    technologies: ["Socket.IO", "Express", "Three.js", "Mobile Controls"],
    githubUrl: "https://gitlab.com/cmacrowther/jelly-racer",
    liveUrl: "https://jelly.craw.ca",
    categories: ["games", "web"],
    projectState: "ongoing",
    distribution: "open-source",
    releaseDate: "2025",
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
    shortDescription: "Now-playing display that listens to a room and identifies records in real time.",
    longDescription:
      "WaxTrax listens to the music playing in a room, identifies the track in real time, and turns a television into a living now-playing display. Album art, artist details, and song information update live to make a listening session feel more like an installation than a utility.",
    projectStory:
      "WaxTrax came from wanting to make music listening feel more intentional and ceremonial at home. Instead of treating identification as a background utility, I leaned into the idea of a dedicated display that adds presence to the room while a record is playing. Building it meant combining audio recognition with frontend presentation in a way that feels ambient, not distracting, so the technology supports the ritual instead of taking it over.",
    buildFocus: "Real-time track recognition connected to a display experience that feels ambient and elegant.",
    experienceGoal: "Turn passive metadata into a warm visual companion for focused listening sessions.",
    video: "/waxtrax-video.webm",
    technologies: ["Python", "Next.js", "Flask"],
    githubUrl: "https://gitlab.com/cmacrowther/waxtrax",
    categories: ["music", "tool"],
    projectState: "ongoing",
    distribution: "open-source",
    releaseDate: "2025",
    accent: {
      badgeGradient: "linear-gradient(135deg, #ec4899 0%, #f97316 52%, #facc15 100%)",
      spotlight: "radial-gradient(circle, rgba(236,72,153,0.24) 0%, rgba(249,115,22,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(249,115,22,0.16) 50%, rgba(250,204,21,0.16) 100%)",
    },
  },
  {
    id: 8,
    slug: "gobert-ui",
    title: "Gobert",
    shortDescription: "Immersive OpenClaw interface with cinematic chat UI and a live 3D avatar.",
    longDescription:
      "Gobert is a cinematic AI chat interface built with Next.js, Tailwind CSS, and React Three Fiber. It pairs real-time messaging with a floating 3D avatar and a polished visual system designed for talking to local or remote OpenClaw instances.",
    projectStory:
      "This project was an opportunity to treat an AI interface less like a dashboard and more like a character-driven environment. I wanted the experience to feel immediate, expressive, and a little theatrical, without sacrificing responsiveness or clarity. The work naturally became a balance between interaction design and presentation engineering, using motion, lighting, and layout to make the chat feel alive while still keeping the conversation front and center.",
    buildFocus: "Blending real-time chat UX with expressive visual presentation and performant 3D interface work.",
    experienceGoal: "Make talking to an AI feel immersive, legible, and genuinely enjoyable to spend time in.",
    image: "/gobert-ui.png",
    video: "/gobertui-video.mp4",
    technologies: ["OpenClaw", "LLM", "Artificial Intelligence", "Next.js", "Tailwind", "React Three Fiber"],
    githubUrl: "https://github.com/cmacrowther/gobert",
    categories: ["tool", "web", "ai"],
    projectState: "ongoing",
    distribution: "open-source",
    releaseDate: "2026",
    accent: {
      badgeGradient: "linear-gradient(135deg, #38bdf8 0%, #3b82f6 45%, #2dd4bf 100%)",
      spotlight: "radial-gradient(circle, rgba(56,189,248,0.24) 0%, rgba(59,130,246,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(59,130,246,0.14) 50%, rgba(45,212,191,0.18) 100%)",
    },
  },
];

function getProjectReleaseSortValue(project: Pick<Project, "releaseDate" | "projectState">) {
  const parsedReleaseDate = Number.parseInt(project.releaseDate, 10);

  if (Number.isFinite(parsedReleaseDate)) {
    return parsedReleaseDate;
  }

  return project.projectState === "ongoing" ? 9999 : 0;
}

export const projectsByReleaseDate = [...projects].sort((a, b) => getProjectReleaseSortValue(b) - getProjectReleaseSortValue(a));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3) {
  const currentProject = getProjectBySlug(slug);

  if (!currentProject) {
    return projectsByReleaseDate.filter((project) => project.slug !== slug).slice(0, limit);
  }

  return [...projectsByReleaseDate]
    .filter((project) => project.slug !== slug)
    .sort((a, b) => {
      const aSharedCategories = a.categories.filter((category) => currentProject.categories.includes(category)).length;
      const bSharedCategories = b.categories.filter((category) => currentProject.categories.includes(category)).length;

      if (bSharedCategories !== aSharedCategories) {
        return bSharedCategories - aSharedCategories;
      }

      return getProjectReleaseSortValue(b) - getProjectReleaseSortValue(a);
    })
    .slice(0, limit);
}

export function isEmbeddableProject(project: Project) {
  return Boolean(project.liveUrl && !project.liveUrl.includes("#"));
}
