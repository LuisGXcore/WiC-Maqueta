import React, { useState } from 'react';
import { TourDetail, TourTypeDynamicConfig } from '../types';
import { tourTypeConfigs } from '../data';
import { Calendar, Users, Mail, User, ShieldCheck, Clock, Sparkles, RefreshCw, AlertCircle, X, CheckCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CROFormProps {
  tourDetail: TourDetail;
  config: TourTypeDynamicConfig;
  activeType: string;
}

export interface CapturedLead {
  tourName: string;
  operator: string;
  date: string;
  groupSize: number;
  email: string;
  phone?: string;
  name: string;
  capturedAt: string;
}

export default function CROForm({ tourDetail, config, activeType }: CROFormProps) {
  const [step, setStep] = useState<number>(0); // 0 = Price/CTA only, 1 = Date & Group, 2 = Email & Name, 3 = Confirmed
  const [date, setDate] = useState<string>('');
  const [groupSize, setGroupSize] = useState<number>(2);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [leadsLog, setLeadsLog] = useState<CapturedLead[]>([]);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Error handling states
  const [formError, setFormError] = useState<string>('');

  const formatTravelDate = (dateStr: string) => {
    if (!dateStr) return 'June 12';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        // Force parsing as local date to prevent off-by-one errors
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      }
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } catch {
      return 'June 12';
    }
  };

  const handleNextStep1 = () => {
    if (!date) {
      setFormError('Please select a preferred date.');
      return;
    }
    setFormError('');
    setStep(2);
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setFormError('Please enter your email to secure your spot.');
      return;
    }
    if (!email.includes('@')) {
      setFormError('Please specify a valid email address.');
      return;
    }
    if (!phone || phone.trim().length < 5) {
      setFormError('Please enter a valid phone number so we can coordinate your booking.');
      return;
    }
    if (!name || name.trim().length === 0) {
      setFormError('Please enter your name.');
      return;
    }

    setFormError('');
    
    // Context Capture
    const newLead: CapturedLead = {
      tourName: tourDetail.title,
      operator: tourDetail.operatorName,
      date,
      groupSize,
      email,
      phone,
      name,
      capturedAt: new Date().toLocaleTimeString()
    };

    setLeadsLog((prev) => [newLead, ...prev]);
    setStep(3);
  };

  const handleResetForm = () => {
    setDate('');
    setGroupSize(2);
    setEmail('');
    setPhone('');
    setName('');
    setStep(0);
    setFormError('');
    setShowMobileDrawer(false);
  };

  // Dynamic values
  const basePrice = tourDetail.price;
  const dispPrice = tourDetail.discountedPrice || basePrice;
  const hasDiscount = !!tourDetail.discountedPrice;
  const savings = hasDiscount ? basePrice - (tourDetail.discountedPrice || 0) : 0;

  // Render Form Steps Client Logic
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center" id="cro-form-step-0">
            <button
              onClick={() => setStep(1)}
              id="btn-trigger-cta"
              className="w-full bg-[#2E8B8B] hover:bg-[#256e6e] text-white text-[15px] font-medium h-[48px] rounded-[8px] mb-[6px] cursor-pointer flex items-center justify-center transition-colors"
            >
              Check spots for my dates
            </button>
            <p className="text-[11px] text-gray-500 text-center mb-[14px] leading-none">
              No payment needed now · Takes 30 seconds
            </p>
          </div>
        );

      case 1:
        return (
          <div className="p-5" id="cro-form-step-1">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <span className="text-xs font-mono font-bold uppercase text-[#1B3A5B] tracking-wide">
                Step 1 of 2: Dates & Anglers
              </span>
              <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold uppercase">
                Holding Spots
              </span>
            </div>

            <label className="block text-sm font-sans font-extrabold text-[#1B3A5B] mb-3 leading-snug">
              {config.formStep1Label}
            </label>

            {/* Date Picker Input */}
            <div className="relative mb-4">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="date"
                value={date}
                id="input-tour-date"
                onChange={(e) => setDate(e.target.value)}
                min="2026-06-11"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] outline-none text-[#1B3A5B] bg-white transition-all"
              />
            </div>

            {/* Traveler Counter */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  Group Weight / Attendees
                </span>
                <span className="text-xs font-mono font-bold text-[#1B3A5B] bg-gray-100 px-2 py-0.5 rounded-md">
                  {groupSize} {groupSize === 1 ? 'person' : 'people'}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 4, 6, 8].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setGroupSize(size)}
                    className={`flex-1 py-2 font-mono text-xs rounded-lg transition-all border cursor-pointer ${
                      groupSize === size
                        ? 'bg-[#2E8B8B] text-white border-[#2E8B8B] font-bold'
                        : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic">
                * Note: Max capacity of this tour type is {tourDetail.groupSize.toLowerCase()}
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-2.5 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2 border border-red-100 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Next trigger */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="px-3.5 py-3 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep1}
                id="btn-step1-next"
                className="flex-1 bg-[#2E8B8B] hover:bg-[#256e6e] text-white py-3 px-4 rounded-xl font-sans font-bold text-sm tracking-wide shadow-lg shadow-[#2E8B8B]/25 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 uppercase cursor-pointer"
              >
                Lock In Dates & Size →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <form onSubmit={handleBookNow} className="p-5" id="cro-form-step-2">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <span className="text-xs font-mono font-bold uppercase text-[#2E8B8B] tracking-wide">
                Step 2 of 2: Secure Reservation
              </span>
            </div>

            <div className="space-y-4 mb-5">
              {/* Full Name Input */}
              <div>
                <label className="block text-xs font-bold font-sans text-gray-500 uppercase tracking-wider mb-1">
                  Name *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    id="input-lead-name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] outline-none text-[#1B3A5B] bg-white transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold font-sans text-gray-500 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    id="input-lead-email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@yourdomain.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] outline-none text-[#1B3A5B] bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone number Input */}
              <div>
                <label className="block text-xs font-bold font-sans text-gray-500 uppercase tracking-wider mb-1">
                  Phone number *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    id="input-lead-phone"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#2E8B8B]/20 focus:border-[#2E8B8B] outline-none text-[#1B3A5B] bg-white transition-all"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">So our local team can reach you faster</p>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-2.5 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2 border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* CTA Frame with Loss Aversion Copywriting */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-3.5 py-3 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                id="btn-lead-submit"
                className="flex-1 bg-[#2E8B8B] hover:bg-[#206161] text-white py-3 px-4 rounded-xl font-sans font-bold text-sm tracking-wide shadow-lg shadow-[#2E8B8B]/20 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 uppercase cursor-pointer"
              >
                Avoid Missing Out: Lock Spots →
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-3">
              🔓 No credit card required. We value privacy - no spam policy.
            </p>
          </form>
        );

      case 3:
        return (
          <div className="p-6 text-center" id="cro-form-step-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-7 h-7 text-emerald-600 animate-bounce" />
            </div>

            <h3 className="text-lg font-sans font-extrabold text-[#1B3A5B] mb-2">
              Holding Spots Successful!
            </h3>

            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              We've received your request for <span className="font-bold text-gray-800">{groupSize} spots</span> for <span className="font-semibold text-[#2E8B8B]">{date}</span>.
              <br /><br />
              Our local concierge is reaching out to <span className="font-bold text-gray-800">{tourDetail.operatorName}</span> right now.
            </p>

            {/* Context summary list */}
            <div className="bg-gray-50 rounded-xl p-3.5 text-left border border-gray-100 mb-5 text-xs space-y-1.5" id="lead-captured-details">
              <div>
                <span className="text-gray-400 font-mono text-[10px] uppercase">Tour Name:</span>
                <p className="font-bold text-[#1B3A5B] truncate">{tourDetail.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-200/50">
                <div>
                  <span className="text-gray-400 font-mono text-[10px] uppercase">Operator:</span>
                  <p className="font-semibold text-gray-700">{tourDetail.operatorName}</p>
                </div>
                <div>
                  <span className="text-gray-400 font-mono text-[10px] uppercase">Requested Date:</span>
                  <p className="font-semibold text-gray-700">{date}</p>
                </div>
              </div>
            </div>

            {/* Cabo Passport Offer Card */}
            <div className="bg-[#f5f2ed]/50 border border-dashed border-[#C9A961]/40 rounded-xl p-4 text-left mb-5 space-y-3" id="cabo-passport-card">
              <div className="flex items-start gap-2.5">
                <span className="text-xl shrink-0" role="img" aria-label="Ticket">🎫</span>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-[#1B3A5B] uppercase tracking-wider">
                    Make the most of your {date ? formatTravelDate(date) : 'June 12'} in Cabo
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                    Save on restaurants & beach clubs with the Cabo Passport — from $29 USD
                  </p>
                </div>
              </div>
              <a
                href="/cabo-passport/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-[#1B3A5B]/10 hover:bg-[#1B3A5B]/15 text-[#1B3A5B] font-extrabold text-[11px] py-1.5 px-3 rounded-lg border border-[#1B3A5B]/10 hover:border-[#1B3A5B]/20 transition-all text-center uppercase tracking-wide gap-1.5 cursor-pointer"
              >
                <span>See how much you’d save →</span>
              </a>
            </div>

            <button
              onClick={handleResetForm}
              className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Modify or Test Another Class</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* DESKTOP SIDEBAR FORM (Always stands on right side screen) */}
      <div 
        className="hidden md:block bg-white border border-[#E8E4DC] rounded-[12px] p-[22px] z-20" 
        id="desktop-conversion-card"
      >
        {/* Top section in this exact order */}
        <div className="flex flex-col text-left font-sans">
          <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#2E8B8B] mb-[10px] block font-mono">
            BOOK DIRECT WITH OPERATOR
          </span>
          <div className="text-[30px] font-medium text-[#1B3A5B] leading-none">
            From ${dispPrice} USD
          </div>
          <span className="text-[12px] text-gray-500 mt-1 mb-[14px] block leading-none">
            per person
          </span>
          <div className="bg-[#FAEEDA] text-[#854F0B] text-[12px] rounded-[6px] p-[7px_10px] mb-[14px] flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-[#854F0B] shrink-0" />
            <span>Only 8 spots per group. Fills fast in season.</span>
          </div>
        </div>

        {/* Dynamic multi-step content */}
        <div>
          {renderStepContent()}
        </div>

        {/* Secure Checkout Seal */}
        <div className="border-t border-[#E8E4DC] pt-3.5 flex items-center justify-center gap-1.5 mt-4 text-[11px] font-sans font-medium text-gray-500">
          <span>🛡️ SSL Secure Cryptography</span>
          <span className="text-gray-300 mx-1">·</span>
          <span>🤝 Cabo Verified Operator</span>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM SHEET / CTA BAR */}
      {/* On mobile devices, this sticky footer has exactly 1 high impact CTA with pricing */}
      <div 
        className="md:hidden fixed bottom-1 left-0 right-0 z-50 bg-white border-t border-gray-200/80 shadow-2xl px-4 py-3 pb-safe flex items-center justify-between"
        id="mobile-bottom-anchor-cta"
      >
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-mono tracking-wide uppercase">Starting from</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-[#1B3A5B]">${dispPrice}</span>
            <span className="text-xs text-gray-400">USD</span>
            {hasDiscount && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">
                -${savings}
              </span>
            )}
          </div>
          <p className="text-[9px] text-[#2E8B8B] font-bold whitespace-nowrap overflow-ellipsis italic">
            ⚡ Max {tourDetail.groupSize}
          </p>
        </div>

        <button
          onClick={() => {
            setShowMobileDrawer(true);
            if (step === 0) setStep(1); // Auto bootstrap step 1 inside mobile view
          }}
          id="btn-mobile-trigger-drawer"
          className="bg-[#2E8B8B] hover:bg-[#1f5f5f] text-white px-5 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          {step === 3 ? 'View Hold Confirmed' : 'Book Spots →'}
        </button>
      </div>

      {/* MOBILE DRILL SLIDE UP PANEL DRAWER */}
      <AnimatePresence>
        {showMobileDrawer && (
          <div className="fixed inset-0 bg-black/60 z-50 md:hidden" id="mobile-drawer-overlay">
            {/* Click backdrop to dim */}
            <div className="absolute inset-0" onClick={() => setShowMobileDrawer(false)} />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto pb-safe"
              id="mobile-drawer-shell"
            >
              {/* Drag line */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3" />
              
              {/* Drawer Header */}
              <div className="px-5 pb-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#C9A961] font-bold uppercase">{tourDetail.operatorName}</span>
                  <h4 className="text-sm font-sans font-extrabold text-[#1B3A5B] line-clamp-1">{tourDetail.title}</h4>
                </div>
                <button
                  onClick={() => setShowMobileDrawer(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-700 transition"
                  id="btn-close-mobile-drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Current steps content injection */}
              <div className="p-1">
                {renderStepContent()}
              </div>

              {/* Secure footer */}
              <div className="bg-gray-50 border-t border-gray-100 py-3 text-center text-[10px] text-gray-400">
                🔒 SSL Encrypted & Verifiably Hand-Verified by What's in Cabo desk
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logs removed for production */}
    </>
  );
}
