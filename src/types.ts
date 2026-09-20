export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortBenefit: string;
  description: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  summaryBullets: [string, string, string];
  features: string[];
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  relativeTime: string;
  comment: string;
  highlight?: string;
  ownerResponse?: {
    relativeTime: string;
    text: string;
  };
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  commune: string;
  city: string;
  country: string;
  mobilePhone: string;
  landlinePhone: string;
  email: string;
  hours: string;
  googleRating: number;
  googleReviewsCount: number;
  experienceYears: number;
  googleMapsUrl: string;
  whatsappNumberDigits: string;
}
