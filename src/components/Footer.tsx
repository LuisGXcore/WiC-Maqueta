import React, { useState } from 'react';
import { 
  Compass, Mail, ChevronUp, Facebook, Instagram, Youtube, 
  Send, ShieldCheck
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (
    page: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction',
    zoneId?: string | null,
    hubId?: string | null,
    subId?: string | null,
    extraId?: string | null
  ) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSignedUp(true);
      setEmail('');
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent, 
    page: 'home' | 'directory' | 'cabo-passport' | 'tours' | 'zone' | 'category-list' | 'attraction',
    zoneId?: string | null,
    hubId?: string | null,
    subId?: string | null,
    extraId?: string | null
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, zoneId, hubId, subId, extraId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAFBF9] border-t border-gray-200 text-gray-700 pt-16 pb-8 relative z-30" id="wic-footer">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Main Columns Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16">
          
          {/* Column 1: Brand Info (4/12 width on large screens) */}
          <div className="lg:col-span-3 space-y-6">
            <div 
              onClick={(e) => handleLinkClick(e, 'home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="p-1 bg-[#2E8B8B]/10 rounded-lg text-[#2E8B8B]">
                <Compass className="w-6 h-6 transition-transform group-hover:rotate-45" />
              </div>
              <span className="font-extrabold font-sans text-xl tracking-tight text-[#1D3E42]">
                What's<span className="text-[#2E8B8B] font-medium text-xs block -mt-1 font-mono tracking-widest uppercase">in Cabo</span>
              </span>
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Your guide to the best experiences, services and places in Los Cabos. Discover. Connect. Enjoy.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com/whatsincabo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2E8B8B] hover:border-[#2E8B8B] transition-all bg-white"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com/whatsincabo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2E8B8B] hover:border-[#2E8B8B] transition-all bg-white"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com/@whatsincabo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2E8B8B] hover:border-[#2E8B8B] transition-all bg-white"
                title="TikTok"
              >
                {/* Custom Inline SVG for TikTok */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.2-.15-.39-.32-.57-.49-.1-.08-.12.1-.12.16v6.2c-.03 2.44-.74 4.96-2.52 6.64-1.8 1.68-4.43 2.37-6.84 2.1-2.92-.3-5.63-2.39-6.37-5.26-.88-3.37.59-7.23 3.65-8.72 1.34-.65 2.87-.85 4.34-.61v4.09c-.84-.25-1.78-.17-2.52.28-.99.58-1.52 1.76-1.34 2.89.2 1.19 1.25 2.11 2.46 2.16 1.43.08 2.67-.93 2.89-2.35.03-.22.04-.44.04-.66V.02z" />
                </svg>
              </a>
              <a 
                href="https://youtube.com/@whatsincabo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2E8B8B] hover:border-[#2E8B8B] transition-all bg-white"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="mailto:hello@whatsincabo.com" 
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2E8B8B] hover:border-[#2E8B8B] transition-all bg-white"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columns 2-5: Nav Columns (6/12 width total) */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            
            {/* Column 2.1: EXPLORE (All of our Category Hubs) */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-black tracking-widest text-[#1D3E42] uppercase">
                Explore
              </h4>
              <ul className="space-y-2.5 text-[13px] font-medium text-gray-500">
                <li>
                  <a 
                    href="/restaurants/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'category-list', null, 'restaurants')}
                  >
                    Restaurants
                  </a>
                </li>
                <li>
                  <a 
                    href="/tours/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'tours')}
                  >
                    Tours & Activities
                  </a>
                </li>
                <li>
                  <a 
                    href="/cabo-airport-shuttle/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'category-list', null, 'cabo-airport-shuttle')}
                  >
                    Transportation
                  </a>
                </li>
                <li>
                  <a 
                    href="/yacht-charters/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'category-list', null, 'yacht-charters')}
                  >
                    Yachts & Charters
                  </a>
                </li>
                <li>
                  <a 
                    href="/beach-clubs-cabo/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'category-list', null, 'beach-clubs-cabo')}
                  >
                    Day Passes
                  </a>
                </li>
                <li>
                  <a 
                    href="/golf/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'category-list', null, 'golf')}
                  >
                    Golf Courses
                  </a>
                </li>
                <li>
                  <a 
                    href="/hotels/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'category-list', null, 'hotels')}
                  >
                    Resorts & Hotels
                  </a>
                </li>
                <li>
                  <a 
                    href="/directory/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'directory')}
                  >
                    All Categories
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2.2: POPULAR PLACES (All Zones, no More Places) */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-black tracking-widest text-[#1D3E42] uppercase">
                Popular Places
              </h4>
              <ul className="space-y-2.5 text-[13px] font-medium text-gray-500">
                <li>
                  <a 
                    href="/cabo-san-lucas/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'zone', 'cabo-san-lucas')}
                  >
                    Cabo San Lucas
                  </a>
                </li>
                <li>
                  <a 
                    href="/san-jose-del-cabo/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'zone', 'san-jose-del-cabo')}
                  >
                    San José del Cabo
                  </a>
                </li>
                <li>
                  <a 
                    href="/tourist-corridor/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'zone', 'tourist-corridor')}
                  >
                    Tourist Corridor
                  </a>
                </li>
                <li>
                  <a 
                    href="/todos-santos/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'zone', 'todos-santos')}
                  >
                    Todos Santos
                  </a>
                </li>
                <li>
                  <a 
                    href="/los-barriles/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'zone', 'los-barriles')}
                  >
                    Los Barriles
                  </a>
                </li>
                <li>
                  <a 
                    href="/east-cape/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'zone', 'east-cape')}
                  >
                    East Cape
                  </a>
                </li>
                <li>
                  <a 
                    href="/la-paz/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => handleLinkClick(e, 'zone', 'la-paz')}
                  >
                    La Paz
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2.3: COMPANY */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-black tracking-widest text-[#1D3E42] uppercase">
                Company
              </h4>
              <ul className="space-y-2.5 text-[13px] font-medium text-gray-500">
                <li>
                  <a 
                    href="/about/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="/how-it-works/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a 
                    href="/blog/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2.4: FOR BUSINESSES */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-black tracking-widest text-[#1D3E42] uppercase">
                For Businesses
              </h4>
              <ul className="space-y-2.5 text-[13px] font-medium text-gray-500">
                <li>
                  <a 
                    href="/list-your-business/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    List Your Business
                  </a>
                </li>
                <li>
                  <a 
                    href="/partners/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a 
                    href="/traveldesk/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    TravelDesk
                  </a>
                </li>
                <li>
                  <a 
                    href="/resources/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a 
                    href="/help/" 
                    className="hover:text-[#2E8B8B] transition-colors"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Column 3: GET THE BEST OF LOS CABOS (3/12 width on large screens) */}
          <div className="lg:col-span-3 space-y-4 lg:pl-4 border-t lg:border-t-0 lg:border-l border-gray-200 pt-8 lg:pt-0">
            <h4 className="text-xs font-mono font-black tracking-widest text-[#1D3E42] uppercase">
              Get the best of Los Cabos
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tips, deals and local recommendations straight to your inbox.
            </p>

            {signedUp ? (
              <div className="bg-[#2E8B8B]/10 rounded-xl p-3 text-[#2E8B8B] text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5" />
                <span>Subscribed successfully! See you in your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2E8B8B] focus:border-[#2E8B8B] text-gray-800"
                  />
                  <div className="absolute right-3.5 top-3.5 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-auto bg-[#005151] hover:bg-[#003B3B] text-white px-7 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-97 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar Container */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 relative">
          
          <div>
            &copy; {new Date().getFullYear()} What's in Cabo. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Made with <span className="text-[#2E8B8B]">❤</span> in Los Cabos.</span>
          </div>

          {/* Floating-style absolute Up arrow button */}
          <button
            onClick={scrollToTop}
            className="absolute -top-14 right-4 sm:right-6 w-10 h-10 rounded-full bg-[#005151] text-white border-2 border-white flex items-center justify-center shadow-lg hover:bg-[#206161] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer z-40"
            aria-label="Back to top"
            title="Back to Top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

        </div>

      </div>
    </footer>
  );
}
