
import React from 'react';
import { Trip, Place } from '../types';
import { MOCK_PLACES } from '../constants';

interface HomeProps {
  trip: Trip | null;
  onViewPlace: (place: Place) => void;
  onViewTrip: () => void;
}

const Home: React.FC<HomeProps> = ({ trip, onViewPlace, onViewTrip }) => {
  return (
    <div className="p-6 space-y-8 bg-gray-50">
      {/* Search Bar with High Contrast */}
      <div className="relative group">
        <input 
          type="text" 
          placeholder="Search Registan, Chorsu, Bukhara..." 
          className="w-full p-5 pl-14 bg-white rounded-[24px] shadow-xl border-2 border-teal-800/5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-teal-600/10 placeholder:text-gray-400 transition-all"
        />
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl group-focus-within:scale-110 transition-transform">🔍</span>
      </div>

      {/* Active Trip with High Contrast */}
      {trip ? (
        <div className="relative overflow-hidden rounded-[32px] bg-teal-900 p-8 text-white shadow-[0_20px_40px_rgba(13,148,136,0.3)] border-b-8 border-teal-950">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-teal-700/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative z-10 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-amber-500 text-teal-950 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">6-Month Free Trial</span>
                <h2 className="text-2xl font-black mt-3 leading-tight uppercase tracking-tight">Samarkand<br/>Adventure</h2>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl text-center backdrop-blur-sm border border-white/20">
                <p className="text-4xl font-black tracking-tighter">{trip.preferences.days}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Days Left</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-bold text-teal-100/70 border-r border-teal-700 pr-2">{trip.preferences.tripType}</span>
              <span className="text-xs font-bold text-teal-100/70">{trip.preferences.pace} Pace</span>
            </div>
            <button 
              onClick={onViewTrip}
              className="w-full mt-2 bg-white text-teal-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-gray-100 transition-all active:scale-95"
            >
              Expand Full Itinerary
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-[32px] border-4 border-dashed border-teal-900/10 p-12 text-center bg-white">
          <p className="text-teal-900/40 font-black uppercase tracking-widest text-sm">Tap 'Uzi' to start a journey</p>
        </div>
      )}

      {/* Featured Destinations */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <h3 className="text-xl font-black text-teal-900 uppercase tracking-tighter border-l-4 border-teal-600 pl-3">Top Landmarks</h3>
          <button className="text-xs font-black text-teal-700 uppercase tracking-widest underline underline-offset-4">See Map</button>
        </div>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 px-2">
          {MOCK_PLACES.map(place => (
            <button 
              key={place.id}
              onClick={() => onViewPlace(place)}
              className="min-w-[280px] bg-white rounded-[32px] overflow-hidden shadow-2xl border-2 border-teal-800/5 text-left group transition-all active:scale-95 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-xl text-[10px] font-black text-teal-900 shadow-xl uppercase border border-teal-800/10">
                  {place.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-teal-900/80 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-white shadow-xl">
                  {place.averageRating} ★
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="font-black text-teal-900 text-lg leading-tight">{place.name}</h4>
                <p className="text-xs text-teal-700 font-black uppercase tracking-widest">{place.city}, Uzbekistan</p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="bg-teal-50 text-teal-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-teal-100">
                    {place.price_range}
                  </span>
                  <button className="flex-1 bg-teal-800 text-white text-[10px] py-2 rounded-lg font-black uppercase tracking-widest">
                    View
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Guide Banner with Realism */}
      <div className="bg-emerald-900 rounded-[32px] p-8 flex items-center gap-8 shadow-2xl border-b-8 border-emerald-950 relative overflow-hidden group">
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-700/20 rounded-full -mr-16 -mb-16 blur-2xl"></div>
        <div className="flex-1 space-y-3 relative z-10">
          <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">Samarkand<br/>VIP Guides</h3>
          <p className="text-xs text-emerald-100/70 font-medium leading-relaxed">Book certified experts for the Registan complex. Now free for 6 months.</p>
          <button className="mt-2 bg-amber-500 text-teal-950 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Discover Guides</button>
        </div>
        <div className="relative z-10">
          <img src="https://picsum.photos/seed/guide_portrait/200/200" className="w-24 h-24 rounded-[24px] shadow-2xl border-4 border-white/20 rotate-3 group-hover:rotate-0 transition-transform duration-500" alt="Guide" />
        </div>
      </div>
    </div>
  );
};

export default Home;
