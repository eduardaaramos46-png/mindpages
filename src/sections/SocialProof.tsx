import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import StarRating from '@/components/StarRating';
import { testimonials } from '@/data/books';

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const stats = statsRef.current;

    if (!section || !title || cards.length === 0 || !stats) return;

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

      // Cards animation
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });

      // Stats animation
      gsap.fromTo(
        stats.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: stats,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0F1322] py-24 lg:py-32 z-30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="micro-label text-[#FF6A3D] mb-4 block">
            TESTIMONIALS
          </span>
          <h2 className="headline-lg text-white mb-6">
            LOVED BY <span className="text-[#FF6A3D]">THOUSANDS</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            See what readers around the world are saying about these transformative books.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="relative bg-[#070A12] rounded-2xl p-8 card-glow hover:card-glow-hover transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#FF6A3D]/20 group-hover:text-[#FF6A3D]/40 transition-colors" />
              
              {/* Rating */}
              <StarRating rating={testimonial.rating} className="mb-4" />
              
              {/* Text */}
              <p className="text-white text-lg leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6A3D] to-[#FF8F6B] flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <span className="text-[#A7B0C8] font-medium">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/10"
        >
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-[#FF6A3D] mb-2">
              50K+
            </div>
            <div className="text-sm text-[#A7B0C8] uppercase tracking-wider">
              Books Sold
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-[#FF6A3D] mb-2">
              4.8
            </div>
            <div className="text-sm text-[#A7B0C8] uppercase tracking-wider">
              Avg Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-[#FF6A3D] mb-2">
              10K+
            </div>
            <div className="text-sm text-[#A7B0C8] uppercase tracking-wider">
              Happy Readers
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-[#FF6A3D] mb-2">
              100%
            </div>
            <div className="text-sm text-[#A7B0C8] uppercase tracking-wider">
              Curated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
