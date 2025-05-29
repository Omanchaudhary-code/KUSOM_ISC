
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, MapPin, Calendar } from 'lucide-react';

const calculateTimeLeft = () => {
  const targetDate = new Date('2025-06-20T00:00:00');
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isFinished: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isFinished: false,
  };
};

const EventCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  // Enhanced code snippets for hackathon vibe
  const codeSnippets = ['</>','{}','[]','()','if','var','let','const','=>','{...}','map()','filter()','async','npm','git','API','JSON','React','Node','SQL','AI','ML','Web3','()=>','&&','||','===','!==','++','--','typeof','return','import','export','class','function','await'];
  
  // Matrix characters for rain effect
  const matrixChars = ['0','1','ア','カ','サ','タ','ナ','ハ','マ','ヤ','ラ','ワ','$','#','@','%','&','*','+','=','~'];

  if (timeLeft.isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="flex flex-col items-center mt-8"
      >
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6"
        >
          <Calendar className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <motion.h3
            animate={{
              background: [
                "linear-gradient(45deg, #10b981, #059669)",
                "linear-gradient(45deg, #059669, #047857)",
                "linear-gradient(45deg, #047857, #10b981)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4"
          >
            🎉 Event Happening Now! 🎉
          </motion.h3>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
            className="flex items-center justify-center gap-2 text-lg text-emerald-700 mb-2"
          >
            <MapPin className="w-6 h-6" />
            <span className="font-semibold">Kathmandu University, Dhulikhel</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-emerald-600 font-medium"
          >
            Venue: Multi-purpose Hall
          </motion.p>
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-4 text-sm text-gray-600"
        >
          Join us for an amazing experience!
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col items-center mt-8 relative overflow-hidden"
    >
      {/* Enhanced Animated Background Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Matrix Rain Effect */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`matrix-${i}`}
            className="absolute text-xs font-mono text-isclub-teal/25 select-none"
            style={{
              left: `${5 + i * 8}%`,
              top: "-20%",
            }}
            animate={{
              y: ["0%", "150%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          >
            {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
          </motion.div>
        ))}

        {/* Pulsing Grid Lines */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`grid-line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-isclub-teal/15 to-transparent"
              style={{
                top: `${10 + i * 6}%`,
                left: 0,
                right: 0,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scaleX: [0, 1, 0],
                background: [
                  "linear-gradient(to right, transparent, rgba(20, 184, 166, 0.15), transparent)",
                  "linear-gradient(to right, transparent, rgba(20, 184, 166, 0.3), transparent)",
                  "linear-gradient(to right, transparent, rgba(20, 184, 166, 0.15), transparent)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Vertical Grid Lines */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`v-grid-line-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-isclub-teal/15 to-transparent"
              style={{
                left: `${15 + i * 8}%`,
                top: 0,
                bottom: 0,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-isclub-teal/20"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0, 0.4, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced Floating Code Particles */}
        {codeSnippets.map((code, index) => (
          <motion.div
            key={`code-${index}`}
            className="absolute text-xs font-mono text-isclub-teal/25 select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.7, 0],
              rotate: [0, 360, 720],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          >
            {code}
          </motion.div>
        ))}

        {/* Glowing Energy Orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-isclub-teal/30 to-blue-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
              boxShadow: [
                "0 0 0 rgba(20, 184, 166, 0)",
                "0 0 30px rgba(20, 184, 166, 0.6)",
                "0 0 0 rgba(20, 184, 166, 0)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Scanning Lines Effect */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            style={{
              left: 0,
              right: 0,
              top: `${20 + i * 30}%`,
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Hexagonal Pattern */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute w-8 h-8 border border-isclub-teal/20"
            style={{
              left: `${20 + i * 12}%`,
              top: `${40 + Math.random() * 20}%`,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Glitch Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`glitch-${i}`}
            className="absolute h-px bg-red-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
            }}
            animate={{
              opacity: [0, 1, 0, 1, 0],
              x: [0, 5, -5, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: 3 + Math.random() * 7,
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-6 text-isclub-teal relative z-10">
        <Timer className="w-6 h-6" />
        <span className="text-lg font-medium">Next Major Event</span>
      </div>
      
      <div className="flex gap-4 sm:gap-6 relative z-10">
        <AnimatePresence mode="wait">
          {timeUnits.map(({ label, value }, index) => (
            <motion.div
              key={label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <div className="relative">
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg tech-gradient flex items-center justify-center text-white text-2xl sm:text-3xl font-bold relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(45, 212, 191, 0.4)",
                      "0 0 30px rgba(45, 212, 191, 0.6)",
                      "0 0 0 rgba(45, 212, 191, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    key={value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {value.toString().padStart(2, '0')}
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
              
              <motion.span
                animate={{
                  color: ["#64748B", "#14B8A6", "#64748B"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-2 text-sm font-medium"
              >
                {label}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center relative z-10"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center gap-2 text-gray-600"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Kathmandu University, Dhulikhel</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EventCountdown;
