import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, ShieldCheck, CheckCircle, ArrowRight, Utensils, 
  Check, ChevronDown, ChevronUp, Lock, Smartphone, MessageSquare, Star
} from 'lucide-react';

interface CaboPassportProps {
  onNavigateHome: () => void;
}

export default function CaboPassport({ onNavigateHome }: CaboPassportProps) {
  // Navigation & Interactive states
  const [travelerSegment, setTravelerSegment] = useState<'solo_couple' | 'group' | 'not_sure'>('solo_couple');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Tab Controls for Partners Section
  const [activeSpotTab, setActiveSpotTab] = useState<'restaurants' | 'activities' | 'beach_clubs' | 'fishing' | 'nightlife'>('restaurants');
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollCarousel = (category: string, direction: 'left' | 'right') => {
    const el = carouselRefs.current[category];
    if (el) {
      const scrollAmount = el.clientWidth * 0.85;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Purchase modal states
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string>('Insider');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerPurchase = (plan: string) => {
    setSelectedPlanName(plan);
    setPurchaseSuccess(false);
    setShowPurchaseModal(true);
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buyerName && buyerEmail) {
      setPurchaseSuccess(true);
    }
  };

  // Partner Spots Data
  const partnerSpotsByCategory = {
    restaurants: [
      {
        name: "Sunset Monalisa",
        category: "Fine Dining",
        badge: "15% OFF TOTAL BILL",
        photo: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Flora Farms",
        category: "Farm-to-Table",
        badge: "COMPLIMENTARY DRINK & STARTER",
        photo: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "El Farallon",
        category: "Cliffside Seafood",
        badge: "FREE GLASS OF PREMIUM CHAMPAGNE",
        photo: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "The Cape Rooftop",
        category: "Rooftop Lounge",
        badge: "20% OFF ARTISANAL DRINKS",
        photo: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      }
    ],
    activities: [
      {
        name: "Cabo Adventures",
        category: "Luxury Sailing",
        badge: "BUY ONE GET ONE FREE (2x1)",
        photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Desert ATV Quest",
        category: "Offroad Safari",
        badge: "BUY ONE GET ONE 50% OFF",
        photo: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Cabo Expeditions",
        category: "Whale Watching",
        badge: "50% OFF TOURS",
        photo: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      }
    ],
    beach_clubs: [
      {
        name: "Taboo Beach Club",
        category: "Premium Beach Club",
        badge: "COMPLIMENTARY ENTRY & SHOTS",
        photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Surf Club Cabo",
        category: "Relaxed Beach Lounge",
        badge: "15% OFF DAY PASSES",
        photo: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Blue Marlin Ibiza",
        category: "Luxury Day Club",
        badge: "FREE SUNBED UPGRADE",
        photo: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      }
    ],
    fishing: [
      {
        name: "Cabo Blue Water Charters",
        category: "Deep Sea Fishing",
        badge: "$100 OFF EXCURSIONS",
        photo: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Solmar Sportfishing",
        category: "Private Outing",
        badge: "COMPLIMENTARY TACKLE UPGRADE",
        photo: "https://images.unsplash.com/photo-1499244015905-ac7481000a2b?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Reel Baja Charters",
        category: "Light Tackle",
        badge: "20% OFF HALF-DAY TRIPS",
        photo: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      }
    ],
    nightlife: [
      {
        name: "Squid Roe",
        category: "Iconic Party Hub",
        badge: "2-FOR-1 WELCOME DRINKS",
        photo: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Mandala Cabo",
        category: "VIP Clubbing",
        badge: "COMPLIMENTARY EXPRESS ENTRY",
        photo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      },
      {
        name: "Coco Bongo Cabo",
        category: "High Energy Show",
        badge: "15% OFF VIP SHOW TICKETS",
        photo: "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?auto=format&fit=crop&w=600&q=80",
        wicLink: "#"
      }
    ]
  };

  const faqListByOrder = [
    {
      question: "How do I receive my Passport after purchase?",
      answer: "Your Passport arrives by email instantly as a high-resolution PDF with your unique QR code. You can save it to your Apple Wallet, Google Pay, or keep it inside your email. No physical card or download of any separate mobile app is required."
    },
    {
      question: "Can I use it at multiple venues on the same day?",
      answer: "Absolutely! There are no daily limits or restrictions on how many different partner venues you can dine at, book, or visit in a single day."
    },
    {
      question: "Does it work in San José del Cabo too?",
      answer: "Yes, our certified partner venues cover Cabo San Lucas, the Tourist Corridor, and San José del Cabo, giving you full coverage of the entire destination."
    },
    {
      question: "How many people does one pass cover?",
      answer: "The Lite and Insider passes are designed for individual use. The Group Pass is designed to cover a family or travel party of 3 to 4 people, making it highly cost-effective for families."
    },
    {
      question: "What if a venue doesn't honor the discount?",
      answer: "Our partner contracts are legally binding and active year-round. In the extremely rare event that an issue arises on-site, simply text our WhatsApp guest concierge support line instantly, and we will contact the restaurant manager to resolve it for you in real-time."
    },
    {
      question: "Can I buy it for someone else as a gift?",
      answer: "Yes. Simply input their full name and email address in the fields during secure checkout, or buy it under your own name and forward the QR email to them. The pass activates only on first use."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B3A5B] font-sans antialiased selection:bg-[#2E8B8B]/10 selection:text-[#2E8B8B]" id="cabo-passport-page">
      
      {/* ================= BREADCRUMB STRIP ================= */}
      <div className="bg-gray-50 border-b border-gray-100 py-3" id="passport-breadcrumbs">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-xs text-gray-550 font-medium">
          <button onClick={onNavigateHome} className="hover:text-[#2E8B8B] hover:underline cursor-pointer bg-transparent border-0 p-0">
            Home
          </button>
          <span className="text-gray-300">&gt;</span>
          <span className="text-[#1B3A5B] font-semibold">Cabo Passport</span>
        </div>
      </div>

      {/* ================= FIX 1 — HERO (Orientation) ================= */}
      <section 
        className="relative bg-gradient-to-r from-[#0C1E32] to-[#1B3A5B] text-white py-20 lg:py-28 overflow-hidden flex items-center justify-center"
        id="passport-hero"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1920&q=80" 
            alt="Beautiful seascape of Los Cabos ocean cliffs and yachting waters"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0C1E32]/65" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#C9A961] uppercase tracking-[0.15em] block">
              FOR SMART TRAVELERS
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Stop overpaying in Cabo.
            </h1>
          </div>

          <p className="text-sm md:text-lg text-gray-200/95 max-w-2xl mx-auto leading-relaxed">
            The Cabo Passport gives you exclusive access to 50+ restaurants, beach clubs and experiences — the same spots WiC locals actually go to.
          </p>

          <div className="pt-4 flex flex-col items-center justify-center gap-5">
            <button
              onClick={() => scrollToId('passport-pricing')}
              className="bg-[#C9A961] hover:bg-[#b0914e] text-[#1B3A5B] font-black text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-lg active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
            >
              FIND MY PLAN →
            </button>
          </div>

          {/* Trust strip */}
          <div className="pt-8 border-t border-white/15 max-w-xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-200 font-medium">
              <span>Starts at $29</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span>50+ certified venues</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span>Avg. $180 saved</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span>Instant delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FIX 2 — HOW IT WORKS (Comprehension) ================= */}
      <section className="py-20 bg-[#F0FAF9]" id="passport-how-it-works">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-1 mb-12">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.1em] block">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] leading-[32px]">
              Three steps to saving in Cabo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center text-[#2E8B8B]">
                <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="16" width="16" height="26" rx="2" />
                  <rect x="24" y="10" width="16" height="26" rx="2" strokeWidth="2.5" />
                  <rect x="42" y="16" width="16" height="26" rx="2" />
                  <path d="M32 46 v-6" />
                  <path d="M28 44 l4 -4 l4 4" />
                  <path d="M24 54 c2 -4 4 -6 8 -8 c4 2 6 4 8 8" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#1B3A5B] font-sans">Choose your plan</h3>
              <p className="text-sm text-gray-550 leading-relaxed max-w-xs">
                Pick the pass that fits your trip. Standard Lite, fully equipped Insider, or Group structure.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center text-[#2E8B8B]">
                <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="18" y="4" width="28" height="56" rx="4" />
                  <line x1="28" y1="8" x2="36" y2="8" />
                  <rect x="24" y="16" width="16" height="16" rx="1" />
                  <rect x="26" y="18" width="4" height="4" />
                  <rect x="34" y="18" width="4" height="4" />
                  <rect x="26" y="26" width="4" height="4" />
                  <rect x="34" y="26" width="2" height="2" />
                  <rect x="36" y="28" width="2" height="2" />
                  <line x1="24" y1="42" x2="40" y2="42" />
                  <line x1="24" y1="48" x2="36" y2="48" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#1B3A5B] font-sans">Get instant access</h3>
              <p className="text-sm text-gray-550 leading-relaxed max-w-xs">
                Receive your digital QR code immediately in your inbox. No physical cards or app installs required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center text-[#2E8B8B]">
                <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="52" x2="60" y2="52" />
                  <circle cx="18" cy="22" r="6" />
                  <path d="M8 44 c0 -6 4 -10 10 -10 s10 4 10 10" />
                  <path d="M48 34 h8 v14 h-8 z" />
                  <line x1="44" y1="48" x2="48" y2="44" />
                  <rect x="32" y="24" width="10" height="20" rx="1.5" strokeWidth="2" />
                  <path d="M30 40 h2" />
                  <line x1="37" y1="18" x2="37" y2="14" />
                  <line x1="41" y1="21" x2="45" y2="18" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#1B3A5B] font-sans">Show & save</h3>
              <p className="text-sm text-gray-550 leading-relaxed max-w-xs">
                Present your barcode at any of our certified local business partners at checkout and watch the discount apply instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FIX 3 — WHERE YOUR PASSPORT WORKS (Desire) ================= */}
      <section className="py-20 bg-white border-l-4 border-[#2E8B8B]" id="partner-spots-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.1em] block">
              CABO PASSPORT
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] leading-[32px]">
              Where your Passport works
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-sm mx-auto">
              Skip overpriced tourist traps — save at premium local hotspots loved by WiC insiders.
            </p>
          </div>

          {/* Categorized Tabs */}
          <div className="flex flex-wrap justify-center mb-8 max-w-2xl mx-auto gap-2">
            {([
              { id: 'restaurants', label: 'Restaurants' },
              { id: 'activities', label: 'Activities' },
              { id: 'beach_clubs', label: 'Beach Clubs' },
              { id: 'fishing', label: 'Fishing' },
              { id: 'nightlife', label: 'Nightlife' }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSpotTab(tab.id)}
                className={`font-bold text-[11px] uppercase tracking-wider py-2.5 px-5 rounded-full cursor-pointer transition-all ${
                  activeSpotTab === tab.id 
                    ? 'bg-[#2E8B8B] text-white shadow-sm' 
                    : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel Frame */}
          <div className="relative group px-1 sm:px-12">
            {/* Scroll hooks */}
            <button
              onClick={() => scrollCarousel(activeSpotTab, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-650 hover:bg-gray-50 z-20 hidden md:flex cursor-pointer shadow-md text-lg active:scale-95 transition-all -ml-5"
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              onClick={() => scrollCarousel(activeSpotTab, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-650 hover:bg-gray-50 z-20 hidden md:flex cursor-pointer shadow-md text-lg active:scale-95 transition-all -mr-5"
              aria-label="Scroll right"
            >
              ›
            </button>

            {/* Scroll container */}
            <div 
              ref={(el) => { carouselRefs.current[activeSpotTab] = el; }}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth pb-4"
            >
              {partnerSpotsByCategory[activeSpotTab].map((spot, ix) => (
                <div 
                  key={ix}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start group border border-gray-150 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 bg-white flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={spot.photo} 
                      alt={`${spot.name} partner venue in Los Cabos`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#1B3A5B] text-[#C9A961] px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider">
                      {spot.category}
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-extrabold text-[#1B3A5B] font-sans group-hover:text-[#2E8B8B] transition-colors">
                        {spot.name}
                      </h3>
                      <p className="text-xs text-gray-550 leading-relaxed font-sans">
                        Verified member of the exclusive Cabo discount network list.
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="bg-[#2E8B8B]/10 text-[#2E8B8B] text-[10px] font-black px-2.5 py-1 rounded">
                        {spot.badge}
                      </span>
                      <span className="text-[11px] font-bold text-[#1B3A5B] hover:underline hover:text-[#2E8B8B] cursor-pointer">
                        WiC Profile →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm font-semibold text-gray-500">
              44 more venues across Los Cabos are supported
            </p>
          </div>
        </div>
      </section>

      {/* ================= FIX 4 — LIFE IN CABO (NEW PHOTO GALLERY) ================= */}
      <section className="py-20 bg-white" id="passport-life-in-cabo">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-10 space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.1em] block">
              LIFE IN CABO
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1B3A5B] leading-tight">
              This is what you're paying for
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=800&h=900&q=80" 
                alt="Aerial view of El Arco, Los Cabos Arch" 
                className="w-full h-[500px] object-fit-cover rounded-lg shadow-sm object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&h=435&q=80" 
                alt="Fine dining plate preparation in Los Cabos" 
                className="w-full h-[242px] object-fit-cover rounded-lg shadow-sm object-cover"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&h=435&q=80" 
                alt="Premium beach club with loungers and umbrellas" 
                className="w-full h-[242px] object-fit-cover rounded-lg shadow-sm object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Group on a whale watching tour catamaran" 
                  className="w-full h-[180px] object-fit-cover rounded-lg shadow-sm object-cover"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Couple dining at night in Cabo" 
                  className="w-full h-[180px] object-fit-cover rounded-lg shadow-sm object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&h=540&q=80" 
                alt="Sunset over the ocean in Los Cabos" 
                className="w-full h-[304px] object-fit-cover rounded-lg shadow-sm object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FIX 7 — TESTIMONIALS (Social Validation) ================= */}
      <section className="relative py-20 bg-[#FDFAF6]" id="passport-testimonials">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" 
            alt="Faded Cabo beach background landscape"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.1em] block">
              TRAVELERS WHO USED IT
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] leading-[32px]">
              What people say
            </h2>
            <p className="text-xs text-gray-500">Read detailed savings reviews published by verified tourists.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between space-y-4 border border-gray-100 shadow-sm relative z-10">
              <div className="space-y-2">
                <div className="text-amber-500 font-sans tracking-tight text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-[10px] text-[#2E8B8B] font-mono font-bold uppercase tracking-wider">
                  SAVED $140 ON RESTAURANTS ALONE
                </p>
                <p className="text-xs md:text-sm text-gray-600 italic font-sans leading-relaxed pt-1">
                  &quot;We used it every single night for dinner. Sunset Monalisa alone saved our group so much that it paid for the whole pass in one night! Worth every penny.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Sarah M." 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-bold text-[#1B3A5B]">Sarah M. — Dallas, TX</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between space-y-4 border border-gray-100 shadow-sm relative z-10">
              <div className="space-y-2">
                <div className="text-amber-500 font-sans tracking-tight text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-[10px] text-[#2E8B8B] font-mono font-bold uppercase tracking-wider">
                  SAVED $210 ON TOURS
                </p>
                <p className="text-xs md:text-sm text-gray-600 italic font-sans leading-relaxed pt-1">
                  &quot;Our family booked the Cabo Adventures luxury sailing package and went with Cabo Blue Water Charters. The buy-one-get-one-free benefits saved our family hundreds instantly!&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="James L." 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-bold text-[#1B3A5B]">James L. — Seattle, WA</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between space-y-4 border border-gray-100 shadow-sm relative z-10">
              <div className="space-y-2">
                <div className="text-amber-500 font-sans tracking-tight text-sm">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-[10px] text-[#2E8B8B] font-mono font-bold uppercase tracking-wider">
                  SAVED $165 ON DINING
                </p>
                <p className="text-xs md:text-sm text-gray-600 italic font-sans leading-relaxed pt-1">
                  &quot;Used the Passport at Flora Farms and El Farallon. Both dinners were spectacular with elite service, and we didn&apos;t have any issues redeeming.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Elena R." 
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-bold text-[#1B3A5B]">Elena R. — Miami, FL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FIX 8 — CHOOSE YOUR CABO PASSPORT (Pricing) ================= */}
      <section className="py-20 bg-white" id="passport-pricing">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.1em] block">
              SELECT YOUR PLAN
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1B3A5B]">
              Choose your Cabo Passport
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch pt-4">
            {/* LITE Card */}
            <div 
              className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between relative shadow-sm transition-all duration-300 order-2 md:order-1"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1B3A5B] uppercase font-mono">LITE</h3>
                  <p className="text-xs text-gray-400 mt-1">Perfect for a 7-day trip</p>
                </div>
                
                <div className="flex items-baseline gap-1 py-3 border-y border-gray-100">
                  <span className="text-3xl font-extrabold text-[#1B3A5B] font-mono">$29</span>
                  <span className="text-[10px] text-gray-450 font-mono uppercase">USD / One-time payment</span>
                </div>

                <ul className="space-y-3 text-xs font-sans text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>7 days coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>50+ certified venues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Basic benefits & discounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Partner map & guides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Digital delivery</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => triggerPurchase('Lite')}
                  className="w-full border-2 border-[#1B3A5B] hover:bg-[#1B3A5B]/5 text-[#1B3A5B] py-3 rounded-lg text-xs font-bold uppercase tracking-wider active:scale-95 transition cursor-pointer"
                >
                  Get Lite Pass →
                </button>
              </div>
            </div>

            {/* INSIDER Card (Visually dominant and stacked first on mobile devices) */}
            <div 
              className="flex-1 bg-white border-2 rounded-2xl p-6 flex flex-col justify-between relative shadow-lg transform transition-all duration-300 md:scale-[1.04] z-10 border-[#C9A961] order-1 md:order-2"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C9A961] text-[#1B3A5B] px-4 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-widest whitespace-nowrap shadow-sm">
                ⭐ MOST POPULAR
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-xl font-bold text-[#1B3A5B] uppercase font-mono">INSIDER</h3>
                  <p className="text-xs text-[#2E8B8B] font-bold mt-1">The complete Cabo experience</p>
                </div>

                <div className="flex items-baseline gap-1 py-3 border-y border-gray-100">
                  <span className="text-4xl font-extrabold text-[#1B3A5B] font-mono leading-none">$49</span>
                  <span className="text-[10px] text-gray-450 font-mono uppercase">USD / One-time payment</span>
                </div>

                <ul className="space-y-3 text-xs font-sans text-gray-600">
                  <li className="flex items-center gap-2 font-bold text-[#1B3A5B]">
                    <Check className="w-4 h-4 text-[#2E8B8B] shrink-0" />
                    <span>Everything in Lite</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E8B8B] shrink-0" />
                    <span>15 days coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E8B8B] shrink-0" />
                    <span>Individual QR code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2E8B8B] shrink-0" />
                    <span>Verified recommendations</span>
                  </li>
                  <li className="flex items-center gap-2 font-semibold text-[#2E8B8B]">
                    <Check className="w-4 h-4 text-[#2E8B8B] shrink-0" />
                    <span>WhatsApp support from local team</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => triggerPurchase('Insider')}
                  className="w-full bg-[#C9A961] hover:bg-[#b0914e] text-[#1B3A5B] font-black py-3 rounded-lg text-xs uppercase tracking-wider shadow active:scale-95 transition cursor-pointer"
                >
                  Get Insider Pass →
                </button>
              </div>
            </div>

            {/* GROUP Card */}
            <div 
              className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between relative shadow-sm transition-all duration-300 order-3 md:order-3"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1B3A5B] uppercase font-mono">GROUP</h3>
                  <p className="text-xs text-gray-400 mt-1">For traveling parties of 3-4</p>
                </div>

                <div className="flex items-baseline gap-1 py-3 border-y border-gray-100">
                  <span className="text-3xl font-extrabold text-[#1B3A5B] font-mono">$99</span>
                  <span className="text-[10px] text-gray-450 font-mono uppercase">USD / One-time payment</span>
                </div>

                <ul className="space-y-3 text-xs font-sans text-gray-600">
                  <li className="flex items-center gap-2 font-bold text-[#1B3A5B]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Everything in Insider</span>
                  </li>
                  <li className="flex items-center gap-2 font-semibold text-[#2E8B8B]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>15 days coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Group benefits (3-4 people)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trip planning coordinates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Coordinated local bookings</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => triggerPurchase('Group')}
                  className="w-full border-2 border-[#1B3A5B] hover:bg-[#1B3A5B]/5 text-[#1B3A5B] py-3 rounded-lg text-xs font-bold uppercase tracking-wider active:scale-95 transition cursor-pointer"
                >
                  Get Group Pass →
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-[13px] text-gray-500 font-medium tracking-normal mt-10">
            🔒 Instant digital delivery · No shipping required · One-time payment
          </p>
        </div>
      </section>

      {/* ================= Everything's taken care of (Guarantee) ================= */}
      <section className="py-20 bg-[#F0FAF9]" id="passport-guarantee">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="space-y-1 mb-12">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.1em] block">
              OUR GUARANTEE
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1B3A5B]">
              Everything's taken care of
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-150 flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#2E8B8B]/10 flex items-center justify-center text-[#2E8B8B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-[#1B3A5B]">We've got your back</h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs font-sans">
                If a venue doesn't honor your discount, we'll sort it out. Just message us.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-150 flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#2E8B8B]/10 flex items-center justify-center text-[#2E8B8B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-[#1B3A5B]">Secure checkout</h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs font-sans">
                SSL encrypted payment. All major cards and Apple Pay accepted.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-150 flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#2E8B8B]/10 flex items-center justify-center text-[#2E8B8B]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E8B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-[#1B3A5B]">Real local support</h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs font-sans">
                Stuck on anything? Our Cabo team is one WhatsApp message away during your whole trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUESTIONS BEFORE YOU BUY (Objection Handling / FAQ) ================= */}
      <section className="py-20 bg-white" id="passport-faq-accordion">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.1em] block">
              FAQ - CABO PASSPORT
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1B3A5B]">
              Questions before you buy
            </h2>
            <p className="text-xs text-gray-550">Everything you need to know about activation, coverage, and billing.</p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {faqListByOrder.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 bg-white"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 font-bold text-[#1B3A5B] text-sm md:text-base flex justify-between items-center hover:bg-gray-50 transition cursor-pointer bg-transparent border-0"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#2E8B8B] shrink-0 ml-4">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 text-xs md:text-sm text-gray-500 leading-relaxed border-t border-gray-150 bg-[#FBFBFC]">
                          {faq.answer}
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
      {/* ================= FIX 10 — FINAL CTA (Final Push) ================= */}
      <section 
        className="relative bg-[#0C1E32] text-white py-24 text-center overflow-hidden" 
        id="passport-final-cta"
      >
        <div className="relative z-10 max-w-2xl mx-auto px-4 space-y-6">
          <span className="text-[11px] font-mono font-bold text-[#C9A961] uppercase tracking-[0.1em] block">
            DON'T LEAVE MONEY IN CABO
          </span>
          <h2 className="text-3xl md:text-[32px] font-bold tracking-tight text-white leading-tight">
            You've planned the perfect trip. Don't pay full price for it.
          </h2>
          <div className="pt-4">
            <button
              onClick={() => triggerPurchase('Insider')}
              className="bg-[#C9A961] hover:bg-[#b0914e] text-[#1B3A5B] font-black tracking-wider uppercase px-10 py-4 rounded-lg shadow-xl active:scale-95 transition-all w-full sm:w-auto cursor-pointer text-xs md:text-sm"
            >
              Get my Cabo Passport →
            </button>
          </div>
          <p className="text-xs text-gray-300 font-mono">
            Instant delivery · Starts at $29 · One-time payment
          </p>
        </div>
      </section>

      {/* ================= SECTION 11 — PLAN SMARTER (Blog SEO Topical Authority) ================= */}
      <section className="py-20 bg-[#F9F7F3]" id="passport-authority-guides">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#2E8B8B] uppercase tracking-[0.15em] block">
              TRAVEL GUIDES
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3A5B] leading-[32px]">
              Plan smarter
            </h2>
            <p className="text-xs text-gray-550">Expert advice directly from What&apos;s in Cabo travel scouts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Guide Card 1 */}
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-250 flex flex-col group">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80" 
                  alt="Los Cabos seashore rocks and safe waves" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider block">
                    Safety & Prep
                  </span>
                  <h4 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors">
                    Is Cabo San Lucas Safe? Complete Guide 2026
                  </h4>
                  <p className="text-[11px] text-gray-405 font-sans line-clamp-3 leading-relaxed">
                    A thorough overview of safety levels, beaches, transport fees, and guidelines from expert residents.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-50 flex justify-end">
                  <span className="text-[10px] uppercase font-bold text-[#1B3A5B] group-hover:underline inline-flex items-center gap-1">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-250 flex flex-col group">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" 
                  alt="Sunny shoreline ocean landscape" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider block">
                    Seas & Seasons
                  </span>
                  <h4 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors">
                    Best Time to Visit Cabo San Lucas
                  </h4>
                  <p className="text-[11px] text-gray-405 font-sans line-clamp-3 leading-relaxed">
                    A season-by-season guide to budgeting tour bookings, whale migration occurrences, and weather expectations.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-50 flex justify-end">
                  <span className="text-[10px] uppercase font-bold text-[#1B3A5B] group-hover:underline inline-flex items-center gap-1">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-250 flex flex-col group">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80" 
                  alt="Palm trees beach tropical resort" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider block">
                    Destinations
                  </span>
                  <h4 className="text-sm font-extrabold text-[#1B3A5B] group-hover:text-[#2E8B8B] transition-colors">
                    Cabo vs Cancun — Which Is Better?
                  </h4>
                  <p className="text-[11px] text-gray-450 font-sans line-clamp-3 leading-relaxed">
                    Comparing activities, sand density, flight connections, dining price charts, and general costs.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-50 flex justify-end">
                  <span className="text-[10px] uppercase font-bold text-[#1B3A5B] group-hover:underline inline-flex items-center gap-1">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECURE CHECKOUT / MODAL POPUP (AUTOMATED SIMULATED ENGINE) ================= */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl border border-gray-150">
            
            <button 
              onClick={() => setShowPurchaseModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold p-1 rounded-full text-xs font-mono cursor-pointer bg-transparent border-0"
            >
              [ Close ]
            </button>

            {!purchaseSuccess ? (
              <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-[#2E8B8B]">
                  <Compass className="w-5 h-5 animate-spin" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest block">
                    Secured Checkout
                  </span>
                </div>
                
                <div>
                  <h3 className="text-base font-bold text-[#1B3A5B]">
                    Secure your Cabo Passport ({selectedPlanName} Plan)
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-1">
                    Instant digital QR barcode delivery. Save up to hundreds at Cabo&apos;s leading spots starting on day one.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-450 uppercase mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-450 uppercase mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@example.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2E8B8B]"
                    />
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-100 p-3 rounded-lg flex gap-2 items-start text-teal-800 text-[10px] font-sans text-left">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>Secure automated provisioning. Full satisfaction guaranteed. If you don&apos;t save more than the pass value, contact our staff.</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1B3A5B] hover:bg-[#203c5b] text-[#C9A961] py-3 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer shadow"
                  >
                    Complete Booking & Activate
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto text-[#2E8B8B]">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#1B3A5B]">
                    Passport Provisioned Successfully!
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    A private digital barcode for <span className="font-bold underline">{selectedPlanName} Plan</span> has been dispatched to {buyerName} at <span className="font-bold">{buyerEmail}</span>. Simply show this to your waiter/guide during your trip.
                  </p>
                </div>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setShowPurchaseModal(false);
                      onNavigateHome();
                    }}
                    className="bg-[#2E8B8B] hover:bg-[#256e6e] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer w-full"
                  >
                    Explore Cabo Travel Guide
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
