import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { HeroScene } from "@/scene/HeroScene"
import { MagneticButton } from "@/components/MagneticButton"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { ChevronDown, FileText, ArrowRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"
import { gsap } from "gsap"

const ROLE_WORDS = ["Cloud Engineer", "DevOps Enthusiast", "Infrastructure Architect"]

export function HeroSection() {
  const scrollProgress = useScrollProgress(800)
  const roleRef = useRef<HTMLSpanElement>(null)
  const wordIndex = useRef(0)

  useEffect(() => {
    if (!roleRef.current) return

    const cycle = () => {
      if (!roleRef.current) return
      const next = ROLE_WORDS[wordIndex.current % ROLE_WORDS.length]
      wordIndex.current++

      gsap.to(roleRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          if (roleRef.current) roleRef.current.textContent = next
          gsap.fromTo(
            roleRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
          )
        },
      })
    }

    const interval = setInterval(cycle, 2800)
    return () => clearInterval(interval)
  }, [])

  const textOpacity = 1 - scrollProgress * 2

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <HeroScene scrollProgress={scrollProgress} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Hero Text Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 lg:px-24 pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-primary/30 text-xs text-primary font-medium mb-6 pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Open to opportunities
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-muted-foreground text-lg mb-2 font-light"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-balance leading-none mb-3"
          >
            <span className="text-foreground">Vanshaj</span>{" "}
            <span
              className="text-primary glow-text-cyan"
              style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: "1px oklch(0.72 0.2 200)" }}
            >
              Rawat
            </span>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-xl sm:text-2xl font-semibold text-primary mb-4 h-8 flex items-center"
          >
            <span ref={roleRef}>{ROLE_WORDS[0]}</span>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          >
            Building scalable cloud infrastructure through automation and modern DevOps practices.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex flex-wrap gap-3 pointer-events-auto"
          >
            <MagneticButton href="#projects" variant="primary" className="gap-2">
              Explore Projects <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Let's Talk
            </MagneticButton>
            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="gap-2"
            >
              <FileText className="w-4 h-4" /> Resume
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-3 mt-8 pointer-events-auto"
          >
            <a
              href="https://github.com/vanshajrawat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors duration-200 border border-border"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/vanshajrawat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors duration-200 border border-border"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        style={{ opacity: textOpacity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
