import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, MapPin, Compass, ShieldCheck, Mail, CheckCircle, Sliders, Check, 
  RotateCcw, SlidersHorizontal, Map, Grid, ArrowRight, Award, ChevronRight, Bookmark
} from 'lucide-react';
import { ATTRACTIONS_DATA, AttractionData } from '../data/attractions';
import { DIRECTORY_LISTINGS, ListingItem } from './CategoryList';

interface AttractionPageProps {
  attractionSlug: string;
  onNavigate: (
    page: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction', 
    zoneId?: string | null,
    hubId?: string | null,
    subId?: string | null,
    extraId?: string | null
  ) => void;
}

export default function AttractionPage({ attractionSlug, onNavigate }: AttractionPageProps) {
  // 1. Resolve attraction data with robust fallback
  const attraction: AttractionData = useMemo(() => {
    return ATTRACTIONS_DATA[attractionSlug] || ATTRACTIONS_DATA['the-arch-of-cabo-san-lucas'];
  }, [attractionSlug]);

  // 2. Fetch directory listings near or associated with this attraction (matching zone)
  const nearbyListingsFull = useMemo(() => {
    return DIRECTORY_LISTINGS.filter(item => item.zone === attraction.zone);
  }, [attraction.zone]);

  // 3. States for filters
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceFilters, setPriceFilters] = useState<number[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [isMapView, setIsMapView] = useState<boolean>(false);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('wic_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  // Newsletter signup state
  const [signedUp, setSignedUp] = useState(false);
  const [newsEmail, setNewsEmail] = useState('');

  // Handle newsletter Form Submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim().length > 3) {
      setSignedUp(true);
      setNewsEmail('');
    }
  };

  // Bookmark Toggle Coordinator
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(b => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    localStorage.setItem('wic_bookmarks', JSON.stringify(updated));
  };

  // Determine dynamic list type categories that actually exist
  const existingTypes = useMemo(() => {
    const typesSet = new Set<string>();
    nearbyListingsFull.forEach(item => {
      if (item.hub === 'tours') typesSet.add('tours');
      else if (item.hub === 'restaurants' || item.hub === 'beach-clubs-cabo' || item.hub === 'nightlife') typesSet.add('dining');
      else if (item.hub === 'hotels' || item.hub === 'vacation-rentals') typesSet.add('stay');
      else typesSet.add('services');
    });
    return Array.from(typesSet);
  }, [nearbyListingsFull]);

  // 4. Dynamic Filtering logic
  const filteredListings = useMemo(() => {
    return nearbyListingsFull.filter(item => {
      // 1. Hub type filtering
      if (selectedTypes.length > 0) {
        let matchesType = false;
        if (selectedTypes.includes('tours') && item.hub === 'tours') matchesType = true;
        if (selectedTypes.includes('dining') && (item.hub === 'restaurants' || item.hub === 'beach-clubs-cabo' || item.hub === 'nightlife')) matchesType = true;
        if (selectedTypes.includes('stay') && (item.hub === 'hotels' || item.hub === 'vacation-rentals')) matchesType = true;
        if (selectedTypes.includes('services') && item.hub !== 'tours' && item.hub !== 'restaurants' && item.hub !== 'beach-clubs-cabo' && item.hub !== 'nightlife' && item.hub !== 'hotels' && item.hub !== 'vacation-rentals') matchesType = true;
        
        if (!matchesType) return false;
      }

      // 2. Price filtering
      if (priceFilters.length > 0 && !priceFilters.includes(item.priceLevel)) {
        return false;
      }

      // 3. Rating filtering
      if (ratingFilter !== null && item.rating < ratingFilter) {
        return false;
      }

      // 4. Open now status
      if (openNowOnly && !item.isOpen) {
        return false;
      }

      return true;
    });
  }, [nearbyListingsFull, selectedTypes, priceFilters, ratingFilter, openNowOnly]);

  // Fallback to top-rated in same zone when filters produce zero results
  const fallbackListings = useMemo(() => {
    if (filteredListings.length > 0) return [];
    return [...nearbyListingsFull]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, [filteredListings, nearbyListingsFull]);

  // Reset Filters handler
  const handleResetFilters = () => {
    setSelectedTypes([]);
    setPriceFilters([]);
    setRatingFilter(null);
    setOpenNowOnly(false);
  };

  const handleTogglePriceFilter = (level: number) => {
    if (priceFilters.includes(level)) {
      setPriceFilters(priceFilters.filter(p => p !== level));
    } else {
      setPriceFilters([...priceFilters, level]);
    }
  };

  const handleToggleTypeFilter = (typeKey: string) => {
    if (selectedTypes.includes(typeKey)) {
      setSelectedTypes(selectedTypes.filter(t => t !== typeKey));
    } else {
      setSelectedTypes([...selectedTypes, typeKey]);
    }
  };

  // Display labels map
  const typeLabels: Record<string, string> = {
    'tours': 'Tours & Activities',
    'dining': 'Dining & Clubs',
    'stay': 'Resorts & Luxury Villas',
    'services': 'Premium Services'
  };

  return (
    <div className="flex-1 bg-[#fdfbf7]/40 min-h-screen pb-16">
      
      {/* 1. BREADCRUMBS BAR */}
      <div className="bg-white border-b border-gray-150 py-3 text-xs text-gray-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-[#2E8B8B] transition cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <button 
            onClick={() => onNavigate('zone', attraction.zone)} 
            className="hover:text-[#2E8B8B] transition text-gray-600 font-semibold cursor-pointer"
          >
            {attraction.zoneLabel}
          </button>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-[#1B3A5B] font-extrabold">{attraction.name}</span>
        </div>
      </div>

      {/* 2. COMPACT HERO BANNER CARD */}
      <div className="relative bg-[#1B3A5B] text-white overflow-hidden select-none shadow-xs">
        {/* Dynamic Attraction Specific Background Image with Dark Navy Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={attraction.imageUrl} 
            alt={attraction.name} 
            className="w-full h-full object-cover opacity-35 filter brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5B] via-[#1B3A5B]/85 to-[#1B3A5B]/55 z-1" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10 py-12 md:py-16 space-y-5">
          <div className="flex flex-col gap-2">
            <div className="bg-[#C9A961]/15 border border-[#C9A961]/35 text-[#C9A961] font-mono font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider w-max">
              🎯 Vetted Landmark Hub
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black font-sans tracking-tight text-white mt-1">
              {attraction.name}
            </h1>
            <div className="flex items-center gap-1 text-xs text-gray-300 font-mono tracking-tight mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>{attraction.coordinate}</span>
              <span className="text-white/20 px-1.5">|</span>
              <span>{attraction.zoneLabel} Area</span>
            </div>
          </div>

          <p className="max-w-3xl text-sm md:text-[15px] text-gray-200 leading-relaxed font-sans font-medium">
            {attraction.description}
          </p>

          {/* Trust strip dynamic bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 max-w-4xl">
            {attraction.trustMetrics.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A961] shrink-0" />
                <span className="text-[11px] font-extrabold text-white tracking-tight leading-none">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. LISTINGS AREA (FILTERS SIDEBAR + DYNAMIC CARDS GRID) */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-10" id="attraction-directory">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FILTER SIDEBAR (DESKTOP) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-22 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between border-b pb-4 border-gray-100">
              <h3 className="font-sans font-extrabold text-[#1B3A5B] text-sm tracking-tight flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2E8B8B]" />
                Explore Nearby
              </h3>
              {(selectedTypes.length > 0 || priceFilters.length > 0 || ratingFilter !== null || openNowOnly) && (
                <button 
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-red-500 hover:text-red-700 transition flex items-center gap-0.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Hub Type Filters (rendered only if listings exist) */}
            {existingTypes.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">
                  Listing Type
                </h4>
                <div className="space-y-1.5 justify-start">
                  {existingTypes.map(typeKey => (
                    <button
                      key={typeKey}
                      onClick={() => handleToggleTypeFilter(typeKey)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition duration-150 cursor-pointer ${
                        selectedTypes.includes(typeKey)
                          ? 'bg-[#2E8B8B]/10 font-bold text-[#2E8B8B]'
                          : 'hover:bg-[#FAF7F2]/50 text-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        selectedTypes.includes(typeKey) ? 'border-[#2E8B8B] bg-[#2E8B8B] text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {selectedTypes.includes(typeKey) && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <span>{typeLabels[typeKey] || typeKey}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Segment Filter */}
            <div className="space-y-3 border-t pt-4 border-gray-100">
              <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">
                Price Bracket
              </h4>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(level => (
                  <button
                    key={level}
                    onClick={() => handleTogglePriceFilter(level)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
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
            <div className="space-y-3 border-t pt-4 border-gray-100">
              <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">
                Min Rating
              </h4>
              <div className="space-y-1.5">
                {[4.5, 4.0, 3.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setRatingFilter(prev => prev === rating ? null : rating)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      ratingFilter === rating
                        ? 'bg-[#2E8B8B]/10 text-[#2E8B8B] border-[#2E8B8B]'
                        : 'bg-transparent text-gray-600 border-gray-150 hover:bg-[#faf7f2]/30'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#C9A961] text-[#C9A961]" />
                      {rating.toFixed(1)} and above
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Open / Closed Status Filter */}
            <div className="flex items-center justify-between p-3 bg-[#FAF7F2]/40 rounded-xl border border-gray-100 select-none">
              <div>
                <span className="text-xs font-bold text-[#1B3A5B] block">Open Now Only</span>
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
          </aside>

          {/* MAIN RESULTS AREA */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Control Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-150/60 pb-4">
              <div>
                <h2 className="text-lg font-black text-[#1B3A5B] tracking-tight">
                  {filteredListings.length > 0 
                    ? `${filteredListings.length} Vetted Options Near ${attraction.name.split('(')[0].trim()}`
                    : `Zero Matches Near ${attraction.name.split('(')[0].trim()}`
                  }
                </h2>
                <p className="text-xs text-gray-400 font-medium font-sans">
                  Vetted for compliance, marine licensing transcripts, and tourist safety protocol.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 bg-white border border-gray-250 rounded-xl px-3.5 py-2 text-xs font-bold text-[#1B3A5B] shadow-xs cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#2E8B8B]" />
                  <span>Filters</span>
                </button>

                {/* Map/Grid Toggle */}
                <div className="bg-white border border-gray-200 rounded-xl p-0.5 flex items-center shadow-xs">
                  <button
                    onClick={() => setIsMapView(false)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      !isMapView ? 'bg-[#1B3A5B] text-white' : 'text-gray-500 hover:text-[#1B3A5B]'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setIsMapView(true)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isMapView ? 'bg-[#1B3A5B] text-white' : 'text-gray-500 hover:text-[#1B3A5B]'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>Map View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* EMPTY STATE FILTER FALLBACK */}
            {filteredListings.length === 0 && (
              <div className="bg-[#FAF7F2]/50 border border-[#C9A961]/20 rounded-2xl p-8 space-y-6 text-center max-w-xl mx-auto">
                <div className="space-y-2">
                  <Compass className="w-10 h-10 text-[#C9A961] mx-auto opacity-75" />
                  <h3 className="font-extrabold text-[#1B3A5B] text-base">No Vetted Listings Match These Specific Filters</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    We didn't find any listings matching these coordinates in our registry. Here are the top-rated experiences around <strong className="text-[#2E8B8B]">{attraction.zoneLabel}</strong> instead!
                  </p>
                </div>
                
                {/* Fallback Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  {fallbackListings.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => onNavigate('category-list', attraction.zone, item.hub)}
                      className="bg-white border rounded-xl overflow-hidden shadow-xs hover:border-[#2E8B8B] transition cursor-pointer"
                    >
                      <img src={item.imageUrl} alt={item.name} className="h-24 w-full object-cover" referrerPolicy="no-referrer" />
                      <div className="p-2.5 space-y-1">
                        <span className="text-[9px] font-mono font-bold text-[#2E8B8B] uppercase">{item.subcategory}</span>
                        <h4 className="text-[11px] font-black leading-snug text-[#1B3A5B] line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-1 text-[10px]">
                          <span>⭐</span>
                          <span className="font-bold text-[#1B3A5B]">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleResetFilters}
                  className="bg-[#2E8B8B] hover:bg-[#206161] text-white text-xs font-black px-5 py-2.5 rounded-lg transition"
                >
                  Clear Active Filters
                </button>
              </div>
            )}

            {/* INTERACTIVE VECTOR SEAMLESS MAP VIEW OR LISTINGS CARDS GRID */}
            <AnimatePresence mode="wait">
              {isMapView && filteredListings.length > 0 ? (
                <motion.div
                  key="attraction-map-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 h-[540px]"
                >
                  {/* Interactive Map Canvas (Left 8 cols) */}
                  <div className="lg:col-span-8 relative bg-[#EDF8FF] rounded-2xl h-full border border-blue-200/35 flex items-center justify-center overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full select-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                      <path d="M 0,220 Q 200,280 400,260 T 800,290 L 800,600 L 0,600 Z" fill="#D8F1FF" opacity="0.6" />
                      <path d="M 0,250 Q 180,310 400,290 T 800,320 L 800,600 L 0,600 Z" fill="#BBE3FF" opacity="0.75" />
                      <path d="M -50,180 Q 220,240 400,220 T 850,250" stroke="#E6C89A" strokeWidth="18" fill="none" opacity="0.35" />
                      <path d="M -50,180 Q 220,240 400,220 T 850,250" stroke="#FCEFCE" strokeWidth="10" fill="none" opacity="0.8" />
                      <path d="M -50,-50 L 850,-50 L 850,240 Q 600,220 400,220 T -50,180 Z" fill="#F4EDE2" />

                      {/* Mountain formations */}
                      <path d="M 80,110 Q 110,70 140,110 Z" fill="#E8DCD1" opacity="0.7" />
                      <path d="M 520,140 Q 550,80 580,140 Z" fill="#E8DCD1" opacity="0.6" />

                      {/* Landmarks & Oceans typography */}
                      <text x="140" y="420" fill="#1B3A5B" opacity="0.25" fontSize="12" fontWeight="bold" fontFamily="monospace">PACIFIC OCEAN</text>
                      <text x="590" y="390" fill="#1B3A5B" opacity="0.25" fontSize="12" fontWeight="bold" fontFamily="monospace">SEA OF CORTEZ</text>

                      {/* Attraction Center anchor */}
                      <circle cx={400} cy={300} r="18" fill="#2E8B8B" fillOpacity="0.1" />
                      <circle cx={400} cy={300} r="6" fill="#2E8B8B" />
                      <text x="400" y="275" textAnchor="middle" fill="#2E8B8B" className="text-xs font-black" fontWeight="black">
                        ⭐ {attraction.name.split('(')[0]}
                      </text>
                    </svg>

                    {/* Interactive listings pins pulsing */}
                    {filteredListings.map(item => {
                      // Place listings around center attraction dynamically
                      const isHovered = hoveredListingId === item.id;
                      const rad = (parseInt(item.id.replace(/\D/g, ''), 10) || 5) * 50;
                      const angle = ((parseInt(item.id.replace(/\D/g, ''), 10) || 3) * 72) * (Math.PI / 180);
                      const pinX = 50 + (Math.cos(angle) * (15 + (rad % 25)));
                      const pinY = 50 + (Math.sin(angle) * (15 + (rad % 25)));

                      return (
                        <div
                          key={item.id}
                          style={{ left: `${pinX}%`, top: `${pinY}%` }}
                          onMouseEnter={() => setHoveredListingId(item.id)}
                          onMouseLeave={() => setHoveredListingId(null)}
                          onClick={() => onNavigate('category-list', attraction.zone, item.hub)}
                          className="absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                        >
                          <div className={`relative ${isHovered ? 'scale-120' : 'scale-100'} transition-transform duration-200`}>
                            <div className="absolute -inset-1 rounded-full bg-[#1B3A5B]/20 animate-ping opacity-75" />
                            <div className={`w-8 h-8 rounded-full border shadow flex items-center justify-center ${
                              isHovered ? 'bg-[#2E8B8B] text-white border-white' : 'bg-white text-[#1B3A5B] border-gray-250'
                            }`}>
                              <span className="text-[10px] font-bold">
                                {item.hub === 'tours' ? '⛵' : item.hub === 'hotels' ? '🏨' : '🍽️'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sidebar Map Directory List (Right 4 cols) */}
                  <div className="lg:col-span-4 flex flex-col h-full overflow-hidden">
                    <div className="px-3 py-2 bg-gray-50 border-b border-gray-150 flex items-center justify-between text-xs font-bold text-[#1B3A5B]">
                      <span className="uppercase">Vetted Locations</span>
                      <span className="font-mono text-[10px] text-gray-400">{filteredListings.length} total</span>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-150/70 p-1 space-y-2">
                      {filteredListings.map(item => {
                        const isHovered = hoveredListingId === item.id;
                        return (
                          <div
                            key={`map-item-${item.id}`}
                            onMouseEnter={() => setHoveredListingId(item.id)}
                            onMouseLeave={() => setHoveredListingId(null)}
                            onClick={() => onNavigate('category-list', attraction.zone, item.hub)}
                            className={`p-3 rounded-xl transition cursor-pointer text-left ${
                              isHovered ? 'bg-[#2E8B8B]/5 border-l-4 border-l-[#2E8B8B]' : 'hover:bg-gray-50 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-xs font-black text-[#1B3A5B] truncate">{item.name}</h4>
                              <span className="text-[10px] text-emerald-500 shrink-0 font-bold">⭐ {item.rating}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-mono tracking-wide mt-0.5 capitalize">{item.subcategory} · {'$'.repeat(item.priceLevel)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* CARDS LISTINGS GRID */
                filteredListings.length > 0 && (
                  <motion.div
                    key="attraction-grid-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredListings.map((item, index) => {
                      const isBookmarked = bookmarks.includes(item.id);
                      return (
                        <React.Fragment key={item.id}>
                          {/* Cabo Passport Banner inserted after ~12 cards inline in the grid slot */}
                          {index === 11 && (
                            <div className="col-span-1 bg-[#1B3A5B] text-white rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow border border-yellow-500/25 relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-1 bg-yellow-500 text-white text-[8px] font-bold uppercase rounded-bl-lg">
                                AD
                              </div>
                              <div className="space-y-1.5">
                                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-semibold px-2 py-0.5 rounded text-[9px] font-mono tracking-wider w-max">
                                  CABO PASSPORT EXCLUSIVE
                                </div>
                                <h4 className="text-base font-black tracking-tight leading-snug">
                                  Save average of $180 at top spots with Cabo Passport.
                                </h4>
                                <p className="text-xs text-white/70">
                                  Unlock 2-for-1 deals, dining multipliers and VIP entry vouchers.
                                </p>
                              </div>
                              <button
                                onClick={() => onNavigate('cabo-passport')}
                                className="w-full bg-[#C9A961] hover:bg-[#b0914f] text-[#1B3A5B] font-extrabold text-xs py-2.5 rounded-xl transition cursor-pointer"
                              >
                                Access Your Discount VIP Card →
                              </button>
                            </div>
                          )}

                          {/* Standard Premium Listing Card */}
                          <div 
                            onMouseEnter={() => setHoveredListingId(item.id)}
                            onMouseLeave={() => setHoveredListingId(null)}
                            onClick={() => onNavigate('category-list', attraction.zone, item.hub)}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-150/70 hover:shadow-md transition-all duration-300 group cursor-pointer relative"
                          >
                            {/* Photo Cover */}
                            <div className="h-44 sm:h-48 overflow-hidden relative select-none">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <button
                                onClick={(e) => handleToggleBookmark(item.id, e)}
                                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1B3A5B] flex items-center justify-center transition shadow-sm z-10 cursor-pointer"
                              >
                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-[#2E8B8B] fill-[#2E8B8B]' : 'text-gray-400'}`} />
                              </button>
                              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold text-white select-none">
                                {item.isOpen ? (
                                  <span className="text-emerald-400">● Open Now</span>
                                ) : (
                                  <span className="text-gray-300">Closed</span>
                                )}
                              </div>
                            </div>

                            {/* Card Content parameters */}
                            <div className="p-4.5 space-y-2.5">
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-[#C9A961] text-xs">⭐</span>
                                <span className="font-extrabold text-[#1B3A5B]">{item.rating}</span>
                                <span className="text-gray-400 font-medium font-sans">({item.reviewsCount})</span>
                                <span className="mx-1 text-gray-200">|</span>
                                <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider">{item.subcategory}</span>
                              </div>

                              <h3 className="font-sans font-extrabold text-[#1B3A5B] text-[15px] group-hover:text-[#2E8B8B] transition duration-200 leading-snug truncate">
                                {item.name}
                              </h3>

                              <div className="flex items-center justify-between gap-2.5 text-xs text-gray-400 pt-1.5 border-t border-gray-100/75">
                                <span className="flex items-center gap-1 truncate font-medium max-w-[130px]">
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
                    })}
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* 4. REVIEWS SECTION (aggregate rating state + 3 genuine custom reviews) */}
      <section className="bg-white border-y border-gray-150/80 mt-16 py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-2">
            
            {/* Overview Star Assessment */}
            <div className="lg:col-span-4 bg-[#fdfbf7] p-6 rounded-2xl border border-[#C9A961]/20 flex flex-col items-center justify-center text-center space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A961] block">
                AGGREGATE RATING
              </span>
              <div className="flex items-baseline gap-1 text-[#1B3A5B]">
                <strong className="text-4xl font-extrabold tracking-tight">4.9</strong>
                <span className="text-xs text-gray-400 font-bold">/ 5.0</span>
              </div>
              <div className="flex items-center gap-0.5 text-[#C9A961] text-sm">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-[11px] text-gray-400 font-sans">
                Based on 270+ verified visitor transcripts from Los Cabos.
              </p>
            </div>

            {/* Individual verified Reviews (3 of them) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {attraction.reviews.map((rev, idx) => (
                <div key={idx} className="bg-[#FAF7F2]/10 border border-gray-150 p-4.5 rounded-xl space-y-3 flex flex-col justify-between text-left">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1B3A5B]">
                      <span>{rev.author}</span>
                      <div className="flex items-center gap-0.5 text-[#C9A961]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#2E8B8B]/80 block uppercase tracking-wider">{rev.date} · Verified Visit</span>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">{rev.text}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold pt-1.5 border-t border-gray-100 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Insider Vetted</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="bg-gradient-to-b from-white to-[#FAF7F2]/40 py-12 max-w-7xl mx-auto px-4 lg:px-6 mt-12 rounded-3xl border border-[#C9A961]/15 select-none">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="bg-[#FAF7F2] border border-[#C9A961]/25 px-4 py-1 rounded-full text-xs font-mono font-extrabold text-[#C9A961] uppercase tracking-widest w-max mx-auto flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>WEEKLY INSIDER DIGEST</span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[#1B3A5B] tracking-tight">
            Planning your {attraction.name.split('(')[0].trim()} trip?
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-sans">
            Get our weekly picks — the best new tours, seasonal tips and local deals. Read by 12,000+ travelers.
          </p>

          {signedUp ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-700 text-xs text-center max-w-md mx-auto animate-fade-in font-extrabold flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Subscribed! Check your mailbox for our welcome picks soon.</span>
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-2">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
                <input 
                  type="email"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 rounded-xl px-4 py-2.5 text-xs text-[#1B3A5B] bg-white border border-gray-250 focus:outline-none focus:ring-1 focus:ring-[#2E8B8B] placeholder-gray-400 font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#2E8B8B] hover:bg-[#206161] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition duration-150 cursor-pointer whitespace-nowrap active:scale-97"
                >
                  Send me the picks
                </button>
              </form>
              <p className="text-[10px] text-gray-400 font-sans">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* MOBILE BOTTOM SLIDE-UP FILTERS PANEL */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-6 text-left shadow-2xl"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <span className="font-extrabold text-sm text-[#1B3A5B] uppercase tracking-wider">Refine {attraction.name.split('(')[0]} Grid</span>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Mobile Hub Type Filter */}
              {existingTypes.length > 0 && (
                <div className="space-y-3.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">Listing Type</h4>
                  <div className="space-y-1.5">
                    {existingTypes.map(typeKey => (
                      <button
                        key={typeKey}
                        onClick={() => handleToggleTypeFilter(typeKey)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs ${
                          selectedTypes.includes(typeKey) ? 'bg-[#2E8B8B]/10 font-bold text-[#2E8B8B]' : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span>{typeLabels[typeKey] || typeKey}</span>
                        {selectedTypes.includes(typeKey) && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price bracket option */}
              <div className="space-y-3 border-t pt-4">
                <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">Price Bracket</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map(level => (
                    <button
                      key={level}
                      onClick={() => handleTogglePriceFilter(level)}
                      className={`py-2 text-xs font-bold rounded-xl border ${
                        priceFilters.includes(level) ? 'bg-[#1B3A5B] text-white border-[#1B3A5B]' : 'bg-gray-50 text-[#1B3A5B] border-gray-200'
                      }`}
                    >
                      {'$'.repeat(level)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating level option */}
              <div className="space-y-3 border-t pt-4">
                <h4 className="text-xs font-mono font-bold uppercase text-[#1B3A5B]/65 tracking-wider">Average Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(prev => prev === rating ? null : rating)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold ${
                        ratingFilter === rating ? 'bg-[#2E8B8B]/10 text-[#2E8B8B] border-[#2E8B8B]' : 'bg-transparent text-gray-600 border-gray-150'
                      }`}
                    >
                      <span className="flex items-center gap-1">⭐ {rating.toFixed(1)} and above</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#1B3A5B] hover:bg-[#10243b] text-white py-3 rounded-xl text-xs font-extrabold tracking-wide mt-4"
              >
                Apply Filters & See {filteredListings.length} Matches
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
