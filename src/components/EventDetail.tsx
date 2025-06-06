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
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <div className="text-gray-700 mb-8">
                {event.id === 'hackathon' ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold mb-4">Event Details</h2>
                    <ul className="list-disc pl-5 space-y-2">
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
                    
                    <h2 className="text-xl font-display font-bold mt-8 mb-4">About the Event</h2>
                    <p className="mb-4">
                      Hack for Business is a three-day hackathon organized by the Information System Club as part of the KUSOM Annual Fest (KAF), a flagship initiative of the Student Welfare Council (SWC) at Kathmandu University School of Management (KUSOM). This event is hosted in collaboration with the Kathmandu University Computer Club (KUCC), under the unifying theme "We Collaborate."
                    </p>
                    
                    <h3 className="text-lg font-display font-semibold mt-6 mb-3">Objectives</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Foster interdisciplinary teamwork</strong></li>
                      <li><strong>Promote innovation</strong></li>
                      <li><strong>Bring together students</strong> from diverse academic backgrounds</li>
                      <li><strong>Develop technology-driven solutions</strong> to real-world business challenges</li>
                    </ul>
                    
                    <h2 className="text-xl font-display font-bold mt-8 mb-4">About the Organizers</h2>
                    <p>
                      This hackathon is part of the KUSOM Annual Fest (KAF), an event where each SWC-affiliated club organizes an activity in line with their core expertise. The Information System Club, with its focus on the intersection of business and technology, has initiated Hack for Business in alignment with this vision, supported by the technical capabilities of KUCC.
                    </p>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {event.longDescription || event.description}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              
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
              {event.id === 'hackathon' && (
                <div className="bg-gradient-to-br from-isclub-teal to-isclub-cyan rounded-xl p-6 text-center shadow-lg">
                  <h3 className="text-xl font-display font-bold text-white mb-4">Ready to Participate?</h3>
                  <p className="text-white/90 mb-6">Join us for an exciting 48-hour hackathon and showcase your skills!</p>
                  <Link 
                    to="/register"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-isclub-navy font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md"
                  >
                    <span>Register Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
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
            className="mt-24 tech-pattern py-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-isclub-navy mb-4">
                Our Sponsors
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hack For Business 2025 is made possible through the support of our amazing partners and collaborators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                // {
                //   name: 'TechCorp',
                //   type: 'Title Sponsor',
                //   description: 'Empowering innovation through cutting-edge technology solutions.',
                //   logo: 'https://via.placeholder.com/300x150?text=TechCorp',
                //   color: 'from-yellow-500 to-amber-500'
                // },
                // {
                //   name: 'CodeMasters',
                //   type: 'Gold Sponsor',
                //   description: 'Mentoring the next generation of tech leaders.',
                //   logo: 'https://via.placeholder.com/300x150?text=CodeMasters',
                //   color: 'from-amber-400 to-yellow-300'
                // },
                // {
                //   name: 'DevHive',
                //   type: 'Gold Sponsor',
                //   description: 'Building developer communities and fostering growth.',
                //   logo: 'https://via.placeholder.com/300x150?text=DevHive',
                //   color: 'from-blue-500 to-cyan-400'
                // },
                {
                  name: 'Singapore Beverages',
                  type: 'Refreshment Partner',
                  description: 'Providing delicious refreshments to keep you energized.',
                  logo: 'https://i.imgur.com/5GqQhSc.jpeg',
                  color: 'from-gray-700 to-black-500',
                  website: 'https://singaporebeverage.com'
                },
                {
                  name: 'Hamro Patro',
                  type: 'Media Partner',
                  description: 'Covering the event with live updates and insights.',
                  logo: 'https://i.imgur.com/Jge1qVP.png',
                  color: 'from-red-500 to-maroon-500',
                  website: 'https://hamropatro.com'
                },
                {
                  name: 'OOps Nepal',
                  type: 'Entertainment Partner',
                  description: 'Bringing fun-filled energy and interactive experiences to the event.',
                  logo: 'https://i.imgur.com/0mlBZ8n.jpeg',
                  color: 'from-orange-500 to-indigo-500',
                  website: 'https://www.instagram.com/oopsinnepal/?hl=en'
                },
                // {
                //   name: 'SwagMasters',
                //   type: 'Swag Partner',
                //   description: 'Providing amazing swag to all participants.',
                //   logo: 'https://via.placeholder.com/300x150?text=SwagMasters',
                //   color: 'from-purple-500 to-pink-500'
                // },
                // {
                //   name: 'SnapMagic',
                //   type: 'Photography Partner',
                //   description: 'Capturing every moment of the event.',
                //   logo: 'https://via.placeholder.com/300x150?text=SnapMagic',
                //   color: 'from-pink-500 to-red-500'
                // },
                // {
                //   name: 'NetBlaze',
                //   type: 'Internet Partner',
                //   description: 'Providing high-speed internet for all participants.',
                //   logo: 'https://via.placeholder.com/300x150?text=NetBlaze',
                //   color: 'from-green-500 to-emerald-500',
                //   website: 'https://netblaze.com'
                // }
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
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-4">
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
                      className="text-xl font-bold text-center text-isclub-navy mb-1 transition-colors duration-300 hover:text-isclub-cyan flex items-center justify-center gap-1"
                    >
                      {sponsor.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-sm text-center text-amber-600 font-medium mb-3 transition-colors duration-300 hover:text-amber-700">{sponsor.type}</p>
                    <p className="text-gray-600 text-center transition-colors duration-300 hover:text-gray-700">{sponsor.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8 text-isclub-navy relative pb-2">
                <span className="relative z-10 px-4 bg-white">Collaboration Partner</span>
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-isclub-cyan to-transparent -z-0"></div>
              </h3>
              <div className="relative bg-gradient-to-br from-isclub-navy/5 to-isclub-teal/5 rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative group">
                    <div className="relative group">
                      <div className="relative w-32 h-32 rounded-lg bg-white p-2 shadow-lg border-2 border-gray-100">
                        <img 
                          src="https://i.imgur.com/rUi2Ig2.png" 
                          alt="KUCC Logo" 
                          className="w-full h-full object-contain p-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/150?text=KUCC+Logo';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 text-center md:text-left">
                    <h4 className="text-2xl font-bold text-isclub-navy mb-3">Kathmandu University Computer Club</h4>
                    <p className="text-gray-600 mb-4">
                      Joining forces with KUCC to bring technical excellence and innovation to Hack For Business 2025. 
                      Together, we're creating a platform for students to showcase their skills and build the future of technology.
                    </p>
                    <a 
                      href="https://kucc.ku.edu.np" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-isclub-cyan hover:text-isclub-teal font-medium transition-colors"
                    >
                      Visit KUCC Website
                      <ExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-isclub-teal/10 rounded-full -z-0"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-isclub-cyan/10 rounded-full -z-0"></div>
              </div>
            </motion.div>

            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold text-center mb-8 text-isclub-navy relative pb-2">
                <span className="relative z-10 px-4 bg-white">Under the Banner of</span>
                <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-isclub-cyan to-transparent -z-0"></div>
              </h3>
              <div className="relative bg-gradient-to-br from-isclub-teal/5 to-isclub-navy/5 rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="relative group">
                    <div className="relative w-32 h-32 rounded-lg bg-white p-2 shadow-lg border-2 border-gray-100">
                      <img 
                        src="https://i.imgur.com/nzkmNtF.jpeg" 
                        alt="KUCC Logo" 
                        className="w-full h-full object-contain p-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150?text=KUCC+Logo';
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-left max-w-md">
                    <h4 className="font-display font-bold text-2xl text-isclub-navy mb-3">KUSOM Annual Fest (KAF)</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Hack For Business 2025 is proudly organized under the banner of KAF, a flagship initiative of the Student Welfare Council at Kathmandu University School of Management.
                    </p>
                    <p className="text-gray-600 text-sm bg-white/50 rounded-lg p-3 border border-gray-100">
                      <span className="font-medium text-isclub-navy">About KAF:</span> KAF is an annual festival that brings together students, faculty, and industry professionals for a celebration of innovation, entrepreneurship, and academic excellence.
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-isclub-teal/10 rounded-full -z-0"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-isclub-cyan/10 rounded-full -z-0"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
