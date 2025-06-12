import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Users, User, Upload, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  college_name: z.string().min(2, 'College name must be at least 2 characters'),
  affiliated_university: z.string().min(2, 'Affiliated university name must be at least 2 characters'),
  leader_name: z.string().min(2, 'Leader name must be at least 2 characters'),
  leader_email: z.string().email('Invalid email address'),
  leader_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  alternate_contact: z.string().min(10, 'Alternate contact number must be at least 10 digits'),
  team_size: z.number().min(1, 'Team must have at least 1 member').max(4, 'Team cannot exceed 4 members'),
  participants: z.array(participantSchema).min(0).max(3),
  vegetarian_count: z.number().min(0, 'Minimum 0 vegetarians').max(4, 'Maximum 4 vegetarians allowed'),
  project_idea: z.string().min(10, 'Project idea must be at least 10 characters'),
  payment_receipt: z.instanceof(File).optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function HackathonRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [teamCount, setTeamCount] = useState<number>(0);
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isTracksOpen, setIsTracksOpen] = useState(false);


  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      team_name: '',
      leader_name: '',
      leader_email: '',
      leader_phone: '',
      team_size: 2,
      participants: [{ full_name: '' }],
      vegetarian_count: 0,
      project_idea: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'participants',
  });

  const teamSize = form.watch('team_size');
  const leaderEmail = form.watch('leader_email');
  const leaderPhone = form.watch('leader_phone');

  // Check team count and registration status
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        // Get current team count
        const { data: countData, error: countError } = await supabase.rpc('get_team_count');
        
        if (countError) {
          console.error('Error fetching team count:', countError);
        } else {
          setTeamCount(countData || 0);
          setIsRegistrationClosed(countData >= 25);
        }

        // Check if already registered (from localStorage)
        const registeredEmail = localStorage.getItem('hackathon_registered_email');
        const registeredPhone = localStorage.getItem('hackathon_registered_phone');
        
        if (registeredEmail || registeredPhone) {
          setAlreadyRegistered(true);
        }
      } catch (error) {
        console.error('Error checking registration status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkRegistrationStatus();
  }, []);

  // Check for duplicate registration when email/phone changes
  useEffect(() => {
    const checkDuplicateRegistration = async () => {
      if (!leaderEmail && !leaderPhone) return;

      try {
        const { data, error } = await supabase
          .from('registrations')
          .select('id')
          .or(`leader_email.eq.${leaderEmail},leader_phone.eq.${leaderPhone}`)
          .limit(1);

        if (error) {
          console.error('Error checking duplicate:', error);
          return;
        }

        if (data && data.length > 0) {
          setAlreadyRegistered(true);
          // Store in localStorage for future visits
          if (leaderEmail) localStorage.setItem('hackathon_registered_email', leaderEmail);
          if (leaderPhone) localStorage.setItem('hackathon_registered_phone', leaderPhone);
        }
      } catch (error) {
        console.error('Error checking duplicate registration:', error);
      }
    };

    const timeoutId = setTimeout(checkDuplicateRegistration, 500);
    return () => clearTimeout(timeoutId);
  }, [leaderEmail, leaderPhone]);

  // Adjust participants array when team size changes
  const handleTeamSizeChange = (size: number) => {
    const requiredParticipants = size - 1; // Subtract 1 for the leader
    const currentParticipants = fields.length;
    
    if (requiredParticipants > currentParticipants) {
      for (let i = currentParticipants; i < requiredParticipants; i++) {
        append({ full_name: '' });
      }
    } else if (requiredParticipants < currentParticipants) {
      for (let i = currentParticipants - 1; i >= requiredParticipants; i--) {
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
      
      // Prepare registration data with individual team member columns
      const registrationData = {
        team_name: data.team_name,
        college_name: data.college_name,
        affiliated_university: data.affiliated_university,
        leader_name: data.leader_name,
        leader_email: data.leader_email,
        leader_phone: data.leader_phone,
        alternate_contact: data.alternate_contact,
        team_size: data.team_size,
        team_member_1: data.participants[0]?.full_name || null,
        team_member_2: data.participants[1]?.full_name || null,
        team_member_3: data.participants[2]?.full_name || null,
        vegetarian_count: data.vegetarian_count,
        project_idea: data.project_idea,
        payment_receipt_url: paymentReceiptUrl,
      };

      // Insert into database
      const { error: insertError } = await supabase
        .from('registrations')
        .insert([registrationData]);

      if (insertError) {
        console.error('Registration error:', insertError);
        if (insertError.code === '23505') {
          toast({
            title: "Registration Failed",
            description: "This email, phone number, or team name has already been registered.",
            variant: "destructive",
          });
          return;
        }
        throw insertError;
      }

      // Store registration info in localStorage
      localStorage.setItem('hackathon_registered_email', data.leader_email);
      localStorage.setItem('hackathon_registered_phone', data.leader_phone);

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
        navigate('/register-success', { 
          state: { 
            teamName: data.team_name,
            collegeName: data.college_name,
            affiliatedUniversity: data.affiliated_university,
            alternateContact: data.alternate_contact
          } 
        });
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

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20 pb-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-isclub-teal mx-auto"></div>
              <p className="mt-4 text-isclub-gray">Loading registration status...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (alreadyRegistered) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20 pb-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-3xl font-display font-bold text-isclub-dark mb-4">
                  Already Registered
                </h1>
                <p className="text-lg text-isclub-gray">
                  You have already registered your team for Hack for Business hackathon.
                </p>
                <Button
                  onClick={() => navigate('/')}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-isclub-teal to-isclub-cyan text-white font-semibold rounded-lg"
                >
                  Go to Homepage
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isRegistrationClosed) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-20 pb-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-display font-bold text-isclub-dark mb-4">
                  Registrations Closed
                </h1>
                <p className="text-lg text-isclub-gray mb-4">
                  Registrations are now closed. All 25 team slots have been filled.
                </p>
                <p className="text-isclub-gray">
                  Thank you for your interest in Hack for Business hackathon!
                </p>
                <Button
                  onClick={() => navigate('/')}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-isclub-teal to-isclub-cyan text-white font-semibold rounded-lg"
                >
                  Go to Homepage
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            
            {/* Team slots remaining indicator */}
            {/* <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-orange-800 font-semibold text-lg">
                Hurry! Only {25 - teamCount} slots remaining!
              </p>
            </div> */}
            {/* <div className="flex justify-center mb-6">
          <Button onClick={() => setIsTracksOpen(true)} variant="outline">
                 View Hackathon Tracks
          </Button>
          </div> */}
          <div className="text-center mb-6">
  <Button
    onClick={() => setIsTracksOpen(true)}
    className="bg-teal-500 hover:bg-teal-600 text-white"
  >
    View Hackathon Tracks
  </Button>
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
                      name="college_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your college name" {...field} />
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
                          <FormLabel>Affiliated University Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your affiliated university" {...field} />
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
                          <FormLabel>Select total number of team members (including the team leader)</FormLabel>
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
                              {[2, 3, 4].map((size) => (
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

                      <FormField
                        control={form.control}
                        name="alternate_contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number of a Team Member Other Than the Leader *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter alternate contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Team Members Section */}
                {fields.length > 0 && (
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
                          Member {index + 2}
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
                )}

                {/* Additional Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-isclub-dark">Additional Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="vegetarian_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Vegetarians in Your Team</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          value={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of vegetarians" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map((count) => (
                              <SelectItem key={count} value={count.toString()}>
                                {count} {count === 1 ? 'vegetarian' : 'vegetarians'}
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
                    name="project_idea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Idea *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe your project idea..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* eSewa QR Code */}
                  <div className="space-y-4">
                    <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-isclub-dark mb-4">Payment via eSewa</h3>
                      <div className="flex justify-center mb-4">
                        <img 
                          src="/lovable-uploads/c9b58623-b56d-4a65-8277-a231f763dc4e.png" 
                          alt="eSewa QR Code for payment" 
                          className="w-48 h-48 object-contain border-2 border-white rounded-lg shadow-lg"
                        />
                      </div>
                      <p className="text-sm text-gray-700 font-medium">
                        Scan to pay: Unique Poudel – 9741744983 (eSewa)
                      </p>
                    </div>
                  </div>

                  {/* Payment Receipt Upload */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Receipt Upload *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-4">
                        Please pay via eSewa using the QR code above and upload the receipt here to complete registration.
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
     {isTracksOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
      <button
        onClick={() => setIsTracksOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold text-orange-600 mb-4">
        📢 Hackathon Tracks — Choose Your Focus Area!
      </h2>

      <p className="text-gray-700 mb-4">
        We’re excited to share the four main tracks for the hackathon. These are the focus areas where you can build your projects:
      </p>

      <ul className="list-disc list-outside pl-6 text-gray-800 text-sm mb-4">
        <li><strong>Artificial Intelligence and Machine Learning</strong></li>
        <li><strong>Blockchain and Decentralized Applications</strong></li>
        <li><strong>Sustainability and Green Technology</strong></li>
        <li><strong>Open Innovation and Collaboration</strong></li>
      </ul>

      <p className="text-gray-700 text-sm">
        Let’s innovate and build something impactful together!
      </p>

      <div className="border-t mt-4 pt-2 text-sm text-gray-600">
        <p><code>Best Regards,</code></p>
        <p className="font-semibold">Hackathon Organizing Team</p>
      </div>

      <button
        onClick={() => setIsTracksOpen(false)}
        className="text-blue-600 hover:underline mt-4 text-sm"
      >
        [Hide Details]
      </button>
    </div>
  </div>
)}


    </div>
  );
}
