export type ProjectCategory = "web" | "music" | "tool" | "games" | "ai" | "other";
export type ProjectState = "ongoing" | "feature-complete" | "archived" | "paused";
export type ProjectDistribution = "open-source" | "closed-source";

export interface ProjectAccent {
  badgeGradient: string;
  spotlight: string;
  surfaceGradient: string;
}

export interface ProjectCopyLink {
  term: string;
  href: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  metadataDescription: string;
  logo?: string;
  logoCardClassName?: string;
  shortDescription: string;
  longDescription: string;
  projectStory: string;
  buildFocus: string;
  experienceGoal: string;
  copyLinks?: ProjectCopyLink[];
  image?: string;
  video?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  categories: ProjectCategory[];
  highlightCategories?: Array<ProjectCategory | "all">;
  projectState: ProjectState;
  distribution: ProjectDistribution;
  releaseDate: string;
  accent: ProjectAccent;
}

export type ProjectCardData = Pick<
  Project,
  | "id"
  | "slug"
  | "title"
  | "logo"
  | "logoCardClassName"
  | "shortDescription"
  | "image"
  | "video"
  | "technologies"
  | "categories"
  | "highlightCategories"
  | "accent"
>;

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
  "paused": "Paused"
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

// The homepage is intentionally curated around these three projects. Keep this
// separate from category highlights, which are used when browsing the archive.
export const featuredProjectSlugs = ["referee", "aurea", "wayfarer"] as const;

export const projects: Project[] = [
  {
    id: 13,
    slug: "aurea",
    title: "Aurea",
    metadataDescription: "Aurea is a visually composed social platform for sharing and discovering short-form video and live photos in a continuous golden-ratio feed.",
    logo: "/aurea.svg",
    shortDescription: "A golden-ratio social gallery for short-form video and live photos, designed as an endless media loop.",
    longDescription:
      "Aurea is a social media platform for uploading and discovering short-form videos and live photos. Its gallery is composed around the golden ratio, creating a flowing, asymmetric feed where every piece of media leads naturally into the next in a continuous loop.",
    projectStory:
      "The idea was to give a familiar social feed a more intentional sense of rhythm. Rather than stacking identical posts in a conventional scroll, I used golden-ratio proportions to make the gallery feel editorial and alive while preserving the immediacy people expect from short-form media. Underneath that experience is a Cloudflare-native backend that keeps uploads, media storage, and relational data close to the edge.",
    buildFocus: "A continuous golden-ratio gallery backed by a Cloudflare Worker, with D1 relational data and R2 media uploads.",
    experienceGoal: "Make discovering short-form media feel like moving through an endless, carefully composed visual stream.",
    video: "/aurea-video.webm",
    technologies: ["React", "TypeScript", "Vite", "Hono", "Cloudflare Workers", "D1", "R2", "Prisma"],
    liveUrl: "https://aurea.craw.ca/",
    categories: ["web"],
    highlightCategories: ["all", "web"],
    projectState: "ongoing",
    distribution: "closed-source",
    releaseDate: "2026",
    accent: {
      badgeGradient: "linear-gradient(135deg, #facc15 0%, #f59e0b 48%, #f97316 100%)",
      spotlight: "radial-gradient(circle, rgba(250,204,21,0.3) 0%, rgba(245,158,11,0.2) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(250,204,21,0.22) 0%, rgba(245,158,11,0.16) 50%, rgba(249,115,22,0.18) 100%)",
    },
  },
  {
    id: 12,
    slug: "wayfarer",
    title: "Wayfarer",
    metadataDescription: "Wayfarer is a private, offline-first browser start page for bookmarks and Read Later items, with user-owned sync and built-in search.",
    logo: "/wayfarer.svg",
    logoCardClassName: "h-11 md:h-12",
    shortDescription: "An offline-first personal start page with synced bookmarks, protected editing, and built-in search bangs.",
    longDescription:
      "Wayfarer is a personal browser start page that keeps bookmarks and Read Later items available locally first, then syncs changes to a user-owned Supabase or Firebase project. It combines protected editing, Google and bang searches, Selfh.st icons, and a resilient sync queue so the dashboard stays useful whether the browser is online or not.",
    projectStory:
      "The goal was to make a personal start page feel dependable rather than disposable. I centered the build on local-first data: edits are written to IndexedDB immediately, with an idempotent queue handling cloud updates and incremental pulls when a connection is available. The cloud setup is designed to stay in the user's hands, with short-lived OAuth connectors that create or reuse their own Supabase or Firebase project without exposing secrets. That foundation made it possible to pair a quick, focused bookmark experience with sync that behaves gracefully across reconnects, tabs, and devices.",
    buildFocus: "Offline-first bookmark data, conflict-resilient cloud sync, and a simple setup flow for user-owned Supabase or Firebase projects.",
    experienceGoal: "Make a personal start page feel fast, private, and reliable—whether online, offline, or moving between browsers.",
    video: "/wayfarer-video.webm",
    technologies: ["Next.js", "TypeScript", "IndexedDB", "Supabase", "Firebase"],
    liveUrl: "https://wayfarer.craw.ca/",
    categories: ["web", "tool"],
    highlightCategories: ["all", "tool"],
    projectState: "ongoing",
    distribution: "open-source",
    releaseDate: "2026",
    accent: {
      badgeGradient: "linear-gradient(135deg, #0f766e 0%, #14b8a6 48%, #38bdf8 100%)",
      spotlight: "radial-gradient(circle, rgba(20,184,166,0.28) 0%, rgba(56,189,248,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(15,118,110,0.22) 0%, rgba(20,184,166,0.16) 50%, rgba(56,189,248,0.18) 100%)",
    },
  },
  {
    id: 1,
    slug: "tuneiq",
    title: "TuneIQ",
    metadataDescription: "TuneIQ is a real-time multiplayer music trivia game with shared rooms, live scoring, chat, and friendly leaderboard competition.",
    shortDescription: "Real-time multiplayer music quiz with live rooms and leaderboard drama.",
    longDescription:
      "TuneIQ is a browser-based multiplayer music quiz built to capture the energy of a living-room party game. Players join shared rooms, answer rounds together in real time, and see scores, chat, and momentum shift instantly as the session unfolds.",
    projectStory:
      "I wanted to build a music game that felt social first instead of quiz-first. The interesting challenge was not only validating answers quickly, but making the whole room feel connected through synchronized state, fast score updates, and a pace that stayed exciting between questions. TuneIQ became a project about orchestrating shared moments, where technical decisions around websockets, room flow, and feedback all served the same goal: keeping the energy high from the first round to the last reveal.",
    buildFocus: "Tight real-time multiplayer loops, clear room state, and fast feedback that keeps players engaged together.",
    experienceGoal: "Make a music trivia session feel lively, competitive, and easy to jump into with friends.",
    video: "/tuneiq-video.webm",
    technologies: ["Next.js", "TypeScript", "Socket.IO"],
    liveUrl: "https://tuneiq.craw.ca/",
    categories: ["games", "music", "web"],
    highlightCategories: ["music"],
    projectState: "feature-complete",
    distribution: "closed-source",
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
    metadataDescription: "SongwriterJS is an open-source Gatsby template that gives artists a polished home for their songs, credits, collaborators, and releases.",
    logo: "/javascript-logo.png",
    shortDescription: "Artist-focused Gatsby template inspired by Spotify's songwriter presentation.",
    longDescription:
      "SongwriterJS is a Gatsby and Netlify CMS template for artists who want a polished songwriter page without rebuilding the stack from scratch. It combines credits, collaborators, releases, and previews into an editorial layout that feels focused on the work itself.",
    projectStory:
      "This project started from a simple question: why is it still so hard for artists and songwriters to present their body of work cleanly online? I used that frustration as a design prompt and built a reusable template that balances structure with personality. The result is part website starter, part content system, and part design exercise in making music metadata feel curated instead of cluttered.",
    buildFocus: "Reusable content structure for music portfolios paired with a clean, publication-style frontend.",
    experienceGoal: "Help artists launch a credible online presence that feels polished, personal, and easy to maintain.",
    video: "/songwriter-video.webm",
    technologies: ["Gatsby v4", "React", "Bulma", "TypeScript"],
    githubUrl: "https://github.com/cmacrowther/songwriter",
    liveUrl: "https://music.craw.ca",
    categories: ["music", "web", "tool"],
    highlightCategories: ["tool"],
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
    title: "Heather",
    metadataDescription: "A fast, atmospheric website for Heather that translates the band's identity into an editorial experience built around the music.",
    logo: "/heather.png",
    logoCardClassName: "h-7 md:h-8",
    shortDescription: "Editorial-style band website designed to feel atmospheric and human, with a touch of rock n' roll edge.",
    longDescription:
      "Heather Band Website is a static site created for my band, designed to feel atmospheric without becoming difficult to use. The layout pairs straightforward navigation with a visual direction that supports the band's identity and gives the music space to breathe.",
    projectStory:
      "Because this was for my own band, the project lived right at the intersection of design taste and practical delivery. I wanted the site to feel like an extension of the music instead of a generic promo page, which meant paying close attention to mood, pacing, typography, and restraint. The story of the build was really about translating a creative identity into a web experience that still stayed fast, clear, and maintainable.",
    buildFocus: "A strong visual mood supported by simple information architecture and lightweight static delivery.",
    experienceGoal: "Give visitors a memorable sense of the band's identity within a clean, low-friction browsing experience.",
    video: "/heather-videos.webm",
    technologies: ["Gatsby", "React"],
    liveUrl: "https://heatherband.ca/",
    categories: ["music", "web"],
    projectState: "feature-complete",
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
    metadataDescription: "Basket Case is an immersive Unity VR game that turns the classic paper-toss loop into a tactile, hand-tracked arcade experience.",
    logo: "/basketcase.png",
    logoCardClassName: "h-7 md:h-8",
    shortDescription: "VR paper toss game that turns a simple idea into something physical and playful.",
    longDescription:
      "Basket Case is a fully immersive VR game built in Unity and inspired by the classic Paper Toss loop. Motion controls and hand tracking turn each crumple, throw, and lucky bank shot into a tactile interaction that feels much bigger in virtual reality.",
    projectStory:
      "What interested me here was taking a tiny, familiar mechanic and seeing how far immersion could transform it. In VR, even a simple paper toss becomes about gesture, distance, timing, and the physical comedy of missing badly. Building Basket Case meant focusing on responsiveness and embodiment so the player could forget the technical layer and just enjoy the absurdity of throwing virtual garbage with conviction.",
    buildFocus: "Responsive motion input, tactile interaction, and a compact gameplay loop that feels great moment to moment.",
    experienceGoal: "Make a throwaway arcade mechanic feel surprisingly physical, funny, and satisfying in VR.",
    video: "/basket-case-video.webm",
    technologies: ["Unity", "C#", "Virtual Reality", "Hand Tracking"],
    categories: ["games"],
    highlightCategories: ["games"],
    projectState: "archived",
    distribution: "closed-source",
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
    metadataDescription: "Forestry Mapper is a responsive web map for exploring drone-photography tiles, built as an experiment in open-source geospatial tooling.",
    shortDescription: "Interactive mapping app built around custom drone-photography tile layers.",
    longDescription:
      "Forestry Mapper is an interactive mapping app created as a hands-on exploration of open-source geospatial tooling. It uses custom map tiles generated from drone photography and presents them through a responsive interface built for easy exploration.",
    projectStory:
      "This project was driven by curiosity around mapping pipelines as much as frontend implementation. I wanted to understand how raw aerial imagery could move from drone capture into a usable web experience, and that made the build both technical and product-oriented. The final app became a way to experiment with tiles, performance, and map UX while still delivering something understandable to someone who just wants to pan, zoom, and inspect the landscape.",
    buildFocus: "Translating geospatial data into a smooth browser mapping experience with approachable controls.",
    experienceGoal: "Make detailed environmental imagery feel easy to navigate, inspect, and trust.",
    video: "/forestry-mapper-video.webm",
    technologies: ["Leaflet", "TypeScript", "Vite", "Node.js"],
    liveUrl: "https://jelly-racer-wfsn.vercel.app/",
    categories: ["web", "tool"],
    projectState: "archived",
    distribution: "closed-source",
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
    metadataDescription: "Jelly Jammers is a browser party game where players steer jelly cars from their phones and collide in fast multiplayer rounds.",
    logo: "/jelly-jammers.png",
    shortDescription: "Chaotic browser party game with mobile tilt controls and jelly-car collisions.",
    longDescription:
      "Jelly Jammers is a chaotic multiplayer web game inspired by the Jackbox controller model. Players use their phones as tilt-based controllers and smash jelly cars into each other in a browser party game built around responsive input and shared-state action.",
    projectStory:
      "I liked the challenge of splitting the experience across devices without making setup feel complicated. The core idea was simple and silly, but making it actually fun meant solving for controller latency, readable game states, and enough audiovisual feedback to make every collision land. Jelly Jammers turned into a playful systems project where multiplayer architecture and party-game energy had to reinforce each other at every step.",
    buildFocus: "Cross-device multiplayer flow, responsive controller input, and high-energy feedback loops.",
    experienceGoal: "Create a party game that feels instantly understandable, chaotic, and fun in a room full of people.",
    video: "/jelly-jammers-video.webm",
    technologies: ["Socket.IO", "Express", "Three.js", "Mobile Controls"],
    liveUrl: "https://jelly.craw.ca",
    categories: ["games", "web"],
    highlightCategories: ["games"],
    projectState: "ongoing",
    distribution: "closed-source",
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
    metadataDescription: "WaxTrax turns a room's music into a living now-playing display, identifying tracks in real time as records spin.",
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
    highlightCategories: ["music"],
    projectState: "paused",
    distribution: "open-source",
    releaseDate: "2025",
    accent: {
      badgeGradient: "linear-gradient(135deg, #ec4899 0%, #f97316 52%, #facc15 100%)",
      spotlight: "radial-gradient(circle, rgba(236,72,153,0.24) 0%, rgba(249,115,22,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(249,115,22,0.16) 50%, rgba(250,204,21,0.16) 100%)",
    },
  },
  {
    id: 11,
    slug: "referee",
    title: "REFEREE",
    metadataDescription: "REFEREE uses local GPU power to upscale, denoise, and enhance web streams in real time—with a simple API for developer integration.",
    logo: "/referee.svg",
    shortDescription: "A desktop app that uses your NVIDIA or AMD GPU to silently upscale, denoise, and enhance any web stream in real time — and a single API call is all developers need to unlock it for their users.",
    longDescription:
      "REFEREE is a Windows and Linux desktop application that sits quietly in the background and uses your locally installed GPU to transform the web streams you watch in real time. Low-bitrate video becomes sharper, cleaner, and higher-fidelity through on-device AI — upscaling, denoise, frame generation, and HDR tone mapping — without a single frame leaving your machine or touching a server. For developers, integration is a few lines of JavaScript: point REFEREE at your stream and your entire audience with compatible hardware automatically gets a dramatically better picture. No re-encoding, no CDN upgrades, no per-user server cost. Also available as a self-hosted headless server and Docker image for those who prefer running it server-side.",
    projectStory:
      "REFEREE came from a simple frustration: delivering high-resolution video at scale is expensive, and the compute needed to produce it already exists in hundreds of millions of consumer GPUs sitting idle while people watch TV. The idea of shifting that work to the edge — literally the user's own desk — and letting RTX Tensor Cores and Radeon AI accelerators do what they were built for felt like an obvious inversion of the standard streaming model. Choosing Rust for the backend was a deliberate decision for memory safety and execution speed; the pipeline needed to feel invisible, and that meant no bloat, no leaks, and reliable teardown after every session. The hardest engineering problem was not the AI processing itself — NVEncC, VCEEncC, and their respective AI SDKs handle that brilliantly — but building a vendor detection and fallback layer robust enough to transparently swap between NVIDIA SDKs, AMD SDKs, and open-source alternatives like ArtCNN ESRgan, RIFE, and Libplacebo depending on the hardware and OS available. Tauri kept the desktop app footprint minimal while Docker and headless server builds opened the door for anyone who prefers to self-host.",
    buildFocus: "A Rust pipeline with hardware-accelerated AI processing via NVIDIA and AMD SDKs, graceful open-source fallbacks, and multiple distribution targets: Windows/Linux desktop app, headless server, and Docker image.",
    experienceGoal: "Make high-quality AI-enhanced video — upscaled, denoised, frame-generated, and HDR tone mapped — a capability any developer can unlock for their users, regardless of whether they run NVIDIA, AMD, or neither.",
    video: "/referee.webm",
    technologies: ["Rust", "Tauri", "NVEncC", "VCEEncC", "NVIDIA RTX AI SDK", "AMD AI SDK", "ArtCNN ESRgan", "RIFE", "Libplacebo", "Docker", "HLS"],
    githubUrl: "https://github.com/cmacrowther/referee",
    liveUrl: "https://referee.craw.ca/demo",
    categories: ["tool", "ai"],
    highlightCategories: ["all", "tool", "ai"],
    projectState: "ongoing",
    distribution: "open-source",
    releaseDate: "2026",
    accent: {
      badgeGradient: "linear-gradient(135deg, #f97316 0%, #ff6b35 45%, #fbbf24 100%)",
      spotlight: "radial-gradient(circle, rgba(249,115,22,0.32) 0%, rgba(255,107,53,0.22) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(249,115,22,0.26) 0%, rgba(255,107,53,0.18) 50%, rgba(251,191,36,0.2) 100%)",
    },
  },
  {
    id: 10,
    slug: "referee-docs",
    title: "REFEREE Docs",
    metadataDescription: "REFEREE Docs pairs a live before-and-after upscaling demo with integration guides for adding AI video enhancement to web streams.",
    logo: "/referee.svg",
    shortDescription: "The Next.js marketing and documentation site for REFEREE — featuring a live 480p-to-upscaled before/after demo and API integration docs for developers.",
    longDescription:
      "REFEREE Docs is the Next.js documentation and marketing site for the REFEREE desktop app. Visitors can experience the quality difference firsthand: an interactive demo streams a 480p source hosted by the site, and a comparison slider lets you drag between the raw footage and the REFEREE-upscaled output side by side. Developers who want to bring those same AI enhancements to their own platform will find full API integration documentation covering everything needed to make their web streams compatible with REFEREE's pipeline — giving their users access to AI-based upscaling, denoise, frame generation, and HDR tone mapping.",
    projectStory:
      "Building a compelling case for the REFEREE desktop app required more than a README. The pipeline's impact is visual — you have to see the difference to believe it — so the documentation site was designed around making that difference impossible to ignore. Hosting a real 480p stream and letting visitors drag a live slider between source and upscaled output puts the value proposition on the screen in seconds. The developer integration docs were built alongside the demo so that anyone convinced by what they saw could immediately find out how to bring that experience to their own platform and users.",
    buildFocus: "A Next.js site combining live before/after demo tooling with structured developer API documentation to market and explain REFEREE.",
    experienceGoal: "Let visitors see REFEREE's quality improvement in a single slider drag, then hand developers everything they need to integrate it into their own streams.",
    video: "/referee_demo.webm",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/cmacrowther/referee",
    liveUrl: "https://referee.craw.ca/",
    copyLinks: [{ term: "REFEREE desktop app", href: "/projects/referee" }],
    categories: ["web", "tool", "ai"],
    highlightCategories: ["web", "ai"],
    projectState: "ongoing",
    distribution: "open-source",
    releaseDate: "2026",
    accent: {
      badgeGradient: "linear-gradient(135deg, #f97316 0%, #ff6b35 45%, #fbbf24 100%)",
      spotlight: "radial-gradient(circle, rgba(249,115,22,0.28) 0%, rgba(255,107,53,0.2) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(249,115,22,0.22) 0%, rgba(255,107,53,0.16) 50%, rgba(251,191,36,0.18) 100%)",
    },
  },
  {
    id: 9,
    slug: "puckdrop",
    title: "PuckDrop",
    metadataDescription: "PuckDrop brings NHL live scores, stats, and predictions together in one fast, friendly home for hockey fans.",
    logo: "/puckdrop.svg",
    logoCardClassName: "h-10 md:h-11",
    shortDescription: "NHL livescores, statistics, and a game predictions leaderboard for hockey fans.",
    longDescription:
      "PuckDrop is a web app for following the NHL in real time. It brings together live scores and detailed statistics alongside a predictions game where users can call the outcome of upcoming matchups and earn their spot on a shared leaderboard.",
    projectStory:
      "PuckDrop started from a desire to have a single place that made NHL data feel approachable and fun rather than dense and utilitarian. Adding a predictions layer turned passive spectating into something competitive without requiring deep fantasy knowledge. The challenge became combining live data, user accounts, and leaderboard state into an experience that felt snappy enough to check during intermissions and compelling enough to revisit every game night.",
    buildFocus: "Real-time sports data paired with a lightweight predictions and leaderboard loop that keeps fans engaged across the season.",
    experienceGoal: "Give hockey fans a fast, enjoyable place to follow the league and compete with friends on game outcomes.",
    video: "/puckdrop.webm",
    technologies: ["Next.js", "TypeScript"],
    categories: ["web"],
    highlightCategories: ["web"],
    projectState: "ongoing",
    distribution: "closed-source",
    releaseDate: "2026",
    accent: {
      badgeGradient: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 45%, #1d4ed8 100%)",
      spotlight: "radial-gradient(circle, rgba(56,189,248,0.26) 0%, rgba(14,165,233,0.18) 45%, rgba(0,0,0,0) 74%)",
      surfaceGradient: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(14,165,233,0.14) 50%, rgba(29,78,216,0.18) 100%)",
    },
  },
  {
    id: 8,
    slug: "gobert-ui",
    title: "Gobert",
    metadataDescription: "Gobert is an open-source, polished web interface for OpenClaw that brings modern AI-chat ergonomics to local and remote instances.",
    logo: "/gobert-ui.png",
    shortDescription: "Open-source OpenClaw web interface built to give AI chat a more modern, polished feel.",
    longDescription:
      "Gobert is an open-source OpenClaw web interface built as a faster, more modern alternative to the clunky Clawdbot frontend that existed at the time. As OpenClaw started gaining popularity, I wanted to move quickly and ship an AI-first experience that felt closer to products like ChatGPT, Claude, and Gemini, with cleaner messaging UX, stronger visual hierarchy, and support for local or remote instances.",
    projectStory:
      "I built Gobert while OpenClaw was catching on quickly and it felt like there was a real window to beat other frontend efforts to market with something more polished. Clawdbot's web UI worked, but it felt clunky compared to the AI products people were rapidly getting used to elsewhere, so I pushed for a cleaner, more productized experience with better conversation ergonomics and more personality. I ultimately failed to beat everyone else to market, but the project still became a strong exploration of what an OpenClaw AI interface could feel like. I eventually open-sourced it so anyone interested could continue where I left off.",
    buildFocus: "Designing a modern AI chat experience for OpenClaw with cleaner UX, stronger presentation, and faster iteration.",
    experienceGoal: "Make OpenClaw feel like a polished, current AI product that people would actually enjoy using.",
    copyLinks: [{ term: "OpenClaw", href: "https://openclaw.ai/" }],
    video: "/gobertui-video.mp4",
    technologies: ["OpenClaw", "LLM", "Artificial Intelligence", "Next.js", "Tailwind", "React Three Fiber"],
    githubUrl: "https://github.com/cmacrowther/gobert",
    categories: ["tool", "web", "ai"],
    highlightCategories: ["all", "ai"],
    projectState: "paused",
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
export type ProjectFilter = (typeof projectCategories)[number]["id"];

export function isProjectHighlightedForFilter(project: Project, filter: ProjectFilter) {
  return project.highlightCategories?.includes(filter) ?? false;
}

export function getProjectsForFilter(filter: ProjectFilter) {
  if (filter === "all") {
    return projectsByReleaseDate;
  }

  return projectsByReleaseDate
    .filter((project) => project.categories.includes(filter))
    .sort((a, b) => Number(isProjectHighlightedForFilter(b, filter)) - Number(isProjectHighlightedForFilter(a, filter)));
}

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
