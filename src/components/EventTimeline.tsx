
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import EventCountdown from './EventCountdown';

const events = [
  {
    id: "business-hackathon",
    title: "Business Hackathon",
    date: "June 6-8, 2025",
    time: "48 Hours",
    location: "Multipurpose Hall, KU",
    description: "Join us for an exciting 48-hour hackathon where teams will compete to develop innovative business solutions. This event brings together creative minds, entrepreneurs, and tech enthusiasts to solve real-world business challenges.",
    imageUrl: "https://i.imgur.com/08Qg0fr_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    highlights: [
      "Cash prizes worth $5000",
      "Networking opportunities",
      "Expert mentorship",
      "Free workshops",
    ]
  }
];

export default function EventTimeline() {
  return (
    <section className="section-padding px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-isclub-teal/10"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-emerald-600 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200">
            Featured Event
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Business Hackathon 2025
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get ready for the most anticipated business and technology event of the year
          </p>

          <EventCountdown />
        </motion.div>
        
        <div className="mt-16">
          {events.map((event) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-isclub-navy">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {event.description}
                    </p>
                    
                    <div className="space-y-3 text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-isclub-teal" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-isclub-teal" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-isclub-teal" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-medium text-isclub-navy">Event Highlights:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
                        {event.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/events/${event.id}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-isclub-teal text-white hover:bg-isclub-navy transition-colors duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

