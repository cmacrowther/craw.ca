import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "TuneIQ",
      description:
        "TuneIQ is a real-time, multiplayer music quiz built with Next.js + TypeScript + Socket.IO. Players join rooms, answer music trivia together, and watch the live leaderboard and chat update in sync.",
      image: "/tuneiq-video.gif",
      video: "/tuneiq-video.mp4",
      technologies: ["Next.js", "TypeScript", "Socket.IO"],
      githubUrl: "https://gitlab.com/cmacrowther/tuneiq",
      liveUrl: "https://tuneiq.craw.ca/",
      featured: true,
  },
  {
    title: "SongwriterJS",
      description:
        "SongwriterJS is a Gatsby + Netlify CMS template for artists to publish a polished “songwriter page.” Modeled after Spotify’s Songwriter Pages, it showcases credits, collaborators, and track previews via Spotify links or MP3s, with one-click deploy to Netlify or Vercel.",
      image: "/songwriter.png",
      technologies: ["Gatsby v4", "React", "Bulma", "TypeScript"],
      githubUrl: "https://gitlab.com/cmacrowther/songwriter",
      liveUrl: "https://songwriter.cmacrowther.com/",
      featured: true,
  },
  {
    title: "Heather",
      description:
        "Website created for my band, Heather. Simple static website created and designed by me.",
      image: "/heather-video.gif",
      video: "/heather-video.mp4",
      technologies: ["Gatsby", "React"],
      liveUrl: "https://heatherband.ca/",
      featured: false,
  },
]

export function ProjectsSection() {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
            {/* Animated gradient pill with margin below */}
            <span
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full mb-4 animate-gradient-x"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #ec4899, #a78bfa)',
                backgroundSize: '200% 200%',
                animation: 'gradient-x 6s ease-in-out infinite',
              }}
            >
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Portfolio Showcase
            </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            A showcase of my recent work, featuring full-stack applications and solutions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50"
            >
              <div className="aspect-video overflow-hidden">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl">{project.title}</CardTitle>
                <CardDescription className="font-body text-base leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Other Projects (conditionally rendered) */}
        {otherProjects.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-4">Other Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <Card key={index} className="group hover:shadow-md transition-all duration-300 border-border/50">
                  <div className="aspect-video overflow-hidden">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-heading text-lg">{project.title}</CardTitle>
                    <CardDescription className="font-body text-sm leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
