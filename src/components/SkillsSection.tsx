import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Brain, MessageSquare, Database, Rocket } from 'lucide-react';

const skillCategories = [
  {
    icon: Server,
    title: 'Backend',
    skills: ['Python', 'Django', 'REST APIs', 'FastAPI'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    skills: ['LLM APIs', 'AI Agents', 'Prompt Engineering', 'OpenAI', 'LangChain'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageSquare,
    title: 'Messaging Systems',
    skills: ['WhatsApp Bots', 'Real-time Engagement', 'Bird', 'WebSockets'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Data & Infrastructure',
    skills: ['PostgreSQL', 'Redis', 'Background Jobs', 'Celery', 'Docker'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Rocket,
    title: 'Delivery',
    skills: ['Testing', 'CI/CD', 'Deployment', 'Monitoring', 'Render'],
    color: 'from-red-500 to-rose-500',
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 bg-background">
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
              Technical Skills
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mt-3"
            >
              Core competencies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              Technologies and tools I use to build production-grade systems
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`group relative p-6 rounded-2xl bg-card border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${category.color}`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-secondary/50 rounded-lg text-foreground/80 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
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
