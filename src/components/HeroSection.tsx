
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ y, opacity }}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 -z-10"></div>
      
      {/* Enhanced Animated Background Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating binary numbers with improved responsiveness */}
        {[...Array(window.innerWidth > 1024 ? 20 : window.innerWidth > 640 ? 12 : 6)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-xs sm:text-sm lg:text-base font-mono text-isclub-teal/30 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -300, 0],
              opacity: [0, 0.7, 0],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          >
            {Math.random() > 0.5 ? '01010' : '10101'}
          </motion.div>
        ))}

        {/* Enhanced animated gradient orbs */}
        <motion.div 
          animate={{ 
            y: [0, -60, 0],
            x: [0, 40, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-teal-500/15 blur-3xl"
        />
        
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            x: [0, -50, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.5, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/3 left-1/6 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl"
        />

        {/* Tech particles orbiting with smoother animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techParticles.slice(0, window.innerWidth > 1024 ? 8 : window.innerWidth > 640 ? 6 : 4).map((particle, i) => {
            const Icon = particle.icon;
            const angle = (i * 360) / techParticles.length;
            const radius = window.innerWidth > 1024 ? 240 : window.innerWidth > 640 ? 180 : 140;
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
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay,
                }}
              >
                <motion.div
                  animate={{
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.4, 0.8, 0.4],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: particle.delay,
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-isclub-teal/50" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced grid pattern with pulse animation */}
        <div className="absolute inset-0 opacity-6">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(20, 184, 166, 0.25) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: 'clamp(30px, 5vw, 50px) clamp(30px, 5vw, 50px)',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px'],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
      
      {/* Main content container with enhanced entrance animation */}
      <div className="container mx-auto max-w-7xl z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-center space-y-6 sm:space-y-8 lg:space-y-10"
        >
          {/* Club badge with enhanced animation */}
          <motion.div 
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
            className="flex justify-center w-full"
          >
            <motion.span 
              className="inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium bg-gradient-to-r from-isclub-teal/10 to-isclub-cyan/10 text-isclub-teal rounded-full border border-isclub-teal/20 backdrop-blur-sm shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(20, 184, 166, 0.2)",
                transition: { duration: 0.2 }
              }}
              animate={{
                boxShadow: [
                  "0 0 0 rgba(20, 184, 166, 0.2)",
                  "0 0 20px rgba(20, 184, 166, 0.4)",
                  "0 0 0 rgba(20, 184, 166, 0.2)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              KUSOM Information Systems Club
            </motion.span>
          </motion.div>
          
          {/* Main heading with stagger animation */}
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
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                Explore. Create.
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-isclub-teal to-isclub-cyan bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
              >
                Innovate.
              </motion.span>
            </motion.h1>
          </div>
          
          {/* Description with typing effect */}
          <motion.p 
            className="text-isclub-gray max-w-4xl mx-auto px-4 leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: 'clamp(1.5rem, 3vw, 1.75rem)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            A hub for students eager to explore the vast world of computing, design, coding, and web development.
          </motion.p>

          {/* Event Countdown with enhanced container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="py-6 sm:py-8 lg:py-10"
          >
            <EventCountdown />
          </motion.div>

          {/* Enhanced Register Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="pt-6 sm:pt-8 lg:pt-10"
          >
            <motion.button
              className={cn(
                "relative rounded-lg tech-gradient text-white font-bold",
                "transition-all duration-300 transform overflow-hidden",
                "shadow-2xl hover:shadow-3xl border border-white/30",
                "focus:outline-none focus:ring-4 focus:ring-isclub-teal/30",
                "backdrop-blur-sm px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6",
                "text-base sm:text-lg md:text-xl tracking-wide"
              )}
              whileHover={{ 
                scale: 1.05,
                y: -4,
                boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)",
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="relative z-10 font-bold tracking-wide">Register Here</span>
              
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center space-y-2 text-isclub-gray/60"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
