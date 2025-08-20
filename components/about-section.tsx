"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BaffleText } from "@/components/ui/baffle-text"
import { GLBViewer } from "./glb-viewer"
import { ParticleBackground } from "./particle-background"

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
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      {/* Particle background spanning the entire section */}
      <ParticleBackground />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span 
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full mb-4 text-white relative overflow-hidden"
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
          <div className="md:hidden flex justify-center mb-8">
            <div className="w-64 h-48" style={{ overflow: 'visible' }}>
              <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
            </div>
          </div>
          
          <BaffleText 
            text="About Me"
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4"
            speed={100}
            revealDelay={600}
            characters="█▓▒░<.?/#!@&*"
            variant="title"
          />
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
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

            <div>
              <BaffleText 
                text="Technologies I have experience with:"
                className="text-xl font-heading font-semibold mb-4"
                speed={35}
                revealDelay={2400}
                characters="▒▓"
              />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-full h-96" style={{ overflow: 'visible' }}>
              <GLBViewer modelUrl="/model.glb" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
