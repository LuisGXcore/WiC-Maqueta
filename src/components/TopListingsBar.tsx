import React from 'react';
import { Compass, Utensils, Hotel, Sparkles, ChevronDown, ChevronUp, EyeOff, LayoutTemplate } from 'lucide-react';
import { DomainType } from '../types';

interface TopListingsBarProps {
  onSelectDomainListing: (domain: DomainType) => void;
  activeDomain: DomainType;
  currentPage: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function TopListingsBar({ 
  onSelectDomainListing, 
  activeDomain, 
  currentPage, 
  isCollapsed, 
  onToggleCollapse 
}: TopListingsBarProps) {
  
  if (isCollapsed) {
    return (
      <div 
        className="bg-gradient-to-r from-[#DFAD36] via-[#FAF7F0] to-[#B8860B] text-[#1B3A5B] border-b border-[#B8860B]/30 relative z-50 select-none shadow-sm py-1 px-4 cursor-pointer hover:opacity-95 transition-all duration-300"
        id="wic-top-listings-quickbar-mini"
        onClick={onToggleCollapse}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 h-7">
          
          {/* Elegant Tech indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#1B3A5B]/10 text-[#1B3A5B] text-[9px] font-mono tracking-widest uppercase font-black px-1.5 py-0.5 rounded">
              <Sparkles className="w-2.5 h-2.5 text-[#1B3A5B]" />
              CRO ACTIVE
            </span>
            <p className="text-[10px] sm:text-xs font-sans font-extrabold text-[#1B3A5B]/80 hidden sm:inline">
              Optimized Design System in place. Core customer channels active.
            </p>
          </div>

          {/* Quick CTA to show full control bar */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent duplicate trigger
                onToggleCollapse();
              }}
              className="bg-[#1B3A5B] hover:bg-[#122A42] text-white hover:text-[#F3CE7A] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 duration-150"
            >
              <LayoutTemplate className="w-2.5 h-2.5" />
              <span>MOSTRAR PANEL DESIGN & CRO</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gradient-to-r from-[#DFAD36] via-[#F3CE7A] to-[#B8860B] text-[#1B3A5B] border-b border-[#B8860B]/30 relative z-50 select-none shadow-md py-2.5 px-4 transition-all duration-300"
      id="wic-top-listings-quickbar"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Side: Conversion Indicator */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#1B3A5B]/10 border border-[#1B3A5B]/20 text-[#1B3A5B] text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-black px-2 py-0.5 rounded-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#1B3A5B]" />
            PRO SYSTEM PREVIEW
          </span>
          <p className="text-[11px] sm:text-xs font-sans font-bold text-[#1B3A5B]/90">
            Real-time visual tracking & high-performance customer conversion.
          </p>
        </div>

        {/* Right Side: Primary CTA "VER LISTINGS DESIGN & CRO" + Category hotkeys */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          
          {/* Main Action Button */}
          <button
            onClick={() => onSelectDomainListing('tours')}
            className="bg-[#1B3A5B] hover:bg-[#122A42] text-white hover:text-[#F3CE7A] px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-97 cursor-pointer flex items-center gap-1.5 duration-200 border-2 border-[#1B3A5B] hover:border-[#122A42]"
            title="VER LISTINGS DESIGN & CRO"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>VER LISTINGS DESIGN & CRO</span>
          </button>

          {/* Quick Hotkeys divider line */}
          <span className="h-4 w-[1px] bg-[#1B3A5B]/30 hidden sm:inline" />

          {/* Direct categorization shortcut buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectDomainListing('tours')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition-all ${
                currentPage === 'directory' && activeDomain === 'tours'
                  ? 'bg-[#1B3A5B] text-white'
                  : 'bg-[#1B3A5B]/5 hover:bg-[#1B3A5B]/10 text-[#1B3A5B]'
              }`}
              title="Filter by Tours"
            >
              <Compass className="w-3 h-3" />
              <span>Tours (6)</span>
            </button>

            <button
              onClick={() => onSelectDomainListing('restaurants')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition-all ${
                currentPage === 'directory' && activeDomain === 'restaurants'
                  ? 'bg-[#1B3A5B] text-white'
                  : 'bg-[#1B3A5B]/5 hover:bg-[#1B3A5B]/10 text-[#1B3A5B]'
              }`}
              title="Filter by Restaurants"
            >
              <Utensils className="w-3 h-3" />
              <span>Gastronomy (3)</span>
            </button>

            <button
              onClick={() => onSelectDomainListing('hotels')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition-all ${
                currentPage === 'directory' && activeDomain === 'hotels'
                  ? 'bg-[#1B3A5B] text-white'
                  : 'bg-[#1B3A5B]/5 hover:bg-[#1B3A5B]/10 text-[#1B3A5B]'
              }`}
              title="Filter by Hotels"
            >
              <Hotel className="w-3 h-3" />
              <span>Hotels (3)</span>
            </button>
          </div>

          {/* Separation line & Esconder toggle button */}
          <span className="h-4 w-[1px] bg-[#1B3A5B]/30 hidden md:inline" />
          <button
            onClick={onToggleCollapse}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/15 hover:bg-white/25 text-[#1B3A5B] transition-all cursor-pointer border border-[#1B3A5B]/15 hover:scale-103 duration-150 active:scale-95"
            title="Esconder Barra"
          >
            <ChevronUp className="w-3.5 h-3.5 text-[#1B3A5B]" />
            <span>Esconder</span>
          </button>

        </div>

      </div>
    </div>
  );
}
