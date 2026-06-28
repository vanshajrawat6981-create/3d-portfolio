import { useState, useEffect } from "react"

export function useScrollProgress(maxScroll = 600) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY
      setProgress(Math.min(scrollY / maxScroll, 1))
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [maxScroll])

  return progress
}
