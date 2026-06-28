import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Cloud, GitBranch, Server, Shield, Activity, Package } from "lucide-react"
import { GithubIcon } from "@/components/SocialIcons"

const projects = [
  {
    title: "CloudOps Automation Platform",
    desc: "A self-service internal platform for provisioning cloud resources using Terraform and GitOps workflows. Engineers spin up environments in minutes.",
    tags: ["Terraform", "AWS", "GitHub Actions", "ArgoCD", "Kubernetes"],
    icon: Cloud,
    accent: "oklch(0.72 0.2 200)",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Kubernetes Monitoring Stack",
    desc: "Production-grade observability stack with Prometheus, Grafana, and custom alerting rules deployed via Helm charts on a multi-tenant cluster.",
    tags: ["Prometheus", "Grafana", "Helm", "Kubernetes", "PagerDuty"],
    icon: Activity,
    accent: "oklch(0.78 0.18 50)",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Multi-Cloud CI/CD Pipeline",
    desc: "A reusable pipeline template library supporting AWS, GCP, and Azure deployments with security scanning, testing gates, and rollback strategies.",
    tags: ["GitHub Actions", "Docker", "Trivy", "AWS", "GCP"],
    icon: GitBranch,
    accent: "oklch(0.7 0.15 290)",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Infrastructure Cost Optimizer",
    desc: "Automated tool that analyzes cloud spend, identifies idle resources, and generates Terraform PRs to right-size or terminate unused infrastructure.",
    tags: ["Python", "AWS Cost Explorer", "Terraform", "Slack Bot"],
    icon: Server,
    accent: "oklch(0.65 0.18 240)",
    github: "#",
    live: null,
    featured: false,
  },
  {
    title: "Secure Secrets Management",
    desc: "HashiCorp Vault integration with dynamic secrets, PKI certificate management, and Kubernetes auth method for zero-trust secret injection.",
    tags: ["Vault", "Kubernetes", "mTLS", "RBAC", "Helm"],
    icon: Shield,
    accent: "oklch(0.72 0.2 200)",
    github: "#",
    live: null,
    featured: false,
  },
  {
    title: "Container Registry & Image Pipeline",
    desc: "Private container registry with automated image scanning, layer caching, and semantic versioning via GitHub Actions and AWS ECR.",
    tags: ["Docker", "ECR", "GitHub Actions", "Trivy", "Cosign"],
    icon: Package,
    accent: "oklch(0.78 0.18 285)",
    github: "#",
    live: null,
    featured: false,
  },
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  inView: boolean
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 group overflow-hidden flex flex-col"
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon + title */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}30` }}
          >
            <Icon className="w-5 h-5" style={{ color: project.accent }} />
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a
              href={project.github}
              className="w-8 h-8 rounded-lg glass-light border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            {project.live && (
              <a
                href={project.live}
                className="w-8 h-8 rounded-lg glass-light border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{project.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6 sm:px-12 lg:px-24">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-primary text-sm font-mono tracking-widest uppercase mb-4"
        >
          03. Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          What I've <span className="text-primary">built</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted-foreground max-w-xl mb-16"
        >
          Real-world cloud infrastructure projects focused on automation, reliability, and scale.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
