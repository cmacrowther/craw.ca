import { Mail, Sparkles } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SupportContactForm } from "@/components/support-contact-form"
import { createPageMetadata } from "@/lib/site-metadata"

export const metadata = createPageMetadata({
  title: "Application Support",
  description:
    "Need help with one of Colin Crowther's applications? Share the details and get support by email.",
  path: "/support",
  imageAlt: "Application support from Colin Crowther",
})

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="bg-black">
        <section className="deferred-rendering bg-black px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="container mx-auto max-w-7xl">
            <header className="mb-14 max-w-3xl sm:mb-20">
              <span className="animate-fade-down mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 shadow-lg shadow-black/20 backdrop-blur-sm">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Application support
              </span>
              <h1 className="mb-5 pixel-mask-text text-4xl font-heading font-[650] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                Let&apos;s get things<br className="hidden sm:block" /> back on track.
              </h1>
              <p className="max-w-xl font-body text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Need help with one of my applications? Send along the details and I&apos;ll follow up by email.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-20 xl:gap-28">
              <aside className="max-w-md">
                <h2 className="max-w-sm text-2xl font-heading font-[650] leading-tight tracking-[-0.035em] text-white sm:text-3xl">
                  A few details go a long way.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Include the app you&apos;re using, what you expected to happen, and what actually happened. Screenshots or steps to reproduce are always helpful.
                </p>

                <div className="mt-9 space-y-6 border-t border-white/15 pt-7 text-sm text-white/70">
                  <a href="mailto:colin@craw.ca" className="group inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-white/70">
                    <Mail className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    colin@craw.ca
                  </a>
                </div>
              </aside>

              <section>
                <SupportContactForm />
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
