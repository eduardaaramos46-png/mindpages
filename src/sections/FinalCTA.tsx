import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { heroImages } from '@/data/books';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const images = imagesRef.current.filter(Boolean);

    if (!section || !content || images.length === 0) return;

    const ctx = gsap.context(() => {
      // Images parallax animation
      images.forEach((img, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        gsap.fromTo(
          img,
          { y: direction * 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });

      // Content animation
      gsap.fromTo(
        content.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
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
      className="relative bg-[#0F1322] py-24 lg:py-32 z-50 overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div
          ref={el => { if (el) imagesRef.current[0] = el; }}
          className="absolute -left-20 top-10 w-80 h-60 rounded-2xl overflow-hidden"
        >
          <img
            src={heroImages[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          ref={el => { if (el) imagesRef.current[1] = el; }}
          className="absolute -right-10 top-20 w-72 h-52 rounded-2xl overflow-hidden"
        >
          <img
            src={heroImages[1]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          ref={el => { if (el) imagesRef.current[2] = el; }}
          className="absolute left-1/4 -bottom-10 w-64 h-48 rounded-2xl overflow-hidden"
        >
          <img
            src={heroImages[2]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          ref={el => { if (el) imagesRef.current[3] = el; }}
          className="absolute right-1/4 bottom-20 w-56 h-44 rounded-2xl overflow-hidden"
        >
          <img
            src={heroImages[3]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1322] via-[#0F1322]/95 to-[#0F1322]" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6A3D]/10 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-[#FF6A3D]" />
          <span className="text-sm text-[#FF6A3D] font-medium">
            Start Your Transformation
          </span>
        </div>

        {/* Headline */}
        <h2 className="headline-lg text-white mb-6">
          READY TO <span className="text-[#FF6A3D]">RETHINK</span> YOUR NEXT READ?
        </h2>

        {/* Subheadline */}
        <p className="text-lg lg:text-xl text-[#A7B0C8] mb-10 max-w-2xl mx-auto">
          Get the full list delivered to your inbox—plus one new recommendation 
          every month. Join thousands of readers on their journey to better thinking.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToBooks} className="btn-primary group">
            See the Books
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            Get the List via Email
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#A7B0C8]/60">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            No spam, ever
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Unsubscribe anytime
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            10K+ subscribers
          </span>
        </div>
      </div>
    </section>
  );
}
