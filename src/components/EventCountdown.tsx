
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';

const calculateTimeLeft = () => {
  const targetDate = new Date('2025-06-06T00:00:00');
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col items-center mt-8"
    >
      <div className="flex items-center gap-2 mb-4 text-isclub-teal">
        <Timer className="w-6 h-6" />
        <span className="text-lg font-medium">Next Major Event</span>
      </div>
      
      <div className="flex gap-4 sm:gap-6">
        {timeUnits.map(({ label, value }) => (
          <motion.div
            key={label}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg tech-gradient flex items-center justify-center text-white text-2xl sm:text-3xl font-bold"
                animate={{
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0 0 0 rgba(45, 212, 191, 0.4)",
                    "0 0 20px rgba(45, 212, 191, 0.2)",
                    "0 0 0 rgba(45, 212, 191, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {value.toString().padStart(2, '0')}
              </motion.div>
            </div>
            <span className="mt-2 text-sm text-isclub-gray font-medium">{label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EventCountdown;
