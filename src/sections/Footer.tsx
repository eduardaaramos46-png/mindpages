import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070A12] py-12 lg:py-16 border-t border-white/5 z-70">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="font-mono text-lg tracking-[0.12em] uppercase text-white hover:text-[#FF6A3D] transition-colors mb-2"
            >
              Mindset Library
            </button>
            <p className="text-sm text-[#A7B0C8]">
              Curated reads for curious minds.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <button
              onClick={() => document.getElementById('book-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#A7B0C8] hover:text-white transition-colors"
            >
              Browse Books
            </button>
            <button
              onClick={() => alert('Submit a book feature coming soon!')}
              className="text-[#A7B0C8] hover:text-white transition-colors"
            >
              Submit a Book
            </button>
            <button
              onClick={() => alert('Privacy Policy coming soon!')}
              className="text-[#A7B0C8] hover:text-white transition-colors"
            >
              Privacy
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A7B0C8]/60">
          <p>
            © {currentYear} Mindset Library. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#FF6A3D] fill-current" /> for book lovers
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <p className="mt-6 text-xs text-[#A7B0C8]/40 text-center max-w-2xl mx-auto">
          Disclosure: As an Amazon Associate, we earn from qualifying purchases. 
          This comes at no additional cost to you and helps us maintain this free resource.
        </p>
      </div>
    </footer>
  );
}
