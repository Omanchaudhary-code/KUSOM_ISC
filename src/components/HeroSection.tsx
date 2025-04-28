import { motion } from 'framer-motion';
import { ArrowDown, Terminal, Code, CircuitBoard, Cpu, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Funky tech background elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-isclub-light -z-10"></div>
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Circles with gradients */}
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
        ></motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl"
        ></motion.div>

        {/* Floating tech icons */}
        <div className="absolute inset-0 z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 - 50 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0.1 + Math.random() * 0.3
              }}
              animate={{
                y: [
                  `${parseFloat(Math.random() * 100 + "%")}`,
                  `${parseFloat(Math.random() * 100 + "%")}`,
                ],
                x: [
                  `${parseFloat(Math.random() * 100 - 50 + "%")}`, 
                  `${parseFloat(Math.random() * 100 - 50 + "%")}`
                ],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute"
            >
              {i % 5 === 0 && <Code className="w-8 h-8 text-isclub-teal/10" />}
              {i % 5 === 1 && <Terminal className="w-8 h-8 text-isclub-cyan/10" />}
              {i % 5 === 2 && <CircuitBoard className="w-8 h-8 text-isclub-teal/10" />}
              {i % 5 === 3 && <Cpu className="w-8 h-8 text-isclub-cyan/10" />}
              {i % 5 === 4 && <Database className="w-8 h-8 text-isclub-teal/10" />}
            </motion.div>
          ))}
        </div>

        {/* Animated circuit lines */}
        <svg className="absolute inset-0 w-full h-full z-0 opacity-5" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10,10 L50,10 L50,50 L90,50" stroke="currentColor" strokeWidth="1" fill="none" className="text-isclub-teal" />
            <path d="M50,50 L50,90 L90,90" stroke="currentColor" strokeWidth="1" fill="none" className="text-isclub-teal" />
            <path d="M50,10 C70,20 70,40 50,50" stroke="currentColor" strokeWidth="1" fill="none" className="text-isclub-cyan" />
            <circle cx="10" cy="10" r="2" className="text-isclub-teal fill-current" />
            <circle cx="50" cy="10" r="2" className="text-isclub-teal fill-current" />
            <circle cx="50" cy="50" r="2" className="text-isclub-cyan fill-current" />
            <circle cx="90" cy="50" r="2" className="text-isclub-teal fill-current" />
            <circle cx="50" cy="90" r="2" className="text-isclub-cyan fill-current" />
            <circle cx="90" cy="90" r="2" className="text-isclub-teal fill-current" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      <div className="container mx-auto max-w-5xl z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <span className="tech-badge mb-6">
            KUSOM Information Systems Club
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-isclub-dark leading-tight mb-6">
            <span className="block">Explore. Create.</span>
            <span className="bg-gradient-to-r from-isclub-teal to-isclub-cyan bg-clip-text text-transparent">Innovate.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-isclub-gray max-w-2xl mx-auto mb-10">
            A hub for students eager to explore the vast world of computing, design, coding, and web development.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/about"
              className={cn(
                "px-6 py-3 rounded-lg tech-gradient text-white font-medium",
                "transition-all duration-300 transform hover:translate-y-[-2px]",
                "shadow-tech hover:shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-isclub-teal/50"
              )}
            >
              Discover More
            </a>
            <a
              href="/focus-areas"
              className={cn(
                "px-6 py-3 rounded-lg bg-white text-isclub-dark font-medium",
                "border border-gray-200 hover:border-isclub-teal",
                "transition-all duration-300 hover:text-isclub-teal",
                "focus:outline-none focus:ring-2 focus:ring-gray-200"
              )}
            >
              Our Focus Areas
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <a 
          href="/about" 
          className="flex flex-col items-center text-sm text-isclub-gray hover:text-isclub-teal transition-colors"
        >
          <span className="mb-2">Explore More</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
