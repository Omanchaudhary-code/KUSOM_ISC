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
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    }
  ];

  return (
    <section id="events" className="section-padding bg-white px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-isclub-teal bg-isclub-blue-light/50 rounded-full">
            What's Happening
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Our Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for our exciting lineup of workshops, seminars, and networking events designed to enhance your technical skills and expand your professional connections.
          </p>
        </motion.div>
        
        <div className="space-y-12">
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
                "flex flex-col md:flex-row gap-8 rounded-xl overflow-hidden",
                "bg-white border border-gray-100 shadow-sm",
                "transition-all duration-300 hover:shadow-xl"
              )}>
                <div className="md:w-1/3 overflow-hidden">
                  <div className="h-full overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy" 
                    />
                  </div>
                </div>
                
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-isclub-teal mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{event.date} • {event.time}</span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-3 group-hover:text-isclub-teal transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {event.description}
                    </p>
                    
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-4 items-center">
                    <Link 
                      to={`/events/${event.id}`}
                      className={cn(
                        "px-5 py-2 rounded-lg text-sm font-medium",
                        "bg-isclub-teal text-white",
                        "transition-all duration-300 hover:bg-isclub-navy"
                      )}
                    >
                      Learn More
                    </Link>
                    
                    <button 
                      className={cn(
                        "px-5 py-2 rounded-lg text-sm font-medium",
                        "bg-isclub-blue-light text-isclub-teal",
                        "transition-all duration-300 hover:bg-isclub-blue-light/70"
                      )}
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
