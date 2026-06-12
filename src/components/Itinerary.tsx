import React from 'react';
import { ItineraryItem } from '../types';
import * as LucideIcons from 'lucide-react';

interface ItineraryProps {
  timeline: ItineraryItem[];
  duration: string;
}

export default function Itinerary({ timeline, duration }: ItineraryProps) {
  
  // Custom helper to dynamically render Lucide Icons by name string
  const renderIcon = (name: string) => {
    // Fallback safe keys mapping
    const IconComponent = (LucideIcons as any)[name];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-[#C9A961]" />;
    }
    return <LucideIcons.Clock className="w-5 h-5 text-[#C9A961]" />;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm" id="wic-itinerary-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B]">
          Timeline & Route
        </h2>
        <span className="text-xs bg-[#2E8B8B]/10 text-[#2E8B8B] font-mono font-extrabold px-3 py-1 rounded-full border border-[#2E8B8B]/15 self-start sm:self-auto">
          ⏱️ Active Duration: {duration}
        </span>
      </div>

      <div className="relative border-l-2 border-[#2E8B8B]/20 ml-3.5 pl-6 space-y-6" id="itinerary-timeline-flow">
        {timeline.map((step, idx) => (
          <div key={idx} className="relative group" id={`itinerary-step-${idx}`}>
            {/* Timeline Circle Bullet Node */}
            <div className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#2E8B8B] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9A961]" />
            </div>

            {/* Content card */}
            <div className="bg-gray-50 group-hover:bg-gray-50/50 p-4 rounded-xl border border-gray-100 transition-colors flex items-start gap-3.5">
              
              {/* Dynamic Icon Wrapper */}
              <div className="bg-[#1B3A5B] p-2.5 rounded-xl shrink-0 flex items-center justify-center shadow-sm">
                {renderIcon(step.iconName)}
              </div>

              {/* Time + Detail */}
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <span className="text-xs font-mono font-bold text-[#2E8B8B] uppercase tracking-wider">
                    {step.time}
                  </span>
                  {idx === 0 && (
                    <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 rounded-md font-mono uppercase font-bold">
                      Pick-up Hub
                    </span>
                  )}
                </div>
                
                <h4 className="text-sm md:text-base font-bold font-sans text-[#1B3A5B]">
                  {step.title}
                </h4>
                
                <p className="text-gray-500 text-xs md:text-sm mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
