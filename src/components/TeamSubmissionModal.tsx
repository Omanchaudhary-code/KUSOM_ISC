import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/utils/supabase';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface TeamSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamSubmissionModal({ isOpen, onClose }: TeamSubmissionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
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
      // Close the modal after 2 seconds on success
      setTimeout(() => {
        onClose();
      }, 2000);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">Team Submission</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Submit your team details to participate
                  </p>
                </div>


                {submitStatus ? (
                  <div
                    className={`rounded-md p-4 ${
                      submitStatus.success ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <p
                      className={`text-sm text-center ${
                        submitStatus.success ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label
                        htmlFor="teamName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Team Name *
                      </label>
                      <input
                        id="teamName"
                        type="text"
                        autoComplete="off"
                        className={`w-full px-3 py-2 border ${
                          errors.teamName ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        {...register('teamName')}
                        disabled={isSubmitting}
                      />
                      {errors.teamName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.teamName.message}
                        </p>
                      )}
                    </div>


                    <div>
                      <label
                        htmlFor="githubRepo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        GitHub Repository URL *
                      </label>
                      <input
                        id="githubRepo"
                        type="url"
                        autoComplete="off"
                        className={`w-full px-3 py-2 border ${
                          errors.githubRepo ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="https://github.com/username/repository"
                        {...register('githubRepo')}
                        disabled={isSubmitting}
                      />
                      {errors.githubRepo && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.githubRepo.message}
                        </p>
                      )}
                    </div>


                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
