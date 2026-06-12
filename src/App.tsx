import React, { useState } from 'react';
import { TourTypeId, DomainType } from './types';
import { tourTypeConfigs, tourDetails } from './data';
import Header from './components/Header';
import Home from './components/Home';
import CaboPassport from './components/CaboPassport';
import ToursHub from './components/ToursHub';
import ZoneArea from './components/ZoneArea';
import CategoryList from './components/CategoryList';
import AttractionPage from './components/AttractionPage';
import CROPillBar from './components/CROPillBar';
import ImageGallery from './components/ImageGallery';
import CROForm from './components/CROForm';
import Itinerary from './components/Itinerary';
import RestaurantMenuAndDishes from './components/RestaurantMenuAndDishes';
import HotelRoomsAndAmenities from './components/HotelRoomsAndAmenities';
import Reviews from './components/Reviews';
import FAQAccordion from './components/FAQAccordion';
import AboutOperator from './components/AboutOperator';
import TrustInfo from './components/TrustInfo';
import Footer from './components/Footer';
import TopListingsBar from './components/TopListingsBar';
import { 
  ShieldCheck, Check, Sparkles, HelpCircle, FileText, Map, Award, 
  Info, Compass, ExternalLink, Calendar, CheckSquare, XCircle, AlertCircle,
  Utensils, Hotel
} from 'lucide-react';

const domainListingGroups: Record<DomainType, TourTypeId[]> = {
  tours: ['adventure', 'water', 'sunset', 'cultural', 'fishing', 'whakesharks'],
  restaurants: ['finedining', 'beachside', 'organicfarm'],
  hotels: ['beachresort', 'luxuryvilla', 'boutiqueart']
};

const ZONES = [
  'cabo-san-lucas', 'san-jose-del-cabo', 'todos-santos', 'los-barriles', 
  'east-cape', 'la-paz', 'tourist-corridor'
];

const HUBS = [
  'hotels', 'beach-clubs-cabo', 'nightlife', 'yacht-charters', 'golf', 
  'spas', 'car-rentals', 'vacation-rentals', 'vacation-packages', 'restaurants', 
  'cabo-airport-shuttle'
];

function parseRoute() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  
  let page: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction' = 'home';
  let zoneId: string | null = null;
  let hub: string | null = null;
  let subcategory: string | null = null;
  let attractionSlug: string | null = null;

  if (segments[0] === 'places' && segments[1]) {
    return { page: 'attraction' as const, zoneId: null, hub: null, subcategory: null, attractionSlug: segments[1] };
  }

  if (path === '/cabo-passport' || path === '/cabo-passport/' || window.location.hash.includes('cabo-passport')) {
    return { page: 'cabo-passport' as const, zoneId: null, hub: null, subcategory: null, attractionSlug: null };
  }

  // Check global category pages
  if (segments.length === 1) {
    const single = segments[0];
    if (single === 'restaurants' || single === 'cabo-airport-shuttle' || HUBS.includes(single)) {
      return { page: 'category-list' as const, zoneId: null, hub: single, subcategory: null, attractionSlug: null };
    }
    if (single === 'tours') {
      return { page: 'tours' as const, zoneId: null, hub: null, subcategory: null, attractionSlug: null };
    }
    if (single === 'directory') {
      return { page: 'directory' as const, zoneId: null, hub: null, subcategory: null, attractionSlug: null };
    }
    if (ZONES.includes(single)) {
      return { page: 'zone' as const, zoneId: single, hub: null, subcategory: null, attractionSlug: null };
    }
  }

  if (segments.length >= 2) {
    const first = segments[0];
    const second = segments[1];
    
    if (ZONES.includes(first)) {
      zoneId = first;
      if (HUBS.includes(second)) {
        page = 'category-list';
        hub = second;
        subcategory = segments[2] || null;
        return { page, zoneId, hub, subcategory, attractionSlug: null };
      }
      if (second === 'tours') {
        const third = segments[2] || null;
        if (third) {
          return { page: 'category-list' as const, zoneId: first, hub: 'tours', subcategory: third, attractionSlug: null };
        }
        return { page: 'tours' as const, zoneId: first, hub: null, subcategory: null, attractionSlug: null };
      }
      return { page: 'zone' as const, zoneId: first, hub: null, subcategory: null, attractionSlug: null };
    } else if (first === 'tours') {
      return { page: 'category-list' as const, zoneId: null, hub: 'tours', subcategory: second, attractionSlug: null };
    } else if (HUBS.includes(first)) {
      return { page: 'category-list' as const, zoneId: null, hub: first, subcategory: second, attractionSlug: null };
    }
  }

  // legacy check
  let foundZone = null;
  for (const z of ZONES) {
    if (path.includes(`/${z}`)) {
      foundZone = z;
      break;
    }
  }
  if (foundZone) {
    return { page: 'zone' as const, zoneId: foundZone, hub: null, subcategory: null, attractionSlug: null };
  }

  if (path.includes('/tours')) {
    return { page: 'tours' as const, zoneId: null, hub: null, subcategory: null, attractionSlug: null };
  } else if (path.includes('/directory')) {
    return { page: 'directory' as const, zoneId: null, hub: null, subcategory: null, attractionSlug: null };
  }

  return { page: 'home' as const, zoneId: null, hub: null, subcategory: null, attractionSlug: null };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction'>(() => {
    return parseRoute().page;
  });

  const [toursZoneId, setToursZoneId] = useState<string | null>(() => {
    return parseRoute().zoneId;
  });

  const [categoryHub, setCategoryHub] = useState<string | null>(() => {
    return parseRoute().hub;
  });

  const [categorySubcategory, setCategorySubcategory] = useState<string | null>(() => {
    return parseRoute().subcategory;
  });

  const [attractionSlug, setAttractionSlug] = useState<string | null>(() => {
    return parseRoute().attractionSlug;
  });

  const [isTopBarCollapsed, setIsTopBarCollapsed] = useState(false);
  const [userManuallyToggled, setUserManuallyToggled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (userManuallyToggled) return;
      const scrollY = window.scrollY;
      // Auto collapse if scrolled down, auto expand if at the top
      if (scrollY > 50) {
        setIsTopBarCollapsed(true);
      } else {
        setIsTopBarCollapsed(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userManuallyToggled, currentPage]);

  React.useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRoute();
      setCurrentPage(parsed.page);
      setToursZoneId(parsed.zoneId);
      setCategoryHub(parsed.hub);
      setCategorySubcategory(parsed.subcategory);
      setAttractionSlug(parsed.attractionSlug);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleNavigate = (
    page: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction', 
    zoneId?: string | null,
    hubId?: string | null,
    subId?: string | null,
    extraId?: string | null
  ) => {
    setCurrentPage(page);
    setToursZoneId(zoneId !== undefined ? zoneId : null);
    setCategoryHub(hubId !== undefined ? hubId : null);
    setCategorySubcategory(subId !== undefined ? subId : null);
    setAttractionSlug(extraId !== undefined ? extraId : null);
    try {
      if (page === 'attraction') {
        window.history.pushState(null, '', `/places/${extraId || zoneId}/`);
      } else if (page === 'cabo-passport') {
        window.history.pushState(null, '', '/cabo-passport/');
      } else if (page === 'tours') {
        if (zoneId) {
          window.history.pushState(null, '', `/${zoneId}/tours/`);
        } else {
          window.history.pushState(null, '', '/tours/');
        }
      } else if (page === 'zone') {
        if (zoneId) {
          window.history.pushState(null, '', `/${zoneId}/`);
        } else {
          window.history.pushState(null, '', '/');
        }
      } else if (page === 'category-list') {
        if (zoneId) {
          if (subId) {
            window.history.pushState(null, '', `/${zoneId}/${hubId}/${subId}/`);
          } else {
            window.history.pushState(null, '', `/${zoneId}/${hubId}/`);
          }
        } else {
          window.history.pushState(null, '', `/${hubId}/`);
        }
      } else if (page === 'home') {
        window.history.pushState(null, '', '/');
      } else {
        window.history.pushState(null, '', '/directory');
      }
    } catch (e) {
      // Ignored gracefully if history pushState is sandboxed
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [activeDomain, setActiveDomain] = useState<DomainType>('tours');
  const [activeTourType, setActiveTourType] = useState<TourTypeId>('adventure');
  const [activeTab, setActiveTab] = useState<string>('overview');

  const config = tourTypeConfigs[activeTourType];
  const detail = tourDetails[activeTourType];

  const handleDomainChange = (domain: DomainType) => {
    setActiveDomain(domain);
    const firstItemOfDomain = domainListingGroups[domain][0];
    setActiveTourType(firstItemOfDomain);
    
    // Scroll up so they can examine the hero gallery easily
    const gallery = document.getElementById('wic-hero-gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categoryLabelMap: Record<string, string> = {
    adventure: 'Adventure',
    water: 'Water',
    sunset: 'Sunset',
    cultural: 'Cultural',
    fishing: 'Fishing',
    whakesharks: 'Whale Sharks',
    finedining: 'Gastronomy',
    beachside: 'Beach Club',
    organicfarm: 'Farm-to-Table',
    beachresort: 'Resort Stay',
    luxuryvilla: 'Private Villa',
    boutiqueart: 'Boutique Hotel'
  };

  const categoryLabel = categoryLabelMap[activeTourType] || 'Adventure';
  const shortTourTitle = detail?.title ? detail.title.split(':')[0] : 'Cabo';

  const itineraryLabelMap: Record<DomainType, string> = {
    tours: 'Itinerary',
    restaurants: 'Dining Sequence',
    hotels: 'Stay Routine'
  };
  const itineraryTabLabel = itineraryLabelMap[activeDomain];

  // Helper to scroll to standard sections on listing
  const scrollToSection = (id: string, tabName?: any) => {
    if (tabName) {
      setActiveTab(tabName);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7]/30 flex flex-col font-sans text-[#1B3A5B] antialiased selection:bg-[#2E8B8B]/10 selection:text-[#2E8B8B]">
      
      {/* Scroll-sticky wrapper for administrative actions and brand header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-white transition-all duration-300 animate-fade-in" id="wic-fixed-header-top-group">
        {/* 0. Top Admin Quick Listings previewer bar */}
        <TopListingsBar 
          onSelectDomainListing={(domain) => {
            handleDomainChange(domain);
            handleNavigate('directory');
          }}
          activeDomain={activeDomain}
          currentPage={currentPage}
          isCollapsed={isTopBarCollapsed}
          onToggleCollapse={() => {
            setIsTopBarCollapsed(!isTopBarCollapsed);
            setUserManuallyToggled(true);
          }}
        />

        {/* 1. What's in Cabo Core Brand Header */}
        <Header currentPage={currentPage} categoryHub={categoryHub} onNavigate={handleNavigate} />
      </div>

      {/* Main pages scroll container with custom top padding offset of the sticky headers */}
      <div 
        className={`flex-grow flex flex-col transition-all duration-300 ${
          !isTopBarCollapsed 
            ? "pt-[168px] sm:pt-[118px] md:pt-[112px]" 
            : "pt-[140px] sm:pt-[110px] md:pt-[100px]"
        }`} 
        id="wic-main-pages-viewport"
      >
        {currentPage === 'cabo-passport' ? (
        <CaboPassport onNavigateHome={() => handleNavigate('home')} />
      ) : currentPage === 'home' ? (
        <Home 
          onNavigateDetail={(domain, id) => {
            setActiveDomain(domain);
            setActiveTourType(id);
            handleNavigate('directory');
          }}
          onNavigateCategory={(domain, hubId, subId, zoneId) => {
            if (hubId === 'tours' && !subId) {
              handleNavigate('tours', zoneId);
            } else if (hubId) {
              handleNavigate('category-list', zoneId, hubId, subId);
            } else {
              handleDomainChange(domain);
              handleNavigate('directory');
            }
          }}
          onNavigatePassport={() => {
            handleNavigate('cabo-passport');
          }}
          onNavigateZone={(zoneId) => {
            handleNavigate('zone', zoneId);
          }}
          onNavigateAttraction={(slug) => {
            handleNavigate('attraction', null, null, null, slug);
          }}
        />
      ) : currentPage === 'tours' ? (
        <ToursHub 
          toursZoneId={toursZoneId}
          onNavigateZone={(zoneId) => {
            handleNavigate('tours', zoneId);
          }}
          onNavigateDetail={(domain, id) => {
            setActiveDomain(domain);
            setActiveTourType(id);
            handleNavigate('directory');
          }}
          onNavigateCategory={(domain, hubId, subId, zoneId) => {
            if (hubId === 'tours' && !subId) {
              handleNavigate('tours', zoneId);
            } else if (hubId) {
              handleNavigate('category-list', zoneId, hubId, subId);
            } else {
              handleDomainChange(domain);
              handleNavigate('directory');
            }
          }}
          onNavigatePassport={() => {
            handleNavigate('cabo-passport');
          }}
        />
      ) : currentPage === 'zone' && toursZoneId ? (
        <ZoneArea 
          zoneId={toursZoneId}
          onNavigateDetail={(domain, id) => {
            setActiveDomain(domain);
            setActiveTourType(id);
            handleNavigate('directory');
          }}
          onNavigateCategory={(domain, hubId, subId, zoneId) => {
            if (hubId === 'tours' && !subId) {
              handleNavigate('tours', zoneId);
            } else if (hubId) {
              handleNavigate('category-list', zoneId, hubId, subId);
            } else {
              handleDomainChange(domain);
              handleNavigate('directory');
            }
          }}
          onNavigatePassport={() => {
            handleNavigate('cabo-passport');
          }}
          onNavigateZone={(zoneId) => {
            handleNavigate('zone', zoneId);
          }}
          onNavigateAttraction={(slug) => {
            handleNavigate('attraction', null, null, null, slug);
          }}
        />
      ) : currentPage === 'category-list' ? (
        <CategoryList 
          initialZoneId={toursZoneId}
          initialHub={categoryHub}
          initialSubcategory={categorySubcategory}
          onNavigateDetail={(domain, id) => {
            setActiveDomain(domain);
            setActiveTourType(id);
            handleNavigate('directory');
          }}
          onNavigatePassport={() => {
            handleNavigate('cabo-passport');
          }}
          onNavigateZone={(zoneId) => {
            handleNavigate('zone', zoneId);
          }}
          onNavigateHome={() => {
            handleNavigate('home');
          }}
        />
      ) : currentPage === 'attraction' ? (
        <AttractionPage 
          attractionSlug={attractionSlug || ''} 
          onNavigate={handleNavigate} 
        />
      ) : (
        (!config || !detail) ? (
          <div className="p-16 text-center text-red-500 font-extrabold flex-1 flex flex-col justify-center items-center bg-[#fdfbf7]/50 select-none">
            <ShieldCheck className="w-12 h-12 text-[#2E8B8B] mb-2" />
            <p className="text-sm">Vetted Listing Not Found.</p>
            <button onClick={() => handleNavigate('home')} className="mt-4 bg-[#1B3A5B] text-white px-4 py-2 rounded-xl text-xs font-bold">Go back Home</button>
          </div>
        ) : (
          <>
          {/* Directory Category Switcher Tabs - Modern, elegant, high density with count badges */}
          <div className="bg-[#FAF7F0] border-b border-gray-200/80" id="domain-category-selector">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#2E8B8B]">
                Exclusive Cabo Directory
              </span>
              <h3 className="text-sm font-sans font-extrabold text-[#1B3A5B] tracking-tight">
                Switch between curated listings and custom behavioral filters:
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleDomainChange('tours')}
                className={`flex items-center gap-2 px-3.5 py-1.5 md:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeDomain === 'tours'
                    ? 'bg-[#1B3A5B] text-white shadow-md ring-1 ring-white/15'
                    : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>Tours & Safaris</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeDomain === 'tours' ? 'bg-[#C9A961]/25 text-[#C9A961]' : 'bg-gray-100 text-gray-500'
                }`}>6</span>
              </button>

              <button
                onClick={() => handleDomainChange('restaurants')}
                className={`flex items-center gap-2 px-3.5 py-1.5 md:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeDomain === 'restaurants'
                    ? 'bg-[#1B3A5B] text-white shadow-md ring-1 ring-white/15'
                    : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>Gastronomy</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeDomain === 'restaurants' ? 'bg-[#C9A961]/25 text-[#C9A961]' : 'bg-gray-100 text-gray-500'
                }`}>3</span>
              </button>

              <button
                onClick={() => handleDomainChange('hotels')}
                className={`flex items-center gap-2 px-3.5 py-1.5 md:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeDomain === 'hotels'
                    ? 'bg-[#1B3A5B] text-white shadow-md ring-1 ring-white/15'
                    : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                <Hotel className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>Resorts & Villas</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeDomain === 'hotels' ? 'bg-[#C9A961]/25 text-[#C9A961]' : 'bg-gray-100 text-gray-500'
                }`}>3</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive CRO & Design Controller panel */}
      <CROPillBar 
        activeType={activeTourType} 
        onChangeType={(newType) => {
          setActiveTourType(newType);
          // Scroll up so they can examine the hero gallery easily
          const gallery = document.getElementById('wic-hero-gallery');
          if (gallery) gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        allowedTypes={domainListingGroups[activeDomain]}
        activeDomain={activeDomain}
      />

      {/* 3. Hero Visual Section: Title, Badges & Interactive Image Gallery Grid */}
      <ImageGallery 
        images={detail.images} 
        tourTitle={detail.title}
        price={detail.price}
        discountedPrice={detail.discountedPrice}
        operatorBadge={detail.operatorBadge}
        rating={detail.operatorRating}
        reviewsCount={detail.operatorReviewsCount}
        categoryLabel={categoryLabel}
        shortTourTitle={shortTourTitle}
        activeDomain={activeDomain}
      />

      {/* 4. Tab Navigation (Overview | Timeline / Sequence | Reviews | Location | Operator) */}
      <div className="bg-[#fdfbf7] border-y border-gray-200/60 sticky top-14 z-30 shadow-xs" id="listing-tab-nav">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start overflow-x-auto gap-1 sm:gap-2 h-11 md:h-12 scrollbar-hidden">
          
          {(() => {
            const currentTabs = activeDomain === 'tours' ? [
              { id: 'overview', label: 'Overview', icon: <Info className="w-3.5 h-3.5 shrink-0" />, targetId: 'about-narrative-container' },
              { id: 'itinerary', label: 'Itinerary', icon: <Calendar className="w-3.5 h-3.5 shrink-0" />, targetId: 'wic-itinerary-section' },
              { id: 'reviews', label: `Reviews (${detail.operatorReviewsCount})`, icon: <HelpCircle className="w-3.5 h-3.5 shrink-0" />, targetId: 'wic-reviews-section' },
              { id: 'location', label: 'Location & Must Know', icon: <Map className="w-3.5 h-3.5 shrink-0" />, targetId: 'location-map-card' }
            ] : activeDomain === 'restaurants' ? [
              { id: 'overview', label: 'Overview', icon: <Info className="w-3.5 h-3.5 shrink-0" />, targetId: 'about-narrative-container' },
              { id: 'menu', label: 'Menu (PDF)', icon: <FileText className="w-3.5 h-3.5 shrink-0" />, targetId: 'wic-menu-section' },
              { id: 'reviews', label: `Reviews (${detail.operatorReviewsCount})`, icon: <HelpCircle className="w-3.5 h-3.5 shrink-0" />, targetId: 'wic-reviews-section' },
              { id: 'location', label: 'Location & Must Know', icon: <Map className="w-3.5 h-3.5 shrink-0" />, targetId: 'location-map-card' }
            ] : [
              { id: 'overview', label: 'Overview', icon: <Info className="w-3.5 h-3.5 shrink-0" />, targetId: 'about-narrative-container' },
              { id: 'rooms', label: 'Rooms', icon: <Hotel className="w-3.5 h-3.5 shrink-0" />, targetId: 'wic-rooms-section' },
              { id: 'reviews', label: `Reviews (${detail.operatorReviewsCount})`, icon: <HelpCircle className="w-3.5 h-3.5 shrink-0" />, targetId: 'wic-reviews-section' },
              { id: 'location', label: 'Location & Must Know', icon: <Map className="w-3.5 h-3.5 shrink-0" />, targetId: 'location-map-card' },
              { id: 'amenities', label: 'Amenities', icon: <Sparkles className="w-3.5 h-3.5 shrink-0" />, targetId: 'wic-amenities-section' }
            ];

            return currentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.targetId, tab.id)}
                className={`px-4 h-full text-xs md:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'border-[#2E8B8B] text-[#2E8B8B] bg-[#2E8B8B]/5'
                    : 'border-transparent text-gray-500 hover:text-[#1B3A5B] hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ));
          })()}

        </div>
      </div>

      {/* MAIN LAYOUT STRUCTURE */}
      {/* 2-Column Responsive Layout: Left columns is 7/12 main details, Right Column is 5/12 sticky widget */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full" id="main-content-flow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT MAIN DETAILS COLUMN (7/12 width) */}
          <div className="lg:col-span-7 space-y-8" id="listing-left-column">
            
            {/* Dynamic Segment Trust Badge (Fulfills Trust Transfer Principle) */}
            <div className="bg-[#2E8B8B]/5 border border-[#2E8B8B]/25 rounded-2xl p-4 flex items-start gap-3">
              <div className="bg-[#2E8B8B] text-white p-2.5 rounded-xl shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#C9A961]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider">
                  Verified Safety & Quality Audit
                </span>
                <h4 className="text-sm font-extrabold text-[#1B3A5B] mt-0.5">
                  Anxiety Safe Guarantee for {config.label}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                  {config.trustSignals.map((signal, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span className="truncate">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* About / Description (Reciprocity: Show value before demanding actions) */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4" id="about-narrative-container">
              <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B] border-b border-gray-50 pb-3">
                About This Experience
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {detail.aboutText}
              </p>
              
              {/* Highlights List Section */}
              <div className="bg-gray-50/50 rounded-xl p-4 space-y-3 border border-gray-100 mt-4">
                <h3 className="text-xs font-mono font-extrabold text-[#1B3A5B] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="text-[#C9A961] w-4 h-4 animate-spin-slow" />
                  Key Experience Highlights
                </h3>
                <ul className="space-y-2">
                  {detail.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="p-0.5 bg-[#2E8B8B]/10 text-[#2E8B8B] rounded-full shrink-0 mt-0.5 font-bold">
                        ✓
                      </span>
                      <span className="leading-relaxed font-sans font-medium">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5. Dynamic Details Block (Timeline for Tours, Menu/Dishes for Restaurants, Rooms/Amenities for Hotels) */}
            {activeDomain === 'tours' && (
              <Itinerary timeline={detail.itinerary} duration={detail.duration} />
            )}

            {activeDomain === 'restaurants' && (
              <RestaurantMenuAndDishes 
                pdfMenuUrl={detail.pdfMenuUrl || ''} 
                bestDishes={detail.bestDishes || []} 
                restaurantName={detail.operatorName} 
              />
            )}

            {activeDomain === 'hotels' && (
              <HotelRoomsAndAmenities 
                roomTypes={detail.roomTypes || []} 
                amenities={detail.amenities || []} 
                hotelName={detail.operatorName} 
              />
            )}

            {/* 6. Dynamic FAQ accordion with inclusion and exclusion lists */}
            <FAQAccordion faqs={detail.faqs} included={detail.included} excluded={detail.excluded} />

            {/* 6.5 About the Operator */}
            <AboutOperator detail={detail} />

            {/* 7. Comprehensive Reviews area */}
            <Reviews rating={detail.operatorRating} reviewsCount={detail.operatorReviewsCount} operatorName={detail.operatorName} />

          </div>

          {/* RIGHT SIDEBAR COLUMN (5/12 width) */}
          {/* Converts to dynamic bottom sheet layouts on physical mobile touch screen viewports */}
          <div className="lg:col-span-5 space-y-6" id="listing-right-column">
            
            {/* The CRO Multi-step booking disclosure card */}
            <CROForm tourDetail={detail} config={config} activeType={activeTourType} />

            {/* Trust indices group containing hours, indicators, map location, languages etc. */}
            <TrustInfo tourDetail={detail} config={config} />

          </div>

        </div>
      </div>
          </>
        )
      )}
      </div>

      {/* 8. Complementary Food dining suggestion grid & footer elements */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
