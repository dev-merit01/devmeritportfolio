import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ApproachSection } from '@/components/ApproachSection';
import { HireSection } from '@/components/HireSection';
import { ContactSection } from '@/components/ContactSection';
import { ChatBot } from '@/components/ChatBot';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ApproachSection />
        <HireSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
