import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { CertificationsSection } from '@/components/CertificationsSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export function App() {
  return (
    <div className="min-h-screen" style={{ background: '#071A2F' }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
