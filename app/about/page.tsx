import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata({
  title: "About Colin Crowther",
  description:
    "Learn about Colin Crowther, a full-stack developer who combines technical depth with a thoughtful eye for design.",
  path: "/about",
  imageAlt: "About Colin Crowther",
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
