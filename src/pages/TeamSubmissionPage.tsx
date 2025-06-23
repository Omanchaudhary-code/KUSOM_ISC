import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/utils/supabase';
import { ArrowLeft, ArrowRight, Clock, AlertCircle, CheckCircle, Github, Loader2, Rocket, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Define form schema with validation
const formSchema = z.object({
  teamName: z.string().min(1, 'Team name is required').max(100, 'Team name is too long'),
  githubRepo: z.string()
    .min(1, 'GitHub repository URL is required')
    .url('Please enter a valid URL')
    .refine(
      (url) => url.includes('github.com'),
      'Please enter a valid GitHub repository URL'
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function TeamSubmissionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isWithinTimeWindow, setIsWithinTimeWindow] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const navigate = useNavigate();

  // Set up the time window (9:30 AM to 10:00 AM today)
  const startTime = new Date();
  startTime.setHours(9, 30, 0, 0);
  
  const endTime = new Date();
  endTime.setHours(10, 0, 0, 0);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Check if current time is within the allowed window
      const isWithinWindow = now >= startTime && now < endTime;
      setIsWithinTimeWindow(isWithinWindow);
      
      // Calculate time left for the countdown or until window opens
      if (now < startTime) {
        // Time until window opens
        const diff = startTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s until submissions open`);
      } else if (now < endTime) {
        // Time until window closes
        const diff = endTime.getTime() - now.getTime();
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`Closes in ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Submission window has ended');
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Double check time window on submission
    if (!isWithinTimeWindow) {
      setSubmitStatus({
        success: false,
        message: 'Submissions are only accepted between 9:30 AM and 10:00 AM today.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase
        .from('participants')
        .insert([
          {
            team_name: data.teamName,
            github_repo: data.githubRepo,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      setSubmitStatus({
        success: true,
        message: 'Submission successful! Thank you for participating.',
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to submit. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <main className="flex-grow relative py-12 px-4 sm:px-6 lg:px-8">
        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-fuchsia-900/20 to-pink-900/20" />
          
          {/* Animated blobs */}
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-20"
            animate={{
              x: [0, 40, 0],
              y: [0, 40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-20"
            animate={{
              x: [0, -40, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 relative z-10"
          >
            {/* Time Window Banner */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                'p-5 rounded-2xl shadow-lg flex items-start gap-4 transition-all duration-300',
                isWithinTimeWindow 
                  ? 'bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30 border border-purple-500/20 text-purple-100' 
                  : currentTime < startTime
                  ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 text-blue-100'
                  : 'bg-gradient-to-r from-red-900/30 to-pink-900/30 border border-red-500/20 text-red-100',
                'backdrop-blur-lg border-opacity-30 shadow-lg hover:shadow-xl transition-all duration-300'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-full bg-white/50 dark:bg-black/20">
                  {isWithinTimeWindow ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : currentTime < startTime ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {isWithinTimeWindow 
                      ? 'Submissions are open! 🎉' 
                      : currentTime < startTime 
                      ? 'Submissions open soon' 
                      : 'Submissions are now closed'}
                  </p>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">{timeLeft}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-800/60 rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20 backdrop-blur-lg"
          style={{
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
            background: 'linear-gradient(145deg, rgba(76, 29, 149, 0.2) 0%, rgba(192, 38, 211, 0.15) 100%)',
            borderWidth: '1px'
          }}
        >
          <div className="relative overflow-hidden">
            {/* Subtle noise texture */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29-22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                backgroundSize: '100px 100px'
              }}
            />
            <div className="p-6 sm:p-8 md:p-10">
              <div className="text-center mb-10">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 mb-6"
                >
                  <Github className="w-9 h-9 text-purple-300" />
                </motion.div>
                <motion.h2 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200 mb-3"
                >
                  Project Submission
                </motion.h2>
                <motion.p 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-purple-100/80 text-lg max-w-lg mx-auto leading-relaxed"
                >
                  Enter your project details for final submission
                </motion.p>
              </div>

              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-xl border ${
                      submitStatus.success 
                        ? 'bg-green-900/20 border-green-500/20 text-green-100' 
                        : 'bg-red-900/20 border-red-500/20 text-red-100'
                    }`}
                  >
                    <div className="flex items-start">
                      {submitStatus.success ? (
                        <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="teamName"
                      className="block text-sm font-medium text-purple-100"
                    >
                      Team Name
                    </label>
                    <span className="text-xs text-purple-300/80">Required</span>
                  </div>
                  <div className="relative">
                    <input
                      id="teamName"
                      type="text"
                      autoComplete="off"
                      className={cn(
                        'block w-full px-4 py-3.5 rounded-lg border-0',
                        'focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-0',
                        'transition-all duration-200 text-white placeholder-purple-300/60',
                        'bg-purple-900/40 backdrop-blur-sm',
                        errors.teamName 
                          ? 'ring-2 ring-red-400/50' 
                          : 'focus:ring-2 focus:ring-purple-400/50',
                        isSubmitting && 'opacity-70 cursor-not-allowed',
                        'shadow-inner shadow-purple-900/30'
                      )}
                      placeholder="Enter your team name"
                      {...register('teamName')}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.teamName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-sm text-red-300 font-medium flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errors.teamName.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="githubRepo"
                      className="block text-sm font-medium text-purple-100"
                    >
                      GitHub Repository URL
                    </label>
                    <span className="text-xs text-purple-300/80">Required</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Github className="h-5 w-5 text-purple-400/80" />
                    </div>
                    <input
                      id="githubRepo"
                      type="url"
                      autoComplete="off"
                      className={cn(
                        'block w-full pl-10 pr-4 py-3.5 rounded-lg border-0',
                        'focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-0',
                        'transition-all duration-200 text-white placeholder-purple-300/60',
                        'bg-purple-900/40 backdrop-blur-sm',
                        errors.githubRepo 
                          ? 'ring-2 ring-red-400/50' 
                          : 'focus:ring-2 focus:ring-purple-400/50',
                        isSubmitting && 'opacity-70 cursor-not-allowed',
                        'shadow-inner shadow-purple-900/30'
                      )}
                      placeholder="https://github.com/username/repository"
                      {...register('githubRepo')}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.githubRepo ? (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 text-sm text-red-300 font-medium flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errors.githubRepo.message}
                    </motion.p>
                  ) : (
                    <p className="mt-2 text-xs text-purple-300/60">
                      Make sure your repository is public and accessible
                    </p>
                  )}
                </div>

                <motion.div 
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    type="submit"
                    disabled={!isWithinTimeWindow || isSubmitting}
                    className={cn(
                      'w-full flex justify-center items-center py-4 px-6 rounded-xl text-base font-medium text-white',
                      'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-purple-400/50',
                      'transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]',
                      'shadow-lg relative overflow-hidden group',
                      isWithinTimeWindow 
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-600/90 hover:to-fuchsia-600/90'
                        : 'bg-gradient-to-r from-gray-500/60 to-gray-600/60 cursor-not-allowed',
                      isSubmitting ? 'opacity-80 cursor-wait' : 'opacity-100',
                      'backdrop-blur-sm border border-purple-400/20'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : isWithinTimeWindow ? (
                      <>
                        <span className="relative z-10 flex items-center gap-2">
                          <span>Submit Team</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {currentTime < startTime ? (
                          <>
                            <Clock className="w-4 h-4" />
                            <span>Submissions Open Soon</span>
                          </>
                        ) : (
                          <span>Submissions Closed</span>
                        )}
                      </span>
                    )}
                  </button>
                </motion.div>
              </form>
              
              <div className="mt-10 text-center">
                <motion.div 
                  className="inline-flex"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link 
                    to="/" 
                    className={cn(
                      'inline-flex items-center text-sm font-medium text-purple-200 hover:text-white',
                      'transition-all duration-200 group',
                      'px-4 py-2.5 rounded-lg hover:bg-purple-900/40',
                      isSubmitting && 'pointer-events-none opacity-70'
                    )}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    Back to Home
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
