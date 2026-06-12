import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Star, MapPin, Clock, Calendar, CheckCircle, Check,
  HelpCircle, ChevronLeft, ChevronRight, Mail, ShieldCheck, 
  ArrowRight, Sparkles, MessageSquare, BookOpen, Utensils, Hotel, Heart
} from 'lucide-react';
import { TourDetail, TourTypeId, DomainType } from '../types';
import { tourDetails, tourTypeConfigs } from '../data';

interface ZoneAreaProps {
  zoneId: string;
  onNavigateDetail: (domain: DomainType, id: TourTypeId) => void;
  onNavigateCategory: (domain: DomainType, hubId?: string | null, subId?: string | null, zoneId?: string | null) => void;
  onNavigatePassport: () => void;
  onNavigateZone: (zoneId: string | null) => void;
  onNavigateAttraction?: (slug: string) => void;
}

const ZONES_CONFIG: Record<string, {
  name: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  heroDesc: string;
  backgroundPhoto: string;
  attractions: string[];
  whenToVisitHighlight: string;
  seasons: { label: string; date: string }[];
  faqs: { q: string; a: string }[];
  reviews: { author: string; rating: number; title: string; text: string; avatar: string; date: string }[];
}> = {
  'cabo-san-lucas': {
    name: "Cabo San Lucas",
    metaTitle: "Cabo San Lucas Travel Guide 2026 - Deals & Local Advice | What's in Cabo",
    metaDesc: "Discover the ultimate local guide to Cabo San Lucas. See top things to do, handpicked beach resorts, romantic cliffside gastronomy, and ocean adventures.",
    h1: "Cabo San Lucas: The Heart of the Action",
    heroDesc: "The Arch, the Marina, whale watching and sunset cruises. The most to do in Los Cabos, all in one place. We have picked the best of every single category.",
    backgroundPhoto: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1600",
    attractions: ["The Arch (El Arco)", "Medano Beach", "Lover's Beach", "Pelican Rock"],
    whenToVisitHighlight: "Cabo San Lucas is spectacular all year. Whale watching dominates from December to mid-April. Swimming, diving, and boat excursions stay wonderfully warm from May to November.",
    seasons: [
      { label: "🐳 Whale Watching", date: "Dec to Apr" },
      { label: "🎣 Sportfishing Peaks", date: "Oct to Dec" },
      { label: "🤿 Snorkeling / Diving", date: "May to Nov" },
      { label: "☀️ Warm Beach Weather", date: "Year-Round" }
    ],
    faqs: [
      { q: "What is Cabo San Lucas best known for?", a: "Cabo San Lucas is world-famous for its stunning natural landmarks like 'El Arco', the premier Marina hosting custom sportfishing fleets, vibrant beaches like Medano, and a high-vibration dining scene." },
      { q: "Is Cabo San Lucas safe for tourists?", a: "Yes, Cabo San Lucas is highly safe and very well-regulated. The main tourist corridor, Marina, and popular beaches feature continuous security patrols and professional bilingual tourism host representatives." },
      { q: "Can you swim in the ocean at Cabo San Lucas?", a: "Yes, but only in designated green-flag areas like Medano Beach or Chileno Bay. The Pacific beach areas are subject to extreme undertows and rogue waves where swimming is strictly prohibited. Always look for safety flags." }
    ],
    reviews: [
      { author: "Sarah Jenkins", rating: 5, title: "Unforgettable Sunset!", text: "Sailing in Cabo San Lucas past the Arch is a spiritual experience. The water is deep sapphire blue and seeing those giant rock structures face-to-face was amazing.", avatar: "👩", date: "May 2026" },
      { author: "Marcus Thompson", rating: 5, title: "The Sportfishing Capital", text: "Booked a deep-sea charter from the Marina and caught massive Mahi-Mahi. The team filleted our catch and a harbor restaurant cooked it fresh right after!", avatar: "👨", date: "April 2026" },
      { author: "Elena Rostova", rating: 4.9, title: "Perfect Beach Vibe", text: "Medano beach is highly active but super fun. Sitting at Sur beach club with cold mocktails, toes in soft sand, looking at Land's End is paradise.", avatar: "👩", date: "June 2026" }
    ]
  },
  'san-jose-del-cabo': {
    name: "San José del Cabo",
    metaTitle: "San José del Cabo travel guide 2026 - Art, Food & Culture | What's in Cabo",
    metaDesc: "Explore historic, charming San José del Cabo. Learn about weekly Thursday night Art Walks, farm-to-table culinary sanctuaries, and pristine wildlife estuaries.",
    h1: "San José del Cabo",
    heroDesc: "Art walks, farm restaurants, and beaches quieter than anything in Cabo San Lucas. The side of Los Cabos most visitors never slow down enough to find.",
    backgroundPhoto: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=1600",
    attractions: ["Historic Town Center & Mission", "San José Estuary Reserve", "Art District galleries"],
    whenToVisitHighlight: "Thursday Art Walks run every week from November through June. Farm-to-table valleys are lush and green post-summer rains (September to November), with exceptional outdoor dining weather all winter.",
    seasons: [
      { label: "🎨 Thursday Art Walk", date: "Nov to Jun" },
      { label: "🥦 Organic Farm Harvests", date: "Oct to May" },
      { label: "🛶 Estuary Birdwatching", date: "Year-Round" }
    ],
    faqs: [
      { q: "What is the differences between Cabo San Lucas and San José del Cabo?", a: "Cabo San Lucas is high-energy, focused on water sports, the Marina, and nightlife. San José del Cabo is historic and tranquil, centered on authentic Mexican culture, galleries, and high-end culinary experiences." },
      { q: "How do I get to the weekly Art Walk?", a: "The Art Walk is in the San José Art District (behind the main church). It takes place every Thursday evening from 5:00 PM to 9:00 PM between November and June, with artists welcoming guests directly into galleries." },
      { q: "Is San José del Cabo stroller or wheelchair accessible?", a: "The historic district is pedestrian-friendly, but keep in mind that historic cobblestones and higher curbs can be occasionally rugged. Public plazas and main avenues are easily accessible." }
    ],
    reviews: [
      { author: "Julian V.", rating: 5, title: "Unbelievable Food Scene", text: "Organic dining in the foothills of San José del Cabo was the peak of our vacation. True farm-to-table cuisine surrounded by lush botanical gardens.", avatar: "👨", date: "June 2026" },
      { author: "Karen L.", rating: 5, title: "Cultural Highlight", text: "Walking the historic cobblestone blocks during the Thursday Art Walk was magical. Musicians playing in street corners, welcoming gallery hosts, and amazing local art.", avatar: "👩", date: "May 2026" },
      { author: "Deepak S.", rating: 4.8, title: "Tranquil and Recharging", text: "Extremely glad we chose to stay in San José del Cabo instead of the louder areas. Peaceful, authentic, yet completely safe and upscale.", avatar: "👨", date: "April 2026" }
    ]
  },
  'todos-santos': {
    name: "Todos Santos",
    metaTitle: "Todos Santos Guide 2026 - Bohemian Surf & Pacific Magic | What's in Cabo",
    metaDesc: "Discover Todos Santos, Baja's magical Pueblo Mágico. Explore renowned surf breaks at Cerritos Beach, pristine historic centers, and bohemian art alleys.",
    h1: "Todos Santos",
    heroDesc: "Surf, galleries, and organic farms an hour north of Cabo. The Pueblo Mágico we send people to when they want the real Baja.",
    backgroundPhoto: "https://images.unsplash.com/photo-1502784404187-359ac186c5bb?auto=format&fit=crop&q=80&w=1600",
    attractions: ["Cerritos Beach Oasis", "Todos Santos Plaza & Mission", "Hotel California Historic Hall", "Punta Lobos Beach Edge"],
    whenToVisitHighlight: "Pacific surf heights peak from October through April, making it ideal for surf lessons or watching athletes at Cerritos Beach. Summer is hot, humid, and perfect for getting quiet beaches.",
    seasons: [
      { label: "🏄 Pacific Surf Peaks", date: "Oct to Apr" },
      { label: "🎨 Art and Music Shows", date: "Jan to Mar" },
      { label: "🌵 Mild Oasis Climates", date: "Nov to May" }
    ],
    faqs: [
      { q: "Is Todos Santos a day trip or an overnight destination?", a: "It works beautifully as both! It is only 1 hour north of Cabo San Lucas. However, spending 1 or 2 nights allows you to fully witness the tranquil starry nights and quiet sunrise beach strolls." },
      { q: "Is Cerritos Beach safe for beginner surfing?", a: "Yes, Cerritos Beach is one of the only safe, sandy-bottom beaches on the Pacific side that has gentle shallow water whitewater waves, perfect for beginner surf lessons with professional local instructors." },
      { q: "What should I bring to Todos Santos?", a: "Bring light clothing, stable walking shoes for unpaved alleys, high sunscreen, and a light jacket for breezy evenings by the Pacific coast." }
    ],
    reviews: [
      { author: "Nataša B.", rating: 5, title: "Bohemian Paradise", text: "Strolling the colorful streets of Todos Santos was like stepping back in time. The organic farm lunch we had overlooking the ocean was stellar.", avatar: "👩", date: "June 2026" },
      { author: "Liam O.", rating: 5, title: "Awesome Surf", text: "Had my first surf lesson ever at Cerritos Beach. The instructors were highly encouraging, safety-focused, and got me standing up on my very first wave!", avatar: "👨", date: "April 2026" },
      { author: "Christine M.", rating: 4.8, title: "Magical Vibe", text: "Historic buildings, creative art galleries on every corner, and towering palm forests meeting the blue ocean waves. Genuinely beautiful.", avatar: "👩", date: "May 2026" }
    ]
  },
  'los-barriles': {
    name: "Los Barriles",
    metaTitle: "Los Barriles local guide 2026 - Windsports & Sea of Cortez | What's in Cabo",
    metaDesc: "Your ultimate guide to Los Barriles. Uncover premier kitesurfing wind periods, Sea of Cortez deep-sea sportfishing, and remote beach trails.",
    h1: "Los Barriles",
    heroDesc: "Kitesurfing, sport fishing, and direct access to East Cape on the Sea of Cortez. Quieter than Cabo and worth every kilometer.",
    backgroundPhoto: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1600",
    attractions: ["Santiago Oasis Hot Springs", "North Beach Wind Arena", "Buena Vista Historic Beach", "San Bartolo Mango Groves"],
    whenToVisitHighlight: "North wind conditions run consistently from November through March, attracting thousands of winter kitesurfers. Spring and summer yield flat glass waters, perfect for kayaking and sportfishing.",
    seasons: [
      { label: "🪁 Winter Winds & Kitesurfing", date: "Nov to Mar" },
      { label: "🎣 World-Class Sportfishing", date: "May to Oct" },
      { label: "🧘 Tranquil Sea Conditions", date: "Apr to Oct" }
    ],
    faqs: [
      { q: "Do I need complex gear to kitesurf in Los Barriles?", a: "No! Multiple certified water schools operate directly from the shoreline during wind season (Nov-Mar), providing rental packages, board safety lines, and professional radio helmets." },
      { q: "Is the water warm in Los Barriles?", a: "During summer and autumn (July to October), the Sea of Cortez stays exceptionally warm, often exceeding 80°F, ideal for snorkeling. Winter months see refreshingly cooler water that is highly comfortable with light wetsuits." },
      { q: "Can we rent off-road ATVs to explore the beaches?", a: "Yes, Los Barriles is highly famous for its off-road trails. Standard rental ATVs are available, but strictly follow local speed limits and stay completely away from active sea-turtle nesting beaches." }
    ],
    reviews: [
      { author: "Hansi K.", rating: 5, title: "Perfect Wind & Water", text: "Spent details-rich two weeks kitesurfing here. The local winds are highly consistent and the community is super helpful and welcoming.", avatar: "👨", date: "January 2026" },
      { author: "Diana G.", rating: 5, title: "Untouched Beauty", text: "The Sea of Cortez is so flat and calm. Snorkeling right off the beach and seeing thousands of bright tropical fish was incredible.", avatar: "👩", date: "May 2026" },
      { author: "Steve P.", rating: 4.9, title: "Unreal Fishing", text: "Booked a small private cruiser layout and hooked massive dorado. Highly affordable rates and zero harbor crowds compared to major city marinas.", avatar: "👨", date: "April 2026" }
    ]
  },
  'east-cape': {
    name: "East Cape",
    metaTitle: "East Cape Travel Guide 2026 - Pristine National Reefs | What's in Cabo",
    metaDesc: "Discover the rugged East Cape. Gateway to UNESCO Cabo Pulmo Marine National Reserve reef diving, wild dunes, and empty sandy bays.",
    h1: "East Cape",
    heroDesc: "Cabo Pulmo, remote beaches, and zero resort infrastructure. Untouched Baja for travelers who know what they are looking for.",
    backgroundPhoto: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600",
    attractions: ["Cabo Pulmo National Marine Reef", "Punta Arena Lighthouse Dunes", "La Ribera Golden Marina", "Arbolitos Cove Snorkeling"],
    whenToVisitHighlight: "Cabo Pulmo underwater visibility is at its magnificent maximum from June through October. Winter is cooler and perfect for remote coastal camper expeditions and wildlife whale watching.",
    seasons: [
      { label: "🤿 UNESCO Reef Snorkel/Dive", date: "Jun to Nov" },
      { label: "🐫 Wildlife Overland Trips", date: "Nov to Apr" },
      { label: "🌌 Desert Star Gazing", date: "Year-Round" }
    ],
    faqs: [
      { q: "What is Cabo Pulmo National Marine Park?", a: "Cabo Pulmo is a UNESCO World Heritage site hosting the single oldest hard coral reef in North America. After local fishing was banned in 1995, marine populations rebounded by over 400%, making it a world-class diving destination today." },
      { q: "Do I need a 4x4 vehicle to explore the East Cape?", a: "For paved main highways, standard cars are fine. But to explore the spectacular coastal coves, dry riverbeds, and unpaved desert roads, renting a 4-wheel-drive SUV is highly recommended." },
      { q: "Is there water and gas on the East Cape?", a: "Facilities are highly primitive. Fill your gas tank and pack premium mineral water in major towns before heading down remote coastal tracks." }
    ],
    reviews: [
      { author: "Clara E.", rating: 5, title: "Underwater Heaven", text: "Snorkeling at Cabo Pulmo is like jumping directly into a giant fish tank. We swam alongside sea lions, sea turtles, and thousands of shimmering jack fish!", avatar: "👩", date: "June 2026" },
      { author: "Tom Wright", rating: 5, title: "The Real Baja", text: "No mega resorts, no high-rise concrete, just endless desert, empty blue water, and pristine stargazing. The escape we definitely needed.", avatar: "👨", date: "May 2026" },
      { author: "Yuki S.", rating: 4.8, title: "Eco Traveler Paradise", text: "Unplugged eco-villas running completely on solar power right next to pristine dunes. Highly recommended for nature lovers.", avatar: "👩", date: "April 2026" }
    ]
  },
  'la-paz': {
    name: "La Paz",
    metaTitle: "La Paz Travel Guide 2026 - Playas, Whales & Balandra | What's in Cabo",
    metaDesc: "Explore La Paz, capital of BCS. Guide to swimming with giant whale sharks, kayaking to Espíritu Santo island, and spectacular Playa Balandra.",
    h1: "La Paz",
    heroDesc: "Whale sharks from November to April, Playa Balandra, and a city that actually belongs to the people who live there. Two hours from Cabo and a completely different world.",
    backgroundPhoto: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=1600",
    attractions: ["Balandra Beach (Playa Balandra)", "Espíritu Santo Island Marine Park", "La Paz Malecón boardwalk"],
    whenToVisitHighlight: "The wild whale shark nursery season is active from November through April, heavily regulated for guest and animal safety. Marina sea lion snorkeling peaks during late spring and summer.",
    seasons: [
      { label: "🦈 Gentle Whale Shark Swims", date: "Nov to Apr" },
      { label: "🏝️ Desert Island Kayaking", date: "Oct to May" },
      { label: "🤿 Sea Lion Reef Snorkeling", date: "May to Sep" }
    ],
    faqs: [
      { q: "Where can I swim with whale sharks in La Paz?", a: "Swims are done inside the protected Bay of La Paz, only 5-10 minutes from city piers. Tours run on eco-authorized pangas led by certified marine biologists who verify shark positions daily." },
      { q: "Is Balandra Beach open to all visitors?", a: "Balandra Beach is a strictly protected ecology reserve. Parking and entry are managed in split daily shifts (generally morning and afternoon) with strict capacity caps to monitor soft-sand footprints." },
      { q: "How long is the drive from Cabo San Lucas to La Paz?", a: "The drive takes approximately 2 hours via the high-speed Federal Highway 19, past Todos Santos. Many visitors book safe roundtrip sprinters with hotel lobby pickup included." }
    ],
    reviews: [
      { author: "Beatriz M.", rating: 5, title: "Whale Shark Bucket List", text: "Swimming with 25ft whale sharks in La Paz was life-changing. These huge, gentle creatures glide right past you. Worth every single second!", avatar: "👩", date: "May 2026" },
      { author: "Hans Nielsen", rating: 5, title: "Balandra is Unreal", text: "Walked 200 yards into the ocean and the crystal clear turquoise water was still only knee-deep! Stunning white dunes and zero commercial noise.", avatar: "👨", date: "April 2026" },
      { author: "Emily Rose", rating: 4.9, title: "Incredible Historic Malecón", text: "Strolling the Malecón boardwalk at sunset was beautiful. Families laughing, bicycle corridors, cool sea breezes, and fabulous local dining.", avatar: "👩", date: "June 2026" }
    ]
  },
  'tourist-corridor': {
    name: "Tourist Corridor",
    metaTitle: "Tourist Corridor Guide 2026 - Resorts, Snorkel & Golf | What's in Cabo",
    metaDesc: "Your local guide to the Los Cabos Tourist Corridor. Discover world-famous Chileno and Santa Maria snorkeling bays, luxury resorts, and championship golf.",
    h1: "Tourist Corridor",
    heroDesc: "Chileno Bay, Santa Maria Beach, and the top luxury resorts in Los Cabos. Everything between Cabo San Lucas and San José del Cabo that is worth your time.",
    backgroundPhoto: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1600",
    attractions: ["Chileno Blue-Flag Bay", "Santa Maria Shoreline Cove", "Cabo Del Sol Golf corridor"],
    whenToVisitHighlight: "Corridor snorkeling is spectacular year-round, with calm coves safe from rogue waves. Water temperatures are warmest and snorkeling look distance exceeds 80 feet from May to November.",
    seasons: [
      { label: "🤿 Blue Flag Snorkeling", date: "Year-Round (Best May-Nov)" },
      { label: "⛳ Championship Golf Outings", date: "Oct to May" },
      { label: "🐋 Humpback Coastal Sightings", date: "Dec to Apr" }
    ],
    faqs: [
      { q: "Are the beaches along the Tourist Corridor safe for swimming?", a: "Yes, Chileno Bay and Santa Maria Beach are protected rocky coves with soft sands and shallow water entry points, holding certified Blue-Flag safety badges. Most other long coastline stretches are strictly non-swimmable." },
      { q: "How do we get around the Tourist Corridor?", a: "Since the Corridor is 30km long, hiring local private transport, renting a car, or using comfortable public bus systems is common. Buses stop frequently at Chileno and Santa Maria pathways." },
      { q: "Do Corridor beach areas have public restrooms and showers?", a: "Yes, both Chileno Beach and Santa Maria Beach have paved public parking, clean public restrooms, and freshwater outdoor showers that are completely free of charge." }
    ],
    reviews: [
      { author: "Oliver G.", rating: 5, title: "The Best Coral Reef", text: "Snorkeling at Chileno Bay was easily the highlight of our vacation. We saw green sea turtles, bright purple sea urchins, and amazing schooling fish in absolute safety.", avatar: "👨", date: "June 2026" },
      { author: "Leticia L.", rating: 5, title: "Ultimate Luxury Resorts", text: "Staying at the Cape Thompson was perfect. Balcony facing the Arch, gorgeous rooftop bars, and total safety perimeters. Exceptional hospitality.", avatar: "👩", date: "May 2026" },
      { author: "Bob Henderson", rating: 4.8, title: "Stellar Golf views", text: "Maintained fairways dropping off directly into breaking ocean surf. Quite easily the most memorable golf courses I have ever played.", avatar: "👨", date: "April 2026" }
    ]
  }
};

const TOURS_BY_ZONE_MAP: Record<string, string[]> = {
  'cabo-san-lucas': ['water', 'fishing', 'sunset', 'adventure'],
  'san-jose-del-cabo': ['water', 'adventure', 'cultural'],
  'todos-santos': ['adventure'],
  'los-barriles': ['fishing'],
  'east-cape': ['water'],
  'la-paz': ['whakesharks'],
  'tourist-corridor': ['water', 'adventure', 'cultural']
};

const REST_BY_ZONE_MAP: Record<string, string[]> = {
  'cabo-san-lucas': ['finedining'],
  'san-jose-del-cabo': ['beachside', 'organicfarm'],
  'tourist-corridor': ['finedining'],
};

const HOTELS_BY_ZONE_MAP: Record<string, string[]> = {
  'cabo-san-lucas': ['luxuryvilla'],
  'san-jose-del-cabo': ['boutiqueart'],
  'tourist-corridor': ['beachresort']
};

const zoneList = [
  { id: 'cabo-san-lucas', name: 'Cabo San Lucas', path: '/cabo-san-lucas/', tagline: 'The Arch, Marina & vibrant shoreline', photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
  { id: 'san-jose-del-cabo', name: 'San José del Cabo', path: '/san-jose-del-cabo/', tagline: 'Art, food & authentic Mexico', photo: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
  { id: 'todos-santos', name: 'Todos Santos', path: '/todos-santos/', tagline: 'Bohemian surf & creative culture', photo: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
  { id: 'los-barriles', name: 'Los Barriles', path: '/los-barriles/', tagline: 'Fishing & kitesurf paradise', photo: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
  { id: 'east-cape', name: 'East Cape', path: '/east-cape/', tagline: 'Remote beaches & luxury retreats', photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
  { id: 'la-paz', name: 'La Paz', path: '/la-paz/', tagline: 'Whale sharks & hidden coves', photo: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
  { id: 'tourist-corridor', name: 'Tourist Corridor', path: '/tourist-corridor/', tagline: 'World-class resorts & golf', photo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType }
];

const blogsListies = [
  {
    id: 0,
    title: 'Is Cabo San Lucas Safe? Complete Guide 2026',
    url: '/blog/is-cabo-san-lucas-safe/',
    readingTime: '5 min read',
    date: 'Published June 11, 2026',
    photo: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=450',
    synopsis: 'Everything you need to know about safety perimeters, taxi systems, beach flags, and drinking water safety in Los Cabos, written by real residents.',
    fullContent: `Safety is the single most common concern for first-time travelers to Baja. The short answer is: Yes, Los Cabos is exceptionally safe, ranking consistently as one of Mexico's safest premier tourism enclaves.

Because tourism is the sole economic driver for the region, local municipal councils, state authorities, and federal military units run a highly coordinated, triple-tier safety network.

Key Safety Guidelines:
1. SWIMMABILITY: The Pacific ocean has extremely violent waves and sudden 10ft dropoffs with severe undertows. Only swim on Sea of Cortez beaches featuring green safety flags (e.g., Medano Beach, Chileno Bay).
2. TRANSIT: Authorized white-and-yellow municipal taxis and state Uber services are completely safe, highly regulated, and trackable.
3. LOCAL WATER: Modern luxury resorts and key commercial plazas run high-capacity reverse osmosis filtration systems. While tap water is fine for brushing teeth, drinking bottled mineral water is highly recommended.`
  },
  {
    id: 1,
    title: 'Best Time to Visit Cabo San Lucas',
    url: '/blog/best-time-to-go-to-cabo/',
    readingTime: '4 min read',
    date: 'Published May 28, 2026',
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=450',
    synopsis: 'A month-by-month breakdown of weather, water visibility, whale migration seasons, and local pricing trends to help you plan the absolute perfect trip.',
    fullContent: `Planning when to visit depends directly on what activities you hope to experience during your stay:

1. Peak Wildlife Season (December to April)
This is the golden window for marine mammal watching. Thousands of migrating humpback and gray whales travel down from raw Arctic feeding basins to nurse calving pods in the shallow coastal coves of Baja.

2. Peak Water & Snorkel Season (May to November)
By June, the cooling offshore Pacific winds subside, letting the Sea of Cortez warm dramatically. Snorkeling look distance exceeds 80 feet, with average water temperatures resting at a luxurious 80°F to 84°F.

3. The Quiet Season (July to September)
Summer brings high humidity, occasional tropical rainfall systems, and the warmest, quietest beach settings.`
  },
  {
    id: 2,
    title: 'Cabo vs Cancun — Which Is Better?',
    url: '/blog/cabo-vs-cancun/',
    readingTime: '6 min read',
    date: 'Published April 15, 2026',
    photo: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=450',
    synopsis: 'An honest, objective comparison of landscape, safety, dining, cost, and beaches between the Pacific gem of Baja and the Caribbean shores of Yucatan.',
    fullContent: `While both Cancun and Los Cabos are world-renowned Mexican vacation destinations, they yield fundamentally distinct sensory environments:

1. THE Landscape: Cancun features lush humid jungles with flat powder-white sands meeting turquoise Caribbean waters. Los Cabos is a majestic, high-contrast desert paradise where dramatic granite cliffs descend straight into deep indigo seas.

2. The Architecture & Atmosphere: Cancun has massive multi-story hotel strip strips and is highly commercialized. Los Cabos features sprawling, architecturally low-profile luxury boutique estates, private ocean villa enclaves, and a highly chic culinary and art scene.

3. Swimmability: Cancun is swimmable on almost all shorelines. Los Cabos restricts swimmability to a few designated safety coves, prioritizing structural privacy and incredible cliffside wave views instead.`
  }
];

export default function ZoneArea({ 
  zoneId, 
  onNavigateDetail, 
  onNavigateCategory, 
  onNavigatePassport,
  onNavigateZone,
  onNavigateAttraction
}: ZoneAreaProps) {
  const activeZone = ZONES_CONFIG[zoneId] || ZONES_CONFIG['cabo-san-lucas'];
  const zoneName = activeZone.name;

  const [activeTab, setActiveTab] = useState<DomainType>('tours');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [openedFaq, setOpenedFaq] = useState<number | null>(null);
  const [activeBlogArticle, setActiveBlogArticle] = useState<number | null>(null);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});

  const toursScrollRef = useRef<HTMLDivElement>(null);
  const restScrollRef = useRef<HTMLDivElement>(null);
  const hotelScrollRef = useRef<HTMLDivElement>(null);
  const attractionsScrollRef = useRef<HTMLDivElement>(null);
  const otherZonesScrollRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const hubsScrollRef = useRef<HTMLDivElement>(null);

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

  // Helper replacing Los Cabos occurrences natively
  const replaceLosCabos = (text: string) => {
    if (!text) return '';
    return text
      .replace(/Los Cabos/g, zoneName)
      .replace(/los cabos/g, zoneName.toLowerCase())
      .replace(/LOS CABOS/g, zoneName.toUpperCase());
  };

  // Resolve matching lists
  const matchedTourIds = TOURS_BY_ZONE_MAP[zoneId] || [];
  const matchedRestIds = REST_BY_ZONE_MAP[zoneId] || [];
  const matchedHotelIds = HOTELS_BY_ZONE_MAP[zoneId] || [];

  const zoneTours = matchedTourIds.map(id => tourDetails[id as TourTypeId]).filter(Boolean);
  const zoneRestaurants = matchedRestIds.map(id => tourDetails[id as TourTypeId]).filter(Boolean);
  const zoneHotels = matchedHotelIds.map(id => tourDetails[id as TourTypeId]).filter(Boolean);

  // 8 Hub collection list - dynamic and aligned with the Home page hubs
  const categoryHubs = [
    { title: 'Tours & Activities', count: 'Verified experiences', photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'tours', subId: null, zoneId: zoneId },
    { title: 'Restaurants & Dining', count: 'Vetted gastronomy hotspots', photoUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400', domain: 'restaurants' as DomainType, hubId: 'restaurants', subId: null, zoneId: zoneId },
    { title: 'Hotels & Resorts', count: 'Luxury local escapes', photoUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400', domain: 'hotels' as DomainType, hubId: 'hotels', subId: null, zoneId: zoneId },
    { title: 'Beach Clubs', count: 'Day passes & beachfront lounge', photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400', domain: 'restaurants' as DomainType, hubId: 'beach-clubs-cabo', subId: null, zoneId: zoneId },
    { title: 'Yacht Charters', count: 'Private & shared cruises', photoUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'yacht-charters', subId: null, zoneId: zoneId },
    { title: 'Sport Fishing', count: 'Charters & Priority routes', photoUrl: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'tours', subId: 'fishing', zoneId: zoneId },
    { title: 'Nightlife & Bars', count: 'Best bars & local clubs', photoUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400', domain: 'restaurants' as DomainType, hubId: 'nightlife', subId: null, zoneId: zoneId },
    { title: 'Airport Shuttle', count: 'Transfers & transport', photoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'cabo-airport-shuttle', subId: null, zoneId: null }
  ];

  // Map local matching listings or default to regional ones so that page is always perfectly populated
  const pageTours = zoneTours.length > 0 ? zoneTours.map(t => ({
    id: t.id,
    name: t.title,
    rating: t.operatorRating,
    reviewsCount: t.operatorReviewsCount,
    operatorBadge: t.operatorBadge,
    duration: t.duration,
    price: `$${t.discountedPrice || t.price}`,
    originalPrice: t.discountedPrice ? `$${t.price}` : '',
    zone: zoneName,
    photoUrl: t.images[0]?.url || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400'
  })) : [
    { id: 'adventure' as TourTypeId, name: 'Canyon Safari 4x4 Ride & Rappelling', rating: 4.9, reviewsCount: 1420, operatorBadge: 'Certified Safe - Rank #1', duration: '3.5 Hours', price: '$169', originalPrice: '$199', zone: 'Tourist Corridor', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400' },
    { id: 'sunset' as TourTypeId, name: 'Private Sunset Sailing Yacht Cruise', rating: 5.0, reviewsCount: 980, operatorBadge: 'Secluded Deck Layout', duration: '3 Hours', price: '$299', originalPrice: '$350', zone: 'Cabo San Lucas Marina', photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400' },
    { id: 'whakesharks' as TourTypeId, name: 'La Paz Wild Whale Shark Swim', rating: 4.8, reviewsCount: 420, operatorBadge: 'Conservation First Certified', duration: '5 Hours', price: '$180', originalPrice: '$220', zone: 'La Paz Sanctuary', photoUrl: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=400' },
    { id: 'water' as TourTypeId, name: 'El Arco Yacht Snorkel Tour & Lunch', rating: 4.9, reviewsCount: 2210, operatorBadge: 'Best Seller Award', duration: '4 Hours', price: '$145', originalPrice: '$180', zone: 'Land’s End Cove', photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' }
  ];

  const pageRestaurants = zoneRestaurants.length > 0 ? zoneRestaurants.map(r => ({
    id: r.id,
    name: r.operatorName || r.title,
    aboutText: r.aboutText,
    rating: r.operatorRating,
    reviewsCount: r.operatorReviewsCount,
    operatorBadge: r.operatorBadge,
    price: `$${r.discountedPrice || r.price}`,
    originalPrice: r.discountedPrice ? `$${r.price}` : '',
    zone: zoneName,
    photoUrl: r.images[0]?.url || 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400'
  })) : [
    { id: 'finedining' as TourTypeId, name: 'Sunset Monalisa Gastronomy', aboutText: 'Michelin-level gastronomy cliffside seating overlooking the ocean.', rating: 4.9, reviewsCount: 1850, operatorBadge: 'Iconic Ocean View', price: 'From $150', originalPrice: '', zone: 'Tourist Corridor', photoUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400' },
    { id: 'beachside' as TourTypeId, name: 'El Ganzo Beach Club & Eats', aboutText: 'Vibrant local organic fish tacos and custom seaside cocktails.', rating: 4.7, reviewsCount: 640, operatorBadge: 'Cool Beach Club vibe', price: 'From $50', originalPrice: '', zone: 'San José Marina', photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
    { id: 'organicfarm' as TourTypeId, name: 'Flora Farms Kitchen & Fields', aboutText: 'Ultimate farm-to-table culinary layout inside organic fields.', rating: 4.9, reviewsCount: 3200, operatorBadge: 'Must Visit Classic', price: 'From $75', originalPrice: '', zone: 'San José del Cabo', photoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' }
  ];

  const pageHotels = zoneHotels.length > 0 ? zoneHotels.map(h => ({
    id: h.id,
    name: h.operatorName || h.title,
    aboutText: h.aboutText,
    rating: h.operatorRating,
    reviewsCount: h.operatorReviewsCount,
    operatorBadge: h.operatorBadge,
    price: `$${h.discountedPrice || h.price}`,
    originalPrice: h.discountedPrice ? `$${h.price}` : '',
    zone: zoneName,
    photoUrl: h.images[0]?.url || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400'
  })) : [
    { id: 'beachresort' as TourTypeId, name: 'The Cape Thompson Beach Resort', aboutText: 'Epic mid-century architectural masterpiece with ocean views in every room.', rating: 4.9, reviewsCount: 1100, operatorBadge: 'Rank #1 Sunset views', price: 'From $610', originalPrice: '', zone: 'Tourist Corridor', photoUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400' },
    { id: 'luxuryvilla' as TourTypeId, name: 'Pedregal Sovereignty Luxury Villa', aboutText: 'Exclusive mountain-carved private mansion featuring dual infinity pools.', rating: 5.0, reviewsCount: 180, operatorBadge: 'Ultra Private Enclave', price: 'From $2850', originalPrice: '', zone: 'Pedregal Cliffside', photoUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=400' },
    { id: 'boutiqueart' as TourTypeId, name: 'El Ganzo Boutique Art Resort', aboutText: 'Bespoke artistic waterfront fortress with live rooftop sound stages.', rating: 4.8, reviewsCount: 750, operatorBadge: 'Rooftop Glass Pool', price: 'From $240', originalPrice: '', zone: 'San José Marina', photoUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=400' }
  ];

  // Calculate dynamic trust data
  const totalListingsCount = zoneTours.length + zoneRestaurants.length + zoneHotels.length;
  const averageRatingCalculated = (() => {
    const all = [...zoneTours, ...zoneRestaurants, ...zoneHotels];
    if (all.length === 0) return 4.9;
    const sum = all.reduce((acc, curr) => acc + curr.operatorRating, 0);
    return Number((sum / all.length).toFixed(1));
  })();

  // Sync tab on mount/change if current tab's list is empty
  useEffect(() => {
    if (activeTab === 'tours' && zoneTours.length === 0) {
      if (zoneRestaurants.length > 0) setActiveTab('restaurants');
      else if (zoneHotels.length > 0) setActiveTab('hotels');
    } else if (activeTab === 'restaurants' && zoneRestaurants.length === 0) {
      if (zoneTours.length > 0) setActiveTab('tours');
      else if (zoneHotels.length > 0) setActiveTab('hotels');
    } else if (activeTab === 'hotels' && zoneHotels.length === 0) {
      if (zoneTours.length > 0) setActiveTab('tours');
      else if (zoneRestaurants.length > 0) setActiveTab('restaurants');
    }
  }, [zoneId]);

  // Sync browser title, meta description, and schema tags natively on mount
  useEffect(() => {
    document.title = activeZone.metaTitle;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", activeZone.metaDesc);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [zoneId, activeZone]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Structured data markup definitions
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://whatsincabo.com/${zoneId}/`,
        "url": `https://whatsincabo.com/${zoneId}/`,
        "name": activeZone.metaTitle,
        "description": activeZone.metaDesc,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://whatsincabo.com/#website",
          "url": "https://whatsincabo.com/",
          "name": "What's in Cabo"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://whatsincabo.com/${zoneId}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://whatsincabo.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": zoneName,
            "item": `https://whatsincabo.com/${zoneId}/`
          }
        ]
      },
      {
        "@type": "TouristDestination",
        "@id": `https://whatsincabo.com/${zoneId}/#destination`,
        "name": zoneName,
        "description": activeZone.heroDesc,
        "isPartOf": {
          "@type": "TouristRegion",
          "name": "Los Cabos",
          "sameAs": "https://en.wikipedia.org/wiki/Los_Cabos_Municipality"
        }
      }
    ]
  };

  // Filter other zones
  const otherZones = zoneList.filter(z => z.id !== zoneId);

  return (
    <div className="flex-1 bg-[#fdfbf7]/40 w-full" id={`zone-page-${zoneId}`}>
      {/* Schema technical SEO crawl injection */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ================= SECTION 1 — HERO ================= */}
      <section className="relative min-h-[520px] md:min-h-[580px] flex items-center justify-center bg-[#1B3A5B] overflow-hidden" id="zone-hero">
        <div className="absolute inset-0 z-0">
          <img 
            src={activeZone.backgroundPhoto} 
            alt={replaceLosCabos(`Curated visual guide to Los Cabos`)} 
            className="w-full h-full object-cover opacity-40 filter scale-105 select-none"
            referrerPolicy="no-referrer"
            width={1600}
            height={580}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3A5B]/85 via-[#1B3A5B]/45 to-[#fdfbf7]/20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16 text-center text-white space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C9A961]/25 border border-[#C9A961]/40 rounded-full text-xs font-semibold text-[#fdfbf4] tracking-wide mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>Local Expert Travel &amp; Booking Guide</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight leading-tight text-white drop-shadow-md">
              {activeZone.h1}
            </h1>
            <p className="text-base sm:text-lg max-w-3xl mx-auto text-[#FAF7F0] font-semibold leading-relaxed drop-shadow-sm">
              {activeZone.heroDesc}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('zone-explore-categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-[#C9A961] hover:bg-[#b0904d] text-[#0C1E32] font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer active:scale-95 shadow-md border hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Explore Curated Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dynamic Trust Strip */}
          <div className="max-w-3xl mx-auto pt-8 border-t border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-[#FAF7F0]/90 font-sans" id="zone-trust-strip">
            <span className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">✓</span> {totalListingsCount} curated experiences
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#C9A961] text-base">★</span> {averageRatingCalculated} average rating
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">📍</span> Live local support
            </span>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 — WHAT DO YOU WANT TO DO IN [LUGAR]? ================= */}
      <section className="py-16 bg-white" id="zone-explore-categories">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="flex items-end justify-between border-b border-gray-100 pb-5">
            <div className="space-y-1.5 text-left">
              <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block">
                EXPERIENCE {zoneName.toUpperCase()}
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                What do you want to do in {zoneName}?
              </h2>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => scrollContainer(hubsScrollRef, 'left')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-[#FAF7F0] hover:text-[#1B3A5B] transition cursor-pointer"
                aria-label="Scroll left hubs"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => scrollContainer(hubsScrollRef, 'right')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-[#FAF7F0] hover:text-[#1B3A5B] transition cursor-pointer"
                aria-label="Scroll right hubs"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* 8 Hub Cards Carousel - Horizontal scroll, full photo backgrounds */}
          <div 
            ref={hubsScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
            id="hubs-carousel"
          >
            {categoryHubs.map((hub, index) => (
              <div 
                key={index}
                onClick={() => onNavigateCategory(hub.domain, hub.hubId, hub.subId, hub.zoneId)}
                className="relative flex-none w-[270px] h-[320px] rounded-2xl overflow-hidden snap-start cursor-pointer group shadow-sm bg-white border border-gray-150 transition-all duration-300 hover:shadow-lg"
              >
                <img 
                  src={hub.photoUrl} 
                  alt={hub.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                  width={270}
                  height={320}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5B]/95 via-[#1B3A5B]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-lg font-extrabold tracking-tight group-hover:text-[#C9A961] transition">
                    {hub.title}
                  </h3>
                  <p className="text-xs text-gray-350 font-medium mt-1 leading-normal">
                    {hub.count}
                  </p>
                  <span className="text-[10px] text-[#C9A961] font-mono font-bold uppercase tracking-wider mt-3 group-hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Directory →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3 — CURATED DIRECT ROUTED CAROUSELS ================= */}
      <section className="py-16 md:py-20 bg-[#FAF7F0]/40 border-y border-gray-200/40" id="zone-featured-listings">
        <div className="max-w-7xl mx-auto px-4 space-y-16">

          {/* CAROUSEL 1: Top Tours & Experiences in [lugar] */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">Curated Experiences</span>
                <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                  Top Tours &amp; Experiences in {zoneName}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollContainer(toursScrollRef, 'left')}
                  className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollContainer(toursScrollRef, 'right')}
                  className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              ref={toursScrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {pageTours.map((tour) => (
                <div 
                  key={tour.id}
                  onClick={() => onNavigateDetail('tours', tour.id)}
                  className="relative flex-none w-[290px] group bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between snap-start"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img 
                        src={tour.photoUrl} 
                        alt={tour.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        width={400}
                        height={192}
                      />
                      <div className="absolute top-3 left-3 bg-[#1B3A5B] text-[#FAF7F0] text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-lg shadow-sm">
                        📍 {tour.zone}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSavedItems(p => ({ ...p, [tour.id]: !p[tour.id] })); }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs hover:bg-white rounded-full shadow transition text-gray-500 hover:text-red-500 cursor-pointer focus:outline-none"
                      >
                        <Heart 
                          className={`w-4 h-4 transition ${savedItems[tour.id] ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </button>
                    </div>

                    <div className="p-4 space-y-3.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{tour.rating}</span>
                        <span className="text-gray-400 text-[11px] font-normal">({tour.reviewsCount || 120} Reviews)</span>
                      </div>

                      <h3 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug line-clamp-2">
                        {tour.name}
                      </h3>

                      {tour.duration && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{tour.duration} duration</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/70">
                      <div>
                        {tour.originalPrice && <span className="text-[10px] text-gray-400 line-through block">{tour.originalPrice}</span>}
                        <span className="text-sm font-extrabold text-[#1B3A5B] font-mono">{tour.price}</span>
                      </div>
                      <span className="text-xs font-bold text-[#2E8B8B] group-hover:underline">View details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAROUSEL 2: Top Restaurants in [lugar] */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">Gastronomy &amp; Beach Bites</span>
                <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                  Top Restaurants in {zoneName}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollContainer(restScrollRef, 'left')}
                  className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollContainer(restScrollRef, 'right')}
                  className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              ref={restScrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {pageRestaurants.map((rest) => (
                <div 
                  key={rest.id}
                  onClick={() => onNavigateDetail('restaurants', rest.id)}
                  className="relative flex-none w-[290px] group bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between snap-start"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img 
                        src={rest.photoUrl} 
                        alt={rest.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        width={400}
                        height={192}
                      />
                      <div className="absolute top-3 left-3 bg-[#1B3A5B] text-[#FAF7F0] text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-lg shadow-sm">
                        📍 {rest.zone}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSavedItems(p => ({ ...p, [rest.id]: !p[rest.id] })); }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs hover:bg-white rounded-full shadow transition text-gray-500 hover:text-red-500 cursor-pointer focus:outline-none"
                      >
                        <Heart 
                          className={`w-4 h-4 transition ${savedItems[rest.id] ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </button>
                    </div>

                    <div className="p-4 space-y-3.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{rest.rating}</span>
                        <span className="text-gray-400 text-[11px] font-normal">({rest.reviewsCount || 410} Reviews)</span>
                      </div>

                      <h3 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug line-clamp-2">
                        {rest.name}
                      </h3>

                      <p className="text-xs text-gray-400 leading-normal line-clamp-2">
                        {rest.aboutText}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/70">
                      <div>
                        {rest.originalPrice && <span className="text-[10px] text-gray-400 line-through block">{rest.originalPrice}</span>}
                        <span className="text-sm font-extrabold text-[#1B3A5B] font-mono">{rest.price}</span>
                      </div>
                      <span className="text-xs font-bold text-[#2E8B8B] group-hover:underline">View details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAROUSEL 3: Top Hotels in Los Cabos */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">Luxury &amp; Boutique Stays</span>
                <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                  Top Hotels in Los Cabos
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollContainer(hotelScrollRef, 'left')}
                  className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollContainer(hotelScrollRef, 'right')}
                  className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div 
              ref={hotelScrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {pageHotels.map((hotel) => (
                <div 
                  key={hotel.id}
                  onClick={() => onNavigateDetail('hotels', hotel.id)}
                  className="relative flex-none w-[290px] group bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between snap-start"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img 
                        src={hotel.photoUrl} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        width={400}
                        height={192}
                      />
                      <div className="absolute top-3 left-3 bg-[#1B3A5B] text-[#FAF7F0] text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-lg shadow-sm">
                        📍 {hotel.zone}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSavedItems(p => ({ ...p, [hotel.id]: !p[hotel.id] })); }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs hover:bg-white rounded-full shadow transition text-gray-500 hover:text-red-500 cursor-pointer focus:outline-none"
                      >
                        <Heart 
                          className={`w-4 h-4 transition ${savedItems[hotel.id] ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </button>
                    </div>

                    <div className="p-4 space-y-3.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{hotel.rating}</span>
                        <span className="text-gray-400 text-[11px] font-normal">({hotel.reviewsCount || 230} Reviews)</span>
                      </div>

                      <h3 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug line-clamp-2">
                        {hotel.name}
                      </h3>

                      <p className="text-xs text-gray-400 leading-normal line-clamp-2">
                        {hotel.aboutText}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/70">
                      <div>
                        {hotel.originalPrice && <span className="text-[10px] text-gray-400 line-through block">{hotel.originalPrice}</span>}
                        <span className="text-sm font-extrabold text-[#1B3A5B] font-mono">{hotel.price}</span>
                      </div>
                      <span className="text-xs font-bold text-[#2E8B8B] group-hover:underline">View details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 4 — ICONIC ATTRACTIONS (Conditional) ================= */}
      {activeZone.attractions.length >= 3 && (
        <section className="py-16 bg-white" id="zone-attractions">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">
                  NOT TO BE MISSED
                </span>
                <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                  Iconic Attractions in {zoneName}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => scrollContainer(attractionsScrollRef, 'left')}
                  className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => scrollContainer(attractionsScrollRef, 'right')}
                  className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            <div 
              ref={attractionsScrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {activeZone.attractions.map((attraction, idx) => {
                // Determine photourl based on index or title
                const photoMap = [
                  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
                  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=600"
                ];
                const photoUrl = photoMap[idx % photoMap.length];

                const getAttractionSlug = (name: string): string | null => {
                  const norm = name.toLowerCase();
                  if (norm.includes('balandra')) return 'balandra-beach';
                  if (norm.includes('arch') || norm.includes('arco')) return 'the-arch-of-cabo-san-lucas';
                  if (norm.includes('medano')) return 'medano-beach';
                  if (norm.includes('chileno')) return 'chileno-beach';
                  if (norm.includes('lover')) return 'lovers-beach-cabo';
                  if (norm.includes('santa maria') || norm.includes('santa maría')) return 'playa-santa-maria';
                  if (norm.includes('pulmo')) return 'cabo-pulmo';
                  return null;
                };

                const slug = getAttractionSlug(attraction);

                return (
                  <div 
                    key={idx}
                    onClick={() => {
                      if (slug && onNavigateAttraction) {
                        onNavigateAttraction(slug);
                      }
                    }}
                    className={`relative flex-none w-[300px] h-[360px] rounded-3xl overflow-hidden snap-start group shadow-xs hover:shadow-lg transition duration-300 ${
                      slug ? 'cursor-pointer' : ''
                    }`}
                  >
                    <img 
                      src={photoUrl} 
                      alt={attraction} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none animate-fadeIn"
                      width={300}
                      height={360}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 space-y-2 text-white flex flex-col justify-end h-full">
                      <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest block">
                        {slug ? "★ PREMIER ATTRACTION • VER GUÍA" : "LOCAL LANDMARK"}
                      </span>
                      <h3 className="text-lg font-black tracking-tight leading-snug group-hover:text-teal-300 transition-colors">
                        {attraction}
                      </h3>
                      <p className="text-xs text-gray-300 font-sans leading-relaxed">
                        Curated as a premier location to experience native geological beauty and wild ocean environments in {zoneName}.
                      </p>
                      {slug && (
                        <div className="pt-2 text-[10px] font-bold text-teal-300 group-hover:underline flex items-center gap-1">
                          Ver Guía Completa Design & CRO →
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= SECTION 5 — EXPLORE OTHER PLACES NEARBY ================= */}
      <section className="py-16 md:py-20 bg-[#FDFBF7] border-t border-gray-150" id="nearby-zones">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">
                BEYOND {zoneName.toUpperCase()}
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                Explore Other Places Nearby
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollContainer(otherZonesScrollRef, 'left')}
                className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => scrollContainer(otherZonesScrollRef, 'right')}
                className="p-1.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer transition active:scale-95"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          <div 
            ref={otherZonesScrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {otherZones.map((zone) => (
              <div 
                key={zone.id}
                onClick={() => onNavigateZone(zone.id)}
                className="relative flex-none w-[280px] h-[200px] rounded-2xl overflow-hidden snap-start cursor-pointer group shadow-xs hover:shadow-md transition-transform duration-300 hover:-translate-y-1 block"
              >
                <img 
                  src={zone.photo} 
                  alt={zone.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                  width={280}
                  height={200}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-transparent shadow-inner" />
                
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white">
                  <h3 className="text-base font-extrabold tracking-tight group-hover:text-[#C9A961] transition-all">
                    {zone.name}
                  </h3>
                  <p className="text-[11px] text-[#FAF7F0]/85 font-medium mt-1 leading-normal">
                    {zone.tagline}
                  </p>
                  <span className="text-[10px] text-teal-400 font-mono font-bold uppercase tracking-wider mt-2 group-hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    See Local Guide →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 6 — CABO PASSPORT CTA ================= */}
      <section className="py-12 bg-white" id="zone-passport-cta">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#0C1E32] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-white/10">
            {/* Ambient gold vector details */}
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none bg-gradient-to-l from-[#C9A961] to-transparent animate-pulse-slow" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-3xl mx-auto">
              <div className="space-y-2 max-w-xl text-left">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#C9A961] uppercase tracking-[0.15em] block">
                  DON'T LEAVE MONEY IN CABO
                </span>
                <h3 className="text-lg md:text-xl font-extrabold tracking-tight leading-snug font-sans text-white">
                  Save an average of $180 on your tour bookings
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-300 font-sans leading-relaxed">
                  Most travelers who book experiences in {zoneName} save easily on fine dining, water expeditions, and boutique day clubs using the Cabo Passport. Unlocks in under 2 minutes.
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

      {/* ================= SECTION 7 — BEST TIME TO VISIT ================= */}
      <section className="py-16 md:py-20 bg-[#FAF7F2] border-y border-gray-150/80" id="zone-seasonal-guide">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
            <div className="space-y-2 text-left max-w-4xl">
              <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.12em] block">
                PLAN YOUR VACATION TO {zoneName.toUpperCase()}
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                Best time for tours in {zoneName}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-sans max-w-3xl">
                {activeZone.whenToVisitHighlight}
              </p>
              
              {/* Dynamic seasons tags/badges */}
              {activeZone.seasons && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {activeZone.seasons.map((season, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-xs font-bold text-[#2E8B8B]">
                      <span>{season.label}</span>
                      <span className="text-gray-400 font-mono text-[10px] font-medium font-bold">({season.date})</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => scrollContainer(timelineScrollRef, 'left')}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl text-[#1B3A5B] cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollContainer(timelineScrollRef, 'right')}
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
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory max-w-5xl mx-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {timelineData.map((item) => {
              let seasonBadge = null;
              if (['Dec', 'Jan', 'Feb', 'Mar', 'Apr'].includes(item.month)) {
                // Cabo, Corridor, San Jose, East Cape have Whales
                if (['cabo-san-lucas', 'san-jose-del-cabo', 'tourist-corridor', 'east-cape'].includes(zoneId)) {
                  seasonBadge = "🐳 Whale Watching";
                }
              } else if (item.month === 'Nov') {
                if (['la-paz', 'east-cape'].includes(zoneId)) {
                  seasonBadge = "🦈 Whale Sharks";
                }
              } else if (item.month === 'Oct') {
                if (['cabo-san-lucas', 'los-barriles', 'east-cape'].includes(zoneId)) {
                  seasonBadge = "🎣 Sport Fishing";
                }
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
                      <span className="text-[9px] uppercase font-mono font-bold tracking-tight text-emerald-800 bg-emerald-50/70 border border-emerald-100/80 px-2.5 py-1 rounded block text-center">
                        {seasonBadge}
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase font-mono font-bold tracking-tight text-teal-800 bg-teal-50/50 border border-teal-100/30 px-2.5 py-1 rounded block text-center">
                        {item.climate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 8 — REVIEWS ================= */}
      <section className="py-16 bg-white" id="zone-reviews">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block">
              GUEST EXPERIENCES
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
              Testimonials from {zoneName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeZone.reviews.map((review, idx) => (
              <div 
                key={idx}
                className="bg-[#fdfbf7]/40 border border-gray-150 p-6 rounded-2xl flex flex-col justify-between space-y-5 hover:shadow-xs transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-[#1B3A5B] leading-tight select-none">
                      "{review.title}"
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium">
                      {review.text}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm shadow-xs border border-gray-200">
                    {review.avatar}
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#1B3A5B] block">{review.author}</span>
                    <span className="text-[10px] text-gray-400 font-mono font-semibold uppercase">{review.date} · Verified Guide</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 9 — FAQs ================= */}
      <section className="py-16 md:py-20 bg-[#FAF7F0]/30 border-t border-gray-200/40" id="zone-faqs">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
              Common Questions about {zoneName}
            </h2>
          </div>

          <div className="space-y-3">
            {activeZone.faqs.map((faq, idx) => {
              const isOpen = openedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-gray-150 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    onClick={() => setOpenedFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left font-sans font-extrabold text-sm text-[#1B3A5B] hover:text-[#2E8B8B] transition cursor-pointer select-none"
                  >
                    <span>{replaceLosCabos(faq.q)}</span>
                    <HelpCircle className={`w-4 h-4 shrink-0 transition text-gray-400 ${isOpen ? 'rotate-180 text-[#2E8B8B]' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden border-t border-gray-50"
                      >
                        <div className="p-5 text-xs md:text-sm text-gray-600 leading-relaxed font-sans bg-gray-50/50">
                          {replaceLosCabos(faq.a)}
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

      {/* ================= SECTION 10 — NEWSLETTER ================= */}
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

      {/* ================= SECTION 11 — BLOG / TRAVEL GUIDES ================= */}
      <section className="py-16 md:py-20 bg-white" id="zone-blog">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">
                INSIDER WISDOM
              </span>
              <h2 className="text-3xl font-extrabold text-[#1B3A5B] tracking-tight">
                Travel Guides for {zoneName}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogsListies.map((blog) => (
              <div 
                key={blog.id}
                onClick={() => setActiveBlogArticle(blog.id)}
                className="group cursor-pointer bg-[#fdfbf7]/40 border border-gray-150 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-44 overflow-hidden bg-gray-50">
                    <img 
                      src={blog.photo} 
                      alt={replaceLosCabos(blog.title)} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                      loading="lazy"
                    />
                  </div>

                  <div className="px-5 pb-5 space-y-2.5 text-left">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 font-mono">
                      <span>{blog.date}</span>
                      <span>·</span>
                      <span className="text-[#2E8B8B]">{blog.readingTime}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug tracking-tight">
                      {replaceLosCabos(blog.title)}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 select-none">
                      {replaceLosCabos(blog.synopsis)}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-gray-50 select-none bg-gray-50/20 text-xs font-black text-[#1B3A5B] uppercase flex items-center justify-between">
                  <span>Read Guide</span>
                  <span className="group-hover:translate-x-0.5 transition">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Article Reader Modal */}
      {activeBlogArticle !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" id="zone-blog-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-5 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveBlogArticle(null)}
              className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-[#1B3A5B] rounded-full border border-gray-200 flex items-center justify-center cursor-pointer transition select-none"
            >
              close
            </button>

            <span className="text-[10px] text-[#2E8B8B] font-mono font-bold uppercase tracking-wider block bg-teal-50 px-2.5 py-1 rounded w-fit select-none">
              {blogsListies[activeBlogArticle].readingTime} · {blogsListies[activeBlogArticle].date}
            </span>

            <h2 className="text-xl md:text-2xl font-sans font-black text-[#1B3A5B] leading-tight select-none">
              {replaceLosCabos(blogsListies[activeBlogArticle].title)}
            </h2>

            <div className="rounded-2xl overflow-hidden h-40 bg-gray-50">
              <img 
                src={blogsListies[activeBlogArticle].photo} 
                alt={replaceLosCabos(blogsListies[activeBlogArticle].title)} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line font-medium font-sans select-none">
              {replaceLosCabos(blogsListies[activeBlogArticle].fullContent)}
            </p>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#1B3A5B] select-none">Written by What's in Cabo Resident Editors</span>
              <button
                onClick={() => setActiveBlogArticle(null)}
                className="bg-[#1B3A5B] hover:bg-[#20456c] text-[#C9A961] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition cursor-pointer active:scale-95"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
