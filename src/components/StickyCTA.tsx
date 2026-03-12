import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = scrollY / (docHeight - windowHeight);
      
      // Show after scrolling past hero and before footer
      setIsVisible(scrollPercent > 0.15 && scrollPercent < 0.9);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBooks = () => {
    const bookSection = document.getElementById('book-showcase');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToBooks}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FF6A3D] rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 hover:bg-[#FF8F6B] ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      style={{ boxShadow: '0 10px 40px rgba(255,106,61,0.4)' }}
    >
      <ArrowUp className="w-6 h-6 text-white" />
    </button>
  );
}
