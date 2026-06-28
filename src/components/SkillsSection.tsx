import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

const skills = [
  {
    name: 'AWS',
    icon: '☁',
    level: 85,
    color: '#FF9900',
    category: 'Cloud',
    desc: 'EC2, S3, VPC, IAM, Lambda',
  },
  {
    name: 'Docker',
    icon: '🐳',
    level: 80,
    color: '#2496ED',
    category: 'Containers',
    desc: 'Containerization & orchestration',
  },
  {
    name: 'Terraform',
    icon: '⚡',
    level: 75,
    color: '#7B42BC',
    category: 'IaC',
    desc: 'Infrastructure as code',
  },
  {
    name: 'Linux',
    icon: '🐧',
    level: 88,
    color: '#FCC624',
    category: 'Systems',
    desc: 'Shell scripting & administration',
  },
  {
    name: 'Git',
    icon: '🔀',
    level: 90,
    color: '#F05032',
    category: 'Version Control',
    desc: 'Branching strategies & workflows',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    level: 88,
    color: '#ffffff',
    category: 'DevOps',
    desc: 'Actions CI/CD & repositories',
  },
  {
    name: 'Python',
    icon: '🐍',
    level: 72,
    color: '#3776AB',
    category: 'Scripting',
    desc: 'Automation & cloud SDK',
  },
  {
    name: 'Networking',
    icon: '🌐',
    level: 78,
    color: '#06B6D4',
    category: 'Infrastructure',
    desc: 'TCP/IP, VPC design, DNS',
  },
]

function HologramCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8, scale: 1.03 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-pointer"
      style={{ perspective: 800 }}
    >
      {/* Glow bg */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl"
        style={{ background: `radial-gradient(ellipse, ${skill.color}30 0%, transparent 70%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <div className={cn(
        'relative rounded-2xl p-5 border overflow-hidden hologram',
        'transition-all duration-300',
        hovered
          ? 'border-opacity-60 shadow-lg'
          : 'border-white/8 bg-white/3',
      )}
        style={{
          background: hovered ? `linear-gradient(135deg, ${skill.color}10 0%, rgba(7,26,47,0.9) 100%)` : 'rgba(255,255,255,0.03)',
          borderColor: hovered ? `${skill.color}60` : 'rgba(255,255,255,0.08)',
          boxShadow: hovered ? `0 0 30px ${skill.color}25, 0 4px 20px rgba(0,0,0,0.4)` : 'none',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Scan lines overlay */}
        {hovered && (
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
            }}
          />
        )}

        {/* Category chip */}
        <div
          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 tracking-wider uppercase"
          style={{
            background: `${skill.color}20`,
            color: skill.color,
            border: `1px solid ${skill.color}30`,
          }}
        >
          {skill.category}
        </div>

        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-3">
          <motion.span
            className="text-3xl"
            animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {skill.icon}
          </motion.span>
          <div>
            <h3 className="text-white font-bold text-lg leading-none">{skill.name}</h3>
            <p className="text-white/40 text-xs mt-0.5">{skill.desc}</p>
          </div>
        </div>

        {/* Skill bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-white/30 text-xs">Proficiency</span>
            <motion.span
              className="text-xs font-bold"
              style={{ color: skill.color }}
              animate={hovered ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {skill.level}%
            </motion.span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1.2, delay: index * 0.07 + 0.5, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[#8B5CF6]" />
            <span className="text-[#8B5CF6] text-xs font-semibold tracking-widest uppercase">Skills Lab</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Holographic
            <span className="block gradient-text">Tech Stack</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/45 text-base mt-4 max-w-xl"
          >
            Hover over each hologram to interact with my skill set.
            Each card represents a technology I actively use.
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <HologramCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
