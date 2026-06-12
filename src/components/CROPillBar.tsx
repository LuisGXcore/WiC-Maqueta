import React from 'react';
import { TourTypeId } from '../types';
import { tourTypeConfigs } from '../data';
import { Shield, Sparkles, Brain, Flame } from 'lucide-react';

interface CROPillBarProps {
  activeType: TourTypeId;
  onChangeType: (type: TourTypeId) => void;
  allowedTypes: TourTypeId[];
  activeDomain: string;
}

export default function CROPillBar({ activeType, onChangeType, allowedTypes, activeDomain }: CROPillBarProps) {
  const currentConfig = tourTypeConfigs[activeType];

  const filterLabel = 
    activeDomain === 'tours' ? 'Select Tour Type:' : 
    activeDomain === 'restaurants' ? 'Select Dinner Style:' : 
    'Select Resort Class:';

  return (
    <div className="bg-[#1B3A5B] text-white border-b border-[#2E8B8B]/30 shadow-xl" id="dev-cro-controller">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Label & Description */}
          <div>
            <div className="flex items-center gap-2 text-[#C9A961] font-mono text-xs uppercase tracking-widest font-semibold mb-1">
              <Sparkles className="w-4 h-4 animate-pulse" />
              CRO & Behavioral Design Interactive Simulator
            </div>
            <h2 className="text-lg md:text-xl font-sans font-bold text-white tracking-tight">
              Test dynamic trust signals, urgency patterns, and custom forms
            </h2>
            <p className="text-gray-300 text-xs mt-1 max-w-2xl">
              Toggle the segment triggers below to observe how the page instantly morphs its copywriting, 
              trust structures, pricing triggers, and booking steps to tackle site-visitor-specific anxieties.
            </p>
          </div>

          {/* Psychological Insights Badge */}
          {currentConfig && (
            <div className="bg-[#10243B] border border-[#2E8B8B]/40 rounded-xl p-3 flex items-start gap-2.5 max-w-md">
              <Brain className="w-5 h-5 text-[#C9A961] shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-xs font-bold font-sans">Active Cognitive Principle:</div>
                <div className="text-[#C9A961] text-xs font-mono font-medium">{currentConfig.cognitivePrinciple}</div>
                <div className="text-gray-400 text-[11px] mt-0.5">
                  Target Fear Solved: <span className="text-red-300 italic">"{currentConfig.fear}"</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10" id="tour-type-indicators">
          <span className="text-xs text-gray-400 font-mono font-medium uppercase tracking-wider mr-2">
            {filterLabel}
          </span>
          {allowedTypes.map((typeId) => {
            const config = tourTypeConfigs[typeId];
            if (!config) return null;
            const isSelected = activeType === typeId;
            return (
              <button
                key={typeId}
                id={`btn-toggle-${typeId}`}
                onClick={() => onChangeType(typeId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E8B8B] text-white ring-2 ring-[#C9A961]/50 font-bold scale-[1.03] shadow-md'
                    : 'bg-[#152e4d] text-gray-300 hover:bg-[#1b3a5b] hover:text-white border border-white/10'
                }`}
              >
                {config.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
