import React from 'react';
import { Award, Compass, ShieldCheck, Star, Users } from 'lucide-react';
import { TourDetail } from '../types';

interface AboutOperatorProps {
  detail: TourDetail;
}

export default function AboutOperator({ detail }: AboutOperatorProps) {
  // Generate some custom operator descriptive copy based on active category/operator name
  const getOperatorDescription = (name: string) => {
    if (name.includes('Adventures')) {
      return 'Baja’s leading expedition team with over 15 years of off-road, zip line, and eco-certified safety records. Fully insured with wilderness first-responder certified guides on every trek.';
    }
    if (name.includes('Sailing') || name.includes('Charters') || name.includes('Yacht')) {
      return 'Premium marine captains certified under US Coast Guard safety standards. Offering luxury, low-capacity cruises and private eco-tours targeting whale migration routes.';
    }
    if (name.includes('Farallon') || name.includes('Gastronomy')) {
      return 'World-renowned coastal gastronomy culinary house designed directly atop rocky cliffs. Highly celebrated for sea-to-shelf sustainability standards and local organic ingredients sourcing.';
    }
    if (name.includes('Sur Beach') || name.includes('Club')) {
      return 'Cabo’s premier beachside lounge and waterfront social club, offering modern Mexican-Asian gourmet bites, high-vibration DJ sets, and double daybed coastal comfort.';
    }
    if (name.includes('Flora Farms')) {
      return 'Highly celebrated 25-acre organic working farm nestled in the foothills of San Jose. Featuring heirloom garden ingredients, wood-fired clay ovens, and hand-detailed ranch craft shops.';
    }
    if (name.includes('Cape Luxury') || name.includes('Resorts')) {
      return 'Vanguard modern hospitality brand blending mid-century beachfront architecture with five-star luxury butler attention, famous rooftop lounges, and prime Monuments beach vistas.';
    }
    if (name.includes('Villas Del Mar')) {
      return 'Ultra-elite private developer inside the ultra-secure Palmilla gates. Award-winning service featuring full private butler, chef, and private chauffeur staffing standard.';
    }
    if (name.includes('El Ganzo')) {
      return 'Adults-only artistic and musical design hotel hosting premier painter residencies, glass-walled overview swimming pools, and an underground professional recording lounge.';
    }
    return 'Los Cabos local collective of certified environmental guides and culinary masters. Specializing in educational experiences that respect local communities and marine sanctuaries.';
  };

  const isRest = ['finedining', 'beachside', 'organicfarm'].includes(detail.id);
  const isHotel = ['beachresort', 'luxuryvilla', 'boutiqueart'].includes(detail.id);

  const headerLabel = isRest ? 'About the Dining Host' : isHotel ? 'About the Resort Master' : 'About the Operator';
  const badgeLabel = isRest ? 'Verified Dining Host' : isHotel ? 'Verified Resort Master' : 'Verified Operator';
  const linksLabel = isRest ? 'See all tables at' : isHotel ? 'See all bookings at' : 'See all experiences by';

  const experiencesLabel = isRest ? 'curated dining styles' : isHotel ? 'luxury accommodations' : 'experiences offered';

  const toursCountMap: Record<string, number> = {
    'Cabo Adventures Co.': 14,
    'Cabo Yacht Charters': 8,
    'Baja Blue Water': 9,
    'Sabor & Tradición': 6,
    'Heredia Deep Sea': 11,
    'La Paz Biosphere': 5
  };

  const toursCount = toursCountMap[detail.operatorName] || 12;

  return (
    <div 
      className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-4" 
      id="about-operator-section"
    >
      <div className="flex border-b border-gray-50 pb-3 items-center justify-between">
        <h2 className="text-lg font-sans font-extrabold text-[#1B3A5B] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#C9A961]" />
          {headerLabel}
        </h2>
        <span className="text-[10px] bg-[#2E8B8B]/10 text-[#2E8B8B] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#C9A961]" />
          {badgeLabel}
        </span>
      </div>

      <div className="flex items-start gap-4">
        {/* Operator Emblem/Logo */}
        <div className="w-14 h-14 bg-[#fdfbf7] border-2 border-gray-100 rounded-xl flex items-center justify-center shrink-0 shadow-xs relative">
          <span className="text-xl font-black text-[#2E8B8B]">
            {detail.operatorName ? detail.operatorName.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase() : 'WC'}
          </span>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border border-white">
            <ShieldCheck className="w-3 h-3" />
          </div>
        </div>

        {/* Name and Rating Block */}
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-[#1B3A5B] leading-tight">
              {detail.operatorName}
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <div className="flex items-center text-[#C9A961] gap-0.5 font-bold">
              <span>★</span>
              <span className="text-[#1B3A5B]">{detail.operatorRating}</span>
              <span className="text-gray-400 font-normal">({detail.operatorReviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span>•</span>
              <Users className="w-3.5 h-3.5" />
              <span>{toursCount} {experiencesLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operator bio */}
      <p className="text-sm text-gray-600 leading-relaxed font-normal">
        {getOperatorDescription(detail.operatorName)}
      </p>

      {/* Action link */}
      <div className="pt-2">
        <a 
          href={`#`}
          onClick={(e) => {
            e.preventDefault();
            const contactCard = document.getElementById('hours-open-card');
            if (contactCard) {
              contactCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
          className="inline-flex items-center text-xs font-bold text-[#2E8B8B] hover:text-[#256e6e] transition-colors gap-1.5 group cursor-pointer"
        >
          <span>{linksLabel} {detail.operatorName}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}
