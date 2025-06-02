
import { motion } from 'framer-motion';
import { Users, GraduationCap, Code, Network } from 'lucide-react';

export default function AboutSection() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6 }
    })
  };
  
  return (
    <section id="about" className="section-padding bg-white px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            custom={0}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-isclub-teal to-isclub-cyan rounded-2xl blur opacity-30 circuit-animate"></div>
              <div className="relative glass-card rounded-2xl overflow-hidden">
                <img 
                  src="https://i.imgur.com/DGHDcSi.jpeg"
                  alt="ISC Board 2025" 
                  className="w-full h-auto object-cover rounded-2xl"
                  style={{
                    aspectRatio: '16/12',
                    maxHeight: 'clamp(300px, 50vw, 600px)'
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              custom={1}
            >
              <span className="tech-badge">About Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-isclub-gray leading-relaxed mb-4">
                The KUSOM Information Systems Club is dedicated to bridging the gap between academic learning and practical application in the fast-evolving tech landscape.
              </p>
              <p className="text-isclub-gray leading-relaxed mb-6">
                Our vision, "Empowering KUSOMites to excel in the evolving business and tech landscape," reflects our commitment to preparing students for the demands of modern industry.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              custom={2}
              className="grid grid-cols-2 gap-6"
            >
              <div className="p-5 rounded-lg bg-isclub-light hover-lift">
                <Users className="w-8 h-8 text-isclub-blue mb-4" />
                <h3 className="font-medium mb-2">Community</h3>
                <p className="text-sm text-isclub-gray">Building a network of tech enthusiasts</p>
              </div>
              
              <div className="p-5 rounded-lg bg-isclub-light hover-lift">
                <GraduationCap className="w-8 h-8 text-isclub-blue mb-4" />
                <h3 className="font-medium mb-2">Learning</h3>
                <p className="text-sm text-isclub-gray">Workshops, seminars, and hands-on projects</p>
              </div>
              
              <div className="p-5 rounded-lg bg-isclub-light hover-lift">
                <Code className="w-8 h-8 text-isclub-blue mb-4" />
                <h3 className="font-medium mb-2">Skills</h3>
                <p className="text-sm text-isclub-gray">Practical coding and design skills</p>
              </div>
              
              <div className="p-5 rounded-lg bg-isclub-light hover-lift">
                <Network className="w-8 h-8 text-isclub-blue mb-4" />
                <h3 className="font-medium mb-2">Connection</h3>
                <p className="text-sm text-isclub-gray">Linking students with industry experts</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
