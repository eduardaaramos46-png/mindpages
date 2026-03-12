import { useEffect, useState } from 'react';
import { Bookmark, Share2 } from 'lucide-react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      setIsVisible(scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '10 Books That Can Change The Way You Think',
          text: 'Check out this curated list of transformative books!',
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      } ${
        isScrolled
          ? 'bg-[#070A12]/90 backdrop-blur-md border-b border-white/5'
          : ''
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="font-mono text-xs tracking-[0.12em] uppercase text-[#A7B0C8] hover:text-white transition-colors"
        >
          Mindset Library
        </button>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-[#A7B0C8] hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={() => alert('List saved! (Demo feature)')}
            className="flex items-center gap-2 text-sm text-[#A7B0C8] hover:text-white transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Save list</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
