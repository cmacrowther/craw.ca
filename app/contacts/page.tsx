import type { Metadata } from "next"

import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "Contact | Colin Crowther",
  description: "Get in touch with Colin Crowther to discuss a project, collaboration, or idea.",
  alternates: {
    canonical: "/contacts",
  },
}

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
