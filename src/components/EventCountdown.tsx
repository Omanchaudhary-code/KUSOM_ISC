
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

  if (timeLeft.isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="flex flex-col items-center mt-4 sm:mt-8 px-4"
      >
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 sm:mb-8 shadow-2xl"
        >
          <Calendar className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
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
            transition={{ duration: 4, repeat: Infinity }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6"
          >
            🎉 Event Happening Now! 🎉
          </motion.h3>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", bounce: 0.6 }}
            className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl text-emerald-700 mb-2 sm:mb-3"
          >
            <MapPin className="w-5 h-5 sm:w-7 sm:h-7" />
            <span className="font-semibold">Kathmandu University, Dhulikhel</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-emerald-600 font-medium text-base sm:text-lg"
          >
            Venue: Multi-purpose Hall
          </motion.p>
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600"
        >
          Join us for an amazing experience!
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="flex flex-col items-center mt-4 sm:mt-8 relative px-4"
    >
      <motion.div 
        className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8 text-isclub-teal relative z-10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Timer className="w-5 h-5 sm:w-7 sm:h-7" />
        </motion.div>
        <span className="text-base sm:text-xl font-medium text-center">Business Hackathon 2025</span>
      </motion.div>
      
      <div className="flex gap-3 sm:gap-6 md:gap-8 relative z-10 w-full max-w-sm sm:max-w-none justify-center">
        <AnimatePresence mode="wait">
          {timeUnits.map(({ label, value }, index) => (
            <motion.div
              key={label}
              className="flex flex-col items-center flex-1 sm:flex-none"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.8,
                type: "spring",
                bounce: 0.4
              }}
              whileHover={{ 
                scale: 1.1,
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <div className="relative">
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl tech-gradient flex items-center justify-center text-white text-lg sm:text-2xl md:text-3xl font-bold relative overflow-hidden shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(45, 212, 191, 0.3)",
                      "0 0 40px rgba(45, 212, 191, 0.8)",
                      "0 0 0 rgba(45, 212, 191, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    key={value}
                    initial={{ y: -30, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 30, opacity: 0, scale: 0.5 }}
                    transition={{ 
                      duration: 0.6,
                      type: "spring",
                      bounce: 0.3
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {value.toString().padStart(2, '0')}
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{
                      x: [-120, 120],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Corner accents */}
                  <motion.div
                    className="absolute top-1 left-1 w-2 h-2 sm:w-3 sm:h-3 border-l-2 border-t-2 border-white/30"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1 right-1 w-2 h-2 sm:w-3 sm:h-3 border-r-2 border-b-2 border-white/30"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
              
              <motion.span
                animate={{
                  color: ["#64748B", "#14B8A6", "#0891B2", "#14B8A6", "#64748B"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold tracking-wide text-center"
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
        transition={{ delay: 1.2 }}
        className="mt-4 sm:mt-8 text-center relative z-10"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center gap-2 sm:gap-3 text-gray-600"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
          <span className="text-sm sm:text-base font-medium">Kathmandu University, Dhulikhel</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EventCountdown;
