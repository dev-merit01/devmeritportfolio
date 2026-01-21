import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Layers, Cpu, Settings } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Analyze the Problem',
    description: 'Every project starts with understanding the real problem — not just the symptoms. I dig into the requirements, constraints, and what success actually looks like.',
    forClient: 'I ask the right questions upfront',
    forEmployer: 'I don\'t jump to solutions',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Design for Scale',
    description: 'Architecture decisions made early define the system\'s future. I design systems that can grow, handle edge cases, and remain maintainable over time.',
    forClient: 'Your system won\'t break as you grow',
    forEmployer: 'I think beyond the immediate ticket',
  },
  {
    icon: Cpu,
    number: '03',
    title: 'Integrate AI Responsibly',
    description: 'AI is a tool, not magic. I implement LLMs and automation where they add real value, with proper fallbacks, monitoring, and cost considerations.',
    forClient: 'AI that actually works reliably',
    forEmployer: 'I understand AI limitations',
  },
  {
    icon: Settings,
    number: '04',
    title: 'Maintain & Improve',
    description: 'Shipping is just the beginning. I build with observability in mind, write tests that matter, and continuously iterate based on real-world feedback.',
    forClient: 'Long-term support and evolution',
    forEmployer: 'I own what I build',
  },
];

export function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="approach" className="py-24 bg-background">
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
              How I Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mt-3"
            >
              My approach to building systems
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              Whether working with a client or within a team, these principles guide how I build
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 text-xs font-mono font-bold text-accent bg-background px-1.5 rounded">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl pt-2">{step.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      For Clients
                    </span>
                    <p className="text-sm text-foreground/80 mt-1">{step.forClient}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      For Employers
                    </span>
                    <p className="text-sm text-foreground/80 mt-1">{step.forEmployer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
