
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import BriefAbout from '@/components/BriefAbout';
import EventSection from '@/components/EventSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BriefAbout />
        <EventSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
