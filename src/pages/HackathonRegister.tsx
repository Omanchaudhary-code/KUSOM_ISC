
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Users, User, Upload, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const participantSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
});

const registrationSchema = z.object({
  team_name: z.string().min(2, 'Team name must be at least 2 characters'),
  leader_name: z.string().min(2, 'Leader name must be at least 2 characters'),
  leader_email: z.string().email('Invalid email address'),
  leader_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  team_size: z.number().min(2, 'Team must have at least 2 members').max(5, 'Team cannot exceed 5 members'),
  participants: z.array(participantSchema).min(2).max(5),
  vegetarian_count: z.number().min(0).max(5),
  payment_receipt: z.instanceof(File).optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function HackathonRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      team_name: '',
      leader_name: '',
      leader_email: '',
      leader_phone: '',
      team_size: 2,
      participants: [
        { full_name: '' },
        { full_name: '' },
      ],
      vegetarian_count: 0,
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
      for (let i = currentParticipants; i < size; i++) {
        append({ full_name: '' });
      }
    } else if (size < currentParticipants) {
      for (let i = currentParticipants - 1; i >= size; i--) {
        remove(i);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (validTypes.includes(file.type)) {
        setPaymentFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const uploadPaymentReceipt = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('payment-receipts')
      .upload(fileName, file);

    if (error) {
      console.error('File upload error:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('payment-receipts')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!paymentFile) {
      toast({
        title: "Payment receipt required",
        description: "Please upload your payment receipt to complete registration.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload payment receipt
      const paymentReceiptUrl = await uploadPaymentReceipt(paymentFile);
      
      // Prepare registration data
      const registrationData = {
        team_name: data.team_name,
        leader_name: data.leader_name,
        leader_email: data.leader_email,
        leader_phone: data.leader_phone,
        team_size: data.team_size,
        participants: data.participants,
        vegetarian_count: data.vegetarian_count,
        payment_receipt_url: paymentReceiptUrl,
      };

      // Insert into database
      const { error: insertError } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (insertError) {
        console.error('Registration error:', insertError);
        throw insertError;
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-confirmation-email', {
          body: {
            team_name: data.team_name,
            leader_name: data.leader_name,
            leader_email: data.leader_email,
            team_size: data.team_size,
          },
        });
      } catch (emailError) {
        console.warn('Email sending failed:', emailError);
        // Don't block registration if email fails
      }

      toast({
        title: "Registration Successful!",
        description: `Team "${data.team_name}" has been registered for Hack for Business. Check your email for confirmation.`,
      });

      // Navigate to success page after short delay
      setTimeout(() => {
        navigate('/register-success', { state: { teamName: data.team_name } });
      }, 2000);
      
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
              Hack for Business Registration
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-isclub-teal">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">June 21-23, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-isclub-gray">
                <MapPin className="w-5 h-5" />
                <span>Multi-purpose Hall, Kathmandu University</span>
              </div>
            </div>
            <p className="text-lg text-isclub-gray max-w-2xl mx-auto">
              Register your team for the most exciting 48-hour hackathon focusing on innovative business solutions.
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
                    <h2 className="text-2xl font-semibold text-isclub-dark">Team Information</h2>
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
                          <FormLabel>Number of Team Members</FormLabel>
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
                              {[2, 3, 4, 5].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                  {size} Members
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Team Leader Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-isclub-dark mb-4">Team Leader Information</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="leader_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Team leader's full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="leader_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="leader@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="leader_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Team leader's phone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Team Members Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="w-6 h-6 text-isclub-teal" />
                    <h2 className="text-2xl font-semibold text-isclub-dark">Team Members</h2>
                  </div>

                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 space-y-4"
                    >
                      <h3 className="text-lg font-medium text-isclub-dark">
                        Member {index + 1}
                      </h3>

                      <div className="grid md:grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name={`participants.${index}.full_name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Member's full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-isclub-dark">Additional Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="vegetarian_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of vegetarians in your team</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            max={teamSize}
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Payment Receipt Upload */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Receipt Upload *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-4">
                        Please pay via eSewa, Khalti, or IME Pay and upload the receipt here to complete registration.
                      </p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="payment-receipt"
                      />
                      <label
                        htmlFor="payment-receipt"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        Choose File
                      </label>
                      {paymentFile && (
                        <p className="mt-2 text-sm text-green-600">
                          Selected: {paymentFile.name}
                        </p>
                      )}
                    </div>
                  </div>
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
