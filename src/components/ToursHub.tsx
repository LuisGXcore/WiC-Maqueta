import React, { useState, useRef, useEffect } from 'react';
import { 
  motion, AnimatePresence 
} from 'motion/react';
import { 
  Compass, Star, MapPin, Clock, Calendar, CheckSquare, 
  HelpCircle, ChevronLeft, ChevronRight, X, Mail, CheckCircle, 
  ShieldCheck, ArrowRight, Heart, Award, Sparkles, MessageSquare, BookOpen 
} from 'lucide-react';
import { TourDetail, TourTypeId, DomainType } from '../types';
import { tourDetails, tourTypeConfigs } from '../data';

interface ToursHubProps {
  onNavigateDetail: (domain: DomainType, id: TourTypeId) => void;
  onNavigateCategory: (domain: DomainType, hubId?: string | null, subId?: string | null, zoneId?: string | null) => void;
  onNavigatePassport: () => void;
  toursZoneId?: string | null;
  onNavigateZone?: (zoneId: string | null) => void;
}

// Full list of 13 subcategories in popularity order
interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  h2: string;
  description: string;
  badge: string;
  photo: string;
  tourCount: string;
}

const ALL_CATEGORIES: CategoryConfig[] = [
  {
    id: 'whale-watching',
    name: 'Whale Watching Tours',
    slug: 'whale-watching',
    h2: 'Whale Watching',
    description: 'Experience majestic humpback and gray whale encounters in their natural nursery. Guided by certified marine biologists.',
    badge: 'Season: Dec-Apr',
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    tourCount: '12 Tours'
  },
  {
    id: 'fishing',
    name: 'Fishing Charters',
    slug: 'fishing',
    h2: 'Fishing Charters',
    description: 'Set sail on world-class deep-sea charters to the Marlin Capital of the World. State-of-the-art Shimano gears included.',
    badge: 'From $189',
    photo: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=600',
    tourCount: '8 Tours'
  },
  {
    id: 'boat-tours',
    name: 'Boat Tours & Cruises',
    slug: 'boat-tours',
    h2: 'Boat Tours & Cruises',
    description: 'Sail past El Arco on premium catamarans, luxury yachts, and romantic sunset cruises with custom chef dinners.',
    badge: 'Most Booked',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    tourCount: '15 Tours'
  },
  {
    id: 'snorkeling',
    name: 'Snorkeling Tours',
    slug: 'snorkeling',
    h2: 'Snorkeling',
    description: 'Swim with sea lions, schools of jackfish, and explore vibrant coral reefs at Cabo Pulmo National Marine Park.',
    badge: 'All levels welcome',
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    tourCount: '9 Tours'
  },
  {
    id: 'zipline',
    name: 'Zipline & Adventure',
    slug: 'zipline',
    h2: 'Zipline & Adventure',
    description: 'Soar across rugged Baja canyons on high-speed cables and enjoy extreme desert rappelling safely.',
    badge: 'Adrenaline rush',
    photo: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600',
    tourCount: '6 Tours'
  },
  {
    id: 'atv',
    name: 'ATV Tours',
    slug: 'atv',
    h2: 'ATV Tours',
    description: 'Race across dramatic sand dunes and dusty backcountry desert trails led by certified trail guides.',
    badge: 'No experience needed',
    photo: 'https://images.unsplash.com/photo-1531347896434-783a31c51db3?auto=format&fit=crop&q=80&w=600',
    tourCount: '7 Tours'
  },
  {
    id: 'whale-shark',
    name: 'Whale Shark Tours',
    slug: 'whale-shark',
    h2: 'Whale Shark Tours',
    description: 'Swim side-by-side with wild, gentle whale sharks in La Paz Bay. Strictly regulated non-intrusive environment.',
    badge: 'Bucket list',
    photo: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=600',
    tourCount: '3 Tours'
  },
  {
    id: 'dolphins',
    name: 'Swim with Dolphins',
    slug: 'cabo-dolphins',
    h2: 'Swim with Dolphins',
    description: 'Educational family encounters with highly communicative, friendly marine mammals.',
    badge: 'Family favorite',
    photo: 'https://images.unsplash.com/photo-1570481662006-a3a13746fe96?auto=format&fit=crop&q=80&w=600',
    tourCount: '2 Tours'
  },
  {
    id: 'utv-buggy',
    name: 'UTV & Buggy',
    slug: 'utv-buggy',
    h2: 'UTV & Buggy',
    description: 'Tackle rocky terrains, sand dunes and dry riverbeds on off-road 4x4 desert buggies.',
    badge: 'Desert off-road',
    photo: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=600',
    tourCount: '4 Tours'
  },
  {
    id: 'parasailing',
    name: 'Parasailing',
    slug: 'parasailing',
    h2: 'Parasailing',
    description: 'Fly high above Medano Beach for breathtaking, birds-eye views of Land’s End and Lover’s Beach.',
    badge: 'Views of the Arch',
    photo: 'https://images.unsplash.com/photo-1651848522301-af9c1e7a02c9?auto=format&fit=crop&q=80&w=600',
    tourCount: '3 Tours'
  },
  {
    id: 'glass-bottom',
    name: 'Glass Bottom Boat',
    slug: 'glass-bottom-boat',
    h2: 'Glass Bottom Boat',
    description: 'Peer through transparent hulls at the rich tropical marine life of the pristine Cabos cove.',
    badge: 'Kid friendly',
    photo: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=600',
    tourCount: '4 Tours'
  },
  {
    id: 'camel-rides',
    name: 'Camel Rides',
    slug: 'camel-rides',
    h2: 'Camel Rides',
    description: 'Ride gentle camels across golden desert sands overlooking the majestic crashing Pacific waves.',
    badge: 'Unique to Cabo',
    photo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    tourCount: '3 Tours'
  },
  {
    id: 'cooking',
    name: 'Cooking Classes & Culinary',
    slug: 'cooking-classes',
    h2: 'Cooking Classes & Culinary',
    description: 'Learn ancestral cooking techniques, harvest organic farms, and craft hand-cooked Mexican mole.',
    badge: 'Authentic local',
    photo: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    tourCount: '5 Tours'
  }
];

const ZONES_CONFIG: Record<string, {
  name: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  heroDesc: string;
  attractions: string[];
  whenToVisitHighlight: string;
  seasons: { label: string; date: string }[];
  faqs: { q: string; a: string }[];
}> = {
  'cabo-san-lucas': {
    name: "Cabo San Lucas",
    metaTitle: "Things to Do in Cabo San Lucas 2026 - Best Tours and Excursions | What's in Cabo",
    metaDesc: "Discover the best things to do in Cabo San Lucas. Whale watching, sunset cruises, fishing, snorkeling, zipline and more. Hand-picked by local experts who know every operator.",
    h1: "Top Things to Do in Cabo San Lucas",
    heroDesc: "From whale watching past Land's End to sunset cruises around the Arch, Cabo San Lucas has more to do per square mile than anywhere else in Baja. Every operator here has been vetted by our local team.",
    attractions: ["El Arco (The Arch)", "Medano Beach", "Lovers Beach", "Playa del Amor"],
    whenToVisitHighlight: "Whale watching peaks December to April. Sunset cruises run year-round. Water temperature stays above 70°F from May through November.",
    seasons: [
      { label: "🐳 Whale Watching", date: "Dec to Apr" },
      { label: "🦈 Whale Sharks (La Paz day trip)", date: "Nov to Apr" },
      { label: "🎣 Sport Fishing", date: "Oct to Dec" },
      { label: "🤿 Snorkeling", date: "May to Nov" }
    ],
    faqs: [
      {
        q: "What are the best tours in Cabo San Lucas?",
        a: "The most popular tours in Cabo San Lucas include whale watching from December to April, sunset catamaran cruises year-round, snorkeling at Chileno Bay, ATV desert adventures, and deep-sea fishing charters. WiC curates only the top-rated operators for each experience."
      },
      {
        q: "When is the best time to visit Cabo San Lucas for tours?",
        a: "Cabo San Lucas is a year-round destination. December to April is peak season for whale watching. October to December is best for sport fishing. Snorkeling and water activities are ideal from May through November when water temperatures are warmest."
      },
      {
        q: "Are tours in Cabo San Lucas safe?",
        a: "Yes. All tour operators listed on WiC are verified, licensed, and safety-certified. Cabo San Lucas has a well-established tourism infrastructure with bilingual guides on most experiences."
      },
      {
        q: "How far in advance should I book tours in Cabo San Lucas?",
        a: "Whale watching and fishing charters during peak season (December to April) should be booked 2 to 4 weeks in advance. Sunset cruises and snorkeling tours can typically be booked 48 to 72 hours ahead."
      },
      {
        q: "Do tour operators in Cabo San Lucas speak English?",
        a: "Yes. The vast majority of tour operators in Cabo San Lucas are fully bilingual. Most guides are fluent in English and tailor their tours to English-speaking visitors."
      },
      {
        q: "What is the difference between tours in Cabo San Lucas and San José del Cabo?",
        a: "Cabo San Lucas offers high-energy experiences centered around the Arch, Marina, and Pacific coast. San José del Cabo is calmer, with cultural tours, art walks, cooking classes, and East Cape access."
      }
    ]
  },
  'san-jose-del-cabo': {
    name: "San José del Cabo",
    metaTitle: "Things to Do in San José del Cabo 2026 - Tours and Activities | What's in Cabo",
    metaDesc: "Discover the best things to do in San José del Cabo. Art walks, cooking classes, snorkeling, estuary kayaking and more. Curated by local experts.",
    h1: "Top Things to Do in San José del Cabo",
    heroDesc: "San José del Cabo moves at a different pace. Art galleries, farm-to-table dining, and access to the quieter East Cape and Corridor reefs. Our curated tours focus on culture, food, and the natural side of Baja.",
    attractions: ["Estero San José", "Art District", "Pueblo Mágico"],
    whenToVisitHighlight: "Mild temperatures year-round. Art walks every Thursday evening November through June. Snorkeling season peaks May through November. Whale watching accessible via day trips December to April.",
    seasons: [
      { label: "🎨 Art Walk Season", date: "Nov to Jun" },
      { label: "🤿 Snorkeling and Water Tours", date: "May to Nov" },
      { label: "🐳 Whale Watching Day Trips", date: "Dec to Apr" }
    ],
    faqs: [
      {
        q: "What are the best things to do in San José del Cabo?",
        a: "San José del Cabo is best known for its Thursday Art Walk (November to June), cooking classes at local farms, estuary kayaking, snorkeling day trips to Chileno Bay and Santa Maria, and cultural tours through the historic town center."
      },
      {
        q: "Is San José del Cabo good for tours?",
        a: "Yes. San José del Cabo offers a different type of experience from Cabo San Lucas. It is more cultural, culinary, and nature-focused. It is the gateway to the East Cape, Corridor reefs, and some of the best snorkeling spots in Los Cabos."
      },
      {
        q: "When is the Art Walk in San José del Cabo?",
        a: "The San José del Cabo Art Walk takes place every Thursday evening from November through June, from approximately 5pm to 9pm, along Calle Obregón in the historic district."
      },
      {
        q: "How far is San José del Cabo from Cabo San Lucas?",
        a: "San José del Cabo is approximately 30 to 45 minutes from Cabo San Lucas by car, depending on traffic. The Tourist Corridor connects both cities along the Pacific coast."
      },
      {
        q: "Are tours in San José del Cabo suitable for families?",
        a: "Yes. San José del Cabo offers excellent family-friendly options including cooking classes, estuary kayaking, snorkeling, and cultural town tours. The pace is calmer than Cabo San Lucas, making it ideal for families with younger children."
      },
      {
        q: "What is the difference between San José del Cabo and Cabo San Lucas for tours?",
        a: "San José del Cabo focuses on culture, food, and quieter nature experiences. Cabo San Lucas offers high-energy water sports, fishing, and nightlife. Many visitors base themselves in one and take day trips to the other."
      }
    ]
  },
  'todos-santos': {
    name: "Todos Santos",
    metaTitle: "Things to Do in Todos Santos 2026 - Tours and Activities | What's in Cabo",
    metaDesc: "Discover the best things to do in Todos Santos. Surf lessons, art tours, organic farm visits, and whale watching day trips. Curated by local experts in this Baja Pueblo Mágico.",
    h1: "Top Things to Do in Todos Santos",
    heroDesc: "Todos Santos is Baja at its most authentic. A Pueblo Mágico where surf breaks meet gallery streets and organic farms. Tours here are smaller, slower, and more personal than anywhere else in Los Cabos.",
    attractions: [],
    whenToVisitHighlight: "Surf season peaks October through April at Cerritos and Punta Lobos. Whale watching accessible via day trips December to April. Summer brings warmth but occasional Pacific swells.",
    seasons: [
      { label: "🏄 Surf Season", date: "Oct to Apr" },
      { label: "🐳 Whale Watching Day Trips", date: "Dec to Apr" },
      { label: "🌤 Mild Weather", date: "Nov to May" }
    ],
    faqs: [
      {
        q: "What are the best things to do in Todos Santos?",
        a: "Todos Santos is known for surf lessons at Cerritos Beach, art gallery tours, organic farm visits, whale watching day trips to Magdalena Bay (December to April), yoga retreats, and exploring the historic Pueblo Mágico town center."
      },
      {
        q: "Is Todos Santos good for surfing?",
        a: "Yes. Todos Santos has some of the best surf in Baja California Sur. Playa Los Cerritos is beginner-friendly year-round. Punta Lobos offers more advanced breaks. Surf lesson operators in the area are experienced and bilingual."
      },
      {
        q: "How far is Todos Santos from Cabo San Lucas?",
        a: "Todos Santos is approximately 1 hour north of Cabo San Lucas on Federal Highway 19. The drive takes you through the Sierra de la Laguna foothills with scenic Pacific views."
      },
      {
        q: "What kind of tours are available in Todos Santos?",
        a: "Todos Santos offers surf lessons, farm-to-table culinary experiences, art and culture walking tours, whale watching day trips, yoga and wellness retreats, and hiking in the Sierra de la Laguna biosphere."
      },
      {
        q: "Is Todos Santos suitable for families?",
        a: "Yes. Todos Santos is one of the most family-friendly areas in Los Cabos. Cerritos Beach is calm enough for children, farm visits are educational, and the town pace is relaxed and safe."
      },
      {
        q: "When is the best time to visit Todos Santos?",
        a: "November through April is the best time to visit. Mild temperatures, active surf, and whale watching day trips are all available. Summer months (July to September) bring humidity and occasional tropical moisture from the Pacific."
      }
    ]
  },
  'los-barriles': {
    name: "Los Barriles",
    metaTitle: "Things to Do in Los Barriles 2026 - Tours and Activities | What's in Cabo",
    metaDesc: "Discover the best things to do in Los Barriles. Kitesurfing, sport fishing, snorkeling at East Cape reefs, and Cabo Pulmo day trips. Curated by local experts.",
    h1: "Top Things to Do in Los Barriles",
    heroDesc: "Los Barriles sits on the Sea of Cortez. Calmer, warmer, and wilder than the Pacific side. It is the kitesurf capital of Baja and the gateway to the East Cape's untouched reefs and world-class sport fishing.",
    attractions: [],
    whenToVisitHighlight: "Kitesurf season runs November through March with consistent north winds. Sport fishing peaks year-round with marlin, dorado, and yellowfin tuna. Water temperature stays warm on the Sea of Cortez side.",
    seasons: [
      { label: "🪁 Kitesurf Season", date: "Nov to Mar" },
      { label: "🎣 Sport Fishing Peak", date: "Apr to Oct" },
      { label: "🦈 Whale Sharks (La Paz)", date: "Nov to Apr" }
    ],
    faqs: [
      {
        q: "What are the best things to do in Los Barriles?",
        a: "Los Barriles is best known for kitesurfing (November to March), sport fishing on the Sea of Cortez, snorkeling and diving at East Cape reefs, ATV tours through the desert, and day trips to Cabo Pulmo National Marine Park."
      },
      {
        q: "Is Los Barriles good for kitesurfing?",
        a: "Yes. Los Barriles is one of the top kitesurfing destinations in North America. Strong, consistent north winds from November through March create ideal conditions. Multiple certified kite schools operate in the area for all skill levels."
      },
      {
        q: "How far is Los Barriles from Cabo San Lucas?",
        a: "Los Barriles is approximately 1.5 to 2 hours northeast of Cabo San Lucas on Federal Highway 1. The drive crosses through the Sierra de la Laguna mountains with dramatic desert scenery."
      },
      {
        q: "Is Los Barriles good for families?",
        a: "Yes. The Sea of Cortez side is calmer than the Pacific, making it excellent for families. Snorkeling, fishing, and beach activities are all accessible. The town is small, safe, and relaxed."
      },
      {
        q: "What fish can I catch in Los Barriles?",
        a: "Los Barriles is known for world-class sport fishing. Common catches include marlin, dorado, yellowfin tuna, wahoo, and roosterfish. Fishing is productive year-round with peaks varying by species."
      },
      {
        q: "What is the difference between Los Barriles and Cabo San Lucas for tours?",
        a: "Los Barriles is quieter, more remote, and focused on water sports, fishing, and nature. Cabo San Lucas offers more variety, nightlife, and group tours. Los Barriles is ideal for travelers seeking an authentic, uncrowded Baja experience."
      }
    ]
  },
  'east-cape': {
    name: "East Cape",
    metaTitle: "Things to Do in East Cape 2026 - Tours and Activities | What's in Cabo",
    metaDesc: "Discover the best things to do in East Cape. Diving at Cabo Pulmo, sport fishing, remote beach exploration and more. Curated by local experts.",
    h1: "Top Things to Do in East Cape",
    heroDesc: "East Cape is where the Sea of Cortez meets untouched Baja desert. No resorts, no crowds, just world-class reefs, remote beaches, and some of the best sport fishing in Mexico. Tours here are for the traveler who wants the real Baja.",
    attractions: [],
    whenToVisitHighlight: "Cabo Pulmo diving and snorkeling is best April through October when visibility peaks. Sport fishing is productive year-round. Whale sharks visit La Paz (2 hours north) November through April.",
    seasons: [
      { label: "🤿 Cabo Pulmo Diving", date: "Apr to Oct" },
      { label: "🎣 Sport Fishing", date: "Year-round" },
      { label: "🦈 Whale Sharks (La Paz)", date: "Nov to Apr" }
    ],
    faqs: [
      {
        q: "What are the best things to do in East Cape?",
        a: "East Cape is best known for diving and snorkeling at Cabo Pulmo National Marine Park (a UNESCO World Heritage Site), sport fishing on the Sea of Cortez, off-road ATV tours through remote desert, and exploring isolated beaches with no tourist infrastructure."
      },
      {
        q: "What is Cabo Pulmo?",
        a: "Cabo Pulmo is one of the oldest coral reefs in North America and a UNESCO World Heritage Site. It is home to over 800 species of marine life including bull sharks, manta rays, sea turtles, and large schools of fish. It is considered one of the top diving spots in the world."
      },
      {
        q: "Is East Cape good for diving?",
        a: "Yes. East Cape and Cabo Pulmo offer some of the best diving in the Americas. The reef is fully protected, visibility is exceptional April through October, and marine life density is extraordinary compared to more visited dive sites."
      },
      {
        q: "How far is East Cape from Cabo San Lucas?",
        a: "East Cape is approximately 2 to 2.5 hours from Cabo San Lucas, accessible via Federal Highway 1 north and then east on dirt and paved roads. A 4x4 vehicle is recommended for accessing remote beach areas."
      },
      {
        q: "Is East Cape suitable for families?",
        a: "East Cape is best suited for adventurous families comfortable with remote settings and limited tourist infrastructure. Snorkeling at Cabo Pulmo is safe and spectacular for all ages. Facilities are basic compared to Cabo San Lucas."
      },
      {
        q: "When is the best time to visit East Cape?",
        a: "April through October offers the best diving and snorkeling conditions at Cabo Pulmo. November through March brings cooler temperatures and access to whale shark tours near La Paz. Sport fishing is productive year-round."
      }
    ]
  },
  'la-paz': {
    name: "La Paz",
    metaTitle: "Things to Do in La Paz 2026 - Tours and Activities | What's in Cabo",
    metaDesc: "Discover the best things to do in La Paz. Swim with whale sharks, kayak to Isla Espíritu Santo, snorkel at Playa Balandra and more. Curated by local experts in the Sea of Cortez.",
    h1: "Top Things to Do in La Paz",
    heroDesc: "La Paz is the capital of Baja California Sur and home to the Sea of Cortez. Jacques Cousteau called it the world's aquarium. Swim with whale sharks, kayak to deserted islands, and explore one of Mexico's most authentic cities.",
    attractions: ["Playa Balandra", "Isla Espíritu Santo", "Malecón La Paz"],
    whenToVisitHighlight: "Whale shark season runs November through April. La Paz is the best place in the world to swim with them. Isla Espíritu Santo kayaking is best October through May. Summer brings warm water for snorkeling and diving.",
    seasons: [
      { label: "🦈 Whale Sharks", date: "Nov to Apr" },
      { label: "🛶 Kayaking and Islands", date: "Oct to May" },
      { label: "🤿 Snorkeling and Diving", date: "May to Oct" }
    ],
    faqs: [
      {
        q: "What are the best things to do in La Paz?",
        a: "La Paz is best known for swimming with whale sharks (November to April), kayaking to Isla Espíritu Santo, snorkeling with sea lions, visiting Playa Balandra (voted Mexico's most beautiful beach), diving at Los Islotes, and exploring the historic Malecón waterfront."
      },
      {
        q: "When is whale shark season in La Paz?",
        a: "Whale shark season in La Paz runs from November through April. The whale sharks gather in the Bay of La Paz to feed on plankton, making this the most accessible and best-regulated whale shark experience in the world. Swimming is done in small groups with certified guides."
      },
      {
        q: "Is La Paz worth visiting from Cabo San Lucas?",
        a: "Yes. La Paz is a 2 to 2.5 hour drive from Cabo San Lucas and offers a completely different experience. More authentic, less touristy, and with unique wildlife encounters like whale sharks and sea lions that are not available in Cabo. Many travelers do it as a day trip or overnight stay."
      },
      {
        q: "Is Playa Balandra worth visiting?",
        a: "Yes. Playa Balandra is consistently voted one of the most beautiful beaches in Mexico. It features calm, shallow turquoise water, dramatic rock formations, and a protected natural area. It is accessible by car or boat tour from La Paz."
      },
      {
        q: "Are whale shark tours in La Paz safe?",
        a: "Yes. La Paz has the most strictly regulated whale shark tours in Mexico. Group sizes are limited, touching is prohibited, and all guides are certified marine biologists or trained naturalists. The whale sharks are filter feeders and completely harmless to humans."
      },
      {
        q: "What is the difference between La Paz and Cabo San Lucas for tours?",
        a: "La Paz offers wildlife-focused, nature-immersive experiences with less commercialization. Whale sharks, sea lions, pristine islands, and authentic Mexican culture. Cabo San Lucas is more developed with water sports, fishing, and nightlife."
      }
    ]
  },
  'tourist-corridor': {
    name: "Tourist Corridor",
    metaTitle: "Things to Do in Tourist Corridor 2026 - Tours and Activities | What's in Cabo",
    metaDesc: "Discover the best things to do in the Tourist Corridor. Snorkeling at Chileno Bay, beach clubs, golf and sunset cruises. Curated by local experts along the Los Cabos Corridor.",
    h1: "Top Things to Do in Tourist Corridor",
    heroDesc: "The Tourist Corridor runs 30 kilometers between Cabo San Lucas and San José del Cabo along the Sea of Cortez. Home to the best snorkeling beaches, luxury resorts, and golf courses in Los Cabos. Tours here blend natural beauty with world-class access.",
    attractions: ["Chileno Beach", "Santa Maria Beach", "Cabo Pulmo (nearby)"],
    whenToVisitHighlight: "Snorkeling at Chileno Bay and Santa Maria is excellent year-round with visibility peaking May through November. Whale watching day trips run December to April. Golf courses operate year-round with ideal conditions October through May.",
    seasons: [
      { label: "🤿 Snorkeling Season", date: "May to Nov" },
      { label: "🐳 Whale Watching Day Trips", date: "Dec to Apr" },
      { label: "⛳ Golf Season", date: "Oct to May" }
    ],
    faqs: [
      {
        q: "What are the best things to do in the Tourist Corridor?",
        a: "The Tourist Corridor is best known for snorkeling at Chileno Bay and Santa Maria Beach, golf at world-class courses, beach club day passes, sunset cruises from nearby marinas, and ATV desert tours through the Baja landscape."
      },
      {
        q: "Is Chileno Bay good for snorkeling?",
        a: "Yes. Chileno Bay is one of the best snorkeling spots in Los Cabos. Calm water, excellent visibility, and abundant marine life including tropical fish, sea turtles, and rays. It is a protected cove accessible by car or boat tour."
      },
      {
        q: "What is the Tourist Corridor in Los Cabos?",
        a: "The Tourist Corridor is the 30-kilometer stretch of coastline between Cabo San Lucas and San José del Cabo along the Sea of Cortez. It is home to most of the luxury resorts, the best snorkeling beaches, and several world-class golf courses."
      },
      {
        q: "How do I get to the Tourist Corridor from Cabo San Lucas?",
        a: "The Tourist Corridor is accessible via Federal Highway 1 heading northeast from Cabo San Lucas toward San José del Cabo. Most beaches and resorts are a 15 to 30 minute drive from downtown."
      },
      {
        q: "Is the Tourist Corridor good for families?",
        a: "Yes. The Tourist Corridor has calm Sea of Cortez beaches ideal for families, protected snorkeling coves, and resort amenities. Chileno Bay and Santa Maria Beach are particularly well-suited for children due to calm water and shallow entry points."
      },
      {
        q: "What is the difference between the Tourist Corridor and Cabo San Lucas for tours?",
        a: "The Tourist Corridor offers calmer, nature-focused experiences including snorkeling, beach clubs, and golf. Cabo San Lucas is more vibrant with fishing, sunset cruises, whale watching boats from the Marina, and nightlife."
      }
    ]
  }
};

const TOURS_BY_ZONE_MAP: Record<string, string[]> = {
  'cabo-san-lucas': [
    'Humpback Whale Watching Premium Safari on Custom Inflatable Zodiacs',
    'Deep Sea Sport Fishing Private Yacht Charter & Professional Shimano Gears',
    'El Arco Private Sunset Sail Cruise with Premium Crafted Chef Dinner',
    'Santa Maria & Chileno Bay Two-Cove Snorkeling Guided Expedition',
    'Canyon Extreme Zipline Safari & High-Speed Suspension Bridges',
    'Pacific Dunes Offroad ATV Adventure & Desert Sand Cruiser Tour',
    'La Paz Bay Wild Gentle Whale Shark Guided Swim Encounter',
    'Ancestral Mexican Culinary Masterclass & Organic Farm Harvesting'
  ],
  'san-jose-del-cabo': [
    'Humpback Whale Watching Premium Safari on Custom Inflatable Zodiacs',
    'Santa Maria & Chileno Bay Two-Cove Snorkeling Guided Expedition',
    'Canyon Extreme Zipline Safari & High-Speed Suspension Bridges',
    'La Paz Bay Wild Gentle Whale Shark Guided Swim Encounter',
    'Ancestral Mexican Culinary Masterclass & Organic Farm Harvesting'
  ],
  'todos-santos': [
    'Pacific Dunes Offroad ATV Adventure & Desert Sand Cruiser Tour',
    'La Paz Bay Wild Gentle Whale Shark Guided Swim Encounter'
  ],
  'los-barriles': [
    'Deep Sea Sport Fishing Private Yacht Charter & Professional Shimano Gears',
    'La Paz Bay Wild Gentle Whale Shark Guided Swim Encounter'
  ],
  'east-cape': [
    'Santa Maria & Chileno Bay Two-Cove Snorkeling Guided Expedition',
    'La Paz Bay Wild Gentle Whale Shark Guided Swim Encounter'
  ],
  'la-paz': [
    'La Paz Bay Wild Gentle Whale Shark Guided Swim Encounter'
  ],
  'tourist-corridor': [
    'Humpback Whale Watching Premium Safari on Custom Inflatable Zodiacs',
    'Santa Maria & Chileno Bay Two-Cove Snorkeling Guided Expedition',
    'Canyon Extreme Zipline Safari & High-Speed Suspension Bridges',
    'Ancestral Mexican Culinary Masterclass & Organic Farm Harvesting'
  ]
};

export default function ToursHub({ 
  onNavigateDetail, 
  onNavigateCategory, 
  onNavigatePassport,
  toursZoneId = null,
  onNavigateZone
}: ToursHubProps) {
  // Update browser titles, meta description, and schema tags natively on load
  useEffect(() => {
    let title = "Top Things to Do in Los Cabos 2026 — Tours & Excursions | What's in Cabo";
    let description = "Discover the top things to do in Los Cabos. Whale watching, fishing, boat tours, zipline, snorkeling and more — hand-picked experiences curated by local experts.";
    let pathPart = "tours/";
    let destinationName = "Los Cabos";
    
    if (toursZoneId && ZONES_CONFIG[toursZoneId]) {
      const zc = ZONES_CONFIG[toursZoneId];
      title = zc.metaTitle;
      description = zc.metaDesc;
      pathPart = `${toursZoneId}/tours/`;
      destinationName = zc.name;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }
    
    // Breadcrumb array & dynamic item structures for schema injections
    const schemaBreadcrumbs = [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whatisincabo.com/" },
      { "@type": "ListItem", "position": 2, "name": "Tours & Activities", "item": `https://whatisincabo.com/${pathPart}` }
    ];

    const schemaTourItems = toursList.map((tour, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": tour.title,
        "image": tour.images?.[0]?.url || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400",
        "priceRange": "$$$",
        "telephone": "+52 624 123 4567",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": tour.locationAddress || "Cabo San Lucas Marina",
          "addressLocality": "Cabo San Lucas",
          "addressRegion": "BCS",
          "addressCountry": "MX"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tour.operatorRating.toString(),
          "reviewCount": tour.operatorReviewsCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "USD",
          "lowPrice": (tour.discountedPrice || tour.price).toString(),
          "highPrice": tour.price.toString(),
          "offerCount": "1"
        }
      }
    }));

    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://whatisincabo.com/${pathPart}#webpage`,
          "url": `https://whatisincabo.com/${pathPart}`,
          "name": title,
          "description": description,
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": schemaBreadcrumbs
          }
        },
        {
          "@type": "CollectionPage",
          "@id": `https://whatisincabo.com/${pathPart}#collection`,
          "url": `https://whatisincabo.com/${pathPart}`,
          "name": `Best Things to Do in ${destinationName}`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": schemaTourItems
          }
        },
        {
          "@type": "TouristDestination",
          "name": destinationName,
          "touristType": "Leisure, Adventure, Wildlife, Ocean Activites",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "22.8905",
            "longitude": "-109.9167"
          }
        }
      ]
    });
    document.head.appendChild(schemaScript);
    
    return () => {
      document.head.removeChild(schemaScript);
    };
  }, [toursZoneId]);

  // Set-up core real tourist listings database (stretching 8 distinct detailed tours)
  const toursList: TourDetail[] = [
    // 1. Whale Watching (Active Category: whale-watching, boat-tours)
    {
      id: 'water',
      title: 'Humpback Whale Watching Premium Safari on Custom Inflatable Zodiacs',
      price: 89,
      discountedPrice: 75,
      duration: '2.5 Hours',
      groupSize: 'Max 12 guests',
      operatorName: 'Cabo Whale Trek Co.',
      operatorRating: 4.95,
      operatorReviewsCount: 1840,
      operatorBadge: 'Biologist Led - Rank #1',
      aboutText: 'Witness majestic humpback whales breaching and playing. Our fast, safe custom Zodiac crafts get you close safely, accompanied by dual resident marine biologists and high-powered aquatic hydrophones.',
      highlights: [
        'Close visual proximity encounters on dynamic inflatable Zodiac crafts',
        'Dual onboard certified active marine biologist guides',
        'State-of-the-art underwater hydrophones to hear real whale songs live',
        'Complimentary digital action-photography album of your tour'
      ],
      included: [
        'Bilingual certified marine biologist escort',
        'High-density comfortable life vests',
        'Unlimited chilled mineral water',
        'Handmade tropical sandwiches and light snacks'
      ],
      excluded: ['Port logistics platform fee', 'Guide gratuities'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 22.88, lng: -109.91 },
      locationAddress: 'Dock Gate G, Cabo San Lucas Marina, BCS 23400, Mexico',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800', alt: 'Humpback whale breaching near Cabo Marina' }
      ],
      activityTypes: ['Whale Watching', 'Marine Biology', 'Boat Tour', 'Wildlife Encounter'],
      mustKnow: ['Wear light windbreakers', 'Peak migration season is mid-Dec to mid-April']
    },
    // 2. Deep Sea Fishing Charter (Active Category: fishing, boat-tours)
    {
      id: 'fishing',
      title: 'Deep Sea Sport Fishing Private Yacht Charter & Professional Shimano Gears',
      price: 499,
      discountedPrice: 420,
      duration: '6 Hours',
      groupSize: 'Max 6 anglers',
      operatorName: 'Baja Marlin Kings',
      operatorRating: 4.91,
      operatorReviewsCount: 924,
      operatorBadge: 'Marlin Specialists',
      aboutText: 'Sail on world-class deep-sea charters to the Marlin Capital of the World. Our customized tournaments run with specialized dual radar fish finder sensors, live bait tanks, and seasoned deck captains.',
      highlights: [
        'Exclusive luxury twin-engine cabin cruiser usage',
        'Top-rated customized Shimano and Penn graphite fishing reels',
        'Complimentary fish vacuum packing, filleting, and local restaurant coordination'
      ],
      included: [
        'Experienced Captain and deck crew services',
        'All regional fishing licenses and dynamic live baits',
        'Ice coolers fully packed with local boutique craft beers'
      ],
      excluded: ['Crew gratuities (usually 15-20%)'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 22.882, lng: -109.909 },
      locationAddress: 'Marina Gate 3, Cabo San Lucas BCS 23400',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=800', alt: 'Premium fishing gear on Cabo sport charter' }
      ],
      activityTypes: ['Fishing Charters', 'Deep Sea Fishing', 'Boat Tour'],
      mustKnow: ['Bring high protection sunscreens', 'Mating fish peaks from October to January']
    },
    // 3. Sunset Catamaran Cruise (Active Category: boat-tours)
    {
      id: 'sunset',
      title: 'El Arco Private Sunset Sail Cruise with Premium Crafted Chef Dinner',
      price: 150,
      discountedPrice: 120,
      duration: '3.5 Hours',
      groupSize: 'Max 10 guests',
      operatorName: 'Luxury Catamaran Trails',
      operatorRating: 4.98,
      operatorReviewsCount: 1622,
      operatorBadge: 'Luxury Cruiser #1',
      aboutText: 'Watch the Sun sink elegantly behind the dynamic Pacific coastline while sliding past Land’s End, Lover’s Beach, and El Arco. Savor customized chef bites alongside premium brand open bar drinks.',
      highlights: [
        'Private twin-hull majestic sailboat cruise',
        'Multi-course Mexican fusion gourmet tasting board',
        'Premium open bar with high-end spirits and cocktails'
      ],
      included: [
        'Catamaran captain and dedicated server hosts',
        'Five distinct chef warm and cold tasting items'
      ],
      excluded: ['Marina conservation entrance fee ($2 USD)'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 22.879, lng: -109.912 },
      locationAddress: 'Slips N-14, Cabo San Lucas Marina, BCS 23400',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', alt: 'Scenic sunset catamaran catamaran sails' }
      ],
      activityTypes: ['Sunset Cruise', 'Yachting', 'Gourmet Dining'],
      mustKnow: ['Light jackets highly recommended', 'Fabulous opportunities for couples photos']
    },
    // 4. Snorkeling Tours (Active Category: snorkeling, boat-tours)
    {
      id: 'water', // aligned to valid TourTypeId
      title: 'Santa Maria & Chileno Bay Two-Cove Snorkeling Guided Expedition',
      price: 79,
      discountedPrice: 65,
      duration: '4.5 Hours',
      groupSize: 'Max 14 guests',
      operatorName: 'Cabo Reef Explorers',
      operatorRating: 4.89,
      operatorReviewsCount: 1045,
      operatorBadge: 'Best Reef Team',
      aboutText: 'Immerse into the calm crystal-clear waters of primary marine sanctuaries Santa Maria and Chileno Bay. Swim side-by-side with high-density tropical reef fish, sea fans, and gentle green sea turtles.',
      highlights: [
        'Dual-point snorkeling inside certified blue flag marine sanctuaries',
        'State-of-the-art panoramic mask seals and sanitized dry-tubes',
        'Undersea action photos compiled by professional marine guides'
      ],
      included: [
        'Certified lifeguard snorkel guide assistance',
        'Snack lunch arrays, wraps, seasonal fruit, and energy bars'
      ],
      excluded: ['Wetsuits rental (optional $10 USD)'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 22.91, lng: -109.84 },
      locationAddress: 'Transpeninsular Hwy Km 12.5, Tourist Corridor, BCS',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=800', alt: 'Snorkeling inside pristine turquoise ocean coves' }
      ],
      activityTypes: ['Snorkeling Tours', 'Marine Wildlife', 'Tourist Corridor'],
      mustKnow: ['Excellent for novice swimmers', 'All sunscreen must be biodegradable']
    },
    // 5. Desert Zipline / Adventure (Active Category: zipline)
    {
      id: 'adventure',
      title: 'Canyon Extreme Zipline Safari & High-Speed Suspension Bridges',
      price: 110,
      discountedPrice: 95,
      duration: '3.5 Hours',
      groupSize: 'Max 8 thrill-seekers',
      operatorName: 'Baja Adventure Outpost',
      operatorRating: 4.96,
      operatorReviewsCount: 2230,
      operatorBadge: '100% Certified Safety',
      aboutText: 'Soar past spectacular red-cliff canyons at over 50 miles per hour on dual steel safety cables. Hike across hanging wooden suspension walkways and rappel down sheer desert sandstone cliffs.',
      highlights: [
        'Dynamic multi-line canopy circuit across dramatic desert canyons',
        'Double-redundant heavy harness steel connections',
        'On-site standby emergency medical technicians for tranquility'
      ],
      included: [
        'Certified high-angle adventure marshals',
        'All harness carabineers, safety shields, and protective helmets'
      ],
      excluded: ['Canyon park entrance fee ($20 USD per guest)'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 23.08, lng: -109.73 },
      locationAddress: 'Desert Canyon Outpost, Corridor Highway, BCS',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800', alt: 'Zipline canopy course active over desert trees' }
      ],
      activityTypes: ['Zipline', 'Adrenaline', 'Desert Adventure'],
      mustKnow: ['Closed-toe hiking shoes mandatory', 'Weight limits strictly 50lbs to 250lbs']
    },
    // 6. ATV Tours (Active Category: atv, utv-buggy)
    {
      id: 'adventure', // aligned to valid TourTypeId
      title: 'Pacific Dunes Offroad ATV Adventure & Desert Sand Cruiser Tour',
      price: 135,
      discountedPrice: 115,
      duration: '3 Hours',
      groupSize: 'Max 10 riders',
      operatorName: 'Baja Sand Cruisers Co.',
      operatorRating: 4.88,
      operatorReviewsCount: 780,
      operatorBadge: 'New 2025 Fleet',
      aboutText: 'Kick up dust as you navigate off-road single tracks across towering Pacific sand dunes and deep backcountry desert canyons. Guided by Baja 1000 veteran navigators for ultimate thrills.',
      highlights: [
        'Brand new fully automatic Can-Am Outlander ATVs',
        'Direct ocean coastline photo backdrops at high cliff lookouts',
        'Sanitized dust masks, racing goggles, and helmets'
      ],
      included: [
        'Full vehicle damage collision waivers',
        'Bilingual off-road trail commander escort'
      ],
      excluded: ['Baja ecological reserve pass ($15 USD)'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 22.93, lng: -109.95 },
      locationAddress: 'Pacific Coast Foothills Hwy, Cabo San Lucas, BCS',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1531347896434-783a31c51db3?auto=format&fit=crop&q=80&w=800', alt: 'ATV dune rides next to the ocean waves' }
      ],
      activityTypes: ['ATV Tours', 'Desert Buggy', 'Coastline Ride'],
      mustKnow: ['Valid drivers license required for captains', 'Dress in comfortable dusty clothes']
    },
    // 7. Whale Shark Swim (Active Category: whale-shark)
    {
      id: 'whakesharks',
      title: 'La Paz Bay Wild Gentle Whale Shark Guided Swim Encounter',
      price: 189,
      discountedPrice: 165,
      duration: '10 Hours',
      groupSize: 'Max 6 swimmers',
      operatorName: 'La Paz Eco-Trek Safaris',
      operatorRating: 4.97,
      operatorReviewsCount: 1450,
      operatorBadge: 'Eco-Compliant Leader',
      aboutText: 'Fulfill a genuine bucket list dream. Swim just inches away from magnificent, non-intrusive 25-foot wild whale sharks inside pristine La Paz Bay. Led strictly under zero-touch biology protection charters.',
      highlights: [
        'Small eco-groups capped strictly at 6 swimmers to protect sharks',
        'Scenic climate-controlled road transport from Cabo included',
        'Premium high-insulating thermal wetsuit and snorkeling gears'
      ],
      included: [
        'Certified resident marine biologist guide',
        'Seafood buffet inside a classic beachfront La Paz palapa'
      ],
      excluded: ['Marine wildlife tracking tags fee ($10 USD)'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 24.16, lng: -110.32 },
      locationAddress: 'La Paz Bay Pier Head, La Paz, BCS',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800', alt: 'Beautiful whale shark underwater with diver' }
      ],
      activityTypes: ['Whale Shark Tours', 'La Paz Wildlife', 'Once in a lifetime'],
      mustKnow: ['Water temperature runs cooler (thermal suits included)', 'Limited permits available weekly']
    },
    // 8. Cooking Class (Active Category: cooking)
    {
      id: 'cultural',
      title: 'Ancestral Mexican Culinary Masterclass & Organic Farm Harvesting',
      price: 115,
      discountedPrice: 99,
      duration: '4 Hours',
      groupSize: 'Max 8 foodies',
      operatorName: 'Flora & Sabor Kitchen',
      operatorRating: 4.99,
      operatorReviewsCount: 890,
      operatorBadge: 'Michelin Star Chef',
      aboutText: 'Harvest organic heirloom vegetables and hand-pressed herbs directly from fertile fields in the tranquil San José foothills. Learn ancient stone grinding and mole crafting techniques alongside true masters.',
      highlights: [
        'Intimate masterclass capped strictly at 8 spots to maintain chef contact',
        'Gourmet four-course food pairings accompanied by botanical margaritas',
        'Take-home digital master recipe binder and participation certification'
      ],
      included: [
        'All organic garden ingredients and masterchef coaching',
        'Unlimited fresh farm-crafted hibiscus and culinary mocktails'
      ],
      excluded: ['Alcohol premium wine upgrades (optional)'],
      itinerary: [],
      faqs: [],
      locationCoords: { lat: 23.085, lng: -109.68 },
      locationAddress: 'Flora Foothills Sanctuary, San José del Cabo, BCS 23400',
      languagesSpoken: ['English', 'Spanish'],
      images: [
        { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800', alt: 'Mexican culinary master class fresh ingredients' }
      ],
      activityTypes: ['Cooking Classes', 'Culinary Farm', 'Local Culture'],
      mustKnow: ['Vegetarian and allergen swaps fully integrated', 'Lush botanical garden setting']
    }
  ];

  // Helper classifier to target categories correctly inside feed blocks
  const mapTourCategoryKeys = (id: string, title: string): string[] => {
    const keys: string[] = [];
    const lower = title.toLowerCase();
    
    if (lower.includes('whale watching') || lower.includes('humpback')) keys.push('whale-watching');
    if (lower.includes('fishing') || lower.includes('marlin') || lower.includes('angler')) keys.push('fishing');
    if (lower.includes('boat') || lower.includes('catamaran') || lower.includes('sail') || lower.includes('cruise') || lower.includes('yacht') || lower.includes('zodiac')) {
      keys.push('boat-tours');
    }
    if (lower.includes('snorkeling') || lower.includes('cove')) keys.push('snorkeling');
    if (lower.includes('zipline') || lower.includes('canyon') || lower.includes('suspension')) keys.push('zipline');
    if (lower.includes('atv') || lower.includes('dunes')) keys.push('atv');
    if (lower.includes('whale shark')) keys.push('whale-shark');
    if (lower.includes('dolphin')) keys.push('dolphins');
    if (lower.includes('utv') || lower.includes('buggy')) keys.push('utv-buggy');
    if (lower.includes('parasail')) keys.push('parasailing');
    if (lower.includes('glass bottom')) keys.push('glass-bottom');
    if (lower.includes('camel')) keys.push('camel-rides');
    if (lower.includes('cooking') || lower.includes('culinary')) keys.push('cooking');
    
    return keys;
  };

  const [selectedZona, setSelectedZona] = useState<string>('cabo-san-lucas');
  const [savedTours, setSavedTours] = useState<Record<string, boolean>>({});
  const [openedFaq, setOpenedFaq] = useState<number | null>(null);
  const [newsEmail, setNewsEmail] = useState<string>('');
  const [completedSignup, setCompletedSignup] = useState<boolean>(false);

  // HTML references for sliding carousels
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const topToursScrollRef = useRef<HTMLDivElement>(null);
  const feedScrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const zonesScrollRef = useRef<HTMLDivElement>(null);
  const attractionsScrollRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const zonesList = [
    { name: 'Cabo San Lucas', code: 'cabo-san-lucas', tourCount: '18 Tours', photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400' },
    { name: 'San José del Cabo', code: 'san-jose-del-cabo', tourCount: '12 Tours', photo: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=400' },
    { name: 'Tourist Corridor', code: 'tourist-corridor', tourCount: '10 Tours', photo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Todos Santos', code: 'todos-santos', tourCount: '4 Tours', photo: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=400' },
    { name: 'La Paz', code: 'la-paz', tourCount: '3 Tours', photo: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=400' },
    { name: 'Los Barriles', code: 'los-barriles', tourCount: '2 Tours', photo: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=400' }
  ];

  const attractionsList = [
    { name: 'El Arco (The Arch)', subCatId: 'boat-tours', zone: 'Cabo San Lucas', photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400' },
    { name: 'Medano Beach', subCatId: 'parasailing', zone: 'Cabo San Lucas', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Lovers Beach', subCatId: 'glass-bottom', zone: 'Cabo San Lucas', photo: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=400' },
    { name: 'Playa Balandra', subCatId: 'whale-shark', zone: 'La Paz', photo: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=400' },
    { name: 'Chileno Beach', subCatId: 'snorkeling', zone: 'Tourist Corridor', photo: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&q=80&w=400' },
    { name: 'Santa Maria Beach', subCatId: 'snorkeling', zone: 'Tourist Corridor', photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400' },
    { name: 'Cabo Pulmo Marine Sanctuary', subCatId: 'snorkeling', zone: 'East Cape', photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' }
  ];

  const timelineData = [
    { month: 'Jan', temp: '75°F', climate: '☀️ Bright', whale: true, shark: true, fish: false },
    { month: 'Feb', temp: '74°F', climate: '☀️ Crisp', whale: true, shark: true, fish: false },
    { month: 'Mar', temp: '76°F', climate: '☀️ Mild', whale: true, shark: true, fish: false },
    { month: 'Apr', temp: '78°F', climate: '☀️ Calm', whale: true, shark: true, fish: false },
    { month: 'May', temp: '82°F', climate: '☀️ Clear', whale: false, shark: false, fish: true },
    { month: 'Jun', temp: '85°F', climate: '☀️ Warm', whale: false, shark: false, fish: true },
    { month: 'Jul', temp: '88°F', climate: '☀️ Humid', whale: false, shark: false, fish: true },
    { month: 'Aug', temp: '90°F', climate: '🌧️ Brief', whale: false, shark: false, fish: true },
    { month: 'Sep', temp: '89°F', climate: '🌧️ Breeze', whale: false, shark: false, fish: true },
    { month: 'Oct', temp: '86°F', climate: '☀️ Ideal', whale: false, shark: true, fish: true },
    { month: 'Nov', temp: '82°F', climate: '☀️ Perfect', whale: false, shark: true, fish: true },
    { month: 'Dec', temp: '78°F', climate: '☀️ Sunny', whale: true, shark: true, fish: true }
  ];

  const reviewsList = [
    {
      name: 'Michael K.',
      city: 'Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
      tourName: 'Extreme Canyon Zipline Adventure',
      stars: 5,
      quote: "Our Baja Adventure Outpost guides were absolute pros. The dual steel suspension lines and back-to-back canyon safety briefing gave us total peace of mind. Thrilling adrenaline rush!"
    },
    {
      name: 'Jessica T.',
      city: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
      tourName: 'El Arco Private Sunset Sail Cruise',
      stars: 5,
      quote: "Breathtaking sailing near Land's End. The gourmet fusion boards were phenomenal and the premium cocktails were genuinely open. Highly recommend booking through WiC!"
    },
    {
      name: 'Daniel S.',
      city: 'Denver, CO',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      tourName: 'La Paz Bay Whale Shark Swims',
      stars: 5,
      quote: "Swimming side-by-side with a 25-foot wild whale shark was beautiful. Our biologist was super knowledgeable and strictly prioritized ecological safety throughout."
    }
  ];

  const faqsData = [
    {
      q: "What are the best things to do in Los Cabos?",
      a: "The best activities highlight Cabo's beautiful land and ocean dualities. Key attractions include certified humpback whale watching safaris, deep-sea marlin fishing charters, ocean windward catamaran sunset cruises, and off-road ATV desert single tracks."
    },
    {
      q: "When is the best time for whale watching?",
      a: "The official humpback whale watching season in Los Cabos runs from mid-December through April. This is when hundreds of humpback whales migrate down from cold northern nesting grounds to raise their calves in Cabo's warm coastal nurseries."
    },
    {
      q: "Are tours in Los Cabos safe for families?",
      a: "Yes. All tours curated on What's in Cabo are strictly vetted. They use certified local guides, maintain dual steel harnesses for ziplines, provide specialized kid-sized USCG flotation life jackets, and employ licensed safety captains."
    },
    {
      q: "How far in advance should I book excursions?",
      a: "We highly recommend securing reservations 4 to 6 weeks in advance. Popular biologist-led whale watching Zodiacs, boutique farm cooking classes, and private yacht charters limit capacities strictly to protect nature and sell out quickly."
    },
    {
      q: "Do tour operators in Los Cabos speak English?",
      a: "Absolutely. All verified tour operators highlighted on What's in Cabo employ fluent bilingual captains and guides who provide smooth marine, hiking, and safety instructions clearly in both English and Spanish."
    },
    {
      q: "What are the must-do experiences in Los Cabos?",
      a: "The top signature experiences are: taking a marine-biologist led Zodiac close-encounter safari to watch humpbacks breach, enjoying a romantic yacht sunset sail directly past the iconic Arch, swimming safely alongside La Paz whale sharks, and riding Can-Am sand sand Buggies."
    }
  ];

  const blogGuides = [
    {
      title: "Top 5 Whale Watching Safaris in Cabo San Lucas 2026",
      category: "WILDLIFE EXPEDITIONS",
      photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "How to Safely and Sustainably Swim with Whale Sharks",
      category: "ECO TRAVEL PROTOCOL",
      photo: "https://images.unsplash.com/photo-1560275669-46c5a88d6a4c?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "What is the Best Month to Visit Baja California Sur?",
      category: "PLANNING STRATEGY",
      photo: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=400"
    }
  ];

  // Carousel slide controller
  const handleCarouselSlide = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmt = 345;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmt : scrollAmt,
        behavior: 'smooth'
      });
    }
  };

  const handleFeedSlide = (catId: string, direction: 'left' | 'right') => {
    const el = feedScrollRefs.current[catId];
    if (el) {
      const scrollAmt = 330;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmt : scrollAmt,
        behavior: 'smooth'
      });
    }
  };

  const handleSaveToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedTours(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setCompletedSignup(true);
      setNewsEmail('');
    }
  };

  // Scroll to local element with safety transition
  const scrollToCategoryBlock = (catId: string) => {
    const target = document.getElementById(`category-block-${catId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // scroll to Section 4 start
      const feedStart = document.getElementById('core-listings-feed');
      if (feedStart) {
        feedStart.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Zone-specific configurations and active filters
  const activeZoneConfig = toursZoneId && ZONES_CONFIG[toursZoneId] ? ZONES_CONFIG[toursZoneId] : null;

  const replaceLosCabos = (text: string): string => {
    if (!toursZoneId || !ZONES_CONFIG[toursZoneId]) return text;
    const zoneName = ZONES_CONFIG[toursZoneId].name;
    return text.replaceAll('Los Cabos', zoneName);
  };

  const zoneTours = toursZoneId && TOURS_BY_ZONE_MAP[toursZoneId]
    ? toursList.filter(t => TOURS_BY_ZONE_MAP[toursZoneId].includes(t.title))
    : toursList;

  const curatedExperiencesCount = zoneTours.length;
  const avgRating = curatedExperiencesCount > 0
    ? (zoneTours.reduce((sum, t) => sum + t.operatorRating, 0) / curatedExperiencesCount).toFixed(1)
    : "4.9";

  const AttractionsConfigMapping: Record<string, string[]> = {
    'cabo-san-lucas': ['El Arco (The Arch)', 'Medano Beach', 'Lovers Beach'],
    'san-jose-del-cabo': [],
    'tourist-corridor': ['Chileno Beach', 'Santa Maria Beach'],
    'todos-santos': [],
    'la-paz': ['Playa Balandra'],
    'los-barriles': [],
    'east-cape': ['Cabo Pulmo Marine Sanctuary']
  };

  const filteredAttractionsList = attractionsList.filter(att => {
    if (toursZoneId) {
      const allowed = AttractionsConfigMapping[toursZoneId] || [];
      return allowed.includes(att.name);
    }
    return true;
  });

  const shouldShowAttractions = !toursZoneId || (filteredAttractionsList.length >= 3);

  const displayedZones = zonesList.filter(z => z.code !== toursZoneId);

  const displayedFaqs = activeZoneConfig && activeZoneConfig.faqs
    ? activeZoneConfig.faqs
    : faqsData;

  const displayedReviews = reviewsList.map(rev => ({
    ...rev,
    quote: replaceLosCabos(rev.quote)
  }));

  const displayedBlogGuides = blogGuides.map(blog => ({
    ...blog,
    title: replaceLosCabos(blog.title)
  }));

  // Dynamic grouping logic for Section 4 (popular categories first, empty hidden entirely)
  const activeCategoryBlocks = ALL_CATEGORIES.map(cat => {
    const matchingTours = zoneTours.filter(tour => {
      const keys = mapTourCategoryKeys(tour.id, tour.title);
      return keys.includes(cat.id);
    });

    // Ensure all active slides have at least 5 cards. Pad with other existing tours if fewer than 5.
    const paddedTours = [...matchingTours];
    if (paddedTours.length > 0 && paddedTours.length < 5) {
      const neededCount = 5 - paddedTours.length;
      // Get other tours as pad candidates using unique titles to avoid duplicate ID exclusions (as multiple active tours map to identical categories like 'adventure' and 'water')
      const otherCandidates = zoneTours.filter(t => !matchingTours.some(m => m.title === t.title));
      const fallbackCandidates = otherCandidates.length > 0 ? otherCandidates : toursList.filter(t => !matchingTours.some(m => m.title === t.title));
      for (let i = 0; i < neededCount; i++) {
        const itemToCopy = matchingTours[i % matchingTours.length] || fallbackCandidates[i % fallbackCandidates.length] || toursList[0];
        const copied = {
          ...itemToCopy,
          id: `${itemToCopy.id}-pad-${cat.id}-${i}` as TourTypeId
        };

        // Category-specific high-realism content arrays to prevent duplicate images/titles
        let titles: string[] = [];
        let images: string[] = [];
        let operators: string[] = [];
        let prices = [125, 95, 140, 110];
        let ratings = [4.94, 4.96, 4.92, 4.95];
        let reviews = [540, 310, 680, 290];

        if (cat.id === 'whale-watching') {
          titles = [
            'Biologist-Led Sea of Cortez Humpback Whale Safari',
            'Exclusive Zodiac Whale Sighting & Hydrophone Tour',
            'Private Humpback Whale Watch Luxury Yacht Cruise',
            'Sunset Humpback Sighting & Scenic Arch Catamaran'
          ];
          images = [
            'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Baja Ocean Biologists', 'Cabo Whale Tracker', 'Cortez Marine Adventures', 'Oceanic Life Charters'];
          prices = [95, 110, 320, 140];
        } else if (cat.id === 'fishing') {
          titles = [
            'Cabo San Lucas Private Sport Fishing & Tournament Rig',
            'Deep Sea Billfish & Marlin Half-Day Fast Cruiser',
            'Pristine Waters Luxury Sport Fishing & Expert Yacht Crew',
            'Baja Coastline Light Tackle & Inshore Angling Safari'
          ];
          images = [
            'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1605548230624-8d2d0419c517?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Marlin Masters Cabo', 'Baja Apex Anglers', 'El Arco Fishing Fleet', 'Silver Sea Charters'];
          prices = [450, 380, 520, 240];
        } else if (cat.id === 'boat-tours') {
          titles = [
            'Boutique Snorkeling Catamaran Cruise with Open Mimosa Bar',
            'Land\'s End Scenic Water Taxi & Lovers Beach Landing',
            'Luxury Double-Decker Yacht Tour with Buffet & Drinks',
            'Traditional Wooden Sailboat Cruise past Cabo Arch'
          ];
          images = [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Cabo Windward Sails', 'Eco-Catamaran Charters', 'Baja Yachting Club', 'Archway Cruise Co.'];
          prices = [115, 45, 180, 85];
        } else if (cat.id === 'snorkeling') {
          titles = [
            'Cabo Pulmo National Park Coral Reef Scuba & Snorkel',
            'Land\'s End Marine Park Snorkel & Kayaking Safari',
            'Private Pelican Rock Snorkel with Marine Biologist',
            'Balandra Bay Pristine Beach Picnic & Kayak Tour'
          ];
          images = [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Cabo Snorkel Kings', 'Sea of Cortez Divers', 'Baja Eco-Snorkel Guides', 'Pelican Rock Safaris'];
          prices = [129, 69, 149, 110];
        } else if (cat.id === 'zipline') {
          titles = [
            'Extreme Canopy Adventure Ziplines & High-Suspension Bridges',
            'Rugged Baja Desert Sandstone Rappelling Outdoors',
            'San Jose Foothills Scenic Tree-top Zipline Safari',
            'Baja Sand Canyon Ziplines & Hanging Wooden Bridge Trek'
          ];
          images = [
            'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Canyon Flyers Cabo', 'Baja Rappel Kings', 'Adventure Outpost Co.', 'Extreme Eco-Canopy'];
          prices = [115, 89, 99, 120];
        } else if (cat.id === 'atv') {
          titles = [
            'Pacific Shoreline Dunes Extreme ATV Off-Road Raid',
            'Wild Backcountry Desert Single-Track Quad Bike Safari',
            'Baja 1000 Premium Automatic ATV Coastline Explorer',
            'San Jose Riverbed & Cactus Trail Dusty Quad Ride'
          ];
          images = [
            'https://images.unsplash.com/photo-1531347896434-783a31c51db3?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Cabo Dunes Racing', 'Desert Quad Raiders', 'Pacific Offroad Guides', 'Wild Baja ATV Trails'];
          prices = [145, 125, 160, 110];
        } else if (cat.id === 'whale-shark') {
          titles = [
            'Private VIP Whale Shark Yacht Charter & Luxe Snorkel',
            'La Paz Whale Shark & Playa Balandra Scenic Day Tour',
            'Marine Biologist-Led Small Group Whale Shark Expedition',
            'Sunrise Catamaran Cruise & Soft Whale Shark Swim Encounter'
          ];
          images = [
            'https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Cabo Apex Marine', 'Baja Expedition Safaris', 'Sea of Cortez Biologists', 'Pristine Waters Charters'];
          prices = [349, 199, 215, 175];
        } else if (cat.id === 'cooking') {
          titles = [
            'Miraflores Foothills Farm-to-Table Traditional Kitchen',
            'Baja Seafood Culinary Masterclass & Artisanal Tequila Tasting',
            'Local San Jose Homemade Tortilla & Salsa Grinding Craft',
            'Ancestral Oaxacan Mole Secrets Master Cooking Class'
          ];
          images = [
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800'
          ];
          operators = ['Los Cabos Culinary Alliance', 'Traditional Fire Kitchen', 'Baja Organic Agronomy', 'Salsa & Moles Masters'];
          prices = [115, 130, 85, 105];
        }

        if (titles.length > 0) {
          copied.title = titles[i % titles.length];
          copied.images = [{ url: images[i % images.length], alt: copied.title }];
          copied.operatorName = operators[i % operators.length];
          copied.price = prices[i % prices.length];
          copied.discountedPrice = Math.floor(prices[i % prices.length] * 0.88);
          copied.operatorRating = ratings[i % ratings.length];
          copied.operatorReviewsCount = reviews[i % reviews.length];
        }

        paddedTours.push(copied);
      }
    }

    return {
      ...cat,
      tours: paddedTours
    };
  }).filter(block => block.tours.length > 0);

  // Dynamic sorting for Section 3 (Top Picks)
  const topPickedTours = [...zoneTours]
    .sort((a, b) => {
      if (b.operatorRating !== a.operatorRating) {
        return b.operatorRating - a.operatorRating;
      }
      return b.operatorReviewsCount - a.operatorReviewsCount;
    })
    .slice(0, 5);

  const currentZoneObj = zonesList.find(z => z.code === toursZoneId);
  const heroPhoto = currentZoneObj?.photo || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="bg-[#FDFBF7] text-[#1B3A5B] font-sans antialiased" id="wic-tours-hub-page">
      
      {/* ================= SECTION 1 — HERO (ORIENTATION, ZONE A) ================= */}
      <section className="relative min-h-[500px] flex items-center justify-center text-white py-16 md:py-24 overflow-hidden" id="tours-hero">
        <div className="absolute inset-0 z-0 bg-[#0C1E32]">
          <img 
            src={heroPhoto} 
            alt={activeZoneConfig ? `Beautiful tours in ${activeZoneConfig.name} seas` : "Beautiful humpback whale sighting on Los Cabos seas"} 
            className="w-full h-full object-cover opacity-65"
            referrerPolicy="no-referrer"
          />
          {/* Lighter Navy Overlay – 35% Opacity */}
          <div className="absolute inset-0 bg-[#0C1E32]/35 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center space-y-7">
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full uppercase tracking-[0.15em] inline-block">
              TOURS & ACTIVITIES
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
              {activeZoneConfig ? activeZoneConfig.h1 : "Top Things to Do in Los Cabos"}
            </h1>
            <p className="text-base md:text-lg text-gray-200 text-pretty max-w-3xl mx-auto font-sans leading-relaxed">
              {activeZoneConfig ? activeZoneConfig.heroDesc : "From swimming with whale sharks to sunset cruises past the Arch, Los Cabos is packed with unforgettable experiences. We have hand-picked the best tours and activities across every area, all vetted by locals who know each operator personally."}
            </p>
          </div>

          {/* Trust strip signals */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-white font-sans text-xs font-bold">
              <span className="text-[#2D7373] text-sm font-mono font-black bg-white/10 rounded-full h-5 w-5 flex items-center justify-center">✔</span>
              <span>{curatedExperiencesCount} curated experiences</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white font-sans text-xs font-bold">
              <span className="text-[#C9A961] text-sm">★</span>
              <span>{avgRating} average rating</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white font-sans text-xs font-bold">
              <span className="text-[#2D7373] text-sm">📍</span>
              <span>{toursZoneId ? `In ${activeZoneConfig?.name}` : "All Los Cabos zones"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 — POPULAR CATEGORIES SLIDE (EXPLORATION) ================= */}
      <section className="py-16 bg-white border-b border-gray-100" id="categories-browser">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
                BROWSE BY EXPERIENCE
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                {replaceLosCabos("What do you want to do in Los Cabos?")}
              </h2>
            </div>
            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => handleCarouselSlide(categoriesScrollRef, 'left')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] transition shadow-xs cursor-pointer active:scale-95"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCarouselSlide(categoriesScrollRef, 'right')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] transition shadow-xs cursor-pointer active:scale-95"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Slide Carousel */}
          <div 
            ref={categoriesScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden snap-x snap-mandatory"
          >
            {ALL_CATEGORIES.map((cat) => {
              // Check if category is active/present in listings to prioritize scrolling
              const isActive = activeCategoryBlocks.some(block => block.id === cat.id);
              return (
                <div 
                  key={cat.id}
                  onClick={() => onNavigateCategory('tours', 'tours', cat.id, toursZoneId)}
                  className="w-[200px] md:w-[240px] shrink-0 h-[160px] rounded-2xl overflow-hidden relative snap-start group cursor-pointer shadow-xs hover:shadow-md transition active:scale-[0.98]"
                >
                  <img 
                    src={cat.photo} 
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#0C1E32]/50 group-hover:bg-[#0C1E32]/45 transition" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end space-y-1">
                    <span className="text-[9px] bg-[#2E8B8B] text-white font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase self-start">
                      {cat.badge}
                    </span>
                    <h3 className="text-white text-sm md:text-base font-extrabold leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block text-[10px] text-gray-400 font-mono italic">
            * Clicking on any experience card will scroll directly down to its active visual listings.
          </div>
        </div>
      </section>

      {/* ================= SECTION 3 — MOST POPULAR TOURS (DESIRE) ================= */}
      <section className="py-16 bg-[#FDFBF7]" id="top-picks-listings">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
                {replaceLosCabos("TOP PICKS IN LOS CABOS")}
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                {replaceLosCabos("Most Booked Tours in Los Cabos")}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => handleCarouselSlide(topToursScrollRef, 'left')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] transition shadow-xs cursor-pointer active:scale-95"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCarouselSlide(topToursScrollRef, 'right')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] transition shadow-xs cursor-pointer active:scale-95"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top Picks Slider */}
          <div 
            ref={topToursScrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hidden snap-x snap-mandatory"
          >
            {topPickedTours.map((tour) => {
              const isSaved = !!savedTours[tour.id];
              const bestFor = tourTypeConfigs[tour.id as TourTypeId]?.bestForChips?.[0] || 'Top Rated';

              return (
                <div 
                  key={tour.id}
                  className="w-[280px] md:w-[325px] shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between snap-start group relative hover:shadow-md transition"
                >
                  <div>
                    {/* Visual block */}
                    <div className="h-[180px] relative overflow-hidden bg-gray-50">
                      <img 
                        src={tour.images?.[0]?.url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400'} 
                        alt={tour.title}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Category badge (teal, small) */}
                      <div className="absolute top-3 left-3 bg-[#2E8B8B] text-white text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded shadow-xs">
                        {bestFor}
                      </div>
                      {/* Heart save button */}
                      <button 
                        onClick={(e) => handleSaveToggle(tour.id, e)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/85 hover:bg-white text-gray-700 shadow-xs active:scale-90 transition cursor-pointer z-10"
                      >
                        <Heart className={`w-3.5 h-3.5 transition ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>
                    </div>

                    {/* Meta info */}
                    <div className="p-4 space-y-2 text-left">
                      <h3 
                        onClick={() => onNavigateDetail('tours', tour.id as TourTypeId)}
                        className="text-sm font-extrabold text-[#1B3A5B] font-sans leading-snug line-clamp-2 h-10 group-hover:text-[#2E8B8B] transition cursor-pointer"
                      >
                        {tour.title}
                      </h3>

                      <p className="text-[11px] text-gray-400 font-semibold font-mono tracking-wide uppercase">
                        {tour.operatorName}
                      </p>

                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[#C9A961] text-xs font-bold">★ {tour.operatorRating}</span>
                        <span className="text-[10px] text-gray-500 font-medium font-mono">
                          ({tour.operatorReviewsCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and trigger */}
                  <div className="p-4 border-t border-gray-50 bg-[#FDFBF7]/40 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-0.5 leading-none">
                        <span className="text-[8px] text-gray-400 font-bold block uppercase font-mono mr-1">From</span>
                        <span className="text-[#2E8B8B] font-extrabold text-base md:text-lg">
                          ${tour.discountedPrice || tour.price}
                        </span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase font-mono">USD</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => onNavigateDetail('tours', tour.id as TourTypeId)}
                      className="bg-[#1B3A5B] hover:bg-[#224b74] text-[#C9A961] text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-lg cursor-pointer transition active:scale-95"
                    >
                      View Tour →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 6 — ICONIC ATTRACTIONS ================= */}
      {shouldShowAttractions && (
        <section className="py-16 bg-white" id="iconic-attractions">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
                  ICONIC SPOTS
                </span>
                <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                  {replaceLosCabos("Iconic attractions in Los Cabos")}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => handleCarouselSlide(attractionsScrollRef, 'left')}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleCarouselSlide(attractionsScrollRef, 'right')}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              ref={attractionsScrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden snap-x snap-mandatory"
            >
              {filteredAttractionsList.map((att) => (
                <div 
                  key={att.name}
                  onClick={() => onNavigateCategory('tours', 'tours', att.subCatId, toursZoneId)}
                  className="w-[245px] md:w-[280px] shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between snap-start group cursor-pointer hover:shadow-md transition"
                >
                  <div>
                    <div className="h-[150px] relative overflow-hidden">
                      <img 
                        src={att.photo} 
                        alt={att.name} 
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-3 left-3 bg-[#1B3A5B]/85 text-white text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                        📍 {att.zone}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition">
                        {att.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 pt-0 border-t border-gray-50 bg-[#FDFBF7]/35 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span className="font-bold text-[#2E8B8B] hover:underline">See tours that visit this →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION 4 — TOURS BY CATEGORY (THE CORE FEED) ================= */}
      <section className="py-20 bg-white" id="core-listings-feed">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <div className="border-b border-gray-100 pb-6 flex flex-col md:flex-row md:items-end justify-between">
            <div className="max-w-2xl space-y-1 text-left">
              <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
                BY EXPERIENCE TYPE
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                {replaceLosCabos("Tours and Activities in Los Cabos")}
              </h2>
            </div>
          </div>

          {/* Dynamic Feed Generator Blocks */}
          <div className="space-y-20">
            {activeCategoryBlocks.map((block) => (
              <div 
                key={block.id} 
                id={`category-block-${block.id}`}
                className="space-y-6 scroll-mt-20 border-b border-gray-100/60 pb-12 last:border-b-0"
              >
                {/* Header structure of specific category block */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-left">
                  <div className="space-y-1 max-w-2xl">
                    <span className="text-[9px] bg-[#2E8B8B]/10 text-[#2E8B8B] font-extrabold font-mono tracking-wider px-2.5 py-1 rounded uppercase inline-block">
                      {block.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#1B3A5B] tracking-tight leading-tight">
                      {block.h2}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {block.description}
                    </p>
                  </div>

                  {/* Control elements */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleFeedSlide(block.id, 'left')}
                      className="p-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-[#1B3A5B] transition shadow-xs cursor-pointer"
                      title="Back"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleFeedSlide(block.id, 'right')}
                      className="p-1.5 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-[#1B3A5B] transition shadow-xs cursor-pointer"
                      title="Forward"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigateCategory('tours')}
                      className="bg-gray-50 hover:bg-gray-150 text-[#2E8B8B] text-xs font-extrabold border border-gray-200 px-3.5 py-2 rounded-lg cursor-pointer transition ml-2"
                    >
                      See all {block.name}
                    </button>
                  </div>
                </div>

                {/* Horizontal slide container for this category's real tours */}
                <div 
                  ref={el => { feedScrollRefs.current[block.id] = el; }}
                  className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hidden snap-x snap-mandatory"
                >
                  {block.tours.map((tour) => {
                    const origId = tour.id.split('-pad-')[0] as TourTypeId;
                    const isSaved = !!savedTours[origId];
                    const bestFor = tourTypeConfigs[origId]?.bestForChips?.[0] || 'Top Rated';

                    return (
                      <div 
                        key={tour.id}
                        className="w-[78%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between snap-start group relative hover:shadow-md transition"
                      >
                        <div>
                          {/* Photo Block */}
                          <div className="h-[150px] relative overflow-hidden bg-gray-50">
                            <img 
                              src={tour.images?.[0]?.url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400'} 
                              alt={tour.title}
                              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            {/* Category badge (teal, small) */}
                            <div className="absolute top-3 left-3 bg-[#2E8B8B] text-white text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded shadow-xs">
                              {bestFor}
                            </div>
                            {/* Heart favorite toggle */}
                            <button 
                              onClick={(e) => handleSaveToggle(origId, e)}
                              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-xs active:scale-90 transition cursor-pointer z-10"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                            </button>
                          </div>

                          {/* Tour details */}
                          <div className="p-4 space-y-2 text-left">
                            <h4 
                              onClick={() => onNavigateDetail('tours', origId)}
                              className="text-sm font-extrabold text-[#1B3A5B] font-sans leading-snug line-clamp-2 h-10 group-hover:text-[#2E8B8B] transition cursor-pointer"
                            >
                              {tour.title}
                            </h4>

                            <p className="text-[11px] text-gray-400 font-semibold font-mono tracking-wide uppercase">
                              {tour.operatorName}
                            </p>

                            <div className="flex items-center gap-1">
                              <span className="text-[#C9A961] text-xs">★ {tour.operatorRating}</span>
                              <span className="text-[10px] text-gray-500 font-medium font-mono">
                                ({tour.operatorReviewsCount} reviews)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Cost & Trigger Footer */}
                        <div className="p-4 border-t border-gray-50 bg-[#FDFBF7]/35 flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline gap-0.5 leading-none">
                              <span className="text-[8px] text-gray-400 font-bold block uppercase font-mono mr-1">From</span>
                              <span className="text-[#2E8B8B] font-extrabold text-[#1B3A5B]/90 text-sm md:text-base">
                                ${tour.discountedPrice || tour.price}
                              </span>
                              <span className="text-[8px] text-gray-500 font-bold uppercase font-mono">USD</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => onNavigateDetail('tours', origId)}
                            className="bg-[#1B3A5B] hover:bg-[#20456c] text-[#C9A961] text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-lg cursor-pointer transition active:scale-95"
                          >
                            View Tour →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 9 — CABO PASSPORT (PEAK INTENT CONVERSION) ================= */}
      <section className="py-12 bg-white" id="conversion-passport-trigger">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#0C1E32] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-white/10">
            {/* Ambient vector details */}
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none bg-gradient-to-l from-[#C9A961] to-transparent" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-3xl mx-auto">
              <div className="space-y-2 max-w-xl text-left">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#C9A961] uppercase tracking-[0.15em] block">
                  DON'T LEAVE MONEY IN CABO
                </span>
                <h3 className="text-lg md:text-xl font-extrabold tracking-tight leading-snug font-sans text-white">
                  Save an average of $180 on your tour bookings
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-300 font-sans leading-relaxed">
                  Most travelers who book tours through What's in Cabo save easily on dining and beach clubs using the Cabo Passport. Unlocks in under 2 minutes.
                </p>
              </div>

              <div className="shrink-0">
                <button 
                  onClick={onNavigatePassport}
                  className="bg-[#C9A961] hover:bg-[#b0904d] text-[#0C1E32] font-black text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg transition cursor-pointer active:scale-95 border border-[#C9A961]/20 inline-flex items-center gap-2"
                >
                  <span>LEARN ABOUT CABO PASSPORT →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5 — EXPLORE BY ZONE ================= */}
      <section className="py-16 bg-[#FDFBF7]" id="explore-by-zone">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
                FIND TOURS NEAR YOU
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                {toursZoneId ? "Explore tours in other areas" : "Explore tours by area in Los Cabos"}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => handleCarouselSlide(zonesScrollRef, 'left')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCarouselSlide(zonesScrollRef, 'right')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Zones loop */}
          <div 
            ref={zonesScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden snap-x snap-mandatory"
          >
            {displayedZones.map((zone) => {
              const isSelected = selectedZona === zone.code;
              return (
                <div 
                  key={zone.code}
                  className={`w-[220px] md:w-[260px] shrink-0 h-[170px] rounded-2xl overflow-hidden relative snap-start cursor-pointer transition border-2 ${
                    isSelected ? 'border-[#2E8B8B] shadow-md' : 'border-transparent shadow-xs'
                  }`}
                  onClick={() => {
                    if (onNavigateZone) {
                      onNavigateZone(zone.code);
                    } else {
                      setSelectedZona(zone.code);
                      const coreFeed = document.getElementById('core-listings-feed');
                      if (coreFeed) coreFeed.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  <img src={zone.photo} alt={zone.name} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E32]/85 via-[#0C1E32]/30 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col justify-end space-y-1">
                    <span className="text-[10px] font-mono text-emerald-300 font-bold tracking-widest block uppercase">
                      {zone.tourCount}
                    </span>
                    <h3 className="text-white font-extrabold text-sm md:text-base leading-tight">
                      {zone.name}
                    </h3>
                    <span className="text-[9px] text-gray-300 font-mono hover:underline inline-block pt-1.5">
                      Explore {isSelected ? '(Active) ✓' : 'now →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ================= SECTION 7 — WHEN TO VISIT (SEASONAL TIMELINE) ================= */}
      <section className="py-16 bg-[#FDFBF7]" id="seasonal-planner">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left max-w-5xl mx-auto">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
                PLAN YOUR TRIP
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                {replaceLosCabos("Best time for tours in Los Cabos")}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl font-sans">
                {activeZoneConfig ? activeZoneConfig.whenToVisitHighlight : "Los Cabos has over 300 sunny days per year. December to April is peak whale watching season. Whale shark encounters run November to April near La Paz. Sport fishing peaks October through December."}
              </p>
              
              {/* If there's zone specific seasons, display them as stylish tags/badges */}
              {activeZoneConfig && activeZoneConfig.seasons && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {activeZoneConfig.seasons.map((season, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-xs font-bold text-[#2E8B8B]">
                      <span>{season.label}</span>
                      <span className="text-gray-400 font-mono text-[10px] font-medium">({season.date})</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => handleCarouselSlide(timelineScrollRef, 'left')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCarouselSlide(timelineScrollRef, 'right')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual seasonal timeline cards (clean, minimal) */}
          <div 
            ref={timelineScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden snap-x snap-mandatory max-w-5xl mx-auto"
          >
            {timelineData.map((item) => {
              // Determine one season badge if applicable
              // Dec, Jan, Feb, Mar, Apr -> Whale Watching
              // Nov -> Whale Sharks (Nov-Apr)
              // Oct -> Sport Fishing (Oct-Dec)
              let seasonBadge = null;
              if (['Dec', 'Jan', 'Feb', 'Mar', 'Apr'].includes(item.month)) {
                seasonBadge = "🐳 Whale Watching";
              } else if (item.month === 'Nov') {
                seasonBadge = "🦈 Whale Sharks";
              } else if (item.month === 'Oct') {
                seasonBadge = "🎣 Sport Fishing";
              }

              // Weather icon mapping
              const weatherIcon = ['Aug', 'Sep'].includes(item.month) ? "🌧️" : "☀️";

              return (
                <div 
                  key={item.month}
                  className="w-[calc((100%-16px)/2)] sm:w-[calc((100%-48px)/4)] lg:w-[calc((100%-80px)/5)] shrink-0 bg-white border border-gray-200 p-6 rounded-2xl flex flex-col items-center justify-between space-y-4 snap-start shadow-xs hover:shadow-md transition"
                >
                  <div className="space-y-1.5 text-center">
                    <span className="text-lg font-black text-[#1B3A5B] block font-sans">
                      {item.month}
                    </span>
                    <div className="text-3xl py-1">
                      {weatherIcon}
                    </div>
                    <span className="text-base font-bold text-[#204a4a] block font-mono">
                      {item.temp}
                    </span>
                  </div>

                  <div className="min-h-7 flex items-center justify-center">
                    {seasonBadge ? (
                      <span className="text-[9px] uppercase font-mono font-bold tracking-tight text-emerald-800 bg-emerald-50/70 border border-emerald-100/80 px-2 py-1 rounded block">
                        {seasonBadge}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 8 — REVIEWS ================= */}
      <section className="py-16 bg-white" id="traveler-reviews">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
              TRAVELER REVIEWS
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
              {replaceLosCabos("What visitors say about tours in Los Cabos")}
            </h2>
            <div className="flex items-center justify-center gap-1.5 pt-1 text-[#C9A961] font-mono text-sm font-bold">
              <span>★★★★★</span>
              <span>4.9 / 5 Overall Verified Rating</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500 font-sans">Based on 12,400+ online bookings</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedReviews.map((rev) => (
              <div 
                key={rev.name}
                className="bg-[#FDFBF7] border border-gray-100 p-6 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-sm transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {"★".repeat(rev.stars)}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic font-sans text-pretty">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-6 shrink-0">
                  <img 
                    src={rev.avatar} 
                    alt={rev.name} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#1B3A5B] leading-none">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {rev.city} · <strong className="text-[#2E8B8B] font-normal">{rev.tourName}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 10 — FAQs ================= */}
      <section className="py-16 bg-[#FDFBF7] border-y border-gray-150/85" id="excursion-faqs">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
              {replaceLosCabos("Questions about things to do in Los Cabos")}
            </h2>
          </div>

          <div className="space-y-3">
            {displayedFaqs.map((faq, idx) => {
              const isOpen = openedFaq === idx;
              return (
                <div 
                  key={faq.q}
                  className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenedFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between text-[#1B3A5B] hover:bg-gray-50/50 cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-extrabold font-sans">
                      {faq.q}
                    </span>
                    <span className="text-xs text-[#2E8B8B] font-mono font-bold">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-gray-50 text-xs text-gray-600 leading-relaxed font-sans text-pretty">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 11 — NEWSLETTER ================= */}
      <section className="py-20 bg-white" id="planner-newsletter">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-8 text-left relative">
            <div className="space-y-2 max-w-md">
              <span className="text-[9px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.15em] block">
                WEEKLY INSIDER DIGEST
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1B3A5B] tracking-tight leading-tight">
                {replaceLosCabos("Planning your Los Cabos trip?")}
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Get our weekly picks — the best new tours, seasonal tips and local deals. Read by 12,000+ travelers.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 max-w-sm">
              {completedSignup ? (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-xs text-emerald-800 font-bold">
                    Successfully subscribed! Check your inbox soon.
                  </div>
                </div>
              ) : (
                <form onSubmit={submitNewsletter} className="space-y-2">
                  <div className="flex border border-gray-300 rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-[#2E8B8B] transition">
                    <input 
                      type="email" 
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
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

      {/* ================= SECTION 12 — BLOG (TRAVEL GUIDES) ================= */}
      <section className="py-16 bg-[#FDFBF7]" id="guides-blog">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
              TRAVEL GUIDES
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
              Plan smarter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedBlogGuides.map((guide) => (
              <div 
                key={guide.title}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-[180px] overflow-hidden bg-gray-50 relative">
                    <img 
                      src={guide.photo} 
                      alt={guide.title} 
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#1B3A5B] text-[#C9A961] text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                      {guide.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-xs font-black text-gray-400 font-mono tracking-wider">ARTICLE GUIDE</h3>
                    <h4 className="text-sm md:text-base font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition font-sans leading-snug">
                      {guide.title}
                    </h4>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-50 bg-[#FDFBF7]/35 text-[10px] text-gray-500 font-mono">
                  <span className="font-bold text-[#2E8B8B] group-hover:underline">Read absolute insights →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
