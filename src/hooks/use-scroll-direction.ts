import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastY = window.scrollY

    const update = () => {
      const currentY = window.scrollY
      setScrollDir(currentY < lastY || currentY < 10 ? 'up' : 'down')
      setScrollY(currentY)
      lastY = currentY
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return { scrollDir, scrollY }
}
