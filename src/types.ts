export type TourTypeId = 
  | 'adventure' | 'water' | 'sunset' | 'cultural' | 'fishing' | 'whakesharks' // Tours
  | 'finedining' | 'beachside' | 'organicfarm' // Restaurants
  | 'beachresort' | 'luxuryvilla' | 'boutiqueart'; // Hotels

export type DomainType = 'tours' | 'restaurants' | 'hotels';

export interface TourTypeDynamicConfig {
  id: TourTypeId;
  label: string;
  fear: string;
  trustSignals: string[];
  cta: string;
  urgency: string;
  formStep1Label: string;
  bestForChips: string[];
  cognitivePrinciple: string; // e.g. System 1, Social Proof, Loss Aversion, Reciprocity
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  avatar: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface RelatedListing {
  name: string;
  category: string;
  cuisineOrTag: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
}

export interface BestDishItem {
  name: string;
  photoUrl: string;
  description: string;
  price: string;
}

export interface RoomTypeItem {
  name: string;
  photoUrl: string;
  pricePerNight: string;
  features: string[];
  size: string;
}

export interface AmenityItem {
  name: string;
  description: string;
  iconName: string;
}

export interface TourDetail {
  id: TourTypeId;
  title: string;
  price: number;
  discountedPrice?: number;
  duration: string;
  groupSize: string;
  operatorName: string;
  operatorRating: number;
  operatorReviewsCount: number;
  operatorBadge: string; // Chef led, Certified Captain, USCG licensed, etc.
  aboutText: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryItem[];
  faqs: FAQItem[];
  locationCoords: { lat: number; lng: number };
  locationAddress: string;
  languagesSpoken: string[];
  images: { url: string; alt: string }[];
  activityTypes: string[];
  mustKnow: string[];
  
  // Custom properties for Restaurants
  pdfMenuUrl?: string;
  bestDishes?: BestDishItem[];

  // Custom properties for Hotels
  roomTypes?: RoomTypeItem[];
  amenities?: AmenityItem[];
}
