import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { scrollDir, scrollY } = useScrollDirection()
  const isVisible = scrollDir === 'up' || scrollY < 80

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={cn(
              'flex items-center gap-1 px-4 py-2 rounded-full',
              'glass border border-white/10',
              'shadow-[0_8px_32px_rgba(59,130,246,0.15)]'
            )}
          >
            {/* Logo mark */}
            <span className="text-sm font-bold gradient-text mr-3 pr-3 border-r border-white/10">
              VR
            </span>

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium rounded-full',
                  'text-white/60 hover:text-white',
                  'transition-all duration-300',
                  'hover:bg-white/5'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA */}
            <a
              href="#contact"
              className={cn(
                'ml-2 px-4 py-1.5 rounded-full text-sm font-semibold',
                'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]',
                'text-white hover:opacity-90 transition-opacity'
              )}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Hire Me
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
