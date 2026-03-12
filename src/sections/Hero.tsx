import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { heroImages } from '@/data/books';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || cards.length === 0 || !cta) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.3 });

      // Cards entrance
      loadTl.fromTo(
        cards,
        { y: '12vh', scale: 0.92, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          stagger: 0.08,
        }
      );

      // Headline entrance
      loadTl.fromTo(
        headline.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.06,
        },
        '-=0.6'
      );

      // CTA entrance
      loadTl.fromTo(
        cta,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(headline.children, { y: 0, opacity: 1 });
            gsap.set(cards, { x: 0, y: 0, scale: 1, opacity: 1 });
            gsap.set(cta, { opacity: 1 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold position (already visible from load animation)
      // SETTLE (30-70%): Static

      // EXIT (70-100%): Elements exit
      // Headline exits up
      scrollTl.fromTo(
        headline,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Cards exit with staggered drift
      cards.forEach((card, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        scrollTl.fromTo(
          card,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          {
            x: `${direction * (15 + i * 3)}vw`,
            y: `${(i % 3) * 5}vh`,
            scale: 0.92,
            opacity: 0.25,
            ease: 'power2.in',
          },
          0.7 + i * 0.02
        );
      });

      // CTA fades out
      scrollTl.fromTo(
        cta,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToBooks = () => {
    const bookSection = document.getElementById('book-showcase');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#070A12] flex items-center justify-center z-10"
    >
      {/* Floating Image Cards */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Card A - Top Left */}
        <div
          ref={el => { if (el) cardsRef.current[0] = el; }}
          className="absolute floating"
          style={{
            left: '6vw',
            top: '8vh',
            width: '28vw',
            height: '34vh',
            zIndex: 2,
          }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden card-glow">
            <img
              src={heroImages[0]}
              alt="Reading"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Card B - Top Center */}
        <div
          ref={el => { if (el) cardsRef.current[1] = el; }}
          className="absolute floating-delayed"
          style={{
            left: '36vw',
            top: '6vh',
            width: '28vw',
            height: '34vh',
            zIndex: 3,
          }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden card-glow">
            <img
              src={heroImages[1]}
              alt="Book in hands"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Card C - Top Right */}
        <div
          ref={el => { if (el) cardsRef.current[2] = el; }}
          className="absolute floating"
          style={{
            left: '66vw',
            top: '10vh',
            width: '28vw',
            height: '34vh',
            zIndex: 2,
          }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden card-glow">
            <img
              src={heroImages[2]}
              alt="Notebook and coffee"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Card D - Bottom Left (Focal) */}
        <div
          ref={el => { if (el) cardsRef.current[3] = el; }}
          className="absolute floating-delayed"
          style={{
            left: '6vw',
            top: '52vh',
            width: '44vw',
            height: '38vh',
            zIndex: 4,
          }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden card-glow">
            <img
              src={heroImages[3]}
              alt="Reading outdoors"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Card E - Bottom Right */}
        <div
          ref={el => { if (el) cardsRef.current[4] = el; }}
          className="absolute floating"
          style={{
            left: '54vw',
            top: '52vh',
            width: '40vw',
            height: '38vh',
            zIndex: 2,
          }}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden card-glow">
            <img
              src={heroImages[4]}
              alt="Book pages"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Headline Content */}
      <div
        ref={headlineRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <h1 className="headline-xl text-white mb-2">
          <span className="text-[#FF6A3D]">10 BOOKS</span>
        </h1>
        <h1 className="headline-xl text-white mb-2">
          THAT CAN CHANGE
        </h1>
        <h1 className="headline-xl text-white mb-8">
          THE WAY YOU THINK
        </h1>
        
        <p className="text-lg md:text-xl text-[#A7B0C8] max-w-2xl mx-auto mb-10">
          A shortlist of ideas worth reading—curated, concise, and free.
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToBooks}
          className="btn-primary pulse-glow"
        >
          Start Exploring
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
