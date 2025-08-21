"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation-optimized"
import { PaperAirplaneBackground } from "./paper-airplane-background"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string|null>(null);
  const [error, setError] = useState<string|null>(null);

  // Animation refs
  const headerRef = useScrollAnimation({ delay: 100, stagger: 40 });
  const contentRef = useScrollAnimation({ delay: 200, stagger: 80 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 lg:py-16 relative overflow-hidden min-h-screen lg:min-h-0">
      {/* Paper airplane background spanning the entire section */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          transform: 'translateZ(0)', // Force hardware acceleration
          willChange: 'auto', // Prevent unnecessary composition layers
        }}
      >
        <PaperAirplaneBackground />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <span 
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full mb-4 text-white relative overflow-hidden animate-fade-down"
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a24, #ff9ff3, #54a0ff, #5f27cd)',
              backgroundSize: '400% 400%',
              animation: 'gradient-pulse 3s ease-in-out infinite',
            }}
          >
            <svg 
              className="w-4 h-4 mr-2 animate-pulse" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            Let's Connect
          </span>
          <h2 data-animate className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Get In Touch
          </h2>
          <p data-animate className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-left">
            <div data-animate>
              <h3 className="text-2xl font-heading font-semibold mb-6">Let's Connect</h3>
              <p className="font-body text-base leading-relaxed text-muted-foreground mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div data-animate className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:hello@cmacrowther.com"
                    className="font-body text-base text-foreground hover:text-primary transition-colors"
                  >
                    cmacrowther@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="font-body text-base text-foreground hover:text-primary transition-colors"
                  >
                    +1 (902) 393-0928   
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Location</p>
                  <p className="font-body text-base text-foreground">Charlottetown, PE </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card data-animate className="animate-slide-right">
            <CardHeader>
              <CardTitle className="font-heading">Send a Message</CardTitle>
              <CardDescription className="font-body">
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-body">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="font-body"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-body">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="font-body"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-body">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="font-body"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                {success && <p className="text-green-600 text-sm pt-2">{success}</p>}
                {error && <p className="text-red-600 text-sm pt-2">{error}</p>}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
