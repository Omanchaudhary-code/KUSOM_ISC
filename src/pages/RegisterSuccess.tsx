
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RegisterSuccess() {
  const location = useLocation();
  const teamName = location.state?.teamName || 'Your Team';
  const collegeName = location.state?.collegeName || 'Not provided';
  const affiliatedUniversity = location.state?.affiliatedUniversity || 'Not provided';
  const alternateContact = location.state?.alternateContact || 'Not provided';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20 pb-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-isclub-dark mb-4">
              Registration Successful!
            </h1>
            
            <p className="text-xl text-isclub-gray mb-8">
              Team "<span className="font-semibold text-isclub-teal">{teamName}</span>" has been successfully registered for Hack for Business.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-semibold text-isclub-dark mb-6">Event Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-isclub-teal">
                  <Calendar className="w-6 h-6" />
                  <span className="text-lg font-medium">June 21-23, 2025</span>
                </div>
                
                <div className="flex items-center justify-center gap-3 text-isclub-gray">
                  <MapPin className="w-6 h-6" />
                  <span className="text-lg">Multi-purpose Hall, Kathmandu University Central Campus</span>
                </div>
                
                <div className="flex items-center justify-center gap-3 text-isclub-gray">
                  <Users className="w-6 h-6" />
                  <span className="text-lg">48 Hours of Innovation & Competition</span>
                </div>

                <div className="flex items-center justify-center gap-3 text-isclub-gray">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg">College: {collegeName}</span>
                </div>

                <div className="flex items-center justify-center gap-3 text-isclub-gray">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21v-1m4-4h-4.33m-4.33V4.33A4 4 0 1112 4v14a4 4 0 004.33 4.33m0 0H4m0 0V8m8-8h4.33m-4.33v4.33A4 4 0 0012 8v14a4 4 0 004.33 4.33m0 0H4m0 0v-1m4-4h4.33m-4.33V4.33A4 4 0 0112 4z" />
                  </svg>
                  <span className="text-lg">Affiliated University: {affiliatedUniversity}</span>
                </div>

                <div className="flex items-center justify-center gap-3 text-isclub-gray">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg">Alternate Contact: {alternateContact}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 rounded-lg p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-isclub-dark mb-3">What's Next?</h3>
              <ul className="text-left space-y-2 text-isclub-gray">
                <li>• You'll receive a confirmation email with further details</li>
                <li>• Keep an eye on your email for event updates and instructions</li>
                <li>• Start brainstorming innovative business solutions</li>
                <li>• Prepare for an exciting 48-hour challenge!</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
              <Link to="/events">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-isclub-teal to-isclub-cyan">
                  View All Events
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
