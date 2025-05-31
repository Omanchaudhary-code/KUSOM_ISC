
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
    <section className="section-padding bg-gradient-to-br from-isclub-blue-light/30 to-white px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-isclub-teal bg-white/70 backdrop-blur-sm rounded-full border border-isclub-teal/20">
            <Code className="w-4 h-4" />
            Recent Workshop Highlight
          </span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 text-isclub-navy"
          >
            🚀 Web Development from Scratch
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-isclub-teal/10 rounded-lg">
                  <Users className="w-5 h-5 text-isclub-teal" />
                </div>
                <span className="text-lg font-semibold text-isclub-navy">Workshop Overview</span>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                We recently organized an exciting Web Development Workshop where <strong>over 10 enthusiastic participants</strong> explored the foundations of the web from the ground up. Beyond the basics, we introduced popular frameworks, clean coding practices, and hands-on GitHub collaboration.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1 text-sm font-medium bg-isclub-teal/10 text-isclub-teal rounded-full border border-isclub-teal/20"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-isclub-navy/10 rounded-lg">
                  <Award className="w-5 h-5 text-isclub-navy" />
                </div>
                <span className="text-lg font-semibold text-isclub-navy">Led by Our Team</span>
              </div>
              
              <div className="space-y-3">
                {instructors.map((instructor, index) => (
                  <motion.div
                    key={instructor.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                  >
                    <div className="w-3 h-3 bg-isclub-teal rounded-full"></div>
                    <div>
                      <p className="font-semibold text-isclub-navy">{instructor.name}</p>
                      <p className="text-sm text-gray-600">{instructor.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                Our instructors guided participants through every step, from writing their first line of code to pushing projects on GitHub. A final test helped evaluate progress and boost confidence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-isclub-teal to-isclub-navy rounded-2xl blur opacity-20"></div>
              <div className="relative glass-card p-8 rounded-2xl text-center">
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
                  className="mb-6"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-isclub-teal to-isclub-navy rounded-full flex items-center justify-center shadow-2xl">
                    <Github className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-isclub-navy mb-4">
                  💻✨ More Than Learning
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  It was a vibrant coding experience full of discovery, teamwork, and tech excitement. Participants gained practical skills and real-world collaboration experience.
                </p>
                
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-center justify-center gap-2 text-sm text-isclub-teal font-medium">
                    <Code className="w-4 h-4" />
                    <span>Hands-on Coding</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-isclub-teal font-medium">
                    <Users className="w-4 h-4" />
                    <span>Collaborative Learning</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-isclub-teal font-medium">
                    <Github className="w-4 h-4" />
                    <span>Real-world Projects</span>
                  </div>
                </motion.div>
                
                <motion.a
                  href="/events"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg",
                    "bg-isclub-navy text-white font-medium",
                    "transition-all duration-300 hover:bg-isclub-teal hover:shadow-lg"
                  )}
                >
                  View More Events
                  <ChevronRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
