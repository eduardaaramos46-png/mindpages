import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Book } from '@/types';
import StarRating from './StarRating';

interface BookCardProps {
  book: Book;
  index: number;
  size?: 'large' | 'medium' | 'small';
}

export default function BookCard({ book, index, size = 'medium' }: BookCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale(1)');
  };

  const handleClick = () => {
    // Open Amazon affiliate link in new tab
    window.open(book.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const sizeClasses = {
    large: 'h-[60vh] min-h-[400px]',
    medium: 'h-[50vh] min-h-[350px]',
    small: 'h-[40vh] min-h-[300px]',
  };

  return (
    <div
      ref={cardRef}
      className={`book-card group ${sizeClasses[size]}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="book-card-inner h-full">
        {/* Image */}
        <div className="relative h-full overflow-hidden rounded-2xl card-glow group-hover:card-glow-hover transition-all duration-500">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Index Number */}
            <span className="micro-label text-[#FF6A3D] mb-2">
              {String(index + 1).padStart(2, '0')}
            </span>
            
            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">
              {book.title}
            </h3>
            
            {/* Author */}
            <p className="text-sm text-[#A7B0C8] mb-3">
              by {book.author}
            </p>
            
            {/* Rating */}
            <StarRating rating={book.rating} size={14} />
            
            {/* Description - shows on hover */}
            <p className="text-sm text-[#A7B0C8] mt-3 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              {book.description}
            </p>
            
            {/* CTA */}
            <div className="flex items-center gap-2 mt-4 text-[#FF6A3D] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
              <span className="text-sm font-semibold">View on Amazon</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
