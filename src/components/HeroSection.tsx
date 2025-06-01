
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-16">
      {/* Enhanced tech background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 -z-10"></div>
      
      {/* Dynamic animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating binary numbers - responsive count */}
        {[...Array(typeof window !== 'undefined' && window.innerWidth > 768 ? 25 : 15)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-xs sm:text-sm font-mono text-isclub-teal/25 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -250, 0],
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

        {/* Enhanced pulsing circuit lines - responsive */}
        <svg className="absolute inset-0 w-full h-full opacity-10 sm:opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <motion.path
                d="M20,20 L60,20 L60,60 L80,60"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-isclub-teal"
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0.4, 1, 0.4],
                  strokeWidth: [2, 4, 2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d="M60,60 L60,80 L80,80"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-500"
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0.4, 1, 0.4],
                  strokeWidth: [2, 4, 2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="20"
                cy="20"
                r="3"
                className="text-isclub-teal fill-current"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 1, 0.6],
                  r: [2, 5, 2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-circuit)" />
        </svg>

        {/* Enhanced animated gradient orbs - responsive sizing */}
        <motion.div 
          animate={{ 
            y: [0, -60, 0],
            x: [0, 40, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-teal-500/15 sm:from-purple-500/25 sm:via-blue-500/25 sm:to-teal-500/25 blur-3xl"
        ></motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            x: [0, -50, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/3 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 sm:from-teal-500/30 sm:to-cyan-500/30 blur-3xl"
        ></motion.div>

        {/* Tech particles orbiting around center - responsive sizing */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techParticles.map((particle, i) => {
            const Icon = particle.icon;
            const angle = (i * 360) / techParticles.length;
            const radius = typeof window !== 'undefined' && window.innerWidth > 768 ? 250 : 150;
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
                    scale: [0.8, 1.4, 0.8],
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
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-isclub-teal/50" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced grid pattern with animation - responsive sizing */}
        <div className="absolute inset-0 opacity-5 sm:opacity-8">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(20, 184, 166, 0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Enhanced floating hexagons - responsive count and sizing */}
        {[...Array(typeof window !== 'undefined' && window.innerWidth > 768 ? 12 : 6)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute border-2 border-isclub-teal/30"
            style={{
              left: `${15 + i * (typeof window !== 'undefined' && window.innerWidth > 768 ? 8 : 12)}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: typeof window !== 'undefined' && window.innerWidth > 768 ? '50px' : '30px',
              height: typeof window !== 'undefined' && window.innerWidth > 768 ? '50px' : '30px',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.4, 0.8],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -30, 0],
              borderWidth: [2, 4, 2],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-7xl z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Club badge with proper alignment */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8 lg:mb-12 flex justify-center"
          >
            <span className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium bg-primary/10 text-primary rounded-full border border-primary/20 max-w-full whitespace-nowrap">
              KUSOM Information Systems Club
            </span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-isclub-dark leading-tight">
            <motion.span 
              className="block mb-2 sm:mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore. Create.
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-isclub-teal to-isclub-cyan bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
            >
              Innovate.
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-isclub-gray max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A hub for students eager to explore the vast world of computing, design, coding, and web development.
          </motion.p>

          {/* Event Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="my-8 sm:my-12"
          >
            <EventCountdown />
          </motion.div>

          {/* Register Here Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 sm:mt-12"
          >
            <motion.button
              className={cn(
                "px-8 py-3 sm:px-12 sm:py-4 lg:px-16 lg:py-5 rounded-lg tech-gradient text-white font-semibold text-base sm:text-lg lg:text-xl",
                "transition-all duration-300 transform relative overflow-hidden",
                "shadow-2xl hover:shadow-3xl border border-white/20",
                "focus:outline-none focus:ring-2 focus:ring-isclub-teal/50",
                "backdrop-blur-sm w-full max-w-xs sm:max-w-sm md:w-auto"
              )}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
