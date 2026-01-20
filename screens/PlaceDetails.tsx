
import React, { useState } from 'react';
import { Place, Review } from '../types';

interface PlaceDetailsProps {
  place: Place;
  onBack: () => void;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place, onBack }) => {
  const [reviews, setReviews] = useState<Review[]>(place.reviews || []);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const review: Review = {
      id: 'r' + Date.now(),
      userName: 'Traveler (You)',
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setNewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Hero Header */}
      <div className="relative h-72 w-full">
        <img src={place.image} className="w-full h-full object-cover" alt={place.name} />
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-teal-900 z-20"
          aria-label="Go back"
        >
          <span className="text-teal-900 font-black text-xl">←</span>
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-emerald-600 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-lg">
            {place.category}
          </span>
          <h1 className="text-2xl font-black text-white mt-1 drop-shadow-md">{place.name}</h1>
          <p className="text-teal-100 text-sm font-bold opacity-90">{place.city}, Uzbekistan</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 -mt-6 bg-white rounded-t-[32px] p-8 space-y-8 overflow-y-auto hide-scrollbar z-10">
        
        {/* Statistics Bar */}
        <div className="flex justify-between items-center bg-teal-50 p-5 rounded-2xl border-2 border-teal-100 shadow-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-teal-900">{place.averageRating || 'N/A'}</span>
              <span className="text-amber-500 text-xl">★</span>
            </div>
            <p className="text-[10px] font-black text-teal-800/60 uppercase tracking-widest">Rating</p>
          </div>
          <div className="h-10 w-px bg-teal-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-teal-900">{reviews.length}</span>
            <p className="text-[10px] font-black text-teal-800/60 uppercase tracking-widest">Reviews</p>
          </div>
          <div className="h-10 w-px bg-teal-200"></div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-black text-teal-900">{place.price_range}</span>
            <p className="text-[10px] font-black text-teal-800/60 uppercase tracking-widest">Entry Fee</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border border-gray-100">
            <span className="text-2xl">🕒</span>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Opening Hours</p>
              <p className="text-sm font-bold text-gray-800">{place.opening_hours}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border border-gray-100">
            <span className="text-2xl">📞</span>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</p>
              <p className="text-sm font-bold text-gray-800">{place.phone}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-teal-900 border-l-4 border-teal-600 pl-3 uppercase tracking-tighter">About</h3>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            {place.description}
          </p>
        </div>

        {/* Review Section */}
        <div className="space-y-6 pb-24">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-teal-900 border-l-4 border-teal-600 pl-3 uppercase tracking-tighter">Reviews</h3>
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-[10px] font-black text-teal-700 underline uppercase tracking-widest"
            >
              {showReviewForm ? 'Close' : 'Write Review'}
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-2xl border-2 border-teal-100 space-y-4 animate-in fade-in slide-in-from-top-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button 
                    key={s} 
                    type="button" 
                    onClick={() => setNewRating(s)}
                    className={`text-2xl ${newRating >= s ? 'text-amber-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea 
                className="w-full p-4 rounded-xl border-2 border-gray-200 text-sm focus:border-teal-500 outline-none font-medium min-h-[100px]"
                placeholder="How was your visit?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-teal-800 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl">
                Submit Review
              </button>
            </form>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No reviews yet.</p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-teal-900 text-sm">{review.userName}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                  </div>
                  <p className="text-sm text-gray-600 font-medium italic">"{review.comment}"</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-md border-t border-gray-100 flex gap-4 z-50 max-w-md mx-auto">
          <button className="flex-1 bg-white text-teal-900 border-2 border-teal-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">
            View Map
          </button>
          <button className="flex-1 bg-teal-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">
            Free Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
