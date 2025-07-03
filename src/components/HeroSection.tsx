import { motion } from 'framer-motion';
import { Terminal, Code, CircuitBoard, Cpu, Database, Zap, Rocket, Brain, ArrowRight, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const navigate = useNavigate();

  const techParticles = [
    { icon: Code, delay: 0 },
    { icon: Terminal, delay: 0.2 },
    { icon: CircuitBoard, delay: 0.4 },
    { icon: Cpu, delay: 0.6 },
    { icon: Database, delay: 0.8 },
    { icon: Zap, delay: 1.0 },
    { icon: Rocket, delay: 1.2 },
    { icon: Brain, delay: 1.4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Keep Existing Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 -z-10"></div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating code particles */}
        {[...Array(typeof window !== 'undefined' && window.innerWidth > 1024 ? 25 : 10)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute text-xs sm:text-sm lg:text-base font-mono text-isclub-teal/20 select-none pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -400, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          >
            {Math.random() > 0.7 ? '<>' : Math.random() > 0.5 ? '01010' : '{}'}
          </motion.div>
        ))}

        {/* Glowing orbs */}
        <motion.div 
          animate={{ 
            y: [0, -80, 0], 
            x: [0, 60, 0], 
            opacity: [0.1, 0.7, 0.1], 
            scale: [1, 1.6, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 70, 0], 
            x: [0, -70, 0], 
            opacity: [0.1, 0.6, 0.1], 
            scale: [1, 1.8, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/6 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] rounded-full bg-gradient-to-r from-teal-500/25 to-cyan-500/25 blur-3xl"
        />

        {/* Orbiting tech icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techParticles.map((particle, i) => {
            const Icon = particle.icon;
            const angle = (i * 360) / techParticles.length;
            const radius = 250;
            return (
              <motion.div
                key={`orbit-${i}`}
                className="absolute"
                style={{ transformOrigin: `${radius}px 0px` }}
                animate={{ rotate: [angle, angle + 360] }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear", 
                  delay: particle.delay 
                }}
              >
                <motion.div
                  animate={{
                    scale: [0.6, 1.5, 0.6],
                    opacity: [0.3, 0.9, 0.3],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: particle.delay,
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-isclub-teal/60" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Content - Redesigned from scratch */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center space-y-8 md:space-y-12">
          
          {/* Hero Headlines */}
          <div className="space-y-6">
            <motion.h1 
              className="font-display font-bold text-isclub-dark tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: 'clamp(2.8rem, 7.5vw, 6.5rem)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="block">Explore. Create.</span>
              <span className="block bg-gradient-to-r from-isclub-teal to-isclub-cyan bg-clip-text text-transparent">
                Innovate.
              </span>
            </motion.h1>

            <motion.p 
              className="text-isclub-gray max-w-4xl mx-auto font-medium leading-relaxed"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                lineHeight: 'clamp(1.75rem, 3.5vw, 2.25rem)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              A hub for students eager to explore the vast world of computing, design, coding, and web development.
            </motion.p>
          </div>

          {/* Call-to-Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Button
              onClick={() => navigate('/events')}
              className="group relative bg-gradient-to-r from-isclub-teal to-isclub-cyan hover:from-isclub-teal/90 hover:to-isclub-cyan/90 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Join Our Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Button>

            <Button
              onClick={() => navigate('/about')}
              variant="outline"
              className="bg-white/80 hover:bg-white/90 backdrop-blur-sm border-2 border-isclub-gray/20 hover:border-isclub-teal/30 text-isclub-dark font-semibold px-8 py-4 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Learn More
              </span>
            </Button>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mt-16 pt-12 border-t border-isclub-gray/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            {[
              { icon: Code, label: "Coding Workshops", value: "Monthly" },
              { icon: Users, label: "Active Members", value: "20+" },
              { icon: Rocket, label: "Events Planned", value: "10+" }
            ].map((stat, index) => (
              <div key={`stat-${index}`} className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-isclub-teal/10 to-isclub-cyan/10 border border-isclub-teal/20">
                    <stat.icon className="w-8 h-8 text-isclub-teal" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-isclub-dark">{stat.value}</div>
                  <div className="text-isclub-gray font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
