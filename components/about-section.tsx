"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized"
import { LazyLoadWrapper } from "./lazy-load-wrapper"
import { lazyComponent } from "./lazy-load-wrapper"

// Lazy-load the 3D particle background — only mounts on the client and is
// dynamically imported so it does not ship in the main bundle.
const ParticleBackground = dynamic(
  () => import("./particle-background").then((m) => ({ default: m.ParticleBackground })),
  { ssr: false, loading: () => null }
)

// Lazy load 3D viewer to reduce initial bundle
const GLBViewer = lazyComponent(
  () => import('./glb-viewer').then(m => ({ default: m.GLBViewer })),
  <div className="w-full h-80 bg-muted animate-pulse rounded-xl flex items-center justify-center">
    <span className="text-muted-foreground">Loading 3D model...</span>
  </div>
)

const skills = [
  "Java",
  "Struts 2",
  "Spring Boot",
  "PHP",
  "Drupal",
  "Laravel",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Node.js",
  "Python",
  "Flask",
  "C#",
  ".NET/ASP.NET",
  ".NET Core",
  "PostgreSQL",
  "MongoDB",
  "Oracle DB",
  "PL/SQL",
  "SQL Server",
  "AWS",
  "Azure",
  "DigitalOcean",
  "Docker",
  "Kubernetes",
  "Git",
]

export function AboutSection() {
  // Animation refs
  const headerRef = useScrollAnimation({ delay: 100, stagger: 40 });
  const contentRef = useScrollAnimation({ delay: 200, stagger: 60 });
  const skillsRef = useStaggeredAnimation({ 
    delay: 300, 
    stagger: 30, 
    childSelector: '[data-stagger]' 
  });

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111111] relative overflow-hidden">
      {/* Particle background spanning the entire section */}
      <ParticleBackground />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <span 
            className="inline-flex pixel-mask-text-small items-center px-4 py-2 text-sm font-medium rounded-full mb-4 text-white relative overflow-hidden animate-fade-down"
            style={{
              backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
              backgroundSize: '300% 300%',
              animation: 'gradient-xy 4s ease-in-out infinite',
            }}
          >
            <div className="w-4 h-4 mr-2 flex items-center justify-center text-sm animate-wave">👋</div>
            About the Human
          </span>
          
          {/* GLB viewer for mobile - positioned above header */}
          <div data-animate className="md:hidden pixel-mask flex justify-center mb-8">
            <div className="w-64 h-48" style={{ overflow: 'visible' }}>
              <LazyLoadWrapper minHeight="192px">
                <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
              </LazyLoadWrapper>
            </div>
          </div>
          
          <h2 data-animate className="text-3xl pixel-mask-text sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            About Me
          </h2>
          <p data-animate className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Creating digital experiences that make a difference
          </p>
        </div>

        <div ref={contentRef} className="space-y-6 md:space-y-12">
          {/* Main content grid - paragraphs and GLB model */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                {/* Enhanced paragraph 1 with visual accent */}
                <div data-animate className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-60 hidden md:block"></div>
                  <div className="pl-0 md:pl-8">
                    <p className="font-body text-xl leading-relaxed text-foreground">
                      I'm a <span className="relative inline-block">
                        <span className="relative z-10 px-2 py-1 bg-gradient-to-r from-blue-500/15 to-purple-600/15 rounded-md font-medium">
                          full-stack developer
                        </span>
                      </span> with a creative edge, combining technical expertise with an eye for design. I believe the best software is not only functional but also 
                      <span className="font-medium text-blue-600 dark:text-blue-400"> intuitive</span>, 
                      <span className="font-medium text-purple-600 dark:text-purple-400"> accessible</span>, and guided by <span className="font-medium text-red-600 dark:text-red-400">core UX principles</span>.
                    </p>
                  </div>
                </div>

                {/* Enhanced paragraph 2 with different styling */}
                <div data-animate className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-600 rounded-full opacity-60 hidden md:block"></div>
                  <div className="pl-0 md:pl-8">
                    <p className="font-body text-xl leading-relaxed text-foreground">
                      By day, I work with Java developing enterprise-level systems.
                      
                      By night, I set my focus on the
                      <span className="relative inline-block mx-1">
                        <span className="relative z-10 px-2 py-1 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-md font-medium">
                          bleeding edge
                        </span>
                      </span>  
                      , exploring modern frameworks, and bringing new concepts to life.
                    </p>
                  </div>
                </div>

                {/* Enhanced paragraph 3 with call-to-action styling */}
                <div data-animate className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-rose-600 rounded-full opacity-60 hidden md:block"></div>
                  <div className="pl-0 md:pl-8">
                    <p className="font-body text-xl leading-relaxed text-foreground">
                      I've had the chance to work with a wide mix of languages and technologies, and I'm always eager to learn more. If you'd like a copy of my resume, 
                      <Link href="/#contact" className="site-link-strong relative inline font-semibold transition-colors duration-300 group ml-1">
                        <span className="relative z-10">shoot me a message!</span>
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-sky-400/20 animate-pulse"></span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div data-animate className="lg:col-span-3 pixel-mask hidden md:flex justify-center items-center">
              <div className="w-full h-[450px] lg:h-[500px] xl:h-[550px] flex items-center justify-center" style={{ overflow: 'visible' }}>
                <LazyLoadWrapper minHeight="450px">
                  <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
                </LazyLoadWrapper>
              </div>
            </div>
          </div>

          {/* Technology list section - separate from the main grid */}
          <div className="space-y-8">
            <div data-animate className="w-full md:w-1/2">
              <p data-animate className="text-xl pixel-mask-text-small font-heading font-semibold mb-4 mt-12 md:mt-6">
                Technologies I have experience with:
              </p>
              <div ref={skillsRef} className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    data-stagger 
                    variant="outline" 
                    className="text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="pixel-overlay absolute inset-0 pointer-events-none" />
      </div>
    </section>
  )
}
