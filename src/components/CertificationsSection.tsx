import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

const certs = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    badge: '☁',
    color: '#FF9900',
    status: 'Active',
    desc: 'Foundational understanding of AWS Cloud concepts, services, and terminology.',
  },
  {
    title: 'HashiCorp Terraform Associate',
    issuer: 'HashiCorp',
    date: '2024',
    badge: '⚡',
    color: '#7B42BC',
    status: 'Active',
    desc: 'Proficiency in using Terraform to provision and manage infrastructure as code.',
  },
  {
    title: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: 'In Progress',
    badge: '🐳',
    color: '#2496ED',
    status: 'Pursuing',
    desc: 'Container lifecycle, networking, storage, security and orchestration with Docker.',
  },
  {
    title: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    date: 'Planned 2025',
    badge: '🏗',
    color: '#3B82F6',
    status: 'Planned',
    desc: 'Designing distributed systems on AWS with high availability and fault tolerance.',
  },
]

function CertBadge({ cert, index }: { cert: typeof certs[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-default"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-lg"
        style={{ background: `radial-gradient(ellipse, ${cert.color}25 0%, transparent 70%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div
        className="relative rounded-2xl p-5 border transition-all duration-400 flex flex-col gap-4"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${cert.color}10 0%, rgba(7,26,47,0.95) 100%)`
            : 'rgba(255,255,255,0.03)',
          borderColor: hovered ? `${cert.color}50` : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          boxShadow: hovered ? `0 15px 50px rgba(0,0,0,0.4), 0 0 30px ${cert.color}15` : 'none',
        }}
      >
        {/* Badge + status */}
        <div className="flex items-start justify-between">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border transition-all duration-300"
            style={{
              background: `${cert.color}15`,
              borderColor: hovered ? `${cert.color}50` : `${cert.color}20`,
              boxShadow: hovered ? `0 0 25px ${cert.color}30, inset 0 0 15px ${cert.color}10` : 'none',
            }}
            animate={hovered ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {cert.badge}
          </motion.div>
          <span
            className={cn(
              'text-xs font-semibold px-2.5 py-1 rounded-full border',
              cert.status === 'Active' && 'border-green-500/30 text-green-400 bg-green-500/10',
              cert.status === 'Pursuing' && 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
              cert.status === 'Planned' && 'border-white/20 text-white/40 bg-white/5',
            )}
          >
            {cert.status}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <h3 className="text-white font-bold text-base leading-snug">{cert.title}</h3>
          <p className="text-white/40 text-xs">{cert.issuer}</p>
        </div>

        {/* Description */}
        <p className="text-white/35 text-xs leading-relaxed">{cert.desc}</p>

        {/* Footer */}
        <div
          className="pt-3 border-t flex items-center justify-between"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <span className="text-xs text-white/30">{cert.date}</span>
          <div
            className="flex gap-1"
            style={{ color: cert.color }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-3 rounded-full"
                style={{ background: cert.status === 'Active' ? cert.color : `${cert.color}40` }}
                animate={hovered ? { height: [12, 8 + Math.random() * 8, 12] } : {}}
                transition={{ duration: 0.5, delay: i * 0.05, repeat: hovered ? Infinity : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" ref={ref} className="relative py-32 px-6">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[#FF9900]" />
            <span className="text-[#FF9900] text-xs font-semibold tracking-widest uppercase">Certifications</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Credentials &
            <span className="block gradient-text">Badges</span>
          </motion.h2>
        </div>

        {/* Cert grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((cert, i) => (
            <CertBadge key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
