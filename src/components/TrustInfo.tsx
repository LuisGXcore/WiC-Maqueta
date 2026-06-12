import React, { useState } from 'react';
import { TourDetail, TourTypeDynamicConfig } from '../types';
import { 
  Clock, MapPin, Globe2, Sparkles, AlertCircle, ShieldAlert, 
  Compass, BadgeCheck, Check, Heart, HelpCircle 
} from 'lucide-react';

interface TrustInfoProps {
  tourDetail: TourDetail;
  config: TourTypeDynamicConfig;
}

export default function TrustInfo({ tourDetail, config }: TrustInfoProps) {
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <div className="space-y-6" id="trust-info-sidebar-block">
      
      {/* Hours Open Widget Removed */}

      {/* Styled Google Maps-Like Static Locator Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 font-sans" id="location-map-card">
        <h3 className="text-sm font-extrabold text-[#1B3A5B] uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#2E8B8B]" />
          Launch Location
        </h3>

        {/* Custom Vector map container simulation */}
        <div className="relative h-44 rounded-xl overflow-hidden border border-gray-100 bg-teal-50 flex items-center justify-center">
          
          {/* Cabo coast mock lines background pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2e8b8b_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="absolute flex flex-col items-center">
            {/* Pulsing indicator marker */}
            <div className="relative">
              <span className="absolute -inset-1.5 rounded-full bg-[#1B3A5B]/30 animate-ping" />
              <div className="p-2.5 bg-[#1B3A5B] text-[#C9A961] rounded-full shadow-lg relative border border-[#C9A961]/30">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
            </div>
            <span className="mt-2 text-[10px] bg-white border border-gray-200 shadow-sm font-bold text-[#1B3A5B] px-2 py-0.5 rounded-md">
              {tourDetail.operatorName} Base
            </span>
          </div>

          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded border border-gray-200 text-[10px] font-mono text-gray-400">
            Lat {tourDetail.locationCoords.lat}, Lng {tourDetail.locationCoords.lng}
          </div>
        </div>

        {/* Real Address and Direct CTA */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            {tourDetail.locationAddress}
          </p>
          
          <button
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tourDetail.locationAddress)}`, '_blank')}
            className="w-full py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl text-xs font-bold text-[#1B3A5B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            id="btn-trigger-navigation"
          >
            <Compass className="w-3.5 h-3.5 text-[#2E8B8B]" />
            <span>Get Directions via Google Maps</span>
          </button>
        </div>
      </div>

      {/* Languages Spoken (Flags badges) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3" id="languages-spoken-card">
        <h3 className="text-sm font-extrabold text-[#1B3A5B] uppercase tracking-wider flex items-center gap-1.5">
          <Globe2 className="w-4 h-4 text-[#2E8B8B]" />
          Languages Spoken By Host
        </h3>
        <div className="flex flex-wrap gap-2">
          {tourDetail.languagesSpoken.map((lang) => (
            <div 
              key={lang} 
              className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-700"
            >
              <span className="text-xs">
                {lang === 'English' ? '🇺🇸' : lang === 'Spanish' ? '🇲🇽' : lang === 'French' ? '🇫🇷' : '🌐'}
              </span>
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best For Chips */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3" id="best-for-chips-card">
        <h3 className="text-sm font-extrabold text-[#1B3A5B] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#2E8B8B]" />
          Perfect Match For
        </h3>
        <div className="flex flex-wrap gap-2 font-sans">
          {config.bestForChips.map((chip) => (
            <span
              key={chip}
              className="bg-[#f5f2ed] border border-[#C9A961]/30 text-[#8a703d] text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            >
              ✨ {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Must Know / Fine Print Rules (Safety compliance) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4" id="must-know-regulations-card">
        <button
          type="button"
          onClick={() => setShowGuidelines(!showGuidelines)}
          className="w-full text-left flex items-center justify-between gap-2 focus:outline-none cursor-pointer group"
        >
          <div>
            <h3 className="text-sm font-extrabold text-[#1B3A5B] uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#C9A961]" />
              Operator guidelines & "Must Know"
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium leading-tight">
              Read carefully to prepare for extreme comfort or thrill safety
            </p>
          </div>
          <span className="text-xs font-bold text-[#2E8B8B] hover:text-[#256e6e] shrink-0 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg transition-colors whitespace-nowrap">
            {showGuidelines ? '▲ Hide guidelines' : '▼ Show guidelines'}
          </span>
        </button>

        {showGuidelines && (
          <div className="pt-2 space-y-4 animate-fade-in border-t border-gray-50">
            <ul className="space-y-2.5">
              {tourDetail.mustKnow.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                  <span className="p-0.5 bg-[#2E8B8B]/10 text-[#2E8B8B] rounded-md shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#2E8B8B] stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Protection assurance */}
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 flex items-start gap-2 text-[11px] text-[#1B3A5B] leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p>
                <strong>Cabo Flex Guarantee:</strong> Cancel or reschedule 100% free of charge up to 24 hours before your slot departure. Local port closures are fully covered.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
