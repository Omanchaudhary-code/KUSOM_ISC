
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import BriefAbout from '@/components/BriefAbout';
import WorkshopHighlight from '@/components/WorkshopHighlight';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BriefAbout />
        <WorkshopHighlight />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
