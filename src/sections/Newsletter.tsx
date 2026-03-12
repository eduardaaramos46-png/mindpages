import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const content = contentRef.current;

    if (!section || !form || !content) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        form,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative bg-[#070A12] py-24 lg:py-32 z-60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="micro-label text-[#FF6A3D] mb-4 block">
              NEWSLETTER
            </span>
            <h2 className="headline-lg text-white mb-6">
              GET THE <span className="text-[#FF6A3D]">LIST</span>
            </h2>
            <p className="text-lg text-[#A7B0C8] mb-8">
              One email. 10 books. No noise. Unsubscribe anytime.
            </p>
            
            {/* Benefits */}
            <ul className="space-y-4">
              {[
                'Weekly book recommendations',
                'Exclusive author interviews',
                'Reading guides and summaries',
                'Early access to new lists',
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-[#A7B0C8]">
                  <Check className="w-5 h-5 text-[#FF6A3D]" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-[#0F1322] rounded-3xl p-8 lg:p-10 border border-white/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#FF6A3D]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#FF6A3D]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Join the List</h3>
                <p className="text-sm text-[#A7B0C8]">Free forever. No spam.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 bg-[#070A12] border border-white/10 rounded-xl text-white placeholder-[#A7B0C8]/50 focus:outline-none focus:border-[#FF6A3D]/50 focus:ring-2 focus:ring-[#FF6A3D]/10 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full btn-primary justify-center ${
                  isSubmitted ? 'bg-green-500 hover:bg-green-500' : ''
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Send Me the List
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-xs text-[#A7B0C8]/50 text-center">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
