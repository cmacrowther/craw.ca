"use client"

import { useState } from "react"
import { CheckCircle2, LoaderCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const initialFormData = {
  name: "",
  email: "",
  application: "",
  subject: "",
  message: "",
}

export function SupportContactForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.application
            ? `${formData.application}: ${formData.subject}`
            : formData.subject,
          message: formData.message,
          source: "support",
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again later.")
        return
      }

      setFormData(initialFormData)
      setIsSubmitted(true)
    } catch {
      setError("Network error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto mb-4 size-10 text-emerald-300" aria-hidden="true" />
        <h2 className="text-2xl font-heading font-semibold text-white">Support request received</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Thanks for the details. Your message is in the support queue and we&apos;ll get back to you by email.
        </p>
        <Button variant="outline" className="mt-6 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={() => setIsSubmitted(false)}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/90">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" required placeholder="Your name" className="border-white/15 bg-white/[0.06]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/90">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required placeholder="you@example.com" className="border-white/15 bg-white/[0.06]" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-2">
          <Label htmlFor="application" className="text-white/90">Application <span className="text-white/45">(optional)</span></Label>
          <Input id="application" name="application" value={formData.application} onChange={handleChange} placeholder="Which app?" className="border-white/15 bg-white/[0.06]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-white/90">What do you need help with?</Label>
          <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="A short summary" className="border-white/15 bg-white/[0.06]" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-white/90">Details</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={7} placeholder="Tell us what happened, what you expected, and any steps to reproduce the issue." className="resize-y border-white/15 bg-white/[0.06]" />
      </div>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <Button type="submit" disabled={isSubmitting} className="h-11 rounded-full px-5">
        {isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        {isSubmitting ? "Sending request..." : "Send support request"}
      </Button>
    </form>
  )
}
