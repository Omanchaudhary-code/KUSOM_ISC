
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Terminal, Code, CircuitBoard, Cpu, Database, Zap, Rocket, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import EventCountdown from './EventCountdown';
import { useEffect } from 'react';

export default function HeroSection() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Tech particles data
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

  useEffect(() => {
    // Ensure smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 pb-8"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ y, opacity }}
    >
      {/* Enhanced Tech-Themed Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 -z-10"></div>
      
      {/* Enhanced Animated Background Layers with Tech Theme */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Circuit Board Pattern */}
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

        {/* Floating tech elements with improved responsiveness */}
        {[...Array(window.innerWidth > 1024 ? 25 : window.innerWidth > 640 ? 15 : 8)].map((_, i) => (
          <motion.div
            key={`tech-${i}`}
            className="absolute text-xs sm:text-sm lg:text-base font-mono text-isclub-teal/20 select-none"
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

        {/* Enhanced animated gradient orbs with tech glow */}
        <motion.div 
          animate={{ 
            y: [0, -80, 0],
            x: [0, 60, 0],
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.6, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 blur-3xl"
        />
        
        <motion.div 
          animate={{ 
            y: [0, 70, 0],
            x: [0, -70, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.8, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/3 left-1/6 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] rounded-full bg-gradient-to-r from-teal-500/25 to-cyan-500/25 blur-3xl"
        />

        {/* Tech particles orbiting with enhanced animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techParticles.slice(0, window.innerWidth > 1024 ? 8 : window.innerWidth > 640 ? 6 : 4).map((particle, i) => {
            const Icon = particle.icon;
            const angle = (i * 360) / techParticles.length;
            const radius = window.innerWidth > 1024 ? 280 : window.innerWidth > 640 ? 200 : 160;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  transformOrigin: `${radius}px 0px`,
                }}
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay,
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

        {/* Enhanced grid pattern with tech pulse */}
        <div className="absolute inset-0 opacity-8">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(20, 184, 166, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: 'clamp(25px, 4vw, 45px) clamp(25px, 4vw, 45px)',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '45px 45px'],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
      
      {/* Main content container with enhanced entrance animation */}
      <div className="container mx-auto max-w-7xl z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-center space-y-6 sm:space-y-8 lg:space-y-10"
        >
          {/* Main heading with enhanced stagger animation */}
          <div className="space-y-4">
            <motion.h1 
              className="font-display font-bold text-isclub-dark leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                lineHeight: 'clamp(3rem, 9vw, 6.5rem)'
              }}
            >
              <motion.span 
                className="block mb-2 sm:mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              >
                Explore. Create.
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-isclub-teal to-isclub-cyan bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
              >
                Innovate.
              </motion.span>
            </motion.h1>
          </div>
          
          {/* Description with enhanced entrance */}
          <motion.p 
            className="text-isclub-gray max-w-4xl mx-auto px-4 leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 'clamp(1.5rem, 3vw, 1.75rem)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            A hub for students eager to explore the vast world of computing, design, coding, and web development.
          </motion.p>

          {/* Event Countdown with enhanced container */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="py-6 sm:py-8 lg:py-10"
          >
            <EventCountdown />
          </motion.div>

          {/* Enhanced Register Button - Made more prominent */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="pt-6 sm:pt-8 lg:pt-10"
          >
            <motion.button
              className={cn(
                "relative rounded-lg tech-gradient text-white font-bold",
                "transition-all duration-300 transform overflow-hidden",
                "shadow-2xl hover:shadow-3xl border border-white/30",
                "focus:outline-none focus:ring-4 focus:ring-isclub-teal/30",
                "backdrop-blur-sm px-10 py-5 sm:px-12 sm:py-6 md:px-16 md:py-7",
                "text-lg sm:text-xl md:text-2xl tracking-wide"
              )}
              whileHover={{ 
                scale: 1.08,
                y: -6,
                boxShadow: "0 25px 50px rgba(20, 184, 166, 0.5)",
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="relative z-10 font-bold tracking-wide">Register Here</span>
              
              {/* Enhanced animated border */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.15), transparent)',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center space-y-2 text-isclub-gray/70"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
