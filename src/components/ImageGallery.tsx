import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, X, ChevronLeft, ChevronRight, Share2, Heart, Award, Shield } from 'lucide-react';
import { DomainType } from '../types';

interface ImageGalleryProps {
  images: { url: string; alt: string }[];
  tourTitle: string;
  price: number;
  discountedPrice?: number;
  operatorBadge: string;
  rating: number;
  reviewsCount: number;
  categoryLabel?: string;
  shortTourTitle?: string;
  activeDomain?: DomainType;
}

export default function ImageGallery({
  images,
  tourTitle,
  price,
  discountedPrice,
  operatorBadge,
  rating,
  reviewsCount,
  categoryLabel = 'Adventure',
  shortTourTitle = 'Canyon Safari',
  activeDomain = 'tours'
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleShare = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText?.(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? 0 : prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? 0 : prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="w-full bg-white" id="wic-hero-gallery">
      
      {/* Dynamic Title, Badges & Trust Summary (Above Grid / Fulfilling First 3 seconds requirements) */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        
        {/* Breadcrumb section - Different routes for each domain line */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-[#1B3A5B]/50 font-medium mb-3" aria-label="Breadcrumb">
          <a href="#" className="hover:text-[#2E8B8B] transition-colors">Home</a>
          <span className="text-gray-300 text-[10px]">&gt;</span>
          <a href="#" className="hover:text-[#2E8B8B] transition-colors">Cabo San Lucas</a>
          <span className="text-gray-300 text-[10px]">&gt;</span>
          {activeDomain === 'tours' && (
            <>
              <a href="#" className="hover:text-[#2E8B8B] transition-colors">Tours</a>
              <span className="text-gray-300 text-[10px]">&gt;</span>
            </>
          )}
          {activeDomain === 'restaurants' && (
            <>
              <a href="#" className="hover:text-[#2E8B8B] transition-colors">Gastronomy</a>
              <span className="text-gray-300 text-[10px]">&gt;</span>
            </>
          )}
          {activeDomain === 'hotels' && (
            <>
              <a href="#" className="hover:text-[#2E8B8B] transition-colors">Hotels & Resorts</a>
              <span className="text-gray-300 text-[10px]">&gt;</span>
            </>
          )}
          <a href="#" className="hover:text-[#2E8B8B] transition-colors">{categoryLabel}</a>
          <span className="text-gray-300 text-[10px]">&gt;</span>
          <span className="text-[#1B3A5B] font-bold truncate max-w-[150px] sm:max-w-none">{shortTourTitle}</span>
        </nav>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-[#2E8B8B] text-white text-[11px] font-mono font-bold uppercase py-0.5 px-2 rounded-md flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Verified Host
          </span>
          <span className="bg-[#f5f2ed] border border-[#C9A961]/30 text-[#8a703d] text-[11px] font-semibold py-0.5 px-2 rounded-md">
            🏆 {operatorBadge}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-700 ml-1">
            <span className="text-yellow-500 font-bold">★ {rating}</span>
            <span className="text-gray-400 text-xs">({reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Title and Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-extrabold text-[#1B3A5B] leading-tight tracking-tight" id="tour-h1-title">
              {tourTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start">
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 md:px-3 md:py-2 border border-gray-200 rounded-xl flex items-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors text-sm font-semibold cursor-pointer"
              title="Copy Listing Link"
              id="btn-share-listing"
            >
              <Share2 className="w-4 h-4 text-[#2E8B8B]" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            {/* Favorite button */}
            <button
              onClick={() => setFavorite(!favorite)}
              className="p-2 md:px-3 md:py-2 border border-gray-200 rounded-xl flex items-center gap-2 hover:bg-gray-50 text-gray-700 transition-colors text-sm font-semibold cursor-pointer"
              title="Save to Wishlist"
              id="btn-save-wishlist"
            >
              <Heart className={`w-4 h-4 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              <span className="hidden sm:inline">{favorite ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* GALLERY GRID */}
      {/* Optimizing layout: single fluid grid on desktop, full-width swipeable viewport on mobile */}
      <div className="md:max-w-7xl md:mx-auto md:px-4 mb-6">
        
        {/* Desktop Layout (hidden on small screens) */}
        <div className="hidden md:grid grid-cols-12 gap-2 h-[450px] rounded-2xl overflow-hidden relative" id="desktop-grid-structure">
          
          {/* Main Large Image */}
          <div 
            onClick={() => setLightboxIndex(0)}
            className="col-span-7 h-full relative cursor-pointer overflow-hidden group border border-gray-100"
          >
            <img
              src={images[0]?.url || 'https://picsum.photos/seed/default/1200/800'}
              alt={images[0]?.alt}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            
            {/* Soft shadow accent */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-5 text-white">
              <span className="text-xs bg-[#2E8B8B] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded mr-2 h-fit">Primary View</span>
              <p className="text-sm font-sans mt-1 text-gray-100 line-clamp-1">{images[0]?.alt}</p>
            </div>
          </div>

          {/* Right 4-Grid Block */}
          <div className="col-span-5 grid grid-cols-2 grid-rows-2 gap-2 h-full">
            {images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx + 1)}
                className="relative cursor-pointer overflow-hidden group h-full border border-gray-100"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs text-gray-200 font-sans line-clamp-2">{img.alt}</p>
                </div>
                
                {/* Visual "See More" banner on the last thumbnail block */}
                {idx === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-2">
                    <Image className="w-6 h-6 text-[#C9A961] mb-1" />
                    <span className="text-sm font-bold">+{images.length - 4} Photos</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest font-mono">View All</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Floating trigger button to browse images */}
          <button
            onClick={() => setLightboxIndex(0)}
            className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#1B3A5B] border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-white transition-all shadow-lg shadow-black/10 cursor-pointer"
            id="btn-desktop-all-photos"
          >
            <Image className="w-4 h-4 text-[#2E8B8B]" />
            <span>Show all {images.length} photos</span>
          </button>
        </div>

        {/* Mobile Swipe-like Layout (Slick single full bleed) */}
        <div className="block md:hidden relative h-[280px] bg-gray-100" id="mobile-gallery-structure">
          <img
            src={images[0]?.url || 'https://picsum.photos/seed/default/1200/800'}
            alt={images[0]?.alt}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

          {/* Bottom Indicators */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-sans font-medium max-w-[220px] line-clamp-1 bg-black/30 backdrop-blur-sm py-1 px-2.5 rounded-full">
              📍 {images[0]?.alt}
            </span>
            <button
              onClick={() => setLightboxIndex(0)}
              className="bg-black/60 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
            >
              <Image className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>1 / {images.length}</span>
            </button>
          </div>
        </div>

      </div>

      {/* LIGHTBOX SLIDER MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-55 flex flex-col items-center justify-between p-4"
            id="lightbox-overlay"
          >
            {/* Header */}
            <div className="w-full max-w-5xl flex items-center justify-between text-white py-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-mono">WHAT'S IN CABO · PREMIUM PORTFOLIO</span>
                <span className="text-sm font-sans font-medium line-clamp-1">{images[lightboxIndex]?.alt}</span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                id="btn-close-lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Core Image Slide */}
            <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center p-2">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-10 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full hover:scale-105 border border-white/10 transition-all cursor-pointer"
                id="btn-lightbox-prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ transform: 'scale(0.95)', opacity: 0.8 }}
                animate={{ transform: 'scale(1)', opacity: 1 }}
                src={images[lightboxIndex]?.url}
                alt={images[lightboxIndex]?.alt}
                className="max-h-[70vh] md:max-h-[75vh] max-w-full rounded-lg object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-10 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full hover:scale-105 border border-white/10 transition-all cursor-pointer"
                id="btn-lightbox-next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Captions & Progress dots */}
            <div className="w-full max-w-3xl flex flex-col items-center gap-3 text-white pb-4">
              <p className="text-center text-xs md:text-sm text-gray-300 font-sans max-w-xl px-4">
                {images[lightboxIndex]?.alt}
              </p>
              
              {/* Bullets progress */}
              <div className="flex gap-1.5" id="lightbox-bullets">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      i === lightboxIndex ? 'bg-[#C9A961] w-4' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
