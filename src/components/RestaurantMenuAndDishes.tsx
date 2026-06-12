import React, { useState } from 'react';
import { BestDishItem } from '../types';
import { FileText, Download, ChefHat, Sparkles, ChevronLeft, ChevronRight, Eye, AlertCircle } from 'lucide-react';

interface RestaurantMenuAndDishesProps {
  pdfMenuUrl: string;
  bestDishes: BestDishItem[];
  restaurantName: string;
}

export default function RestaurantMenuAndDishes({ pdfMenuUrl, bestDishes, restaurantName }: RestaurantMenuAndDishesProps) {
  const [activePrepState, setActivePrepState] = useState(0);
  const [showDemoPdf, setShowDemoPdf] = useState(false);

  const handleNext = () => {
    setActivePrepState((prev) => (prev + 1) % bestDishes.length);
  };

  const handlePrev = () => {
    setActivePrepState((prev) => (prev - 1 + bestDishes.length) % bestDishes.length);
  };

  return (
    <div className="space-y-8">
      {/* 1. PDF MENU COMPONENT */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm scroll-mt-24" id="wic-menu-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-50 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider block">
              Carta Completa de {restaurantName}
            </span>
            <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B] flex items-center gap-2 mt-0.5">
              <FileText className="w-5 h-5 text-[#C9A961]" />
              Menu & Wine Pairings
            </h2>
          </div>
          <a
            href={pdfMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2E8B8B] hover:bg-[#256e6e] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-[#C9A961]" />
            <span>Download PDF Menu</span>
          </a>
        </div>

        <p className="text-xs md:text-sm text-gray-500 mb-6 leading-relaxed">
          Savor the daily sea-to-table captures, estate-grown botanical greens, and hand-muddled signature mezcal cocktails. 
          Use our real-time interactive viewer below to explore our signature pricing and direct oceanfront culinary line-up.
        </p>

        {/* Realistic Interactive PDF Mock Container */}
        <div className="bg-[#1C2C3F] rounded-2xl p-4 md:p-6 text-white border border-[#2E8B8B]/25 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A961]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9A961] animate-pulse" />
              DIGITAL_MENU_PROTOTYPE.pdf
            </span>
            <span>Page 1 of 3</span>
          </div>

          {/* Interactive Toggle for Appended Mock Menu */}
          {!showDemoPdf ? (
            <div className="space-y-4 py-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-xs font-mono font-bold text-[#C9A961] uppercase tracking-wider">
                  ✦ Signature Starters
                </h4>
                <div className="space-y-2.5 mt-2.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-xs md:text-sm font-bold font-sans">Crisp Baja Oyster Plate</span>
                    <span className="h-px bg-white/10 flex-1" />
                    <span className="text-[#C9A961] font-mono text-xs font-bold">$24</span>
                  </div>
                  <p className="text-[11px] text-gray-400">With wild fermented lime-serrano water & organic avocado emulsion.</p>

                  <div className="flex justify-between items-baseline gap-2 mt-2">
                    <span className="text-xs md:text-sm font-bold font-sans">Sea Salt Lava Octopus</span>
                    <span className="h-px bg-white/10 flex-1" />
                    <span className="text-[#C9A961] font-mono text-xs font-bold">$28</span>
                  </div>
                  <p className="text-[11px] text-gray-400">Braised with volcano ash embers and organic oregano garnish.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => setShowDemoPdf(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white font-bold rounded-xl transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#C9A961]" />
                  <span>Open Interactive PDF Mock</span>
                </button>
                <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                  <span>Full ingredients list, vegan and gluten-free adaptations verified.</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-4 text-gray-800 space-y-4 relative animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="font-extrabold text-[#1B3A5B] text-xs md:text-sm">
                  {restaurantName} — Exclusive Season Tasting Book
                </h3>
                <button
                  onClick={() => setShowDemoPdf(false)}
                  className="text-xs text-red-600 hover:text-red-700 font-bold uppercase font-mono cursor-pointer"
                >
                  [Close]
                </button>
              </div>

              <div className="border border-dashed border-gray-200 rounded-lg p-3 text-center space-y-2">
                <FileText className="w-8 h-8 text-[#2E8B8B] mx-auto" />
                <span className="block text-xs font-mono font-bold text-gray-700">Cabos Beach Fine Gastronomy PDF</span>
                <p className="text-[11px] text-gray-500 max-w-sm mx-auto">
                  This mock preview illustrates the live PDF dining menu complete with wine pairings, craft tequila flights, and custom harvest logs.
                </p>
                <a
                  href={pdfMenuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B3A5B] text-white text-[11px] font-bold rounded-lg hover:bg-[#256e6e] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#C9A961]" />
                  View Original Document
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. "MEJORES PLATOS" SECTION (SLIDE OF DISHES BEFORE FAQS) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm scroll-mt-24" id="wic-best-dishes-section">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2E8B8B] uppercase tracking-wider block font-sans">
              House Recommendations
            </span>
            <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B] flex items-center gap-2 mt-0.5">
              <ChefHat className="w-5 h-5 text-[#C9A961]" />
              Mejores Platos (Featured Dishes)
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              aria-label="Previous dish"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-[#1B3A5B] min-w-10 text-center">
              {activePrepState + 1} / {bestDishes.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
              aria-label="Next dish"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Card with visual overlay and custom details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-gray-50 rounded-2xl p-4 border border-gray-100 overflow-hidden relative" id="mejores-platos-carousel">
          
          <div className="md:col-span-6 relative rounded-xl overflow-hidden group aspect-video md:aspect-square">
            <img
              src={bestDishes[activePrepState].photoUrl}
              alt={bestDishes[activePrepState].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 left-2 bg-[#1B3A5B]/90 text-white border border-white/10 px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C9A961]" />
              <span>Chef's Choice</span>
            </div>
            
            <div className="absolute bottom-2 right-2 bg-black/70 text-white font-mono text-xs font-extrabold px-2.5 py-1 rounded-md text-emerald-400">
              {bestDishes[activePrepState].price}
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between py-1">
            <div className="space-y-3">
              <span className="text-[9px] font-mono font-black uppercase bg-[#2E8B8B]/10 text-[#2E8B8B] px-2 py-0.5 rounded-md self-start inline-block">
                Sea-to-Table Quality
              </span>
              <h3 className="text-lg font-sans font-extrabold text-[#1B3A5B]">
                {bestDishes[activePrepState].name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-normal">
                {bestDishes[activePrepState].description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200/50 mt-4 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1">
                🍳 Organic Ingredients
              </span>
              <span>Prepared Fresh Daily</span>
            </div>
          </div>
        </div>

        {/* Indicator dots for selection navigation */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {bestDishes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePrepState(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activePrepState === i ? 'w-5 bg-[#2E8B8B]' : 'w-1.5 bg-gray-200'
              }`}
              title={`View dish ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
