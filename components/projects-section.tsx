"use client";

import { useState, useEffect } from "react";
// Utility to detect mobile devices
function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, X } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized";
import { OptimizedImage } from "./optimized-image";
import { LazyLoadWrapper } from "./lazy-load-wrapper";
import { OptimizedVideo } from "./optimized-video";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image?: string;
  video?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: "web" | "music" | "tool" | "games" | "other";
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "TuneIQ",
    description: "Real-time multiplayer music quiz with live leaderboard",
    longDescription:
      "TuneIQ is a real-time, multiplayer music quiz built with Next.js + TypeScript + Socket.IO. Players join rooms, answer music trivia together, and watch the live leaderboard and chat update in sync.",
    image: "/tuneiq.png",
    video: "/tuneiq-video.webm",
    technologies: ["Next.js", "TypeScript", "Socket.IO"],
    githubUrl: "https://gitlab.com/cmacrowther/tuneiq",
    liveUrl: "https://tuneiq.craw.ca/",
    category: "games",
    year: "2024",
  },
  {
    id: 2,
    title: "SongwriterJS",
    description: "Gatsby template based on Spotify's Songwriter pages",
    longDescription:
      "SongwriterJS is a Gatsby + Netlify CMS template for artists to publish a polished songwriter page. Modeled after Spotify's Songwriter Pages, it showcases credits, collaborators, and track previews via Spotify links or MP3s.",
    image: "/songwriter.png",
    video: "/songwriter-video.webm",
    technologies: ["Gatsby v4", "React", "Bulma", "TypeScript"],
    githubUrl: "https://gitlab.com/cmacrowther/songwriter",
    liveUrl: "https://music.craw.ca",
    category: "music",
    year: "2023",
  },
  {
    id: 3,
    title: "Heather Band Website",
    description: "Static website for indie band with modern design",
    longDescription:
      "A beautifully crafted static website created for my band, Heather. Features a clean, modern design that perfectly captures the band's aesthetic.",
    image: "/songwriter.png",
    video: "/heather-video.webm",
    technologies: ["Gatsby", "React"],
    liveUrl: "https://heatherband.ca/",
    category: "music",
    year: "2022",
  },
  {
    id: 4,
    title: "Basket Case",
    description: "VR paper toss game inspired by the classic mobile game",
    longDescription:
      "Basket Case is a fully immersive virtual reality game built in Unity, inspired by the classic 'Paper Toss' mobile game. Players use hand tracking and motion controllers to crumple and throw virtual paper balls into trash baskets, with realistic physics and VR interactions that make every toss feel satisfying.",
    video: "/basket-case-video.webm",
    technologies: ["Unity", "C#", "Virtual Reality", "Hand Tracking"],
    githubUrl: "https://gitlab.com/TimeShifts/papertossvr",
    category: "games",
    year: "2024",
  },
  {
    id: 5,
    title: "Forestry Mapper",
    description: "Interactive mapping web app built with drone photography tiles",
    longDescription:
      "Forestry Mapper is an interactive web mapping application that showcases custom tile generation from drone photography. Built as a learning project to explore open-source mapping technologies, it features custom map tiles created from aerial drone photos and demonstrates modern web mapping capabilities with smooth navigation and responsive design.",
    video: "/forestry-mapper-video.webm",
    technologies: ["Leaflet", "TypeScript", "Vite", "Node.js"],
    githubUrl: "https://gitlab.com/cmacrowther/macphail-woods-dashboard",
    liveUrl: "https://jelly-racer-wfsn.vercel.app/",
    category: "web",
    year: "2024",
  },
  {
    id: 6,
    title: "Jelly Jammers",
    description: "Multiplayer bumper-car battle royale with mobile tilt controls",
    longDescription:
      "Jelly Jammers is a multiplayer web game inspired by Jackbox Games' controller system. Players connect their mobile phones as controllers and use tilt controls to navigate jelly cars in a chaotic bumper-car battle royale. Built with real-time multiplayer using Socket.IO and featuring responsive mobile controls that create an engaging party game experience.",
    video: "/jelly-jammers-video.webm",
    technologies: ["Socket.IO", "Express", "Three.js", "Mobile Controls"],
    githubUrl: "https://gitlab.com/cmacrowther/jelly-racer",
    liveUrl: "https://jelly.craw.ca",
    category: "games",
    year: "2024",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "games", label: "Games" },
  { id: "music", label: "Music" },
  { id: "tool", label: "Tools" },
  { id: "other", label: "Other" },
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Safe project selection with error handling
  const handleProjectSelect = (project: Project) => {
    try {
      setSelectedProject(project);
    } catch (error) {
      console.error('Error opening project modal:', error);
    }
  };
  
  // Safe modal close
  const handleModalClose = () => {
    try {
      setSelectedProject(null);
    } catch (error) {
      console.error('Error closing project modal:', error);
      // Force close as fallback
      setSelectedProject(null);
    }
  };
  
  // Handle body scroll when modal is open (simplified for iOS Safari compatibility)
  useEffect(() => {
    if (selectedProject) {
      // Simple overflow hidden approach - more stable on iOS
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      
      // Force viewport height recalculation on iOS Safari
      if (typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const setVH = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        // Set immediately
        setTimeout(setVH, 0);
        
        // Set after a small delay to catch any viewport changes
        setTimeout(setVH, 100);
        setTimeout(setVH, 300);
      }
      
      // Cleanup function
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.classList.remove('modal-open');
      };
    }
  }, [selectedProject]);
  
  // Animation refs
  const headerRef = useScrollAnimation({ delay: 100, stagger: 30 });
  const filtersRef = useScrollAnimation({ delay: 200, stagger: 50 });
  const gridRef = useStaggeredAnimation({ 
    delay: 300, 
    stagger: 150, 
    childSelector: '[data-stagger]' 
  });

  const filteredProjects =
    selectedCategory === "all" 
      ? projects 
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <LazyLoadWrapper minHeight="400px">
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div ref={headerRef} className="text-center mb-16">
          <span 
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full mb-4 text-white relative overflow-hidden animate-fade-down"
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 25%, #8b5cf6 50%, #06b6d4 75%, #10b981 100%)',
              backgroundSize: '300% 300%',
              animation: 'gradient-xy 4s ease-in-out infinite',
            }}
          >
            <svg className="w-4 h-4 mr-2 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Portfolio Showcase
          </span>

          <h2 data-animate className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Featured Work
          </h2>
          <p data-animate className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Explore my latest projects. Click on any project to learn more about it.
          </p>
        </div>

        <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category, index) => (
            <Button
              key={category.id}
              data-animate
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full px-6 py-2 transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div ref={gridRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              // All cards now use the same layout as the first card
              const layout = "col-span-1";
              const isLarge = false; // All cards are now uniform size

              return (
                <div
                  key={project.id}
                  data-stagger
                  className={`${layout} group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] h-[400px]`}
                  style={{
                    height: 400,
                    willChange: 'transform',
                    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)', // lighter shadow for all
                  }}
                  onClick={() => handleProjectSelect(project)}
                >
                  {/* Background Image/Video */}
                  <div className="absolute inset-0 h-full w-full" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                    {project.video ? (
                      <>
                        <OptimizedVideo
                          src={project.video}
                          poster={project.image}
                          alt={project.title}
                          autoPlay
                          loop
                          muted
                          preload="metadata"
                          className="w-full h-full object-cover"
                          quality="medium"
                        />
                        {/* Ensure CRT overlay inherits border-radius for iOS and all browsers */}
                        <div className="crt-effect h-full w-full rounded-3xl pointer-events-none" style={{ borderRadius: 'inherit' }} />
                      </>
                    ) : (
                      <OptimizedImage
                        src={(project.image && project.image.replace(/\.(png|jpg)$/i, '.webp')) || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={project.id === 1} // Preload first project image as above-the-fold
                      />
                    )}
                    {/* Gradient overlay for readability */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] rounded-b-3xl z-10"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.34) 62%, rgba(0,0,0,0.00) 100%)",
                        willChange: 'opacity',
                      }}
                    />
                  </div>
                  <div className="relative h-full p-6 z-20">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20">
                        {project.year}
                      </div>
                      <Badge variant="outline" className="text-xs bg-white/20 backdrop-blur-sm border-white/30 text-white/90">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Bottom content positioned absolutely to ensure consistent alignment */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="mb-4">
                        <h3 
                          className="font-bold text-white transition-colors text-xl md:text-2xl"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.2'
                          }}
                        >
                          {project.title}
                        </h3>

                        <p 
                          className="text-white/80 leading-relaxed text-sm"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.25rem'
                          }}
                        >
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs bg-white/20 backdrop-blur-sm text-white/90 border border-white/20">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-white/10 backdrop-blur-sm border-white/30 text-white/80">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full opacity-80" />
                        <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-60" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full opacity-50" />
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30"
                      style={{ boxShadow: 'none' }} // Remove shadow on hover icon for mobile perf
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 z-50 animate-in fade-in duration-300 mobile-full-height"
            style={{
              minHeight: '-webkit-fill-available',
              height: 'calc(var(--vh, 1vh) * 100)'
            }}
            onClick={(e) => {
              // Only close if clicking the backdrop, not the modal content
              if (e.target === e.currentTarget) {
                handleModalClose();
              }
            }}
          >
            <div className="bg-white dark:bg-neutral-900 rounded-3xl md:rounded-3xl rounded-none max-w-4xl w-full h-full md:h-auto md:max-h-[85vh] overflow-hidden shadow-2xl md:border md:border-gray-200 md:dark:border-gray-700 animate-in zoom-in-95 duration-300 modal-content">
              <div className="relative">
                {/* Enhanced Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white hover:text-white transition-all duration-200"
                  onClick={handleModalClose}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Hero Image/Video Section */}
                <div className="relative aspect-video bg-neutral-900 dark:bg-black overflow-hidden border-b border-neutral-200 dark:border-neutral-700">
                  {selectedProject.liveUrl && !selectedProject.liveUrl.includes('#') && !isMobileDevice() ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <iframe
                        src={selectedProject.liveUrl}
                        className="w-full h-full border-0"
                        style={{
                          width: '150%',
                          height: '150%',
                          transform: 'scale(0.67)',
                          transformOrigin: 'top left',
                          background: '#111' // fallback for iframe
                        }}
                        title={`Preview of ${selectedProject.title}`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                      <div className="absolute inset-0 bg-transparent hover:bg-black/10 transition-colors duration-200 cursor-pointer"
                           onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                           title="Click to open in new tab"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
                        <div className="w-2.5 h-2.5 bg-neutral-700 dark:bg-neutral-800 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-neutral-600 dark:bg-neutral-700 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-neutral-500 dark:bg-neutral-600 rounded-full"></div>
                      </div>
                    </div>
                  ) : selectedProject.video ? (
                    <OptimizedVideo
                      src={selectedProject.video}
                      poster={selectedProject.image}
                      alt={selectedProject.title}
                      autoPlay
                      loop
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover bg-black"
                      quality="high"
                    />
                  ) : (
                    <OptimizedImage
                      src={(selectedProject.image && selectedProject.image.replace(/\.(png|jpg)$/i, '.webp')) || "/placeholder.svg"}
                      alt={selectedProject.title}
                      fill
                      className="object-cover bg-black"
                      quality={85}
                      priority
                    />
                  )}
                  {/* Monochrome overlay for better text contrast (only for non-iframe content) */}
                  {((!selectedProject.liveUrl || selectedProject.liveUrl.includes('#')) || isMobileDevice()) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  )}
                  {/* Floating metadata on image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                      <span className="text-white/90 text-xs font-medium">{selectedProject.year}</span>
                    </div>
                    <Badge variant="outline" className="bg-black/30 backdrop-blur-md border-white/10 text-white/90 text-xs">
                      {selectedProject.category}
                    </Badge>
                  </div>
                  {/* Live Preview badge - right aligned */}
                  {selectedProject.liveUrl && !selectedProject.liveUrl.includes('#') && !isMobileDevice() && (
                    <div className="absolute bottom-4 right-4">
                      <div className="px-2 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10">
                        <span className="text-white text-xs font-medium">Live Preview</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 lg:p-8 overflow-y-auto h-auto md:max-h-[calc(85vh-240px)] max-h-[calc(100vh-240px)] modal-content-scroll">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                      {selectedProject.title}
                    </h2>
                    <div className="w-16 h-0.5 bg-neutral-700 dark:bg-white/10 rounded-full"></div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Technologies Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-neutral-900 dark:bg-neutral-800 rounded-lg flex items-center justify-center border border-white/10">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <div
                          key={tech}
                          className="px-3 py-1 bg-black/20 dark:bg-black/40 text-gray-900 dark:text-gray-100 rounded-md border border-white/10 font-medium text-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm mr-0.5 mb-1"
                          style={{ 
                            animationDelay: `${index * 75}ms`,
                            animation: 'fadeInUp 0.5s ease-out forwards'
                          }}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedProject.githubUrl && (
                      <Button 
                        className="flex-1 h-11 text-base font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white dark:text-neutral-900 text-white transition-all duration-200 shadow-lg hover:shadow-xl border border-neutral-700 dark:border-neutral-200"
                        asChild
                      >
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          View Source Code
                        </a>
                      </Button>
                    )}
                    {selectedProject.liveUrl && (
                      <Button 
                        variant="outline" 
                        className="flex-1 h-11 text-base font-semibold border-0 relative overflow-hidden text-white dark:text-white group transition-all duration-200 shadow-lg hover:shadow-xl p-[2px]"
                        style={{ background: 'transparent' }}
                        asChild
                      >
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <span className="absolute inset-0 w-full h-full bg-[linear-gradient(270deg,_#ff80b5_0%,_#ffb347_50%,_#ff80b5_100%)] bg-[length:200%_200%] animate-gradient-move opacity-90 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative z-10 flex items-center justify-center font-semibold px-6 py-2 rounded-2xl">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  {/* section closed above */}
    </LazyLoadWrapper>
  );
// To further improve performance, ensure Tailwind or your CSS framework is purging unused styles in production.
// Consider using SVG sprites for icons if you have many SVGs. Lucide icons are already optimized.
}
