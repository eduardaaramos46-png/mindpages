import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookCard from '@/components/BookCard';
import { books } from '@/data/books';

gsap.registerPlugin(ScrollTrigger);

export default function BookShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title || !grid || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title,
        { y: 60, opacity: 0 },
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

      // Cards staggered reveal
      cards.forEach((card, i) => {
        const direction = i % 3 === 0 ? -1 : i % 3 === 2 ? 1 : 0;
        const rotate = i % 3 === 0 ? -2 : i % 3 === 2 ? 2 : 0;

        gsap.fromTo(
          card,
          {
            x: direction * 100,
            y: direction === 0 ? 80 : 40,
            rotate: rotate,
            opacity: 0,
            scale: 0.92,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.08,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="book-showcase"
      ref={sectionRef}
      className="relative bg-[#070A12] py-24 lg:py-32 z-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <span className="micro-label text-[#FF6A3D] mb-4 block">
            THE COLLECTION
          </span>
          <h2 className="headline-lg text-white mb-6">
            10 BOOKS THAT <span className="text-[#FF6A3D]">TRANSFORM</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Each book on this list has the power to shift your perspective, 
            upgrade your thinking, and change the trajectory of your life.
          </p>
        </div>

        {/* Books Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {books.slice(0, 6).map((book, index) => (
            <div
              key={book.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
            >
              <BookCard book={book} index={index} size="medium" />
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-6 lg:mt-8">
          {books.slice(6, 10).map((book, index) => (
            <div
              key={book.id}
              ref={el => { if (el) cardsRef.current[index + 6] = el; }}
              className={index === 0 || index === 3 ? 'lg:col-span-2' : ''}
            >
              <BookCard 
                book={book} 
                index={index + 6} 
                size={index === 0 || index === 3 ? 'large' : 'medium'} 
              />
            </div>
          ))}
        </div>

        {/* Affiliate Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[#A7B0C8]/60">
            * As an Amazon Associate, we earn from qualifying purchases.
            <br />
            This helps us keep the recommendations free and unbiased.
          </p>
        </div>
      </div>
    </section>
  );
}
