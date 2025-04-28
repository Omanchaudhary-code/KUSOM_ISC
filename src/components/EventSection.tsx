
import { motion } from 'framer-motion';
import EventCountdown from './EventCountdown';
import { Calendar } from 'lucide-react';

export default function EventSection() {
  return (
    <section className="section-padding relative overflow-hidden py-24 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-isclub-teal/10 text-isclub-teal mb-6">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Upcoming Event</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Business Hackathon 2025
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join us for an exciting 48-hour hackathon where teams will compete to develop innovative business solutions.
          </p>

          <EventCountdown />
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="/events"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-isclub-teal text-white hover:bg-isclub-navy transition-colors duration-300"
            >
              Learn More About The Event
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
