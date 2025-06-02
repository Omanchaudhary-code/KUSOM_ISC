
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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-br from-isclub-blue-light/30 to-white px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header - responsive typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base font-medium text-isclub-teal bg-white/70 backdrop-blur-sm rounded-full border border-isclub-teal/20">
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            Recent Workshop Highlight
          </span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold text-isclub-navy leading-tight"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              lineHeight: 'clamp(1.75rem, 4.5vw, 3rem)'
            }}
          >
            🚀 Web Development from Scratch
          </motion.h2>
        </motion.div>

        {/* Main Content Grid - responsive layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column - Workshop Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Overview Card */}
            <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-isclub-teal/10 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-isclub-teal" />
                </div>
                <span className="font-semibold text-isclub-navy" style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                }}>Workshop Overview</span>
              </div>
              
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed" style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                lineHeight: 'clamp(1.375rem, 2vw, 1.5rem)'
              }}>
                We recently organized an exciting Web Development Workshop where <strong>over 10 enthusiastic participants</strong> explored the foundations of the web from the ground up. Beyond the basics, we introduced popular frameworks, clean coding practices, and hands-on GitHub collaboration.
              </p>

              {/* Skills Tags - responsive grid */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium bg-isclub-teal/10 text-isclub-teal rounded-full border border-isclub-teal/20 text-center"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Instructors Card */}
            <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-isclub-navy/10 rounded-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-isclub-navy" />
                </div>
                <span className="font-semibold text-isclub-navy" style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                }}>Led by Our Team</span>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {instructors.map((instructor, index) => (
                  <motion.div
                    key={instructor.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/50 rounded-lg"
                  >
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-isclub-teal rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-isclub-navy truncate" style={{
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                      }}>{instructor.name}</p>
                      <p className="text-gray-600" style={{
                        fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)'
                      }}>{instructor.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-gray-600 mt-4 sm:mt-6 leading-relaxed" style={{
                fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
                lineHeight: 'clamp(1.125rem, 1.75vw, 1.375rem)'
              }}>
                Our instructors guided participants through every step, from writing their first line of code to pushing projects on GitHub. A final test helped evaluate progress and boost confidence.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-isclub-teal to-isclub-navy rounded-xl sm:rounded-2xl blur opacity-20"></div>
              <div className="relative glass-card p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl text-center">
                {/* Animated Icon */}
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
                  className="mb-6 sm:mb-8"
                >
                  <div 
                    className="mx-auto bg-gradient-to-br from-isclub-teal to-isclub-navy rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                      width: 'clamp(4rem, 8vw, 6rem)',
                      height: 'clamp(4rem, 8vw, 6rem)'
                    }}
                  >
                    <Github 
                      className="text-white"
                      style={{
                        width: 'clamp(2rem, 4vw, 3rem)',
                        height: 'clamp(2rem, 4vw, 3rem)'
                      }}
                    />
                  </div>
                </motion.div>
                
                <h3 className="font-bold text-isclub-navy mb-4 sm:mb-6" style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  lineHeight: 'clamp(1.5rem, 3.5vw, 2rem)'
                }}>
                  💻✨ More Than Learning
                </h3>
                
                <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                  lineHeight: 'clamp(1.375rem, 2vw, 1.5rem)'
                }}>
                  It was a vibrant coding experience full of discovery, teamwork, and tech excitement. Participants gained practical skills and real-world collaboration experience.
                </p>
                
                {/* Feature List - responsive spacing */}
                <motion.div
                  className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {[
                    { icon: Code, text: 'Hands-on Coding' },
                    { icon: Users, text: 'Collaborative Learning' },
                    { icon: Github, text: 'Real-world Projects' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-center gap-2 sm:gap-3 text-isclub-teal font-medium" style={{
                      fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)'
                    }}>
                      <item.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </motion.div>
                
                {/* CTA Button - responsive sizing */}
                <motion.a
                  href="/events"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "inline-flex items-center gap-2 sm:gap-3 rounded-lg",
                    "bg-isclub-navy text-white font-medium",
                    "transition-all duration-300 hover:bg-isclub-teal hover:shadow-lg",
                    "w-full sm:w-auto justify-center"
                  )}
                  style={{
                    padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                  }}
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
