import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Award, Star, Lightbulb } from 'lucide-react';
import { features } from '@/data/books';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  check: Check,
  award: Award,
  star: Star,
  lightbulb: Lightbulb,
};

export default function WhyTheseBooks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const cta = ctaRef.current;

    if (!section || !title || cards.length === 0 || !cta) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with stagger
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.12,
          }
        );
      });

      // CTA animation
      gsap.fromTo(
        cta,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
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
      className="relative bg-[#070A12] py-24 lg:py-32 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="micro-label text-[#FF6A3D] mb-4 block">
            WHY THESE BOOKS
          </span>
          <h2 className="headline-lg text-white mb-6">
            CURATED WITH <span className="text-[#FF6A3D]">PURPOSE</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Every book on this list meets our strict criteria for impact, 
            readability, and lasting value.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Check;
            return (
              <div
                key={feature.id}
                ref={el => { if (el) cardsRef.current[index] = el; }}
                className="group relative bg-[#0F1322] rounded-2xl p-8 border border-white/5 hover:border-[#FF6A3D]/30 transition-all duration-300 hover:-translate-y-2"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#FF6A3D]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF6A3D]/20 transition-colors">
                  <Icon className="w-7 h-7 text-[#FF6A3D]" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-[#A7B0C8] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <p className="text-[#A7B0C8] mb-6">
            Ready to start your reading journey?
          </p>
          <button onClick={scrollToBooks} className="btn-primary">
            Explore the Collection
          </button>
        </div>
      </div>
    </section>
  );
}
