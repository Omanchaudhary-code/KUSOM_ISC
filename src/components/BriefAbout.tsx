
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BriefAbout() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 tech-pattern px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Text Content - responsive typography and spacing */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-isclub-teal bg-isclub-blue-light/50 rounded-full">
              About IS Club
            </span>
            
            <h2 className="font-display font-bold text-isclub-navy leading-tight" style={{
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              lineHeight: 'clamp(2rem, 5.5vw, 3.5rem)'
            }}>
              Empowering KUSOM Students in Business & Technology
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <p className="text-gray-600 leading-relaxed" style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                lineHeight: 'clamp(1.375rem, 2.5vw, 1.75rem)'
              }}>
                The Information Systems Club (IS Club) at Kathmandu University School of Management is a student-led organization dedicated to bridging the gap between business and technology education.
              </p>
              
              <p className="text-gray-600 leading-relaxed" style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                lineHeight: 'clamp(1.375rem, 2.5vw, 1.75rem)'
              }}>
                We organize workshops, seminars, competitions, and networking events to help students develop technical skills, understand business applications of technology, and connect with industry professionals.
              </p>
            </div>
            
            <div className="pt-4 sm:pt-6">
              <a 
                href="/about" 
                className={cn(
                  "inline-flex items-center rounded-lg",
                  "bg-isclub-navy text-white font-medium",
                  "transition-all duration-300 hover:bg-isclub-teal hover:scale-105",
                  "focus:outline-none focus:ring-2 focus:ring-isclub-teal/50"
                )}
                style={{
                  padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                }}
              >
                Learn More About Us
              </a>
            </div>
          </motion.div>
          
          {/* Image - responsive sizing and positioning */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-isclub-teal to-isclub-cyan rounded-2xl blur opacity-30 circuit-animate"></div>
              <div className="relative glass-card rounded-2xl overflow-hidden">
                <img 
                  src="https://i.imgur.com/DGHDcSi.jpeg"
                  alt="IS Club Team" 
                  className="w-full h-auto object-cover rounded-2xl"
                  style={{
                    aspectRatio: '16/12',
                    maxHeight: 'clamp(300px, 50vw, 600px)'
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
