
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Code, Calendar, Paintbrush } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  section: 'board' | 'technical' | 'events' | 'creative';
};

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    // Board Members
    {
      name: "Unique Poudel",
      role: "Coordinator",
      bio: "Second year BBIS student with expertise in social media management and leadership.",
      imageUrl: "https://i.imgur.com/DJSipAB.jpeg",
      section: 'board'
    },
    {
      name: "Resha Pokharel",
      role: "Vice Coordinator",
      bio: "Second year BBIS student focusing on web development and design.",
      imageUrl: "https://i.imgur.com/pYKlZ9P.jpeg",
      section: 'board'
    },
    {
      name: "Niraj Prasad Sah",
      role: "Secretary",
      bio: "Second year BBIS student with a passion for programming and project/product management.",
      imageUrl: "https://i.imgur.com/ozI1oZ2.jpeg",
      section: 'board'
    },
    {
      name: "Gunjan Suwal",
      role: "Treasurer",
      bio: "Second year BBIS student with experience in managing budgets for student organizations.",
      imageUrl: "https://i.imgur.com/N1IT7VW.jpeg",
      section: 'board'
    },
    {
      name: "Sumina Rai",
      role: "Joint Secretary",
      bio: "Second year BBIS student with experience in administration and coordination.",
      imageUrl: "https://i.imgur.com/luatq1O.jpeg",
      section: 'board'
    },
    {
      name: "Samyog Karki",
      role: "Joint Treasurer",
      bio: "Second year BBIS student who is passionate about finance and leadership.",
      imageUrl: "https://i.imgur.com/DR1WUJ3.jpeg",
      section: 'board'
    },
    
    // Technical Team
    {
      name: "Oman Chaudhary",
      role: "Technical Head",
      bio: "Second year BBIS student who is passionate about technology and leadership.",
      imageUrl: "https://i.imgur.com/vlHPt4T.jpeg",
      section: 'technical'
    },
    {
      name: "Sandesh Shrestha",
      role: "Technical Team Member",
      bio: "Second year BBIS student who is a self-taught developer with a passion for creating accessible web experiences.",
      imageUrl: "https://i.imgur.com/j6JJCH4.jpeg",
      section: 'technical'
    },
    {
      name: "Sabina Shrestha",
      role: "Technical Team Member",
      bio: "Second year BBIS student focusing on vibe coding and web development.",
      imageUrl: "https://i.imgur.com/OVGn0Q9.jpeg",
      section: 'technical'
    },
    {
      name: "Evan Karmacharya",
      role: "Technical Team Member",
      bio: "First year BBIS student who has a strong craving for knowledge.",
      imageUrl: "https://i.imgur.com/vJpIQn3.jpeg",
      section: 'technical'
    },
    
    // Events Team
    {
      name: "Yogyansh Shah",
      role: "Events Head",
      bio: "Second year BBIS student who is passionate about events coordination and leadership.",
      imageUrl: "https://i.imgur.com/rDodEHh.jpeg",
      section: 'events'
    },
    {
      name: "Swikriti Sapkota",
      role: "Events Team Member",
      bio: "Second year BBIS student with experience in event planning and management.",
      imageUrl: "https://i.imgur.com/w2RGe8P.jpeg",
      section: 'events'
    },
    {
      name: "Aachal Regmi",
      role: "Events Team Member",
      bio: "Second year BBIS student with a passion for organizing and executing events.",
      imageUrl: "https://i.imgur.com/UtpUgDz.jpeg",
      section: 'events'
    },
    {
      name: "Sumit Timalsina",
      role: "Events Team Member",
      bio: "First year BBIS student with a strong interest in event management and coordination.",
      imageUrl: "https://i.imgur.com/YmHZgcf.jpeg",
      section: 'events'
    },
    {
      name: "Pratikshya Sapkota",
      role: "Events Team Member",
      bio: "Second year BBIS student with a passion for event planning and execution.",
      imageUrl: "https://i.imgur.com/4G4ke9E.jpeg",
      section: 'events'
    },
    {
      name: "Rija Shrestha",
      role: "Events Team Member",
      bio: "First year BBIS student with a strong interest in event management and coordination.",
      imageUrl: "https://i.imgur.com/QPS21uB.jpeg",
      section: 'events'
    },
    {
      name: "Palpasa Shrestha",
      role: "Events Team Member",
      bio: "First year BBIS student with a strong interest in event management and coordination.",
      imageUrl: "https://i.imgur.com/JKYLCOz.jpeg",
      section: 'events'
    },
    {
      name: "Nikita Shrestha",
      role: "Events Team Member",
      bio: "First year BBIS student with a strong interest in event management and coordination.",
      imageUrl: "https://i.imgur.com/u4exiCs.jpeg",
      section: 'events'
    },
    
    // Creative Team
    {
      name: "Anusha Tuladhar",
      role: "Creative Head",
      bio: "Second year BBIS student with a passion for design and creativity.",
      imageUrl: "https://i.imgur.com/XhGIrOI.jpeg",
      section: 'creative'
    },
    {
      name: "Sriya Adhikari",
      role: "Creative Team Member",
      bio: "First year BBIS student with a strong interest in graphic design and branding.",
      imageUrl: "https://i.imgur.com/puOU4BE.jpeg",
      section: 'creative'
    },
    {
      name: "Nimisha Regmi",
      role: "Creative Team Member",
      bio: "Second year BBIS student with a strong interest in graphic design and branding.",
      imageUrl: "https://i.imgur.com/6wRonmA.jpeg",
      section: 'creative'
    },
    {
      name: "Binayak Koirala",
      role: "Creative Team Member",
      bio: "First year BBIS student with a strong interest in graphic design and branding.",
      imageUrl: "https://i.imgur.com/GHBAT5H.jpeg",
      section: 'creative'
    },
    {
      name: "Mahima Maharjan",
      role: "Creative Team Member",
      bio: "Second year BBIS student with a strong interest in graphic design and branding.",
      imageUrl: "https://i.imgur.com/trbZFoi.jpeg",
      section: 'creative'
    }
  ];

  const boardMembers = teamMembers.filter(member => member.section === 'board');
  const technicalTeam = teamMembers.filter(member => member.section === 'technical');
  const eventsTeam = teamMembers.filter(member => member.section === 'events');
  const creativeTeam = teamMembers.filter(member => member.section === 'creative');

  const TeamSection = ({ 
    title, 
    icon, 
    description, 
    members, 
    bgColor = "bg-isclub-light" 
  }: { 
    title: string; 
    icon: React.ReactNode; 
    description: string; 
    members: TeamMember[]; 
    bgColor?: string;
  }) => (
    <section className={`section-padding ${bgColor} px-4`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-isclub-teal bg-isclub-blue-light/50 rounded-full flex items-center justify-center mx-auto w-fit">
            {icon}
            <span className="ml-2">{title}</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {title}
          </h2>
          <p className="text-isclub-gray max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className={cn(
                "h-full rounded-xl overflow-hidden",
                "bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm",
                "transition-all duration-300 hover:shadow-tech hover:-translate-y-1"
              )}>
                <div className="h-60 overflow-hidden">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                    loading="lazy" 
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold">{member.name}</h3>
                  <p className="text-isclub-teal text-sm mb-3">{member.role}</p>
                  <p className="text-isclub-gray text-sm">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      <TeamSection 
        title="Board Members" 
        icon={<Users className="w-4 h-4" />}
        description="The IS Club is led by a dedicated team of student officers who oversee all club operations and strategic direction."
        members={boardMembers}
        bgColor="bg-isclub-light"
      />
      
      <TeamSection 
        title="Technical Team" 
        icon={<Code className="w-4 h-4" />}
        description="Our technical team develops and maintains club technologies, websites, and provides expertise for workshops and projects."
        members={technicalTeam}
        bgColor="bg-white"
      />
      
      <TeamSection 
        title="Events Team" 
        icon={<Calendar className="w-4 h-4" />}
        description="The events team plans, organizes, and executes all club activities, from workshops to networking sessions and annual symposiums."
        members={eventsTeam}
        bgColor="bg-isclub-light"
      />
      
      <TeamSection 
        title="Creative Team" 
        icon={<Paintbrush className="w-4 h-4" />}
        description="Our creative team handles all aspects of club branding, design, content creation, and social media presence."
        members={creativeTeam}
        bgColor="bg-white"
      />
    </>
  );
}
