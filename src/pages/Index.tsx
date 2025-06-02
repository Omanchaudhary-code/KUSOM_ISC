
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import BriefAbout from '@/components/BriefAbout';
import WorkshopHighlight from '@/components/WorkshopHighlight';

const Index = () => {
  useEffect(() => {
    // Ensure page starts at top on load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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
