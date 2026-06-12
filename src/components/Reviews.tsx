import React, { useState } from 'react';
import { Review } from '../types';
import { Star, ThumbsUp, CheckCircle, ShieldCheck, UserCheck } from 'lucide-react';

interface ReviewsProps {
  rating: number;
  reviewsCount: number;
  operatorName: string;
}

export default function Reviews({ rating, reviewsCount, operatorName }: ReviewsProps) {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});

  const sampleReviews: Review[] = [
    {
      id: 'rev-1',
      author: 'Sarah Jenkins',
      rating: 5,
      date: 'May 24, 2026',
      title: 'Beyond expectations! Hands down best Cabo day ever',
      text: 'Our family of four had the absolute best experience. Safely secured our slots via WiC checklist. Highly recommend checking dates beforehand because their boat sizes are extremely small and personal. Guides were funny, professional, and kept us fully secure.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'Robert L.',
      rating: 5,
      date: 'April 12, 2026',
      title: 'Amazing attention to detail & highly safe',
      text: 'Safety precautions are fully up to standard. The catamaran / gear is top-tier. Captain kept us informed of weather channels and marine paths. The open bar serve is premium-quality brand names!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      verified: true
    },
    {
      id: 'rev-3',
      author: 'Melanie Garcia',
      rating: 4,
      date: 'March 28, 2026',
      title: 'Incredibly authentic and personalized!',
      text: 'Voted #1 for a reason. Real-time updates and expert food preparation onboard. Our chef customized tacos on the spot for my vegan gluten-free diet. Would book again next year without hesitation.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
      verified: true
    }
  ];

  const handleLike = (id: string) => {
    if (likedList[id]) {
      setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
      setLikedList((prev) => ({ ...prev, [id]: false }));
    } else {
      setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setLikedList((prev) => ({ ...prev, [id]: true }));
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm" id="wic-reviews-section">
      <h2 className="text-xl font-sans font-extrabold text-[#1B3A5B] mb-6 flex items-center gap-2">
        <span>Guest Reviews ({reviewsCount})</span>
      </h2>

      {/* Grid stats overview split in two */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-gray-100 mb-6">
        
        {/* Score block */}
        <div className="md:col-span-4 flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
          <span className="text-4xl md:text-5xl font-mono font-extrabold text-[#1B3A5B]">{rating}</span>
          <div className="flex text-yellow-400 my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">Average Traveler Rating</span>
          <p className="text-[11px] text-[#2E8B8B] font-bold mt-2">
            Verified by What's in Cabo Hub
          </p>
        </div>

        {/* Breakdown bar columns */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2">
          {[{ stars: 5, pct: 90 }, { stars: 4, pct: 8 }, { stars: 3, pct: 2 }, { stars: 2, pct: 0 }, { stars: 1, pct: 0 }].map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-gray-600 w-3">{row.stars}</span>
              <span className="text-xs text-yellow-500">★</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#2E8B8B] rounded-full" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="text-xs text-gray-400 font-mono w-8 text-right">{row.pct}%</span>
            </div>
          ))}
        </div>

      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {sampleReviews.map((review) => {
          const isLiked = likedList[review.id];
          const likeCount = (likes[review.id] || 0) + (review.id === 'rev-1' ? 14 : review.id === 'rev-2' ? 8 : 4);
          return (
            <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0" id={`review-card-${review.id}`}>
              {/* Review header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-sans font-bold text-[#1B3A5B]">{review.author}</span>
                      {review.verified && (
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-mono font-extrabold uppercase py-0.2 px-1 rounded flex items-center gap-0.5">
                          <CheckCircle className="w-2.5 h-2.5 fill-current text-emerald-600" />
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{review.date}</span>
                  </div>
                </div>

                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 fill-current ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Body */}
              <h4 className="text-sm font-semibold font-sans text-gray-800 mb-1">{review.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.text}</p>

              {/* Helpful utility */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => handleLike(review.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer font-medium ${
                    isLiked ? 'text-[#2E8B8B] font-bold' : 'hover:text-gray-700'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>Helpful ({likeCount})</span>
                </button>
                <span>·</span>
                <span className="text-gray-400">Response from {operatorName} Manager</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
