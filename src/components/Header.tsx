import React, { useState, useEffect, useRef } from 'react';
import { Compass, Search, MapPin, Award, ShieldCheck, Home, Menu, X, ChevronDown, Utensils, Hotel, Map, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction';
  categoryHub?: string | null;
  onNavigate: (
    page: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction',
    zoneId?: string | null,
    hubId?: string | null,
    subId?: string | null,
    extraId?: string | null
  ) => void;
}

interface SearchableItem {
  name: string;
  page: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction';
  zoneId?: string | null;
  hubId?: string | null;
  subId?: string | null;
  extraId?: string | null;
  type: string;
}

const SEARCHABLE_ITEMS: SearchableItem[] = [
  // Destination Hubs (Zones)
  { name: 'Cabo San Lucas', page: 'zone', zoneId: 'cabo-san-lucas', type: 'Destination Hub' },
  { name: 'San José del Cabo', page: 'zone', zoneId: 'san-jose-del-cabo', type: 'Destination Hub' },
  { name: 'Tourist Corridor', page: 'zone', zoneId: 'tourist-corridor', type: 'Destination Hub' },
  { name: 'Todos Santos', page: 'zone', zoneId: 'todos-santos', type: 'Destination Hub' },
  { name: 'Los Barriles', page: 'zone', zoneId: 'los-barriles', type: 'Destination Hub' },
  { name: 'East Cape', page: 'zone', zoneId: 'east-cape', type: 'Destination Hub' },
  { name: 'La Paz', page: 'zone', zoneId: 'la-paz', type: 'Destination Hub' },

  // Tours & Experiences
  { name: 'Whale Watching Safari', page: 'category-list', hubId: 'tours', subId: 'whale-watching', type: 'Tour/Experience' },
  { name: 'Deep Sea Sportfishing', page: 'category-list', hubId: 'tours', subId: 'fishing', type: 'Tour/Experience' },
  { name: 'Snorkeling & Diving Reefs', page: 'category-list', hubId: 'tours', subId: 'snorkeling', type: 'Tour/Experience' },
  { name: 'Off-Road ATV Adventures', page: 'category-list', hubId: 'tours', subId: 'atv', type: 'Tour/Experience' },
  { name: 'Coastal Boat Cruises', page: 'category-list', hubId: 'tours', subId: 'boat-tours', type: 'Tour/Experience' },
  { name: 'Zipline Challenges', page: 'category-list', hubId: 'tours', subId: 'zipline', type: 'Tour/Experience' },
  { name: 'Whale Shark Swimming', page: 'category-list', hubId: 'tours', subId: 'whale-shark', type: 'Tour/Experience' },

  // Restaurants & Nightlife
  { name: 'Flora Farms Garden Kitchen', page: 'category-list', hubId: 'restaurants', subId: 'organic', type: 'Restaurant & Dining' },
  { name: 'El Farallon Cliffside Dining', page: 'category-list', hubId: 'restaurants', subId: 'fine-dining', type: 'Restaurant & Dining' },
  { name: 'Sunset Monalisa', page: 'category-list', hubId: 'restaurants', subId: 'fine-dining', type: 'Restaurant & Dining' },
  { name: 'Acre Restaurant & Cocktail', page: 'category-list', hubId: 'restaurants', subId: 'organic', type: 'Restaurant & Dining' },
  { name: 'Curated Restaurants & Dining', page: 'category-list', hubId: 'restaurants', type: 'Gastronomy Hub' },
  { name: 'Beach Clubs & Day Passes', page: 'category-list', hubId: 'beach-clubs-cabo', type: 'Beach Club Hub' },
  { name: 'Bars & Nightlife Guide', page: 'category-list', hubId: 'nightlife', type: 'Nightlife Finder' },

  // Lodging
  { name: 'Resorts & Hotels All-Inclusive', page: 'category-list', hubId: 'hotels', subId: 'all-inclusive', type: 'Luxury Lodging' },
  { name: 'Adults Only Resorts', page: 'category-list', hubId: 'hotels', subId: 'adults-only', type: 'Luxury Lodging' },
  { name: 'Boutique Hotspots & Design Stays', page: 'category-list', hubId: 'hotels', subId: 'boutique', type: 'Lodging Hub' },
  { name: 'Luxury Villas & Vacation Rentals', page: 'category-list', hubId: 'vacation-rentals', type: 'Lodging Hub' },

  // Shuttles & Packages
  { name: 'Cabo Airport Shuttle Transfers', page: 'category-list', hubId: 'cabo-airport-shuttle', type: 'Travel Services' },
  { name: 'Car Rentals Booking Hub', page: 'category-list', hubId: 'car-rentals', type: 'Travel Services' },
  { name: 'Championship Golf Courses', page: 'category-list', hubId: 'golf', type: 'Travel Services' },
  { name: 'Luxury Spas & Wellness', page: 'category-list', hubId: 'spas', type: 'Travel Services' },
  { name: 'Private Yacht Charters', page: 'category-list', hubId: 'yacht-charters', type: 'Travel Services' },
  { name: 'Cabo Passport Discount Program', page: 'cabo-passport', type: 'Direct Savings CTA' }
];

export default function Header({ currentPage, categoryHub, onNavigate }: HeaderProps) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection to add sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click to close search bar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const query = searchQuery.toLowerCase();
      const matches = SEARCHABLE_ITEMS.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      );
      setSearchResults(matches);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleMenuEnter = (item: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu(item);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const handleSearchSelect = (item: SearchableItem) => {
    onNavigate(item.page, item.zoneId, item.hubId, item.subId);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
    setIsMobileMenuOpen(false);
  };

  const toggleAccordion = (name: string) => {
    if (activeAccordion === name) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(name);
    }
  };

  const isHomepage = currentPage === 'home';

  return (
    <header 
      className={`relative w-full z-40 bg-[#fdfbf7] border-b border-gray-200/80 transition-all duration-300 ${
        isScrolled ? 'shadow-md shadow-gray-200/40 backdrop-blur-md bg-[#fdfbf7]/95' : ''
      }`} 
      id="wic-header-animate"
    >
      {/* Schema SiteNavigationElement structure in comment for search engine triggers */}
      {/* 
        @context: https://schema.org
        @type: SiteNavigationElement
        @id: #wic-header
        name: What's in Cabo Core Nav
        url: https://whatsincabo.com/
      */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* LEFT: Logo area */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition active:scale-98"
          id="header-logo"
        >
          <div className="bg-[#2E8B8B] text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-[#2E8B8B]/10">
            <Compass className="w-5 h-5 text-[#C9A961]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-lg md:text-xl font-sans text-[#2E8B8B] tracking-tight">
                WiC<span className="text-[#C9A961]">.</span> What's in Cabo
              </span>
            </div>
            <p className="text-[9px] text-[#1B3A5B]/60 font-black uppercase tracking-wider">
              Vetted Insider Directory
            </p>
          </div>
        </a>

        {/* CENTER: 4 Mega-Menus (Hick's Law - Grouped, Non-flat) */}
        <nav className="hidden lg:flex items-center gap-1.5 h-full" aria-label="Main Navigation">
          
          {/* Navigation Item 1: Things to Do */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMenuEnter('things')}
            onMouseLeave={handleMenuLeave}
          >
            <a 
              href="/tours/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('tours');
              }}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                currentPage === 'tours' || (currentPage === 'category-list' && categoryHub === 'tours')
                  ? 'text-[#2E8B8B] bg-gray-100/50' 
                  : 'text-[#1B3A5B] hover:text-[#2E8B8B] hover:bg-gray-150'
              }`}
            >
              <span>Things to Do</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C9A961] transition-transform duration-200 ${activeMegaMenu === 'things' ? 'rotate-180' : ''}`} />
            </a>

            {/* Things to Do Mega-Menu Dropdown */}
            {activeMegaMenu === 'things' && (
              <div 
                className="absolute top-14 left-1/2 -translate-x-[40%] w-[540px] bg-white border border-gray-200/70 shadow-xl rounded-2xl p-6 grid grid-cols-12 gap-6 animate-fade-in animate-slide-up"
                id="megamenu-things"
              >
                {/* Col 1: Tours & Activities */}
                <div className="col-span-6 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] border-b border-gray-100 pb-1 block">
                    Tours & Activities
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <a href="/tours/whale-watching/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'tours', 'whale-watching'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Whale Watching</a>
                    <a href="/tours/fishing/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'tours', 'fishing'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Fishing Charters</a>
                    <a href="/tours/boat-tours/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'tours', 'boat-tours'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Boat Tours</a>
                    <a href="/tours/snorkeling/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'tours', 'snorkeling'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Snorkeling</a>
                    <a href="/tours/atv/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'tours', 'atv'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">ATV Tours</a>
                    <a href="/tours/zipline/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'tours', 'zipline'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Zipline</a>
                    <a href="/tours/whale-shark/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'tours', 'whale-shark'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Whale Sharks</a>
                    <a href="/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours'); }} className="text-[#2E8B8B] hover:underline font-extrabold pt-1">See all tours →</a>
                  </div>
                </div>

                {/* Col 2: By Area */}
                <div className="col-span-6 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] border-b border-gray-100 pb-1 block">
                    By Area
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <a href="/cabo-san-lucas/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours', 'cabo-san-lucas'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Cabo San Lucas</a>
                    <a href="/san-jose-del-cabo/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours', 'san-jose-del-cabo'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">San José del Cabo</a>
                    <a href="/tourist-corridor/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours', 'tourist-corridor'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Tourist Corridor</a>
                    <a href="/todos-santos/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours', 'todos-santos'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Todos Santos</a>
                    <a href="/los-barriles/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours', 'los-barriles'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Los Barriles</a>
                    <a href="/east-cape/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours', 'east-cape'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">East Cape</a>
                    <a href="/la-paz/tours/" onClick={(e) => { e.preventDefault(); onNavigate('tours', 'la-paz'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">La Paz</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Item 2: Eat & Drink */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMenuEnter('eat')}
            onMouseLeave={handleMenuLeave}
          >
            <a 
              href="/restaurants/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category-list', null, 'restaurants');
              }}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                currentPage === 'category-list' && ['restaurants', 'beach-clubs-cabo', 'nightlife'].includes(categoryHub || '')
                  ? 'text-[#2E8B8B] bg-gray-100/50' 
                  : 'text-[#1B3A5B] hover:text-[#2E8B8B] hover:bg-gray-100/30'
              }`}
            >
              <span>Eat & Drink</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C9A961] transition-transform duration-200 ${activeMegaMenu === 'eat' ? 'rotate-180' : ''}`} />
            </a>

            {/* Eat & Drink Mega-Menu Dropdown */}
            {activeMegaMenu === 'eat' && (
              <div 
                className="absolute top-14 left-1/2 -translate-x-[40%] w-[520px] bg-white border border-gray-200/70 shadow-xl rounded-2xl p-6 grid grid-cols-12 gap-6 animate-fade-in animate-slide-up"
                id="megamenu-eat"
              >
                {/* Restaurants */}
                <div className="col-span-6 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] border-b border-gray-100 pb-1 block">
                    Curated Restaurants
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <a href="/restaurants/fine-dining/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'restaurants', 'fine-dining'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Fine Dining Classics</a>
                    <a href="/restaurants/oceanview/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'restaurants', 'ocean-view'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Oceanfront Views</a>
                    <a href="/restaurants/seafood/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'restaurants', 'seafood'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Baja Fresh Seafood</a>
                    <a href="/restaurants/mexican/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'restaurants', 'mexican'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Traditional Authentic</a>
                    <a href="/restaurants/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'restaurants'); }} className="text-[#2E8B8B] hover:underline font-extrabold pt-1">See all restaurants →</a>
                  </div>
                </div>

                {/* Nightlife and Beach Clubs */}
                <div className="col-span-6 space-y-5">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] block">
                      Nightlife & Bars
                    </span>
                    <a 
                      href="/nightlife/" 
                      onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'nightlife'); }}
                      className="group flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-[#2E8B8B]/40 hover:bg-[#fdfbf7] transition text-xs font-semibold text-[#1B3A5B]"
                    >
                      <span>Vetted Club & Bar Guide</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#C9A961] -rotate-90 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] block">
                      Beach Clubs
                    </span>
                    <a 
                      href="/beach-clubs-cabo/" 
                      onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'beach-clubs-cabo'); }}
                      className="group flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-[#2E8B8B]/40 hover:bg-[#fdfbf7] transition text-xs font-semibold text-[#1B3A5B]"
                    >
                      <span>Day Passes & Lounges</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#C9A961] -rotate-90 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Item 3: Stay */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMenuEnter('stay')}
            onMouseLeave={handleMenuLeave}
          >
            <a 
              href="/cabo-san-lucas/hotels/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category-list', null, 'hotels');
              }}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                currentPage === 'category-list' && ['hotels', 'vacation-rentals', 'vacation-packages'].includes(categoryHub || '')
                  ? 'text-[#2E8B8B] bg-gray-100/50' 
                  : 'text-[#1B3A5B] hover:text-[#2E8B8B] hover:bg-gray-150'
              }`}
            >
              <span>Stay</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C9A961] transition-transform duration-200 ${activeMegaMenu === 'stay' ? 'rotate-180' : ''}`} />
            </a>

            {/* Stay Mega-Menu Dropdown */}
            {activeMegaMenu === 'stay' && (
              <div 
                className="absolute top-14 left-1/2 -translate-x-[45%] w-[580px] bg-white border border-gray-200/70 shadow-xl rounded-2xl p-6 grid grid-cols-12 gap-6 animate-fade-in animate-slide-up"
                id="megamenu-stay"
              >
                {/* Hotels & Resorts */}
                <div className="col-span-6 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] border-b border-gray-100 pb-1 block">
                    Hotels & Resorts
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <a href="/hotels/all-inclusive/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'hotels', 'all-inclusive'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">All-Inclusive Coves</a>
                    <a href="/hotels/adults-only/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'hotels', 'adults-only'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Adults-Only Luxury</a>
                    <a href="/hotels/luxury-resort/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'hotels', 'resort'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Luxury Resorts</a>
                    <a href="/hotels/family-friendly/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'hotels', 'boutique'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Curated Boutique Hotels</a>
                  </div>
                </div>

                {/* Villas & Packages */}
                <div className="col-span-6 space-y-5">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] block">
                      Vacation Rentals & Villas
                    </span>
                    <div className="flex flex-col gap-2 text-xs">
                      <a href="/vacation-rentals/pedregal/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'vacation-rentals', 'pedregal'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Pedregal Estates</a>
                      <a href="/vacation-rentals/palmilla/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'vacation-rentals', 'palmilla'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Palmilla Coves</a>
                      <a href="/vacation-rentals/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'vacation-rentals'); }} className="text-[#2E8B8B] hover:underline font-extrabold transition">See all villas →</a>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <a 
                      href="/vacation-packages/" 
                      onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'vacation-packages'); }}
                      className="text-xs font-bold text-[#1B3A5B] hover:text-[#2E8B8B] flex items-center justify-between"
                    >
                      <span>Vacation Packages</span>
                      <span className="bg-[#C9A961]/10 text-[#856c38] px-2 py-0.5 rounded text-[9px] font-bold uppercase">Deals</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Item 4: Explore Cabo */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => handleMenuEnter('explore')}
            onMouseLeave={handleMenuLeave}
          >
            <a 
              href="/cabo-san-lucas/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('zone', 'cabo-san-lucas');
              }}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer select-none ${
                currentPage === 'zone'
                  ? 'text-[#2E8B8B] bg-gray-100/50' 
                  : 'text-[#1B3A5B] hover:text-[#2E8B8B] hover:bg-gray-150'
              }`}
            >
              <span>Explore Cabo</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#C9A961] transition-transform duration-200 ${activeMegaMenu === 'explore' ? 'rotate-180' : ''}`} />
            </a>

            {/* Explore Cabo Mega-Menu Dropdown */}
            {activeMegaMenu === 'explore' && (
              <div 
                className="absolute top-14 left-1/2 -translate-x-[60%] w-[760px] bg-white border border-gray-200/70 shadow-xl rounded-2xl p-6 grid grid-cols-12 gap-6 animate-fade-in animate-slide-up"
                id="megamenu-explore"
              >
                {/* Col 1: Destination Areas */}
                <div className="col-span-4 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] border-b border-gray-100 pb-1 block">
                    Baja Areas
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <a href="/cabo-san-lucas/" onClick={(e) => { e.preventDefault(); onNavigate('zone', 'cabo-san-lucas'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Cabo San Lucas</a>
                    <a href="/san-jose-del-cabo/" onClick={(e) => { e.preventDefault(); onNavigate('zone', 'san-jose-del-cabo'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">San José del Cabo</a>
                    <a href="/todos-santos/" onClick={(e) => { e.preventDefault(); onNavigate('zone', 'todos-santos'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Todos Santos</a>
                    <a href="/los-barriles/" onClick={(e) => { e.preventDefault(); onNavigate('zone', 'los-barriles'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Los Barriles</a>
                    <a href="/east-cape/" onClick={(e) => { e.preventDefault(); onNavigate('zone', 'east-cape'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">East Cape</a>
                    <a href="/la-paz/" onClick={(e) => { e.preventDefault(); onNavigate('zone', 'la-paz'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">La Paz</a>
                    <a href="/tourist-corridor/" onClick={(e) => { e.preventDefault(); onNavigate('zone', 'tourist-corridor'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Tourist Corridor</a>
                  </div>
                </div>

                {/* Col 2: Top Attractions */}
                <div className="col-span-4 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] border-b border-gray-100 pb-1 block">
                    Top Attractions
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <a href="/places/the-arch-of-cabo-san-lucas/" onClick={(e) => { e.preventDefault(); onNavigate('attraction', null, null, null, 'the-arch-of-cabo-san-lucas'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">El Arco (The Arch)</a>
                    <a href="/places/medano-beach/" onClick={(e) => { e.preventDefault(); onNavigate('attraction', null, null, null, 'medano-beach'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Medano Beach</a>
                    <a href="/places/balandra-beach/" onClick={(e) => { e.preventDefault(); onNavigate('attraction', null, null, null, 'balandra-beach'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Playa Balandra</a>
                    <a href="/places/cabo-pulmo/" onClick={(e) => { e.preventDefault(); onNavigate('attraction', null, null, null, 'cabo-pulmo'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Cabo Pulmo</a>
                    <a href="/places/lovers-beach-cabo/" onClick={(e) => { e.preventDefault(); onNavigate('attraction', null, null, null, 'lovers-beach-cabo'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Lovers Beach</a>
                    <a href="/places/playa-santa-maria/" onClick={(e) => { e.preventDefault(); onNavigate('attraction', null, null, null, 'playa-santa-maria'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Santa Maria Beach</a>
                    <a href="/places/chileno-beach/" onClick={(e) => { e.preventDefault(); onNavigate('attraction', null, null, null, 'chileno-beach'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Chileno Beach</a>
                  </div>
                </div>

                {/* Col 3: Services */}
                <div className="col-span-4 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2E8B8B] border-b border-gray-100 pb-1 block">
                    Travel Services
                  </span>
                  <div className="flex flex-col gap-2 text-xs">
                    <a href="/cabo-airport-shuttle/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'cabo-airport-shuttle'); }} className="text-gray-600 hover:text-[#2E8B8B] font-semibold transition flex items-center gap-1">Airport Shuttle <ExternalLink className="w-2.5 h-2.5" /></a>
                    <a href="/car-rentals/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'car-rentals'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Car Rentals</a>
                    <a href="/golf/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'golf'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Golf Courses</a>
                    <a href="/spas/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'spas'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Spas & Wellness</a>
                    <a href="/yacht-charters/" onClick={(e) => { e.preventDefault(); onNavigate('category-list', null, 'yacht-charters'); }} className="text-gray-600 hover:text-[#2E8B8B] font-medium transition">Yacht Charters</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT: Search & Standout Cabo Passport CTA */}
        <div className="flex items-center gap-2 md:gap-3.5 shrink-0">
          
          {/* SEARCH BAR CONDITIONAL RULE (Critical)
              Homepage does NOT show search in header.
              Every other page shows click-to-expand search. */}
          {!isHomepage && (
            <div className="relative" ref={searchContainerRef}>
              <div className="flex items-center">
                {showSearch ? (
                  <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 w-[205px] md:w-[260px] animate-fade-in animate-slide-left">
                    <Search className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search vetted experiences..."
                      autoFocus
                      className="ml-1.5 bg-transparent border-none text-xs text-[#1B3A5B] font-semibold focus:outline-none placeholder-gray-400 w-full"
                    />
                    <button 
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="hover:bg-gray-200 rounded-full p-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setShowSearch(true);
                    }}
                    className="p-2 transition rounded-full hover:bg-gray-150 cursor-pointer flex items-center justify-center text-[#1B3A5B] hover:text-[#2E8B8B] active:scale-95"
                    title="Search Directory"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Real-time Search Dropdown matches */}
              {showSearch && searchResults.length > 0 && (
                <div className="absolute top-12 right-0 w-[280px] md:w-[320px] bg-white border border-gray-200/80 shadow-2xl rounded-2xl overflow-hidden py-2 animate-fade-in animate-slide-up z-55">
                  <div className="px-3 py-1.5 border-b border-gray-100 bg-gray-50/50">
                    <span className="text-[9px] font-black uppercase text-[#2E8B8B] tracking-wider leading-none block">
                      Local Directory Matches
                    </span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {searchResults.map((item, idx) => (
                      <button
                        key={`${item.name}-${idx}`}
                        onClick={() => handleSearchSelect(item)}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-[#fdfbf7] flex flex-col gap-0.5 transition border-b border-gray-55 last:border-0"
                      >
                        <span className="text-xs font-bold text-[#1B3A5B] line-clamp-1 leading-snug">{item.name}</span>
                        <span className="text-[9px] font-mono font-bold text-[#C9A961] uppercase tracking-wider">{item.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STANDOUT PASSPORT BUTTON (Primary conversion CTA) */}
          <a 
            href="/cabo-passport/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('cabo-passport');
            }}
            className="bg-linear-to-r from-[#C9A961] to-[#b3914a] hover:from-[#d1b370] hover:to-[#be9b51] text-white text-[11px] md:text-xs font-extrabold px-3.5 md:px-5 py-2 md:py-2.5 rounded-full shadow-md shadow-[#C9A961]/15 border border-[#c19f55] hover:shadow-lg hover:shadow-[#C9A961]/25 transition-all cursor-pointer select-none active:scale-97 flex items-center gap-1.5"
            id="header-passport-btn"
          >
            <Award className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
            <span>Cabo Passport</span>
          </a>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1B3A5B] hover:bg-gray-100 transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* FULL-SCREEN MOBILE OVERLAY MENU with accordion panels */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 left-0 top-16 bg-white z-40 flex flex-col border-t border-gray-100 overflow-y-auto animate-fade-in">
          
          {/* Search bar inside Mobile Menu (all pages except homepage) */}
          {!isHomepage && (
            <div className="p-4 border-b border-gray-100 bg-[#fdfbf7]">
              <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-3.5 py-2">
                <Search className="w-4 h-4 text-gray-450 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dining, tours, zones..."
                  className="ml-2 bg-transparent border-none text-xs text-[#1B3A5B] font-semibold focus:outline-none placeholder-gray-400 w-full"
                />
              </div>

              {/* Mobile Real-time Search matches */}
              {searchQuery.trim().length >= 2 && (
                <div className="bg-white border border-gray-200 rounded-xl mt-2 overflow-hidden shadow-lg">
                  <div className="px-3 py-1 bg-gray-50 border-b border-gray-100">
                    <span className="text-[9px] font-bold text-[#2E8B8B] tracking-wider uppercase">Matches</span>
                  </div>
                  <div className="max-h-[220px] overflow-y-auto divide-y divide-gray-100">
                    {searchResults.length > 0 ? (
                      searchResults.map((item, idx) => (
                        <button
                          key={`mob-${item.name}-${idx}`}
                          onClick={() => handleSearchSelect(item)}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <div>
                            <span className="text-xs font-bold text-[#1B3A5B] block line-clamp-1">{item.name}</span>
                            <span className="text-[9px] font-mono text-[#C9A961] font-bold uppercase tracking-wider">{item.type}</span>
                          </div>
                          <ChevronDown className="w-3 h-3 text-gray-450 -rotate-90 shrink-0" />
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center text-xs text-gray-400">No results found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Accordions */}
          <div className="flex-1 divide-y divide-gray-100">
            
            {/* Accordion 1: Things to Do */}
            <div>
              <button 
                onClick={() => toggleAccordion('things')}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-[#1B3A5B], text-sm text-left hover:bg-gray-50 transition"
              >
                <span>Things to Do</span>
                <ChevronDown className={`w-4 h-4 text-[#C9A961] transition-transform ${activeAccordion === 'things' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'things' && (
                <div className="bg-[#fdfbf7] px-6 py-3 space-y-3.5 border-b border-gray-50 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-wider text-[#2E8B8B] font-bold uppercase block">Tours</span>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <a href="/tours/whale-watching/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Whale Watching Safari', page: 'category-list', hubId: 'tours', subId: 'whale-watching', type: 'Tour' }); }} className="py-1">Whale Watching</a>
                      <a href="/tours/fishing/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Deep Sea Sportfishing', page: 'category-list', hubId: 'tours', subId: 'fishing', type: 'Tour' }); }} className="py-1">Fishing</a>
                      <a href="/tours/boat-tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Coastal Boat Cruises', page: 'category-list', hubId: 'tours', subId: 'boat-tours', type: 'Tour' }); }} className="py-1">Boat Cruises</a>
                      <a href="/tours/snorkeling/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Snorkeling & Diving Reefs', page: 'category-list', hubId: 'tours', subId: 'snorkeling', type: 'Tour' }); }} className="py-1">Snorkeling</a>
                      <a href="/tours/atv/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Off-Road ATV Adventures', page: 'category-list', hubId: 'tours', subId: 'atv', type: 'Tour' }); }} className="py-1">ATV Tours</a>
                      <a href="/tours/zipline/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Zipline Challenges', page: 'category-list', hubId: 'tours', subId: 'zipline', type: 'Tour' }); }} className="py-1">Zipline</a>
                      <a href="/tours/whale-shark/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Whale Shark Swimming', page: 'category-list', hubId: 'tours', subId: 'whale-shark', type: 'Tour' }); }} className="py-1 col-span-2">Whale Sharks</a>
                    </div>
                  </div>
                  <div className="space-y-1.5 border-t border-gray-100 pt-3">
                    <span className="text-[10px] font-mono tracking-wider text-[#2E8B8B] font-bold uppercase block">By Area</span>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <a href="/cabo-san-lucas/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Cabo San Lucas', page: 'tours', zoneId: 'cabo-san-lucas', type: 'Hub' }); }} className="py-1">Cabo San Lucas</a>
                      <a href="/san-jose-del-cabo/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'San José del Cabo', page: 'tours', zoneId: 'san-jose-del-cabo', type: 'Hub' }); }} className="py-1">San José del Cabo</a>
                      <a href="/tourist-corridor/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Tourist Corridor', page: 'tours', zoneId: 'tourist-corridor', type: 'Hub' }); }} className="py-1">Tourist Corridor</a>
                      <a href="/todos-santos/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Todos Santos', page: 'tours', zoneId: 'todos-santos', type: 'Hub' }); }} className="py-1">Todos Santos</a>
                      <a href="/los-barriles/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Los Barriles', page: 'tours', zoneId: 'los-barriles', type: 'Hub' }); }} className="py-1">Los Barriles</a>
                      <a href="/east-cape/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'East Cape', page: 'tours', zoneId: 'east-cape', type: 'Hub' }); }} className="py-1">East Cape</a>
                      <a href="/la-paz/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'La Paz', page: 'tours', zoneId: 'la-paz', type: 'Hub' }); }} className="py-1 col-span-2">La Paz Hub</a>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <a href="/tours/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Tours Hub', page: 'tours', type: 'Hub' }); }} className="text-[#2E8B8B] font-black underline block text-center py-1">See All Tours & Activities →</a>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Eat & Drink */}
            <div>
              <button 
                onClick={() => toggleAccordion('eat')}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-[#1B3A5B], text-sm text-left hover:bg-gray-55 transition"
              >
                <span>Eat & Drink</span>
                <ChevronDown className={`w-4 h-4 text-[#C9A961] transition-transform ${activeAccordion === 'eat' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'eat' && (
                <div className="bg-[#fdfbf7] px-6 py-3 space-y-3.5 border-b border-gray-50 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-wider text-[#2E8B8B] font-bold uppercase block">Restaurants</span>
                    <div className="grid grid-cols-1 gap-2 text-gray-600">
                      <a href="/restaurants/fine-dining/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Restaurants', page: 'category-list', hubId: 'restaurants', subId: 'fine-dining', type: 'Food' }); }} className="py-1">Fine Dining Classics</a>
                      <a href="/restaurants/ocean-view/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Restaurants', page: 'category-list', hubId: 'restaurants', subId: 'ocean-view', type: 'Food' }); }} className="py-1">Oceanfront Culinary</a>
                      <a href="/restaurants/seafood/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Restaurants', page: 'category-list', hubId: 'restaurants', subId: 'seafood', type: 'Food' }); }} className="py-1">Baja Fresh Seafood</a>
                      <a href="/restaurants/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Restaurants', page: 'category-list', hubId: 'restaurants', type: 'Food' }); }} className="text-[#2E8B8B] font-bold">See all restaurants →</a>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <a href="/nightlife/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Nightlife', page: 'category-list', hubId: 'nightlife', type: 'Night' }); }} className="font-bold text-[#1B3A5B] block hover:text-[#2E8B8B]">Bars & Nightlife Guide</a>
                    <a href="/beach-clubs-cabo/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Beach Clubs', page: 'category-list', hubId: 'beach-clubs-cabo', type: 'Beach' }); }} className="font-bold text-[#1B3A5B] block hover:text-[#2E8B8B]">Beach Clubs & Day Passes</a>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Stay */}
            <div>
              <button 
                onClick={() => toggleAccordion('stay')}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-[#1B3A5B], text-sm text-left hover:bg-gray-55 transition"
              >
                <span>Stay</span>
                <ChevronDown className={`w-4 h-4 text-[#C9A961] transition-transform ${activeAccordion === 'stay' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'stay' && (
                <div className="bg-[#fdfbf7] px-6 py-3 space-y-3.5 border-b border-gray-50 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-wider text-[#2E8B8B] font-bold uppercase block">Hotels & Resorts</span>
                    <div className="flex flex-col gap-2 text-gray-600">
                      <a href="/hotels/all-inclusive/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Hotels', page: 'category-list', hubId: 'hotels', subId: 'all-inclusive', type: 'Lodging' }); }} className="py-0.5">All-Inclusive Resorts</a>
                      <a href="/hotels/adults-only/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Hotels', page: 'category-list', hubId: 'hotels', subId: 'adults-only', type: 'Lodging' }); }} className="py-0.5">Adults Only Luxury</a>
                      <a href="/hotels/luxury/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Hotels', page: 'category-list', hubId: 'hotels', subId: 'resort', type: 'Lodging' }); }} className="py-0.5">Luxury Resorts</a>
                    </div>
                  </div>
                  <div className="space-y-1.5 border-t border-gray-100 pt-3">
                    <span className="text-[10px] font-mono tracking-wider text-[#2E8B8B] font-bold uppercase block">Villas</span>
                    <div className="flex flex-col gap-2 text-gray-600">
                      <a href="/vacation-rentals/pedregal/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Vacation Rentals', page: 'category-list', hubId: 'vacation-rentals', subId: 'pedregal', type: 'Villa' }); }} className="py-0.5">Pedregal Estates</a>
                      <a href="/vacation-rentals/palmilla/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Vacation Rentals', page: 'category-list', hubId: 'vacation-rentals', subId: 'palmilla', type: 'Villa' }); }} className="py-0.5">Palmilla Coves</a>
                      <a href="/vacation-rentals/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Vacation Rentals', page: 'category-list', hubId: 'vacation-rentals', type: 'Villa' }); }} className="text-[#2E8B8B] font-bold pt-1">All Vacation Rentals →</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Explore Cabo */}
            <div>
              <button 
                onClick={() => toggleAccordion('explore')}
                className="w-full px-5 py-4 flex items-center justify-between font-bold text-[#1B3A5B], text-sm text-left hover:bg-gray-55 transition"
              >
                <span>Explore Cabo</span>
                <ChevronDown className={`w-4 h-4 text-[#C9A961] transition-transform ${activeAccordion === 'explore' ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion === 'explore' && (
                <div className="bg-[#fdfbf7] px-6 py-3 space-y-3.5 border-b border-gray-50 text-xs text-gray-600">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span className="text-[10px] font-mono tracking-wider text-[#2E8B8B] font-bold uppercase col-span-2 pb-1 block border-b border-gray-25">Areas</span>
                    <a href="/cabo-san-lucas/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Cabo San Lucas', page: 'zone', zoneId: 'cabo-san-lucas', type: 'Destination' }); }} className="py-1 font-semibold text-[#1B3A5B]">Cabo San Lucas</a>
                    <a href="/san-jose-del-cabo/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'San José del Cabo', page: 'zone', zoneId: 'san-jose-del-cabo', type: 'Destination' }); }} className="py-1 font-semibold text-[#1B3A5B]">San José del Cabo</a>
                    <a href="/tourist-corridor/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Tourist Corridor', page: 'zone', zoneId: 'tourist-corridor', type: 'Destination' }); }} className="py-1 font-semibold text-[#1B3A5B]">Tourist Corridor</a>
                    <a href="/todos-santos/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Todos Santos', page: 'zone', zoneId: 'todos-santos', type: 'Destination' }); }} className="py-1 font-semibold text-[#1B3A5B]">Todos Santos</a>
                    <a href="/los-barriles/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Los Barriles', page: 'zone', zoneId: 'los-barriles', type: 'Destination' }); }} className="py-1 font-semibold text-[#1B3A5B]">Los Barriles</a>
                    <a href="/east-cape/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'East Cape', page: 'zone', zoneId: 'east-cape', type: 'Destination' }); }} className="py-1 font-semibold text-[#1B3A5B]">East Cape</a>
                    <a href="/la-paz/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'La Paz', page: 'zone', zoneId: 'la-paz', type: 'Destination' }); }} className="py-1 font-semibold text-[#1B3A5B] col-span-2 text-center">La Paz</a>
                  </div>
                  <div className="space-y-1.5 border-t border-gray-100 pt-3">
                    <span className="text-[10px] font-mono tracking-wider text-[#2E8B8B] font-bold uppercase block">Travel Services</span>
                    <div className="grid grid-cols-2 gap-2">
                      <a href="/cabo-airport-shuttle/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Cabo Airport Shuttle', page: 'category-list', hubId: 'cabo-airport-shuttle', type: 'Service' }); }} className="py-1 font-semibold text-[#1B3A5B]">Airport Shuttle</a>
                      <a href="/car-rentals/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Car Rentals', page: 'category-list', hubId: 'car-rentals', type: 'Service' }); }} className="py-1">Car Rentals</a>
                      <a href="/golf/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Golf', page: 'category-list', hubId: 'golf', type: 'Service' }); }} className="py-1">Golf Courses</a>
                      <a href="/yacht-charters/" onClick={(e) => { e.preventDefault(); handleSearchSelect({ name: 'Yacht Charters', page: 'category-list', hubId: 'yacht-charters', type: 'Service' }); }} className="py-1">Yacht Charters</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Quick Contact Call or Passport promo inside drawer */}
          <div className="p-5 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
            <div className="text-center rounded-xl p-3.5 bg-linear-to-b from-white to-[#FAF7F0] border border-[#C9A961]/20">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9A961] block mb-1">Cabo Passport Discount VIP Card</span>
              <p className="text-[11px] text-gray-500 mb-2">Save an average of $180 per group at Cabo's top spots.</p>
              <a 
                href="/cabo-passport/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('cabo-passport');
                  setIsMobileMenuOpen(false);
                }}
                className="inline-block w-full text-center bg-[#C9A961] hover:bg-[#b09353] text-[#1B3A5B] text-xs font-black py-2 rounded-lg"
              >
                Access Your Passport
              </a>
            </div>
          </div>

        </div>
      )}
    </header>
  );
}
