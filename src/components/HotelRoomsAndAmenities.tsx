import React, { useState } from 'react';
import { RoomTypeItem, AmenityItem } from '../types';
import * as LucideIcons from 'lucide-react';
import { Home, ChevronLeft, ChevronRight, Bed, Star, Shield, ArrowRight } from 'lucide-react';

interface HotelRoomsAndAmenitiesProps {
  roomTypes: RoomTypeItem[];
  amenities: AmenityItem[];
  hotelName: string;
}

export default function HotelRoomsAndAmenities({ roomTypes, amenities, hotelName }: HotelRoomsAndAmenitiesProps) {
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);

  const handleNextRoom = () => {
    setActiveRoomIdx((prev) => (prev + 1) % roomTypes.length);
  };

  const handlePrevRoom = () => {
    setActiveRoomIdx((prev) => (prev - 1 + roomTypes.length) % roomTypes.length);
  };

  // Custom icon renderer wrapper to dynamically load Lucide icons
  const renderIcon = (name: string) => {
    const IconComponent = (LucideIcons as any)[name];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-[#C9A961]" />;
    }
    return <LucideIcons.Sparkles className="w-5 h-5 text-[#C9A961]" />;
  };

  return (
    <div className="space-y-8">
      {/* 1. ROOM TYPES SLIDER CAROUSEL */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm scroll-mt-24" id="wic-rooms-section">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider block">
              Curated Suites of {hotelName}
            </span>
            <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B] flex items-center gap-2 mt-0.5">
              <Home className="w-5 h-5 text-[#C9A961]" />
              Luxury Rooms & Suites
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevRoom}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              aria-label="Previous room"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-[#1B3A5B] min-w-10 text-center">
              {activeRoomIdx + 1} / {roomTypes.length}
            </span>
            <button
              onClick={handleNextRoom}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              aria-label="Next room"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Room Card Render Panel */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden" id="hotel-rooms-slider-container">
          <div className="relative h-64 md:h-80 w-full group overflow-hidden">
            <img
              src={roomTypes[activeRoomIdx].photoUrl}
              alt={roomTypes[activeRoomIdx].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Visual Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <span className="text-[10px] font-mono uppercase bg-[#2E8B8B] text-white px-2 py-0.5 rounded-md font-bold inline-block mb-1.5">
                  📐 {roomTypes[activeRoomIdx].size}
                </span>
                <h3 className="text-lg md:text-xl font-extrabold tracking-tight">
                  {roomTypes[activeRoomIdx].name}
                </h3>
              </div>
              
              <div className="text-right">
                <span className="block text-[10px] text-gray-300 font-medium font-mono uppercase">Starting from</span>
                <span className="text-[#C9A961] font-mono leading-none text-lg md:text-2xl font-black">
                  {roomTypes[activeRoomIdx].pricePerNight}
                </span>
                <span className="text-[10px] text-gray-300 font-mono"> / night</span>
              </div>
            </div>
          </div>

          {/* Details & Custom Features list */}
          <div className="p-5 md:p-6 space-y-4">
            <div>
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-extrabold mb-2.5">
                ✦ Suite Signature Attributes
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roomTypes[activeRoomIdx].features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-gray-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200/50 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-[#C9A961]" /> Custom Pillow Selection Standard
              </span>
              <span className="text-[11px] font-mono bg-[#1B3A5B]/5 text-[#1B3A5B] px-2.5 py-1 rounded-lg font-bold">
                * Rates reflect real seasonal discounts
              </span>
            </div>
          </div>
        </div>

        {/* Navigator Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {roomTypes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveRoomIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeRoomIdx === i ? 'w-5 bg-[#2E8B8B]' : 'w-1.5 bg-gray-200'
              }`}
              title={`View suite class ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. DEDICATED AMENITIES SHIFT */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm scroll-mt-24" id="wic-amenities-section">
        <div className="border-b border-gray-50 pb-4 mb-6">
          <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider block">
            Five-Star Excellence
          </span>
          <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B] flex items-center gap-2 mt-0.5">
            <Star className="w-5 h-5 text-[#C9A961]" />
            Resort Amenities & Guest Privileges
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="hotel-amenities-grid-showcase">
          {amenities.map((item, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:shadow-xs transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-[#1B3A5B] rounded-lg shrink-0 flex items-center justify-center mb-3 shadow-xs">
                  {renderIcon(item.iconName)}
                </div>
                <h4 className="text-sm font-extrabold text-[#1B3A5B] font-sans">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
              <div className="border-t border-gray-200/50 mt-3 pt-2 text-[10px] font-mono text-[#2E8B8B] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>Inclusive Privileges</span>
                <ArrowRight className="w-3 h-3 text-[#C9A961]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
