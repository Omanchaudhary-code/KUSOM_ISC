
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header - responsive typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-sm sm:text-base font-medium text-isclub-blue bg-isclub-blue-light/50 rounded-full">
            Get In Touch
          </span>
          
          <h2 className="font-display font-bold mb-4 sm:mb-6" style={{
            fontSize: 'clamp(1.875rem, 5vw, 3rem)',
            lineHeight: 'clamp(2.25rem, 5.5vw, 3.5rem)'
          }}>
            Contact Us
          </h2>
          
          <p className="text-gray-600 max-w-4xl mx-auto" style={{
            fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
            lineHeight: 'clamp(1.375rem, 2.5vw, 1.75rem)'
          }}>
            Have questions or want to join IS Club? We'd love to hear from you! Reach out to us through any of the channels below.
          </p>
        </motion.div>

        {/* Contact Grid - responsive layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Email */}
              <div className="flex items-start space-x-4 sm:space-x-6">
                <div className="bg-isclub-blue-light/70 p-3 sm:p-4 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-isclub-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium mb-2" style={{
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                  }}>Email Us</h3>
                  <p className="text-gray-600 mb-3" style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                  }}>For general inquiries and membership info</p>
                  <a 
                    href="mailto:informationsystemclub@kusom.edu.np" 
                    className="text-isclub-blue hover:underline break-all"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                    }}
                  >
                    informationsystemclub@kusom.edu.np
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 sm:space-x-6">
                <div className="bg-isclub-blue-light/70 p-3 sm:p-4 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-isclub-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium mb-2" style={{
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                  }}>Call Us</h3>
                  <p className="text-gray-600 mb-3" style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                  }}>Sunday to Friday, 7AM - 2PM</p>
                  <a 
                    href="tel:+9779840037381" 
                    className="text-isclub-blue hover:underline"
                    style={{
                      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                    }}
                  >
                    +977 9840037381
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 sm:space-x-6">
                <div className="bg-isclub-blue-light/70 p-3 sm:p-4 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-isclub-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium mb-2" style={{
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                  }}>Visit Us</h3>
                  <p className="text-gray-600 mb-3" style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                  }}>Find us at the KU Central Campus</p>
                  <p className="text-isclub-dark" style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                  }}>
                    Block 10, KU Central Campus, Dhulikhel
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Google Map - responsive sizing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{
              height: 'clamp(300px, 50vw, 450px)'
            }}>
              <iframe
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=department of management, informatics and communication&amp;t=h&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="IS Club Location"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
