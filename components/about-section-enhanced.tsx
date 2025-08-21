"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParticleBackground } from "./particle-background"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation-optimized"
import { LazyLoadWrapper } from "./lazy-load-wrapper"
import { lazyComponent } from "./lazy-load-wrapper"

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/90 dark:md:bg-muted/30 dark:bg-muted/60 relative overflow-hidden">
      {/* Particle background spanning the entire section */}
      <ParticleBackground />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <span 
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full mb-4 text-white relative overflow-hidden animate-fade-down"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
              backgroundSize: '300% 300%',
              animation: 'gradient-xy 4s ease-in-out infinite',
            }}
          >
            <div className="w-4 h-4 mr-2 flex items-center justify-center text-sm animate-wave">👋</div>
            About the Human
          </span>
          
          {/* GLB viewer for mobile - positioned above header */}
          <div data-animate className="md:hidden flex justify-center mb-8">
            <div className="w-64 h-48 animate-scale-in" style={{ overflow: 'visible' }}>
              <LazyLoadWrapper minHeight="192px">
                <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
              </LazyLoadWrapper>
            </div>
          </div>
          
          <h2 data-animate className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            About Me
          </h2>
          <p data-animate className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Creating digital experiences that make a difference
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-left">
            <div data-animate className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              {/* Enhanced paragraph 1 with visual accent */}
              <div className="relative">
                <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-60"></div>
                <div className="pl-8">
                  <p className="font-body text-lg leading-relaxed text-foreground">
                    I am a <span className="relative inline-block">
                      <span className="relative z-10 px-2 py-1 bg-gradient-to-r from-blue-500/15 to-purple-600/15 rounded-md font-medium">
                        full-stack developer
                      </span>
                    </span> with a creative edge, combining technical expertise with an eye for design. I believe the best software is not only functional but also 
                    <span className="font-medium text-blue-600 dark:text-blue-400"> intuitive</span>, 
                    <span className="font-medium text-purple-600 dark:text-purple-400"> accessible</span>, and guided by core UX principles.
                  </p>
                </div>
              </div>

              {/* Enhanced paragraph 2 with different styling */}
              <div className="relative">
                <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-600 rounded-full opacity-60"></div>
                <div className="pl-8">
                  <p className="font-body text-lg leading-relaxed text-foreground">
                    During the day, I work as a Java developer on 
                    <span className="relative inline-block mx-1">
                      <span className="relative z-10 px-2 py-1 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-md font-medium">
                        enterprise-level systems
                      </span>
                    </span>. 
                    In the evenings, I focus on bleeding-edge technology, exploring modern frameworks, experimenting with ideas, and bringing new concepts to life.
                  </p>
                </div>
              </div>

              {/* Enhanced paragraph 3 with call-to-action styling */}
              <div className="relative">
                <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-rose-600 rounded-full opacity-60"></div>
                <div className="pl-8">
                  <div className="relative bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-border/20 hover:border-border/40 transition-all duration-300">
                    <p className="font-body text-lg leading-relaxed text-foreground">
                      I've had the chance to work with a wide mix of languages and technologies, and I'm always eager to learn more. If you'd like a copy of my resume, 
                      <span className="relative inline-block ml-1">
                        <span className="relative z-10 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-md font-semibold text-emerald-600 dark:text-emerald-400 hover:from-emerald-500/30 hover:to-blue-500/30 transition-all duration-300 cursor-pointer">
                          shoot me a message!
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div data-animate>
              <div data-splitting>
                <p className="text-xl font-heading font-semibold mb-4">
                  Technologies I have experience with:
                </p>
              </div>
              <div ref={skillsRef} className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} data-stagger variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div data-animate className="hidden md:flex justify-center animate-slide-right">
            <div className="w-full h-96" style={{ overflow: 'visible' }}>
              <LazyLoadWrapper minHeight="384px">
                <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
              </LazyLoadWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
