
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Code, CircuitBoard, Cpu, Database, Zap, Rocket, Brain, ArrowRight, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import EventCountdown from './EventCountdown';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

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

      {/* Main Content Container with Glassmorphism */}
      <motion.div
        className="container mx-auto max-w-6xl z-10 w-full"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Hero Content Card */}
        <motion.div
          className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-isclub-teal/5 rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-8">
            {/* Main Headline */}
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                className="font-display font-bold text-isclub-dark leading-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                  lineHeight: 'clamp(3rem, 9vw, 6rem)'
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

            {/* Subtitle */}
            <motion.p
              className="text-isclub-gray max-w-3xl mx-auto leading-relaxed"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                lineHeight: 'clamp(1.6rem, 3vw, 2rem)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              A hub for students eager to explore the vast world of computing, design, coding, and web development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate('/events')}
                  className="group relative bg-gradient-to-r from-isclub-teal to-isclub-cyan hover:from-isclub-teal/90 hover:to-isclub-cyan/90 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Join Our Events
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate('/about')}
                  variant="outline"
                  className="group bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-isclub-dark font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Learn More
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats or Features */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              {[
                { icon: Code, label: "Coding Workshops", value: "Weekly" },
                { icon: Users, label: "Active Members", value: "200+" },
                { icon: Rocket, label: "Projects Built", value: "50+" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-gradient-to-r from-isclub-teal/20 to-isclub-cyan/20 backdrop-blur-sm">
                      <stat.icon className="w-6 h-6 text-isclub-teal" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-isclub-dark">{stat.value}</div>
                  <div className="text-sm text-isclub-gray font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
