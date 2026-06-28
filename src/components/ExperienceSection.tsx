import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

const experiences = [
  {
    role: 'Cloud & DevOps Intern',
    company: 'Self-Directed Learning',
    period: '2024 – Present',
    type: 'Learning',
    color: '#3B82F6',
    points: [
      'Built and deployed AWS infrastructure for 4+ personal cloud projects',
      'Implemented CI/CD pipelines with GitHub Actions for automated testing and deployments',
      'Designed multi-tier VPC architecture following AWS Well-Architected Framework',
      'Containerized applications using Docker with multi-stage builds and AWS ECR',
    ],
  },
  {
    role: 'Open Source Contributor',
    company: 'GitHub Community',
    period: '2023 – Present',
    type: 'Contribution',
    color: '#06B6D4',
    points: [
      'Contributed to DevOps tooling and infrastructure automation projects',
      'Published Terraform modules and reusable GitHub Actions workflows',
      'Collaborated with global developers on cloud-native solutions',
    ],
  },
  {
    role: 'Technical Blog Author',
    company: 'Personal Blog',
    period: '2024 – Present',
    type: 'Writing',
    color: '#8B5CF6',
    points: [
      'Writing technical guides on AWS, Terraform, and Docker best practices',
      'Simplifying complex DevOps concepts for junior engineers',
    ],
  },
]

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6">
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[#06B6D4]" />
            <span className="text-[#06B6D4] text-xs font-semibold tracking-widest uppercase">Experience</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Professional
            <span className="block gradient-text">Journey</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#3B82F6] via-[#06B6D4] to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="relative pl-16"
              >
                {/* Node */}
                <div
                  className="absolute left-4 top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center -translate-x-1/2"
                  style={{
                    borderColor: exp.color,
                    background: `${exp.color}20`,
                    boxShadow: `0 0 12px ${exp.color}40`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: exp.color }}
                  />
                </div>

                {/* Card */}
                <div className={cn(
                  'glass rounded-2xl p-6 border border-white/8',
                  'hover:border-white/15 transition-all duration-300',
                  'group'
                )}>
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                      <p className="text-white/50 text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                      >
                        {exp.type}
                      </span>
                      <span className="text-xs text-white/35 px-2 py-1 glass rounded-full border border-white/8">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-white/50 text-sm leading-relaxed">
                        <span
                          className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                          style={{ background: exp.color }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
