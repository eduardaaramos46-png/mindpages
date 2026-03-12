import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/sections/Hero';
import BookShowcase from '@/sections/BookShowcase';
import SocialProof from '@/sections/SocialProof';
import WhyTheseBooks from '@/sections/WhyTheseBooks';
import FinalCTA from '@/sections/FinalCTA';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import StickyCTA from '@/components/StickyCTA';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount before creating global snap
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#070A12]">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <BookShowcase />
        <SocialProof />
        <WhyTheseBooks />
        <FinalCTA />
        <Newsletter />
        <Footer />
      </main>
      
      {/* Sticky CTA */}
      <StickyCTA />
    </div>
  );
}

export default App;
