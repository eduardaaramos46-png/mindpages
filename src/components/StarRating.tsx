import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, size = 16, className = '' }: StarRatingProps) {
  return (
    <div className={`star-rating ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${i < rating ? 'star' : 'text-[#A7B0C8]/30'}`}
          size={size}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}
