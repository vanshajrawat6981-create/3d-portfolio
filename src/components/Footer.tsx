import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons"

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="text-primary text-xs font-bold font-mono">VR</span>
          </div>
          <span className="text-sm text-muted-foreground">
            © 2026 Vanshaj Rawat. Built with cloud-native DevOps.
          </span>
        </div>
        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/vanshajrawat", icon: GithubIcon, label: "GitHub" },
            { href: "https://linkedin.com/in/vanshajrawat", icon: LinkedinIcon, label: "LinkedIn" },
            { href: "mailto:vanshajrawat@email.com", icon: Mail, label: "Email" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
