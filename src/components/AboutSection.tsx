import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Cpu, Zap } from 'lucide-react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code2,
      title: 'Backend Systems',
      description: 'Building robust APIs and services with Python & Django',
    },
    {
      icon: Cpu,
      title: 'AI Integration',
      description: 'Implementing LLMs, chatbots, and intelligent automation',
    },
    {
      icon: Zap,
      title: 'Production-Ready',
      description: 'Systems that scale and serve real users reliably',
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-accent font-medium text-sm uppercase tracking-wider"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mt-3"
            >
              Engineer first, impact driven
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="prose prose-lg dark:prose-invert mx-auto text-center mb-16"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a Python and AI engineer focused on building systems that actually work in production. 
              Over the years, I've developed backend architectures, integrated LLMs into real applications, 
              and shipped products used by thousands. My approach is simple: understand the problem deeply, 
              design for scale, and deliver solutions that create measurable impact.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether it's an AI-powered WhatsApp bot handling live voting for a radio station or 
              internal automation tools streamlining operations, I bring the same level of care and 
              engineering rigor to every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
