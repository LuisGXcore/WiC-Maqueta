import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Star, MapPin, Clock, Calendar, CheckCircle, Check,
  ChevronRight, Mail, ShieldCheck, ArrowRight, Sparkles, 
  Map, Grid, Bookmark, Search, SlidersHorizontal, Sliders, RotateCcw, X
} from 'lucide-react';
import { DomainType, TourTypeId } from '../types';

export interface ListingItem {
  id: string;
  name: string;
  hub: string; // e.g., 'hotels', 'tours', 'restaurants', etc.
  subcategory: string; // e.g., 'all-inclusive', 'whale-watching'
  zone: string; // e.g., 'cabo-san-lucas', 'san-jose-del-cabo', 'tourist-corridor', 'todos-santos', 'la-paz'
  zoneLabel: string;
  rating: number;
  reviewsCount: number;
  priceLevel: number; // 1 to 4 ($ to $$$$)
  priceLabel?: string; // or 'From $89' etc
  imageUrl: string;
  isOpen: boolean;
  features: string[]; // pool, spa, beach, adults-only, private, guide, etc.
  lat: number; // relative pos for visual map (0-100%)
  lng: number; // relative pos for visual map (0-100%)
  aboutShort?: string;
}

interface CategoryListProps {
  initialZoneId: string | null;
  initialHub: string | null;
  initialSubcategory: string | null;
  onNavigateDetail: (domain: DomainType, id: TourTypeId) => void;
  onNavigatePassport: () => void;
  onNavigateZone: (zoneId: string | null) => void;
  onNavigateHome: () => void;
}

// 1. Comprehensive mock listings database covering all required URL patterns
export const DIRECTORY_LISTINGS: ListingItem[] = [
  // HOTELS (all-inclusive, boutique, resort, adults only)
  {
    id: 'h1',
    name: 'Waldorf Astoria Los Cabos Pedregal',
    hub: 'hotels',
    subcategory: 'resort',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 428,
    priceLevel: 4,
    priceLabel: 'From $850',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['pool', 'spa', 'beach', 'pedregal'],
    lat: 42,
    lng: 15,
  },
  {
    id: 'h2',
    name: 'The Cape, A Thompson Hotel',
    hub: 'hotels',
    subcategory: 'boutique',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.8,
    reviewsCount: 294,
    priceLevel: 4,
    priceLabel: 'From $580',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['pool', 'spa', 'beach', 'adults only', 'bar'],
    lat: 48,
    lng: 32,
  },
  {
    id: 'h3',
    name: 'Grand Velas Los Cabos',
    hub: 'hotels',
    subcategory: 'all-inclusive',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.9,
    reviewsCount: 312,
    priceLevel: 4,
    priceLabel: 'All-Inclusive',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['pool', 'spa', 'beach', 'all inclusive'],
    lat: 52,
    lng: 48,
  },
  {
    id: 'h4',
    name: 'Hotel El Ganzo',
    hub: 'hotels',
    subcategory: 'boutique',
    zone: 'san-jose-del-cabo',
    zoneLabel: 'San José del Cabo',
    rating: 4.7,
    reviewsCount: 184,
    priceLevel: 3,
    priceLabel: 'From $280',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['pool', 'spa', 'adults only', 'marina', 'palmilla'],
    lat: 68,
    lng: 78,
  },
  {
    id: 'h5',
    name: 'One&Only Palmilla',
    hub: 'hotels',
    subcategory: 'resort',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.9,
    reviewsCount: 210,
    priceLevel: 4,
    priceLabel: 'From $990',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['pool', 'spa', 'beach', 'golf', 'palmilla'],
    lat: 58,
    lng: 60,
  },
  {
    id: 'h6',
    name: 'Pueblo Bonito Pacifica Resort',
    hub: 'hotels',
    subcategory: 'all-inclusive',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.6,
    reviewsCount: 340,
    priceLevel: 3,
    priceLabel: 'All-Inclusive (Adults Only)',
    imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['pool', 'spa', 'beach', 'all inclusive', 'adults only'],
    lat: 38,
    lng: 12,
  },

  // TOURS (fishing, snorkeling, whale-watching, atv, boat tours, camel, etc.)
  {
    id: 't1',
    name: 'Pisces Premium Sportfishing Charters',
    hub: 'tours',
    subcategory: 'fishing',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 825,
    priceLevel: 4,
    priceLabel: 'From $450',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['8 hours', 'small group', 'medium difficulty', 'year-round'],
    lat: 44,
    lng: 20,
  },
  {
    id: 't2',
    name: 'Cabo Adventures Whale Watching Safari',
    hub: 'tours',
    subcategory: 'whale-watching',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 610,
    priceLevel: 2,
    priceLabel: 'From $89',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['2.5 hours', 'medium group', 'easy difficulty', 'winter'],
    lat: 43,
    lng: 18,
  },
  {
    id: 't3',
    name: 'Pelican Rock Snorkeling Safari',
    hub: 'tours',
    subcategory: 'snorkeling',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.8,
    reviewsCount: 295,
    priceLevel: 1,
    priceLabel: 'From $45',
    imageUrl: 'https://images.unsplash.com/photo-1502784404187-359ac186c5bb?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['3 hours', 'medium group', 'easy difficulty', 'year-round'],
    lat: 45,
    lng: 22,
  },
  {
    id: 't4',
    name: 'La Paz Whale Shark Swim Experience',
    hub: 'tours',
    subcategory: 'whale-shark',
    zone: 'la-paz',
    zoneLabel: 'La Paz',
    rating: 4.9,
    reviewsCount: 420,
    priceLevel: 3,
    priceLabel: 'From $199',
    imageUrl: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['10 hours', 'small group', 'easy difficulty', 'winter'],
    lat: 20,
    lng: 50,
  },
  {
    id: 't5',
    name: 'Migriño Desert Express ATV Tour',
    hub: 'tours',
    subcategory: 'atv',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.7,
    reviewsCount: 380,
    priceLevel: 2,
    priceLabel: 'From $95',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['3 hours', 'medium group', 'medium difficulty', 'year-round'],
    lat: 38,
    lng: 10,
  },
  {
    id: 't6',
    name: 'Sunset Cruise to Land\'s End',
    hub: 'tours',
    subcategory: 'boat-tours',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 710,
    priceLevel: 2,
    priceLabel: 'From $79',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['2 hours', 'large group', 'easy difficulty', 'year-round'],
    lat: 44,
    lng: 23,
  },
  {
    id: 't7',
    name: 'Pacific Beach Camel Expedition',
    hub: 'tours',
    subcategory: 'camel-rides',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.8,
    reviewsCount: 185,
    priceLevel: 3,
    priceLabel: 'From $110',
    imageUrl: 'https://images.unsplash.com/photo-1502784404187-359ac186c5bb?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['4 hours', 'medium group', 'easy difficulty', 'year-round'],
    lat: 55,
    lng: 54,
  },
  {
    id: 't8',
    name: 'Wild Canyon Monsters Zipline',
    hub: 'tours',
    subcategory: 'zipline',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.8,
    reviewsCount: 310,
    priceLevel: 2,
    priceLabel: 'From $105',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    isOpen: false,
    features: ['3.5 hours', 'medium group', 'hard difficulty', 'year-round'],
    lat: 53,
    lng: 50,
  },
  {
    id: 't9',
    name: 'Cabo Dolphins Swim Program',
    hub: 'tours',
    subcategory: 'cabo-dolphins',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.6,
    reviewsCount: 164,
    priceLevel: 3,
    priceLabel: 'From $129',
    imageUrl: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['1 hour', 'small group', 'easy difficulty', 'year-round'],
    lat: 44,
    lng: 21,
  },
  {
    id: 't10',
    name: 'Parasailing Over Medano Bay',
    hub: 'tours',
    subcategory: 'parasailing',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.7,
    reviewsCount: 140,
    priceLevel: 1,
    priceLabel: 'From $55',
    imageUrl: 'https://images.unsplash.com/photo-1502784404187-359ac186c5bb?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['1 hour', 'small group', 'easy difficulty', 'year-round'],
    lat: 45,
    lng: 24,
  },
  {
    id: 't11',
    name: 'Wild Canyon Eco UTV & Buggy Tour',
    hub: 'tours',
    subcategory: 'utv-buggy',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.8,
    reviewsCount: 195,
    priceLevel: 3,
    priceLabel: 'From $155',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['3 hours', 'medium group', 'hard difficulty', 'year-round'],
    lat: 53,
    lng: 51,
  },
  {
    id: 't12',
    name: 'Glass-Bottom Arch Water Taxi',
    hub: 'tours',
    subcategory: 'glass-bottom-boat',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.5,
    reviewsCount: 110,
    priceLevel: 1,
    priceLabel: 'From $25',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['1 hour', 'large group', 'easy difficulty', 'year-round'],
    lat: 44,
    lng: 22,
  },
  {
    id: 't13',
    name: 'Authentic Foothills Cooking Masterclass',
    hub: 'tours',
    subcategory: 'cooking-classes',
    zone: 'san-jose-del-cabo',
    zoneLabel: 'San José del Cabo',
    rating: 4.9,
    reviewsCount: 78,
    priceLevel: 2,
    priceLabel: 'From $90',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['4 hours', 'small group', 'easy difficulty', 'year-round'],
    lat: 65,
    lng: 76,
  },

  // RESTAURANTS
  {
    id: 'r1',
    name: 'El Farallon Cliffside Dining',
    hub: 'restaurants',
    subcategory: 'fine-dining',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 520,
    priceLevel: 4,
    priceLabel: '$$$$',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['seafood', 'ocean view', 'romantic', 'reservations'],
    lat: 42,
    lng: 14,
  },
  {
    id: 'r2',
    name: 'Flora Farms Garden Kitchen',
    hub: 'restaurants',
    subcategory: 'organic',
    zone: 'san-jose-del-cabo',
    zoneLabel: 'San José del Cabo',
    rating: 4.9,
    reviewsCount: 480,
    priceLevel: 3,
    priceLabel: '$$$',
    imageUrl: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['farm-to-table', 'live music', 'reservations', 'baja'],
    lat: 69,
    lng: 82,
  },
  {
    id: 'r3',
    name: 'Sunset Monalisa',
    hub: 'restaurants',
    subcategory: 'fine-dining',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.8,
    reviewsCount: 390,
    priceLevel: 4,
    priceLabel: '$$$$',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['italian', 'ocean view', 'romantic', 'reservations', 'live music'],
    lat: 49,
    lng: 34,
  },

  // BEACH CLUBS
  {
    id: 'bc1',
    name: 'Sur Beach House',
    hub: 'beach-clubs-cabo',
    subcategory: 'lounge',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.8,
    reviewsCount: 290,
    priceLevel: 3,
    priceLabel: '$$$',
    imageUrl: 'https://images.unsplash.com/photo-1502784404187-359ac186c5bb?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['day pass', 'ocean access', 'chill vibe', 'reservations'],
    lat: 44,
    lng: 24,
  },
  {
    id: 'bc2',
    name: 'Mango Deck Beach Club & Eatery',
    hub: 'beach-clubs-cabo',
    subcategory: 'party',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.6,
    reviewsCount: 950,
    priceLevel: 2,
    priceLabel: '$$',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['day pass', 'ocean access', 'party vibe', 'live music'],
    lat: 45,
    lng: 25,
  },
  {
    id: 'bc3',
    name: 'Taboo Beach Club Cabo',
    hub: 'beach-clubs-cabo',
    subcategory: 'lounge',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.5,
    reviewsCount: 310,
    priceLevel: 4,
    priceLabel: '$$$$',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['day pass', 'dj party', 'luxury', 'pool'],
    lat: 44,
    lng: 23,
  },

  // NIGHTLIFE
  {
    id: 'n1',
    name: 'El Squid Roe Lounge & Club',
    hub: 'nightlife',
    subcategory: 'club',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.6,
    reviewsCount: 1450,
    priceLevel: 2,
    priceLabel: '$$',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['bar', 'club', 'casual dress', 'open-format music'],
    lat: 43,
    lng: 20,
  },
  {
    id: 'n2',
    name: 'Mandala Nightclub Cabo',
    hub: 'nightlife',
    subcategory: 'club',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.5,
    reviewsCount: 590,
    priceLevel: 3,
    priceLabel: '$$$',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    isOpen: false,
    features: ['club', 'upscale dress', 'electronic music', 'vip service'],
    lat: 43,
    lng: 19,
  },

  // YACHT CHARTERS
  {
    id: 'y1',
    name: 'Caborey Luxury Catamaran Cruises',
    hub: 'yacht-charters',
    subcategory: 'cruise',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 145,
    priceLevel: 4,
    priceLabel: 'From $850',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['private', 'luxury', 'fully staffed', 'capacity: 30'],
    lat: 44,
    lng: 21,
  },

  // GOLF
  {
    id: 'g1',
    name: 'Quivira Golf Club (Jack Nicklaus)',
    hub: 'golf',
    subcategory: 'private',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 310,
    priceLevel: 4,
    priceLabel: '$$$$',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['18 holes', 'cliffside views', 'private course'],
    lat: 41,
    lng: 11,
  },
  {
    id: 'g2',
    name: 'Cabo del Sol Cove Club Golf',
    hub: 'golf',
    subcategory: 'resort',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.8,
    reviewsCount: 195,
    priceLevel: 4,
    priceLabel: '$$$$',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['18 holes', 'beach cove views', 'public resort-access'],
    lat: 51,
    lng: 40,
  },

  // SPAS
  {
    id: 's1',
    name: 'One&Only Palmilla Spa Haven',
    hub: 'spas',
    subcategory: 'resort-spa',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.9,
    reviewsCount: 94,
    priceLevel: 4,
    priceLabel: '$$$$',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['day pass', 'massage', 'botanical sanctuary'],
    lat: 58,
    lng: 61,
  },

  // CAR RENTALS
  {
    id: 'cr1',
    name: 'Cabo Elite Car Rental & VIP SUVs',
    hub: 'car-rentals',
    subcategory: 'luxury',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.4,
    reviewsCount: 115,
    priceLevel: 3,
    priceLabel: 'From $65/day',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['suv', 'unlimited miles', 'gated pickup'],
    lat: 43,
    lng: 18,
  },

  // VACATION RENTALS
  {
    id: 'vr1',
    name: 'Pedregal Luxury Sunrise Mansion',
    hub: 'vacation-rentals',
    subcategory: 'pedregal',
    zone: 'cabo-san-lucas',
    zoneLabel: 'Cabo San Lucas',
    rating: 4.9,
    reviewsCount: 65,
    priceLevel: 4,
    priceLabel: 'From $1,200',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['ocean view', 'pedregal', 'infinity pool', '5 bedrooms', 'private chef'],
    lat: 42,
    lng: 14,
  },
  {
    id: 'vr2',
    name: 'Palmilla Seaside Villa Sanctuary',
    hub: 'vacation-rentals',
    subcategory: 'palmilla',
    zone: 'tourist-corridor',
    zoneLabel: 'Tourist Corridor',
    rating: 4.8,
    reviewsCount: 40,
    priceLevel: 4,
    priceLabel: 'From $1,500',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['beach access', 'palmilla', 'infinity pool', '4 bedrooms', 'butler service'],
    lat: 59,
    lng: 62,
  },

  // AIRPORT SHUTTLE (Global / Serves All)
  {
    id: 'shuttle-1',
    name: 'Cabo Airport Shuttle Elite VIP',
    hub: 'cabo-airport-shuttle',
    subcategory: 'shuttle',
    zone: 'tourist-corridor',
    zoneLabel: 'All Zones (Airport Terminal Pickup)',
    rating: 4.9,
    reviewsCount: 820,
    priceLevel: 2,
    priceLabel: 'From $35 USD',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
    isOpen: true,
    features: ['private driver', 'clean ac sprinters', '100% on time'],
    lat: 38,
    lng: 85,
  }
];

// Helper dictionaries for display formatting
const CATEGORY_NAMES: Record<string, string> = {
  // Hubs
  'hotels': 'Resorts & Hotels',
  'tours': 'Tours & Activities',
  'restaurants': 'Gastronomy & Dining',
  'beach-clubs-cabo': 'Beach Clubs',
  'nightlife': 'Bars & Nightlife',
  'yacht-charters': 'Yacht Charters',
  'golf': 'Championship Golf',
  'spas': 'Luxury Spas & Wellness',
  'car-rentals': 'Car Rentals',
  'vacation-rentals': 'Vacation Rentals',
  'vacation-packages': 'Vacation Packages',
  'cabo-airport-shuttle': 'Airport Shuttles',
  // Subcategories
  'all-inclusive': 'All-Inclusive',
  'boutique': 'Boutique Hotspots',
  'resort': 'Luxury Resorts',
  'adults-only': 'Adults Only Options',
  'whale-watching': 'Whale Watching Tours',
  'fishing': 'Deep Sea Sportfishing',
  'snorkeling': 'Snorkeling & Diving Reefs',
  'cabo-dolphins': 'Dolphin Swims',
  'atv': 'Off-Road ATV Tours',
  'boat-tours': 'Coastal Boat Cruises',
  'camel-rides': 'Pacific Camel Rides',
  'whale-shark': 'Whale Shark Swimming',
  'zipline': 'Zipline Challenges',
  'parasailing': 'Parasailing Over the Bay',
  'utv-buggy': 'Rugged UTV Buggies',
  'glass-bottom-boat': 'Glass Bottom Boats',
  'cooking-classes': 'Local Cooking Classes',
  'pedregal': 'Pedregal Luxury Estates',
  'palmilla': 'Palmilla Luxury Coves'
};

const ZONE_LABELS: Record<string, string> = {
  'cabo-san-lucas': 'Cabo San Lucas',
  'san-jose-del-cabo': 'San José del Cabo',
  'todos-santos': 'Todos Santos',
  'los-barriles': 'Los Barriles',
  'east-cape': 'East Cape',
  'la-paz': 'La Paz',
  'tourist-corridor': 'Tourist Corridor'
};

const BACKGROUND_HEROS_BY_CATEGORIES: Record<string, string> = {
  'hotels': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600',
  'tours': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1600',
  'restaurants': 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=1600',
  'beach-clubs-cabo': 'https://images.unsplash.com/photo-1502784404187-359ac186c5bb?auto=format&fit=crop&q=80&w=1600',
  'nightlife': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1600',
  'yacht-charters': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1600',
  'golf': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600',
  'spas': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1600',
  'car-rentals': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1600',
  'vacation-rentals': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1600',
  'cabo-airport-shuttle': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1600'
};

const CATEGORY_FAQS: Record<string, { q: string; a: string }[]> = {
  'hotels': [
    { q: 'Is it better to stay in Cabo San Lucas or San José del Cabo?', a: 'Cabo San Lucas is ideal if you seek safe swimming beaches (like Medano), high-intensity ocean safety tours, a bustling Marina, and nightlife. San José del Cabo is perfect if you prefer organic farm gastronomy, historic walks, quiet boutiques, and a slow, cultural pace.' },
    { q: 'What amenities are typical for luxury resorts in Los Cabos?', a: 'Most flagship luxury corridor resorts offer private butler teams, on-site high-end wellness spas, oceanfront infinity pools, and direct, premium beach lounge coordinates.' },
    { q: 'Are all-inclusive packages worth it?', a: 'All-inclusive packages are practical for travelers looking for seamless cost structure, families, or couples who prefer to relax in-resort. However, since the local farm-to-table culinary and cliffside scene is highly authentic, many choose European-plan hotels to freely explore outside.' }
  ],
  'tours': [
    { q: 'When is whale watching season active in Los Cabos?', a: 'The official regulatory whale-watching season starts in early December and runs through mid-April. Humpback waves peak in January and February with daily marine biologist sightings.' },
    { q: 'Do seasonal ocean tours include safety guarantees?', a: 'Yes! Certified operators include USCG-licensed captains, full water safety harnesses, professional life vests, and proactive rescheduling guarantees for weather-compromised ports.' },
    { q: 'Are standard Cabo excursions safe for children?', a: 'Most water activities have kid-friendly shallow options with specialized child-sized buoyancy gears. Check individual minimum age guidelines for desert UTV or heavy ocean-bound charters.' }
  ],
  'restaurants': [
    { q: 'Do fine dining cliffside venues require reservations?', a: 'Yes, premium coastal table slots must typically be secured 2 to 4 weeks in advance, especially during sunset priority windows (generally 5:30 PM to 7:30 PM).' },
    { q: 'Is local farm-to-table cuisine genuinely organic?', a: 'San José foothill farm operations are strictly pesticide-free culinary sanctuaries, growing heirloom tomatoes, ancient greens, and herbs harvested daily.' },
    { q: 'Do local dining bills include tips and taxes?', a: 'Yes, a standard 16% Mexican VAT is applied. Gratuities are not included automatically on general checks; a baseline of 15% to 20% for excellent service is customary.' }
  ]
};

const CATEGORY_REVIEWS: Record<string, { author: string; city: string; venue: string; rating: number; text: string; avatar: string }[]> = {
  'hotels': [
    { author: 'Clara Ross', city: 'San Diego, CA', venue: 'Waldorf Astoria Pedregal', rating: 5, text: 'The tunnel entry, private plunge pool, and absolute clifftop views were unreal. Literally the highest tier of ocean luxury I’ve ever experienced in the sand.', avatar: '👩' },
    { author: 'Brandon Myers', city: 'Austin, TX', venue: 'The Cape Hotel', rating: 5, text: 'Rooftop cocktail deck looking directly at the stone Arch landmarks is the coolest vibe in Cabo. Exceptional guest hosts who handled our boat transfers.', avatar: '👨' },
    { author: 'Marta Gallagher', city: 'Denver, CO', venue: 'Grand Velas Resort', rating: 4.9, text: 'Genuinely delicious gourmet dining included in our suite package. Friendly clean rooms, perfect safety flags, and zero lines.', avatar: '👩' }
  ],
  'tours': [
    { author: 'Harrison Kemp', city: 'Seattle, WA', venue: 'Pisces Sportfishing Charter', rating: 5, text: 'Incredibly professional captain who calculated hot offshore temperatures and led us directly to massive marlin catches. Back on the Marina, they filleted everything beautifully.', avatar: '👨' },
    { author: 'Rebecca Thorne', city: 'Chicago, IL', venue: 'Cabo Adventures Whale Safari', rating: 5, text: 'Seeing three massive humpback parents and baby whale calf breaching just 40 yards out of the water was spectacular. Our marine biology host gave great acoustic insights.', avatar: '👩' },
    { author: 'Yoshi Tanaka', city: 'San Jose, CA', venue: 'Pelican Rock Snorkeling', rating: 4.8, text: 'Super clear sapphire water filled with bright multi-color fish trails. Safe kid-sized biological vests provided, great for families.', avatar: '👨' }
  ],
  'restaurants': [
    { author: 'Sophie V.', city: 'New York, NY', venue: 'Flora Farms Garden', rating: 5, text: 'Strolling past field sunflowers to eat organic wood-fired heirloom pizza under hanging bistro bulbs. Truly the cultural soul of our trip.', avatar: '👩' },
    { author: 'Mateo Gutierrez', city: 'Dallas, TX', venue: 'El Farallon Cliffs', rating: 5, text: 'Seafood catch-of-the-day laid out on ice next to mountain walls with spray mist. Genuinely dramatic, romantic, and worth every cent.', avatar: '👨' }
  ]
};

export default function CategoryList({
  initialZoneId,
  initialHub,
  initialSubcategory,
  onNavigateDetail,
  onNavigatePassport,
  onNavigateZone,
  onNavigateHome
}: CategoryListProps) {
  // Setup local states based on parsing parameters
  const [zoneId, setZoneId] = useState<string | null>(initialZoneId);
  const [hub, setHub] = useState<string | null>(initialHub || 'hotels');
  const [subcategory, setSubcategory] = useState<string | null>(initialSubcategory);

  // Filter States
  const [priceFilters, setPriceFilters] = useState<number[]>([]); // array of price levels chosen: 1, 2, 3, 4
  const [ratingFilter, setRatingFilter] = useState<number | null>(null); // e.g. 4.5, 4.0
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]); // amenities or tags

  // Sort State
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'priceLow' | 'open'>('rating');

  // View Mode: 'grid' or 'map'
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Hovered Listing on list or map
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);

  // Bookmarked items
  const [bookmarkedListings, setBookmarkedListings] = useState<string[]>([]);

  // Local newsletter subscription
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');

  // Mobile drawer filter toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync state if initial props change
  useEffect(() => {
    setZoneId(initialZoneId);
    setHub(initialHub || 'hotels');
    setSubcategory(initialSubcategory);
    // Reset filters upon category context switch
    setPriceFilters([]);
    setRatingFilter(null);
    setOpenNowOnly(false);
    setSelectedFeatures([]);
  }, [initialZoneId, initialHub, initialSubcategory]);

  const zoneName = useMemo(() => {
    if (zoneId && ZONE_LABELS[zoneId]) return ZONE_LABELS[zoneId];
    return 'Los Cabos';
  }, [zoneId]);

  const readableCategoryTitle = useMemo(() => {
    if (subcategory && CATEGORY_NAMES[subcategory]) {
      return CATEGORY_NAMES[subcategory];
    }
    if (hub && CATEGORY_NAMES[hub]) {
      return CATEGORY_NAMES[hub];
    }
    return 'Directory Spots';
  }, [hub, subcategory]);

  // Derive dynamic keyword rich SEO terms
  const h1Text = useMemo(() => {
    if (subcategory && CATEGORY_NAMES[subcategory]) {
      return `${CATEGORY_NAMES[subcategory]} in ${zoneName}`;
    }
    if (hub && CATEGORY_NAMES[hub]) {
      return `${CATEGORY_NAMES[hub]} in ${zoneName}`;
    }
    return `Premium Spots in ${zoneName}`;
  }, [hub, subcategory, zoneName]);

  const seoMetaTitle = useMemo(() => {
    return `${readableCategoryTitle} in ${zoneName} 2026 — Handpicked Safety Reviews | What's in Cabo`;
  }, [readableCategoryTitle, zoneName]);

  // Filter listings according to URL context and active filters
  const filteredListings = useMemo(() => {
    let result = DIRECTORY_LISTINGS.filter((item) => {
      // Zone match logic: if global route (no zone), pass through, otherwise match exact zone
      if (zoneId && item.zone !== zoneId) {
        return false;
      }
      // Hub match logic: match hub
      if (hub && item.hub !== hub) {
        // Also check if item.subcategory matches hub (allows flexibility if mapped direct)
        if (item.subcategory !== hub) return false;
      }
      // Subcategory match logic: if subcategory is explicitly defined in route URL
      if (subcategory && item.subcategory !== subcategory) {
        return false;
      }
      return true;
    });

    // Apply Filter state: Price Levels
    if (priceFilters.length > 0) {
      result = result.filter(item => priceFilters.includes(item.priceLevel));
    }

    // Apply Filter state: Minimum Rating
    if (ratingFilter !== null) {
      result = result.filter(item => item.rating >= ratingFilter);
    }

    // Apply Filter state: Open Now
    if (openNowOnly) {
      result = result.filter(item => item.isOpen);
    }

    // Apply Filter state: Features / Amenities
    if (selectedFeatures.length > 0) {
      result = result.filter(item => 
        selectedFeatures.every(f => 
          item.features.map(x => x.toLowerCase()).includes(f.toLowerCase())
        )
      );
    }

    // Compute Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'reviews') {
        return b.reviewsCount - a.reviewsCount;
      }
      if (sortBy === 'priceLow') {
        return a.priceLevel - b.priceLevel;
      }
      if (sortBy === 'open') {
        return (b.isOpen ? 1 : 0) - (a.isOpen ? 1 : 0);
      }
      return 0;
    });
  }, [zoneId, hub, subcategory, priceFilters, ratingFilter, openNowOnly, selectedFeatures, sortBy]);

  // Compute stats dynamically
  const statsSummary = useMemo(() => {
    const list = filteredListings.length > 0 ? filteredListings : DIRECTORY_LISTINGS;
    const avg = list.reduce((acc, curr) => acc + curr.rating, 0) / list.length;
    return {
      count: filteredListings.length,
      avgRating: avg.toFixed(1)
    };
  }, [filteredListings]);

  // Toggle Bookmark helper
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedListings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Generate category relevant feature checklist lists
  const filterFeatureOptions = useMemo(() => {
    if (hub === 'hotels') {
      return [
        { value: 'pool', label: 'Infinity Pool' },
        { value: 'spa', label: 'Luxury Spa' },
        { value: 'beach', label: 'Beachfront Access' },
        { value: 'adults only', label: 'Adults Only' },
        { value: 'all inclusive', label: 'All-Inclusive' }
      ];
    }
    if (hub === 'tours') {
      return [
        { value: 'small group', label: 'Small Group (<8)' },
        { value: 'easy difficulty', label: 'Easy Terrain' },
        { value: 'year-round', label: 'Year-Round Active' },
        { value: 'winter', label: 'Winter Whale Season' }
      ];
    }
    if (hub === 'restaurants') {
      return [
        { value: 'ocean view', label: 'Ocean Overlooks' },
        { value: 'romantic', label: 'Romantic Vibe' },
        { value: 'reservations', label: 'Takes Reservations' },
        { value: 'farm-to-table', label: 'Farm-To-Table' }
      ];
    }
    return [
      { value: 'day pass', label: 'Day Pass Available' },
      { value: 'live music', label: 'Live DJ or Band' },
      { value: 'luxury', label: 'VIP Services' }
    ];
  }, [hub]);

  const handleToggleFeature = (value: string) => {
    setSelectedFeatures(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleTogglePriceFilter = (level: number) => {
    setPriceFilters(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleResetFilters = () => {
    setPriceFilters([]);
    setRatingFilter(null);
    setOpenNowOnly(false);
    setSelectedFeatures([]);
  };

  // Structured breadcrumb arrays
  const breadcrumbs = useMemo(() => {
    const list = [{ label: 'Home', action: () => onNavigateHome() }];
    if (zoneId) {
      list.push({ label: zoneName, action: () => onNavigateZone(zoneId) });
    }
    if (hub) {
      list.push({ label: CATEGORY_NAMES[hub] || hub, action: () => {} });
    }
    if (subcategory) {
      list.push({ label: CATEGORY_NAMES[subcategory] || subcategory, action: () => {} });
    }
    return list;
  }, [zoneId, zoneName, hub, subcategory]);

  const categoryHeroBackground = useMemo(() => {
    if (hub && BACKGROUND_HEROS_BY_CATEGORIES[hub]) {
      return BACKGROUND_HEROS_BY_CATEGORIES[hub];
    }
    return BACKGROUND_HEROS_BY_CATEGORIES['hotels'];
  }, [hub]);

  const activeListingType = useMemo(() => {
    if (hub === 'restaurants') {
      if (!zoneId) {
        return 'global-restaurants';
      } else {
        return 'zone-restaurants';
      }
    } else if (hub === 'cabo-airport-shuttle') {
      return 'global-shuttle';
    } else if (hub === 'nightlife' && zoneId) {
      return 'zone-nightlife';
    } else if (hub === 'hotels' && zoneId) {
      return 'zone-hotels';
    }
    return 'other';
  }, [hub, zoneId]);

  const showWhenToVisit = useMemo(() => {
    return activeListingType === 'global-restaurants' || activeListingType === 'zone-restaurants' || activeListingType === 'global-shuttle';
  }, [activeListingType]);

  const showFAQs = useMemo(() => {
    return activeListingType !== 'other';
  }, [activeListingType]);

  const customWhenToVisit = useMemo(() => {
    if (activeListingType === 'global-restaurants' || activeListingType === 'zone-restaurants') {
      return {
        title: `When to Dine in ${zoneName}`,
        description: "Most upscale restaurants require reservations, especially in high season from December to April. Sunset tables book fastest. Dinner is the main event, with many top kitchens opening around 5pm or 6pm. The strongest dining scenes are in the San José del Cabo art district and along the Cabo San Lucas marina."
      };
    }
    if (activeListingType === 'global-shuttle') {
      return {
        title: "Good to Know Before You Land",
        description: "Los Cabos International Airport is about 45 minutes to 1 hour from Cabo San Lucas. Pre-booking a transfer is strongly recommended to avoid airport solicitation and inflated prices. Flights cluster midday, so transfers are busiest in the early afternoon. Private, shared, and large-group options are available year-round."
      };
    }
    return {
      title: "",
      description: ""
    };
  }, [activeListingType, zoneName]);

  const customFAQs = useMemo(() => {
    switch (activeListingType) {
      case 'zone-hotels':
        return [
          {
            q: `What are the best hotels in ${zoneName}?`,
            a: `The best hotels in ${zoneName} range from all-inclusive beachfront resorts to boutique adults-only properties and family-friendly stays. The right choice depends on whether you want all-inclusive convenience, luxury seclusion, or walkable access to restaurants and nightlife.`
          },
          {
            q: "What is the best area to stay in Los Cabos?",
            a: "The best area to stay in Los Cabos depends on your trip style. Cabo San Lucas is best for nightlife and walkability. The Tourist Corridor offers the most luxury resorts and quiet beaches. San José del Cabo suits travelers who want culture and calm."
          },
          {
            q: "Are all-inclusive resorts worth it in Los Cabos?",
            a: "All-inclusive resorts are popular in Los Cabos because many beaches are not swimmable and dining out adds up. They offer the most value for travelers who plan to spend most of their time at the resort."
          },
          {
            q: "Which resorts in Los Cabos are adults-only?",
            a: "The adults-only resorts in Los Cabos are focused on quiet pools, fine dining, and couples or wellness travel. This strong selection of properties is located mostly along the Tourist Corridor and Pacific coast."
          },
          {
            q: "When is the best time to book a hotel in Los Cabos?",
            a: "The best time to book a hotel in Los Cabos depends on the season, requiring booking two to three months ahead for high season from December to April. For lower rates and fewer crowds, travel May through November."
          },
          {
            q: "Are there family-friendly resorts in Los Cabos?",
            a: "Family-friendly resorts in Los Cabos are plentiful, with many all-inclusive options featuring kids clubs, pools, and family suites concentrated along the calmer Sea of Cortez beaches."
          }
        ];
      case 'global-restaurants':
      case 'zone-restaurants':
        return [
          {
            q: `What are the best restaurants in ${zoneName}?`,
            a: `The best restaurants in ${zoneName} range from fine dining with ocean views to authentic local taquerias. Top choices include oceanfront tables, farm-to-table spots, and fresh seafood near the marina. Every restaurant listed is hand-picked and verified.`
          },
          {
            q: "What are the best restaurants with a view in Cabo?",
            a: "The best restaurants with a view in Cabo are especially located along the cliffs and marina, offering stunning ocean and Arch views. Sunset seating is the most requested, so reservations are strongly recommended."
          },
          {
            q: "Are there Michelin star restaurants in Los Cabos?",
            a: "Michelin star restaurants do not yet officially exist in Los Cabos due to a lack of guide coverage, but several properties feature Michelin-trained chefs and world-class tasting menus that rival major culinary destinations."
          },
          {
            q: "Where should I eat in San José del Cabo?",
            a: "The best places to eat in San José del Cabo are known for farm-to-table and contemporary Mexican cuisine, especially in the historic art district."
          },
          {
            q: "What is the best Mexican food in Los Cabos?",
            a: "The best Mexican food in Los Cabos features everything from upscale contemporary Mexican dishes to authentic street tacos."
          },
          {
            q: "Do I need reservations for restaurants in Los Cabos?",
            a: "Reservations for restaurants in Los Cabos are strongly recommended for upscale and fine dining, especially in high season."
          }
        ];
      case 'zone-nightlife':
        return [
          {
            q: `What is the nightlife like in ${zoneName}?`,
            a: `Nightlife in ${zoneName} ranges from high-energy nightclubs and beach parties to relaxed mezcal bars and rooftop lounges. The main scene is concentrated downtown near the marina and gets busiest after 11pm.`
          },
          {
            q: "Where are the best bars in Cabo San Lucas?",
            a: "The best bars in Cabo San Lucas are concentrated downtown near the marina, ranging from lively party bars to craft cocktail lounges and traditional tequila and mezcal bars."
          },
          {
            q: "Is Cabo San Lucas good for spring break?",
            a: "Yes, Cabo San Lucas is an exceptionally popular spring break destination, especially in March."
          },
          {
            q: "What time does nightlife start in Cabo?",
            a: "Nightlife in Cabo typically starts with bars filling up in the evening, while major nightclubs get busiest after 11pm."
          },
          {
            q: "Are there tequila and mezcal bars in Cabo?",
            a: "Yes, tequila and mezcal bars in Cabo are found in a strong selection that offers tastings of traditional spirits."
          },
          {
            q: "Is nightlife in Cabo safe?",
            a: "Nightlife in Cabo is considered safe because the main tourist areas are well-patrolled."
          }
        ];
      case 'global-shuttle':
        return [
          {
            q: "What are the best airport shuttle options in Los Cabos?",
            a: "The best airport shuttle options in Los Cabos include private transfers, shared shuttles, and large-group vans. Private transfers are fastest and most comfortable, while shared shuttles cost less."
          },
          {
            q: "How do I get from Los Cabos airport to my hotel?",
            a: "To get from Los Cabos airport to your hotel, the most reliable method is booking a private or shared transfer."
          },
          {
            q: "How much is a transfer from Cabo airport to the hotel?",
            a: "The cost of a transfer from Cabo airport to your hotel depends on the type of vehicle and destination."
          },
          {
            q: "Is it safe to take a shuttle from Cabo airport?",
            a: "Yes, taking a shuttle from Cabo airport is safe when booked through a verified and licensed service."
          },
          {
            q: "How long is the drive from Cabo airport to Cabo San Lucas?",
            a: "The drive from Los Cabos International Airport to Cabo San Lucas takes approximately 45 minutes to 1 hour depending on traffic and your hotel location."
          },
          {
            q: "Can I book a shuttle for a large group in Los Cabos?",
            a: "Yes, booking a shuttle for a large group in Los Cabos is easy with private vans and coaches available."
          }
        ];
      default:
        return [];
    }
  }, [activeListingType, zoneName]);

  const customHeroHeader = useMemo(() => {
    switch (activeListingType) {
      case 'zone-hotels':
        return {
          h1: `Hotels & All-Inclusive Resorts in ${zoneName}`,
          intro: "From beachfront all-inclusive resorts to adults-only luxury and family-friendly stays. Every property here is vetted by our local team for what it actually delivers."
        };
      case 'global-restaurants':
        return {
          h1: "The Best Restaurants in Los Cabos",
          intro: "From Michelin-level fine dining with views of the Arch to the taco stands locals actually go to. We have eaten at every restaurant we list here."
        };
      case 'zone-restaurants':
        return {
          h1: `The Best Restaurants in ${zoneName}`,
          intro: "From Michelin-level fine dining with views of the Arch to the taco stands locals actually go to. We have eaten at every restaurant we list here."
        };
      case 'zone-nightlife':
        return {
          h1: `Nightlife & Bars in ${zoneName}`,
          intro: `Beach clubs that turn into parties, marina bars, and the spots locals actually drink at. Your guide to going out in ${zoneName}.`
        };
      case 'global-shuttle':
        return {
          h1: "Airport Shuttle & Transfers in Los Cabos",
          intro: "Private and shared transfers from Los Cabos airport to your hotel. Vetted drivers, fixed prices, no airport hassle."
        };
      default:
        let defaultIntro = "Curated local spots and luxury adventures compiled by our local Los Cabos travel guides for safety, quality, and community value.";
        if (hub === 'yacht-charters') defaultIntro = "Explore the beautiful deep waters of the Sea of Cortez with hand-selected boat rentals and fully crewed luxury yachts.";
        else if (hub === 'golf') defaultIntro = "Play world-class championship courses along spectacular oceanfront fairways designed by master architects.";
        else if (hub === 'spas') defaultIntro = "Indulge in soothing regional clay wraps, quiet therapy pools, and oceanfront open-air massages vetted for genuine relaxation.";
        else if (hub === 'beach-clubs') defaultIntro = "Rent comfortable shaded cabanas and sip direct oceanfront cocktails on swimmable shores with local safety flags.";
        else if (hub === 'vacation-rentals') defaultIntro = "Experience total privacy in vetted luxury seaside estates, private hillside villas, and curated beachfront condos.";
        else if (hub === 'vacation-packages') defaultIntro = "Book all-inclusive multi-day activity schedules and handpicked luxury room bundles made simple for Cabo travel.";
        else if (hub === 'car-rentals') defaultIntro = "Drive with confidence using fully transparent, zero-surprise local car rentals with included safety options.";
        else if (hub === 'tours') defaultIntro = "Experience authentic local fishing, whale watching, and desert excursions vetted for safety and quality.";
        
        return {
          h1: h1Text,
          intro: defaultIntro
        };
    }
  }, [activeListingType, zoneName, h1Text, hub]);

  // Derived dynamic lists for customized reviews
  const currentCategoryReviews = useMemo(() => {
    if (hub && CATEGORY_REVIEWS[hub]) {
      return CATEGORY_REVIEWS[hub];
    }
    return CATEGORY_REVIEWS['hotels'];
  }, [hub]);

  return (
    <div className="min-h-screen bg-[#fdfbf7]/40 flex flex-col font-sans text-[#1B3A5B] antialiased">
      {/* Schema metadata script as a JSON-LD comment for indexing audit */}
      {/*
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "${seoMetaTitle}",
          "description": "Safe handpicked dynamic directory for ${readableCategoryTitle} in ${zoneName}.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whatsincabo.com/" },
              { "@type": "ListItem", "position": 2, "name": "${zoneName}", "item": "https://whatsincabo.com/${zoneId || ''}" },
              { "@type": "ListItem", "position": 3, "name": "${readableCategoryTitle}" }
            ]
          },
          "alreadyCuratedSpotsCount": ${statsSummary.count}
        }
      */}

      {/* ================= BREADCRUMBS STRIP ================= */}
      <div className="bg-[#FAF7F0] border-b border-gray-200/50 py-3" id="category-breadcrumbs">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 text-xs text-gray-400 font-medium font-sans">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3 h-3 break-words text-gray-300" />}
              <button 
                onClick={crumb.action}
                className={`hover:text-[#2E8B8B] tracking-tight transition cursor-pointer text-left ${idx === breadcrumbs.length - 1 ? 'text-gray-600 font-bold' : ''}`}
                disabled={idx === breadcrumbs.length - 1}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= CATEGORY HERO ================= */}
      <section className="relative h-[240px] md:h-[280px] bg-[#1B3A5B] overflow-hidden" id="category-hero">
        <div className="absolute inset-0 select-none">
          <img 
            src={categoryHeroBackground} 
            alt={readableCategoryTitle}
            className="w-full h-full object-cover opacity-45 transform scale-102 filter blur-[0.5px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5B]/90 via-[#1B3A5B]/40 to-[#1B3A5B]/65" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 pb-8 md:pb-10 relative z-10 space-y-3.5">
          <span className="text-[10px] font-mono font-bold text-[#C9A961] uppercase tracking-[0.2em] inline-block animate-pulse">
            ★ CURATED SPOT COLLECTIVE
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-4px font-black tracking-tight text-white leading-tight">
            {customHeroHeader.h1}
          </h1>
          {customHeroHeader.intro && (
            <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed font-sans font-medium">
              {customHeroHeader.intro}
            </p>
          )}

          {/* Curated Trust strip */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-white/90">
            <span className="flex items-center gap-1.5 font-bold bg-[#2E8B8B]/40 px-2.5 py-1 rounded-md border border-white/10 shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{statsSummary.count} vetted choices</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md shadow-xs">
              <Star className="w-4 h-4 text-[#C9A961] fill-[#C9A961] shrink-0" />
              <span className="font-bold">{statsSummary.avgRating || '4.8'} Avg Rating</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/80 select-none hidden sm:inline-flex">
              🛡 Safe local reservations
            </span>
          </div>
        </div>
      </section>

      {/* ================= MAIN INTERACTIVE BODY (SIDEBAR + GRID/MAP) ================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 flex-1 w-full" id="category-core-area">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= FILTER SIDEBAR (DESKTOP) ================= */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-20 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs" id="category-desktop-sidebar">
            <div className="flex items-center justify-between border-b pb-4 border-gray-100">
              <h3 className="font-sans font-extrabold text-[#1B3A5B] text-sm tracking-tight flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2E8B8B]" />
                Refine Search
              </h3>
              {(priceFilters.length > 0 || ratingFilter !== null || openNowOnly || selectedFeatures.length > 0) && (
                <button 
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Price Segment Filter */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">
                Price Bracket
              </h4>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(level => (
                  <button
                    key={level}
                    onClick={() => handleTogglePriceFilter(level)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      priceFilters.includes(level)
                        ? 'bg-[#1B3A5B] text-white border-[#1B3A5B]'
                        : 'bg-[#faf7f2]/50 text-[#1B3A5B] border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {'$'.repeat(level)}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Segment Filter */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">
                Average Rating
              </h4>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setRatingFilter(prev => prev === rating ? null : rating)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      ratingFilter === rating
                        ? 'bg-[#2E8B8B]/10 text-[#2E8B8B] border-[#2E8B8B]'
                        : 'bg-transparent text-gray-600 border-gray-150 hover:bg-[#faf7f2]/30'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C9A961] text-[#C9A961]" />
                      {rating.toFixed(1)} and above
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">★ Only VIP</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Open / Closed Status Filter */}
            <div className="flex items-center justify-between p-3 bg-[#FAF7F2]/40 rounded-xl border border-gray-100 select-none">
              <div>
                <span className="text-xs font-bold text-[#1B3A5B] block">Open Now Only</span>
                <span className="text-[10px] text-gray-400 block">Filter active operations</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={openNowOnly} 
                  onChange={(e) => setOpenNowOnly(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2E8B8B]"></div>
              </label>
            </div>

            {/* Custom Dynamic Features based on category type */}
            <div className="space-y-3 border-t pt-4 border-gray-100">
              <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">
                Elite Features
              </h4>
              <div className="space-y-2">
                {filterFeatureOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handleToggleFeature(opt.value)}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition duration-150 cursor-pointer ${
                      selectedFeatures.includes(opt.value)
                        ? 'bg-[#2E8B8B]/10 font-bold text-[#2E8B8B]'
                        : 'hover:bg-[#FAF7F2]/50 text-gray-600'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      selectedFeatures.includes(opt.value) ? 'border-[#2E8B8B] bg-[#2E8B8B] text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedFeatures.includes(opt.value) && <Check className="w-3 h-3 stroke-[3px]" />}
                    </div>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ================= RESULTS / GRID AREA ================= */}
          <main className="lg:col-span-9 space-y-6" id="category-listings-grid-and-map">
            
            {/* Grid Header Controls (Map view toggler & Sorts) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-150/60 pb-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black text-[#1B3A5B] tracking-tight">
                  {filteredListings.length} Curated Options
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Showing matches in {zoneName}. Authenticated for safety.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Mobile Filter Trigger */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 bg-white border border-gray-250 rounded-xl px-3.5 py-2 text-xs font-bold text-[#1B3A5B] shadow-xs cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#2E8B8B]" />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-sm">
                  <span className="text-[10px] text-gray-400 font-bold uppercase shrink-0">Sort:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent border-none text-xs font-bold text-[#1B3A5B] focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    <option value="rating">Top Rated</option>
                    <option value="reviews">Most Reviewed</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="open">Open Now</option>
                  </select>
                </div>

                {/* Map/Grid Toggle on Right */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl shadow-inner select-none">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#1B3A5B] shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      viewMode === 'map'
                        ? 'bg-white text-[#2E8B8B] shadow-sm'
                        : 'text-gray-500 hover:text-[#2E8B8B]'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Map View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* VIEW MODE BRANCHING */}
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                /* ================= GRID MODE ================= */
                <motion.div 
                  key="grid-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredListings.length === 0 ? (
                    <div className="col-span-full py-16 text-center space-y-4 bg-white border border-gray-150 rounded-3xl p-8" id="empty-state">
                      <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
                        <Sliders className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[#1B3A5B] font-extrabold text-sm">No spots match these filters yet.</h4>
                        <p className="text-xs text-gray-400">Try loosening your features, star ratings or price filters.</p>
                      </div>
                      <button
                        onClick={handleResetFilters}
                        className="bg-[#2E8B8B] hover:bg-[#206161] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    filteredListings.map((item, index) => {
                      const isBookmarked = bookmarkedListings.includes(item.id);
                      return (
                        <React.Fragment key={item.id}>
                          {/* Cabo Passport inline ad placement after every 12 listings */}
                          {index === 12 && (
                            <div className="col-span-1 bg-[#1B3A5B] text-white rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow border border-yellow-500/25 relative overflow-hidden" id="cabo-passport-ad">
                              <div className="absolute top-0 right-0 p-1 bg-yellow-500 text-white text-[8px] font-bold uppercase rounded-bl-lg">
                                AD
                              </div>
                              <div className="space-y-1.5">
                                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-semibold px-2 py-0.5 rounded text-[9px] font-mono tracking-wider w-max">
                                  CABO PASSPORT EXCLUSIVE
                                </div>
                                <h4 className="text-base font-black tracking-tight leading-snug">
                                  Save an average of $180 on your tour with the Cabo Passport.
                                </h4>
                                <p className="text-xs text-white/70">
                                  Unlock 2-for-1 deals, discount codes and free meals. Available from $29 USD.
                                </p>
                              </div>
                              <button
                                onClick={onNavigatePassport}
                                className="w-full bg-[#C9A961] hover:bg-[#b0914f] text-[#1B3A5B] font-extrabold font-sans text-xs py-2.5 rounded-xl tracking-tight transition text-center cursor-pointer"
                              >
                                Learn more & Save →
                              </button>
                            </div>
                          )}

                          <div 
                            onMouseEnter={() => setHoveredListingId(item.id)}
                            onMouseLeave={() => setHoveredListingId(null)}
                            onClick={() => onNavigateDetail('tours', item.id as any)} // fallback dynamic detail router
                            className="bg-white rounded-2xl overflow-hidden border border-gray-150/70 hover:shadow-md transition-all duration-300 group cursor-pointer relative"
                          >
                            {/* Photo Cover Section */}
                            <div className="h-44 sm:h-48 overflow-hidden relative select-none">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                              
                              {/* Bookmark icon */}
                              <button
                                onClick={(e) => handleToggleBookmark(item.id, e)}
                                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1B3A5B] flex items-center justify-center transition shadow-sm z-10 cursor-pointer"
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-[#2E8B8B] fill-[#2E8B8B]' : 'text-gray-400'}`} />
                              </button>

                              {/* Open/Closed subtitle text */}
                              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold text-white select-none">
                                {item.isOpen ? (
                                  <span className="text-emerald-400">● Open Now</span>
                                ) : (
                                  <span className="text-gray-300">Closed</span>
                                )}
                              </div>
                            </div>

                            {/* Info Details Section */}
                            <div className="p-4.5 space-y-2.5">
                              {/* Star Ratings + Review Count */}
                              <div className="flex items-center gap-1 text-xs font-sans">
                                <span className="text-[#C9A961] text-xs">⭐</span>
                                <span className="font-extrabold text-[#1B3A5B]">{item.rating}</span>
                                <span className="text-gray-400 font-medium font-sans">({item.reviewsCount})</span>
                                <span className="mx-1 text-gray-200">|</span>
                                <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider">{item.subcategory}</span>
                              </div>

                              {/* Title / Name */}
                              <h3 className="font-sans font-extrabold text-[#1B3A5B] text-[15px] group-hover:text-[#2E8B8B] transition duration-200 leading-snug truncate">
                                {item.name}
                              </h3>

                              {/* Target Details strip */}
                              <div className="flex items-center justify-between gap-2.5 text-xs text-gray-400 pt-1 border-t border-gray-100/70">
                                <span className="flex items-center gap-1 truncate font-medium font-sans max-w-[130px]">
                                  <MapPin className="w-3.5 h-3.5 text-[#2E8B8B] shrink-0" />
                                  <span className="truncate">{item.zoneLabel}</span>
                                </span>
                                <span className="font-mono font-extrabold text-[#1B3A5B] shrink-0 bg-[#faf7f2] px-2 py-0.5 rounded border border-gray-100">
                                  {item.priceLabel || '$'.repeat(item.priceLevel)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })
                  )}
                </motion.div>
              ) : (
                /* ================= COMPREHENSIVE VECTOR COASTAL MAP VIEW ================= */
                /* Fully self-contained, interactive, pixel-perfect layout using our SVG coastal map dashboard */
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 h-[580px]"
                >
                  {/* Map Visual (Left 8 Columns) */}
                  <div className="lg:col-span-8 relative bg-[#EDF8FF] rounded-2.5xl h-full border border-blue-200/40 flex items-center justify-center overflow-hidden">
                    {/* SVG map background with sand shores, sea depth corridors & dynamic paths */}
                    <svg className="absolute inset-0 w-full h-full select-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                      {/* Deep Water base background gradient is handled via parent, we paint shallow sea */}
                      <path d="M 0,220 Q 200,280 400,260 T 800,290 L 800,600 L 0,600 Z" fill="#D8F1FF" opacity="0.6" />
                      <path d="M 0,250 Q 180,310 400,290 T 800,320 L 800,600 L 0,600 Z" fill="#BBE3FF" opacity="0.75" />
                      
                      {/* Coastlines & beaches */}
                      <path d="M -50,180 Q 220,240 400,220 T 850,250" stroke="#E6C89A" strokeWidth="18" fill="none" opacity="0.35" />
                      <path d="M -50,180 Q 220,240 400,220 T 850,250" stroke="#FCEFCE" strokeWidth="10" fill="none" opacity="0.8" />
                      
                      {/* Baja Landmass */}
                      <path d="M -50,-50 L 850,-50 L 850,240 Q 600,220 400,220 T -50,180 Z" fill="#F4EDE2" />

                      {/* Hills & desert illustrations */}
                      <path d="M 50,100 Q 90,60 130,100 Z" fill="#E8DCD1" opacity="0.7" />
                      <path d="M 110,120 Q 140,80 170,120 Z" fill="#E8DCD1" opacity="0.5" />
                      <path d="M 480,130 Q 520,70 560,130 Z" fill="#E8DCD1" opacity="0.6" />
                      <path d="M 600,120 Q 640,80 680,120 Z" fill="#E8DCD1" opacity="0.7" />

                      {/* Pacific Ocean & Sea of Cortez labels */}
                      <text x="120" y="450" fill="#1B3A5B" opacity="0.3" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="0.2em">PACIFIC OCEAN</text>
                      <text x="560" y="420" fill="#1B3A5B" opacity="0.3" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="0.2em">SEA OF CORTEZ</text>
                      
                      {/* Land's End Stone Arch vector anchor */}
                      <path d="M 430,220 Q 425,190 415,225" stroke="#D1B072" strokeWidth="12" fill="none" strokeLinecap="round" />
                      <circle cx="440" cy="220" r="1.5" fill="#1B3A5B" />
                      <text x="444" y="215" fill="#8C7449" fontSize="9" fontWeight="bold">Land's End (The Arch)</text>

                      {/* City Anchor Marks */}
                      <circle cx="180" cy="170" r="5" fill="#2E8B8B" />
                      <text x="180" y="155" textAnchor="middle" fill="#1B3A5B" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Cabo San Lucas</text>

                      <circle cx="680" cy="180" r="5" fill="#2E8B8B" />
                      <text x="680" y="165" textAnchor="middle" fill="#1B3A5B" fontSize="10" fontWeight="bold" fontFamily="sans-serif">San José del Cabo</text>

                      <path d="M 185,170 Q 430,230 675,180" stroke="#1B3A5B" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.2" />
                      <text x="420" y="160" textAnchor="middle" fill="#1B3A5B" opacity="0.4" fontSize="9" fontWeight="bold">Tourist Corridor Route</text>
                    </svg>

                    {/* Interactive Pulsing Map Pins */}
                    {filteredListings.map(item => {
                      const isHovered = hoveredListingId === item.id;
                      return (
                        <div
                          key={item.id}
                          className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          style={{ top: `${item.lat}%`, left: `${item.lng}%`, zIndex: isHovered ? 50 : 20 }}
                          onMouseEnter={() => setHoveredListingId(item.id)}
                          onMouseLeave={() => setHoveredListingId(null)}
                          onClick={() => onNavigateDetail('tours', item.id as any)}
                        >
                          <div className="relative group/pin">
                            {/* Pulse Rings */}
                            {isHovered && (
                              <span className="absolute -inset-2.5 bg-teal-400/30 rounded-full animate-ping shrink-0" />
                            )}
                            {/* Pin Node */}
                            <div className={`w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center shadow-md border transition-all ${
                              isHovered 
                                ? 'bg-[#2E8B8B] text-white border-white scale-112 ring-2 ring-[#2E8B8B]/30' 
                                : 'bg-[#1B3A5B] text-[#C9A961] border-[#C9A961]/40 hover:bg-[#2E8B8B] hover:text-white'
                            }`}>
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                            </div>

                            {/* Self-contained Tooltip hover overlay card */}
                            {isHovered && (
                              <div className="absolute top-[36px] left-1/2 transform -translate-x-1/2 bg-white rounded-xl border border-gray-200 p-2.5 shadow-xl w-[190px] text-left select-none pointer-events-none animate-fadeIn z-50">
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.name} 
                                  className="w-full h-18 object-cover rounded-md mb-1.5"
                                  referrerPolicy="no-referrer"
                                />
                                <h5 className="text-[11px] font-extrabold text-[#1B3A5B] leading-tight truncate">{item.name}</h5>
                                <div className="flex items-center justify-between text-[9px] text-[#2E8B8B] font-bold mt-1">
                                  <span>⭐ {item.rating}</span>
                                  <span className="text-gray-400 font-mono text-[8px]">{item.priceLabel || '$$'}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sidebar listings summary (Right 4 Columns) */}
                  <div className="lg:col-span-4 flex flex-col h-full border-l border-gray-150 pl-2 space-y-4 overflow-y-auto" id="map-listings-sidebar">
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-bold uppercase text-[#2E8B8B] tracking-wider">
                        Interactive List Coordinates
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium">
                        Hover an item to locate its beachfront pointer pin.
                      </p>
                    </div>

                    <div className="space-y-3.5 flex-1 pr-1.5 scrollbar-thin">
                      {filteredListings.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-xs font-medium">
                          No matching coordinates.
                        </div>
                      ) : (
                        filteredListings.map(item => (
                          <div
                            key={item.id}
                            onMouseEnter={() => setHoveredListingId(item.id)}
                            onMouseLeave={() => setHoveredListingId(null)}
                            onClick={() => onNavigateDetail('tours', item.id as any)}
                            className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3 ${
                              hoveredListingId === item.id
                                ? 'bg-[#2E8B8B]/5 border-[#2E8B8B] shadow-xs'
                                : 'bg-white border-gray-100 hover:border-gray-300'
                            }`}
                          >
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-14 h-14 object-cover rounded-lg shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 flex-1 space-y-1 text-left">
                              <h5 className="text-xs font-extrabold text-[#1B3A5B] leading-tight truncate group-hover:text-[#2E8B8B]">
                                {item.name}
                              </h5>
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                <span>⭐ {item.rating}</span>
                                <span>•</span>
                                <span className="truncate">{item.zoneLabel}</span>
                              </div>
                              <span className="text-[9px] font-mono font-bold text-[#2E8B8B] uppercase">{item.subcategory}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </section>

      {/* ================= REVIEWS FEEDBACK ================= */}
      <section className="py-16 bg-[#FAF7F0] border-y border-gray-200/40" id="category-reviews">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2.5">
            <span className="text-[9px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.2em] block">
              GUEST SATISFACTION INDEX
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1B3A5B] tracking-tight">
              What Travelers Say About {readableCategoryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
              Real testimonials from authenticated guests. Read direct reviews covering ocean transfers and overall safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCategoryReviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2.5xl border border-gray-150/70 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl select-none">{rev.avatar}</span>
                    <div className="flex text-amber-400">
                      {'★'.repeat(Math.round(rev.rating))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3.5 border-t border-gray-100 text-[11px]">
                  <div>
                    <span className="font-extrabold text-[#1B3A5B] block">{rev.author}</span>
                    <span className="text-gray-400">{rev.city}</span>
                  </div>
                  <span className="bg-[#2E8B8B]/10 text-[#2E8B8B] font-mono font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                    {rev.venue.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHEN TO VISIT ================= */}
      {showWhenToVisit && (
        <section className="py-16 bg-white border-t border-gray-200/40" id="category-seasonality">
          <div className="max-w-4xl mx-auto px-4 space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-[#C9A961] uppercase tracking-[0.2em] block">
                Baja Seasonal Guide
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1B3A5B] tracking-tight">
                {customWhenToVisit.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
                {customWhenToVisit.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================= CATEGORY FAQs (Topical Relevance Accordions) ================= */}
      {showFAQs && customFAQs.length > 0 && (
        <section className="py-16 bg-[#FAF7F0]/40 border-t border-gray-200/40" id="category-faqs">
          <div className="max-w-4xl mx-auto px-4 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-[9px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.2em] block">
                COMMON QUESTIONS
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1B3A5B] tracking-tight">
                {customHeroHeader.h1} Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Straightforward answers regarding rules, bookings, and safe local guidelines.
              </p>
            </div>

            <div className="space-y-3.5">
              {customFAQs.map((faq, idx) => (
                <details 
                  key={idx}
                  className="group bg-white rounded-2xl border border-gray-150 p-4.5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer select-none question-header">
                    <h3 className="text-sm font-extrabold text-[#1B3A5B] pr-4 flex items-center gap-2.5">
                      <span className="text-[#2E8B8B] text-xs font-mono">Q.</span>
                      {faq.q}
                    </h3>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180 bg-gray-50 p-1.5 rounded-full">
                      <ChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
                    </span>
                  </summary>
                  <div className="mt-3.5 pt-3.5 border-t border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed font-sans font-medium">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= NEWSLETTER ================= */}
      <section className="py-20 bg-white" id="zone-newsletter">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-8 text-left relative">
            <div className="space-y-2 max-w-md">
              <span className="text-[9px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.15em] block">
                WEEKLY INSIDER DIGEST
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1B3A5B] tracking-tight leading-tight">
                Planning your {zoneName} trip?
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Get our weekly picks — the best new tours, seasonal tips and local deals. Read by 12,000+ travelers.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 max-w-sm">
              {newsletterSubscribed ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-xs text-emerald-800 font-bold">
                    Successfully subscribed! Check your inbox soon.
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); if (newsletterEmail.trim()) setNewsletterSubscribed(true); }}
                  className="space-y-2"
                >
                  <div className="flex border border-gray-300 rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-[#2E8B8B] transition">
                    <input 
                      type="email" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address" 
                      className="p-3 text-xs flex-1 text-gray-800 focus:outline-none placeholder-gray-400"
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-[#1B3A5B] hover:bg-[#20456c] text-[#C9A961] text-xs font-black uppercase px-4 py-3 cursor-pointer transition active:scale-95"
                    >
                      Send me the picks
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 italic">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE COLLAPSED FILTERS BOTTOM SHEET ================= */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#1B3A5B] z-50 lg:hidden"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-xl z-50 p-6 space-y-6 max-h-[85vh] overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#2E8B8B]" />
                  <h3 className="font-sans font-extrabold text-[#1B3A5B] text-base tracking-tight">Refine Directory Search</h3>
                </div>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 rounded-full cursor-pointer transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Price Bracket */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">Price Bracket</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(level => (
                    <button
                        key={level}
                        onClick={() => handleTogglePriceFilter(level)}
                        className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          priceFilters.includes(level)
                            ? 'bg-[#1B3A5B] text-white border-[#1B3A5B]'
                            : 'bg-[#faf7f2]/50 text-[#1B3A5B] border-gray-200'
                        }`}
                    >
                      {'$'.repeat(level)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Average Rating */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">Average Rating</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[4.5, 4.0, 3.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(prev => prev === rating ? null : rating)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        ratingFilter === rating
                          ? 'bg-[#2E8B8B]/10 text-[#2E8B8B] border-[#2E8B8B]'
                          : 'bg-transparent text-gray-600 border-gray-150'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-[#C9A961] text-[#C9A961] mb-1" />
                      <span>{rating.toFixed(1)}+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle switch */}
              <div className="flex items-center justify-between p-3.5 bg-[#FAF7F2]/60 rounded-xl border border-gray-100">
                <div>
                  <span className="text-xs font-bold text-[#1B3A5B] block">Open Now Only</span>
                  <span className="text-[10px] text-gray-400 block">Filter active operations</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={openNowOnly} 
                    onChange={(e) => setOpenNowOnly(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2E8B8B]"></div>
                </label>
              </div>

              {/* Elite Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">Elite Features Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {filterFeatureOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleToggleFeature(opt.value)}
                      className={`flex items-center gap-2 p-3 rounded-xl text-left text-xs border transition cursor-pointer ${
                        selectedFeatures.includes(opt.value)
                          ? 'bg-[#2E8B8B]/10 font-bold text-[#2E8B8B] border-[#2E8B8B]'
                          : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                        selectedFeatures.includes(opt.value) ? 'border-[#2E8B8B] bg-[#2E8B8B] text-white' : 'border-gray-300'
                      }`}>
                        {selectedFeatures.includes(opt.value) && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                      </div>
                      <span className="truncate">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 text-xs font-extrabold text-gray-500 bg-gray-100 rounded-xl text-center cursor-pointer hover:bg-gray-200 transition"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 text-xs font-extrabold text-white bg-[#2E8B8B] rounded-xl text-center cursor-pointer hover:bg-[#206161] transition shadow"
                >
                  Apply & See ({filteredListings.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
