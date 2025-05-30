
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Plus, Minus, Users, Mail, User, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const participantSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  college: z.string().min(2, 'College/University name is required'),
  yearOfStudy: z.string().min(1, 'Year of study is required'),
  fieldOfStudy: z.string().min(2, 'Field of study is required'),
  tshirtSize: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  dietaryPreference: z.enum(['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Other']),
});

const registrationSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
  teamSize: z.number().min(1).max(5, 'Team size must be between 1 and 5'),
  participants: z.array(participantSchema).min(1).max(5),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      teamName: '',
      teamSize: 1,
      participants: [
        {
          fullName: '',
          email: '',
          phone: '',
          college: '',
          yearOfStudy: '',
          fieldOfStudy: '',
          tshirtSize: 'M',
          dietaryPreference: 'Vegetarian',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'participants',
  });

  const teamSize = form.watch('teamSize');

  // Adjust participants array when team size changes
  const handleTeamSizeChange = (size: number) => {
    const currentParticipants = fields.length;
    
    if (size > currentParticipants) {
      // Add new participants
      for (let i = currentParticipants; i < size; i++) {
        append({
          fullName: '',
          email: '',
          phone: '',
          college: '',
          yearOfStudy: '',
          fieldOfStudy: '',
          tshirtSize: 'M',
          dietaryPreference: 'Vegetarian',
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
      // TODO: Replace with actual backend API call
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Your team has been registered successfully. You'll receive a confirmation email shortly.",
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
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
                      name="teamName"
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
                      name="teamSize"
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
                  </div>
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
                          name={`participants.${index}.fullName`}
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
                          name={`participants.${index}.yearOfStudy`}
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
                          name={`participants.${index}.fieldOfStudy`}
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
                          name={`participants.${index}.tshirtSize`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>T-Shirt Size</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="XS">XS</SelectItem>
                                  <SelectItem value="S">S</SelectItem>
                                  <SelectItem value="M">M</SelectItem>
                                  <SelectItem value="L">L</SelectItem>
                                  <SelectItem value="XL">XL</SelectItem>
                                  <SelectItem value="XXL">XXL</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`participants.${index}.dietaryPreference`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dietary Preference</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-wrap gap-4 mt-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Vegetarian" id={`veg-${index}`} />
                                    <Label htmlFor={`veg-${index}`}>Vegetarian</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Non-Vegetarian" id={`non-veg-${index}`} />
                                    <Label htmlFor={`non-veg-${index}`}>Non-Vegetarian</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Vegan" id={`vegan-${index}`} />
                                    <Label htmlFor={`vegan-${index}`}>Vegan</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Other" id={`other-${index}`} />
                                    <Label htmlFor={`other-${index}`}>Other</Label>
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
