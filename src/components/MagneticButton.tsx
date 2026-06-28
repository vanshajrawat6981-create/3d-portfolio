import { useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: "primary" | "outline" | "ghost"
  as?: "button" | "a"
  target?: string
  rel?: string
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  as: Tag = href ? "a" : "button",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25
    el.style.transform = `translate(${dx}px, ${dy}px)`
    el.style.transition = "transform 0.1s ease"
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0, 0)"
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
  }, [])

  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
    outline:
      "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
  }

  return (
    <motion.a
      {...(Tag === "a" ? { href, target, rel } : {})}
      ref={ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer select-none",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.a>
  )
}
