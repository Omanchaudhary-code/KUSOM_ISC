
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Define event type for better type safety
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
};

export default function EventsSection() {
  const events: Event[] = [
    {
      id: "web-dev-workshop",
      title: "Web Development Workshop",
      date: "30th March, 2025 onwards",
      time: "12:00 PM - 3:00 PM",
      location: "Computer Lab, Block 10",
      description: "Learn the fundamentals of modern web development with AI.",
      imageUrl: "https://i.imgur.com/wMJkWRA.jpeg"
    },
    {
      id: "design-thinking",
      title: "Hack for Business",
      date: "June 21-23, 2025",
      time: "48 Hours",
      location: "Multi-purpose Hall, KU",
      description: "Join us for a 48-hour hackathon where teams will compete to build innovative solutions to real-world problems.",
      imageUrl: "https://i.imgur.com/08Qg0fr_d.jpeg?maxwidth=520&shape=thumb&fidelity=high"
    }
  ];

  return (
    <section id="events" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header - responsive typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 text-sm sm:text-base font-medium text-isclub-teal bg-isclub-blue-light/50 rounded-full">
            What's Happening
          </span>
          
          <h2 className="font-display font-bold mb-4 sm:mb-6" style={{
            fontSize: 'clamp(1.875rem, 5vw, 3rem)',
            lineHeight: 'clamp(2.25rem, 5.5vw, 3.5rem)'
          }}>
            Our Events
          </h2>
          
          <p className="text-gray-600 max-w-4xl mx-auto" style={{
            fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
            lineHeight: 'clamp(1.375rem, 2.5vw, 1.75rem)'
          }}>
            Join us for our exciting lineup of workshops, seminars, and networking events designed to enhance your technical skills and expand your professional connections.
          </p>
        </motion.div>
        
        {/* Events Grid - responsive layout */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className={cn(
                "grid md:grid-cols-5 lg:grid-cols-3 gap-6 sm:gap-8 rounded-xl overflow-hidden",
                "bg-white border border-gray-100 shadow-sm",
                "transition-all duration-300 hover:shadow-xl"
              )}>
                {/* Image Section - responsive sizing */}
                <div className="md:col-span-2 lg:col-span-1 overflow-hidden">
                  <div className="h-64 sm:h-80 md:h-full overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy" 
                    />
                  </div>
                </div>
                
                {/* Content Section - responsive spacing and typography */}
                <div className="md:col-span-3 lg:col-span-2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Date and Time */}
                    <div className="flex items-center text-isclub-teal mb-4 sm:mb-6">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      <span className="font-medium" style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                      }}>{event.date} • {event.time}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-display font-bold mb-3 sm:mb-4 group-hover:text-isclub-teal transition-colors" style={{
                      fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                      lineHeight: 'clamp(1.5rem, 3.5vw, 2rem)'
                    }}>
                      {event.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed" style={{
                      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                      lineHeight: 'clamp(1.375rem, 2vw, 1.5rem)'
                    }}>
                      {event.description}
                    </p>
                    
                    {/* Location */}
                    <div className="text-gray-500 flex items-center" style={{
                      fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)'
                    }}>
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons - responsive layout */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link 
                      to={`/events/${event.id}`}
                      className={cn(
                        "inline-flex items-center justify-center rounded-lg font-medium",
                        "bg-isclub-teal text-white",
                        "transition-all duration-300 hover:bg-isclub-navy hover:scale-105",
                        "focus:outline-none focus:ring-2 focus:ring-isclub-teal/50"
                      )}
                      style={{
                        padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.25rem, 2.5vw, 1.5rem)',
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                      }}
                    >
                      Learn More
                    </Link>
                    
                    <button 
                      className={cn(
                        "inline-flex items-center justify-center rounded-lg font-medium",
                        "bg-isclub-blue-light text-isclub-teal border border-isclub-teal/20",
                        "transition-all duration-300 hover:bg-isclub-blue-light/70 hover:scale-105",
                        "focus:outline-none focus:ring-2 focus:ring-isclub-teal/50"
                      )}
                      style={{
                        padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.25rem, 2.5vw, 1.5rem)',
                        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)'
                      }}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
