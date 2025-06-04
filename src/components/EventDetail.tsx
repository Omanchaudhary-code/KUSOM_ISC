
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Award, ExternalLink } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type EventDetailProps = {
  events: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    imageUrl: string;
    longDescription?: string;
    speakers?: Array<{
      name: string;
      role: string;
      imageUrl: string;
    }>;
    schedule?: Array<{
      time: string;
      activity: string;
    }>;
    targetAudience?: string;
    prerequisites?: string[];
  }[];
};

export default function EventDetail({ events }: EventDetailProps) {
  const { eventId } = useParams();
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <Link to="/events" className="text-isclub-teal hover:underline">
          Back to all events
        </Link>
      </div>
    );
  }

  // Show sponsors section only for Hack For Business event
  const showSponsors = event.id === "design-thinking";

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="mb-16">
          <Link 
            to="/events" 
            className="inline-flex items-center text-isclub-teal hover:underline mb-8"
          >
            <span className="mr-2">←</span> Back to all events
          </Link>
          
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-isclub-navy/80 to-transparent z-10"></div>
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-[400px] object-cover"
            />
            
            <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 w-full md:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 md:gap-6 text-white">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-2xl font-display font-bold mb-6">About This Event</h2>
              <p className="text-gray-700 mb-8">
                {event.longDescription || event.description}
              </p>
              
              {event.schedule && (
                <div className="mt-12">
                  <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-isclub-teal" />
                    Event Schedule
                  </h3>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div 
                        key={index}
                        className="flex border-l-2 border-isclub-teal pl-4 py-2"
                      >
                        <div className="w-24 font-medium text-isclub-navy">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {event.speakers && event.speakers.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-isclub-teal" />
                    Instructors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-4 rounded-lg bg-gray-50"
                      >
                        <img 
                          src={speaker.imageUrl} 
                          alt={speaker.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{speaker.name}</h4>
                          <p className="text-sm text-gray-600">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-24"
            >
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-isclub-teal" />
                  Who Should Attend
                </h3>
                <p className="text-gray-700 mb-4">
                  {event.targetAudience || "Students interested in expanding their technical skills and knowledge in this domain."}
                </p>
                
                {event.prerequisites && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Prerequisites:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {event.prerequisites.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sponsors & Partners Section - Only for Hack For Business */}
        {showSponsors && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-24 tech-pattern py-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-isclub-navy mb-4">
                💼 Our Sponsors & Partners
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hack For Business 2025 is made possible through the support of our amazing partners and collaborators.
              </p>
            </div>

            {/* Under the Banner of KAF */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-center mb-6 text-isclub-navy">
                🏆 Under the Banner of:
              </h3>
              <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="marquee-container">
                  <motion.div
                    className="flex items-center justify-center space-x-8"
                    animate={{ x: [0, -100, 0] }}
                    transition={{ 
                      duration: 15, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                  >
                    <div className="flex items-center space-x-4 min-w-max">
                      <div className="w-20 h-20 bg-gradient-to-br from-isclub-teal to-isclub-cyan rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        KAF
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-lg text-isclub-navy">KUSOM Annual Fest (KAF)</p>
                        <p className="text-sm text-gray-600">Hack For Business 2025 is proudly organized under KAF</p>
                      </div>
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="flex items-center space-x-4 min-w-max">
                      <div className="w-20 h-20 bg-gradient-to-br from-isclub-teal to-isclub-cyan rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        KAF
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-lg text-isclub-navy">KUSOM Annual Fest (KAF)</p>
                        <p className="text-sm text-gray-600">Hack For Business 2025 is proudly organized under KAF</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Collaboration Partner KUCC */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-center mb-6 text-isclub-navy">
                🤝 Collaboration Partner:
              </h3>
              <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <div className="marquee-container">
                  <motion.div
                    className="flex items-center justify-center space-x-8"
                    animate={{ x: [0, 100, 0] }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                  >
                    <div className="flex items-center space-x-4 min-w-max">
                      <div className="w-20 h-20 bg-gradient-to-br from-isclub-navy to-isclub-dark rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        KUCC
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-lg text-isclub-navy">Kathmandu University Computer Club</p>
                        <p className="text-sm text-gray-600">In collaboration with KUCC</p>
                      </div>
                    </div>
                    {/* Duplicate for seamless loop */}
                    <div className="flex items-center space-x-4 min-w-max">
                      <div className="w-20 h-20 bg-gradient-to-br from-isclub-navy to-isclub-dark rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        KUCC
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-lg text-isclub-navy">Kathmandu University Computer Club</p>
                        <p className="text-sm text-gray-600">In collaboration with KUCC</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
