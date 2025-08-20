"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GLBViewer } from "./glb-viewer"
import { ParticleBackground } from "./particle-background"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
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
              <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
            </div>
          </div>
          
          <div data-splitting>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              About Me
            </h2>
          </div>
          <p data-animate className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-left">
            <div data-animate className="prose prose-lg dark:prose-invert max-w-none">
              <p className="font-body text-base leading-relaxed text-foreground">
                I am a full-stack developer with a creative edge, combining technical expertise with an eye for design. I believe the best software is not only functional but also intuitive, accessible, and guided by core UX principles.
              </p>
              <br />
              <p className="font-body text-base leading-relaxed text-foreground">
                During the day, I work as a Java developer on enterprise-level systems. In the evenings, I focus on bleeding-edge technology, exploring modern frameworks, experimenting with ideas, and bringing new concepts to life.
              </p>
              <br />
              <p className="font-body text-base leading-relaxed text-foreground">
                I’ve had the chance to work with a wide mix of languages and technologies, and I’m always eager to learn more. If you’d like a copy of my resume, shoot me a message!
              </p>
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
              <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
