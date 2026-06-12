import React, { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQAccordionProps {
  faqs: FAQItem[];
  included: string[];
  excluded: string[];
}

export default function FAQAccordion({ faqs, included, excluded }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Collapsed by default

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-fade-in" id="wic-faqs-section">
      <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B] mb-5 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-[#2E8B8B]" />
        <span>Frequently Asked Questions</span>
      </h2>

      <div className="space-y-3" id="faq-accordions-group">
        {/* Custom First Accordion Item: What's included in this tour? */}
        <div
          className={`border rounded-xl transition-all overflow-hidden ${
            openIndex === 0 ? 'border-[#2E8B8B]/40 bg-gray-50/40' : 'border-gray-100 hover:border-gray-200 bg-white'
          }`}
          id="faq-accordion-row-included"
        >
          <button
            type="button"
            onClick={() => toggleAccordion(0)}
            className="w-full text-left px-4 py-4 flex items-center justify-between gap-4 font-sans font-semibold text-sm md:text-base text-[#1B3A5B] transition-colors cursor-pointer"
          >
            <span className="flex-1 leading-snug">What's included in this tour?</span>
            <span className="shrink-0 p-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-500">
              {openIndex === 0 ? <ChevronUp className="w-4 h-4 text-[#2E8B8B]" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {openIndex === 0 && (
            <div className="px-4 pb-4 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100/50 pt-3.5 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-1">
                <div>
                  <h3 className="text-xs font-extrabold text-[#1B3A5B] uppercase tracking-wider pb-2 border-b border-gray-100 mb-2 flex items-center gap-1.5">
                    <span className="text-emerald-600">✔</span> What's Included
                  </h3>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {included.map((inc) => (
                      <li key={inc} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">✔</span>
                        <span className="font-medium">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold text-[#1B3A5B] uppercase tracking-wider pb-2 border-b border-gray-100 mb-2 flex items-center gap-1.5">
                    <span className="text-red-500">✕</span> Unincluded / Out of Pocket
                  </h3>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {excluded.map((exc) => (
                      <li key={exc} className="flex items-start gap-1.5">
                        <span className="text-gray-400 mt-0.5">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* The remaining FAQs */}
        {faqs.map((faq, idx) => {
          const actualIndex = idx + 1;
          const isOpen = openIndex === actualIndex;
          return (
            <div
              key={idx}
              className={`border rounded-xl transition-all overflow-hidden ${
                isOpen ? 'border-[#2E8B8B]/40 bg-gray-50/40' : 'border-gray-100 hover:border-gray-200 bg-white'
              }`}
              id={`faq-accordion-row-${actualIndex}`}
            >
              {/* Header toggler button */}
              <button
                type="button"
                onClick={() => toggleAccordion(actualIndex)}
                className="w-full text-left px-4 py-4 flex items-center justify-between gap-4 font-sans font-semibold text-sm md:text-base text-[#1B3A5B] transition-colors cursor-pointer"
              >
                <span className="flex-1 leading-snug">{faq.question}</span>
                <span className="shrink-0 p-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-500">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#2E8B8B]" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {/* Collapsed/Expanded Content */}
              {isOpen && (
                <div className="px-4 pb-4 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100/50 pt-2.5 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
