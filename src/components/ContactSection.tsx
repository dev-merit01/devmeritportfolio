import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/merit-ngorima' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/dev-merit01' },
  { icon: Twitter, label: 'X', href: 'https://x.com/dev_merit' },
];

// Read Web3Forms access key from Vite env: VITE_WEB3FORMS_KEY
const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string) || '';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Using Web3Forms - a free email API service
    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error('Web3Forms access key not configured. Set VITE_WEB3FORMS_KEY in your .env');
      setIsSubmitting(false);
      return;
    }
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('to_email', 'meritngorima7@gmail.com');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Message sent!', {
          description: 'Thank you for reaching out. I\'ll get back to you soon.',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again or email me directly at meritngorima7@gmail.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
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
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mt-3"
            >
              Let's start a conversation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4"
            >
              Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="md:col-span-3 space-y-6"
            >
              <input type="hidden" name="from_name" value="Portfolio Contact Form" />
              <input type="hidden" name="subject" value="New Contact from Portfolio" />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.form>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="md:col-span-2"
            >
              <h3 className="font-semibold text-lg mb-6">Connect with me</h3>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <link.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/20"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Prefer email?</span>
                  <br />
                  Reach me directly at{' '}
                  <a href="mailto:meritngorima7@gmail.com" className="text-accent hover:underline">
                    meritngorima7@gmail.com
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
