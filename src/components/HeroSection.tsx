import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Code, CircuitBoard, Cpu, Database, Zap, Rocket, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import EventCountdown from './EventCountdown';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function HeroSection() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 md:pt-20 pb-8">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40 -z-10"></div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Background animation */}
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

        {/* Floating particles */}
        {[...Array(typeof window !== 'undefined' && window.innerWidth > 1024 ? 25 : 10)].map((_, i) => (
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

        {/* Glowing orbs */}
        <motion.div 
          animate={{ y: [0, -80, 0], x: [0, 60, 0], opacity: [0.1, 0.7, 0.1], scale: [1, 1.6, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 70, 0], x: [0, -70, 0], opacity: [0.1, 0.6, 0.1], scale: [1, 1.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/6 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] rounded-full bg-gradient-to-r from-teal-500/25 to-cyan-500/25 blur-3xl"
        />

        {/* Orbiting icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techParticles.map((particle, i) => {
            const Icon = particle.icon;
            const angle = (i * 360) / techParticles.length;
            const radius = 250;
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{ transformOrigin: `${radius}px 0px` }}
                animate={{ rotate: [angle, angle + 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: particle.delay }}
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

      {/* Content wrapper — animated Y applied here instead of section */}
      <motion.div
        className="container mx-auto max-w-7xl z-10 w-full text-center space-y-6 sm:space-y-8 lg:space-y-10"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="space-y-4 md:space-y-6">
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
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 10 } }}
            >
              Innovate.
            </motion.span>
          </motion.h1>
        </div>

        <motion.p
          className="text-isclub-gray max-w-4xl mx-auto px-4 leading-relaxed mb-6 md:mb-8"
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
      </motion.div>
    </section>
  );
}
