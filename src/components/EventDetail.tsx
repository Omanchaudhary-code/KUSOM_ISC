import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Award, ExternalLink, Trophy, Mic2, Gift, Camera, Wifi, Coffee, ArrowRight } from 'lucide-react';
import '../styles/SponsorsMarquee.css';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

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

  const showSponsors = event.id === "hackathon";

  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <Link 
            to="/events" 
            className="inline-flex items-center text-isclub-teal hover:underline mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base"
          >
            <span className="mr-2">←</span> Back to all events
          </Link>
          
          <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden mb-4 sm:mb-6 md:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-isclub-navy/80 to-transparent z-10"></div>
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] object-cover"
            />
            
            <div className="absolute bottom-0 left-0 z-20 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                  {event.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-white text-xs sm:text-sm md:text-base">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <div className="text-gray-700 leading-relaxed">
                {event.id === 'hackathon' ? (
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-bold mb-3 sm:mb-4 text-isclub-navy">Event Details</h2>
                    <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                      <li>
                        <span className="font-semibold">Date:</span> June 21–23, 2025
                      </li>
                      <li>
                        <span className="font-semibold">Venue:</span> Multi-purpose Hall, Kathmandu University Central Campus
                      </li>
                      <li>
                        <span className="font-semibold">Organized by:</span> Information System Club
                      </li>
                      <li>
                        <span className="font-semibold">In collaboration with:</span> Kathmandu University Computer Club (KUCC)
                      </li>
                      <li>
                        <span className="font-semibold">Prize Pool:</span> Worth 1.5 Lakh+
                      </li>
                    </ul>
                    
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-bold mt-4 sm:mt-6 md:mt-8 mb-3 sm:mb-4 text-isclub-navy">About the Event</h2>
                    <p className="mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
                      Hack for Business is a three-day hackathon organized by the Information System Club as part of the KUSOM Annual Fest (KAF), a flagship initiative of the Student Welfare Council (SWC) at Kathmandu University School of Management (KUSOM). This event is hosted in collaboration with the Kathmandu University Computer Club (KUCC), under the unifying theme "We Collaborate."
                    </p>
                    
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-display font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3 text-isclub-navy">Objectives</h3>
                    <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                      <li><strong>Foster interdisciplinary teamwork</strong></li>
                      <li><strong>Promote innovation</strong></li>
                      <li><strong>Bring together students</strong> from diverse academic backgrounds</li>
                      <li><strong>Develop technology-driven solutions</strong> to real-world business challenges</li>
                    </ul>
                    
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-bold mt-4 sm:mt-6 md:mt-8 mb-3 sm:mb-4 text-isclub-navy">About the Organizers</h2>
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                      This hackathon is part of the KUSOM Annual Fest (KAF), an event where each SWC-affiliated club organizes an activity in line with their core expertise. The Information System Club, with its focus on the intersection of business and technology, has initiated Hack for Business in alignment with this vision, supported by the technical capabilities of KUCC.
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    <div className="text-gray-700 space-y-3 sm:space-y-4 md:space-y-6">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm leading-relaxed text-gray-600">{children}</p>,
                          h1: ({ children }) => <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-bold mb-3 sm:mb-4 text-isclub-navy">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-display font-bold mb-2 sm:mb-3 md:mb-4 text-isclub-navy">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-display font-semibold mb-2 sm:mb-3 text-isclub-navy">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 md:space-y-3 mb-3 sm:mb-4 md:mb-6">{children}</ul>,
                          li: ({ children }) => <li className="text-xs sm:text-sm leading-relaxed text-gray-600">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold text-isclub-navy">{children}</strong>
                        }}
                      >
                        {event.longDescription || event.description}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
              
              {event.schedule && (
                <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-3 sm:mb-4 md:mb-6 flex items-center text-isclub-navy">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-isclub-teal flex-shrink-0" />
                    Event Schedule
                  </h3>
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    {event.schedule.map((item, index) => (
                      <div 
                        key={index}
                        className="flex flex-col sm:flex-row border-l-2 border-isclub-teal pl-3 sm:pl-4 py-1 sm:py-2 gap-1 sm:gap-0"
                      >
                        <div className="w-full sm:w-20 md:w-24 font-medium text-isclub-navy text-xs sm:text-sm md:text-base">
                          {item.time}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {event.speakers && event.speakers.length > 0 && (
                <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-3 sm:mb-4 md:mb-6 flex items-center text-isclub-navy">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-isclub-teal flex-shrink-0" />
                    Instructors
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 sm:p-4 md:p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <img 
                          src={speaker.imageUrl} 
                          alt={speaker.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover mr-2 sm:mr-3 md:mr-4 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-xs sm:text-sm md:text-base text-isclub-navy truncate">{speaker.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:sticky lg:top-24"
            >
              {event.id === 'hackathon' && (
                <div className="bg-gradient-to-br from-isclub-teal to-isclub-cyan rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg">
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2 sm:mb-3 md:mb-4">Ready to Participate?</h3>
                  <p className="text-white/90 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">Join us for an exciting 48-hour hackathon and showcase your skills!</p>
                  <Link 
                    to="/register"
                    className="inline-flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-white text-isclub-navy font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md text-xs sm:text-sm md:text-base w-full sm:w-auto"
                  >
                    <span>Register Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-1 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {showSponsors && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 sm:mt-20 md:mt-24 tech-pattern py-12 sm:py-14 md:py-16"
          >
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-isclub-navy mb-3 sm:mb-4">
                Our Sponsors
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Hack For Business 2025 is made possible through the support of our amazing partners and collaborators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16">
              {[
                 {
                  name: 'Swiss Timepieces Nepal',
                  type: 'Co-Sponsor',
                  description: 'Your premier destination for authentic luxury watches, offering curated collections from the world\s finest Swiss, German, and Japanese brands.',
                  logo: 'https://i.imgur.com/r37nMQZ.jpeg',
                  color: 'from-gray-700 to-black-500',
                  website: 'https://swisstimepiecesnepal.com'
                },
                 {
                  name: 'BAW Nepal',
                  type: 'Mobility Partner',
                  description: 'Powering Nepal\’s Sustainable Mobility with Innovation, Reliability, and a Vision for a Greener Future.',
                  logo: 'https://i.imgur.com/ZGFLnA1.jpeg',
                  color: 'from-red-800 to-red-950',
                  website: 'https://www.facebook.com/bawnepal/'
                },
                {
                  name: 'Singapore Beverages',
                  type: 'Refreshment Partner',
                  description: 'Elevating Nepali Craftsmanship, One Sip at a Time.',
                  logo: 'https://i.imgur.com/5GqQhSc.jpeg',
                  color: 'from-gray-700 to-black-500',
                  website: 'https://singaporebeverage.com'
                },
               
                 {
                  name: 'Ather',
                  type: 'Two Wheeler Partner',
                  description: 'Intelligent Electric, Effortless Ride.',
                  logo: 'https://i.imgur.com/I78eH4u.jpeg',
                  color: 'from-gray-700 to-black-500',
                  website: 'https://www.atherenergy.com.np'
                },
                {
                  name: 'Hamro Patro',
                  type: 'Media Partner',
                  description: 'The Heartbeat of Nepali Life',
                  logo: 'https://i.imgur.com/Jge1qVP.png',
                  color: 'from-red-500 to-maroon-500',
                  website: 'https://hamropatro.com'
                },
                {
                  name: 'OOps Nepal',
                  type: 'Entertainment Partner',
                  description: 'Nepal\'s Ultimate Family Fun: 100+ Adventures Await!',
                  logo: 'https://i.imgur.com/0mlBZ8n.jpeg',
                  color: 'from-orange-500 to-indigo-500',
                  website: 'https://www.instagram.com/oopsinnepal/?hl=en'
                },
               
                {
                  name: 'Luxora Events',
                  type: 'Event Partner',
                  description: 'Crafting Unforgettable Experiences, From Concept to Capture.',
                  logo: 'https://i.imgur.com/CUJo2tR.jpeg',
                  color: 'from-blue-700 to-amber-400',
                  website: 'https://www.instagram.com/luxora_events?igsh=eHYzZDd1enRxNzNx'
                }               
              ].map((sponsor, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className={`h-2 bg-gradient-to-r ${sponsor.color} transition-colors duration-300 hover:opacity-90`} />
                  <div className="p-4 sm:p-6">
                    <div className="h-20 sm:h-24 flex items-center justify-center mb-3 sm:mb-4">
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <a 
                      href={sponsor.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg sm:text-xl font-bold text-center text-isclub-navy mb-1 transition-colors duration-300 hover:text-isclub-cyan flex items-center justify-center gap-1"
                    >
                      {sponsor.name}
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                    <p className="text-xs sm:text-sm text-center text-amber-600 font-medium mb-2 sm:mb-3 transition-colors duration-300 hover:text-amber-700">{sponsor.type}</p>
                    <p className="text-gray-600 text-center text-xs sm:text-sm transition-colors duration-300 hover:text-gray-700">{sponsor.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

             <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16 sm:mt-20 md:mt-24 tech-pattern py-12 sm:py-14 md:py-16"
    >
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-isclub-navy mb-3 sm:mb-4">
          Our Community Partners
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          We’re grateful to our amazing community partners who foster innovation, collaboration, and knowledge-sharing across Nepal’s tech landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16">
        {[
          {
                      name: 'CSIT(Association of Nepal)',
                      type: 'Community Partner',
                      description: 'Empowering Innovation and Collaboration in Nepal\’s IT Community to Drive Business Solutions.',
                      logo: 'https://i.imgur.com/mIxMhqK.png',
                      color: 'bg-gradient-to-r from-white via-red-600 to-sky-400',
                      website: 'https://csitan.org.np'
                    },
                  
                    {
                      name: 'Code For Change',
                      type: 'Community Partner',
                      description: 'Driving Social Impact and Innovation through Technology and Collaboration in Nepal\'s Tech Community.',
                      logo: 'https://i.imgur.com/t1PZIHS.png',
                      color: 'bg-gradient-to-r from-white via-blue-600 to-blue-900',
                      website: 'https://codeforchangenepal.com/'
                    },
                    {
                      name: 'KUAIC (Kathmandu University AI Club)',
                      type: 'Community Partner',
                      description: 'KUAIC is a student-led AI community at Kathmandu University, promoting innovation through projects, workshops, and events like Hack for Business.',
                      logo: 'https://i.imgur.com/GnPaM0t.jpeg',
                      color: 'bg-gradient-to-r from-[#B8E3DB] via-[#1C2F49] to-[#0F2740]',
                      website: 'https://aiclub.ku.edu.np'
                    },
                    {
                      name: 'NEC IT Club',
                      type: 'Community Partner',
                      description: 'NEC IT Club is dedicated to enhancing skills and empowering technology-driven decision-making.',
                      logo: 'https://i.imgur.com/J9cjVkI.jpeg',
                      color: 'bg-gradient-to-r from-white via-red-500 to-black',
                      website: 'https://www.facebook.com/necITclub1/'
                    }
        ].map((partner, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className={`h-2 bg-gradient-to-r ${partner.color} transition-colors duration-300 hover:opacity-90`} />
            <div className="p-4 sm:p-6">
              <div className="h-20 sm:h-24 flex items-center justify-center mb-3 sm:mb-4">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg sm:text-xl font-bold text-center text-isclub-navy mb-1 transition-colors duration-300 hover:text-isclub-cyan flex items-center justify-center gap-1"
              >
                {partner.name}
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <p className="text-xs sm:text-sm text-center text-amber-600 font-medium mb-2 sm:mb-3 transition-colors duration-300 hover:text-amber-700">{partner.type}</p>
              <p className="text-gray-600 text-center text-xs sm:text-sm transition-colors duration-300 hover:text-gray-700">{partner.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>


            <motion.div 
              className="mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl sm:text-2xl font-display font-bold text-center mb-6 sm:mb-8 text-isclub-navy relative pb-2">
                <span className="relative z-10 px-4 bg-white">Collaboration Partner</span>
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-isclub-cyan to-transparent -z-0"></div>
              </h3>
              <div className="relative bg-gradient-to-br from-isclub-navy/5 to-isclub-teal/5 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-4 sm:space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative group">
                    <div className="relative group">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-white p-2 shadow-lg border-2 border-gray-100">
                        <img 
                          src="https://i.imgur.com/rUi2Ig2.png" 
                          alt="KUCC Logo" 
                          className="w-full h-full object-contain p-2 sm:p-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150?text=KUCC+Logo';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 text-center md:text-left">
                    <h4 className="text-xl sm:text-2xl font-bold text-isclub-navy mb-2 sm:mb-3">Kathmandu University Computer Club</h4>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                      Joining forces with KUCC to bring technical excellence and innovation to Hack For Business 2025. 
                      Together, we're creating a platform for students to showcase their skills and build the future of technology.
                    </p>
                    <a 
                      href="https://kucc.ku.edu.np" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-isclub-cyan hover:text-isclub-teal font-medium transition-colors text-sm sm:text-base"
                    >
                      Visit KUCC Website
                      <ExternalLink className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 bg-isclub-teal/10 rounded-full -z-0"></div>
                <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-isclub-cyan/10 rounded-full -z-0"></div>
              </div>
            </motion.div>

            <motion.div 
              className="mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-display font-bold text-center mb-6 sm:mb-8 text-isclub-navy relative pb-2">
                <span className="relative z-10 px-4 bg-white">Under the Banner of</span>
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-isclub-cyan to-transparent -z-0"></div>
              </h3>
              <div className="relative bg-gradient-to-br from-isclub-teal/5 to-isclub-navy/5 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-4 sm:space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative group">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-white p-2 shadow-lg border-2 border-gray-100">
                      <img 
                        src="https://i.imgur.com/nzkmNtF.jpeg" 
                        alt="KUCC Logo" 
                        className="w-full h-full object-contain p-2 sm:p-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150?text=KUCC+Logo';
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left max-w-md">
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-isclub-navy mb-2 sm:mb-3">KUSOM Annual Fest (KAF)</h4>
                    <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                      Hack For Business 2025 is proudly organized under the banner of KAF, a flagship initiative of the Student Welfare Council at Kathmandu University School of Management.
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm bg-white/50 rounded-lg p-2 sm:p-3 border border-gray-100">
                      <span className="font-medium text-isclub-navy">About KAF:</span> KAF is an annual festival that brings together students, faculty, and industry professionals for a celebration of innovation, entrepreneurship, and academic excellence.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-isclub-teal/10 rounded-full -z-0"></div>
                <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-isclub-cyan/10 rounded-full -z-0"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
