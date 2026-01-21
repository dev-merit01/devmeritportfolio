import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Building2, Code2, Bot, Server, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HireSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const freelanceServices = [
    { icon: Code2, title: 'Custom Software', description: 'Tailored backend systems built to your specifications' },
    { icon: Bot, title: 'AI Automation', description: 'LLM integration, chatbots, and intelligent workflows' },
    { icon: Server, title: 'Backend Systems', description: 'APIs, data pipelines, and scalable architectures' },
  ];

  const roles = [
    { icon: Server, title: 'Backend Engineer', description: 'Python, Django, APIs, system design' },
    { icon: Bot, title: 'AI Engineer', description: 'LLMs, ML integration, AI-powered products' },
    { icon: Users, title: 'Full-Stack (Backend-heavy)', description: 'End-to-end product development' },
  ];

  return (
    <section id="hire" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-accent font-medium text-sm uppercase tracking-wider"
            >
              Let's Work Together
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mt-3"
            >
              Open to opportunities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              Whether you need a contractor for a specific project or are looking for a full-time team member, I'm ready to contribute
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Freelance Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Freelance & Contract</h3>
                  <p className="text-sm text-muted-foreground">Project-based work</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {freelanceServices.map((service) => (
                  <div key={service.title} className="flex items-start gap-3">
                    <service.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full" asChild>
                <a href="#contact">Discuss Your Project</a>
              </Button>
            </motion.div>

            {/* Full-Time Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Full-Time Roles</h3>
                  <p className="text-sm text-muted-foreground">Engineering positions</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {roles.map((role) => (
                  <div key={role.title} className="flex items-start gap-3">
                    <role.icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium">{role.title}</h4>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
