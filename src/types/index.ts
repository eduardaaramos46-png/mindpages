export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;
  image: string;
  affiliateLink: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}
