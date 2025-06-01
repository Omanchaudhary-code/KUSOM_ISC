
import { motion } from 'framer-motion';
import { Code, Users, Github, Award, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkshopHighlight() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'GitHub'];
  const instructors = [
    { name: 'Oman Chaudhary', role: 'Technical Head' },
    { name: 'Niraj Prasad Sah', role: 'Secretary' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-isclub-blue-light/30 to-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-isclub-teal bg-white/70 backdrop-blur-sm rounded-full border border-isclub-teal/20">
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            Recent Workshop Highlight
          </span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 sm:mb-4 text-isclub-navy leading-tight"
          >
            🚀 Web Development from Scratch
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-isclub-teal/10 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-isclub-teal" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-isclub-navy">Workshop Overview</span>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                We recently organized an exciting Web Development Workshop where <strong>over 10 enthusiastic participants</strong> explored the foundations of the web from the ground up. Beyond the basics, we introduced popular frameworks, clean coding practices, and hands-on GitHub collaboration.
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium bg-isclub-teal/10 text-isclub-teal rounded-full border border-isclub-teal/20"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-isclub-navy/10 rounded-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-isclub-navy" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-isclub-navy">Led by Our Team</span>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                {instructors.map((instructor, index) => (
                  <motion.div
                    key={instructor.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/50 rounded-lg"
                  >
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-isclub-teal rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-isclub-navy text-sm sm:text-base truncate">{instructor.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{instructor.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed">
                Our instructors guided participants through every step, from writing their first line of code to pushing projects on GitHub. A final test helped evaluate progress and boost confidence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative mt-6 lg:mt-0"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-isclub-teal to-isclub-navy rounded-xl sm:rounded-2xl blur opacity-20"></div>
              <div className="relative glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-4 sm:mb-6"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-isclub-teal to-isclub-navy rounded-full flex items-center justify-center shadow-2xl">
                    <Github className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </div>
                </motion.div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-isclub-navy mb-3 sm:mb-4">
                  💻✨ More Than Learning
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  It was a vibrant coding experience full of discovery, teamwork, and tech excitement. Participants gained practical skills and real-world collaboration experience.
                </p>
                
                <motion.div
                  className="space-y-2 sm:space-y-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-isclub-teal font-medium">
                    <Code className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Hands-on Coding</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-isclub-teal font-medium">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Collaborative Learning</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-isclub-teal font-medium">
                    <Github className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Real-world Projects</span>
                  </div>
                </motion.div>
                
                <motion.a
                  href="/events"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "inline-flex items-center gap-2 mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-3 rounded-lg",
                    "bg-isclub-navy text-white font-medium text-sm sm:text-base",
                    "transition-all duration-300 hover:bg-isclub-teal hover:shadow-lg",
                    "w-full sm:w-auto justify-center"
                  )}
                >
                  View More Events
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
