"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpRight, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useScrollAnimation } from "@/hooks/use-scroll-animation-optimized"

import { PaperAirplaneBackground } from "./paper-airplane-background"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const headerRef = useScrollAnimation({ delay: 100, stagger: 40 })
  const contentRef = useScrollAnimation({ delay: 200, stagger: 100 })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setShowSuccess(false), 3500)
      } else {
        setError(data.error || "Something went wrong. Please try again later.")
      }
    } catch {
      setError("Network error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <section className="contact-section deferred-rendering relative min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:min-h-0 lg:px-8 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_16%_28%,rgba(255,255,255,0.09),transparent_25rem),radial-gradient(circle_at_86%_74%,rgba(148,163,184,0.11),transparent_29rem)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-65"
        style={{ transform: "translateZ(0)", willChange: "auto" }}
      >
        <PaperAirplaneBackground />
      </div>
      <div aria-hidden="true" className="pixel-overlay absolute inset-0 z-[1] opacity-35" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-14 max-w-4xl sm:mb-20">
          <span className="animate-fade-down mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 shadow-lg shadow-black/20 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Let&apos;s work together
          </span>
          <h2 data-animate className="mb-5 pixel-mask-text text-4xl font-heading font-[650] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
            Have an idea worth<br className="hidden sm:block" /> building?
          </h2>
          <p data-animate className="max-w-2xl font-body text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Bring the rough sketch, the tricky problem, or the half-formed thought. I&apos;d love to hear where you want to take it.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <aside data-animate className="max-w-xl py-3 lg:py-8">
            <div className="border-l border-white/30 pl-5 sm:pl-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Direct line</p>
              <h3 className="mb-4 max-w-sm text-3xl font-heading font-[650] tracking-[-0.04em] text-white sm:text-4xl">
                Start with a simple hello.
              </h3>
              <p className="mb-9 max-w-md text-base leading-relaxed text-muted-foreground">
                Whether it&apos;s a new product, a collaboration, or a question about something I&apos;ve made, I&apos;m always glad to connect.
              </p>

              <a
                href="mailto:cmacrowther@gmail.com"
                className="group mb-7 inline-flex w-fit items-center gap-3 border-b border-white/25 pb-3 font-heading text-xl font-[600] tracking-[-0.025em] text-white transition-colors hover:border-white sm:text-2xl"
              >
                cmacrowther@gmail.com
                <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href="tel:+19023930928"
                  className="group border-l border-white/15 pl-4 transition-colors hover:border-white/65"
                >
                  <Phone className="mb-4 size-4 text-white/65" />
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.13em] text-white/45">Phone</p>
                  <p className="text-sm text-white/90">+1 (902) 393-0928</p>
                </a>
                <div className="border-l border-white/15 pl-4">
                  <MapPin className="mb-4 size-4 text-white/65" />
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.13em] text-white/45">Based in</p>
                  <p className="text-sm text-white/90">Charlottetown, PEI</p>
                </div>
              </div>

              <a
                href="mailto:cmacrowther@gmail.com"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-white"
              >
                Prefer your mail app instead?
                <Mail className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </aside>

          <div data-animate className="min-h-[570px] max-w-2xl lg:justify-self-end">
            {showSuccess ? (
              <div className="flex min-h-[570px] flex-col items-center justify-center py-16 text-center animate-in fade-in-0 zoom-in-95 duration-500">
                <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-white text-black shadow-xl shadow-white/10">
                  <svg className="size-8" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                  </svg>
                </div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Message delivered</p>
                <h3 className="mb-3 text-3xl font-heading font-[650] tracking-[-0.035em] text-white">Thanks for reaching out.</h3>
                <p className="max-w-sm leading-relaxed text-muted-foreground">Your note is on its way. I&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <>
                <div className="mb-9 border-b border-white/15 pb-7">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">New message</p>
                  <h3 className="mb-2 text-2xl font-heading font-[650] tracking-[-0.03em] text-white sm:text-3xl">Tell me what&apos;s on your mind.</h3>
                  <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">A few details are all I need to start the conversation.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-white/85">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="h-12 rounded-none border-x-0 border-t-0 border-b-white/25 bg-transparent px-0 shadow-none hover:border-b-white/55 focus:border-b-white focus:bg-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-white/85">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="h-12 rounded-none border-x-0 border-t-0 border-b-white/25 bg-transparent px-0 shadow-none hover:border-b-white/55 focus:border-b-white focus:bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-white/85">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What would you like to talk about?"
                      required
                      className="h-12 rounded-none border-x-0 border-t-0 border-b-white/25 bg-transparent px-0 shadow-none hover:border-b-white/55 focus:border-b-white focus:bg-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-white/85">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share a little context, a goal, or a good question."
                      required
                      className="min-h-36 rounded-none border-x-0 border-t-0 border-b-white/25 bg-transparent px-0 py-3 shadow-none hover:border-b-white/55 focus:border-b-white focus:bg-transparent"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="mt-2 h-12 rounded-full px-6 text-sm font-semibold">
                    {loading ? (
                      "Sending message..."
                    ) : (
                      <>
                        Send message
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>
                  {error && <p role="alert" className="pt-1 text-sm text-red-400">{error}</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
