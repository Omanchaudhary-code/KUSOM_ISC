
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const participantSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  college: z.string().min(2, 'College/University name is required'),
  year_of_study: z.string().min(1, 'Year of study is required'),
  major: z.string().min(2, 'Major/Field of study is required'),
  dietary_preference: z.enum(['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Other']),
});

const registrationSchema = z.object({
  team_name: z.string().min(2, 'Team name must be at least 2 characters'),
  team_size: z.number().min(1).max(5, 'Team size must be between 1 and 5'),
  participants: z.array(participantSchema).min(1).max(5),
  payment_receipt: z.instanceof(File, { message: 'Payment receipt is required' }),
  project_idea: z.string().min(10, 'Project idea must be at least 10 characters'),
  college_name: z.string().min(2, 'College name is required'),
  affiliated_university: z.string().min(2, 'Affiliated university is required'),
  alternate_contact: z.string().min(10, 'Alternate contact is required'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      team_name: '',
      team_size: 1,
      participants: [
        {
          full_name: '',
          email: '',
          phone: '',
          college: '',
          year_of_study: '',
          major: '',
          dietary_preference: 'Vegetarian',
        },
      ],
      project_idea: '',
      college_name: '',
      affiliated_university: '',
      alternate_contact: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'participants',
  });

  const teamSize = form.watch('team_size');

  // Adjust participants array when team size changes
  const handleTeamSizeChange = (size: number) => {
    const currentParticipants = fields.length;
    
    if (size > currentParticipants) {
      // Add new participants
      for (let i = currentParticipants; i < size; i++) {
        append({
          full_name: '',
          email: '',
          phone: '',
          college: '',
          year_of_study: '',
          major: '',
          dietary_preference: 'Vegetarian',
        });
      }
    } else if (size < currentParticipants) {
      // Remove excess participants
      for (let i = currentParticipants - 1; i >= size; i--) {
        remove(i);
      }
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    console.log('Form Data:', data);
    
    try {
      // Upload payment receipt first
      const fileExt = data.payment_receipt.name.split('.').pop();
      const fileName = `${data.team_name}-${Date.now()}.${fileExt}`;
      
      console.log('Uploading payment receipt:', fileName);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(fileName, data.payment_receipt);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Failed to upload payment receipt: ${uploadError.message}`);
      }

      console.log('Payment receipt uploaded successfully:', uploadData);

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('payment-receipts')
        .getPublicUrl(fileName);

      console.log('Payment receipt URL:', publicUrl);

      // Count vegetarian participants
      const vegetarianCount = data.participants.filter(p => p.dietary_preference === 'Vegetarian').length;

      // Prepare registration data for the registrations table
      const leader = data.participants[0]; // First participant is the leader
      const registrationData = {
        team_name: data.team_name,
        team_size: data.team_size,
        leader_name: leader.full_name,
        leader_email: leader.email,
        leader_phone: leader.phone,
        college_name: data.college_name,
        affiliated_university: data.affiliated_university,
        alternate_contact: data.alternate_contact,
        project_idea: data.project_idea,
        payment_receipt_url: publicUrl,
        vegetarian_count: vegetarianCount > 0 ? vegetarianCount : null,
        team_member_1: data.participants[1]?.full_name || null,
        team_member_2: data.participants[2]?.full_name || null,
        team_member_3: data.participants[3]?.full_name || null,
      };

      console.log('Inserting registration data:', registrationData);

      // Insert registration data
      const { error: registrationError } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (registrationError) {
        console.error('Registration insertion error:', registrationError);
        throw new Error(`Failed to register team: ${registrationError.message}`);
      }

      console.log('Registration completed successfully');
      
      toast({
        title: "Registration Successful!",
        description: `Team "${data.team_name}" has been registered successfully with ${data.team_size} member(s).`,
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20 pb-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-isclub-dark mb-4">
              Event Registration
            </h1>
            <p className="text-lg text-isclub-gray max-w-2xl mx-auto">
              Register your team for the upcoming KUSOM Information Systems Club event. Fill out the form below with your team details.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Team Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="w-6 h-6 text-isclub-teal" />
                    <h2 className="text-2xl font-semibold text-isclub-dark">Team Details</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="team_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your team name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="team_size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              const size = parseInt(value);
                              field.onChange(size);
                              handleTeamSizeChange(size);
                            }}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                  {size} {size === 1 ? 'Member' : 'Members'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="college_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter college name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="affiliated_university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Affiliated University</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter affiliated university" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="alternate_contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter alternate contact number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="payment_receipt"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Payment Receipt</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*,application/pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(file);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="project_idea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Idea</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-isclub-teal"
                            placeholder="Describe your project idea..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Participants Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="w-6 h-6 text-isclub-teal" />
                    <h2 className="text-2xl font-semibold text-isclub-dark">Participant Details</h2>
                  </div>

                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-isclub-dark">
                          Participant {index + 1} {index === 0 && '(Team Leader)'}
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`participants.${index}.full_name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`participants.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`participants.${index}.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`participants.${index}.college`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>College/University</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter college/university name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`participants.${index}.year_of_study`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year of Study</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1st Year">1st Year</SelectItem>
                                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                                  <SelectItem value="4th Year">4th Year</SelectItem>
                                  <SelectItem value="Masters">Masters</SelectItem>
                                  <SelectItem value="PhD">PhD</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`participants.${index}.major`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Field of Study / Major</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter field of study" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`participants.${index}.dietary_preference`}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Dietary Preference</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-wrap gap-4 mt-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Vegetarian" id={`veg-${index}`} />
                                    <label htmlFor={`veg-${index}`}>Vegetarian</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Non-Vegetarian" id={`non-veg-${index}`} />
                                    <label htmlFor={`non-veg-${index}`}>Non-Vegetarian</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Vegan" id={`vegan-${index}`} />
                                    <label htmlFor={`vegan-${index}`}>Vegan</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Other" id={`other-${index}`} />
                                    <label htmlFor={`other-${index}`}>Other</label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-3 bg-gradient-to-r from-isclub-teal to-isclub-cyan text-white font-semibold text-lg rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    {isSubmitting ? 'Submitting...' : 'Register Team'}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
