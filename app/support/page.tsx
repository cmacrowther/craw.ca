import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, LifeBuoy, Mail, ShieldCheck, Sparkles } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SupportContactForm } from "@/components/support-contact-form"
import { SupportParticleBackground } from "@/components/support-particle-background"

export const metadata: Metadata = {
  title: "Support | Colin Crowther",
  description: "Get support for Colin Crowther's applications.",
  alternates: { canonical: "/support" },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="deferred-rendering relative overflow-hidden bg-[#111111] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <SupportParticleBackground />
          <div aria-hidden="true" className="pixel-overlay absolute inset-0 z-[1] opacity-25" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <Link href="/" className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors hover:text-white sm:mb-16">
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
              Back to portfolio
            </Link>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20 xl:gap-28">
              <aside className="max-w-md py-2 lg:py-8">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 shadow-lg shadow-black/20 backdrop-blur-sm">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Application support
                </span>
                <h1 className="pixel-mask-text text-4xl font-heading font-[650] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Let&apos;s get things<br /> back on track.
                </h1>
                <p className="mt-5 font-body text-lg leading-relaxed text-muted-foreground">
                  Need help with one of my applications? Send along the details and I&apos;ll follow up by email.
                </p>
                <h2 className="max-w-sm text-2xl mt-10 font-heading font-[650] leading-tight tracking-[-0.035em] text-white sm:text-3xl">
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

              <section className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-0">
                <div className="mt-8">
                  <SupportContactForm />
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
