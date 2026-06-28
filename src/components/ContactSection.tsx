import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Send, CheckCircle } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"
import { MagneticButton } from "@/components/MagneticButton"

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6 sm:px-12 lg:px-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-primary text-sm font-mono tracking-widest uppercase mb-4"
        >
          05. Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          Let's <span className="text-primary">connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted-foreground max-w-xl mb-16"
        >
          Whether you have a project, want to collaborate on cloud infrastructure, or just want to chat DevOps — my inbox is open.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "vanshajrawat@email.com", href: "mailto:vanshajrawat@email.com" },
                { icon: MapPin, label: "Location", value: "India (Open to Remote)", href: null },
                { icon: GithubIcon, label: "GitHub", value: "github.com/vanshajrawat", href: "https://github.com/vanshajrawat" },
                { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/vanshajrawat", href: "https://linkedin.com/in/vanshajrawat" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-foreground hover:text-primary transition-colors duration-200">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-foreground">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="glass p-5 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-foreground">Available for opportunities</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Open to Cloud Engineering, DevOps, and SRE roles. Also available for freelance infrastructure consulting.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <div className="glass p-8 rounded-2xl border border-primary/30 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[320px]">
                <CheckCircle className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                <p className="text-muted-foreground text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }) }}
                  className="text-primary text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl border border-border space-y-5">
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-medium" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-medium" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-2 font-medium" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="I'd love to discuss a cloud infrastructure project..."
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-colors duration-200 resize-none"
                  />
                </div>
                <MagneticButton variant="primary" className="w-full justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
