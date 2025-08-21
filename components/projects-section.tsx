"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, X } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized";
import { OptimizedImage } from "./optimized-image";
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
  category: "web" | "music" | "tool" | "other";
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
    video: "/tuneiq-video.mp4",
    technologies: ["Next.js", "TypeScript", "Socket.IO"],
    githubUrl: "https://gitlab.com/cmacrowther/tuneiq",
    liveUrl: "https://tuneiq.craw.ca/",
    category: "web",
    year: "2024",
  },
  {
    id: 2,
    title: "SongwriterJS",
    description: "Gatsby template based on Spotify's Songwriter pages",
    longDescription:
      "SongwriterJS is a Gatsby + Netlify CMS template for artists to publish a polished songwriter page. Modeled after Spotify's Songwriter Pages, it showcases credits, collaborators, and track previews via Spotify links or MP3s.",
    image: "/songwriter.png",
    technologies: ["Gatsby v4", "React", "Bulma", "TypeScript"],
    githubUrl: "https://gitlab.com/cmacrowther/songwriter",
    liveUrl: "https://songwriter.cmacrowther.com/",
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
    video: "/heather-video.mp4",
    technologies: ["Gatsby", "React"],
    liveUrl: "https://heatherband.ca/",
    category: "music",
    year: "2022",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "music", label: "Music" },
  { id: "tool", label: "Tools" },
  { id: "other", label: "Other" },
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Handle body scroll when modal is open (simplified for iOS Safari compatibility)
  useEffect(() => {
    if (selectedProject) {
      // Simple overflow hidden approach - more stable on iOS
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Cleanup function
      return () => {
        document.body.style.overflow = originalOverflow;
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
            A collection of projects that showcase my passion for creating meaningful digital experiences
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
                  className={`${layout} group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-[400px]`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Background Image/Video */}
                  <div className="absolute inset-0">
                    {project.video ? (
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
                    ) : (
                      <OptimizedImage
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/30 transition-all duration-500" />

                  {/* Content Overlay */}
                  <div className="relative h-full p-6">
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
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedProject && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300 mobile-full-height">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-300">
              <div className="relative">
                {/* Enhanced Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white hover:text-white transition-all duration-200"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Hero Image/Video Section */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                  {selectedProject.liveUrl && !selectedProject.liveUrl.includes('#') ? (
                    <div className="relative w-full h-full overflow-hidden">
                      <iframe
                        src={selectedProject.liveUrl}
                        className="w-full h-full border-0"
                        style={{
                          width: '1920px',
                          height: '1080px',
                          transform: 'scale(0.5)',
                          transformOrigin: 'top left'
                        }}
                        title={`Preview of ${selectedProject.title}`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                      {/* Overlay for interaction (optional - remove if you want full interaction) */}
                      <div className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                           onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                           title="Click to open in new tab"
                      />
                      {/* Desktop-like chrome effect */}
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
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
                      className="w-full h-full object-cover"
                      quality="high"
                    />
                  ) : (
                    <OptimizedImage
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      quality={85}
                      priority
                    />
                  )}
                  
                  {/* Gradient overlay for better text contrast (only for non-iframe content) */}
                  {(!selectedProject.liveUrl || selectedProject.liveUrl.includes('#')) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  )}
                  
                  {/* Floating metadata on image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      <span className="text-white/90 text-xs font-medium">{selectedProject.year}</span>
                    </div>
                    <Badge variant="outline" className="bg-white/20 backdrop-blur-md border-white/30 text-white/90 text-xs">
                      {selectedProject.category}
                    </Badge>
                  </div>
                  
                  {/* Live Preview badge - right aligned */}
                  {selectedProject.liveUrl && !selectedProject.liveUrl.includes('#') && (
                    <div className="absolute bottom-4 right-4">
                      <div className="px-2 py-1 bg-blue-500/80 backdrop-blur-md rounded-full border border-blue-400/50">
                        <span className="text-white text-xs font-medium">Live Preview</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(85vh-240px)]">
                  {/* Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                      {selectedProject.title}
                    </h2>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
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
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
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
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700/50 font-medium text-sm hover:shadow-md hover:scale-105 transition-all duration-200 backdrop-blur-sm"
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
                        className="flex-1 h-11 text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 dark:from-gray-100 dark:to-gray-200 dark:hover:from-white dark:hover:to-gray-100 dark:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105" 
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
                        className="flex-1 h-11 text-base font-semibold border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105" 
                        asChild
                      >
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-6 right-16 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-6 left-8 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
