import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Users, MessageCircle, BarChart3, Github, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
  {
    icon: Users,
    title: 'AI WhatsApp Voting Platform',
    problem: 'A national radio station (Radio Zimbabwe/ZBC) needed real-time audience engagement for live shows, but existing solutions couldn\'t handle the scale or provide instant feedback.',
    solution: 'Built a WhatsApp-based voting system with AI moderation, real-time vote tallying, and automated response handling. The system processes thousands of messages simultaneously while maintaining sub-second response times.',
    stack: ['Python', 'Django', 'WhatsApp API', 'PostgreSQL', 'Redis', 'Celery'],
    impact: '12,000+ active users, processed 50K+ votes during peak shows, 98% uptime',
    featured: true,
    image: '/chart.png',
    liveUrl: '',
    videoUrl: 'https://youtube.com/shorts/U9n7-JoI4sA?si=7aSlUWlEz0CJIEgn',
    githubUrl: 'https://github.com/dev-merit01/radio-zimbabwe-chatbot.git',
  },
  {
    icon: Users,
    title: 'AI Job Resume Match (ATS Optimization Platform)',
    problem:
      'Qualified job seekers were repeatedly getting rejected because Applicant Tracking Systems (ATS) failed to recognize relevant skills and experience, leading to missed opportunities and frustration.',
    solution:
      'Built an AI-powered resume-to-job matching platform that analyzes resumes against job descriptions, identifies skill gaps, and generates ATS-optimized recommendations to improve candidate visibility and hiring success.',
    stack: [
      'Python',
      'OpenAI API',
      'Django',
      'NLP / LLMs',
      'PostgreSQL',
      'Javascript',
      'HTML Template Rendering',
      'Render',      
    ],
    impact:
      'Improved resume-to-job match accuracy, increased ATS keyword alignment, reduced rejection rates, and empowered job seekers with actionable, data-driven feedback.Currently l have 5 users testing the platform during its beta phase.',
    featured: true,
    image: '/skillsgap.png',
    liveUrl: 'https://skillsgap.onrender.com/',
    videoUrl: 'https://youtube.com/watch?v=demo2',
    githubUrl: 'https://github.com/dev-merit01/skillgap.git',
  },

  {
    icon: BarChart3,
    title: 'Consultancy Business Automation Platform',
    problem: 'A growing consultancy firm struggled with manual data management, report generation, and cross-system integration, leading to inefficiencies, errors, and delayed client deliverables.',
    solution: 'Developed an end-to-end automation platform that integrates client data sources, automates report generation, and streamlines workflows using AI-driven insights. The system reduced manual tasks and improved data accuracy across the organization.',
    stack: ['Reactjs', 'Taiwindcss', 'Typescript', 'Vite'],
    impact: '15+ hours/week saved, zero manual errors, real-time visibility',
    featured: false,
    image: '/consultancy.png',
    liveUrl: 'https://consultancy-l4uw.onrender.com/',
    videoUrl: 'https://youtube.com/watch?v=demo3',
    githubUrl: 'https://github.com/dev-merit01/consultancy-website.git',
  },
    {
    icon: BarChart3,
    title: 'A website for a Company that resells Starlink kits and provides installation services',
    problem: 'A compnay wanted to establish an online presence to showcase their Starlink reselling and installation services, but lacked a professional website to attract customers and generate leads.',
    solution: 'Developed a responsive website using HTML,CSS and JavaScript that highlights the company\'s Starlink products and installation services, includes customer testimonials, and features a contact form for lead generation.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    impact: 'Increased online visibility, attracted potential customers, and facilitated lead generation through the contact form.',
    featured: false,
    image: '/kuiper.png',
    liveUrl: 'https://starlink-kits.onrender.com',
    videoUrl: 'https://youtube.com/watch?v=demo3',
    githubUrl: 'https://github.com/dev-merit01/starlink-resell-website.git',
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 bg-gradient-card">
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
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mt-3"
            >
              Projects that made an impact
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              Real-world systems built to solve real problems, with measurable results
            </motion.p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="group relative rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-glow overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/90 backdrop-blur-sm flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-accent/90 text-accent-foreground backdrop-blur-sm">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="font-bold text-xl mb-4">{project.title}</h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Problem
                      </h4>
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Solution
                      </h4>
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-secondary rounded-md text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 pt-6 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-accent font-medium">
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span>{project.impact}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1.5" />
                            Live
                          </a>
                        </Button>
                      )}
                      {project.videoUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="w-4 h-4 mr-1.5" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1.5" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
