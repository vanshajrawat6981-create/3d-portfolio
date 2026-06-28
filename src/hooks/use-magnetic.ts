import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

export function useMagneticHover<T extends HTMLElement>(strength = 30): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * (strength / 100)}px, ${y * (strength / 100)}px)`
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0, 0)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    }

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [strength])

  return ref
}
