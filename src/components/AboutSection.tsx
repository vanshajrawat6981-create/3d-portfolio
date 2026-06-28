import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Cloud, Server, Terminal, Network, GitBranch, Container, Cpu, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const traits: Array<{
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  desc: string
}> = [
  { icon: Cloud, label: 'Cloud Engineering', desc: 'Designing and deploying scalable cloud architectures on AWS' },
  { icon: Server, label: 'AWS', desc: 'EC2, S3, VPC, IAM, Lambda, CloudFormation and more' },
  { icon: Terminal, label: 'Linux', desc: 'Shell scripting, system administration and automation' },
  { icon: Network, label: 'Networking', desc: 'VPC design, subnets, routing, security groups and firewalls' },
  { icon: Zap, label: 'Terraform', desc: 'Infrastructure as code for reproducible cloud environments' },
  { icon: Container, label: 'Docker', desc: 'Containerization and orchestration of microservices' },
  { icon: GitBranch, label: 'GitHub Actions', desc: 'CI/CD pipelines for automated testing and deployment' },
  { icon: Cpu, label: 'Automation', desc: 'Python scripting and workflow automation to eliminate toil' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

function TraitCard({ icon: Icon, label, desc }: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  label: string
  desc: string
  index: number
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'glass glass-hover rounded-2xl p-5 cursor-default',
        'border border-white/8',
        'group relative overflow-hidden'
      )}
    >
      {/* Gradient corner accent */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-[#3B82F6]/10 to-[#06B6D4]/5 blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />

      <div className="relative flex items-start gap-4">
        <div className={cn(
          'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
          'bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/10',
          'border border-[#3B82F6]/20',
          'group-hover:border-[#3B82F6]/50 transition-colors duration-300'
        )}>
          <Icon className="w-5 h-5 transition-colors" style={{ color: '#3B82F6' }} />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-1">{label}</h3>
          <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-[#3B82F6]" />
          <span className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase">About Me</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Crafting Cloud
              <span className="block gradient-text">Infrastructure</span>
              for Scale
            </h2>

            <div className="space-y-4 text-white/55 leading-relaxed text-base">
              <p>
                I'm Vanshaj Rawat, an aspiring Cloud & DevOps Engineer passionate about building
                resilient, scalable infrastructure. I specialize in AWS cloud services, infrastructure
                automation, and modern DevOps practices.
              </p>
              <p>
                My focus is on bridging the gap between development and operations — automating
                deployments, optimizing costs, and ensuring systems are reliable at scale using
                tools like Terraform, Docker, and GitHub Actions.
              </p>
              <p>
                When I'm not provisioning infrastructure, I enjoy exploring emerging cloud-native
                technologies and contributing to open-source DevOps tooling.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: '4+', label: 'Projects' },
                { value: '2+', label: 'Certifications' },
                { value: '100%', label: 'Dedication' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl p-4 text-center border border-white/8"
                >
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Trait cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {traits.map((trait, i) => (
              <TraitCard key={trait.label} {...trait} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
