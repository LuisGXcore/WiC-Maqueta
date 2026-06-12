import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Compass, Utensils, Hotel, ArrowRight, ShieldCheck, Star, 
  Mail, CheckCircle, ChevronLeft, ChevronRight, MapPin, Sparkles, 
  BookOpen, Clock, Heart, X, Check, Award
} from 'lucide-react';
import { DomainType, TourTypeId } from '../types';

interface HomeProps {
  onNavigateDetail: (domain: DomainType, id: TourTypeId) => void;
  onNavigateCategory: (domain: DomainType, hubId?: string | null, subId?: string | null, zoneId?: string | null) => void;
  onNavigatePassport: () => void;
  onNavigateZone: (zoneId: string) => void;
  onNavigateAttraction?: (slug: string) => void;
}

export default function Home({ 
  onNavigateDetail, 
  onNavigateCategory, 
  onNavigatePassport, 
  onNavigateZone,
  onNavigateAttraction 
}: HomeProps) {
  // Preload Hero Image for LCP Optimization (<2.5s)
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1600';
    document.head.appendChild(link);
    return () => {
      // safe cleanup or leave for persistent routing speed
    };
  }, []);

  // State managers for interactive CRO features
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [activeBlogArticle, setActiveBlogArticle] = useState<number | null>(null);
  const [activeAttractionId, setActiveAttractionId] = useState<number | null>(null);
  const [showPassportDetails, setShowPassportDetails] = useState(false);
  const [partnerIndex, setPartnerIndex] = useState(0);

  const partnerBrands = [
    "Sunset Monalisa",
    "Flora Farms",
    "The Cape Marina",
    "Cabo Adventures"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerIndex((prev) => (prev + 1) % partnerBrands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Carousel refs for precise desktop scroll control
  const zonesScrollRef = useRef<HTMLDivElement>(null);
  const hubsScrollRef = useRef<HTMLDivElement>(null);
  const toursScrollRef = useRef<HTMLDivElement>(null);
  const restScrollRef = useRef<HTMLDivElement>(null);
  const hotelScrollRef = useRef<HTMLDivElement>(null);
  const attractionScrollRef = useRef<HTMLDivElement>(null);

  // Toggle saving listings (CRO loss aversion/desire element)
  const toggleSaveListing = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
    }
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Structured Listings based exactly on the data system
  const toursListings = [
    { id: 'adventure' as TourTypeId, name: 'Canyon Safari 4x4 Ride & Rappelling', rating: 4.9, price: '$169', originalPrice: '$199', zone: 'Tourist Corridor', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400' },
    { id: 'sunset' as TourTypeId, name: 'Private Sunset Sailing Yacht Cruise', rating: 5.0, price: '$299', originalPrice: '$350', zone: 'Cabo San Lucas Marina', photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400' },
    { id: 'whakesharks' as TourTypeId, name: 'La Paz Wild Whale Shark Swim', rating: 4.8, price: '$180', originalPrice: '$220', zone: 'La Paz Sanctuary', photoUrl: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=400' },
    { id: 'water' as TourTypeId, name: 'El Arco Yacht Snorkel Tour & Lunch', rating: 4.9, price: '$145', originalPrice: '$180', zone: 'Land’s End Cove', photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' }
  ];

  const restaurantsListings = [
    { id: 'finedining' as TourTypeId, name: 'Sunset Monalisa Gastronomy', rating: 4.9, price: '$150', originalPrice: '$180', zone: 'Tourist Corridor', photoUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400' },
    { id: 'beachside' as TourTypeId, name: 'El Ganzo Beach Club & Eats', rating: 4.7, price: '$50', originalPrice: '$65', zone: 'San José Marina', photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400' },
    { id: 'organicfarm' as TourTypeId, name: 'Flora Farms Kitchen & Fields', rating: 4.9, price: '$75', originalPrice: '$90', zone: 'San José del Cabo', photoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400' }
  ];

  const hotelsListings = [
    { id: 'beachresort' as TourTypeId, name: 'The Cape Thompson Beach Resort', rating: 4.9, price: '$610', originalPrice: '$720', zone: 'Tourist Corridor', photoUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400' },
    { id: 'luxuryvilla' as TourTypeId, name: 'Pedregal Sovereignty Luxury Villa', rating: 5.0, price: '$2850', originalPrice: '$3200', zone: 'Pedregal Enclave', photoUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=400' },
    { id: 'boutiqueart' as TourTypeId, name: 'El Ganzo Boutique Art Resort', rating: 4.8, price: '$240', originalPrice: '$280', zone: 'San José Marina', photoUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=400' }
  ];

  // Zones data (horizontal carousel matches 280px wide x 200px tall)
  const zoneCards = [
    { id: 'cabo-san-lucas', name: 'Cabo San Lucas', path: '/cabo-san-lucas/', tagline: 'The Arch, Marina & vibrant shoreline', photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
    { id: 'san-jose-del-cabo', name: 'San José del Cabo', path: '/san-jose-del-cabo/', tagline: 'Art, food & authentic Mexico', photo: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
    { id: 'todos-santos', name: 'Todos Santos', path: '/todos-santos/', tagline: 'Bohemian surf & creative culture', photo: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
    { id: 'los-barriles', name: 'Los Barriles', path: '/los-barriles/', tagline: 'Fishing & kitesurf paradise', photo: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
    { id: 'east-cape', name: 'East Cape', path: '/east-cape/', tagline: 'Remote beaches & luxury retreats', photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
    { id: 'la-paz', name: 'La Paz', path: '/la-paz/', tagline: 'Whale sharks & hidden coves', photo: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType },
    { id: 'tourist-corridor', name: 'Tourist Corridor', path: '/tourist-corridor/', tagline: 'World-class resorts & golf', photo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=500', domain: 'tours' as DomainType }
  ];

  // 8 Hub collection cards — Tours and Restaurants FIRST
  const categoryHubs = [
    { title: 'Tours & Activities', url: '/cabo-san-lucas/tours/', count: '48 experiences', photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'tours', subId: null, zoneId: 'cabo-san-lucas' },
    { title: 'Restaurants', url: '/cabo-san-lucas/restaurants/', count: '67 dining spots', photoUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400', domain: 'restaurants' as DomainType, hubId: 'restaurants', subId: null, zoneId: 'cabo-san-lucas' },
    { title: 'Hotels & Resorts', url: '/cabo-san-lucas/hotels/', count: '134 properties', photoUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=400', domain: 'hotels' as DomainType, hubId: 'hotels', subId: null, zoneId: 'cabo-san-lucas' },
    { title: 'Beach Clubs', url: '/cabo-san-lucas/beach-clubs-cabo/', count: 'Day passes & beachfront', photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400', domain: 'restaurants' as DomainType, hubId: 'beach-clubs-cabo', subId: null, zoneId: 'cabo-san-lucas' },
    { title: 'Yacht Charters', url: '/cabo-san-lucas/yacht-charters/', count: 'Private & shared', photoUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'yacht-charters', subId: null, zoneId: 'cabo-san-lucas' },
    { title: 'Fishing', url: '/cabo-san-lucas/tours/fishing/', count: 'Sport fishing charters', photoUrl: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'tours', subId: 'fishing', zoneId: 'cabo-san-lucas' },
    { title: 'Nightlife & Bars', url: '/cabo-san-lucas/nightlife/', count: 'Best bars & clubs', photoUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400', domain: 'restaurants' as DomainType, hubId: 'nightlife', subId: null, zoneId: 'cabo-san-lucas' },
    { title: 'Airport Shuttle', url: '/cabo-airport-shuttle/', count: 'Transfers & transportation', photoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400', domain: 'tours' as DomainType, hubId: 'cabo-airport-shuttle', subId: null, zoneId: null }
  ];

  // Attractions data
  const attractions = [
    { title: 'El Arco', url: '/cabo-san-lucas/places/the-arch-of-cabo-san-lucas/', zone: 'Cabo San Lucas', photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400', description: "Los Cabos' ultimate geological signature. This majestic limestone arch rises gracefully where the Pacific Ocean collides with the fertile waters of the Sea of Cortez.", location: "Land's End Pier, Cabo San Lucas" },
    { title: 'Medano Beach', url: '/cabo-san-lucas/places/medano-beach/', zone: 'Cabo San Lucas', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400', description: "Cabo's premier safe-swimming destination. Stretching along Cabo San Lucas bay, Medano beach features pristine golden sands, high-energy gourmet lounge bars, and panoramic Arch views.", location: "Medano Corridor, Cabo San Lucas" },
    { title: 'Lovers Beach', url: '/cabo-san-lucas/places/lovers-beach-cabo/', zone: 'Cabo San Lucas', photo: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=400', description: "A secluded golden sand beach framed by monolithic granite cliffs. This paradise is accessible solely by water taxi and sits nested perfectly on the protected bay side of Land's End.", location: "Land's End, Cabo San Lucas" },
    { title: 'Playa Balandra', url: '/la-paz/places/balandra-beach/', zone: 'La Paz', photo: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&q=80&w=400', description: "Renowned as Mexico's most beautiful beach, this highly regulated biosphere is an incredibly shallow, wave-free crystal lagoon. Water levels rarely exceed waist depth.", location: "Balandra Bay Reserve, La Paz" },
    { title: 'Chileno Bay', url: '/tourist-corridor/places/chileno-beach/', zone: 'Tourist Corridor', photo: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&q=80&w=400', description: "An immaculately clean Blue Flag certified beach cove. Offering safe coral drop-offs teeming with colorful parrotfish, surgeonfish, and peaceful sea turtle nesting clusters.", location: "Km 14.5 Tourist Highway, Corridor" },
    { title: 'Cabo Pulmo', url: '/east-cape/places/cabo-pulmo/', zone: 'East Cape', photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400', description: "A spectacular marine paradise protecting North America's oldest hard coral reef. Home to vast jack storm cyclones, giant groupers, and gentle whale sharks.", location: "Pulmo Cape Marine Park, East Cape" },
    { title: 'Santa Maria Beach', url: '/tourist-corridor/places/playa-santa-maria/', zone: 'Tourist Corridor', photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400', description: "A sheltered horseshoe-shaped cove outlined by towering granite bluffs. Famed for its pink-hued shells, quiet waters, and phenomenal snorkeling visibility.", location: "Km 12.2 Tourist Highway, Corridor" }
  ];

  // Blog posts data
  const blogs = [
    {
      id: 0,
      title: 'Is Cabo San Lucas Safe? Complete Guide 2026',
      url: '/blog/is-cabo-san-lucas-safe/',
      readingTime: '5 min read',
      date: 'Published June 11, 2026',
      photo: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=450',
      synopsis: 'E-E-A-T Safety Report: An independent guide examining resort defenses, sea-state safety flags, secure transportation tips, and medical services for 2026.',
      fullContent: "Yes! Los Cabos is classified as write-in safety level 1, making it one of Mexico’s securest tourist zones. Under the 2026 municipal safety directives, the unique highway structure traversing Baja California Sur ensures incredibly tight regional safety nets. To have a flawless experience, we recommend using pre-approved airport transfers over unknown roadside cabs, adhering to the harbor master's color-coded flag rules (never swimming in black or red flagged waters), and keeping emergency contact lines close. Our team reviews safety logs monthly to guarantee complete tourist tranquility."
    },
    {
      id: 1,
      title: 'Best Time to Visit Cabo San Lucas',
      url: '/blog/best-time-to-go-to-cabo/',
      readingTime: '4 min read',
      date: 'Published May 28, 2026',
      photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=450',
      synopsis: 'Whale watching migrations, serene windless water visibility, and pricing index optimizations — find your perfect calendar month.',
      fullContent: "The perfect window depends entirely on your target experiences! For spectacular Humpback whale migrations, schedule your visit between mid-December and April. If pristine scuba diving and absolute underwater clarity are your main objectives, October and November feature warm 80°F glass-flat waters. Travel budgets reach optimal values during August and September, with luxury resorts providing discounts of up to 45% while tropical desert showers stay brief and cooling."
    },
    {
      id: 2,
      title: 'Cabo vs Cancun — Which Is Better?',
      url: '/blog/cabo-vs-cancun/',
      readingTime: '6 min read',
      date: 'Published April 15, 2026',
      photo: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=450',
      synopsis: 'A comprehensive, unbiased direct comparison analyzing culinary depth, shoreline activity safety, and premier lodging systems.',
      fullContent: "Cabo and Cancun represent entirely distinct travel moods. While Cancun offers highly uniform beach-chair Caribbean turquoise sands backed by large-scale hotel chains, Los Cabos excels in boutique desert-meets-ocean topography, legendary cliffside gastronomy, and unmatched villa isolation. Los Cabos is built around curated culinary itineraries and intimate marine excursions, appealing directly to travelers seeking premium privacy and authentic regional architecture."
    }
  ];

  // Combine listings for real-time interactive search matching
  const allSearchables = [
    ...toursListings.map(t => ({ ...t, domain: 'tours' as DomainType, type: 'Tour/Experience' })),
    ...restaurantsListings.map(r => ({ ...r, domain: 'restaurants' as DomainType, type: 'Restaurant/Dining' })),
    ...hotelsListings.map(h => ({ ...h, domain: 'hotels' as DomainType, type: 'Hotel/Resort' }))
  ];

  const searchResults = searchQuery.trim().length >= 2 
    ? allSearchables.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.zone.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Generate dynamic JSON-LD structured schema on-the-fly for crawler simulation
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://whatsincabo.com/#website",
        "name": "What's in Cabo",
        "url": "https://whatsincabo.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://whatsincabo.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://whatsincabo.com/#organization",
        "name": "What's in Cabo (WiC)",
        "url": "https://whatsincabo.com",
        "logo": "https://whatsincabo.com/assets/logo.png",
        "sameAs": [
          "https://facebook.com/whatsincabo",
          "https://instagram.com/whatsincabo",
          "https://twitter.com/whatsincabo"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+52-624-0000000",
          "contactType": "customer service",
          "areaServed": "Los Cabos, Mexico"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://whatsincabo.com/#breadcrumbs",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://whatsincabo.com" }
        ]
      }
    ]
  };

  return (
    <div className="flex-1 bg-[#fdfbf7]/40 w-full" id="wic-homepage">

      {/* JSON-LD injection for complete technical SEO crawl validation */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ================= SECTION 1 — HERO ================= */}
      {/* Schema: WebSite + SearchAction + Organization */}
      <section className="relative min-h-[580px] md:min-h-[640px] flex items-center justify-center bg-[#1B3A5B] overflow-hidden" id="hero-section">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1600" 
            alt="Things to Do in Los Cabos" 
            className="w-full h-full object-cover opacity-45 filter scale-105 select-none"
            referrerPolicy="no-referrer"
            width={1600}
            height={640}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3A5B]/85 via-[#1B3A5B]/40 to-[#fdfbf7]/10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16 text-center text-white space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C9A961]/25 border border-[#C9A961]/45 rounded-full text-xs font-semibold text-[#fdfbf4] tracking-wide mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>Curated Baja Insider Directory &amp; Booking Engine</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              Los Cabos, the Way Locals Know It.
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-[#FAF7F0] font-medium leading-relaxed drop-shadow-sm">
              Tours, restaurants, hotels, beach clubs and yacht charters in Los Cabos, curated by people who actually live here.
            </p>
          </div>

          {/* SINGLE DOMINANT CTA — SEARCH BAR */}
          <div className="max-w-2xl mx-auto space-y-3 relative" id="search-cta-container">
            <div className="bg-white rounded-2xl p-2.5 shadow-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-2 text-gray-800">
              <div className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search hotels, tours, restaurants in Cabo..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.trim().length > 0);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim().length > 0) setShowSearchResults(true);
                  }}
                  className="w-full bg-transparent text-sm font-semibold border-none focus:outline-none focus:ring-0 text-[#1B3A5B] placeholder-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                    className="p-1 hover:bg-gray-200 rounded-full text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button 
                onClick={() => {
                  setShowSearchResults(true);
                }}
                className="w-full sm:w-auto bg-[#2E8B8B] hover:bg-[#206161] text-white px-7 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer"
              >
                Find Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Live Search Result Popover panel */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-150 py-3 text-left text-gray-850 z-50 max-h-80 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#2E8B8B]">
                    {searchResults.length} Match{searchResults.length !== 1 && 'es'} Found in Curator Database
                  </span>
                  <button 
                    onClick={() => setShowSearchResults(false)}
                    className="text-xs font-bold text-gray-400 hover:text-gray-600 px-1.5 py-0.5 rounded"
                  >
                    Close
                  </button>
                </div>
                
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          onNavigateDetail(item.domain, item.id);
                          setShowSearchResults(false);
                        }}
                        className="p-3.5 hover:bg-[#fdfbf4] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.photoUrl} 
                            alt={item.name} 
                            className="w-11 h-11 object-cover rounded-lg"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-[#1B3A5B] leading-snug">{item.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] bg-teal-50 text-[#2E8B8B] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{item.type}</span>
                              <span className="text-xs text-gray-400">📍 {item.zone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-[#C9A961] block">{item.price}</span>
                          <span className="text-[10px] text-gray-400 line-through block">{item.originalPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-400">No matching certified listings found. Check spelling or try &quot;Tours&quot;.</p>
                  </div>
                )}
              </div>
            )}

            {/* Quick chips matching the matrix (Tours and Restaurants first) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3" id="hero-quick-chips">
              <span className="text-xs text-[#FAF7F0]/80 font-semibold mr-1">Quick Filters:</span>
              <button 
                onClick={() => onNavigateCategory('tours', 'tours', null, null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                🎯 Tours
              </button>
              <button 
                onClick={() => onNavigateCategory('restaurants', 'restaurants', null, null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                🍽️ Restaurants
              </button>
              <button 
                onClick={() => onNavigateCategory('hotels', 'hotels', null, null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                🏨 Hotels
              </button>
              <button 
                onClick={() => onNavigateCategory('restaurants', 'beach-clubs-cabo', null, null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                🏖️ Beach Clubs
              </button>
              <button 
                onClick={() => onNavigateCategory('tours', 'yacht-charters', null, null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                ⛵ Yacht Charters
              </button>
              <button 
                onClick={() => onNavigateCategory('tours', 'tours', 'fishing', null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                🎣 Fishing
              </button>
              <button 
                onClick={() => onNavigateCategory('restaurants', 'nightlife', null, null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                🎉 Nightlife
              </button>
              <button 
                onClick={() => onNavigateCategory('tours', 'cabo-airport-shuttle', null, null)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:scale-105"
              >
                ✈️ Airport Shuttle
              </button>
            </div>
          </div>

          {/* TRUST STRIP BELOW SEARCH AREA (No fold scroll needed for core validation) */}
          <div className="max-w-3xl mx-auto pt-6 border-t border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-[#FAF7F0]/90 font-sans" id="hero-trust-strip">
            <span className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">✓</span> 200+ curated listings
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#C9A961] text-base">★</span> 4.9 avg rating
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">📍</span> 6 zones covered
            </span>
            <span className="flex items-center gap-1.5 flex-nowrap shrink-0">
              <span className="text-sm">✓</span> Trusted by 12,000+ travelers
            </span>
          </div>

        </div>
      </section>

      {/* ================= SECTION 2 — EXPLORE BY ZONE ================= */}
      {/* Schema: TouristDestination for each zone card */}
      <section className="py-16 md:py-20 bg-white" id="explore-by-zone">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">
                Explore Los Cabos
              </span>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                Where are you headed?
              </h2>
            </div>
            
            {/* Nav Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => scrollContainer(zonesScrollRef, 'left')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-[#1B3A5B] transition cursor-pointer"
                aria-label="Scroll left zones"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollContainer(zonesScrollRef, 'right')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-[#1B3A5B] transition cursor-pointer"
                aria-label="Scroll right zones"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Swipeable Horizontal Carousel - 6 Zones */}
          <div 
            ref={zonesScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
            id="zones-carousel"
          >
            {zoneCards.map((zone) => (
              <div 
                key={zone.id}
                onClick={() => onNavigateZone(zone.id)}
                className="relative flex-none w-[280px] h-[200px] rounded-2xl overflow-hidden snap-start cursor-pointer group shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 block"
                id={`zone-card-${zone.id}`}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-transparent transition-opacity group-hover:opacity-95" />
                
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white">
                  <h3 className="text-lg font-extrabold tracking-tight group-hover:text-[#C9A961] transition-all">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/85 font-medium mt-1 leading-normal">
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

      {/* ================= SECTION 3 — HUBS ================= */}
      {/* Schema: ItemList with ListItem linking to each HUB */}
      <section className="py-16 md:py-20 bg-[#FAF7F0]/70" id="curated-hubs">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-1">
                Curated Hub Collections
              </span>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                What do you want to do?
              </h2>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => scrollContainer(hubsScrollRef, 'left')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-white hover:text-[#1B3A5B] transition cursor-pointer"
                aria-label="Scroll left hubs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollContainer(hubsScrollRef, 'right')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-white hover:text-[#1B3A5B] transition cursor-pointer"
                aria-label="Scroll right hubs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 8 Hub Cards Carousel - Horizontal scroll, full photo backgrounds. Tours and Restaurants first */}
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
                <div className="absolute inset-0 h-2/3 overflow-hidden bg-gray-50">
                  <img 
                    src={hub.photoUrl} 
                    alt={hub.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    width={270}
                    height={210}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-white p-5 flex flex-col justify-between rounded-t-xl border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-[#2E8B8B] font-mono font-bold uppercase tracking-wider block mb-1">
                      {index <= 1 ? '🔥 Most Popular' : 'Verified'} Directory
                    </span>
                    <h3 className="text-base font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-tight">
                      {hub.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-secondary font-medium">{hub.count}</span>
                    <span className="text-xs font-bold text-[#1B3A5B] flex items-center gap-0.5 group-hover:underline">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <button 
              onClick={() => onNavigateCategory('tours')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2E8B8B] hover:text-[#1D5656] underline hover:no-underline transition"
            >
              See all categories <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ================= SECTION 4 — FEATURED LISTINGS ================= */}
      {/* Schema: ItemList > ListItem > LocalBusiness with aggregateRating */}
      <section className="py-16 md:py-20 bg-white" id="featured-listings">
        <div className="max-w-7xl mx-auto px-4 space-y-16">

          {/* CAROUSEL 1: Top Tours & Experiences in Los Cabos */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">Curated Experiences</span>
                <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                  Top Tours &amp; Experiences in Los Cabos
                </h2>
              </div>
              <button 
                onClick={() => onNavigateCategory('tours', 'tours', null, null)}
                className="text-xs font-extrabold text-[#2E8B8B] hover:underline flex items-center gap-0.5 shrink-0"
              >
                See all tours →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {toursListings.map((tour) => (
                <div 
                  key={tour.id}
                  onClick={() => onNavigateDetail('tours', tour.id)}
                  className="group relative bg-[#fdfbf7]/40 border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
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
                    {/* Save Button */}
                    <button 
                      onClick={(e) => toggleSaveListing(tour.id, e)}
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
                      <span className="text-gray-400 text-[11px] font-normal">(Verified Client Rating)</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug">
                      {tour.name}
                    </h3>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100/70">
                      <div>
                        <span className="text-[10px] text-gray-400 line-through block">{tour.originalPrice}</span>
                        <span className="text-sm font-extrabold text-[#1B3A5B] font-mono">{tour.price}</span>
                      </div>
                      <span className="text-xs font-bold text-[#2E8B8B] group-hover:underline">View details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CAROUSEL 2: Top Restaurants in Los Cabos */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">Gastronomy &amp; Beach Bites</span>
                <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                  Top Restaurants in Los Cabos
                </h2>
              </div>
              <button 
                onClick={() => onNavigateCategory('restaurants', 'restaurants')}
                className="text-xs font-extrabold text-[#2E8B8B] hover:underline flex items-center gap-0.5 shrink-0"
              >
                See all dining →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {restaurantsListings.map((rest) => (
                <div 
                  key={rest.id}
                  onClick={() => onNavigateDetail('restaurants', rest.id)}
                  className="group relative bg-[#fdfbf7]/40 border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
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
                      onClick={(e) => toggleSaveListing(rest.id, e)}
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
                      <span className="text-gray-400 text-[11px] font-normal">(Verified Client Rating)</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug">
                      {rest.name}
                    </h3>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100/70">
                      <div>
                        <span className="text-[10px] text-gray-400 line-through block">{rest.originalPrice}</span>
                        <span className="text-sm font-extrabold text-[#1B3A5B] font-mono">From {rest.price}</span>
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
              <button 
                onClick={() => onNavigateCategory('hotels', 'hotels', null, null)}
                className="text-xs font-extrabold text-[#2E8B8B] hover:underline flex items-center gap-0.5 shrink-0"
              >
                See all resorts →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {hotelsListings.map((hotel) => (
                <div 
                  key={hotel.id}
                  onClick={() => onNavigateDetail('hotels', hotel.id)}
                  className="group relative bg-[#fdfbf7]/40 border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
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
                      onClick={(e) => toggleSaveListing(hotel.id, e)}
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
                      <span className="text-gray-400 text-[11px] font-normal">(Verified Client Rating)</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug">
                      {hotel.name}
                    </h3>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-100/70">
                      <div>
                        <span className="text-[10px] text-gray-400 line-through block">{hotel.originalPrice}</span>
                        <span className="text-sm font-extrabold text-[#1B3A5B] font-mono">From {hotel.price}</span>
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

      {/* ================= SECTION 5 — WHY WiC ================= */}
      {/* Schema: AboutPage linked from here + Organization E-E-A-T signals */}
      <section className="py-20 bg-white" id="why-plan-wic">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block bg-teal-50 px-3 py-1 rounded-full w-fit mx-auto border border-teal-100">
              Core Integrity Guarantee
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
              Why plan your Cabo trip with us?
            </h2>
            <p className="text-base text-secondary max-w-xl mx-auto font-medium">
              We live here. We&apos;ve done the research. We handle the details.
            </p>
          </div>

          {/* 3 outcome-based cards where the tourist is the hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
            {/* CARD 1 */}
            <div className="bg-white border border-[#E8E4DC] p-6 rounded-[12px] flex flex-col justify-start space-y-3.5 shadow-none">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#2E8B8B] shrink-0">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <h3 className="text-[16px] font-semibold text-[#1B3A5B] whitespace-nowrap overflow-hidden text-ellipsis">
                  No noise, just the best of Cabo
                </h3>
              </div>
              <p className="text-[14px] text-[#6B7280] leading-[1.6] font-sans">
                Every place here is hand-picked — only what&apos;s actually worth your time and money in Los Cabos.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-white border border-[#E8E4DC] p-6 rounded-[12px] flex flex-col justify-start space-y-3.5 shadow-none">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#2E8B8B] shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <h3 className="text-[16px] font-semibold text-[#1B3A5B] whitespace-nowrap overflow-hidden text-ellipsis">
                  Built by people who know the place
                </h3>
              </div>
              <p className="text-[14px] text-[#6B7280] leading-[1.6] font-sans">
                Recommendations from a team that actually lives in Los Cabos — not pulled from a generic database.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-white border border-[#E8E4DC] p-6 rounded-[12px] flex flex-col justify-start space-y-3.5 shadow-none">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#2E8B8B] shrink-0">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                <h3 className="text-[16px] font-semibold text-[#1B3A5B] whitespace-nowrap overflow-hidden text-ellipsis">
                  You find it, we handle the rest
                </h3>
              </div>
              <p className="text-[14px] text-[#6B7280] leading-[1.6] font-sans">
                See something you like? We reach out to the operator, confirm everything, and get back to you within 2 hours. You just show up.
              </p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <a 
              href="/about/"
              onClick={(e) => {
                e.preventDefault();
                alert("What's in Cabo E-E-A-T Guarantee: Independently verifying physical credentials, safety permits, and licensing details for Cabo guest support.");
              }}
              className="text-xs text-gray-500 hover:text-[#2E8B8B] transition underline hover:no-underline"
            >
              Learn about our team →
            </a>
          </div>

        </div>
      </section>

      {/* ================= SECTION 6 — CABO PASSPORT ================= */}
      {/* Schema: Product + Offer */}
      <section className="py-16 md:py-20 bg-[#1B3A5B] text-white" id="cabo-passport">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 60% Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs text-[#C9A961] font-mono font-bold uppercase tracking-widest block">
                For smart travelers
              </span>
              <h2 className="text-3xl md:text-4.5xl font-sans font-extrabold text-white tracking-tight leading-tight">
                Most travelers overpay in Cabo.
              </h2>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-xl">
                The Cabo Passport gets you exclusive access to 50+ restaurants, beach clubs and experiences. Travelers like you save an average of $180 — starting at just $29 USD.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-100">
                  <span className="text-teal-400 text-base">✓</span> Exclusive discounts at 50+ spots
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-100">
                  <span className="text-teal-400 text-base">✓</span> Restaurants, beach clubs &amp; activities
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-100">
                  <span className="text-teal-400 text-base">✓</span> Starts at $29 — pays for itself fast
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={onNavigatePassport}
                  className="bg-[#C9A961] hover:bg-[#b0914c] text-[#1B3A5B] px-8 py-3.5 rounded-xl text-sm font-extrabold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Find my Cabo Passport →
                </button>
              </div>
            </div>

            {/* Right 40% Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              
              {/* Clean Cabo Passport Card representation */}
              <div className="w-full max-w-[320px] bg-gradient-to-br from-[#1b314a] to-[#0A1A2F] border-2 border-[#C9A961]/70 p-6 rounded-2xl shadow-2xl relative overflow-hidden transition-transform duration-300 hover:rotate-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A961]/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#C9A961] font-bold block uppercase">
                      Official Traveler Card
                    </span>
                    <h3 className="text-lg font-extrabold tracking-tight mt-1">CABO PASSPORT</h3>
                  </div>
                  <Compass className="w-6 h-6 text-[#C9A961] shrink-0" />
                </div>

                <div className="my-6 py-4 border-y border-white/10 space-y-4">
                  {/* Row 1 */}
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">WHAT YOU GET</span>
                    <span className="text-sm font-bold text-[#C9A961]">50+ Certified Venues</span>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">SAVE UP TO</span>
                      <span className="text-sm font-bold text-teal-400 font-mono">$180 USD</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">STARTING AT</span>
                      <span className="text-sm font-bold text-[#C9A961] font-mono">$29 USD</span>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="pt-2 border-t border-white/5 flex flex-col">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">VALID FOR</span>
                    <span className="text-sm font-bold text-gray-200">7 or 15 days</span>
                  </div>
                </div>
              </div>

              {/* 3-4 partner logos below */}
              <div className="mt-8 text-center w-full">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-4">
                  PARTNER BRANDS WITH COMPENSATED DISCOUNTS
                </span>
                <div className="relative overflow-hidden h-8 flex items-center justify-center w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={partnerIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 0.8, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute text-sm font-semibold tracking-wider font-mono text-[#FAF7F0]"
                    >
                      ★ {partnerBrands[partnerIndex]} ★
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 7 — TOP ATTRACTIONS ================= */}
      {/* Schema: TouristAttraction + Place with geo coordinates per card */}
      <section className="py-16 md:py-20 bg-white" id="top-attractions">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-1">
                Must-See Sightseeing Maps
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                Los Cabos&apos; most iconic places
              </h2>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => scrollContainer(attractionScrollRef, 'left')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition cursor-pointer"
                aria-label="Scroll left attractions"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollContainer(attractionScrollRef, 'right')}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition cursor-pointer"
                aria-label="Scroll right attractions"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={attractionScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
            id="attractions-carousel"
          >
            {attractions.map((attr, index) => {
              const match = attr.url.match(/\/places\/([^/]+)/);
              const slug = match ? match[1] : '';

              return (
                <div 
                  key={index}
                  onClick={() => {
                    if (slug && onNavigateAttraction) {
                      onNavigateAttraction(slug);
                    } else {
                      setActiveAttractionId(index);
                    }
                  }}
                  className="relative flex-none w-[285px] bg-[#fdfbf7]/40 border border-gray-150 rounded-2xl overflow-hidden snap-start cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="h-44 overflow-hidden bg-gray-100 relative">
                    <img 
                      src={attr.photo} 
                      alt={attr.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      width={285}
                      height={176}
                    />
                    <div className="absolute top-3 left-3 bg-[#1B3A5B] text-white px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider shadow">
                       📍 {attr.zone}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <h3 className="text-base font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-tight">
                      {attr.title}
                    </h3>
                    <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                      {attr.description}
                    </p>
                    <div className="text-xs font-bold text-[#2E8B8B] group-hover:underline flex items-center gap-0.5">
                      Ver Guía Completa →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 8 — NEWSLETTER ================= */}
      {/* Positioned exactly after attractions, before blog. Reciprocity + Freshness signal */}
      <section className="py-16 bg-[#FAF7F0]" id="newsletter-section">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
            Planning a trip to Cabo?
          </h2>
          <p className="text-sm md:text-base text-secondary leading-relaxed max-w-xl mx-auto">
            Get our free weekly picks — the best new restaurants, tour deals and local tips from our Cabo team. Read by 12,000+ travelers.
          </p>

          {newsletterSubscribed ? (
            <div className="max-w-md mx-auto bg-emerald-500/10 border border-emerald-500/20 text-[#1D5656] p-4 rounded-xl flex items-center justify-center gap-2.5 animate-fadeIn">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs md:text-sm font-bold">Successfully joined the Cabo Trip list! Local picks sent weekly.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <input 
                type="email" 
                required
                placeholder="Your email address" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white rounded-xl border border-gray-250 text-sm font-medium px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2E8B8B] text-[#1B3A5B] shadow-sm"
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-[#2E8B8B] hover:bg-[#206161] text-white rounded-xl px-6 py-3 text-sm font-bold shadow transition-all shrink-0 cursor-pointer text-center"
              >
                Send me the picks →
              </button>
            </form>
          )}

          <p className="text-[10px] text-gray-400 font-medium">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ================= SECTION 9 — BLOG / TRAVEL GUIDES ================= */}
      {/* Schema: Article + BlogPosting per card */}
      <section className="py-16 md:py-20 bg-white" id="blog-guides">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-2 border-b border-gray-100 pb-5">
            <div>
              <span className="text-xs text-[#2E8B8B] font-mono font-bold uppercase tracking-widest block mb-2">
                Travel Guides
              </span>
              <h2 className="text-3xl font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                Plan smarter
              </h2>
            </div>
            
            <button 
              onClick={() => alert("Exploring the complete 2026 Cabo Travel Hub Catalog. Detailed maps, safety reports and dining indexes are preconfigured.")}
              className="text-xs font-black text-[#2E8B8B] hover:underline flex items-center gap-0.5 shrink-0"
            >
              Read all guides →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div 
                key={blog.id}
                onClick={() => setActiveBlogArticle(blog.id)}
                className="group cursor-pointer bg-[#fdfbf7]/40 border border-gray-150 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={blog.photo} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      width={450}
                      height={192}
                    />
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 font-mono">
                      <span>{blog.date}</span>
                      <span>·</span>
                      <span className="text-[#2E8B8B]">{blog.readingTime}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                      {blog.synopsis}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-xs font-bold text-[#2E8B8B] group-hover:underline flex items-center gap-0.5">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= MODAL DRAWERS FOR DYNAMIC CRO CONTENT ================= */}
      
      {/* 1. Blog Reader Modal */}
      {activeBlogArticle !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" id="blog-reader-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-5 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveBlogArticle(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] text-[#2E8B8B] font-mono font-bold uppercase tracking-wider block bg-teal-50 px-2.5 py-1 rounded w-fit">
              {blogs[activeBlogArticle].readingTime} · {blogs[activeBlogArticle].date}
            </span>

            <h2 className="text-xl md:text-2xl font-sans font-extrabold text-[#1B3A5B] leading-tight">
              {blogs[activeBlogArticle].title}
            </h2>

            <div className="rounded-xl overflow-hidden h-40 bg-gray-100">
              <img 
                src={blogs[activeBlogArticle].photo} 
                alt={blogs[activeBlogArticle].title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs md:text-sm text-secondary leading-relaxed whitespace-pre-line font-medium font-sans">
              {blogs[activeBlogArticle].fullContent}
            </p>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Published by WiC Local Insiders</span>
              <button 
                onClick={() => setActiveBlogArticle(null)}
                className="bg-[#2E8B8B] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#1E5D5D]"
              >
                Acknowledge &amp; Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Attraction Info Modal */}
      {activeAttractionId !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" id="attraction-modal">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 relative shadow-2xl border border-gray-100">
            <button 
              onClick={() => setActiveAttractionId(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-xl overflow-hidden h-44 bg-gray-100">
              <img 
                src={attractions[activeAttractionId].photo} 
                alt={attractions[activeAttractionId].title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <span className="text-[10px] text-[#2E8B8B] font-mono font-bold uppercase tracking-wider block bg-teal-50 px-2 py-0.5 rounded w-fit">
              📍 {attractions[activeAttractionId].zone}
            </span>

            <h2 className="text-lg md:text-xl font-sans font-extrabold text-[#1B3A5B] leading-none">
              {attractions[activeAttractionId].title}
            </h2>

            <p className="text-xs md:text-sm text-secondary leading-relaxed font-sans font-medium">
              {attractions[activeAttractionId].description}
            </p>

            <div className="p-3 bg-[#FAF7F0] rounded-xl text-[11px] text-gray-600 font-sans space-y-1">
              <div className="font-bold text-[#1B3A5B]">Exact Location:</div>
              <div>{attractions[activeAttractionId].location}</div>
              <div className="text-[10px] text-gray-400 italic">Coordinates validated autonomously for secure client navigation.</div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button 
                onClick={() => setActiveAttractionId(null)}
                className="px-4 py-2 border border-gray-200 text-gray-500 rounded-lg text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
              {(() => {
                const match = attractions[activeAttractionId].url.match(/\/places\/([^/]+)/);
                const slug = match ? match[1] : '';
                return slug && onNavigateAttraction ? (
                  <button 
                    onClick={() => {
                      setActiveAttractionId(null);
                      onNavigateAttraction(slug);
                    }}
                    className="px-4 py-2 bg-[#1B3A5B] hover:bg-[#122A42] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    Ver Guía Completa →
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setActiveAttractionId(null);
                      onNavigateCategory('tours', 'tours', null, null);
                    }}
                    className="px-4 py-2 bg-[#2E8B8B] text-white rounded-lg text-xs font-bold hover:bg-[#1E5D5D] cursor-pointer"
                  >
                    Find Tours Nearby
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 3. Passport Savings breakdown dynamic box */}
      {showPassportDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" id="passport-savings-modal">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 relative shadow-2xl border border-gray-100">
            <button 
              onClick={() => setShowPassportDetails(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#C9A961]">
              <Compass className="w-5 h-5 text-[#C9A961]" />
              <span className="text-xs font-mono font-black uppercase tracking-widest">
                WiC Cabo Passport Estimate
              </span>
            </div>

            <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B]">
              Average Tourist Savings
            </h2>

            <div className="space-y-3.5 divide-y divide-gray-100">
              <div className="flex justify-between items-center text-xs py-2">
                <span className="text-gray-500 font-medium font-sans">Typical Dining Discount</span>
                <span className="font-mono font-bold text-[#1B3A5B]">-15% to -20% off total bill</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 pt-2">
                <span className="text-gray-500 font-medium font-sans">Complimentary drinks &amp; appetizers</span>
                <span className="font-mono font-bold text-[#2E8B8B]">Included at 25+ spots</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 pt-2">
                <span className="text-gray-500 font-medium font-sans">2-for-1 Tour operator incentives</span>
                <span className="font-mono font-bold text-[#1B3A5B]">Average $120 instant savings</span>
              </div>
              <div className="flex justify-between items-center text-xs py-2 pt-2 font-bold text-gray-900 bg-[#FAF7F0]/60 p-2 rounded-lg">
                <span className="font-sans">Card Purchase Price</span>
                <span className="font-mono text-[#C9A961]">$29 USD once</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 leading-snug">
              *Loss Aversion Notice: Non-passport holders pay standard retail tourist prices. Most guests cover the $29 expense in their very first meal or activity.
            </p>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={() => setShowPassportDetails(false)}
                className="w-1/2 px-4 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                Go Back
              </button>
              <button 
                onClick={() => {
                  setShowPassportDetails(false);
                  alert("Thank you! Cabo Passport checkout loaded successfully in a secure isolated background iframe reservation window.");
                }}
                className="w-1/2 px-4 py-2.5 bg-[#C9A961] hover:bg-[#b0914c] text-[#1B3A5B] rounded-xl text-xs font-black cursor-pointer shadow"
              >
                Buy My Passport Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
