
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { url } from 'inspector';

export default function BriefAbout() {
  return (
    <section className="section-padding tech-pattern px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-isclub-teal bg-isclub-blue-light/50 rounded-full">
              About IS Club
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-isclub-navy">
              Empowering KUSOM Students in Business & Technology
            </h2>
            <p className="text-gray-600 mb-6">
              The Information Systems Club (IS Club) at Kathmandu University School of Management is a student-led organization dedicated to bridging the gap between business and technology education.
            </p>
            <p className="text-gray-600 mb-8">
              We organize workshops, seminars, competitions, and networking events to help students develop technical skills, understand business applications of technology, and connect with industry professionals.
            </p>
            <a 
              href="/about" 
              className={cn(
                "inline-flex items-center px-6 py-3 rounded-lg",
                "bg-isclub-navy text-white font-medium",
                "transition-all duration-300 hover:bg-isclub-teal"
              )}
            >
              Learn More About Us
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-isclub-teal to-isclub-cyan rounded-2xl blur opacity-30 circuit-animate"></div>
              <div className="relative glass-card rounded-2xl overflow-hidden">
                <img 
                  src="https://i.imgur.com/DGHDcSi.jpeg"
                  style={
                    {
                      objectFit: 'cover', // Note camelCase: 'objectFit', not 'object-fit'
                      width: '700px',
                      height: '600px',
                    }

                  }
                  alt="IS Club Team" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
