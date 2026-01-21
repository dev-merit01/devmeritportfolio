import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="#" className="text-lg font-bold">
              <span className="text-gradient">Dev</span>
              <span className="text-foreground">Merit</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} All rights reserved. Built with passion by Merit Ngorima.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
