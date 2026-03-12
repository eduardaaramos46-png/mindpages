import type { Book, Testimonial, Feature } from '@/types';

// ============================================
// AMAZON AFFILIATE LINKS - UPDATE THESE!
// ============================================
// Replace the placeholder links below with your actual Amazon affiliate links.
// Format: https://www.amazon.com/dp/ASIN/?tag=YOUR_AFFILIATE_ID
// ============================================

export const books: Book[] = [
  {
    id: 1,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "Kahneman reveals the two systems that drive the way we think—and how to catch our own biases before they decide for us.",
    rating: 5,
    image: "/images/book-1.jpg",
    affiliateLink: "https://www.amazon.com/dp/0374533555/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description: "Small changes, remarkable results. Clear's system is practical, repeatable, and surprisingly humane.",
    rating: 5,
    image: "/images/book-2.jpg",
    affiliateLink: "https://www.amazon.com/dp/0735211299/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 3,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description: "Covey's principles still shape how leaders prioritize, negotiate, and grow.",
    rating: 5,
    image: "/images/book-3.jpg",
    affiliateLink: "https://www.amazon.com/dp/1982137274/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 4,
    title: "Meditations",
    author: "Marcus Aurelius",
    description: "A private journal that became a survival manual for stressful times.",
    rating: 5,
    image: "/images/book-4.jpg",
    affiliateLink: "https://www.amazon.com/dp/0812968255/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world.",
    rating: 5,
    image: "/images/book-5.jpg",
    affiliateLink: "https://www.amazon.com/dp/1455586692/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 6,
    title: "Mindset",
    author: "Carol S. Dweck",
    description: "The psychology of success starts with one belief: you can grow.",
    rating: 5,
    image: "/images/book-6.jpg",
    affiliateLink: "https://www.amazon.com/dp/0345472322/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 7,
    title: "Influence",
    author: "Robert B. Cialdini",
    description: "Cialdini's six principles explain why people say yes—and how to defend against them.",
    rating: 5,
    image: "/images/book-7.jpg",
    affiliateLink: "https://www.amazon.com/dp/0062937650/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 8,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Wealth is built by behavior, not spreadsheets. Housel teaches you how to think about risk.",
    rating: 5,
    image: "/images/book-8.jpg",
    affiliateLink: "https://www.amazon.com/dp/0857197681/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 9,
    title: "Grit",
    author: "Angela Duckworth",
    description: "Talent is overrated. Duckworth shows why effort counts twice.",
    rating: 5,
    image: "/images/book-9.jpg",
    affiliateLink: "https://www.amazon.com/dp/1501111116/?tag=youraffiliateid-20" // UPDATE THIS
  },
  {
    id: 10,
    title: "Essentialism",
    author: "Greg McKeown",
    description: "Do less, but better. A disciplined pursuit of what actually matters.",
    rating: 5,
    image: "/images/book-10.jpg",
    affiliateLink: "https://www.amazon.com/dp/0804137382/?tag=youraffiliateid-20" // UPDATE THIS
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "This list changed my perspective on life. I've read 4 of these books and each one was transformative."
  },
  {
    id: 2,
    name: "Michael R.",
    rating: 5,
    text: "I bought 3 of these books instantly after reading the descriptions. Best investment I've made this year."
  },
  {
    id: 3,
    name: "Emily K.",
    rating: 5,
    text: "Finally, a curated list that doesn't overwhelm. Every book here is a gem. Highly recommend!"
  },
  {
    id: 4,
    name: "David L.",
    rating: 5,
    text: "Atomic Habits alone was worth finding this page. The affiliate links made purchasing so easy."
  }
];

export const features: Feature[] = [
  {
    id: 1,
    title: "Carefully Selected",
    description: "Each book is hand-picked based on impact, readability, and lasting value.",
    icon: "check"
  },
  {
    id: 2,
    title: "Best-Selling Authors",
    description: "Learn from world-renowned experts, researchers, and thought leaders.",
    icon: "award"
  },
  {
    id: 3,
    title: "Highly Rated",
    description: "All books have 4.5+ star ratings from thousands of verified readers.",
    icon: "star"
  },
  {
    id: 4,
    title: "Transformative Ideas",
    description: "Books that improve thinking, productivity, and personal growth.",
    icon: "lightbulb"
  }
];

export const heroImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg"
];
