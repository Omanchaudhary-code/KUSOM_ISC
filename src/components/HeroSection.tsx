
import { motion } from 'framer-motion';
import { ArrowDown, Terminal, Code, CircuitBoard, Cpu, Database, Zap, Rocket, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import EventCountdown from './EventCountdown';

export default function HeroSection() {
  const navigate = useNavigate();

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

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 pb-8">
      {/* Enhanced tech background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 -z-10"></div>
      
      {/* Dynamic animated background elements - responsive */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating binary numbers - responsive count and positioning */}
        {[...Array(window.innerWidth > 1024 ? 25 : window.innerWidth > 640 ? 15 : 8)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-xs sm:text-sm lg:text-base font-mono text-isclub-teal/20 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 10 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          >
            {Math.random() > 0.5 ? '01010' : '10101'}
          </motion.div>
        ))}

        {/* Enhanced pulsing circuit lines - responsive sizing */}
        <svg className="absolute inset-0 w-full h-full opacity-8 sm:opacity-12 lg:opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-circuit" width="80" height="80" patternUnits="userSpaceOnUse" className="sm:w-24 sm:h-24 lg:w-32 lg:h-32">
              <motion.path
                d="M20,20 L60,20 L60,60 L80,60"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-isclub-teal sm:stroke-2"
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-circuit)" />
        </svg>

        {/* Enhanced animated gradient orbs - fully responsive */}
        <motion.div 
          animate={{ 
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 14, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 sm:from-purple-500/15 sm:via-blue-500/15 sm:to-teal-500/15 lg:from-purple-500/20 lg:via-blue-500/20 lg:to-teal-500/20 blur-2xl sm:blur-3xl"
        ></motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            x: [0, -40, 0],
            opacity: [0.15, 0.4, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/3 left-1/6 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] rounded-full bg-gradient-to-r from-teal-500/15 to-cyan-500/15 sm:from-teal-500/20 sm:to-cyan-500/20 lg:from-teal-500/25 lg:to-cyan-500/25 blur-2xl sm:blur-3xl"
        ></motion.div>

        {/* Tech particles orbiting - responsive sizing and count */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techParticles.slice(0, window.innerWidth > 1024 ? 8 : window.innerWidth > 640 ? 6 : 4).map((particle, i) => {
            const Icon = particle.icon;
            const angle = (i * 360) / techParticles.length;
            const radius = window.innerWidth > 1024 ? 220 : window.innerWidth > 640 ? 160 : 120;
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
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay,
                }}
              >
                <motion.div
                  animate={{
                    scale: [0.7, 1.2, 0.7],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: particle.delay,
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-isclub-teal/40" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced grid pattern - responsive sizing */}
        <div className="absolute inset-0 opacity-4 sm:opacity-6 lg:opacity-8">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(20, 184, 166, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: 'clamp(25px, 4vw, 40px) clamp(25px, 4vw, 40px)',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Floating hexagons - responsive count and sizing */}
        {[...Array(window.innerWidth > 1024 ? 10 : window.innerWidth > 640 ? 6 : 4)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute border-2 border-isclub-teal/20 sm:border-isclub-teal/25 lg:border-isclub-teal/30"
            style={{
              left: `${15 + i * (window.innerWidth > 1024 ? 8 : window.innerWidth > 640 ? 12 : 16)}%`,
              top: `${15 + (i % 3) * 25}%`,
              width: 'clamp(20px, 3vw, 45px)',
              height: 'clamp(20px, 3vw, 45px)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.7, 1.3, 0.7],
              opacity: [0.2, 0.6, 0.2],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>
      
      {/* Main content container - responsive and centered */}
      <div className="container mx-auto max-w-7xl z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-6 sm:space-y-8 lg:space-y-10"
        >
          {/* Club badge - properly centered and responsive */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center w-full"
          >
            <span className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium bg-primary/10 text-primary rounded-full border border-primary/20 max-w-full text-center leading-tight">
              KUSOM Information Systems Club
            </span>
          </motion.div>
          
          {/* Main heading - fully responsive typography */}
          <h1 className="font-display font-bold text-isclub-dark leading-tight" style={{
            fontSize: 'clamp(2rem, 8vw, 6rem)',
            lineHeight: 'clamp(2.5rem, 9vw, 6.5rem)'
          }}>
            <motion.span 
              className="block mb-2 sm:mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore. Create.
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-isclub-teal to-isclub-cyan bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
            >
              Innovate.
            </motion.span>
          </h1>
          
          {/* Description - responsive typography and spacing */}
          <motion.p 
            className="text-isclub-gray max-w-4xl mx-auto px-4 leading-relaxed"
            style={{
              fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
              lineHeight: 'clamp(1.25rem, 3vw, 1.75rem)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A hub for students eager to explore the vast world of computing, design, coding, and web development.
          </motion.p>

          {/* Event Countdown - responsive spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="py-4 sm:py-6 lg:py-8"
          >
            <EventCountdown />
          </motion.div>

          {/* Register Button - responsive sizing and spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-4 sm:pt-6 lg:pt-8"
          >
            <motion.button
              className={cn(
                "rounded-lg tech-gradient text-white font-semibold",
                "transition-all duration-300 transform relative overflow-hidden",
                "shadow-xl hover:shadow-2xl border border-white/20",
                "focus:outline-none focus:ring-2 focus:ring-isclub-teal/50",
                "backdrop-blur-sm w-full max-w-xs sm:max-w-sm md:w-auto"
              )}
              style={{
                padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(2rem, 6vw, 4rem)',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
              }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                boxShadow: "0 15px 35px rgba(20, 184, 166, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
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
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
