import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/utils/supabase';

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

export default function ParticipantRegistrationForm() {
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
        message: 'Registration successful! Thank you for participating.',
      });
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to submit registration. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Team Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Register your team for the event by filling out the form below.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {submitStatus && (
            <div
              className={`mb-4 p-4 rounded-md ${
                submitStatus.success ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <p
                className={`text-sm ${
                  submitStatus.success ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {submitStatus.message}
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-medium text-gray-700"
              >
                Team Name *
              </label>
              <div className="mt-1">
                <input
                  id="teamName"
                  type="text"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.teamName ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  {...register('teamName')}
                />
                {errors.teamName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.teamName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="githubRepo"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub Repository URL *
              </label>
              <div className="mt-1">
                <input
                  id="githubRepo"
                  type="url"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.githubRepo ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="https://github.com/username/repository"
                  {...register('githubRepo')}
                />
                {errors.githubRepo && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.githubRepo.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Register Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
