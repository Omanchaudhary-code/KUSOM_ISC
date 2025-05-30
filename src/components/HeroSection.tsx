
import { motion } from 'framer-motion';
import { ArrowDown, Terminal, Code, CircuitBoard, Cpu, Database, Zap, Rocket, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import EventCountdown from './EventCountdown';

export default function HeroSection() {
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Enhanced tech background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 -z-10"></div>
      
      {/* Dynamic animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating binary numbers */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-xs font-mono text-isclub-teal/25 select-none"
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

        {/* Enhanced pulsing circuit lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-circuit" width="150" height="150" patternUnits="userSpaceOnUse">
              <motion.path
                d="M30,30 L80,30 L80,80 L120,80"
                stroke="currentColor"
                strokeWidth="3"
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
                d="M80,80 L80,120 L120,120"
                stroke="currentColor"
                strokeWidth="3"
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
                cx="30"
                cy="30"
                r="4"
                className="text-isclub-teal fill-current"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 1, 0.6],
                  r: [3, 6, 3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="80"
                cy="80"
                r="4"
                className="text-blue-500 fill-current"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 1, 0.6],
                  r: [3, 6, 3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-circuit)" />
        </svg>

        {/* Enhanced animated gradient orbs */}
        <motion.div 
          animate={{ 
            y: [0, -60, 0],
            x: [0, 40, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.4, 1],
          }}
          transition={{ 
            duration: 16, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/25 via-blue-500/25 to-teal-500/25 blur-3xl"
        ></motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            x: [0, -50, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-teal-500/30 to-cyan-500/30 blur-3xl"
        ></motion.div>

        {/* Tech particles orbiting around center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techParticles.map((particle, i) => {
            const Icon = particle.icon;
            const angle = (i * 360) / techParticles.length;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  transformOrigin: '250px 0px',
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
                  <Icon className="w-8 h-8 text-isclub-teal/50" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced scanning beam effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
          style={{ width: '4px' }}
          animate={{
            x: ['-200px', 'calc(100vw + 200px)'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Enhanced grid pattern with animation */}
        <div className="absolute inset-0 opacity-8">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(20, 184, 166, 0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Enhanced floating hexagons */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute border-2 border-isclub-teal/30"
            style={{
              left: `${15 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: '50px',
              height: '50px',
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

        {/* Data stream lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-isclub-teal/40 to-transparent"
            style={{
              left: 0,
              right: 0,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <motion.span 
            className="tech-badge mb-8"
            animate={{
              boxShadow: [
                '0 0 0 rgba(20, 184, 166, 0.3)',
                '0 0 25px rgba(20, 184, 166, 0.7)',
                '0 0 0 rgba(20, 184, 166, 0.3)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            KUSOM Information Systems Club
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-isclub-dark leading-tight mb-8">
            <motion.span 
              className="block"
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
            className="text-lg md:text-xl text-isclub-gray max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A hub for students eager to explore the vast world of computing, design, coding, and web development.
          </motion.p>

          {/* Integrated Event Countdown with added spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-16"
          >
            <EventCountdown />
          </motion.div>
          
          {/* Explore More button with better spacing and visibility */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href="/about"
              className={cn(
                "px-10 py-5 rounded-lg tech-gradient text-white font-medium text-lg",
                "transition-all duration-300 transform relative overflow-hidden",
                "shadow-2xl hover:shadow-3xl border border-white/20",
                "focus:outline-none focus:ring-2 focus:ring-isclub-teal/50",
                "backdrop-blur-sm"
              )}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
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
              <span className="relative z-10 font-semibold tracking-wide">Discover More</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator with better positioning */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a 
          href="/about" 
          className="flex flex-col items-center text-sm text-isclub-gray hover:text-isclub-teal transition-colors group"
          whileHover={{ y: -5 }}
        >
          <motion.span 
            className="mb-3 relative font-medium"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Explore More
          </motion.span>
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="w-5 h-5 group-hover:text-isclub-teal transition-colors" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
